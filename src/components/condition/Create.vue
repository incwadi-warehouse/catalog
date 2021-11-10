<template>
  <b-form
    @submit.prevent="
      $emit('create', state.name)
      state.name = ''
    "
  >
    <b-form-group>
      <b-form-item>
        <b-form-label for="condition" hidden>
          {{ $t('new_condition') }}
        </b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-input
          type="text"
          id="condition"
          :placeholder="$t('enter_condition_and_hit_enter')"
          v-model="state.name"
        />
      </b-form-item>
    </b-form-group>
  </b-form>
</template>

<script>
import { reactive } from '@vue/composition-api'

export default {
  name: 'condition-create',
  setup() {
    const state = reactive({
      name: '',
    })

    return { state }
  },
}
</script>
