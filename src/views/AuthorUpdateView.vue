<script setup>
import { useTitle } from '@baldeweg/ui'
import AuthorUpdate from '@/components/author/AuthorUpdate.vue'

useTitle({ title: 'Author' })

defineProps({
  id: Number,
})
</script>

<template>
  <b-container size="m">
    <h1>{{ $t('edit_author') }}</h1>
  </b-container>

  <b-container size="m">
    <AuthorUpdate :id="id" />
  </b-container>
</template>
