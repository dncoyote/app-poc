import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';

// MySQL connection pool for raw queries
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'test123',
  database: 'test_crud',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Initialize Sequelize
const sequelize = new Sequelize('test_crud', 'root', 'test123', {
  host: 'localhost',
  dialect: 'mysql',
});

// Function to initialize the database
export const initializeDatabase = async () => {
  try {
    const connection = await pool.getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS Products (
        ProductID int AUTO_INCREMENT PRIMARY KEY,
        Price int,
        ProductName varchar(255)
      )
    `);
    
    await connection.query(`
      CREATE TABLE IF NOT EXISTS Statements (
        id varchar(36) PRIMARY KEY,
        Category varchar(255),
        Type ENUM('SALARY', 'CREDIT', 'DEBIT'),
        Amount decimal(10, 2),
        Description varchar(255),
        Date datetime
      )
    `);
    
    connection.release();
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

// Function to query the database
export const query = (sql: string, values?: any) => {
  return pool.query(sql, values);
};

// Export the Sequelize instance
export default sequelize;
