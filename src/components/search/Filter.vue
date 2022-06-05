<script>
import SearchRadioFilter from '@/components/search/RadioFilter.vue'
import SearchCheckboxFilter from '@/components/search/CheckboxFilter.vue'
import SearchNumberRangeFilter from '@/components/search/NumberRangeFilter.vue'
import SearchDateRangeFilter from '@/components/search/DateRangeFilter.vue'
import { useBranch } from '@/composables/useBranch.js'
import { useFilter } from '@/composables/useFilter.js'
import { useGenre } from '@/composables/useGenre.js'
import { useFormat } from '@/composables/useFormat.js'
import { useAuthor } from '@/composables/useAuthor.js'
import { useBook } from '@/composables/useBook.js'
import { defineComponent } from '@vue/composition-api'
import router from '@/router'

export default defineComponent({
  components: {
    SearchRadioFilter,
    SearchCheckboxFilter,
    SearchNumberRangeFilter,
    SearchDateRangeFilter,
  },
  props: {
    auth: Object,
  },
  setup() {
    const { filter, reset: resetFilter } = useFilter()

    const { branches } = useBranch()

    const { genres } = useGenre()

    const { formats } = useFormat()

    const { authors, find: findAuthor } = useAuthor()

    const { books } = useBook()

    const search = () => {
      router.push({ name: 'search', query: filter })
      if (filter.term !== null) {
        findAuthor({ term: filter.term })
      }
      find({ options: filter })
    }

    const reset = () => {
      resetFilter()
      books.value = null
      authors.value = null
      router.push({ name: 'search' })
    }

    return { filter, branches, genres, formats, search, reset }
  },
})
</script>

<template>
  <b-modal close-button :width="600" @close="$emit('close')">
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
              $emit('close')
            "
            >{{ $t('reset') }}</b-button
          >
          <b-button
            design="primary"
            @click.prevent="
              search()
              $emit('close')
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
        :items="branches"
        fieldKey="id"
        fieldValue="name"
        v-model="filter.branch"
        v-if="auth.state.me.isAdmin"
      />

      <!-- genre -->
      <search-checkbox-filter
        :title="$t('genre')"
        :items="genres"
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
        :items="formats"
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
</template>
