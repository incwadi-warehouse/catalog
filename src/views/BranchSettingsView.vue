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

    <b-toast type="success" ref="successToast">Gespeichert</b-toast>
    <b-toast type="error" ref="errorToast">Fehler</b-toast>
  </article>
</template>

<script>
import BranchEdit from '../components/branch/Edit'
import BranchCleanBooks from '../components/branch/CleanBooks'
import BranchPriceCalculator from '@/components/branch/PriceCalculator'
import useBranch from '@/composables/useBranch'
import { ref, watch } from '@vue/composition-api'

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

    const successToast = ref(null)
    const errorToast = ref(null)

    watch(
      () => branch.state.hasSuccess,
      () => {
        successToast.value.show()
        branch.state.hasSuccess = false
      }
    )

    watch(
      () => branch.state.hasError,
      () => {
        errorToast.value.show()
        branch.state.hasError = false
      }
    )

    return { branch, successToast, errorToast }
  },
}
</script>
