import request from '~b/api'

const base = '/api/book'

export const stats = function () {
  return request().get(base + '/stats')
}

export default { stats }
