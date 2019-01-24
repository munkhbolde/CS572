const express = require('express')
const mongo = require('mongodb').MongoClient
const client = mongo('mongodb://home:27017', {useNewUrlParser: true})
const app = express()

//:1 Helper
client.connect()
app.use((req, res, next) => {
  res.header('Content-Type', 'application/json')
  req.db = client.db('cs5')
  next()
})

app.get('/', (req, res) => { res.redirect('/result/1') })
//:1 All zipcodes in IA
app.get('/result/1', async (req, res) => {
  let result = []
  const temp = await req.db.collection('zipcode')
  .aggregate([
    {$match: {state: 'IA'}},
    {$project: {_id: 0, zipcode: '$_id'}}
  ]).forEach(data => { result.push(data) })

  res.json(result)
})

//:1 All zipcodes with population more than 1000 in IA
app.get('/result/2', async (req, res) => {
  let result = []
  const temp = await req.db.collection('zipcode')
  .aggregate([
    {$match: {pop: {'$gt': 1000}}},
    {$project: {_id: 0, zipcode: '$_id', population: '$pop'}},
  ]).forEach(data => { result.push(data) })
  res.json(result)
})

//:1 All cities that have more than one zipcode and sorted by state and city name
app.get('/result/3', async (req, res) => {
  let result = []
  const temp = await req.db.collection('zipcode')
  .aggregate([
    {$group: {_id: {state: '$state', city: '$city'}, zips: {$sum: 1}}},
    {$match: {zips: {'$gt': 1}}},
    {$sort: {'_id.state': 1, '_id.city': 1}}
  ]).forEach(data => { result.push(data) })
  res.json(result)
})

//:1 Least populated city in each state
app.get('/result/4', async (req, res) => {
  let result = []
  const temp = await req.db.collection('zipcode')
  .aggregate([
    {$group: {_id: {state: '$state', city: '$city'}, pop: {$sum: '$pop'}}},
    {$sort: {'_id.state': -1, pop: 1}},
    {$group: {_id: '$_id.state', city: {$first: '$_id.city'}, pop: {$min: '$pop'}}}
  ]).forEach(data => { result.push(data) })
  res.json(result)
})
// endfold

app.listen(8080, () => console.log('listening on 8080'))
