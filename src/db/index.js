const mariadb = require('mariadb');
const ENV = process.env;

const pool = mariadb.createPool({
    host: ENV.DB_HOST, 
    user:ENV.DB_USER, 
    password: ENV.DB_PASSWORD,
    port: ENV.DB_PORT ,
    database:ENV.DB_DATABASE,
    connectionLimit: 10,
    multipleStatements: true
});

module.exports = pool;