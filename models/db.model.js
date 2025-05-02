import { createPool } from 'mysql2';
// import { HOST, USER, PASSWORD, DB, PORT } from '../config/db.config.js';
const HOST = process.env.HOST;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const DB = process.env.DB;
const PORT = process.env.DB_PORT;

const connection = createPool({
   host: HOST,
   user: USER,
   password: PASSWORD,
   database: DB,
   port: PORT,
   multipleStatements: true,
   timezone: 'Z',
});

// Test the connection
connection.getConnection((err, conn) => {
   if (err) {
      console.error('❌ Failed to connect to MySQL DB:', err.message);
   } else {
      console.log('✅ MySQL DB connected successfully.');
      conn.release(); // Release connection back to pool
   }
});

export const sql = connection.promise();
