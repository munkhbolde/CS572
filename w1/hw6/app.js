const express = require('express')
const morgan = require('morgan')
const parser = require('body-parser')
const cors = require('cors')
const fs = require('fs')
const path = require('path')
const app = express()

//:1 Datas
class Grade {
  constructor(id, name, course, grade) {
    this.id = id
    this.name = name
    this.course = course
    this.grade = grade
  }
}

class Result {
  constructor(data, success) {
    this.data = data
    this.success = success
  }
}

Grades = [new Grade(1, 'Asaad Saad', 'CS572', 95)]

//:1 Setup
const logger = morgan('common', {
  stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
})

app.use(logger)
app.use(cors())
app.use(parser.json())
app.use((req, res, next) => {
  res.header('Content-Type', 'application/json')
  next()
})

//:1 Get
app.get('/api/grades', (req, res) => {
  res.json(new Result(Grades, true))
})

app.get('/api/grades/:id', (req, res) => {
  const id = req.params.id
  const data = Grades.filter((e) => e.id == id)
  res.json(new Result(data, true))
})

//:1 Post
app.post('/api/grades', (req, res) => {
  const id = req.body.id
  const name = req.body.name
  const course = req.body.course
  const grade = req.body.grade
  data = new Grade(id, name, course, grade)
  Grades.push(data)
  res.json(new Result(data, true))
})

//:1 Put
app.put('/api/grades/:id', (req, res) => {
  const data = Grades.filter(e => e.id == req.params.id)[0]
  if (data === undefined)
    res.json(new Result([], false))

  if (req.body.id)
    data.id = req.body.id

  if (req.body.name)
    data.name = req.body.name

  if (req.body.course)
    data.course = req.body.course

  if (req.body.grade)
    data.grade = req.body.grade

  res.redirect('/api/grades/')
})

//:1 Delete
app.delete('/api/grades/:id', (req, res) => {
  Grades = Grades.filter(e => e.id !=  req.params.id)
  res.redirect('/api/grades')
})
// endfold

app.listen(8080, () => console.log('Listening on 8080'))
