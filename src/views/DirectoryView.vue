<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('directory') }} (Experiment)</h1>
    </b-container>

    <b-container size="m">
      <directory-list />
    </b-container>

    <b-container size="m">
      <directory-create />
    </b-container>

    <b-container size="m">
      <directory-upload />
    </b-container>
  </article>
</template>

<script>
import DirectoryList from '@/components/directory/List'
import DirectoryCreate from '@/components/directory/Create'
import DirectoryUpload from '@/components/directory/Upload'

export default {
  name: 'directory-view',
  head: {
    title: 'Directory',
  },
  components: {
    DirectoryList,
    DirectoryCreate,
    DirectoryUpload,
  },
  props: {
    auth: Object,
  },
}
</script>
