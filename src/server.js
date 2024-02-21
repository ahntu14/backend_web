import express from 'express'
import MysqlConnection from './config/mysql.js'

const app = express()

app.use(express.json())

const hostname = 'localhost'
const port = 1406


app.listen(port, hostname, () => {
  console.log(`Server is running at ${ hostname }:${ port }`)
})

MysqlConnection.connect(function (err) {
  if(err) {
    console.log("Error connecting to Mysql " + err.stack);
  } else {
    console.log("Connected to database ")
  }
})

app.get('/', (req, res) => {
  const query = 'Select * from user'
  MysqlConnection.query(query, (err, results) => {
    if(err) {
      throw err
    } else {
      res.send(results)
    }
  })
})
