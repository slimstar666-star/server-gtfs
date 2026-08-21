const AdmZip = require('adm-zip');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const { pool, initDatabase } = require('./db');
const config = require('./config');

async function parseCsvFromZip(zip, fileName) {
  return new Promise((resolve, reject) => {
    try {
      const buffer = zip.readFile(fileName);
      if (!buffer) {
        resolve([]);
        return;
      }

      const results = [];
      const content = buffer.toString('utf8');
      
      // Простой парсер CSV с учетом кавычек
      const lines = content.split(/\r?\n/);
      if (lines.length < 2) {
        resolve([]);
        return;
      }

      const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
      
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        // Обработка кавычек в CSV
        const values = [];
        let current = '';
        let inQuotes = false;
        
        for (let char of line) {
          if (char === '"') {
            inQuotes = !inQuotes;
          } else if (char === ',' && !inQuotes) {
            values.push(current.trim().replace(/^"|"$/g, ''));
            current = '';
          } else {
            current += char;
          }
        }
        values.push(current.trim().replace(/^"|"$/g, ''));
        
        const row = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });
        results.push(row);
      }
      
      resolve(results);
    } catch (error) {
      console.warn(`⚠️  Could not parse ${fileName}:`, error.message);
      resolve([]);
    }
  });
}

async function importStops(zip) {
  const stops = await parseCsvFromZip(zip, 'stops.txt');
  if (stops.length === 0) {
    console.log('⚠️  No stops found in GTFS');
    return;
  }

  const client = await pool.connect();
  try {
    await client.query('TRUNCATE TABLE stops RESTART IDENTITY');
    
    for (const stop of stops) {
      const lat = parseFloat(stop.stop_lat);
      const lon = parseFloat(stop.stop_lon);
      
      if (isNaN(lat) || isNaN(lon)) continue;
      
      await client.query(
        `INSERT INTO stops (
          stop_id, stop_name, stop_desc, stop_lat, stop_lon,
          zone_id, stop_url, location_type, parent_station,
          stop_timezone, wheelchair_boarding, geom
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, ST_SetSRID(ST_MakePoint($12, $13), 4326))`,
        [
          stop.stop_id,
          stop.stop_name,
          stop.stop_desc,
          lat,
          lon,
          stop.zone_id,
          stop.stop_url,
          stop.location_type ? parseInt(stop.location_type) : null,
          stop.parent_station,
          stop.stop_timezone,
          stop.wheelchair_boarding ? parseInt(stop.wheelchair_boarding) : null,
          lon,
          lat
        ]
      );
    }
    
    console.log(`✅ Imported ${stops.length} stops`);
  } catch (error) {
    console.error('❌ Error importing stops:', error.message);
  } finally {
    client.release();
  }
}

async function importRoutes(zip) {
  const routes = await parseCsvFromZip(zip, 'routes.txt');
  if (routes.length === 0) {
    console.log('⚠️  No routes found in GTFS');
    return;
  }

  const client = await pool.connect();
  try {
    await client.query('TRUNCATE TABLE routes RESTART IDENTITY');
    
    for (const route of routes) {
      await client.query(
        `INSERT INTO routes (
          route_id, agency_id, route_short_name, route_long_name,
          route_desc, route_type, route_url, route_color, route_text_color
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          route.route_id,
          route.agency_id,
          route.route_short_name,
          route.route_long_name,
          route.route_desc,
          route.route_type ? parseInt(route.route_type) : null,
          route.route_url,
          route.route_color,
          route.route_text_color
        ]
      );
    }
    
    console.log(`✅ Imported ${routes.length} routes`);
  } catch (error) {
    console.error('❌ Error importing routes:', error.message);
  } finally {
    client.release();
  }
}

async function importTrips(zip) {
  const trips = await parseCsvFromZip(zip, 'trips.txt');
  if (trips.length === 0) {
    console.log('⚠️  No trips found in GTFS');
    return;
  }

  const client = await pool.connect();
  try {
    await client.query('TRUNCATE TABLE trips RESTART IDENTITY');
    
    for (const trip of trips) {
      await client.query(
        `INSERT INTO trips (
          trip_id, route_id, service_id, trip_headsign,
          trip_short_name, direction_id, block_id, shape_id,
          wheelchair_accessible
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          trip.trip_id,
          trip.route_id,
          trip.service_id,
          trip.trip_headsign,
          trip.trip_short_name,
          trip.direction_id ? parseInt(trip.direction_id) : null,
          trip.block_id,
          trip.shape_id,
          trip.wheelchair_accessible ? parseInt(trip.wheelchair_accessible) : null
        ]
      );
    }
    
    console.log(`✅ Imported ${trips.length} trips`);
  } catch (error) {
    console.error('❌ Error importing trips:', error.message);
  } finally {
    client.release();
  }
}

async function importGtfs() {
  console.log('🚀 Starting GTFS import...');
  
  try {
    await initDatabase();
  } catch (error) {
    console.error('❌ Failed to initialize database:', error.message);
    process.exit(1);
  }

  const gtfsPath = config.gtfsStaticPath;
  
  if (!fs.existsSync(gtfsPath)) {
    console.error(`❌ GTFS file not found: ${gtfsPath}`);
    console.log('💡 Please place your GTFS ZIP file at this location');
    process.exit(1);
  }

  console.log(`📦 Loading GTFS from: ${gtfsPath}`);
  
  try {
    const zip = new AdmZip(gtfsPath);
    
    await importStops(zip);
    await importRoutes(zip);
    await importTrips(zip);
    
    console.log('✅ GTFS import completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ GTFS import failed:', error.message);
    process.exit(1);
  }
}

// Запуск если вызван напрямую
if (require.main === module) {
  importGtfs();
}

module.exports = { importGtfs };