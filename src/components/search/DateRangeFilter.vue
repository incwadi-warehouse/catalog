<template>
  <b-dropdown position="bottom" keep-open>
    <template #selector>
      {{ title }}
      <span v-if="value"> ({{ formattedRange }})</span>
    </template>

    <b-dropdown-item no-hover>
      <label :for="id + '-range-start'">{{ $t('range_start') }}</label>
      <b-form-input
        type="date"
        :id="id + '-range-start'"
        v-model="range.start"
        @input="$emit('input', selectedRange)"
      />
    </b-dropdown-item>

    <b-dropdown-item no-hover>
      <label :for="id + '-range-end'">{{ $t('range_end') }}</label>
      <b-form-input
        type="date"
        :id="id + '-range-end'"
        v-model="range.end"
        @input="$emit('input', selectedRange)"
      />
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
import { computed, reactive } from '@vue/composition-api'

export default {
  name: 'search-date-range-filter',
  props: {
    value: String,
    title: String,
  },
  setup(props) {
    const id = Math.random().toString(36).substr(2, 8)

    const range = reactive({
      start: props.value.split('..')[0],
      end: props.value.split('..')[1],
    })

    const selectedRange = computed(() => {
      return [range.start, range.end].join('..')
    })

    const formattedRange = computed(() => {
      let start = new Date(range.start)
      let end = new Date(range.end)

      return [start.toLocaleDateString(), end.toLocaleDateString()].join(' - ')
    })

    return { id, range, selectedRange, formattedRange }
  },
}
</script>
