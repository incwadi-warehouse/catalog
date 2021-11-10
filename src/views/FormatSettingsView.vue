<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('formats') }}</h1>
      <p>{{ $t('formats_desc') }}</p>
    </b-container>

    <b-container size="m">
      <format-show
        v-for="item in format.state.formats"
        :key="item.id"
        :format="item"
        :isAdmin="auth.state.me.isAdmin"
        @update="format.update"
        @remove="format.remove"
      />
    </b-container>

    <b-container size="m" v-if="auth.state.me.isAdmin">
      <format-create @create="format.create" />
    </b-container>
  </article>
</template>

<script>
import FormatShow from '@/components/format/Show'
import FormatCreate from '@/components/format/Create'
import useFormat from '@/composables/useFormat'

export default {
  name: 'format-settings-view',
  head: {
    title: 'Formats',
  },
  components: {
    FormatShow,
    FormatCreate,
  },
  props: {
    auth: Object,
  },
  setup() {
    const format = useFormat()

    return { format }
  },
}
</script>
