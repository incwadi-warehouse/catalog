<script>
import AuthorUpdate from '../components/author/Update.vue'
import { useAuthor } from '@/composables/useAuthor.js'
import { toRefs } from '@vue/composition-api'

export default {
  name: 'update-author-view',
  head: {
    title: 'Author',
  },
  components: {
    AuthorUpdate,
  },
  props: {
    id: Number,
  },
  setup(props) {
    const { id } = toRefs(props)

    const { author, show, update } = useAuthor()

    show(id.value)

    return { author, update }
  },
}
</script>

<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('edit_author') }}</h1>
    </b-container>

    <b-container size="m" v-if="author">
      <author-update
        :author="author"
        @update="update($event.id, $event.params)"
      />
    </b-container>
  </article>
</template>
