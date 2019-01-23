const express = require('express')
const mongo = require('mongodb').MongoClient
const parser = require('body-parser')

const client = mongo('mongodb://home:27017', {useNewUrlParser: true})
const app = express()

//:1 Create indices
client.connect((err) => {
  db = client.db('cs5')
  db.collection('places').createIndex({name: 1}, {unique: 1})
  db.collection('places').createIndex({location: '2d'})
});

//:1 Helper classes
class Place {
  constructor(name, category, lat, lon) {
    this.name = name
    this.category = category
    this.location = [lon, lat]
  }
}

class Result {
  constructor(data, success) {
    this.data = data
    this.success = success
  }
}

//:1 Setup
app.use(parser.json())
app.use((req, res, next) => {
  req.db = client.db('cs5')
  res.header('Content-Type', 'application/json')
  next()
})

//:1 Home
app.get('/', (req, res) => {
  res.redirect('api/')
})

//:1 /api #get
app.get('/api', async (req, res) => {
  const datas = []
  const lat =  req.query.lat
  const lon =  req.query.lon
  if (lat) {
    const result = await req.db.collection('places')
    .find({'location': {'$near': {lat, lon}}})
    .limit(3).forEach(data => datas.push(data))
    res.json(new Result(datas, true))
    return
  }
  const result = await req.db.collection('places').find({}).forEach(data => datas.push(data))
  res.json(new Result(datas, true))
})

//:1 /api #post
app.post('/api', (req, res) => {
  const name = req.body.name
  const cat = req.body.category
  const lat = req.body.location[0]
  const lon = req.body.location[1]
  req.db.collection('places').insertOne(new Place(name, cat, lon, lat))
  res.redirect('/api')
})

//:1 /api #delete
app.delete('/api/:name', (req, res) => {
  const name = req.params.name
  req.db.collection('places').remove({'name': name})
  res.redirect('/api')
})

// endfold
app.listen(8080, ()=> console.log('listening in 8080'))
