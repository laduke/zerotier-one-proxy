var httpProxy = require('http-proxy')

module.exports = function Proxy (opts) {
  opts = opts || {}

  var token = opts.token
  var host = opts.host || 'http://localhost:9993'

  var proxy = httpProxy.createProxyServer()

  proxy.on('proxyReq', function (proxyReq, req, res, options) {
    var reqToken = proxyReq.getHeader('x-zt1-auth')
    if (token && !reqToken) {
      proxyReq.setHeader('X-ZT1-Auth', token)
    }
  })

  return function (req, res, next) {
    cors(req, res)

    if (req.method === 'OPTIONS') return res.status(200).end()

    proxy.web(req, res, { target: host }, function (e) {
      var message
      if (e.code === 'ECONNRESET') {
        message = 'zerotier-one may have just crashed'
      } else if (e.code === 'ECONNREFUSED') {
        message = 'Is zerotier-one running?'
      }

      var err = new Error(message)
      err.status = 502

      next(err)
    })
  }

  function cors (req, res) {
    res.setHeader('access-control-allow-origin', '*')
    res.setHeader('access-control-allow-methods', '*')
    res.setHeader('access-control-allow-headers', 'content-type,x-zt1-auth')
    res.setHeader('access-control-allow-credentials', 'true')
  }
}
