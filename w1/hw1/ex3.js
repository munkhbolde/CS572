const item = {
  name: 'Biscuits',
  type: 'regular',
  category: 'food',
  price: 200
}

function applyCoupon(item) {
  return function(price) {
    return item.price - item.price / price
  }
}

console.log(applyCoupon(item)(10) === 180)
