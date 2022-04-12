const { Pool } = require('pg');

const pool = new Pool({
    database : "postgres",
user : "postgres",
password : "password",
host : "127.0.0.1",
port : "5432"
});

pool.connect();


module.exports = pool;
