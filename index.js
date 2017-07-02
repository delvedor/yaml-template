'use strict'

const yaml = require('js-yaml')

function yamlTag () {
  const args = new Array(arguments.length)
  for (var i = 0; i < args.length; i++) {
    args[i] = arguments[i]
  }

  const string = args.shift()
  const raw = string.raw
  var result = ''

  args.forEach(applySubstitutions)
  result += raw[raw.length - 1]
  return yaml.safeLoad(result)

  function applySubstitutions (arg, i) {
    var lit = raw[i]
    if (Array.isArray(arg)) {
      arg = arg.join('')
    }
    result += lit + arg
  }
}

module.exports = yamlTag
