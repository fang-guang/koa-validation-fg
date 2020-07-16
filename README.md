# koa-validation-fg
A middleware of verify koa params

__attention:__
the schema config rule as some as ajv.

Validation keywords  [link](https://github.com/ajv-validator/ajv#validation-keywords).
Validation and reporting options  [link](https://github.com/ajv-validator/ajv#validation-and-reporting-options).

# Getting Start

## NPM

Installation

```shell
npm i -S koa-validation-fg
```
## params
```javascript
/**
 * @param {schem} schema  need validation keyword's schema
 * @param {Object} opt  Validation and reporting options
 * /
 * @throw {Error}
 * {code: 400, message: "data should have required property 'age', data.bar should be boolean", stack}
```

## quotoe
```javascript
const validate = require('koa-validation-fg')
const Router = require('koa-router');
const router = new Router();
router.post('/hello', validate(home.v.schema1), home.schema1);

```
## Usage

### default suppose many error meanwhile throw by array form

**Example**
```javascript
const validate = require('koa-validation-fg')
const Router = require('koa-router');
const router = new Router();
const schema = {
  body: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      age: {
        type: 'number', maximum: 35, minimum: 18,
      },
      bar: { type: 'boolean' },
    },
    required: ['name', 'age'],
  },
};
// body params = { "name": "fg", "foo": [1, "2"] }
router.post('/hello', validate(home.v.schema1), home.schema1);
// throw error  {code: 400, message: "data should have required property 'age', data.bar should be boolean"}
```

