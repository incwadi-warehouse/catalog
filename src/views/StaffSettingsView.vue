<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('staff') }}</h1>
      <p>{{ $t('staff_desc') }}</p>
    </b-container>

    <b-container size="m">
      <staff-show
        v-for="item in staff.state.staff"
        :key="item.id"
        :staff="item"
        :isAdmin="auth.state.me.isAdmin"
        @update="staff.update"
        @remove="staff.remove"
      />
    </b-container>

    <b-container size="m" v-if="auth.state.me.isAdmin">
      <staff-create @create="staff.create" />
    </b-container>
  </article>
</template>

<script>
import StaffShow from '@/components/staff/Show'
import StaffCreate from '@/components/staff/Create'
import useStaff from '@/composables/useStaff'

export default {
  name: 'staff-settings-view',
  head: {
    title: 'Staff',
  },
  components: {
    StaffShow,
    StaffCreate,
  },
  props: {
    auth: Object,
  },
  setup() {
    const staff = useStaff()

    return { staff }
  },
}
</script>
