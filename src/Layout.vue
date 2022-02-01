<template>
  <b-app>
    <b-masthead>
      <b-masthead-item type="start" v-if="auth.state.isAuthenticated">
        <span @click="state.isDrawerActive = true">
          <b-icon type="hamburger" />
        </span>
      </b-masthead-item>

      <b-masthead-item type="center">
        <router-link :to="{ name: 'index' }">
          <logo v-if="state.hasLogo" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 200 200"
            class="logo"
            v-else
          >
            <path
              d="M 27.435547 9.8710938 C 17.706307 9.8710935 9.8710935 17.706307 9.8710938 27.435547 L 9.8710938 172.56445 C 9.8710935 182.29369 17.706307 190.12891 27.435547 190.12891 L 172.56445 190.12891 C 182.29369 190.12891 190.12891 182.29369 190.12891 172.56445 L 190.12891 27.435547 C 190.12891 17.706307 182.29369 9.8710938 172.56445 9.8710938 L 27.435547 9.8710938 z M 55 40 L 145 40 L 145 160 L 100 124 L 55 160 L 55 40 z "
            />
          </svg>
        </router-link>
      </b-masthead-item>

      <b-masthead-item type="end" v-if="auth.state.isAuthenticated">
        <b-dropdown position="bottom" class="action">
          <template #selector>
            <span @click.prevent>
              <b-icon type="profile" />
            </span>
          </template>
          <b-dropdown-item no-hover v-if="auth.state.me">
            {{ $t('hello') }}, {{ auth.state.me.username }}!
          </b-dropdown-item>

          <b-dropdown-divider />

          <b-dropdown-item @click.prevent="$router.push({ name: 'profile' })">
            {{ $t('settings') }}
          </b-dropdown-item>
          <b-dropdown-item @click.prevent="auth.logout()">
            {{ $t('logout') }}
          </b-dropdown-item>
        </b-dropdown>

        <b-dropdown position="bottom" class="action">
          <template #selector>
            <span @click.prevent>
              <b-icon type="star" />
            </span>
          </template>
          <b-dropdown-item
            v-for="item in bookmark.state.bookmarks"
            :key="item.id"
            @click.prevent="bookmark.open(item.url)"
          >
            {{ item.name }}
          </b-dropdown-item>

          <b-dropdown-divider />

          <b-dropdown-item icon="plus" @click="bookmark.createFromPage()">
            {{ $t('addThisPage') }}
          </b-dropdown-item>
          <b-dropdown-item
            icon="star"
            @click="$router.push({ name: 'settings.bookmark' })"
          >
            {{ $t('bookmarks') }}
          </b-dropdown-item>
        </b-dropdown>
      </b-masthead-item>
    </b-masthead>

    <slot />

    <b-container size="m">
      <div v-html="state.about" />
    </b-container>

    <b-drawer
      :active="state.isDrawerActive"
      collapsable
      @open-menu="state.isDrawerActive = true"
      @close-menu="state.isDrawerActive = false"
    >
      <div :style="{ padding: '20px' }">
        <b-list :route="{ name: 'search' }" divider>
          <template #title>
            {{ $t('search') }}
          </template>
        </b-list>
        <b-list :route="{ name: 'reservation' }" divider>
          <template #title>
            {{ $t('reservation') }}
          </template>
        </b-list>
        <b-list :route="{ name: 'settings' }" divider>
          <template #title>
            {{ $t('settings') }}
          </template>
        </b-list>
        <b-list divider>
          <template #title>
            <a :href="links.find">
              {{ $t('find') }}
            </a>
          </template>
        </b-list>
      </div>
    </b-drawer>

    <div class="project">
      <a href="https://github.com/abaldeweg">baldeweg OpenSource</a>
    </div>
  </b-app>
</template>

<script>
import {
  onBeforeUnmount,
  onMounted,
  computed,
  reactive,
} from '@vue/composition-api'
import Logo from './components/Logo'
import router from '~b/router'
import useBookmark from '@/composables/useBookmark'

export default {
  name: 'layout',
  props: {
    auth: {
      type: Object,
    },
  },
  components: {
    Logo,
  },
  setup() {
    const state = reactive({
      about: computed(() => {
        return process.env.VUE_APP_ABOUT
      }),
      hasLogo: computed(() => {
        return process.env.VUE_APP_LOGO === 'false' ? false : true
      }),
      isDrawerActive: false,
    })

    onMounted(() => {
      router.beforeEach((to, from, next) => {
        state.isDrawerActive = false
        next()
      })
    })

    const bookmark = useBookmark()

    const refresh = () => {
      state.refresh = setInterval(bookmark.list, 5000)
    }

    onMounted(refresh)
    onBeforeUnmount(() => {
      clearInterval(state.refresh)
    })

    const links = reactive({
      find: process.env.VUE_APP_FIND,
    })

    return { state, bookmark, links }
  },
}
</script>

<style scoped>
.logo {
  fill: var(--color-primary-10);
}
.action {
  float: right;
  margin-left: 20px;
}
.project {
  text-align: right;
  font-size: 0.6rem;
  margin: 0 20px;
}
.project a,
.project a:hover {
  color: var(--color-neutral-04);
}
</style>
