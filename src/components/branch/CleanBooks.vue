<template>
  <b-button design="outline_danger" @click="$emit('clean')">
    {{ $t('clean_books') }}
  </b-button>
</template>

<script>
export default {
  name: 'branch-clean-books',
}
</script>
