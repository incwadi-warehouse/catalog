<template>
  <article>
    <ul v-if="null !== cart">
      <li v-for="book in cart" :key="book.id">
        <router-link :to="{ name: 'book', params: { bookId: book.id } }">
          {{ book.title }} - {{ book.price }}
          <span v-if="book.sold"> - {{ $t('sold') }}</span>
          <span v-if="book.removed"> - {{ $t('removed') }}</span>
        </router-link>
      </li>
    </ul>
    <b-form-input type="hidden" id="books" v-model="state.books" />

    <b-form @submit.prevent="create">
      <b-form-group>
        <b-form-item>
          <b-form-label for="date">
            {{ $t('date') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input type="date" id="date" v-model="state.date" />
        </b-form-item>
      </b-form-group>

      <b-form-group v-if="state.date">
        <b-form-item>
          <b-form-label for="time">
            {{ $t('time') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input type="time" id="time" v-model="state.time" />
        </b-form-item>
      </b-form-group>

      <b-form-group>
        <b-form-item>
          <b-form-label for="notes">{{ $t('notes') }}</b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-textarea id="notes" v-model="state.notes" />
        </b-form-item>
      </b-form-group>

      <b-form-group buttons>
        <b-form-item>
          <b-button design="primary">{{ $t('save') }}</b-button>
        </b-form-item>
      </b-form-group>
    </b-form>
  </article>
</template>

<script>
import { computed, reactive } from '@vue/composition-api'

export default {
  name: 'reservation-create',
  props: {
    cart: Array,
  },
  setup(props, { emit }) {
    const state = reactive({
      date: null,
      time: '00:00',
      notes: null,
      books: computed(() => {
        if (null === props.cart) return
        let list = []
        props.cart.forEach((element) => {
          list.push(element.id)
        })
        return list.join(',')
      }),
      collection: computed(() => {
        if (null === state.date || null === state.time) return
        let date = new Date(state.date + ' ' + state.time + 'Z')
        return date.getTime() / 1000
      }),
    })

    const create = () => {
      emit('create', {
        collection: state.collection,
        notes: state.notes,
        books: state.books,
      })
      emit('created')
      state.date = null
      state.time = null
      state.notes = null
    }

    return {
      state,
      create,
    }
  },
}
</script>
