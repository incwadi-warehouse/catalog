<script setup>
import { useReservation } from '@/composables/useReservation.js'
import { onUnmounted } from 'vue'

const { reservations, list } = useReservation()

const interval = window.setInterval(() => {
  list()
}, 5000)

onUnmounted(() => {
  window.clearInterval(interval)
})

const orders = import.meta.env.VUE_APP_ORDERS
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
