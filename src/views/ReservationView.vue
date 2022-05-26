<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('reservation') }}</h1>
    </b-container>

    <b-container size="m">
      <h2>{{ $t('newReservation') }}</h2>
      <reservation-create
        :cart="cart"
        @create="create($event)"
        @created="onCreated"
      />
    </b-container>

    <b-container size="m">
      <h2>{{ $t('reservedBooks') }}</h2>
      <b-spinner size="l" v-if="isLoading" />
      <div v-if="reservations">
        <reservation-show
          v-for="item in reservations"
          :key="item.id"
          :reservation="item"
          @update="update($event)"
          @remove="remove($event)"
        />
      </div>
    </b-container>

    <b-container size="m">
      <div v-html="$tc('reservationDesc')" />
    </b-container>
  </article>
</template>

<script>
import { useReservation } from '../composables/useReservation'
import { useCart } from '../composables/useCart'
import ReservationCreate from './../components/reservation/Create'
import { toRefs } from '@vue/composition-api'
import ReservationShow from './../components/reservation/Show'

export default {
  name: 'reservation-view',
  head: {
    title: 'Reservation',
  },
  components: {
    ReservationCreate,
    ReservationShow,
  },
  props: {
    auth: Object,
  },
  setup(props) {
    const { me } = toRefs(props.auth.state)

    const { cart, clean } = useCart()

    const { reservations, isLoading, create, update, remove } = useReservation()

    const onCreated = () => {
      clean()
    }

    return {
      reservations,
      isLoading,
      create,
      update,
      remove,
      onCreated,
      cart,
      me,
    }
  },
}
</script>
