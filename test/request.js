// 该模块的目的是提供用于测试HTTP的高级抽象，同时仍允许您使用superagent提供的低级API
const request = require('supertest');
const _ = require('lodash');

const app = require('./service');
/**
 * @param {Object} options
 * @example {
 *  method: 'post',
 *  url: '/hello',
 *  data: {
 *    userId: 'fg', password: '11231', loginType: 'trade', ticket: '12313123',
 *   },
 *  qs: { room_id: '132321312 },
 *  header: { Cookie: '23423423423asdasda' },
 * }
 */
module.exports = (options, query) => {
  const opts = _.isString(options) ? { url: options, query } : options;
  const method = opts.method || opts.methods || 'get';
  let req = request(app.callback())[method](opts.url);
  if (opts.data) {
    req = req.send(opts.data);
  }
  if (opts.header && _.isObject(opts.header)) {
    _.each(opts.header, (val, key) => req.set(key, val));
  }

  return req
    .query(opts.query || opts.qs || {})
    .set('Accept', 'application/json');
};
