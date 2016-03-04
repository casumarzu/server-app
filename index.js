var koa = require('koa');
var router = require('koa-route');
var vhost = require('koa-vhost');
var Jade = require('koa-jade');
var path = require('path');
var _ = require('lodash');
var port = process.env.PORT || 5000;

var server = koa();

server.use(function * (next) {
  this.body = 'default Koa server';
});

server.listen(port, function() {
  console.log('server listening port' + port);
});
