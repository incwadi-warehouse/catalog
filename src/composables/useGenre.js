import { onMounted, ref } from 'vue'
import { request } from '@/api'

export function useGenre() {
  const genres = ref([])

  const list = () => {
    return request('get', '/api/genre/').then((res) => {
      genres.value = res.data
    })
  }

  onMounted(list)

  return {
    genres,
  }
}
