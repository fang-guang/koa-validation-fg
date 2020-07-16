const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');

const validate = require('../src/index');
const home = require('./controller.js');

const app = new Koa();

app.on('error', (error) => {
  throw error;
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.body = err;
  }
});

app.use(bodyParser());

app.use((() => {
  const router = new Router();
  router.post('/hello', validate(home.v.schema), home.schema);
  return router.routes();
})());

if (!module.parent) {
  app.listen(3111);
}

module.exports = app;
