<template>
  <p>Results</p>
</template>

<script>
import { reactive } from '@vue/composition-api'

export default {
  name: 'search-author-results',
  setup() {
    const state = reactive({})

    return { state }
  },
}
</script>
