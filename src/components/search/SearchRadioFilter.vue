<script setup>
import { find } from 'lodash'
import { computed } from 'vue'

const props = defineProps({
  value: String,
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
})

const selectedItemName = computed(() => {
  return find(props.items, (el) => {
    return el[props.fieldKey] === props.value
  })[props.fieldValue]
})
</script>

<template>
  <b-dropdown position="bottom" v-if="items" keep-open>
    <template #selector>
      {{ title }}
      <span v-if="value">({{ selectedItemName }})</span>
    </template>

    <b-dropdown-item
      v-for="item in items"
      :key="item[fieldKey]"
      :bold="value && value == item[fieldKey]"
      @click="$emit('update:modelValue', item[fieldKey])"
    >
      {{ item[fieldValue] }}
    </b-dropdown-item>
  </b-dropdown>
</template>
