import request from '~b/api'

const base = '/api/tag'

export const list = function () {
  return request().get(base + '/')
}

export const create = function (data) {
  return request().post(base + '/', data)
}

export const remove = function (id) {
  return request().delete(base + '/' + id)
}

export default { list, create, remove }
