<script>
import { useDirectory } from '@/composables/useDirectory.js'
import DirectoryElement from './Element.vue'

export default {
  name: 'directory-list',
  props: {
    id: String,
  },
  components: {
    DirectoryElement,
  },
  setup(props, { emit }) {
    const { dir, elements, isLoading } = useDirectory(emit)

    return { dir, elements, isLoading }
  },
}
</script>

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
      <directory-element
        v-for="(element, index) in elements.contents"
        :key="index"
        :id="id"
        :element="element"
      />
    </div>
  </article>
</template>
