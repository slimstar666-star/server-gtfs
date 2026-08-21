const axios = require('axios');
const protobuf = require('protobufjs');
const db = require('./db');
const config = require('./config');

// GTFS-RT Protocol Buffer schema (simplified for vehicle positions)
const gtfsRealtimeProto = `
syntax = "proto2";

message FeedMessage {
  required FeedHeader header = 1;
  repeated FeedEntity entity = 2;
}

message FeedHeader {
  required uint64 timestamp = 1;
  required string gtfs_realtime_version = 2;
}

message FeedEntity {
  required string id = 1;
  optional TripUpdate trip_update = 3;
  optional VehiclePosition vehicle = 4;
  optional Alert alert = 5;
}

message VehiclePosition {
  optional TripDescriptor trip = 1;
  optional Position position = 2;
  optional string current_stop_sequence = 3;
  optional string stop_id = 4;
  optional VehicleDescriptor vehicle = 8;
  optional OccupancyStatus occupancy_status = 9;
  optional int32 occupancy_percentage = 10;
  optional VehicleStopStatus current_status = 11;
  optional uint64 timestamp = 12;
  optional CongestionLevel congestion_level = 13;
  optional string stop_name = 14;
  optional TransferStatus transfer_status = 15;
}

message TripDescriptor {
  optional string trip_id = 1;
  optional string route_id = 2;
  optional string direction_id = 3;
  optional string start_time = 4;
  optional string start_date = 5;
}

message Position {
  required float latitude = 1;
  required float longitude = 2;
  optional float bearing = 3;
  optional float odometer = 4;
  optional float speed = 5;
}

message VehicleDescriptor {
  optional string id = 1;
  optional string label = 2;
  optional string license_plate = 3;
}

enum OccupancyStatus {
  EMPTY = 0;
  MANY_SEATS_AVAILABLE = 1;
  FEW_SEATS_AVAILABLE = 2;
  STANDING_ROOM_ONLY = 3;
  CRUSHED_STANDING_ROOM_ONLY = 4;
  FULL = 5;
  NOT_ACCEPTING_PASSENGERS = 6;
  NO_DATA_AVAILABLE = 7;
  NOT_BOARDABLE = 8;
}

enum VehicleStopStatus {
  INCOMING_AT = 0;
  STOPPED_AT = 1;
  IN_TRANSIT_TO = 2;
}

enum CongestionLevel {
  UNKNOWN_CONGESTION_LEVEL = 0;
  RUNNING_SMOOTHLY = 1;
  STOPPING_AND_STARTING_FREQUENTLY = 2;
  CONGESTED = 3;
  SEVERELY_CONGESTED = 4;
}

enum TransferStatus {
  RECOMMENDED_TRANSFER = 0;
  NO_TRANSFER_RECOMMENDED = 1;
}

message TripUpdate {
  optional TripDescriptor trip = 1;
  optional StopTimeUpdate stop_time_update = 2;
}

message StopTimeUpdate {
  optional int32 stop_sequence = 1;
  optional string stop_id = 2;
}

message Alert {
  optional TimeRange active_period = 1;
  optional EntitySelector informed_entity = 5;
}

message TimeRange {
  optional uint64 start = 1;
  optional uint64 end = 2;
}

message EntitySelector {
  optional string agency_id = 1;
  optional string route_id = 2;
  optional string trip_id = 3;
}
`;

let root;
let VehiclePosition;

async function initProtobuf() {
  try {
    root = protobuf.parse(gtfsRealtimeProto).root;
    VehiclePosition = root.lookupType('VehiclePosition');
    console.log('Protobuf schema loaded');
  } catch (err) {
    console.error('Error loading Protobuf schema:', err);
    throw err;
  }
}

