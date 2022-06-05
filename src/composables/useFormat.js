import { onMounted, ref } from 'vue'
import { request } from '@/api'

export function useFormat() {
  const formats = ref([])

  const list = () => {
    return request('get', '/api/format/').then((res) => {
      formats.value = res.data
    })
  }

  onMounted(list)

  return {
    formats,
  }
}
