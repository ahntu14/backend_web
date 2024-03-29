import express from 'express';
import Database from './config/mysql.js';
import { env } from './config/environment.js';
import cors from 'cors';
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware.js';
import bodyParser from 'body-parser';
import { API } from './routes/index.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(API);

app.use(errorHandlingMiddleware);

app.listen(env.PORT, () => {
    console.log(`Server is running at ${env.HOSTNAME}:${env.PORT}`);
});

Database.getConnection(function (err) {
    if (err) {
        console.log('Error connecting to Mysql ' + err.stack);
    } else {
        console.log('Connected to database ');
    }
});
