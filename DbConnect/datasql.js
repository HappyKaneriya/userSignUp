const sql = require('mssql');

const config = {
  user: 'sa',
  password: 'admin@123',
  server: 'DESKTOP-7ANOI7J\\MSSQLSERVER2025',
  port: 1433,
  database: 'SignUp',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const connectToDB = async () => {
  try {
    const pool = await sql.connect(config);
    console.log('✅ Connected to MSSQL');
    return pool;
  } catch (err) {
    console.error('❌ Database connection failed:', err);
    throw err;
  }
};

module.exports = {
  sql,
  connectToDB,
};

