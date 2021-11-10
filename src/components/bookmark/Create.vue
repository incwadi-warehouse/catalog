<template>
  <b-form
    @submit.prevent="
      $emit('create', state.url)
      state.url = ''
    "
  >
    <b-form-group>
      <b-form-item>
        <b-form-label for="bookmark" hidden>
          {{ $t('new_bookmark') }}
        </b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-input
          type="text"
          id="bookmark"
          :placeholder="$t('enter_bookmark_and_hit_enter')"
          v-model="state.url"
        />
      </b-form-item>
    </b-form-group>
  </b-form>
</template>

<script>
import { reactive } from '@vue/composition-api'

export default {
  name: 'bookmark-create',
  setup() {
    const state = reactive({
      url: '',
    })

    return { state }
  },
}
</script>
