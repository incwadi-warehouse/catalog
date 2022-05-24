<template>
  <article v-if="auth.state.me">
    <b-container
      size="l"
      v-if="
        reservation.state.reservations &&
        reservation.state.reservations.length >= 1
      "
    >
      <b-alert type="success">
        <router-link :to="{ name: 'reservation' }">
          {{ $t('current_reservations') }}:
          {{ reservation.state.reservations.length }}
        </router-link>
      </b-alert>
    </b-container>

    <b-container size="l">
      <b-button
        design="primary"
        :style="{ float: 'right' }"
        @click.prevent="modal = 'create'"
        >{{ $t('catalog') }}</b-button
      >
      <h1>{{ $t('search') }}</h1>
    </b-container>

    <b-container size="l" v-if="cart.state.cart && cart.state.cart.length >= 1">
      <h2>{{ $t('cart') }} ({{ cart.state.cart.length }})</h2>

      <ul>
        <li v-for="book in cart.state.cart" :key="book.id">
          <router-link :to="{ name: 'book.update', params: { id: book.id } }">
            {{ book.title }}
          </router-link>
          <span @click="cart.remove(book)"
            ><b-icon type="close" :size="15"
          /></span>
        </li>
      </ul>

      <b-button type="button" design="text" @click="cart.clean">
        {{ $t('cleanCart') }}
      </b-button>
      <b-button
        type="button"
        design="text"
        @click="$router.push({ name: 'reservation' })"
      >
        {{ $t('reservate') }}
      </b-button>
    </b-container>

    <b-container size="l">
      <b-search
        :placeholder="$t('search_in_title_author_genre_tag')"
        filter
        branded
        @input="delaySearch"
        @submit.prevent="search(true)"
        @reset="reset"
        @filter="modal = 'filter'"
        v-model="filter.term"
      />
    </b-container>

    <b-container size="l" v-if="book.state.books != null">
      <h2>{{ $t('books') }}</h2>
      <p>
        {{
          $tc(
            'results_counter',
            book.state.books ? book.state.books.counter : 0,
            {
              show: book.state.books ? book.state.books.books.length : 0,
              counter: book.state.books ? book.state.books.counter : 0,
            }
          )
        }}
      </p>
      <b-button
        design="text"
        :style="{ float: 'right' }"
        @click="hasInventory = !hasInventory"
        v-if="canToggleInventory"
        >{{ $t('inventory_mode') }}</b-button
      >
      <b-button
        design="text"
        :style="{ float: 'right' }"
        @click="showCover = !showCover"
        >{{ $t('show_cover') }}</b-button
      >
      <b-button
        design="text"
        :style="{ float: 'right' }"
        @click="
          filter.limit = book.state.books.counter
          search(true)
        "
        >{{ $t('show_all') }}</b-button
      >
      <search-book-results
        :filter="filter"
        :books="book.state.books"
        :hasInventory="hasInventory"
        :showCover="showCover"
        @sell="sell"
        @remove="remove"
        @add-to-cart="cart.add"
        @search="search"
      />
    </b-container>

    <b-container size="l" v-if="author.state.authors != null">
      <h2>{{ $t('authors') }}</h2>
      <p>
        {{
          $tc(
            'results_counter_author',
            author.state.authors ? author.state.authors.length : 0,
            {
              counter: author.state.authors ? author.state.authors.length : 0,
            }
          )
        }}
      </p>
      <search-author-results
        :authors="author.state.authors"
        @remove="removeAuthor"
      />
    </b-container>

    <search-scroll-to-top v-if="hasBooks" />

    <b-modal
      close-button
      :width="600"
      @close="modal = null"
      v-if="modal == 'filter'"
    >
      <template #title>
        <b-icon type="filter" :size="15" no-hover /> {{ $t('filters') }}
      </template>

      <template #footer>
        <b-form-group buttons>
          <b-form-item>
            <b-button
              design="text"
              @click.prevent="
                reset()
                modal = null
              "
              >{{ $t('reset') }}</b-button
            >
            <b-button
              design="primary"
              @click.prevent="
                search(true)
                modal = null
              "
              >{{ $t('search') }}</b-button
            >
          </b-form-item>
        </b-form-group>
      </template>

      <b-container size="l">
        <!-- branch -->
        <search-radio-filter
          :title="$t('branch')"
          :items="branch.state.branches"
          fieldKey="id"
          fieldValue="name"
          v-model="filter.branch"
          v-if="auth.state.me.isAdmin"
        />

        <!-- genre -->
        <search-checkbox-filter
          :title="$t('genre')"
          :items="genre.state.genres"
          fieldKey="id"
          fieldValue="name"
          v-model="filter.genre"
        />

        <!-- release year -->
        <search-number-range-filter
          :title="$t('release_year')"
          v-model="filter.releaseYear"
        />

        <!-- availability -->
        <search-checkbox-filter
          :title="$t('availability')"
          :items="[
            { key: 'sold', value: $t('sold') },
            { key: 'removed', value: $t('removed') },
            { key: 'reserved', value: $t('reserved') },
            { key: 'recommendation', value: $t('recommendation') },
          ]"
          v-model="filter.availability"
        />

        <!-- format -->
        <search-checkbox-filter
          :title="$t('format')"
          :items="format.state.formats"
          fieldKey="id"
          fieldValue="name"
          v-model="filter.format"
        />

        <!-- added -->
        <search-date-range-filter :title="$t('added')" v-model="filter.added" />

        <!-- order by -->
        <search-radio-filter
          :title="$t('order_by')"
          :items="[
            { key: 'title', value: $t('title') },
            { key: 'author', value: $t('author') },
            { key: 'genre', value: $t('genre') },
            { key: 'added', value: $t('added') },
            { key: 'price', value: $t('price') },
            { key: 'releaseYear', value: $t('releaseYear') },
            { key: 'format', value: $t('format') },
          ]"
          v-model="filter.orderBy"
        />

        <!-- order by direction -->
        <search-radio-filter
          :title="$t('order_by_direction')"
          :items="[
            { key: 'asc', value: $t('asc') },
            { key: 'desc', value: $t('desc') },
          ]"
          v-model="filter.orderByDirection"
        />

        <!-- limit -->
        <label for="limit">{{ $t('limit') }}</label>
        <b-form-input type="number" id="limit" v-model="filter.limit" />
      </b-container>
    </b-modal>

    <book-edit
      :book-id="id"
      :me="auth.state.me"
      @close="
        modal = null
        $router.push({ name: 'search' })
      "
      @update="book.update"
      @cover-upload="uploadCover"
      :isUploading="isUploading"
      v-if="modal == 'update'"
    />

    <book-create
      :me="auth.state.me"
      @close="modal = null"
      @create="
        book.create($event)
        modal = false
        $router.push({ name: 'search' })
      "
      v-if="modal == 'create'"
    />
  </article>
