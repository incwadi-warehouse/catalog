import { request } from '@/api'
import { onMounted, ref } from 'vue'

export function useBookmark() {
  const bookmarks = ref([])

  const list = () => {
    return request('get', '/api/bookmark/').then((res) => {
      bookmarks.value = res.data
    })
  }

  onMounted(list)

  const createFromPage = () => {
    return request('post', '/api/bookmark/new', {
      url: window.location.href,
    }).then(() => {
      list()
    })
  }

  const open = (url) => {
    window.location.href = url
  }

  return {
    bookmarks,
    list,
    createFromPage,
    open,
  }
}
