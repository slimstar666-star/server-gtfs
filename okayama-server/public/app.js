// Инициализация карты (Okayama, Japan)
const map = L.map('map').setView([34.655, 133.92], 13);

// Добавляем слой OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors',
  maxZoom: 19
}).addTo(map);

// Цвета для маршрутов
const routeColors = {
  '1': '#FF0000',
  '2': '#00FF00',
  '3': '#0000FF',
  '4': '#FFFF00',
  '5': '#FF00FF'
};

// Хранилище маркеров транспорта
const vehicleMarkers = {};

// Создание иконки для транспорта
function createVehicleIcon(routeId) {
  const color = routeColors[routeId] || '#888888';
  
  return L.divIcon({
    className: 'vehicle-marker',
    html: `<div style="
      width: 20px;
      height: 20px;
      background: ${color};
      border: 3px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
}

// Обновление маркеров транспорта
function updateVehicles(vehicles) {
  const now = new Date();
  
  // Удаляем маркеры отсутствующих транспортных средств
  const currentVehicleIds = new Set(vehicles.map(v => v.vehicle_id));
  Object.keys(vehicleMarkers).forEach(id => {
    if (!currentVehicleIds.has(id)) {
      map.removeLayer(vehicleMarkers[id]);
      delete vehicleMarkers[id];
    }
  });
  
  // Обновляем или создаем маркеры
  vehicles.forEach(vehicle => {
    const { vehicle_id, latitude, longitude, bearing, speed, route_id, occupancy_status } = vehicle;
    
    if (vehicleMarkers[vehicle_id]) {
      // Обновляем позицию существующего маркера
      vehicleMarkers[vehicle_id].setLatLng([latitude, longitude]);
      
      // Обновляем popup
      const popup = vehicleMarkers[vehicle_id].getPopup();
      if (popup) {
        popup.setContent(createPopupContent(vehicle));
      }
    } else {
      // Создаем новый маркер
      const marker = L.marker([latitude, longitude], {
        icon: createVehicleIcon(route_id)
      }).addTo(map);
      
      // Добавляем popup
      marker.bindPopup(createPopupContent(vehicle));
      
      vehicleMarkers[vehicle_id] = marker;
    }
  });
  
  // Обновляем статистику
  document.getElementById('vehicle-count').textContent = vehicles.length;
  document.getElementById('last-update').textContent = now.toLocaleTimeString('ru-RU');
}

// Создание содержимого popup
function createPopupContent(vehicle) {
  const occupancyLabels = {
    'EMPTY': 'Пустой',
    'MANY_SEATS_AVAILABLE': 'Много мест',
    'FEW_SEATS_AVAILABLE': 'Есть места',
    'STANDING_ROOM_ONLY': 'Только стоячие места',
    'CRUSHED_STANDING_ROOM_ONLY': 'Переполнен',
    'FULL': 'Полный',
    'NOT_ACCEPTING_PASSENGERS': 'Не принимает пассажиров',
    'NO_DATA_AVAILABLE': 'Нет данных'
  };
  
  return `
    <div class="popup-title">🚌 Транспорт ${vehicle.vehicle_id}</div>
    <div class="popup-info">
      <strong>Маршрут:</strong> ${vehicle.route_id || 'N/A'}<br>
      <strong>Скорость:</strong> ${vehicle.speed ? Math.round(vehicle.speed) + ' км/ч' : 'N/A'}<br>
      <strong>Направление:</strong> ${vehicle.bearing ? Math.round(vehicle.bearing) + '°' : 'N/A'}<br>
      <strong>Заполненность:</strong> ${occupancyLabels[vehicle.occupancy_status] || 'N/A'}<br>
      <strong>Время:</strong> ${new Date(vehicle.timestamp).toLocaleTimeString('ru-RU')}
    </div>
  `;
}

// Подключение к WebSocket
const socket = io();

const statusElement = document.getElementById('status');
const statusText = statusElement.querySelector('.text');

socket.on('connect', () => {
  console.log('Connected to server');
  statusElement.className = 'status connected';
  statusText.textContent = 'Подключено';
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
  statusElement.className = 'status error';
  statusText.textContent = 'Отключено';
});

socket.on('vehicles-update', (vehicles) => {
  console.log('Received vehicles update:', vehicles.length);
  updateVehicles(vehicles);
});

// Загрузка начальных данных
async function loadInitialData() {
  try {
    const response = await fetch('/api/vehicles');
    const vehicles = await response.json();
    updateVehicles(vehicles);
  } catch (err) {
    console.error('Error loading initial data:', err);
  }
}

// Загружаем начальные данные при старте
loadInitialData();

console.log('Okayama Transit Map initialized');
