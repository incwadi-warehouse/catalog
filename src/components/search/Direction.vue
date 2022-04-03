<template>
  <span @click="change">
    <slot />
    <span
      v-if="
        filter.orderByDirection === 'asc' || filter.orderByDirection === 'desc'
      "
      v-html="icon()"
    />
  </span>
</template>

<script>
import { toRefs } from '@vue/composition-api'

export default {
  name: 'search-direction',
  props: {
    col: String,
    filter: Object,
  },
  setup(props, { emit }) {
    const { col, filter } = toRefs(props)

    const change = () => {
      filter.value.orderBy = col.value
      filter.value.orderByDirection = direction()

      emit('search')
    }

    const direction = () => {
      if (filter.value.orderByDirection === 'asc') {
        return 'desc'
      }

      return 'asc'
    }

    const icon = () => {
      if (col.value !== filter.value.orderBy) return

      if (filter.value.orderByDirection === 'asc') {
        return '&#9650;'
      }
      if (filter.value.orderByDirection === 'desc') {
        return '&#9660;'
      }

      return undefined
    }

    return { change, icon }
  },
}
</script>
