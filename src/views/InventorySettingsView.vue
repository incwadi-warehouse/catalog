<template>
  <article>
    <b-container size="m">
      <b-button
        :style="{ float: 'right' }"
        design="outline"
        @click.prevent="inventory.create"
        v-if="!inventory.state.hasActiveInventory && auth.state.me.isAdmin"
      >
        {{ $t('createInventory') }}
      </b-button>

      <h1>{{ $t('inventory') }}</h1>
      <p>{{ $t('inventoryDesc') }}</p>
    </b-container>

    <b-container size="m">
      <inventory-table
        :inventories="inventory.state.inventories"
        :isAdmin="auth.state.me.isAdmin"
        @end="inventory.end"
      />
    </b-container>
  </article>
</template>

<script>
import InventoryTable from '@/components/inventory/Table'
import useInventory from '@/composables/useInventory'

export default {
  name: 'inventory-settings-view',
  head: {
    title: 'Inventory',
  },
  components: {
    InventoryTable,
  },
  props: {
    auth: Object,
  },
  setup() {
    const inventory = useInventory()

    return {
      inventory,
    }
  },
}
</script>
