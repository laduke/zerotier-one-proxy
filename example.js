var express = require('express')
var Proxy = require('.')

var token = process.env.ZT_TOKEN
var app = express()
app.use('/one', Proxy({ token }))
app.use('*', errorHandler)

app.listen(9018, function () {
  console.log(`http://localhost:${this.address().port}/one/status`)
  console.log(`http://localhost:${this.address().port}/one/network`)
  console.log(`http://localhost:${this.address().port}/one/peer`)
})

function errorHandler (err, req, res, next) {
  res.status(err.status || 500).send({ message: err.message })
}
