import request from '~b/api'

const base = '/api/book'

export const find = function (data) {
  return request().get(base + '/find', { params: data })
}

export const stats = function () {
  return request().get(base + '/stats')
}

export default { find, stats }
