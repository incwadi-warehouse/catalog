import { reactive } from '@vue/composition-api'
import { request } from '~b/api'

export default function useBook() {
  const base = '/api/book'

  const state = reactive({
    books: null,
    book: null,
    stats: null,
  })

  const find = (data) => {
    return request('get', base + '/find', { params: data }).then((res) => {
      state.books = res.data
    })
  }

  const show = (id) => {
    request('get', base + '/' + id).then((res) => {
      state.book = res.data
    })
  }

  const stats = () => {
    request('get', base + '/stats').then((response) => {
      state.stats = response.data
    })
  }

  return { state, find, show, stats }
}
