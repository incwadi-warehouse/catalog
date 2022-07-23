import { useToast } from '@baldeweg/ui'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRequest } from '@baldeweg/ui'
import Cookies from 'js-cookie'

const authors = ref(null)

export function useAuthor() {
  const { config, setAuthHeader, request } = useRequest()

  config.value.baseURL = import.meta.env.VUE_APP_API
  setAuthHeader(Cookies.get('token'))

  const { t } = useI18n()

  const author = ref(null)

  const { add } = useToast()

  const find = (data) => {
    return request('get', '/api/author/find', null, data).then((res) => {
      authors.value = res.data
    })
  }

  const show = (id) => {
    return request('get', '/api/author/' + id).then((res) => {
      author.value = res.data
    })
  }

  const update = (id) => {
    return request('put', '/api/author/' + id, {
      firstname: author.value.firstname,
      surname: author.value.surname,
    })
      .then(() => {
        add({
          type: 'success',
          body: t('updated'),
        })
      })
      .catch(() => {
        add({
          type: 'error',
          body: t('error'),
        })
      })
  }

  const remove = (id) => {
    return request('delete', '/api/author/' + id)
  }

  return { authors, author, find, show, update, remove }
}
