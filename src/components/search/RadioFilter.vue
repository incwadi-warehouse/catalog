<template>
  <b-dropdown position="bottom" v-if="items">
    <template #selector>
      {{ title }}
      <span v-if="value"> ({{ selectedItemName }})</span>
    </template>

    <b-dropdown-item
      v-for="item in items"
      :key="item[fieldKey]"
      :bold="value && value == item[fieldKey]"
      @click="$emit('input', item[fieldKey])"
    >
      {{ item[fieldValue] }}
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
import { find } from 'lodash'
import { computed } from '@vue/composition-api'

export default {
  name: 'search-radio-filter',
  props: {
    value: Number,
    items: Array,
    title: String,
    fieldKey: {
      type: String,
      default: 'key',
    },
    fieldValue: {
      type: String,
      default: 'value',
    },
  },
  setup(props) {
    const selectedItemName = computed(() => {
      return find(props.items, (el) => {
        return el[props.fieldKey] === props.value
      })[props.fieldValue]
    })

    return { selectedItemName }
  },
}
</script>
