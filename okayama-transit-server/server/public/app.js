// Инициализация карты (центр Окаямы)
const map = L.map('map').setView([34.655, 133.935], 13);

// Добавляем слой OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 19,
}).addTo(map);

// Хранилище маркеров транспорта
const vehicleMarkers = {};

// Цвета для разных маршрутов
const routeColors = {
  '1': '#FF0000',
  '2': '#00FF00',
  '3': '#0000FF',
  '4': '#FFFF00',
  '5': '#FF00FF',
};

// Создание иконки для транспорта
function createVehicleIcon(routeColor, bearing = 0) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" style="transform: rotate(${bearing}deg);">
      <circle cx="12" cy="12" r="10" fill="${routeColor}" stroke="#fff" stroke-width="2"/>
      <polygon points="12,6 18,18 12,14 6,18" fill="#fff"/>
    </svg>
  `;
  
  return L.divIcon({
    html: svg,
    className: 'vehicle-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}

// Обновление маркеров транспорта
function updateVehicles(vehicles) {
  const currentIds = new Set();
  
  vehicles.forEach(vehicle => {
    currentIds.add(vehicle.id);
    
    const routeColor = routeColors[vehicle.routeId] || '#808080';
    
    if (vehicleMarkers[vehicle.id]) {
      // Обновление существующего маркера
      const marker = vehicleMarkers[vehicle.id];
      marker.setLatLng([vehicle.latitude, vehicle.longitude]);
      marker.setIcon(createVehicleIcon(routeColor, vehicle.bearing));
      
      // Обновление popup
      marker.setPopupContent(createPopupContent(vehicle));
    } else {
      // Создание нового маркера
      const marker = L.marker([vehicle.latitude, vehicle.longitude], {
        icon: createVehicleIcon(routeColor, vehicle.bearing),
      }).addTo(map);
      
      marker.bindPopup(createPopupContent(vehicle));
      vehicleMarkers[vehicle.id] = marker;
    }
  });
  
  // Удаление старых маркеров
  Object.keys(vehicleMarkers).forEach(id => {
    if (!currentIds.has(id)) {
      map.removeLayer(vehicleMarkers[id]);
      delete vehicleMarkers[id];
    }
  });
  
  // Обновление статистики
  document.getElementById('vehicle-count').textContent = vehicles.length;
  document.getElementById('last-update').textContent = new Date().toLocaleTimeString('ja-JP');
}

// Создание содержимого popup
function createPopupContent(vehicle) {
  const statusText = vehicle.status === 1 ? 'STOPPED_AT' : 'IN_TRANSIT_TO';
  const statusJa = vehicle.status === 1 ? '停車中' : '運行中';
  
  return `
    <div class="vehicle-popup">
      <div class="vehicle-id">🚌 ${vehicle.label || vehicle.vehicleId}</div>
      <div class="vehicle-info">
        <div class="info-row">
          <span class="info-label">Route:</span>
          <span class="info-value">${vehicle.routeId || 'N/A'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Status:</span>
          <span class="info-value">${statusJa}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Speed:</span>
          <span class="info-value">${vehicle.speed || 0} km/h</span>
        </div>
        <div class="info-row">
          <span class="info-label">Bearing:</span>
          <span class="info-value">${vehicle.bearing || 0}°</span>
        </div>
        <span class="speed-badge">⚡ ${vehicle.speed || 0} km/h</span>
      </div>
    </div>
  `;
}

// WebSocket подключение
let ws = null;
const statusElement = document.getElementById('connection-status');

function connectWebSocket() {
  statusElement.textContent = 'Connecting...';
  statusElement.className = 'connecting';
  
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const wsUrl = `${protocol}//${window.location.host}`;
  
  ws = new WebSocket(wsUrl);
  
  ws.onopen = () => {
    console.log('✅ WebSocket connected');
    statusElement.textContent = 'Connected';
    statusElement.className = 'connected';
  };
  
  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      
      if (data.type === 'initial' || data.type === 'update') {
        updateVehicles(data.vehicles);
      }
    } catch (error) {
      console.error('❌ Error parsing WebSocket message:', error);
    }
  };
  
  ws.onclose = () => {
    console.log('⚠️  WebSocket disconnected');
    statusElement.textContent = 'Disconnected';
    statusElement.className = 'disconnected';
    
    // Попытка переподключения через 5 секунд
    setTimeout(connectWebSocket, 5000);
  };
  
  ws.onerror = (error) => {
    console.error('❌ WebSocket error:', error);
    statusElement.textContent = 'Error';
    statusElement.className = 'disconnected';
  };
}

// Загрузка начальных данных через REST API (резервный вариант)
async function loadInitialData() {
  try {
    const response = await fetch('/api/vehicles');
    const data = await response.json();
    
    if (data.success) {
      updateVehicles(data.vehicles);
    }
  } catch (error) {
    console.error('❌ Error loading initial data:', error);
  }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  console.log('🗺️  Okayama Transit Map initialized');
  
  // Подключение WebSocket
  connectWebSocket();
  
  // Резервная загрузка данных
  loadInitialData();
  
  // Периодическое обновление через REST API (если WebSocket не работает)
  setInterval(() => {
    if (ws && ws.readyState !== WebSocket.OPEN) {
      loadInitialData();
    }
  }, 10000);
});

// Обработка изменения размера окна
window.addEventListener('resize', () => {
  map.invalidateSize();
});