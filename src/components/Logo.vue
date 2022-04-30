<template>
  <img :src="logo" alt="incwadi" v-if="logo" />
</template>

<script>
import { computed } from '@vue/composition-api'

export default {
  name: 'logo',
  setup() {
    const logo = computed(() => {
      return process.env.VUE_APP_LOGO !== 'false'
        ? process.env.VUE_APP_LOGO
        : null
    })

    return { logo }
  },
}
</script>
