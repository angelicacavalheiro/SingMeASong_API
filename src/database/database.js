import pg from 'pg';
import '../setup.js';

const { Pool } = pg;

const connectionData = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10),
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
};

const connection = new Pool(connectionData);

export default connection;
