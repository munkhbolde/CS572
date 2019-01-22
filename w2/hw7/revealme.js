const express = require('express')
const mongo = require('mongodb').MongoClient
const app = express()
const client = mongo('mongodb://home:27017')

const crypto = require('crypto')
const algorithm = 'aes-256-cbc'
const key = 'asaadsaad'

//:1 Connection
client.connect(err => {
  const db = client.db('secret')
  const collection = db.collection('reveal')
  collection.insert({message: 'ba12e76147f0f251b3a2975f7acaf446a86be1b4e2a67a5d51d62f7bfbed5c03'})
})


//:1 Secret
app.get('/', (req, res) => {
  res.redirect('/secret')
})

app.get('/secret', (req, res) => {
  res.header('Content-Type', 'application/json; charset=utf-8')
  const db = client.db('secret')
  const collection = db.collection('reveal')

  collection.findOne({}, (err, doc) => {
    let decipher = crypto.createDecipher(algorithm, key);
    let decrypted = decipher.update(doc.message, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8')
    res.json([{data: decrypted, success: true}])
  })

})
// endfold
app.listen(8080, () => console.log('listening on 8080'))
