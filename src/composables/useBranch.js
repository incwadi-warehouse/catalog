import { onMounted, ref } from '@vue/composition-api'
import { request } from '@/api'

export function useBranch() {
  const branches = ref([])

  const list = () => {
    return request('get', '/api/branch/').then((res) => {
      branches.value = res.data
    })
  }

  onMounted(list)

  return {
    branches,
  }
}
