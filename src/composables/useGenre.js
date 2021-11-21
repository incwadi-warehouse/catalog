import { onMounted, reactive } from '@vue/composition-api'
import { request } from '~b/api'

export default function useGenre() {
  const base = '/api/genre'

  const state = reactive({
    genres: [],
  })

  const list = () => {
    return request('get', base + '/').then((response) => {
      state.genres = response.data
    })
  }

  onMounted(list)

  const create = (data) => {
    return request('post', base + '/new', { name: data }).then(() => {
      list()
    })
  }

  const update = (data) => {
    return request('put', base + '/' + data.id, { name: data.name }).catch(
      () => {
        list()
      }
    )
  }

  const remove = (data) => {
    return request('delete', base + '/' + data.id).then(() => {
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
