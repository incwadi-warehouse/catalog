import { ref } from '@vue/composition-api'
import { request } from '@/api'
import { without } from 'lodash'
import useToast from '@baldeweg/components/src/composables/useToast'
import i18n from './../i18n'

export function useBook() {
  const { add } = useToast()

  const books = ref(null)
  const book = ref(null)
  const cover = ref(null)

  const find = (data) => {
    return request('get', '/api/book' + '/find', null, {
      options: filters(data),
    }).then((res) => {
      books.value = res.data
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
    return request('get', '/api/book/' + id).then((res) => {
      book.value = res.data
    })
  }

  const create = (data) => {
    return request('post', '/api/book/new', data).then((res) => {
      book.value = res.data
    })
  }

  const update = (data) => {
    return request('put', '/api/book/' + data.id, data.params)
      .then((res) => {
        book.value = res.data
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
    return request('put', '/api/book/sell/' + id).then((res) => {
      book.value = res.data
    })
  }

  const remove = (id) => {
    return request('put', '/api/book/remove/' + id).then((res) => {
      book.value = res.data
    })
  }

  const getCover = (id) => {
    request('get', '/api/book/cover/' + id).then((res) => {
      cover.value = res.data
    })
  }

  const upload = (data) => {
    return request('post', '/api/book/cover/' + data.id, data.form)
  }

  const removeCover = (id) => {
    request('delete', '/api/book/cover/' + id).then(() => {
      getCover(id)
    })
  }

  return {
    books,
    book,
    cover,
    find,
    show,
    create,
    update,
    sell,
    remove,
    getCover,
    upload,
    removeCover,
  }
}
