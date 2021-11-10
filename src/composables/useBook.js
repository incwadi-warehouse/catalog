import { reactive } from '@vue/composition-api'
import api from '@/api/book'

export default function useBook() {
  const state = reactive({
    stats: null,
  })

  const stats = () => {
    api.stats().then((response) => {
      state.stats = response.data
    })
  }

  return { state, stats }
}
