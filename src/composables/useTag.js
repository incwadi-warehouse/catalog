import { reactive } from '@vue/composition-api'
import api from '@/api/tag'

export default function useTag() {
  const state = reactive({
    tags: null,
    tag: null,
  })

  const list = () => {
    api.find().then((res) => {
      state.tags = res.data
    })
  }

  const create = (data) => {
    api.create(data)
  }

  const remove = (id) => {
    api.remove(id)
  }

  return { state, list, create, remove }
}
