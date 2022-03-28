const { Pool } = require('pg');

const pool = new Pool({
    database : "postgres",
user : "postgres",
password : "Bsdka",
host : "127.0.0.1",
port : "5432"
});

pool.connect();


module.exports = pool;
