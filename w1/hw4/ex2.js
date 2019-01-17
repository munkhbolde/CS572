const http = require('http')
const {fork} = require('child_process')
const url = require('url')


function home(req, res) {
  if (req.url === '/favicon.ico') {
    res.end()
  } else {
    const child = fork('child.js')
    const href = url.parse(req.url, true)

    child.send(href.query.url)
    child.on('message', data => {
      if (data === 'DONE')
        res.end()
      else
        res.write(data)
    })
  }
}

let server = http.createServer()
server.on('request', home)
server.listen(8080, () => console.log('listening on 8080'))
