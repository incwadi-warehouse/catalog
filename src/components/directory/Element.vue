<template>
  <b-list :disabled="element.isFile">
    <template #image>
      <span v-if="element.isDir" @click="dir = element.path">
        <b-icon type="directory" />
      </span>
      <span v-if="element.isFile">
        <b-icon type="file" no-hover />
      </span>
    </template>

    <template #title>
      <span v-if="element.isDir && !isEditing" @click="dir = element.path">
        {{ element.name }}</span
      >
      <span v-if="element.isFile && !isEditing">
        {{ element.name }} ({{ element.size }} {{ $t('bytes') }})
      </span>

      <b-form @submit.prevent="edit" v-if="isEditing">
        <b-form-group>
          <b-form-item>
            <b-form-label for="name" hidden>{{ $t('name') }}</b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input id="name" v-model="name" />
          </b-form-item>
        </b-form-group>
      </b-form>
    </template>

    <template #subtitle v-if="element.doc">
      {{ element.doc }}
    </template>

    <template #options>
      <b-dropdown position="selector">
        <template #selector>
          <b-icon type="meatballs" />
        </template>
        <b-dropdown-item @click.prevent="removeElement(element.name)">
          {{ $t('remove') }}
        </b-dropdown-item>
        <b-dropdown-item @click.prevent="isEditing = true">
          {{ $t('rename') }}
        </b-dropdown-item>
        <b-dropdown-item
          @click.prevent="uploadCover(id, element.path)"
          v-if="id && element.isFile && !element.doc"
        >
          {{ $t('use_as_cover') }}
        </b-dropdown-item>
      </b-dropdown>
    </template>
  </b-list>
</template>

<script>
import useDirectory from '@/composables/useDirectory'
import { ref } from '@vue/composition-api'

export default {
  name: 'directory-element',
  props: {
    id: String,
    element: Object,
  },
  setup(props, { emit }) {
    const { dir, removeElement, editElement, uploadCover } = useDirectory(emit)

    const name = ref(props.element.name)
    const isEditing = ref(false)

    const edit = () => {
      editElement(props.element.name, name.value).then(() => {
        isEditing.value = false
      })
    }

    return { name, isEditing, dir, removeElement, uploadCover, edit }
  },
}
</script>
