<script>
import { useAuthor } from '@/composables/useAuthor.js'
import { toRefs } from '@vue/composition-api'

export default {
  name: 'author-update',
  props: {
    id: Number,
  },
  setup(props) {
    const { id } = toRefs(props)

    const { author, show, update } = useAuthor()

    show(id.value)

    return { author, update }
  },
}
</script>

<template>
  <b-form @submit.prevent="update(author.id)" v-if="author">
    <b-form-group>
      <b-form-item>
        <b-form-label for="firstname">
          {{ $t('firstname') }}
        </b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-input type="text" id="firstname" v-model="author.firstname" />
      </b-form-item>
    </b-form-group>

    <b-form-group>
      <b-form-item>
        <b-form-label for="surname">{{ $t('surname') }}</b-form-label>
      </b-form-item>
      <b-form-item>
        <b-form-input type="text" id="surname" v-model="author.surname" />
      </b-form-item>
    </b-form-group>

    <b-form-group>
      <b-form-item>
        <b-button design="primary_wide">
          {{ $t('save') }}
        </b-button>
      </b-form-item>
    </b-form-group>
  </b-form>
</template>
