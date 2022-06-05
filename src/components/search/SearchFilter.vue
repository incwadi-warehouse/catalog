<script setup>
import SearchRadioFilter from '@/components/search/SearchRadioFilter.vue'
import SearchCheckboxFilter from '@/components/search/SearchCheckboxFilter.vue'
import SearchNumberRangeFilter from '@/components/search/SearchNumberRangeFilter.vue'
import SearchDateRangeFilter from '@/components/search/SearchDateRangeFilter.vue'
import { useBranch } from '@/composables/useBranch.js'
import { useFilter } from '@/composables/useFilter.js'
import { useGenre } from '@/composables/useGenre.js'
import { useFormat } from '@/composables/useFormat.js'
import { useAuthor } from '@/composables/useAuthor.js'
import { useBook } from '@/composables/useBook.js'
import router from '@/router'

defineProps({
  auth: Object,
})

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
  resetFilter
  books.value = null
  authors.value = null
}
</script>

<template>
  <b-modal close-button :width="600" @close="$emit('close')">
    <template #title>
      <b-icon type="filter" :size="15" no-hover /> {{ $t('filters') }}
    </template>

    <template #footer>
      <b-form-group buttons>
        <b-form-item>
          <b-button design="text" @click.prevent="reset() && $emit('close')">{{
            $t('reset')
          }}</b-button>
          <b-button
            design="primary"
            @click.prevent="search() && $emit('close')"
            >{{ $t('search') }}</b-button
          >
        </b-form-item>
      </b-form-group>
    </template>

    <b-container size="l">
      <!-- branch -->
      <SearchRadioFilter
        :title="$t('branch')"
        :items="branches"
        fieldKey="id"
        fieldValue="name"
        v-model="filter.branch"
        v-if="auth.state.me.isAdmin"
      />

      <!-- genre -->
      <SearchCheckboxFilter
        :title="$t('genre')"
        :items="genres"
        fieldKey="id"
        fieldValue="name"
        v-model="filter.genre"
      />

      <!-- release year -->
      <SearchNumberRangeFilter
        :title="$t('release_year')"
        v-model="filter.releaseYear"
      />

      <!-- availability -->
      <SearchCheckboxFilter
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
      <SearchCheckboxFilter
        :title="$t('format')"
        :items="formats"
        fieldKey="id"
        fieldValue="name"
        v-model="filter.format"
      />

      <!-- added -->
      <SearchDateRangeFilter :title="$t('added')" v-model="filter.added" />

      <!-- order by -->
      <SearchRadioFilter
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
      <SearchRadioFilter
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
