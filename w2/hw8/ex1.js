const express = require('express')
const app = express()
const mongo = require('mongodb').MongoClient
const client = mongo('mongodb://home:27017', {useNewUrlParser: true})

//: helpers
client.connect(err => {
  const db = client.db('cs5')
  const collection = db.collection('restraunt')
})

app.use((req, res, next) => {
  req.db = client.db('cs5')
  res.header('Content-Type', 'application/json')
  next()
})
app.get('/', (req, res) => { res.redirect('/result/1') })

//:1 /result/1
app.get('/result/1', async (req, res) => {
  datas = []
  const result = await req.db.collection('restraunt').find({}).forEach((data) => {
    datas.push(data)
  })
  res.json(datas)
})

//:1 /result/2
app.get('/result/2', async (req, res) => {
  datas = []
  fields = {_id: 0, restraunt_id: 1, name: 1, district: 1, cuisine:1}
  const result = await req.db.collection('restraunt')
  .find({}).project(fields)
  .forEach((data) => {
    datas.push(data)
  })
  res.json(datas)
})

//:1 /result/3
app.get('/result/3', async (req, res) => {
  datas = []
  fields = {_id: 0, field_id: 0, restraunt_id: 1, name: 1, district: 1, cuisine:1}
  const result = await req.db.collection('restraunt')
  .find({}, fields).forEach((data) => {
    datas.push(data)
  })
  res.json(datas)
})

//:1 /result/4
app.get('/result/4', async (req, res) => {
  datas = []
  fields = {_id: 0, field_id: 0, restraunt_id: 1, name: 1, district: 1, zipcode:1}
  const result = await req.db.collection('restraunt')
  .find({}, fields).forEach((data) => {
    datas.push(data)
  })
  res.json(datas)
})

//:1 /result/5
app.get('/result/5', async (req, res) => {
  datas = []
  const result = await req.db.collection('restraunt')
  .find({district: 'Bronx'}).forEach((data) => {
    datas.push(data)
  })
  res.json(datas)
})
//:1 /result/6
app.get('/result/6', async (req, res) => {
  datas = []
  const result = await req.db.collection('restraunt')
  .find({district: 'Bronx'}).limit(5).forEach((data) => {
    datas.push(data)
  })
  res.json(datas)
})

//:1 /result/7
app.get('/result/7', async (req, res) => {
  datas = []
  const result = await req.db.collection('restraunt')
  .find({district: 'Bronx'}).skip(5).limit(5).forEach((data) => {
    datas.push(data)
  })
  res.json(datas)
})

//:1 /result/8
app.get('/result/8', async (req, res) => {
  datas = []
  const result = await req.db.collection('restraunt')
  .find({'address.coord': {'$lt': -95.754168}})
  .forEach((data) => {
    datas.push(data)
  })
  res.json(datas)
})

//:1 /result/9
app.get('/result/9', async (req, res) => {
  datas = []
  const result = await req.db.collection('restraunt')
  .find({'$and': [
    {'address.coord': {'$lt': -65.754168}},
    {'grades.score': {'$gt': 70}},
    {'cuisine': {'$not': {'$eq': 'American '}}}
  ]})
  .forEach((data) => {
    datas.push(data)
  })
  res.json(datas)
})

//:1 /result/10
app.get('/result/10', async (req, res) => {
  datas = []
  fields = {'restraunt_id': 1, 'name': 1, 'district':1, 'cuisine': 1}
  const result = await req.db.collection('restraunt')
  .find({'name': {'$regex': '^Wil'}}, fields)
  .forEach((data) => {
    datas.push(data)
  })
  res.json(datas)
})

//:1 /result/11
app.get('/result/11', async (req, res) => {
  datas = []
  fields = {'restraunt_id': 1, 'name': 1, 'district':1, 'cuisine': 1}
  const result = await req.db.collection('restraunt')
  .find({'name': {'$regex': 'ces$'}}, fields).forEach((data) => {
    datas.push(data)
  })
  res.json(datas)
})

