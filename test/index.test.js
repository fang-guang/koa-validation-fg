const test = require('ava');
const _ = require('lodash');
const request = require('./request');

test('suppose add default value that schema config', async (t) => {
  const { body } = await request({
    method: 'post',
    url: '/hello',
    data: {
      name: 'fg', foo: [1, 2], bar: true,
    },
    qs: { like: 'runing' },
  });
  t.is(body.sucessful, true);
  t.is(_.get(body, 'data.body.age'), 24);
  t.false(!body.data);
});

test('suppose many error meanwhile throw by array form', async (t) => {
  const { body } = await request({
    method: 'post',
    url: '/hello',
    data: {
      name: 'fg', foo: [1, '2'],
    },
    qs: { detail: 'test' },
  });
  t.is(body.message, "data.foo[1] should be number,data should have required property 'like'");
  t.is(body.message.split(',').length, 2);
});


test('will throw 3 error filed that code = 400、message and stack', async (t) => {
  const { body } = await request({
    method: 'post',
    url: '/hello',
    data: {
      name: 'fg', foo: [1, '2'],
    },
    qs: { detail: 'test' },
  });
  t.is(body.code, 400);
  t.true(Object.keys(body).includes('message'));
  t.true(Object.keys(body).includes('stack'));
});
