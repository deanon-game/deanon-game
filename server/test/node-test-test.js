const assert = require('chai').assert
const a = 1

describe('testing mocha', () => {
  it('First test', () => {
    assert.equal(a, 1, 'a is 1')
  })
})
