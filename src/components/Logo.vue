<template>
  <img :src="logo" alt="incwadi" v-if="logo" />
</template>

<script>
export default {
  name: 'logo',
  data() {
    return {
      logo: null,
    }
  },
  created() {
    return process.env.VUE_APP_LOGO !== 'false'
      ? import('../../' + process.env.VUE_APP_LOGO).then(
          (logo) => (this.logo = logo.default)
        )
      : null
  },
}
</script>
