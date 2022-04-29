<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('directory') }} (Experiment)</h1>
    </b-container>

    <b-container size="m">
      <directory-list />
    </b-container>
  </article>
</template>

<script>
import DirectoryList from '@/components/directory/List'

export default {
  name: 'directory-view',
  head: {
    title: 'Directory',
  },
  components: {
    DirectoryList,
  },
  props: {
    auth: Object,
  },
}
</script>
