<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('settings') }}</h1>
    </b-container>

    <b-container size="m" v-if="book.state.stats">
      <h2>{{ $t('stats') }}</h2>
      <settings-stats :stats="book.state.stats" />
    </b-container>

    <b-container size="m" v-if="book.state.stats">
      <p>{{ $t('storage') }}: {{ book.state.stats.storage }} MB</p>
    </b-container>

    <b-container size="m">
      <b-list :route="{ name: 'settings.branch' }" divider>
        <template #title>{{ $t('branch') }}</template>
      </b-list>
      <b-list :route="{ name: 'settings.inventory' }" divider>
        <template #title>{{ $t('inventory') }}</template>
      </b-list>
      <b-list :route="{ name: 'settings.condition' }" divider>
        <template #title>{{ $t('condition') }}</template>
      </b-list>
      <b-list :route="{ name: 'settings.format' }" divider>
        <template #title>{{ $t('format') }}</template>
      </b-list>
      <b-list :route="{ name: 'settings.genre' }" divider>
        <template #title>{{ $t('genre') }}</template>
      </b-list>
      <b-list :route="{ name: 'settings.staff' }" divider>
        <template #title>{{ $t('staff') }}</template>
      </b-list>
      <b-list :route="{ name: 'settings.bookmark' }" divider>
        <template #title>{{ $t('bookmarks') }}</template>
      </b-list>
    </b-container>
  </article>
</template>

<script>
import SettingsStats from '../components/settings/Stats'
import useBook from '@/composables/useBook'
import { onMounted } from '@vue/composition-api'

export default {
  name: 'settings-view',
  head: {
    title: 'Settings',
  },
  components: {
    SettingsStats,
  },
  setup() {
    const book = useBook()

    onMounted(book.stats)

    return { book }
  },
}
</script>
