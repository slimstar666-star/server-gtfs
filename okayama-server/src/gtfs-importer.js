const fs = require('fs');
const path = require('path');
const unzipper = require('unzipper');
const csv = require('csv-parser');
const db = require('./db');
const config = require('./config');

async function importGTFS() {
  const gtfsPath = config.gtfs.staticPath;
  
  if (!fs.existsSync(gtfsPath)) {
    console.error(`GTFS file not found: ${gtfsPath}`);
    console.log('Please download GTFS data and place it in the data folder');
    return;
  }

  console.log('Extracting GTFS data...');
  
  const extractPath = path.join(__dirname, '../data/gtfs-extracted');
  
  // Clean previous extraction
  if (fs.existsSync(extractPath)) {
    fs.rmSync(extractPath, { recursive: true });
  }
  fs.mkdirSync(extractPath, { recursive: true });

  // Extract ZIP
  await fs.createReadStream(gtfsPath)
    .pipe(unzipper.Extract({ path: extractPath }))
    .promise();

  console.log('GTFS data extracted');

  // Import routes
  await importCSV(extractPath, 'routes.txt', async (results) => {
    console.log(`Importing ${results.length} routes...`);
    for (const row of results) {
      await db.query(`
        INSERT INTO routes (route_id, route_short_name, route_long_name, route_type, route_color, route_text_color)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (route_id) DO UPDATE SET
          route_short_name = EXCLUDED.route_short_name,
          route_long_name = EXCLUDED.route_long_name,
          route_type = EXCLUDED.route_type,
          route_color = EXCLUDED.route_color,
          route_text_color = EXCLUDED.route_text_color
      `, [
        row.route_id,
        row.route_short_name || null,
        row.route_long_name || null,
        parseInt(row.route_type) || null,
        row.route_color || null,
        row.route_text_color || null
      ]);
    }
    console.log('Routes imported');
  });

  // Import stops
  await importCSV(extractPath, 'stops.txt', async (results) => {
    console.log(`Importing ${results.length} stops...`);
    for (const row of results) {
      await db.query(`
        INSERT INTO stops (stop_id, stop_name, stop_lat, stop_lon, location_type)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (stop_id) DO UPDATE SET
          stop_name = EXCLUDED.stop_name,
          stop_lat = EXCLUDED.stop_lat,
          stop_lon = EXCLUDED.stop_lon,
          location_type = EXCLUDED.location_type
      `, [
        row.stop_id,
        row.stop_name || null,
        parseFloat(row.stop_lat) || null,
        parseFloat(row.stop_lon) || null,
        parseInt(row.location_type) || 0
      ]);
    }
    console.log('Stops imported');
  });

  // Import trips
  await importCSV(extractPath, 'trips.txt', async (results) => {
    console.log(`Importing ${results.length} trips...`);
    for (const row of results) {
      await db.query(`
        INSERT INTO trips (trip_id, route_id, service_id, trip_headsign)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (trip_id) DO UPDATE SET
          route_id = EXCLUDED.route_id,
          service_id = EXCLUDED.service_id,
          trip_headsign = EXCLUDED.trip_headsign
      `, [
        row.trip_id,
        row.route_id,
        row.service_id,
        row.trip_headsign || null
      ]);
    }
    console.log('Trips imported');
  });

  console.log('GTFS import completed');
}

async function importCSV(basePath, filename, callback) {
  const filePath = path.join(basePath, filename);
  
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filename}`);
    return;
  }

  const results = [];
  
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => callback(results).then(resolve).catch(reject))
      .on('error', reject);
  });
}

// Run import
if (require.main === module) {
  db.initDB()
    .then(() => importGTFS())
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = { importGTFS };
