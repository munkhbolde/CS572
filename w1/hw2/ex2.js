Array.prototype.even = function() {
  new Promise((resolve, reject) => {
    let evens = this.filter(d => d % 2 == 0)
    resolve(evens)
    reject(new Error("Error"))
  }).then(d => console.log(d))
}

Array.prototype.odd = function() {
  new Promise((resolve, reject) => {
    let evens = this.filter(d => d % 2 == 1)
    resolve(evens)
    reject(new Error("Error"))
  }).then(d => console.log(d))
}


let v = [1, 2, 3, 4, 5, 6, 7, 8]
v.even()
v.odd()