async function fetchGTFSRT() {
  if (!config.gtfs.rtUrl) {
    console.log('No GTFS-RT URL configured, using mock data');
    return generateMockData();
  }

  try {
    const response = await axios.get(config.gtfs.rtUrl, {
      responseType: 'arraybuffer',
      timeout: 10000
    });

    const buffer = Buffer.from(response.data);
    const FeedMessage = root.lookupType('FeedMessage');
    
    try {
      const message = FeedMessage.decode(buffer);
      const vehicles = [];

      for (const entity of message.entity) {
        if (entity.vehicle) {
          const vehicle = entity.vehicle;
          if (vehicle.position && vehicle.position.latitude && vehicle.position.longitude) {
            vehicles.push({
              vehicle_id: vehicle.vehicle?.id || entity.id,
              trip_id: vehicle.trip?.trip_id || null,
              route_id: vehicle.trip?.route_id || null,
              latitude: vehicle.position.latitude,
              longitude: vehicle.position.longitude,
              bearing: vehicle.position.bearing || 0,
              speed: vehicle.position.speed || 0,
              timestamp: new Date(vehicle.timestamp * 1000),
              occupancy_status: vehicle.occupancy_status !== undefined ? 
                Object.keys(OccupancyStatus)[vehicle.occupancy_status] : null,
              current_stop_sequence: vehicle.current_stop_sequence || null
            });
          }
        }
      }

      console.log(`Fetched ${vehicles.length} vehicles from GTFS-RT`);
      return vehicles;
    } catch (decodeErr) {
      console.warn('Error decoding Protobuf, using mock data:', decodeErr.message);
      return generateMockData();
    }
  } catch (err) {
    console.warn('Error fetching GTFS-RT feed, using mock data:', err.message);
    return generateMockData();
  }
}

function generateMockData() {
  // Generate mock vehicles around Okayama
  const vehicles = [];
  const numVehicles = Math.floor(Math.random() * 15) + 10;
  
  const routes = [
    { id: '1', color: 'FF0000' },
    { id: '2', color: '00FF00' },
    { id: '3', color: '0000FF' },
    { id: '4', color: 'FFFF00' },
    { id: '5', color: 'FF00FF' }
  ];

  const occupancyStatuses = ['EMPTY', 'MANY_SEATS_AVAILABLE', 'FEW_SEATS_AVAILABLE', 'STANDING_ROOM_ONLY'];

  for (let i = 0; i < numVehicles; i++) {
    const route = routes[Math.floor(Math.random() * routes.length)];
    const baseLat = 34.655;
    const baseLon = 133.92;
    
    vehicles.push({
      vehicle_id: `vehicle_${i}`,
      trip_id: `trip_${i}_${Date.now()}`,
      route_id: route.id,
      latitude: baseLat + (Math.random() - 0.5) * 0.1,
      longitude: baseLon + (Math.random() - 0.5) * 0.1,
      bearing: Math.floor(Math.random() * 360),
      speed: Math.floor(Math.random() * 60) + 20,
      timestamp: new Date(),
      occupancy_status: occupancyStatuses[Math.floor(Math.random() * occupancyStatuses.length)],
      current_stop_sequence: Math.floor(Math.random() * 50)
    });
  }

  console.log(`Generated ${vehicles.length} mock vehicles`);
  return vehicles;
}

async function updateVehiclePositions(vehicles) {
  for (const vehicle of vehicles) {
    await db.query(`
      INSERT INTO vehicle_positions 
        (vehicle_id, trip_id, route_id, latitude, longitude, bearing, speed, timestamp, occupancy_status, current_stop_sequence)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT (vehicle_id) DO UPDATE SET
        trip_id = EXCLUDED.trip_id,
        route_id = EXCLUDED.route_id,
        latitude = EXCLUDED.latitude,
        longitude = EXCLUDED.longitude,
        bearing = EXCLUDED.bearing,
        speed = EXCLUDED.speed,
        timestamp = EXCLUDED.timestamp,
        occupancy_status = EXCLUDED.occupancy_status,
        current_stop_sequence = EXCLUDED.current_stop_sequence
    `, [
      vehicle.vehicle_id,
      vehicle.trip_id,
      vehicle.route_id,
      vehicle.latitude,
      vehicle.longitude,
      vehicle.bearing,
      vehicle.speed,
      vehicle.timestamp,
      vehicle.occupancy_status,
      vehicle.current_stop_sequence
    ]);
  }
}

async function startRTFetcher(io) {
  await initProtobuf();
  
  console.log('Starting GTFS-RT fetcher...');
  
  const fetchAndUpdate = async () => {
    try {
      const vehicles = await fetchGTFSRT();
      await updateVehiclePositions(vehicles);
      
      // Emit to WebSocket clients
      io.emit('vehicles-update', vehicles);
      
      console.log(`Updated ${vehicles.length} vehicles`);
    } catch (err) {
      console.error('Error in RT fetcher:', err);
    }
  };

  // Initial fetch
  await fetchAndUpdate();
  
  // Periodic updates
  setInterval(fetchAndUpdate, config.gtfs.updateInterval);
}

module.exports = { startRTFetcher, fetchGTFSRT };
