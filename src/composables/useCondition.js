import { onMounted, ref } from '@vue/composition-api'
import { request } from '@/api'

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
