<script>
import { useDirectory } from '@/composables/useDirectory.js'

export default {
  name: 'directory-create',
  setup(props, { emit }) {
    const { dirname, createDir } = useDirectory(emit)

    return { dirname, createDir }
  },
}
</script>

<template>
  <b-form @submit.prevent="createDir">
    <b-form-group>
      <b-form-item>
        <b-form-label for="name">
          {{ $t('create_new_directory') }}
        </b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-input id="name" required v-model="dirname" />
      </b-form-item>
    </b-form-group>
  </b-form>
</template>
