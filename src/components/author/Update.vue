<template>
  <b-form @submit.prevent="update" v-if="author">
    <b-form-group>
      <b-form-item>
        <b-form-label for="firstname">
          {{ $t('firstname') }}
        </b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-input type="text" id="firstname" v-model="state.firstname" />
      </b-form-item>
    </b-form-group>

    <b-form-group>
      <b-form-item>
        <b-form-label for="surname">{{ $t('surname') }}</b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-input type="text" id="surname" v-model="state.surname" />
      </b-form-item>
    </b-form-group>

    <b-form-group buttons>
      <b-form-item>
        <b-button design="primary">
          {{ $t('save') }}
        </b-button>
      </b-form-item>
    </b-form-group>
  </b-form>
</template>

<script>
import { reactive, toRefs, computed } from '@vue/composition-api'

export default {
  name: 'author-update',
  props: {
    author: Object,
  },
  setup(props, { emit }) {
    const { author } = toRefs(props)

    const state = reactive({
      firstname: computed(() => {
        return author.value ? author.value.firstname : ''
      }),
      surname: computed(() => {
        return author.value ? author.value.surname : ''
      }),
    })

    const update = () => {
      emit('update', {
        id: author.value.id,
        params: { firstname: state.firstname, surname: state.surname },
      })
    }

    return { state, update }
  },
}
</script>
