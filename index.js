var http = require('http')

var memento = require('memento-client')
  , request = require('hyperquest')

module.exports = peabody

function peabody(timestamp) {
  return http.createServer(handler)

  function handler(req, res) {
    memento(req.url, timestamp, checkSites)

    function checkSites(err, sites) {
      if(err || !sites.length) {
        res.writeHead(404, {'content-type': 'text/plain'})
        res.end('Site not available')
      }

      request.get(sites[1].href, respond)
    }

    function respond(err, response) {
      res.writeHead(200, response.headers)
      response.pipe(res)
    }
  }
}
