const { Pool } = require('pg');
const config = require('./config');

const pool = new Pool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Initialize PostGIS and tables
async function initDB() {
  const client = await pool.connect();
  try {
    await client.query('CREATE EXTENSION IF NOT EXISTS postgis');
    
    // Routes table
    await client.query(`
      CREATE TABLE IF NOT EXISTS routes (
        route_id TEXT PRIMARY KEY,
        route_short_name TEXT,
        route_long_name TEXT,
        route_type INTEGER,
        route_color TEXT,
        route_text_color TEXT
      )
    `);

    // Stops table
    await client.query(`
      CREATE TABLE IF NOT EXISTS stops (
        stop_id TEXT PRIMARY KEY,
        stop_name TEXT,
        stop_lat DOUBLE PRECISION,
        stop_lon DOUBLE PRECISION,
        location_type INTEGER
      )
    `);

    // Trips table
    await client.query(`
      CREATE TABLE IF NOT EXISTS trips (
        trip_id TEXT PRIMARY KEY,
        route_id TEXT REFERENCES routes(route_id),
        service_id TEXT,
        trip_headsign TEXT
      )
    `);

    // Vehicle positions cache table (for GTFS-RT data)
    await client.query(`
      CREATE TABLE IF NOT EXISTS vehicle_positions (
        vehicle_id TEXT PRIMARY KEY,
        trip_id TEXT,
        route_id TEXT,
        latitude DOUBLE PRECISION,
        longitude DOUBLE PRECISION,
        bearing DOUBLE PRECISION,
        speed DOUBLE PRECISION,
        timestamp TIMESTAMPTZ,
        occupancy_status TEXT,
        current_stop_sequence INTEGER
      )
    `);

    // Create spatial index
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_vehicle_position 
      ON vehicle_positions USING GIST (ll_to_earth(latitude, longitude))
    `);

    console.log('Database initialized successfully');
  } catch (err) {
    console.error('Error initializing database:', err);
    throw err;
  } finally {
    client.release();
  }
}

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
  initDB
};
