import { onMounted, ref, watch } from '@vue/composition-api'
import { request } from '@/api'
import useToast from '@baldeweg/components/src/composables/useToast'
import i18n from './../i18n'

const dir = ref('./')
const elements = ref(null)

export default function useDirectory(emit) {
  const { add } = useToast()

  const dirname = ref('')
  const isLoading = ref(false)

  const listElements = () => {
    isLoading.value = true
    return request('get', '/api/directory/', null, { dir: dir.value }).then(
      (response) => {
        elements.value = response.data
        isLoading.value = false
      }
    )
  }

  onMounted(listElements)

  watch(() => dir.value, listElements)

  const removeElement = (file) => {
    return request('delete', '/api/directory/', null, {
      name: file,
      path: dir.value,
    })
      .then(() => {
        listElements()
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

  const createDir = () => {
    return request('post', '/api/directory/new', null, {
      name: dirname.value,
      path: dir.value,
    })
      .then(() => {
        listElements()
        add({
          type: 'success',
          body: i18n.t('success_create_dir'),
        })
        dirname.value = ''
      })
      .catch(() => {
        add({
          type: 'error',
          body: i18n.t('error_create_dir'),
        })
      })
  }

  const uploadCover = (id, url) => {
    return request('post', '/api/directory/cover/' + id, { url }).then(() => {
      emit('update')
    })
  }

  return {
    dir,
    elements,
    dirname,
    isLoading,
    removeElement,
    createDir,
    uploadCover,
  }
}
