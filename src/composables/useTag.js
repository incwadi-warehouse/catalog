import { request } from '@/api'

export function useTag() {
  const create = (data) => {
    return request('post', '/api/tag/new', data)
  }

  const remove = (id) => {
    return request('delete', '/api/tag/' + id)
  }

  return { create, remove }
}
