<script>
import SearchAuthorResults from '@/components/search/AuthorResults.vue'
import { useAuthor } from '@/composables/useAuthor.js'
import { useFilter } from '@/composables/useFilter.js'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  components: {
    SearchAuthorResults,
  },
  setup() {
    const { authors, find, remove } = useAuthor()

    const { filter } = useFilter()

    const removeAuthor = (authorId) => {
      remove(authorId).then(() => {
        find({ term: filter.term })
      })
    }

    return { authors, removeAuthor }
  },
})
</script>

<template>
  <b-container size="l" v-if="authors != null">
    <h2>{{ $t('authors') }}</h2>
    <p>
      {{
        $tc('results_counter_author', authors ? authors.length : 0, {
          counter: authors ? authors.length : 0,
        })
      }}
    </p>
    <search-author-results :authors="authors" @remove="removeAuthor" />
  </b-container>
</template>
