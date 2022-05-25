import { ref } from '@vue/composition-api'
import { request } from '@/api'

export function useAuthor() {
  const authors = ref(null)
  const author = ref(null)

  const find = (data) => {
    return request('get', '/api/author/find', null, data).then((res) => {
      authors.value = res.data
    })
  }

  const show = (id) => {
    return request('get', '/api/author/' + id).then((res) => {
      author.value = res.data
    })
  }

  const update = (id, data) => {
    return request('put', '/api/author/' + id, data)
  }

  const remove = (id) => {
    return request('delete', '/api/author/' + id)
  }

  return { authors, author, find, show, update, remove }
}
