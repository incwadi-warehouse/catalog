import { reactive } from '@vue/composition-api'
import api from '@/api/author'

export default function useAuthor() {
  const state = reactive({
    authors: null,
    author: null,
  })

  const find = (data) => {
    api.find(data).then((res) => {
      state.authors = res.data
    })
  }

  const show = (id) => {
    api.show(id).then((res) => {
      state.author = res.data
    })
  }

  const update = (id, data) => {
    api.update(id, data)
  }

  const remove = (id) => {
    api.remove(id)
  }

  return { state, find, show, update, remove }
}
