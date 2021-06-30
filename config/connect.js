// const Sequelize = require('sequelize');
// require('dotenv').config();

// let sequelize = process.env.JAWSDB_ROSE_URL

// ? new Sequelize(process.env.JAWSDB_ROSE_URL)
// : new Sequelize(process.env.MYSQL_URL);

// module.exports = sequelize;

// Dependencies
// Sequelize constructor
const Sequelize = require('sequelize');
// dotenv for local environmental variables for user name and password
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_ROSE_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_ROSE_URL);
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
}

module.exports = sequelize;