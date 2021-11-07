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
        <b-dropdown position="bottom">
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
      </b-masthead-item>
    </b-masthead>

    <b-container size="m" v-if="auth.state.isAuthenticated">
      <b-tabs>
        <b-tabs-link>
          <router-link :to="{ name: 'index' }">
            {{ $t('home') }}
          </router-link>
        </b-tabs-link>
        <b-tabs-link>
          <router-link :to="{ name: 'profile' }" v-if="auth.state.me">
            {{ auth.state.me.username }}
          </router-link>
        </b-tabs-link>
        <b-tabs-link>
          <a href="/logout" @click.prevent="auth.logout">
            {{ $t('logout') }}
          </a>
        </b-tabs-link>
      </b-tabs>
    </b-container>

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
        <b-list :route="{ name: 'index' }" divider>
          <template #title>
            {{ $t('home') }}
          </template>
        </b-list>
        <b-list :route="{ name: 'profile' }" divider v-if="auth.state.me">
          <template #title>
            {{ auth.state.me.username }}
          </template>
        </b-list>
      </div>
    </b-drawer>
  </b-app>
</template>

<script>
import { onMounted, computed, reactive } from '@vue/composition-api'
import Logo from './components/Logo'
import router from '~b/router'

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

    return { state }
  },
}
</script>

<style scoped>
.logo {
  fill: var(--color-primary-10);
}
</style>
