# koa-validation-fg
A middleware of verify koa params

__attention:__
the schema config rule as some as ajv.

Validation keywords  [how to config schema](https://github.com/ajv-validator/ajv#validation-keywords).
Validation and reporting options  [how to config reporting options](https://github.com/ajv-validator/ajv#validation-and-reporting-options).

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
 * @param {Number} code  400
 * @param {String} message  error message
 * @param {Arrary} stack  error location
 * 
 * @example
 * {
 * code: 400, 
 * message: "data should have required property 'age', data.bar should be boolean", 
 * stack: [ 
 * "Error: data should have required property 'age', data.bar should be boolean",
 *  "    at /Users/fg/Desktop/koa-validation-fg/src/index.js:38:38",]
 * ......
 * }
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

