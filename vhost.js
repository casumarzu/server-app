// import vhost from 'koa-vhost'
// // server 1
// var server1 = koa();
// server1.use(jade.middleware);
//
// server1.use(router.get('/', function* () {
//   this.render('index');
// }));
//
// server1.use(router.get('/foo', function* () {
//   this.body = 'foo';
// }));
// server1.use(router.get('/bar', function* () {
//   this.body = 'bar';
// }));
// // server 1
//
//
// // server 2
// var server2 = koa();
// server2.use(jade.middleware);
// server2.use(function *(next) {
//   this.render('index');
// });
// server2.use(router.get('/', function* () {
//   this.render('index');
// }));
//
// server2.use(router.get('/foo', function* () {
//   this.body = 'foo';
// }));
// server2.use(router.get('/bar', function* () {
//   this.body = 'bar';
// }));
// // server 2
//
//
// // server 3
// var server3 = koa();
// server3.use(jade.middleware);
// server3.use(function *(next) {
//   this.render('index');
// });
// server3.use(router.get('/', function* () {
//   this.render('index');
// }));
//
// server3.use(router.get('/foo', function* () {
//   this.body = 'foo';
// }));
// server3.use(router.get('/bar', function* () {
//   this.body = 'bar';
// }));
// // server 3
//
//
// app.use(
//   vhost([
//     { host: 's1.casumarzu.com', app: server1 },
//     { host: 's2.casumarzu.com', app: server2 },
//     { host: 's3.casumarzu.com', app: server3 },
//   ])
// );
