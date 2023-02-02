const express = require("express");
const app = express()
const PORT = 3001
const mysql = require('mysql')
const cors = require('cors')

const {encrypt, decrypt} = require('./EncHandler')





app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
  user: 'root',
  host: 'localhost' ,
  password: '********' ,
  database: 'amemanager'
});

app.post('/addPassword', (req, res) => {

  const {password, website} = req.body

  const hashedPassword = encrypt(password)


  db.query(
    'INSERT INTO passwords (password, website, iv) VALUES (?,?,?)',
    [hashedPassword.password, website, hashedPassword.iv],
    (err, result) => {
      if (err) {
        console.log('there was an issue', err)
      } else {
        res.send('winner winner it worked')
      }
    }
    )

});

app.post("/decryptpassword", (req, res) => {
  res.send(decrypt(req.body));
});

app.get('/showPasswords', (req, res) => {
  db.query('SELECT * FROM passwords', (err, result) => {
    if (err) {
      console.log('Hey there was an error', err)
    } else {
    res.send(result)
    }
  })
})

app.listen(PORT, () => {
  console.log('server works')
}) 