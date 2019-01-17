const fs = require('fs')
const {promisify} = require('util')


function task(file) {
  /*
  fs.readFile(file, (err, data) => {
    process.send(data.toString())
  })
  */
  const readable = fs.createReadStream(file)
  readable.on('data', chunck => process.send(chunck.toString()))
  readable.on('end', chunck => {
    process.send("DONE")
  })
}

process.on('message', task)
