<template>
  <b-list divider v-if="staff">
    <template #title>
      <b-form
        @submit.prevent="$emit('update', staff)"
        :style="{ margin: '0' }"
        v-if="isAdmin"
      >
        <b-form-group>
          <b-form-item>
            <b-form-label for="name" hidden>
              {{ $t('name') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input
              type="text"
              id="name"
              v-model="staff.name"
              @input="$emit('update', staff)"
            />
          </b-form-item>
        </b-form-group>
      </b-form>
      <span v-else>{{ staff.name }}</span>
    </template>

    <template #options>
      <b-dropdown v-if="isAdmin">
        <template #selector>
          <b-icon type="meatballs" />
        </template>
        <b-dropdown-item icon="bin" @click="$emit('remove', staff)">
          {{ $t('delete') }}
        </b-dropdown-item>
      </b-dropdown>
    </template>
  </b-list>
</template>

<script>
export default {
  name: 'staff-show',
  props: {
    staff: Object,
    isAdmin: Boolean,
  },
}
</script>
