var {Observable, of} = require('rxjs');
var {map:rxmap} = require('rxjs/operators');

//:1 promise
function promise(self, ban) {
    return new Promise((resolve, reject) => {
      if (true) {
        let val = self.split(' ').map(word => ban.includes(word) ? '***': word).join(' ')
        resolve(val)
      }
      reject(new Error('error'))
    })
}

//:1 async await
async function asyncAwait(self, ban) {
    return await new Promise((resolve, reject) => {
      if (true) {
        let val = self.split(' ').map(word => ban.includes(word) ? '***': word).join(' ')
        resolve(val)
      }
      reject(new Error('error'))
    })
}

//:1 filterWords
String.prototype.filterWords = function(ban) {
  if (ban.includes('promise'))
    promise(this, ban).then(data => console.log(data))

  if (ban.includes('async'))
    asyncAwait(this, ban).then(data => console.log(data))

  if (ban.includes('observable')) {
      of(this.split(' ')).pipe(
        rxmap(word => ban.includes(word) ? '***': word)
      ).subscribe(data => console.log(data))
  }

  return this.split(' ').map(word => ban.includes(word) ? '***' : word).join(' ')
}
// endfold

let str = 'We should ban some words using ES6 features promise async and observable'
str.filterWords(['promise'])
str.filterWords(['async'])
str.filterWords(['ES6', 'features'])
str.filterWords(['observable'])
