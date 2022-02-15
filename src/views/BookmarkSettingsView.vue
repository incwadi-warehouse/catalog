<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('bookmarks') }}</h1>
      <p>{{ $t('bookmarks_desc') }}</p>
    </b-container>

    <b-container size="m">
      <bookmark-show
        v-for="item in bookmark.state.bookmarks"
        :key="item.id"
        :bookmark="item"
        :isAdmin="auth.state.me.isAdmin"
        @update="bookmark.update"
        @remove="bookmark.remove"
      />
    </b-container>

    <b-container size="m">
      <bookmark-create @create="bookmark.create" />
    </b-container>
  </article>
</template>

<script>
import BookmarkShow from '@/components/bookmark/Show'
import BookmarkCreate from '@/components/bookmark/Create'
import useBookmark from '@/composables/useBookmark'

export default {
  name: 'bookmark-settings-view',
  head: {
    title: 'Bookmarks',
  },
  components: {
    BookmarkShow,
    BookmarkCreate,
  },
  props: {
    auth: Object,
  },
  setup() {
    const bookmark = useBookmark()

    return { bookmark }
  },
}
</script>
