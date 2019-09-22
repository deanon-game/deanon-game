import has from 'lodash-es/has'
import modules from './modules/index'

function _type (request) {
  return has(request, 'data.type') ? request.data.type : null
}

function resolve (request) {
  console.log('resolve', request)
  const type = _type(request)
  if (type) {
    return modules[type](request)
  } else {
    throw new Error('Unable to resolve request', request)
  }
}

export default {
  resolve
}
