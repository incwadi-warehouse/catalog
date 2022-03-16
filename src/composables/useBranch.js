import { reactive } from '@vue/composition-api'
import { request } from '~b/api'

export default function useBranch() {
  const base = '/api/branch'

  const state = reactive({
    branches: [],
    branch: null,
    hasSuccess: false,
    hasError: false,
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
    request('post', base + '/new', data)
  }

  const update = (data) => {
    return request('put', base + '/' + data.id, data.params)
      .then(() => {
        state.hasSuccess = true
      })
      .catch(() => {
        state.hasError = true
      })
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
