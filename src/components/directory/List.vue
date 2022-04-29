<template>
  <article>
    <b-spinner size="m" v-if="directory.state.isLoading" />

    <div v-if="directory.state.elements != null">
      <!-- back -->
      <b-list v-if="directory.state.elements.details.current.path != ''">
        <template #image>
          <span
            @click="
              directory.state.dir = directory.state.elements.details.parent.path
            "
          >
            <b-icon type="directory" />
          </span>
        </template>
        <template #title>
          <span
            @click="
              directory.state.dir = directory.state.elements.details.parent.path
            "
          >
            {{ $t('back') }}
          </span>
        </template>
      </b-list>

      <!-- item -->
      <b-list
        v-for="(element, index) in directory.state.elements.contents"
        :key="index"
        :disabled="element.isFile"
      >
        <template #image>
          <span
            v-if="element.isDir"
            @click="directory.state.dir = element.path"
          >
            <b-icon type="directory" />
          </span>
          <span v-if="element.isFile">
            <b-icon type="file" no-hover />
          </span>
        </template>

        <template #title>
          <span
            v-if="element.isDir"
            @click="directory.state.dir = element.path"
          >
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
            <b-dropdown-item
              @click.prevent="useCover(element.path)"
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
  name: 'directory-file-manager',
  props: {
    id: String,
  },
  setup(props, { emit }) {
    const directory = useDirectory()

    const useCover = (url) => {
      directory.useCover(props.id, url).then(() => {
        emit('update')
      })
    }

    return { directory, useCover }
  },
}
</script>
