<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('conditions') }}</h1>
      <p>{{ $t('conditions_desc') }}</p>
    </b-container>

    <b-container size="m">
      <condition-show
        v-for="item in condition.state.conditions"
        :key="item.id"
        :condition="item"
        :isAdmin="auth.state.me.isAdmin"
        @update="condition.update"
        @remove="condition.remove"
      />
    </b-container>

    <b-container size="m" v-if="auth.state.me.isAdmin">
      <condition-create @create="condition.create" />
    </b-container>
  </article>
</template>

<script>
import ConditionShow from '@/components/condition/Show'
import ConditionCreate from '@/components/condition/Create'
import useCondition from '@/composables/useCondition'

export default {
  name: 'condition-settings-view',
  head: {
    title: 'Conditions',
  },
  components: {
    ConditionShow,
    ConditionCreate,
  },
  props: {
    auth: Object,
  },
  setup() {
    const condition = useCondition()

    return { condition }
  },
}
</script>
