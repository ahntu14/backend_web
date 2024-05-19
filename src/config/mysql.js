import mysql from 'mysql2';
import { env } from './environment.js';

const Database = mysql
    .createPool({
        host: env.HOSTNAME,
        database: env.DATABASE_NAME,
        port: env.DATABASE_PORT,
        user: env.DATABASE_USER,
        password: env.DATABASE_PASS,
        connectionLimit: 5,
    })
    .promise();

export default Database;
