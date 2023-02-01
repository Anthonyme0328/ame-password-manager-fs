const express = require("express");
const app = express()

const mysql = require('mysql')
const cors = require('cors')



const PORT = 3001

app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost' ,
  password: 'Drpib0328!' ,
  database: 'amemanager'
});

app.post('/addPassword', (req, res) => {

  const {password, website} = req.body

  db.query(
    'INSERT INTO passwords (password, website) VALUES (?,?)',
    [password, website],
    (err, result) => {
      if (err) {
        console.log('there was an issue', err)
      } else {
        res.send('winner winner it worked')
        console.log(result)
      }
    }
    )

});

app.listen(PORT, () => {
  console.log('server works')
}) 