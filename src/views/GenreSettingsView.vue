<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('genres') }}</h1>
      <p>{{ $t('genres_desc') }}</p>
    </b-container>

    <b-container size="m">
      <genre-show
        v-for="item in genre.state.genres"
        :key="item.id"
        :genre="item"
        :isAdmin="auth.state.me.isAdmin"
        @update="genre.update"
        @remove="genre.remove"
      />
    </b-container>

    <b-container size="m" v-if="auth.state.me.isAdmin">
      <genre-create @create="genre.create" />
    </b-container>
  </article>
</template>

<script>
import GenreShow from '@/components/genre/Show'
import GenreCreate from '@/components/genre/Create'
import useGenre from '@/composables/useGenre'

export default {
  name: 'genre-settings-view',
  head: {
    title: 'Genres',
  },
  components: {
    GenreShow,
    GenreCreate,
  },
  props: {
    auth: Object,
  },
  setup() {
    const genre = useGenre()

    return { genre }
  },
}
</script>
