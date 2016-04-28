import koa from 'koa'
import serve from 'koa-static'
import router from 'koa-route'
import path from 'path'
import _ from 'lodash'
import Jade  from 'koa-jade'
import stylus  from 'koa-stylus'

const port = process.env.PORT || 1337

const app = koa()

const jade = new Jade({
  viewPath: path.join(__dirname, 'views'),
  debug: true,
  pretty: true,
  compileDebug: true
})

app.use(jade.middleware)

app.use(stylus('./public'))

// app.use(stylus.middleware({
//   src: __dirname + '/public',
//   compile: function (str, path) {
//     return stylus(str).set('filename', path).use(nib())
//   }
// }))

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
