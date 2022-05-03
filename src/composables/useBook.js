import { reactive } from '@vue/composition-api'
import { request } from '@/api'
import without from 'lodash/without'
import useToast from './../../node_modules/@baldeweg/components/src/composables/useToast'
import i18n from './../i18n'

export default function useBook() {
  const { add } = useToast()

  const base = '/api/book'

  const state = reactive({
    books: null,
    book: null,
    stats: null,
    cover: null,
  })

  const find = (data) => {
    return request('get', base + '/find', null, {
      options: filters(data),
    }).then((res) => {
      state.books = res.data
    })
  }

  const filters = (data) => {
    return {
      term: data.options.term ?? undefined,
      filter: without(
        [
          data.options.branch
            ? { field: 'branch', operator: 'in', value: data.options.branch }
            : undefined,
          data.options.genre.length != 0
            ? { field: 'genre', operator: 'in', value: data.options.genre }
            : undefined,
          data.options.releaseYear
            ? {
                field: 'releaseYear',
                operator: 'eq',
                value: data.options.releaseYear,
              }
            : undefined,

          {
            field: 'sold',
            operator: 'eq',
            value: data.options.availability.indexOf('sold') != -1,
          },
          {
            field: 'removed',
            operator: 'eq',
            value: data.options.availability.indexOf('removed') != -1,
          },
          {
            field: 'reserved',
            operator: 'eq',
            value: data.options.availability.indexOf('reserved') != -1,
          },

          data.options.format
            ? { field: 'format', operator: 'in', value: data.options.format }
            : undefined,
          data.options.added
            ? {
                field: 'added',
                operator: 'gte',
                value: data.options.added.split('..')[0],
              }
            : undefined,
          data.options.added
            ? {
                field: 'added',
                operator: 'lte',
                value: data.options.added.split('..')[1],
              }
            : undefined,
        ],
        undefined
      ),
      orderBy:
        data.options.orderBy && data.options.orderByDirection
          ? {
              book: [
                {
                  field: data.options.orderBy,
                  direction: data.options.orderByDirection,
                },
              ],
            }
          : undefined,
      limit: data.options.limit,
    }
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
    return request('put', base + '/' + data.id, data.params)
      .then((res) => {
        state.book = res.data
        add({
          type: 'success',
          body: i18n.t('book_saved'),
        })
      })
      .catch(() => {
        add({
          type: 'error',
          body: i18n.t('error_saving_book'),
        })
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
