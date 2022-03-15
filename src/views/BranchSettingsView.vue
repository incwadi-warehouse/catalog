<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('branch') }}</h1>
    </b-container>

    <b-container size="m" v-if="auth.state.me">
      <h2>{{ $t('common') }}</h2>
      <branch-edit
        :branch="auth.state.me.branch"
        :me="auth.state.me"
        @update="branch.update"
      />
    </b-container>

    <b-container size="m" v-if="auth.state.me.isAdmin">
      <h2>{{ $t('clean_up') }}</h2>
      <p>{{ $t('clean_up_desc') }}</p>
      <branch-clean-books @clean="branch.clean" />
    </b-container>

    <b-container size="m">
      <h3>{{ $t('pricelist') }}</h3>
      <p>{{ $t('pricelistDesc') }}</p>
      <branch-price-calculator
        :branch="auth.state.me.branch"
        :me="auth.state.me"
        @update="branch.update"
        v-if="auth.state.me"
      />
    </b-container>
  </article>
</template>

<script>
import BranchEdit from '../components/branch/Edit'
import BranchCleanBooks from '../components/branch/CleanBooks'
import BranchPriceCalculator from '@/components/branch/PriceCalculator'
import useBranch from '@/composables/useBranch'
import { watch } from '@vue/composition-api'
import useToast from './../../node_modules/@baldeweg/components/src/composables/useToast'

export default {
  name: 'branch-settings-view',
  head: {
    title: 'Branch',
  },
  components: {
    BranchEdit,
    BranchCleanBooks,
    BranchPriceCalculator,
  },
  props: {
    auth: Object,
  },
  setup() {
    const branch = useBranch()

    const toast = useToast()

    watch(
      () => branch.state.hasSuccess,
      () => {
        branch.state.hasSuccess = false
        toast.add({ type: 'success', body: 'Gespeichert' })
      }
    )

    watch(
      () => branch.state.hasError,
      () => {
        branch.state.hasError = false
        toast.add({ type: 'error', body: 'Fehler' })
      }
    )

    return { branch }
  },
}
</script>
