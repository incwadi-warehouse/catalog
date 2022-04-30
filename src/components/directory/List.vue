<template>
  <article>
    <b-spinner size="m" v-if="isLoading" />

    <div v-if="elements != null">
      <!-- back -->
      <b-list v-if="elements.details.current.path != ''">
        <template #image>
          <span @click="dir = elements.details.parent.path">
            <b-icon type="directory" />
          </span>
        </template>
        <template #title>
          <span @click="dir = elements.details.parent.path">
            {{ $t('back') }}
          </span>
        </template>
      </b-list>

      <!-- item -->
      <b-list
        v-for="(element, index) in elements.contents"
        :key="index"
        :disabled="element.isFile"
      >
        <template #image>
          <span v-if="element.isDir" @click="dir = element.path">
            <b-icon type="directory" />
          </span>
          <span v-if="element.isFile">
            <b-icon type="file" no-hover />
          </span>
        </template>

        <template #title>
          <span v-if="element.isDir" @click="dir = element.path">
            {{ element.name }}</span
          >
          <span v-if="element.isFile">
            {{ element.name }} ({{ element.size }} {{ $t('bytes') }})
          </span>
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
            <b-dropdown-item
              @click.prevent="uploadCover(id, element.path)"
              v-if="id && element.isFile && !element.doc"
            >
              {{ $t('use_as_cover') }}
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-list>
    </div>
  </article>
</template>

<script>
import useDirectory from '@/composables/useDirectory'

export default {
  name: 'directory-list',
  props: {
    id: String,
  },
  setup(props, { emit }) {
    const { dir, elements, isLoading, removeElement, uploadCover } =
      useDirectory(emit)

    return { dir, elements, isLoading, removeElement, uploadCover }
  },
}
</script>
