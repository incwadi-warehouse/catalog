import { reactive } from '@vue/composition-api'
import { request } from '~b/api'

export default function useBranch() {
  const base = '/api/branch'

  const state = reactive({
    branches: [],
    branch: null,
  })

  const list = () => {
    return request('get', base + '/').then((res) => {
      state.branches = res.data
    })
  }

  const show = (id) => {
    return request('get', base + '/' + id).then((response) => {
      state.branch = response.data
    })
  }

  const create = (data) => {
    request('post', base + '/new', data).then(() => {})
  }

  const update = (data) => {
    return request('put', base + '/' + data.id, data.params).catch(() => {})
  }

  const clean = () => {
    return request('delete', '/api/book/clean')
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
