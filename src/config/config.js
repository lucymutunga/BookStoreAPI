<<<<<<< HEAD
require("dotenv").config();
=======
require('dotenv').config()

>>>>>>> d9578d836225b519274ae9e7a8d031904002bc70
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
<<<<<<< HEAD
  server: "localhost",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};
module.exports = config;
=======
  server: 'localhost',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}
module.exports = config;
>>>>>>> d9578d836225b519274ae9e7a8d031904002bc70
