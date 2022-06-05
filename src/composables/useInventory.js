import { computed, onMounted, ref } from 'vue'
import { request } from '@/api'

export function useInventory() {
  const inventories = ref([])

  const hasActiveInventory = computed(() => {
    let active = false
    inventories.value.forEach((element) => {
      if (element.endedAt === null) {
        active = true
      }
    })

    return active
  })

  const listInventories = () => {
    return request('get', '/api/inventory/').then((res) => {
      inventories.value = res.data
    })
  }

  onMounted(listInventories)

  return { hasActiveInventory }
}
