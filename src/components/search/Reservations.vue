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

    return { reservations }
  },
})
</script>

<template>
  <b-container size="l" v-if="reservations && reservations.length >= 1">
    <b-alert type="success">
      <router-link :to="{ name: 'reservation' }">
        {{ $t('current_reservations') }}:
        {{ reservations.length }}
      </router-link>
    </b-alert>
  </b-container>
</template>
