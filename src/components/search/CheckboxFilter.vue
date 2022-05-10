<template>
  <b-dropdown position="bottom" v-if="items" keep-open>
    <template #selector>
      {{ title }}
      <span v-if="value && value.length >= 1"> ({{ selectedItemName }})</span>
    </template>

    <b-dropdown-item>
      <span @click="selectAll">All</span>
      &bull;
      <span @click="selectNone">None</span>
    </b-dropdown-item>

    <b-dropdown-item
      v-for="(item, index) in items"
      :key="item[fieldKey]"
      :bold="value && value == item[fieldKey]"
    >
      <input
        type="checkbox"
        :id="id + '-genre-' + index"
        :value="item[fieldKey]"
        v-model="selected"
        @change="$emit('input', selected)"
      />
      <label :for="id + '-genre-' + index">{{ item[fieldValue] }}</label>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
import { computed, onMounted, ref } from '@vue/composition-api'

export default {
  name: 'search-checkbox-filter',
  props: {
    value: Array,
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
    const id = Math.random().toString(36).substr(2, 8)

    const selectedItemName = computed(() => {
      return props.value.length
    })

    const selected = ref([])
    onMounted(() => {
      selected.value = selected.value.concat(props.value)
    })

    const selectAll = () => {
      document
        .querySelectorAll("input[id^='" + id + "-genre-']")
        .forEach((element) => {
          element.checked = false
          element.click()
        })
    }

    const selectNone = () => {
      document
        .querySelectorAll("input[id^='" + id + "-genre-']")
        .forEach((element) => {
          element.checked = true
          element.click()
        })
    }

    return { id, selectedItemName, selected, selectAll, selectNone }
  },
}
</script>
