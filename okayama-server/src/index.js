const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const config = require('./config');
const { startRTFetcher } = require('./rt-fetcher');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.get('/api/info', (req, res) => {
  res.json({
    name: 'Okayama Transit Server',
    version: '1.0.0',
    description: 'GTFS & GTFS-RT сервер для отображения транспорта Окаямы',
    endpoints: {
      vehicles: '/api/vehicles',
      routes: '/api/routes',
      stops: '/api/stops'
    }
  });
});

app.get('/api/vehicles', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        vehicle_id,
        trip_id,
        route_id,
        latitude,
        longitude,
        bearing,
        speed,
        timestamp,
        occupancy_status,
        current_stop_sequence
      FROM vehicle_positions
      ORDER BY timestamp DESC
    `);
    
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching vehicles:', err);
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
});

app.get('/api/routes', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT * FROM routes ORDER BY route_short_name
    `);
    
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching routes:', err);
    res.status(500).json({ error: 'Failed to fetch routes' });
  }
});

app.get('/api/stops', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT stop_id, stop_name, stop_lat, stop_lon 
      FROM stops 
      LIMIT 1000
    `);
    
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching stops:', err);
    res.status(500).json({ error: 'Failed to fetch stops' });
  }
});

// WebSocket connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start server
async function startServer() {
  try {
    // Initialize database
    await db.initDB();
    console.log('Database initialized');
    
    // Start GTFS-RT fetcher
    await startRTFetcher(io);
    
    // Start HTTP server
    server.listen(config.server.port, config.server.host, () => {
      console.log(`
╔════════════════════════════════════════════════╗
║     Okayama Transit Server запущен!           ║
╠════════════════════════════════════════════════╣
║ Веб-интерфейс: http://localhost:${config.server.port}          ║
║ API Vehicles:  http://localhost:${config.server.port}/api/vehicles     ║
║ API Routes:    http://localhost:${config.server.port}/api/routes        ║
║ API Stops:     http://localhost:${config.server.port}/api/stops         ║
║ API Info:      http://localhost:${config.server.port}/api/info          ║
║ WebSocket:     ws://localhost:${config.server.port}             ║
╚════════════════════════════════════════════════╝
      `);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();

module.exports = { app, server, io };
