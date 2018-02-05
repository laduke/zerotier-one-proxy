var express = require('express')

var proxy = require('./index')

var app = express()
app.use('/one', proxy)
app.use('*', errorHandler)

app.listen(9017, function () {
  console.log(`http://localhost:${this.address().port}/one/status`)
  console.log(`http://localhost:${this.address().port}/one/network`)
  console.log(`http://localhost:${this.address().port}/one/peer`)
})

function errorHandler (err, req, res, next) {
  res.send(err)
}
