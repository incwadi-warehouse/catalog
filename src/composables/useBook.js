import { reactive } from '@vue/composition-api'
import { request } from '~b/api'

export default function useBook() {
  const base = '/api/book'

  const state = reactive({
    books: null,
    book: null,
    stats: null,
    cover: null,
  })

  const find = (data) => {
    return request('get', base + '/find', null, data).then((res) => {
      state.books = res.data
    })
  }

  const show = (id) => {
    return request('get', base + '/' + id).then((res) => {
      state.book = res.data
    })
  }

  const create = (data) => {
    return request('post', base + '/new', data).then((res) => {
      state.book = res.data
    })
  }

  const update = (data) => {
    return request('put', base + '/' + data.id, data.params).then((res) => {
      state.book = res.data
    })
  }

  const sell = (id) => {
    return request('put', base + '/sell/' + id).then((res) => {
      state.book = res.data
    })
  }

  const remove = (id) => {
    return request('put', base + '/remove/' + id).then((res) => {
      state.book = res.data
    })
  }

  const getCover = (id) => {
    request('get', base + '/cover/' + id).then((res) => {
      state.cover = res.data
    })
  }

  const upload = (data) => {
    return request('post', base + '/cover/' + data.id, data.form)
  }

  const removeCover = (id) => {
    request('delete', base + '/cover/' + id).then(() => {
      getCover(id)
    })
  }

  const stats = () => {
    request('get', base + '/stats').then((response) => {
      state.stats = response.data
    })
  }

  return {
    state,
    find,
    show,
    create,
    update,
    stats,
    sell,
    remove,
    getCover,
    upload,
    removeCover,
  }
}
