const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool({
  host: config.db.host,
  port: config.db.port,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Инициализация PostGIS
async function initDatabase() {
  const client = await pool.connect();
  try {
    await client.query('CREATE EXTENSION IF NOT EXISTS postgis');
    
    // Таблица остановок
    await client.query(`
      CREATE TABLE IF NOT EXISTS stops (
        stop_id TEXT PRIMARY KEY,
        stop_name TEXT,
        stop_desc TEXT,
        stop_lat DOUBLE PRECISION,
        stop_lon DOUBLE PRECISION,
        zone_id TEXT,
        stop_url TEXT,
        location_type INTEGER,
        parent_station TEXT,
        stop_timezone TEXT,
        wheelchair_boarding INTEGER,
        geom GEOMETRY(POINT, 4326)
      )
    `);
    
    // Таблица маршрутов
    await client.query(`
      CREATE TABLE IF NOT EXISTS routes (
        route_id TEXT PRIMARY KEY,
        agency_id TEXT,
        route_short_name TEXT,
        route_long_name TEXT,
        route_desc TEXT,
        route_type INTEGER,
        route_url TEXT,
        route_color TEXT,
        route_text_color TEXT
      )
    `);
    
    // Таблица рейсов
    await client.query(`
      CREATE TABLE IF NOT EXISTS trips (
        trip_id TEXT PRIMARY KEY,
        route_id TEXT REFERENCES routes(route_id),
        service_id TEXT,
        trip_headsign TEXT,
        trip_short_name TEXT,
        direction_id INTEGER,
        block_id TEXT,
        shape_id TEXT,
        wheelchair_accessible INTEGER
      )
    `);
    
    // Индексы для ускорения гео-запросов
    await client.query('CREATE INDEX IF NOT EXISTS idx_stops_geom ON stops USING GIST (geom)');
    
    console.log('✅ Database initialized with PostGIS tables');
  } catch (error) {
    console.error('❌ Database initialization error:', error.message);
    throw error;
  } finally {
    client.release();
  }
}

module.exports = {
  pool,
  initDatabase,
};