import { computed, onMounted, reactive } from '@vue/composition-api'
import { request } from '@/api'

export default function useInventory() {
  const base = '/api/inventory'

  const state = reactive({
    inventories: [],
    hasActiveInventory: computed(() => {
      let active = false
      state.inventories.forEach((element) => {
        if (null === element.endedAt) {
          active = true
        }
      })
      return active
    }),
  })

  const listInventories = () => {
    return request('get', base + '/').then((response) => {
      state.inventories = response.data
    })
  }

  onMounted(listInventories)

  const create = () => {
    return request('post', base + '/new').then(() => {
      listInventories()
    })
  }

  const end = (id) => {
    const endedAt = Date.now() / 1000

    return request('put', base + '/' + id, { endedAt }).then(() => {
      listInventories()
    })
  }

  return { state, create, end }
}
