const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Импортируем сгенерированный protobuf модуль
const gtfsRealtime = require('./gtfs-realtime.js');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

// Хранилище данных транспорта (в памяти для демо)
let vehicles = [];

// Генерация тестовых данных для Окаямы (координаты центра: 34.6551, 133.9195)
function generateOkayamaVehicles() {
  const newVehicles = [];
  const routes = [
    { id: '1', name: 'Route 1', color: '#FF0000' },
    { id: '2', name: 'Route 2', color: '#00FF00' },
    { id: '3', name: 'Route 3', color: '#0000FF' },
    { id: '4', name: 'Route 4', color: '#FFFF00' },
    { id: '5', name: 'Route 5', color: '#FF00FF' }
  ];
  
  // Генерируем 15-25 транспортных средств
  const count = Math.floor(Math.random() * 10) + 15;
  
  for (let i = 0; i < count; i++) {
    const route = routes[Math.floor(Math.random() * routes.length)];
    // Случайные координаты в пределах Окаямы (примерно 10x10 км)
    const lat = 34.62 + Math.random() * 0.07;
    const lon = 133.88 + Math.random() * 0.08;
    const speed = Math.floor(Math.random() * 40) + 10; // 10-50 км/ч
    const bearing = Math.floor(Math.random() * 360);
    
    newVehicles.push({
      id: `vehicle_${i}`,
      routeId: route.id,
      routeName: route.name,
      routeColor: route.color,
      latitude: lat,
      longitude: lon,
      speed: speed,
      bearing: bearing,
      timestamp: Math.floor(Date.now() / 1000),
      currentStatus: Math.random() > 0.8 ? 'STOPPED_AT' : 'IN_TRANSIT_TO',
      occupancyStatus: ['EMPTY', 'MANY_SEATS_AVAILABLE', 'FEW_SEATS_AVAILABLE', 'STANDING_ROOM_ONLY'][Math.floor(Math.random() * 4)]
    });
  }
  
  return newVehicles;
}

// Обновляем данные каждые 5 секунд
setInterval(() => {
  vehicles = generateOkayamaVehicles();
  
  // Отправляем обновления всем подключенным клиентам через WebSocket
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        type: 'update',
        timestamp: Date.now(),
        vehicles: vehicles
      }));
    }
  });
}, 5000);

// REST API endpoint для получения текущих данных
app.get('/api/vehicles', (req, res) => {
  res.json({
    timestamp: Date.now(),
    count: vehicles.length,
    vehicles: vehicles
  });
});

// REST API endpoint для получения метаданных
app.get('/api/info', (req, res) => {
  res.json({
    name: 'Okayama Transit Server',
    version: '1.0.0',
    description: 'GTFS-RT сервер для отображения транспорта Окаямы',
    location: 'Okayama, Japan',
    coordinates: { lat: 34.6551, lon: 133.9195 },
    updateInterval: 5000,
    vehicleCount: vehicles.length
  });
});

// Обработка WebSocket подключений
wss.on('connection', (ws) => {
  console.log('Новое WebSocket подключение');
  
  // Отправляем текущие данные сразу после подключения
  ws.send(JSON.stringify({
    type: 'init',
    timestamp: Date.now(),
    vehicles: vehicles
  }));
  
  ws.on('close', () => {
    console.log('WebSocket подключение закрыто');
  });
  
  ws.on('error', (error) => {
    console.error('WebSocket ошибка:', error);
  });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log(`Веб-интерфейс: http://localhost:${PORT}`);
  console.log(`API: http://localhost:${PORT}/api/vehicles`);
  console.log(`Информация: http://localhost:${PORT}/api/info`);
  
  // Генерируем начальные данные
  vehicles = generateOkayamaVehicles();
});
