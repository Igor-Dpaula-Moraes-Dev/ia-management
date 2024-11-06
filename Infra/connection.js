//const mysql = require('mysql');
//require('dotenv').config()
import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const connection = mysql.createPool({
    "connectionLimit" : 1000,
    "user" : process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database" : process.env.MYSQL_DATABASE,
    "host": process.env.MYSQL_HOST,
    "port" : process.env.MYSQL_PORT,
    "multipleStatements": true,
    "charset":'utf8mb4'
});

export const execute = (query, params=[]) => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, (error, result, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(result)
            }
        });
    })
}

export default connection ;