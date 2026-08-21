const protobuf = require('protobufjs');
const Redis = require('ioredis');
const axios = require('axios');
const config = require('./config');

// Простая схема GTFS-RT VehiclePosition (упрощенная версия)
// В реальном проекте нужно использовать официальную схему из gtfs-realtime.proto
const gtfsRtSchema = `
syntax = "proto2";

message FeedMessage {
  required string header = 1;
  repeated FeedEntity entity = 2;
}

message FeedEntity {
  required string id = 1;
  optional TripUpdate trip_update = 3;
  optional VehiclePosition vehicle = 4;
  optional Alert alert = 5;
}

message VehiclePosition {
  optional VehicleDescriptor vehicle = 1;
  optional Position position = 2;
  optional TripDescriptor trip = 3;
  optional VehicleStopStatus current_status = 4;
  optional string stop_id = 5;
  optional uint64 timestamp = 6;
  optional string delay = 7;
}

message TripDescriptor {
  optional string trip_id = 1;
  optional string start_time = 2;
  optional string start_date = 3;
  optional string route_id = 6;
}

message VehicleDescriptor {
  optional string id = 1;
  optional string label = 2;
  optional string license_plate = 3;
}

message Position {
  required float latitude = 1;
  required float longitude = 2;
  optional float bearing = 3;
  optional float odometer = 4;
  optional float speed = 5;
}

enum VehicleStopStatus {
  IN_TRANSIT_TO = 0;
  STOPPED_AT = 1;
  IN_COMING_AT = 2;
}
`;

class RtFetcher {
  constructor() {
    this.redis = new Redis({
      host: config.redis.host,
      port: config.redis.port,
      retryStrategy: () => null // Не перезапускать при ошибке
    });
    
    this.root = null;
    this.VehiclePositionType = null;
    this.isRunning = false;
    this.intervalId = null;
    
    this.initProtobuf();
  }

  async initProtobuf() {
    try {
      // В реальном проекте загружаем официальный .proto файл
      // Здесь используем упрощенную заглушку для демонстрации
      console.log('⚠️  Using mock GTFS-RT parser (no real proto file)');
      this.root = 'mock';
    } catch (error) {
      console.error('❌ Protobuf initialization error:', error.message);
    }
  }

  async fetchAndParse() {
    if (!config.gtfsRtUrl || config.gtfsRtUrl.includes('example.com')) {
      // Генерируем тестовые данные если нет реального URL
      return this.generateMockData();
    }

    try {
      const response = await axios.get(config.gtfsRtUrl, {
        responseType: 'arraybuffer',
        timeout: 10000,
      });

      if (this.root === 'mock') {
        return this.generateMockData();
      }

      // Парсинг реальных Protobuf данных
      const message = this.root.lookupType('FeedMessage').decode(response.data);
      const vehicles = [];

      for (const entity of message.entity) {
        if (entity.vehicle) {
          const v = entity.vehicle;
          vehicles.push({
            id: entity.id,
            vehicleId: v.vehicle?.id,
            label: v.vehicle?.label,
            latitude: v.position?.latitude,
            longitude: v.position?.longitude,
            bearing: v.position?.bearing,
            speed: v.position?.speed,
            tripId: v.trip?.trip_id,
            routeId: v.trip?.route_id,
            status: v.current_status,
            timestamp: v.timestamp ? parseInt(v.timestamp.toString()) * 1000 : Date.now(),
          });
        }
      }

      return vehicles;
    } catch (error) {
      console.error('❌ GTFS-RT fetch error:', error.message);
      return this.generateMockData();
    }
  }

  generateMockData() {
    // Генерация тестовых данных для Окаямы (координаты центра ~34.655, 133.935)
    const vehicles = [];
    const numVehicles = Math.floor(Math.random() * 10) + 15; // 15-25 автобусов

    const routes = [
      { id: '1', color: 'FF0000', name: 'Route 1' },
      { id: '2', color: '00FF00', name: 'Route 2' },
      { id: '3', color: '0000FF', name: 'Route 3' },
      { id: '4', color: 'FFFF00', name: 'Route 4' },
      { id: '5', color: 'FF00FF', name: 'Route 5' },
    ];

    for (let i = 0; i < numVehicles; i++) {
      const route = routes[Math.floor(Math.random() * routes.length)];
      
      // Случайные координаты в районе Окаямы (примерно 5km от центра)
      const lat = 34.655 + (Math.random() - 0.5) * 0.09;
      const lon = 133.935 + (Math.random() - 0.5) * 0.09;
      const bearing = Math.floor(Math.random() * 360);
      const speed = Math.floor(Math.random() * 60) + 20; // 20-80 km/h

      vehicles.push({
        id: `vehicle_${i}`,
        vehicleId: `BUS_${i.toString().padStart(3, '0')}`,
        label: `${route.name} - ${i}`,
        latitude: lat,
        longitude: lon,
        bearing: bearing,
        speed: speed,
        tripId: `trip_${Date.now()}_${i}`,
        routeId: route.id,
        routeColor: route.color,
        status: Math.random() > 0.8 ? 1 : 0, // STOPPED_AT или IN_TRANSIT_TO
        timestamp: Date.now(),
      });
    }

    return vehicles;
  }

  async updateVehicles() {
    const vehicles = await this.fetchAndParse();
    
    try {
      // Сохраняем в Redis с ключом vehicles:current
      await this.redis.set(
        'vehicles:current',
        JSON.stringify(vehicles),
        'EX',
        30 // TTL 30 секунд
      );
      
      // Публикуем событие для WebSocket
      await this.redis.publish('vehicles:update', JSON.stringify(vehicles));
      
      console.log(`🚌 Updated ${vehicles.length} vehicles in Redis`);
      return vehicles;
    } catch (error) {
      console.error('❌ Redis update error:', error.message);
      return vehicles;
    }
  }

  start() {
    if (this.isRunning) {
      console.log('⚠️  RT Fetcher already running');
      return;
    }

    this.isRunning = true;
    console.log('🚀 Starting GTFS-RT Fetcher...');
    
    // Первое обновление сразу
    this.updateVehicles();
    
    // Периодические обновления
    this.intervalId = setInterval(() => {
      this.updateVehicles();
    }, config.updateIntervalMs);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
    console.log('🛑 GTFS-RT Fetcher stopped');
  }

  async getVehicles() {
    try {
      const data = await this.redis.get('vehicles:current');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('❌ Redis get error:', error.message);
      return [];
    }
  }

  async close() {
    this.stop();
    await this.redis.quit();
  }
}

module.exports = RtFetcher;