// const express = require('express');
// const app = express();
//
// app.set('port', (process.env.PORT || 5000));
//
// app.use(express.static(__dirname + '/public'));
//
// // views is directory for all template files
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
//
// app.get('/', function(request, response) {
//   response.render('pages/index');
// });
//
// app.listen(app.get('port'), function() {
//   console.log('Node app is running on port', app.get('port'));
// });

const koa = require('koa');
const serve = require('koa-static-folder');
const router = require('koa-route');
const vhost = require('koa-vhost');
const path = require('path');
const _ = require('lodash');
const port = process.env.PORT || 5000;


const app = koa();

const Jade = require('koa-jade');
const jade = new Jade({
  viewPath: path.join(__dirname, 'views'),
  debug: true,
  pretty: true,
  compileDebug: true,
  // basedir: 'path/for/jade/extends',
  // helperPath: [
  //   'path/to/jade/helpers',
  //   { random: 'path/to/lib/random.js' },
  //   { _: require('lodash') }
  // ],
  app: app // equals to jade.use(app) and app.use(jade.middleware)
})

app.use(serve(path.join(__dirname, 'public')));


app.use(function * (next) {
  this.render('index');
  // yield this.render('index.jade');
});

app.listen(port, function() {
  console.log('server listening port: ' + port);
});
