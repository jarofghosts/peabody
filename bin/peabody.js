#!/usr/bin/env node

var path = require('path')
  , fs = require('fs')

var argParser = require('minimist')

var peabody = require('../')

var package = require('../package.json')

var options = argParser(process.argv.slice(2))
  , port = +options.port || 7183

if(!options._.length || options.help) return help()
if(options.version) return version()

peabody(options._.join(' ')).listen(port)
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
