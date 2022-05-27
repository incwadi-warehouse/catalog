<script>
import { computed, ref } from '@vue/composition-api'

export default {
  name: 'search-number-range-filter',
  props: {
    value: String,
    title: String,
  },
  setup(props) {
    const id = Math.random().toString(36).substr(2, 8)

    const start = ref(props.value.split('..')[0])
    const end = ref(props.value.split('..')[1])

    const selectedRange = computed(() => {
      return [start.value, end.value].join('..')
    })

    const formattedRange = computed(() => {
      return [start.value, end.value].join(' - ')
    })

    return { id, start, end, selectedRange, formattedRange }
  },
}
</script>

<template>
  <b-dropdown position="bottom" keep-open>
    <template #selector>
      {{ title }}
      <span v-if="value">({{ formattedRange }})</span>
    </template>

    <b-dropdown-item no-hover>
      <label :for="id + '-range-start'">{{ $t('range_start') }}</label>
      <b-form-input
        type="number"
        :id="id + '-range-start'"
        v-model="start"
        @input="$emit('input', selectedRange)"
      />
    </b-dropdown-item>

    <b-dropdown-item no-hover>
      <label :for="id + '-range-end'">{{ $t('range_end') }}</label>
      <b-form-input
        type="number"
        :id="id + '-range-end'"
        v-model="end"
        @input="$emit('input', selectedRange)"
      />
    </b-dropdown-item>
  </b-dropdown>
</template>
