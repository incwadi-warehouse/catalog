import { onMounted, reactive } from '@vue/composition-api'
import api from '@/api/staff'

export default function useStaffMembers() {
  const state = reactive({
    staff: [],
  })

  const list = () => {
    api.list().then((response) => {
      state.staff = response.data
    })
  }

  onMounted(list)

  const create = (data) => {
    api.create({ name: data }).then(() => {
      list()
    })
  }

  const update = (data) => {
    api.update(data.id, { name: data.name }).catch(() => {
      list()
    })
  }

  const remove = (data) => {
    api.remove(data.id).then(() => {
      list()
    })
  }

  return {
    state,
    create,
    update,
    remove,
  }
}
