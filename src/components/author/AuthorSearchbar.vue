<script setup>
import { debounce } from 'lodash'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useAuthor } from '@/composables/useAuthor.js'

const props = defineProps({
  term: String,
})

const router = useRouter()

const { authors, find } = useAuthor()

const term = ref(props.term || null)

const search = () => {
  if (term.value === null) return

  router.push({ name: 'authors', query: { term: term.value } })
  find({ term: term.value })
}

onMounted(search)

var debounced = null

const delaySearch = () => {
  if (debounced !== null) {
    debounced.cancel()
  }

  debounced = debounce(() => {
    search()
  }, 1000)

  debounced()
}

const reset = () => {
  term.value = null
  authors.value = null
  router.push({ name: 'authors' })
}
</script>

<template>
  <b-search
    :placeholder="$t('search_for_authors')"
    branded
    @update:modelValue="delaySearch"
    @submit.prevent="search"
    @reset="reset"
    v-model="term"
  />
</template>
