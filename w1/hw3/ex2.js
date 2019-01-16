var EventEmitter = require('events')

class Gym extends EventEmitter{
  constructor() {
    super()
    this.on('boom', function() {
      setInterval(() => console.log('Athelete is working out'), 1000)
    })
  }
}

new Gym().emit('boom')
