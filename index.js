import koa from 'koa'
import serve from 'koa-static'
import router from 'koa-route'
import vhost from 'koa-vhost'
import path from 'path'
import _ from 'lodash'

const port = process.env.PORT || 5000

const app = koa()

const Jade = require('koa-jade')
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

app.use(jade.middleware)
app.use(serve(path.join(__dirname, 'public')))

app.use(router.get('/', function* () {
  this.render('index');
}));

app.use(router.get('/foo', function* () {
  this.body = 'foo';
}));

app.use(router.get('/bar', function* () {
  this.body = 'bar';
}));

app.listen(port, function() {
  console.log('server listening port: ' + port);
});
