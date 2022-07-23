import { onMounted, ref } from 'vue'
import { useRequest } from '@baldeweg/ui'
import Cookies from 'js-cookie'

export function useBookmark() {
  const { config, setAuthHeader, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API
  setAuthHeader(Cookies.get('token'))

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
