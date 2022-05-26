import { useAuthor } from '@/composables/useAuthor.js'
import { useBook } from '@/composables/useBook.js'
import { useFilter } from './../composables/useFilter.js'
import { toRefs, ref, onMounted, watchEffect } from '@vue/composition-api'
import { isEmpty } from 'lodash'
import router from '@/router'

export function useSearch(props) {
  const { query, id } = toRefs(props)

  const modal = ref(null)

  const { filter, init: initFilter } = useFilter()

  initFilter(query, props)

  const { find: findAuthor } = useAuthor()

  const { find: findBook } = useBook()

  onMounted(() => {
    if (!isEmpty(query.value)) {
      router.push({ name: 'search', query: filter })
      if (filter.term !== null) {
        findAuthor({ term: filter.term })
      }
      findBook({ options: filter })
    }
  })

  watchEffect(() => {
    if (id.value) modal.value = 'update'
  })

  return { modal }
}
