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
  // app: app // equals to jade.use(app) and app.use(jade.middleware)
})

app.use(jade.middleware);
app.use(serve(path.join(__dirname, 'public')));

app.use(router.get('/', function* () {
  this.render('index');
}));

app.use(router.get('/foo', function* () {
  this.body = 'foo';
}));

app.use(router.get('/bar', function* () {
  this.body = 'bar';
}));

// server 1
var server1 = koa();
server1.use(jade.middleware);

server1.use(router.get('/', function* () {
  this.render('index');
}));

server1.use(router.get('/foo', function* () {
  this.body = 'foo';
}));
server1.use(router.get('/bar', function* () {
  this.body = 'bar';
}));
// server 1


// server 2
var server2 = koa();
server2.use(jade.middleware);
server2.use(function *(next) {
  this.render('index');
});
server2.use(router.get('/', function* () {
  this.render('index');
}));

server2.use(router.get('/foo', function* () {
  this.body = 'foo';
}));
server2.use(router.get('/bar', function* () {
  this.body = 'bar';
}));
// server 2


// server 3
var server3 = koa();
server3.use(jade.middleware);
server3.use(function *(next) {
  this.render('index');
});
server3.use(router.get('/', function* () {
  this.render('index');
}));

server3.use(router.get('/foo', function* () {
  this.body = 'foo';
}));
server3.use(router.get('/bar', function* () {
  this.body = 'bar';
}));
// server 3

app.use(
  vhost([
    { host: 's1.example.com', app: server1 },
    { host: 's2.example.com', app: server2 },
    { host: 's3.example.com', app: server3 },
  ])
);


app.listen(port, function() {
  console.log('server listening port: ' + port);
});
