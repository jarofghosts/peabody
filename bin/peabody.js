#!/usr/bin/env node

var path = require('path')
  , fs = require('fs')

var argParser = require('minimist')

var peabody = require('../')

var package = require('../package.json')

var options = argParser(process.argv.slice(2))
  , port = +options.port || 7183
  , fuzz

if(!options._.length || options.help) return help()
if(options.version) return version()

if(options.fuzz && !isNaN(options.fuzz)) {
  fuzz = options.fuzz * 24 * 60 * 60 * 1000
}

peabody(options._.join(' '), fuzz).listen(port)
console.log('Mr. Peabody listening on port ' + port)

function version() {
  console.error('peabody version ' + package.version)
}

function help() {
  version()
  fs.createReadStream(
      path.join(__dirname, '..', 'help.txt')
  ).pipe(process.stdout)
}
