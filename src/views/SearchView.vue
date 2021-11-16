<template>
  <article>
    <b-container size="l">
      <h1>{{ $t('search') }}</h1>
    </b-container>

    <b-container size="l">
      <b-search
        :placeholder="$t('search_in_title_author_genre_tag')"
        filter
        @input="search"
        @submit.prevent="search"
        @reset="reset"
        @filter="modal = 'filter'"
        v-model="filter.term"
      />
    </b-container>

    <b-container size="l">
      <h2>{{ $t('books') }}</h2>
      <search-book-results />
    </b-container>

    <b-container size="l">
      <h2>{{ $t('authors') }}</h2>
      <search-author-results />
    </b-container>

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
        <b-button
          design="primary_wide"
          @click.prevent="
            search
            modal = null
          "
          >{{ $t('search') }}</b-button
        >
      </template>

      <b-container size="l">
        <!-- branch -->
        <search-radio-filter
          :title="$t('branch')"
          :items="branch.state.branches"
          fieldKey="id"
          fieldValue="name"
          v-model="filter.branch"
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
        <search-radio-filter
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
            { key: 1, value: 'item1' },
            { key: 2, value: 'item2' },
          ]"
          v-model="filter.orderByDirection"
        />

        <!-- limit -->
        <label for="limit">{{ $t('limit') }}</label>
        <b-form-input type="number" id="limit" v-model="filter.limit" />
      </b-container>
    </b-modal>
  </article>
</template>

<script>
import { reactive, toRefs, ref } from '@vue/composition-api'
import router from '~b/router'
import SearchRadioFilter from '@/components/search/RadioFilter'
import SearchCheckboxFilter from '@/components/search/CheckboxFilter'
import SearchNumberRangeFilter from '@/components/search/NumberRangeFilter'
import SearchDateRangeFilter from '@/components/search/DateRangeFilter'
import SearchBookResults from '@/components/search/BookResults'
import SearchAuthorResults from '@/components/search/AuthorResults'
import useBranch from '@/composables/useBranch'
import useGenre from '@/composables/useGenre'
import useFormat from '@/composables/useFormat'

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
  },
  props: {
    query: Object,
  },
  setup(props) {
    const { query } = toRefs(props)

    const filter = reactive({
      term: query.value.term || '',
      branch: null,
      genre: [],
      releaseYear: '',
      availability: [],
      format: null,
      added: '',
      orderBy: null,
      orderByDirection: null,
      limit: 50,
    })

    const modal = ref(null)

    const search = () => {
      router.push({ name: 'search', query: filter })
    }

    const reset = () => {
      filter.term = ''
      search()
    }

    const branch = useBranch()
    branch.list()

    const genre = useGenre()

    const format = useFormat()

    return { filter, modal, search, reset, branch, genre, format }
  },
}
</script>
