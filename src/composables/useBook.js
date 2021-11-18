import { reactive } from '@vue/composition-api'
import api from '@/api/book'

export default function useBook() {
  const state = reactive({
    books: null,
    book: null,
    stats: null,
  })

  const find = (data) => {
    api.find(data).then((res) => {
      state.books = res.data
    })
  }

  const show = (id) => {
    api.show(id).then((res) => {
      state.book = res.data
    })
  }

  const stats = () => {
    api.stats().then((response) => {
      state.stats = response.data
    })
  }

  return { state, find, show, stats }
}
