const v = {};
v.schema = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      age: {
        type: 'number', maximum: 35, minimum: 18, default: 24,
      },
      foo: { type: 'array', items: { type: 'number' } },
      bar: { type: 'boolean' },
      // Date对象比日期/时间字符串大（且不便于携带），因此我实际上建议将Date对象转换为字符串
      time: {
        type: 'object',
        format: 'date-time',
      },
    },
    required: ['foo'],
  },
  query: {
    type: 'object',
    properties: {
      like: { type: 'string' },
      detail: { type: 'string', default: '' },
    },
    required: ['like'],
  },
};
const schema = async (ctx) => {
  const {
    name, age, foo, bar, time,
  } = ctx.request.body;
  const { like, detail } = ctx.query;

  ctx.body = {
    sucessful: true,
    data: {
      body: {
        name, age, foo, bar, time,
      },
      query: {
        like, detail,
      },
    },
  };
};
module.exports = {
  v,
  schema,
};
