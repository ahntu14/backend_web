import mysql from 'mysql2';
import { env } from './environment.js';

const Database = mysql
    .createPool({
        host: 'localhost',
        database: env.DATABASE_NAME,
        user: 'root',
        password: '12345678',
    })
    .promise();

export default Database;
