# yaml-template

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)  [![Build Status](https://travis-ci.org/delvedor/yaml-template.svg?branch=master)](https://travis-ci.org/delvedor/yaml-template)

Declare js objects with style using [yaml](http://yaml.org/) syntax.  
Use es6 [template strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) to declare your object and use this module as tagged template to convert it to a js object.

<a name="install"></a>
## Install
```js
npm i yaml-template --save
```

<a name="usage"></a>
## Usage
```js
const yaml = require('yaml-template')

const obj = yaml`
  array:
    - value: 2
    - value: 4
    - value: 6
`

console.log(obj)
// {
//   array: [
//     { value: 2 },
//     { value: 4 },
//     { value: 6 }
//   ]
// }
```

It can be super useful if you must declare json schema (less brackets!)
```js
var schema = {
  querystring: {
    type: 'object',
    properties: {
      name: { type: 'string' },
      excitement: { type: 'integer' }
    }
  },
  responses: {
    200: {
      type: 'object',
      properties: {
        hello: { type: 'string' }
      }
    }
  }
}

// will become

var schema = yaml`
  querystring:
    type: object
    properties:
      name:
        type: string
      excitement:
        type: string
  responses:
    200:
      responses:
        type: object
        properties:
          hello:
            type: string
`
```

<a name="acknowledgements"></a>
## Acknowledgements

This project is kindly sponsored by [LetzDoIt](http://www.letzdoitapp.com/).  
The parser is done by [js-yaml](https://www.npmjs.com/package/js-yaml) and the implementation is inspired by [2ality](http://2ality.com/2015/01/template-strings-html.html).

<a name="license"></a>
## License

[MIT](https://github.com/delvedor/yaml-template/blob/master/LICENSE)

Copyright © 2017 Tomas Della Vedova
