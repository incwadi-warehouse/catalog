import { reactive } from '@vue/composition-api'
import { request } from '~b/api'

export default function useAuthor() {
  const base = '/api/author'

  const state = reactive({
    authors: null,
    author: null,
  })

  const find = (data) => {
    return request('get', base + '/find', null, data).then((res) => {
      state.authors = res.data
    })
  }

  const show = (id) => {
    return request('get', base + '/' + id).then((res) => {
      state.author = res.data
    })
  }

  const update = (id, data) => {
    return request('put', base + '/' + id, data)
  }

  const remove = (id) => {
    return request('delete', base + '/' + id)
  }

  return { state, find, show, update, remove }
}
