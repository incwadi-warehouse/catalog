import { onMounted, reactive } from '@vue/composition-api'
import api from '@/api/bookmark'

export default function useBookmark() {
  const state = reactive({
    bookmarks: [],
  })

  const list = () => {
    api.list().then((response) => {
      state.bookmarks = response.data
    })
  }

  onMounted(list)

  const create = (data) => {
    console.log(data)
    api.create({ url: data }).then(() => {
      list()
    })
  }

  const createFromPage = () => {
    api.create({ url: window.location.href }).then(() => {
      list()
    })
  }

  const open = (url) => {
    window.location.href = url
  }

  const remove = (data) => {
    api.remove(data.id).then(() => {
      list()
    })
  }

  const update = (data) => {
    api.update(data.id, { name: data.name, url: data.url }).then(() => {
      list()
    })
  }

  return {
    state,
    list,
    create,
    createFromPage,
    open,
    remove,
    update,
  }
}
