'use strict'

/* globals describe, it */

require('tap').mochaGlobals()
const should = require('should')
const yaml = require('./')

describe('yaml-template should convert the yaml string to a js object', () => {
  it('should return a parse yaml string', () => {
    try {
      var obj = yaml`
      language: node_js
      node_js:
        - "8"
        - "7"
        - "6"
        - "5"
        - "4"
      after_script:
        - npm run coveralls
      notifications:
        email:
          on_success: never
          on_failure: always
      `
    } catch (err) {
      should.fail(err)
    }

    obj.should.be.an.Object()
    obj.should.have.property('language', 'node_js')
    obj.node_js.should.be.an.Array()
    obj.after_script.should.be.an.Array()
    obj.notifications.should.be.an.Object().with.property('email')
  })

  it('should throw on invalid yaml', () => {
    try {
      var obj = yaml`
      language: node_js
      - node_js:
      `
      should.fail(obj, 'should throw')
    } catch (err) {
      err.should.be.an.Error()
    }
  })

  it('should support basic operations inside template', () => {
    try {
      var obj = yaml`
      two: ${1 + 1}
      `
    } catch (err) {
      should.fail(err)
    }

    obj.should.be.an.Object()
    obj.should.have.property('two', 2)
  })

  it('should support complex operations inside template', () => {
    try {
      var obj = yaml`
      array: ${[1, 2, 3].map(n => `
        - value: ${n * 2}`
      )}
      `
    } catch (err) {
      should.fail(err)
    }

    obj.should.be.an.Object()
    obj.should.be.deepEqual({
      array: [
        { value: 2 },
        { value: 4 },
        { value: 6 }
      ]
    })
  })

  it('should support nested complex operations inside template', () => {
    try {
      var obj = yaml`
      array: ${[1, 2, 3].map(n => `
        - value: ${['a', 'b', 'c'].reduce((a, b) => `
          ${a}- ${b + n}
          `, '')}`
      )}
      `
    } catch (err) {
      should.fail(err)
    }

    obj.should.be.an.Object()
    obj.should.be.deepEqual({
      array: [
        { value: ['a1', 'b1', 'c1'] },
        { value: ['a2', 'b2', 'c2'] },
        { value: ['a3', 'b3', 'c3'] }
      ]
    })
  })
})
