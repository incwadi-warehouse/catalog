import { onMounted, reactive, watch } from '@vue/composition-api'
import { request } from '~b/api'

export default function useDirectory() {
  const state = reactive({
    elements: null,
    dir: './',
    isLoading: false,
  })

  const list = () => {
    state.isLoading = true
    request('get', '/api/directory/', null, { dir: state.dir })
      .then((response) => {
        state.elements = response.data
      })
      .finally(() => {
        state.isLoading = false
      })
  }

  const useCover = (id, url) => {
    return request('post', '/api/directory/cover/' + id, { url })
  }

  onMounted(list)

  watch(() => state.dir, list)

  return {
    state,
    list,
    useCover,
  }
}
