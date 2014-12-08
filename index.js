var http = require('http')
  , url = require('url')

var memento = require('memento-client')
  , request = require('hyperquest')

var timeNear = require('./lib/time-near')

var WAYBACK_HOST = 'web.archive.org'
  , isAsset = /\/web\/\d{14}/

module.exports = peabody

function peabody(timestamp, fuzz, _host) {
  var host = _host || WAYBACK_HOST

  return http.createServer(handler)

  function handler(req, res) {
    var assetUrl

    if(!isAsset.test(req.url)) {
      return memento(req.url, timestamp, checkSites)
    }

    assetUrl = url.format({
        host: host
      , pathname: url.parse(req.url).path
      , protocol: 'http'
    })

    request.get(assetUrl, assetRespond)

    function checkSites(err, sites) {
      var noSites = sites.length < 2

      if(err || noSites || !timeNear(sites[1].datetime, timestamp, fuzz)) {
        return notFound(res)
      }

      request.get(sites[1].href, respond)
    }

    function respond(err, response) {
      if(err) {
        return notFound(res)
      }

      response.pipe(res)
      res.writeHead(response.statusCode, response.headers)
    }

    function assetRespond(err, response) {
      if(err) {
        return notFound(res)
      }

      var assetUrl

      if(response.statusCode === 302) {
        assetUrl = url.format({
            host: host
          , pathname: response.headers.location
          , protocol: 'http'
        })

        return request.get(assetUrl, assetRespond)
      }

      res.writeHead(response.statusCode, response.headers)

      if(response.statusCode < 200 || response.statusCode > 299) {
        return res.end()
      }

      response.pipe(res)
    }
  }
}

function notFound(res) {
  res.writeHead(404, {'content-type': 'text/plain'})

  res.end('Site not available')
}
