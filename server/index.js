const express = require("express");

const app = express()
const mysql = require('mysql')
const PORT = 3001

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost' ,
  password: 'Drpib0328!' ,
  database: 'amemanager'
});

app.post('/addPassword', (req, res) => {

  const {password, title} = req.body

  db.query(
    'INSERT INTO password (password, website) VALUES (?,?)',
    [password, title],
    (err, result) => {
      if (err) {
        console.log('there was an issue', err)
      } else {
        res.send('winner winner it worked')
      }
    }
    )

});

app.listen(PORT, () => {
  console.log('server works')
}) 