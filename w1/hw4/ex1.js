var {of} = require('rxjs')
var os = require('os')


//:1 Check system
function checkSystem() {
  console.log('Checking your system')
  specs = true

  if (os.freemem() < 4000000000) {
    specs = false
    console.log('This is app needs at least 4GB ram')
  }

  if (os.cpus().length < 2) {
    specs = false
    console.log('Processor is not supported')
  }
  if (specs)
    console.log('System is checked successfully')

}
// endfold

let arr = [1,2,3]
of(arr).subscribe(checkSystem);

