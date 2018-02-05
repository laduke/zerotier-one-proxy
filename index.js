require('dotenv').config()
var httpProxy = require('http-proxy')

var token = process.env.ZT_TOKEN || 'keyboard cat'
var host = process.env.ZT_HOST || 'http://localhost:9993'

var proxy = httpProxy.createProxyServer({ headers: { 'X-ZT1-Auth': token } })

module.exports = function (req, res, next) {
  return proxy.web(req, res, { target: host }, function (e) {
    res.statusCode = 500
    next(e)
  })
}
