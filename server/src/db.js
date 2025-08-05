// db.js
const { Pool } = require('pg');

let poolInstance = null;

function getDbInstance() {
  if (!poolInstance) {
    poolInstance = new Pool({
      user: process.env.DB_USER || 'postgres',
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'battleship',
      password: process.env.DB_PASSWORD || 'your_password',
      port: process.env.DB_PORT || 5432,
    });

    // Optional: handle pool errors
    poolInstance.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1);
    });

    console.log('📦 PostgreSQL pool initialized');
  }

  return poolInstance;
}

module.exports = {
  getDbInstance,
};
