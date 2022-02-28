<template>
  <b-container size="m">
    <h2>{{ $t('file_manager') }} (Experiment)</h2>

    <b-spinner size="m" v-if="directory.state.isLoading" />

    <ul :style="{ padding: '0' }" v-if="directory.state.elements != null">
      <li
        :style="{ listStyle: 'none', cursor: 'pointer' }"
        v-if="directory.state.elements.details.current.path != ''"
        @click="
          directory.state.dir = directory.state.elements.details.parent.path
        "
      >
        {{ $t('back') }}
      </li>
      <li
        :style="{ listStyle: 'none', cursor: 'pointer' }"
        v-for="(element, index) in directory.state.elements.contents"
        :key="index"
      >
        <span v-if="element.isDir" @click="directory.state.dir = element.path"
          ><b-icon type="directory" /> {{ element.name }}</span
        >
        <span v-if="element.isFile"
          ><b-icon type="file" /> {{ element.name }} ({{ element.size }}
          {{ $t('bytes') }})
          <b-button
            type="button"
            design="text"
            @click="useCover(element.path)"
            >{{ $t('use_cover') }}</b-button
          ></span
        >
        <p v-if="element.doc" :style="{ fontSize: '0.8rem' }">
          {{ element.doc }}
        </p>
      </li>
    </ul>
  </b-container>
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
