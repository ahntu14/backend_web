import mysql from 'mysql';

const MysqlConnection = mysql.createConnection({
  host: 'localhost',
  database: 'backend_web',
  user: 'root',
  password: ''
})


export default MysqlConnection