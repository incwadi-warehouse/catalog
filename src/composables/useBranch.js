import { reactive } from '@vue/composition-api'
import api from '@/api/branch'

export default function useBranch() {
  const state = reactive({
    branches: [],
    branch: null,
  })

  const list = () => {
    api.list().then((res) => {
      state.branches = res.data
    })
  }

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
    list,
    show,
    create,
    update,
    clean,
  }
}
