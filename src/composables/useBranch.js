import { reactive } from '@vue/composition-api'
import api from '@/api/branch'

export default function useBranch() {
  const state = reactive({
    branches: [],
    branch: null,
  })

  const show = (id) => {
    api.show(id).then((response) => {
      state.branch = response.data
    })
  }

  const create = (data) => {
    api.create(data).then(() => {})
  }

  const update = (data) => {
    api.update(data.id, data.params).catch(() => {})
  }

  const clean = () => {
    api.clean()
  }

  return {
    state,
    show,
    create,
    update,
    clean,
  }
}
