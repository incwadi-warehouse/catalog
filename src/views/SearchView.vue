<script>
import BookEdit from '@/components/book/Edit.vue'
import BookCreate from '@/components/book/Create.vue'
import SearchScrollToTop from '../components/search/ScrollToTop.vue'
import SearchReservations from '../components/search/Reservations.vue'
import SearchBookResultHeading from '../components/search/BookResultHeading.vue'
import SearchCart from '../components/search/Cart.vue'
import SearchBookResult from '../components/search/BookResult.vue'
import SearchAuthorResult from '../components/search/AuthorResult.vue'
import SearchFilter from '../components/search/Filter.vue'
import SearchSearchbar from './../components/search/Searchbar.vue'
import { useSearch } from './../composables/useSearch.js'

export default {
  name: 'search-view',
  head: {
    title: 'Search',
  },
  components: {
    BookEdit,
    BookCreate,
    SearchScrollToTop,
    SearchReservations,
    SearchBookResultHeading,
    SearchCart,
    SearchBookResult,
    SearchAuthorResult,
    SearchFilter,
    SearchSearchbar,
  },
  props: {
    auth: Object,
    query: Object,
    id: String,
  },
  setup(props) {
    const { modal } = useSearch(props)

    return { modal }
  },
}
</script>

<template>
  <article v-if="auth.state.me">
    <search-reservations />

    <search-cart />

    <search-book-result-heading @catalogue="modal = 'create'" />

    <search-searchbar @filter="modal = 'filter'" />

    <search-book-result />

    <search-author-result />

    <search-scroll-to-top />

    <search-filter
      :auth="auth"
      @close="modal = null"
      v-if="modal == 'filter'"
    />

    <keep-alive>
      <book-edit
        :book-id="id"
        :me="auth.state.me"
        @close="
          modal = null
          $router.push({ name: 'search' })
        "
        v-if="modal == 'update'"
      />
    </keep-alive>

    <keep-alive>
      <book-create
        :me="auth.state.me"
        @close="
          modal = null
          $router.push({ name: 'search' })
        "
        v-if="modal == 'create'"
      />
    </keep-alive>
  </article>
</template>
