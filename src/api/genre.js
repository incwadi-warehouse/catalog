import request from '~b/api'

const base = '/api/genre'

export const list = function () {
  return request().get(base + '/')
}

export const create = function (data) {
  return request().post(base + '/new', data)
}

export const update = function (id, data) {
  return request().put(base + '/' + id, data)
}

export const remove = function (id) {
  return request().delete(base + '/' + id)
}

export default { list, create, update, remove }
