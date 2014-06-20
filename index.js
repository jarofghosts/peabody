var http = require('http')
  , url = require('url')

var memento = require('memento-client')
  , request = require('hyperquest')

var WAYBACK_HOST = 'web.archive.org'
  , isAsset = /\/web\/\d{14}/

module.exports = peabody

function peabody(timestamp) {
  return http.createServer(handler)

  function handler(req, res) {
    if(isAsset.test(req.url)) {
      return request.get(
          url.format({
              host: WAYBACK_HOST
            , pathname: url.parse(req.url).path
            , protocol: 'http'
          })
        , assetRespond
      )
    }

    memento(req.url, timestamp, checkSites)

    function checkSites(err, sites) {
      if(err || !sites.length) {
        res.writeHead(404, {'content-type': 'text/plain'})

        return res.end('Site not available')
      }

      request.get(sites[1].href, respond)
    }

    function respond(err, response) {
      if(err) {
        res.writeHead(404, {'content-type': 'text/plain'})

        return res.end('Site not available')
      }

      response.pipe(res)
      res.writeHead(response.statusCode, response.headers)
    }

    function assetRespond(err, response) {
      if(err) {
        res.writeHead(404, {'content-type': 'text/plain'})

        return res.end('Site not available')
      }

      if(response.statusCode === 302) {
        return request.get(
            url.format({
                host: WAYBACK_HOST
              , pathname: response.headers.location
              , protocol: 'http'
            })
          , assetRespond
        )
      }

      res.writeHead(response.statusCode, response.headers)

      if(response.statusCode < 200 || response.statusCode > 299) {
        res.end()
      }

      response.pipe(res)
    }
  }
}
