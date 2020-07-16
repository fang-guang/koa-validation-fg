const _ = require('lodash');
const Ajv = require('ajv');
const Boom = require('boom');

class ValidationError {
  constructor(errors) {
    this.code = _.get(errors, 'output.statusCode') || 400;
    this.message = errors.message || errors;
    this.stack = typeof errors.stack === 'string' ? errors.stack.split('\n') : errors.stack;
  }
}

module.exports = (schema = {}, opt = {}) => {
  const options = _.defaultsDeep(opt, {
    // 给属性和items加上默认值
    useDefaults: true,
    // 检查收集所有错误的所有规则
    allErrors: true,
  });
  const ajv = new Ajv(options);
  return async (ctx, next) => {
    // koa传参数 ctx.request.body、ctx.query、ctx.params
    const defaultValidateKeys = ['body', 'query', 'params'];
    const needValidateKeys = _.intersection(
      defaultValidateKeys,
      Object.keys(schema)
    );
    const errors = [];
    needValidateKeys.forEach((item) => {
      const needValidateObj = item === 'body' ? ctx.request.body : ctx[item];
      const validate = ajv.compile(schema[item]);
      const valid = validate(needValidateObj);
      if (!valid) {
        errors.push(ajv.errorsText(validate.errors));
      }
    });
    if (errors.length !== 0) {
      throw new ValidationError(Boom.badRequest(errors));
    }
    await next();
  };
};
