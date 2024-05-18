import mysql from 'mysql2';
import { env } from './environment.js';

const Database = mysql
    .createPool({
        host: env.HOSTNAME,
        database: env.DATABASE_NAME,
        user: env.DATABASE_USER,
        password: env.DATABASE_PASS,
    })
    .promise();

export default Database;
