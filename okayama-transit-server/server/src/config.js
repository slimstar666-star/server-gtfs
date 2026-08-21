require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3001,
  host: process.env.HOST || '0.0.0.0',
  
  // Database
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || 'transit_db',
    user: process.env.DB_USER || 'transit_user',
    password: process.env.DB_PASSWORD || 'transit_pass',
  },
  
  // Redis
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT) || 6379,
  },
  
  // GTFS
  gtfsStaticPath: process.env.GTFS_STATIC_PATH || './data/okayama_gtfs.zip',
  gtfsRtUrl: process.env.GTFS_RT_URL || '',
  updateIntervalMs: parseInt(process.env.UPDATE_INTERVAL_MS) || 5000,
  
  // Environment
  nodeEnv: process.env.NODE_ENV || 'development',
};