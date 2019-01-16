var dns = require('dns')

//:1 General way
dns.resolve4('www.mum.edu', (err, ip) => console.log(ip))

//:1 Using Promisify for callback
var {promisify} = require('util')
resolve4 = promisify(dns.resolve4)
resolve4('www.mum.edu').then(ip => console.log(ip))

//:1 Using async& await with promise
var {promisify} = require('util')
async function getIP() {
  const ip = await resolve4('www.mum.edu')
  console.log(ip)
}
getIP()