//:1 /result/12
app.get('/result/12', async (req, res) => {
  datas = []
  fields = {'restraunt_id': 1, 'name': 1, 'district':1, 'cuisine': 1}
  const result = await req.db.collection('restraunt')
  .find({'name': {'$regex': '.*Reg'}}, fields).forEach((data) => {
    datas.push(data)
  })
  res.json(datas)
})

//:1 /result/13
app.get('/result/13', async (req, res) => {
  datas = []
  const result = await req.db.collection('restraunt')
  .find({'$and': [
    {'district': 'Bronx'},
    {'$or': [{'cuisine': 'American '}, {'cuisine': 'Chinese'}]}
  ]}).forEach((data) => {
    datas.push(data)
  })
  res.json(datas)
})

//:1 /result/14
app.get('/result/14', async (req, res) => {
  datas = []
  fields = {'restraunt_id': 1, 'name': 1, 'district':1, 'cuisine': 1}
  const result = await req.db.collection('restraunt')
  .find({'district': {'$in': ['Bronx', 'Staten Island', 'Queens', 'Brooklyn']}}, fields)
  .forEach((data) => {
    datas.push(data)
  })
  res.json(datas)
})

//:1 /result/15
app.get('/result/15', async (req, res) => {
  datas = []
  fields = {'restraunt_id': 1, 'name': 1, 'district':1, 'cuisine': 1}
  const result = await req.db.collection('restraunt')
  .find({'district': {'$nin': ['Bronx', 'Staten Island', 'Queens', 'Brooklyn']}}, fields)
  .forEach((data) => {
    datas.push(data)
  })
  res.json(datas)
})

//:1 /result/16
app.get('/result/16', async (req, res) => {
  datas = []
  fields = {'restraunt_id': 1, 'name': 1, 'district':1, 'cuisine': 1}
  const result = await req.db.collection('restraunt')
  .find({'grades.score': {'$lte': 10}}, fields).forEach((data) => {
    datas.push(data)
  })
  res.json(datas)
})

//:1 /result/17
app.get('/result/17', async (req, res) => {
  datas = []
  fields = {'restraunt_id': 1, 'name': 1, 'district':1, 'address': 1}
  const result = await req.db.collection('restraunt')
  .find({'address.coord.1': {'$lte': 52, '$gt': 42}}, fields)
  .forEach((data) => {
    datas.push(data)
  })
  res.json(datas)
})

//:1 /result/18
app.get('/result/18', async (req, res) => {
  datas = []
  const result = await req.db.collection('restraunt')
  .find({}, {'sort': {'name': 1}}).forEach((data) => {
    datas.push(data)
  })
  res.json(datas)
})

//:1 /result/19
app.get('/result/19', async (req, res) => {
  datas = []
  const result = await req.db.collection('restraunt')
  .find({}, {'sort': {'name': -1}}).forEach((data) => {
    datas.push(data)
  })
  res.json(datas)
})

//:1 /result/20
app.get('/result/20', async (req, res) => {
  datas = []
  const result = await req.db.collection('restraunt')
  .find({}, {'sort': {'cuisine': 1, 'district': -1}}).forEach((data) => {
    datas.push(data)
  })
  res.json(datas)
})

//:1 /result/21
app.get('/result/21', async (req, res) => {
  datas = []
  const result = await req.db.collection('restraunt')
  .find({'address.steet': {'$exists': 'false'}}).forEach((data) => {
    datas.push(data)
  })
  res.json(datas)
})

//:1 /result/22
app.get('/result/22', async (req, res) => {
  datas = []
  const result = await req.db.collection('restraunt')
  .find({'address.coord': {'$type': 'double'}}).forEach((data) => {
    datas.push(data)
  })
  res.json(datas)
})

//:1 /result/23
app.get('/result/23', async (req, res) => {
  datas = []
  fields = {'name': 1, 'address.coord': 1, 'district': 1, 'cuisine': 1}
  const result = await req.db.collection('restraunt')
  .find({'name': {'$regex': '^Mad'}}).forEach((data) => {
    datas.push(data)
  })
  res.json(datas)
})

// endfold

app.listen(8080, () => console.log('listening on 8080'))
