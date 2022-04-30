import { onMounted, reactive, watch } from '@vue/composition-api'
import { request } from '@/api'
import useToast from '@baldeweg/components/src/composables/useToast'
import i18n from './../i18n'

export default function useDirectory() {
  const { add } = useToast()

  const state = reactive({
    elements: null,
    dir: './',
    isLoading: false,
  })

  const list = () => {
    state.isLoading = true
    request('get', '/api/directory/', null, { dir: state.dir })
      .then((response) => {
        state.elements = response.data
      })
      .finally(() => {
        state.isLoading = false
      })
  }

  const useCover = (id, url) => {
    return request('post', '/api/directory/cover/' + id, { url })
  }

  const remove = (file) => {
    request('delete', '/api/directory/', null, {
      name: file,
      path: state.dir,
    })
      .then(() => {
        list()
        add({
          type: 'success',
          body: i18n.t('success_removing'),
        })
      })
      .catch(() => {
        add({
          type: 'error',
          body: i18n.t('error_removing'),
        })
      })
  }

  onMounted(list)

  watch(() => state.dir, list)

  return {
    state,
    list,
    useCover,
    remove,
  }
}
