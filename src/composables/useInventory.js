import { computed, onMounted, reactive } from '@vue/composition-api'
import api from '@/api/inventory'

export default function useInventory() {
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
    api.list().then((response) => {
      state.inventories = response.data
    })
  }

  onMounted(listInventories)

  const create = () => {
    api.create().then(() => {
      listInventories()
    })
  }

  const end = (id) => {
    const endedAt = Date.now() / 1000
    api.update(id, { endedAt }).then(() => {
      listInventories()
    })
  }

  return { state, create, end }
}
