import request from '~b/api'

const base = '/api/author'

export const find = function (data) {
  return request().get(base + '/find', { params: data })
}

export const show = function (id) {
  return request().get(base + '/' + id)
}

export const update = function (id, data) {
  return request().put(base + '/' + id, data)
}

export const remove = function (id) {
  return request().delete(base + '/' + id)
}

export default { find, show, update, remove }
