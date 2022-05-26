<script>
import AuthorUpdate from '@/components/author/Update.vue'

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
}
</script>

<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('edit_author') }}</h1>
    </b-container>

    <b-container size="m">
      <author-update :id="id" />
    </b-container>
  </article>
</template>
