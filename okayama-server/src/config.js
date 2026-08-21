require('dotenv').config();

module.exports = {
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'okayama_transit'
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379
  },
  server: {
    port: parseInt(process.env.PORT) || 3001,
    host: process.env.HOST || '0.0.0.0'
  },
  gtfs: {
    rtUrl: process.env.GTFS_RT_URL || '',
    staticPath: process.env.GTFS_STATIC_PATH || './data/gtfs-static.zip',
    updateInterval: parseInt(process.env.RT_UPDATE_INTERVAL) || 5000
  }
};
