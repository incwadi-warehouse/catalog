<script>
import { useReservation } from '@/composables/useReservation.js'
import { defineComponent, onUnmounted } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const { reservations, list } = useReservation()

    const interval = window.setInterval(() => {
      list()
    }, 5000)

    onUnmounted(() => {
      window.clearInterval(interval)
    })

    const orders = process.env.VUE_APP_ORDERS

    return { reservations, orders }
  },
})
</script>

<template>
  <b-container size="l" v-if="reservations && reservations.length >= 1">
    <b-alert type="success">
      <a :href="orders">
        {{ $t('current_reservations') }}:
        {{ reservations.length }}
      </a>
    </b-alert>
  </b-container>
</template>
