require('dotenv').config();
const sql = require('mssql');

const dbSettings = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    // pool: {
    //     max: 10,
    //     min: 0,
    //     idleTimeoutMillis: 30000
    // },
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

async function getConnection(){

    
    try {
        const pool = await sql.connect(dbSettings); 
        return pool;


    } catch (error) {
        console.log(error);
    }


}

module.exports = getConnection;
