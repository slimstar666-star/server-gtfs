const express = require('express');
const { createServer } = require('http');
const { WebSocketServer } = require('ws');
const cors = require('cors');
const path = require('path');
const db = require('./db');
const config = require('./config');

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'public')));

// API: Информация о сервере
app.get('/api/info', (req, res) => {
  res.json({
    name: 'Okayama Transit Server',
    version: '2.0.0',
    gtfs_source: 'Okayama Prefecture (GTFS ZIP)',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// API: Маршруты из БД
app.get('/api/routes', async (req, res) => {
  try {
    const result = await db.pool.query('SELECT * FROM routes');
    res.json(result.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// API: Остановки из БД (с лимитом)
app.get('/api/stops', async (req, res) => {
  try {
    const limit = req.query.limit || 100;
    const result = await db.pool.query('SELECT * FROM stops LIMIT $1', [limit]);
    res.json(result.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// API: Транспорт (сейчас mock, но с привязкой к реальным маршрутам)
app.get('/api/vehicles', async (req, res) => {
  try {
    // Получаем реальные маршруты для присвоения транспорту
    const routesResult = await db.pool.query('SELECT route_id, route_short_name, route_color FROM routes LIMIT 20');
    const routes = routesResult.rows;
    
    if (routes.length === 0) {
      // Если БД пуста, возвращаем заглушку
      return res.json(generateMockVehicles([]));
    }

    res.json(generateMockVehicles(routes));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Генерация_mock_данных на основе реальных маршрутов
function generateMockVehicles(realRoutes) {
  const vehicles = [];
  const count = 15;
  
  // Центр Окаямы
  const centerLat = 34.655;
  const centerLon = 133.92;

  for (let i = 0; i < count; i++) {
    const route = realRoutes.length > 0 
      ? realRoutes[Math.floor(Math.random() * realRoutes.length)] 
      : { route_id: 'mock_' + i, route_short_name: 'M' + i, route_color: '3498db' };
    
    vehicles.push({
      id: `vehicle_${Date.now()}_${i}`,
      trip_id: `trip_${i}`,
      route_id: route.route_id,
      route_short_name: route.route_short_name || 'N/A',
      route_color: route.route_color || '3498db',
      latitude: centerLat + (Math.random() - 0.5) * 0.05,
      longitude: centerLon + (Math.random() - 0.5) * 0.05,
      speed: Math.floor(Math.random() * 40) + 10,
      heading: Math.floor(Math.random() * 360),
      timestamp: new Date().toISOString(),
      occupancy_status: 'MANY_SEATS_AVAILABLE'
    });
  }
  return vehicles;
}

// WebSocket для реального времени
wss.on('connection', (ws) => {
  console.log('🔌 Клиент подключен к WebSocket');
  
  const interval = setInterval(async () => {
    try {
      const routesResult = await db.pool.query('SELECT route_id, route_short_name, route_color FROM routes LIMIT 20');
      const data = generateMockVehicles(routesResult.rows);
      ws.send(JSON.stringify({ type: 'vehicles', data }));
    } catch (e) {
      ws.send(JSON.stringify({ type: 'error', message: e.message }));
    }
  }, 2000);

  ws.on('close', () => {
    clearInterval(interval);
    console.log('🔌 Клиент отключился');
  });
});

// Запуск сервера
async function start() {
  try {
    console.log('🚀 Инициализация базы данных и импорт GTFS...');
    await db.init();
    
    server.listen(config.PORT, () => {
      console.log(`✅ Сервер запущен на http://localhost:${config.PORT}`);
      console.log(`📡 API доступно на http://localhost:${config.PORT}/api`);
      console.log(`🗺️ Веб-интерфейс: http://localhost:${config.PORT}`);
    });
  } catch (e) {
    console.error('❌ Критическая ошибка запуска:', e);
    process.exit(1);
  }
}

start();
