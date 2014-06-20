peabody
====

your wayback machine proxy

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

* `--port <port>` - Listen on port `<port>`, default 7183
* `--version` - Print version information
* `--help` - Print help text

## todo

* currently will return whatever the wayback machine finds nearest to your
  timestamp. so, if you specify a time of `2004` and there isn't any available
  cache before 2008, the 2008 cache will be loaded. 

## license

MIT
