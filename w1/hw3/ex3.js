var http = require('http')
var fs = require('fs')


var server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'application/octet-stream'})
  //var file = fs.createReadStream('/home/horton/CS572/README.md')
  var file = fs.readFile('/home/horton/CS572/README.md', (err, data) => {
    if (err) console.log(err)
  })
  //var file = fs.readFileSync('/home/horton/CS572/README.md')
  res.end(file)
})

server.listen(8000, () => console.log("something is working"))
