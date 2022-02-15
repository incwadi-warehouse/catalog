import { reactive } from '@vue/composition-api'
import { request } from '~b/api'

export default function useTag() {
  const base = '/api/tag'

  const state = reactive({
    tags: null,
    tag: null,
  })

  const list = () => {
    return request('get', base + '/').then((res) => {
      state.tags = res.data
    })
  }

  const create = (data) => {
    return request('post', base + '/new', data)
  }

  const remove = (id) => {
    return request('delete', base + '/' + id)
  }

  return { state, list, create, remove }
}
