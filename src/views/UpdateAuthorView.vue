<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('edit_author') }}</h1>
    </b-container>

    <b-container size="m" v-if="author">
      <author-update
        :author="author"
        @update="updateAuthor($event.id, $event.params)"
      />
    </b-container>
  </article>
</template>

<script>
import AuthorUpdate from '../components/author/Update'
import { useAuthor } from '@/composables/useAuthor'
import { toRefs, onMounted } from '@vue/composition-api'

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

    const { author, show: showAuthor, update: updateAuthor } = useAuthor()

    onMounted(() => {
      showAuthor(id.value)
    })

    return { author, showAuthor, updateAuthor }
  },
}
</script>
