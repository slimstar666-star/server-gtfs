const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const Redis = require('ioredis');
const path = require('path');
const config = require('./config');
const { initDatabase } = require('./db');
const RtFetcher = require('./rt-fetcher');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const redisSub = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  retryStrategy: () => null,
});

const rtFetcher = new RtFetcher();

// Статические файлы
app.use(express.static(path.join(__dirname, '../public')));

// API: Информация о сервере
app.get('/api/info', (req, res) => {
  res.json({
    name: 'Okayama Transit Server',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
    gtfsRtUrl: config.gtfsRtUrl,
    updateIntervalMs: config.updateIntervalMs,
  });
});

// API: Текущие позиции транспорта
app.get('/api/vehicles', async (req, res) => {
  try {
    const vehicles = await rtFetcher.getVehicles();
    res.json({
      success: true,
      count: vehicles.length,
      timestamp: Date.now(),
      vehicles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// WebSocket для real-time обновлений
wss.on('connection', (ws) => {
  console.log('🔌 Client connected to WebSocket');
  
  // Отправляем текущие данные при подключении
  rtFetcher.getVehicles().then(vehicles => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'initial',
        vehicles,
        timestamp: Date.now(),
      }));
    }
  });

  // Подписка на обновления из Redis
  redisSub.subscribe('vehicles:update', (err) => {
    if (err) {
      console.error('❌ Redis subscribe error:', err.message);
    }
  });

  redisSub.on('message', (channel, message) => {
    if (channel === 'vehicles:update' && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'update',
        vehicles: JSON.parse(message),
        timestamp: Date.now(),
      }));
    }
  });

  ws.on('close', () => {
    console.log('🔌 Client disconnected from WebSocket');
    redisSub.unsubscribe('vehicles:update');
  });

  ws.on('error', (error) => {
    console.error('❌ WebSocket error:', error.message);
  });
});

// Запуск сервера
async function startServer() {
  console.log('🚀 Starting Okayama Transit Server...');
  
  try {
    // Инициализация БД (если нужно)
    // await initDatabase();
    
    // Запуск RT Fetcher
    rtFetcher.start();
    
    // Запуск HTTP + WebSocket сервера
    server.listen(config.port, config.host, () => {
      console.log(`✅ Server running at http://${config.host}:${config.port}`);
      console.log(`📡 API: http://${config.host}:${config.port}/api/vehicles`);
      console.log(`🔌 WebSocket: ws://${config.host}:${config.port}`);
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error.message);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 SIGTERM received, shutting down gracefully...');
  rtFetcher.stop();
  
  wss.clients.forEach(client => {
    client.close(1001, 'Server shutting down');
  });
  
  await redisSub.quit();
  await rtFetcher.close();
  
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});

startServer();

module.exports = { app, server, wss };