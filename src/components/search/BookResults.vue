<template>
  <table :aria-label="$t('books')">
    <thead>
      <tr>
        <th scope="col" v-if="showCover">{{ $t('cover') }}</th>
        <th scope="col">
          <search-direction
            col="title"
            :filter="filter"
            @search="$emit('search', true)"
            >{{ $t('title') }}
          </search-direction>
        </th>
        <th scope="col">
          <search-direction
            col="author"
            :filter="filter"
            @search="$emit('search', true)"
            >{{ $t('author') }}</search-direction
          >
        </th>
        <th scope="col">
          <search-direction
            col="genre"
            :filter="filter"
            @search="$emit('search', true)"
            >{{ $t('genre') }}</search-direction
          >
        </th>
        <th scope="col">
          <search-direction
            col="added"
            :filter="filter"
            @search="$emit('search', true)"
            >{{ $t('added') }}</search-direction
          >
        </th>
        <th scope="col" v-if="filter.availability.includes('sold')">
          <search-direction
            col="sold"
            :filter="filter"
            @search="$emit('search', true)"
            >{{ $t('sold') }}</search-direction
          >
        </th>
        <th scope="col" v-if="filter.availability.includes('removed')">
          <search-direction
            col="removed"
            :filter="filter"
            @search="$emit('search', true)"
            >{{ $t('removed') }}</search-direction
          >
        </th>
        <th scope="col">
          <search-direction
            col="format"
            :filter="filter"
            @search="$emit('search', true)"
            >{{ $t('format') }}</search-direction
          >
        </th>
        <th scope="col">
          <search-direction
            col="releaseYear"
            :filter="filter"
            @search="$emit('search', true)"
            >{{ $t('year') }}</search-direction
          >
        </th>
        <th scope="col">
          <search-direction
            col="price"
            :filter="filter"
            @search="$emit('search', true)"
            >{{ $t('price') }}</search-direction
          >
        </th>
        <th scope="col"></th>
        <th scope="col" v-if="hasInventory"></th>
        <th scope="col" v-if="hasInventory"></th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="item in books.books" :key="item.id">
        <td
          v-if="showCover"
          :style="{ cursor: 'pointer' }"
          @click="
            $router.push({
              name: 'book.update',
              params: { id: item.id },
            })
          "
        >
          <img :src="image(item.id)" width="100" alt="Cover" />
        </td>
        <td
          :style="{ cursor: 'pointer' }"
          @click="
            $router.push({
              name: 'book.update',
              params: { id: item.id },
            })
          "
        >
          {{ item.title }}
        </td>
        <td>{{ formatAuthor(item.author) }}</td>
        <td>{{ item.genre.name }}</td>
        <td>{{ formatDate(item.added) }}</td>
        <td v-if="filter.availability.includes('sold')">
          {{ item.sold ? formatDate(item.soldOn) : '' }}
        </td>
        <td v-if="filter.availability.includes('removed')">
          {{ item.removed ? formatDate(item.removedOn) : '' }}
        </td>
        <td>{{ item.format ? item.format.name : null }}</td>
        <td>{{ item.releaseYear }}</td>
        <td>{{ formatPrice(item.price) }}</td>
        <td>
          <b-dropdown>
            <template #selector>
              <b-icon type="meatballs" />
            </template>
            <b-dropdown-item
              icon="pencil"
              @click="
                $router.push({
                  name: 'book.update',
                  params: { id: item.id },
                })
              "
            >
              {{ $t('edit') }}
            </b-dropdown-item>
            <b-dropdown-item
              icon="dollar"
              @click="$emit('sell', item.id)"
              v-if="!item.sold"
            >
              {{ $t('sell') }}
            </b-dropdown-item>
            <b-dropdown-item
              icon="bin"
              @click="$emit('remove', item.id)"
              v-if="!item.removed"
            >
              {{ $t('remove') }}
            </b-dropdown-item>
            <b-dropdown-item
              icon="cart"
              @click="$emit('add-to-cart', item)"
              v-if="!item.reserved"
            >
              {{ $t('cart') }}
            </b-dropdown-item>
          </b-dropdown>
        </td>
        <td v-if="hasInventory">
          <b-button design="text" @click.prevent="bookFound(item.id)">
            <b-icon type="check" :isPrimary="item.inventory" />
          </b-button>
        </td>
        <td v-if="hasInventory">
          <b-button design="text" @click.prevent="bookNotFound(item.id)">
            <b-icon type="close" :isPrimary="false === item.inventory" />
          </b-button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { reactive } from '@vue/composition-api'
import SearchDirection from './Direction'

export default {
  name: 'search-book-results',
  props: {
    books: Object,
    filter: Object,
    hasInventory: Boolean,
    showCover: Boolean,
  },
  components: {
    SearchDirection,
  },
  setup() {
    const state = reactive({})

    const image = (id) => {
      return (
        process.env.VUE_APP_API +
        '/api/public/book/cover/' +
        id +
        '_100x100.jpg'
      )
    }

    const formatAuthor = (author) => {
      if (null === author) return ''
      if (author.firstname === '') {
        return author.surname
      }
      return author.surname + ', ' + author.firstname
    }

    const formatDate = (timestamp) => {
      return new Date(timestamp * 1000).toLocaleDateString()
    }

    const formatPrice = (price) => {
      return Number.parseFloat(price).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    }

    const bookFound = (id) => {
      this.$store.dispatch('book/bookFound', { me: this.me, id })
    }

    const bookNotFound = (id) => {
      this.$store.dispatch('book/bookNotFound', { me: this.me, id })
    }

    return {
      state,
      image,
      formatAuthor,
      formatDate,
      formatPrice,
      bookFound,
      bookNotFound,
    }
  },
}
</script>

<style scoped>
thead {
  position: sticky;
  top: var(--masthead-top-height);
  background: var(--color-neutral-00);
  z-index: 2;
  cursor: pointer;
}
th:first-child {
  min-width: 200px;
}
td:first-child {
  position: sticky;
  left: 20px;
  z-index: 1;
  background: var(--color-neutral-00);
}
</style>
