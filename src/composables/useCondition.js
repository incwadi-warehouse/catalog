import { request } from '@/api'
import { onMounted, ref } from 'vue'

export function useCondition() {
  const conditions = ref([])

  const list = () => {
    return request('get', '/api/condition/').then((res) => {
      conditions.value = res.data
    })
  }

  onMounted(list)

  return {
    conditions,
  }
}