</template>

<script>
import {
  reactive,
  toRefs,
  ref,
  onMounted,
  watch,
  computed,
  onUnmounted,
} from '@vue/composition-api'
import router from '@/router'
import SearchRadioFilter from '@/components/search/RadioFilter'
import SearchCheckboxFilter from '@/components/search/CheckboxFilter'
import SearchNumberRangeFilter from '@/components/search/NumberRangeFilter'
import SearchDateRangeFilter from '@/components/search/DateRangeFilter'
import SearchBookResults from '@/components/search/BookResults'
import SearchAuthorResults from '@/components/search/AuthorResults'
import useBranch from '@/composables/useBranch'
import useGenre from '@/composables/useGenre'
import useFormat from '@/composables/useFormat'
import useAuthor from '@/composables/useAuthor'
import useBook from '@/composables/useBook'
import useCart from '@/composables/useCart'
import BookEdit from '@/components/book/Edit'
import BookCreate from '@/components/book/Create'
import SearchScrollToTop from '../components/search/ScrollToTop'
import useInventory from '@/composables/useInventory'
import useReservation from '@/composables/useReservation'
import { debounce } from 'lodash'

export default {
  name: 'search-view',
  head: {
    title: 'Search',
  },
  components: {
    SearchRadioFilter,
    SearchCheckboxFilter,
    SearchNumberRangeFilter,
    SearchDateRangeFilter,
    SearchBookResults,
    SearchAuthorResults,
    BookEdit,
    BookCreate,
    SearchScrollToTop,
  },
  props: {
    auth: Object,
    query: Object,
    id: String,
  },
  setup(props) {
    const { query, id } = toRefs(props)

    var filter = reactive({
      term: query.value.term || null,
      branch: query.value.branch || props.auth?.state.me?.branch.id || null,
      genre: query.value.genre || [],
      releaseYear: query.value.releaseYear || '',
      availability: query.value.availability || [],
      format: query.value.format || null,
      added: query.value.added || '',
      orderBy: query.value.orderBy || null,
      orderByDirection: query.value.orderByDirection || 'asc',
      limit: query.value.limit || 50,
    })

    const modal = ref(null)

    const author = useAuthor()

    const removeAuthor = (authorId) => {
      author.remove(authorId).then(search)
    }

    const book = useBook()

    const hasBooks = computed(() => {
      if (book.state.books === null) return false
      return book.state.books.books.length >= 1
    })

    const sell = (bookId) => {
      book.sell(bookId).then(() => {
        search()
      })
    }

    const remove = (bookId) => {
      book.remove(bookId).then(() => {
        search()
      })
    }

    const isUploading = ref(false)
    const uploadCover = (data) => {
      isUploading.value = true
      book.upload(data).then(() => {
        isUploading.value = false
      })
    }

    const search = (force = false) => {
      router.push({ name: 'search', query: filter })
      if (filter.term !== null) {
        author.find({ term: filter.term })
      }
      if (filter.term !== null || force) {
        book.find({ options: filter })
      }
    }

    const reset = () => {
      filter.term = null
      filter.branch = null
      filter.genre = []
      filter.releaseYear = ''
      filter.availability = []
      filter.format = null
      filter.added = ''
      filter.orderBy = null
      filter.orderByDirection = null
      filter.limit = 50
      book.state.books = null
      author.state.authors = null
    }

    if (filter.term !== null) {
      onMounted(search)
    }

    const branch = useBranch()
    branch.list()

    const genre = useGenre()

    const format = useFormat()

    const cart = useCart()

    onMounted(() => {
      if (id.value === undefined) return
      if (id.value) modal.value = 'update'
      book.show(id.value)
    })

    watch(
      () => id.value,
      () => {
        if (id.value) modal.value = 'update'
        book.show(id.value)
      }
    )

    const reservation = useReservation()
    reservation.list()
    const reservationInterval = window.setInterval(() => {
      reservation.list()
    }, 5000)
    onUnmounted(() => {
      window.clearInterval(reservationInterval)
    })

    const inventory = useInventory()

    const hasInventory = ref(false)

    const canToggleInventory = computed(() => {
      return inventory.state.hasActiveInventory
    })

    const showCover = ref(false)

    const delaySearch = () => {
      debounce(() => {
        search()
      }, 1000)()
    }

    return {
      filter,
      modal,
      search,
      reset,
      branch,
      genre,
      format,
      author,
      book,
      cart,
      sell,
      remove,
      uploadCover,
      removeAuthor,
      hasBooks,
      hasInventory,
      canToggleInventory,
      showCover,
      isUploading,
      reservation,
      debounce,
      delaySearch,
    }
  },
}
</script>
