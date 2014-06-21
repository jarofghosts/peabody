peabody
====

[![Build Status](http://img.shields.io/travis/jarofghosts/peabody.svg?style=flat)](https://travis-ci.org/jarofghosts/peabody)
[![npm install](http://img.shields.io/npm/dm/peabody.svg?style=flat)](https://www.npmjs.org/package/peabody)

your [wayback machine](https://archive.org) proxy

## installation

`npm install -g peabody`

## why?

it's like LARPing for internet browsing

## usage

`peabody [options] <time>`

* `<time>` is any piece of a timestamp

then just set your browser's proxy to `localhost:7183` and start browsing the
internet of `<time>`!

### options

* `--fuzz <days>` - Allow `<days>` fuzziness in time travel
* `--port <port>` - Listen on port `<port>`, default 7183
* `--version` - Print version information
* `--help` - Print help text

## license

MIT
