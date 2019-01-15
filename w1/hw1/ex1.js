var {Observable, of} = require('rxjs');
var {map:rxmap} = require('rxjs/operators');

function promise(self, ban) {
    return new Promise((resolve, reject) => {
      if (true) {
        let val = self.split(' ').map(word => ban.includes(word) ? '***': word).join(' ')
        resolve(val)
      }
      reject(new Error('error'))
    })
}

async function asyncAwait(self, ban) {
    return await new Promise((resolve, reject) => {
      if (true) {
        let val = self.split(' ').map(word => ban.includes(word) ? '***': word).join(' ')
        resolve(val)
      }
      reject(new Error('error'))
    })
}

String.prototype.filterWords = function(ban) {
  if (ban.includes('promise'))
    return promise(this, ban)

  if (ban.includes('async'))
    return asyncAwait(this, ban)

  if (ban.includes('observable')) {
      return of(this.split(' ')).pipe(rxmap(word => ban.includes(word) ? '***': word))
  }

  return this.split(' ').map(word => ban.includes(word) ? '***' : word).join(' ')
}

let str = 'We should ban some words using ES6 features promise async and observable'
str.filterWords(['promise']).then(value => console.log(value))
str.filterWords(['async']).then(value => console.log(value))
console.log(str.filterWords(['ES6', 'features']))
str.filterWords(['observable']).subscribe(value => console.log(value))
