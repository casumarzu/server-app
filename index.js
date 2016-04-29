import koa from 'koa'
import serve from 'koa-static'
import router from 'koa-route'
import path from 'path'
import _ from 'lodash'
import pug from 'pug'
import stylus  from 'stylus'

const port = process.env.PORT || 1337

const app = koa()

function stylusMiddleware(options){
  var middleware = stylus.middleware(options);

  function compile(req, res) {
    return function(callback) {
      middleware(req, res, callback)
    }
  }

  return function*(next) {
    yield compile(this.req, this.res)
    yield next;
  }
}

app.use(
  stylusMiddleware(
    path.join(__dirname, 'public')
  )
)

function pugRender(fileName) {
  let file = path.join(__dirname, 'views', `${fileName}.pug`)
  let str = require('fs').readFileSync(file, 'utf8')
  let fn = pug.compile(str, { filename: file, pretty: true })
  return fn()
}

app.use(serve(path.join(__dirname, 'public')))

app.use(router.get('/', function* () {
  this.body = pugRender('index')
}));

app.use(router.get('/foo', function* () {
  this.body = 'foo';
}));

app.listen(port, function() {
  console.log('server listening port: ' + port);
});
