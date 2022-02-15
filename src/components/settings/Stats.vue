<template>
  <div v-if="stats">
    <div class="barchart">
      <b-tooltip
        position="top"
        :text="stats.available + ' ' + $tc('available_books', stats.available)"
      >
        <div
          class="barchart_item"
          :style="{
            width: calcWidth(stats.available) + '%',
            background: 'var(--color-primary-10)',
          }"
        />
      </b-tooltip>
      <b-tooltip
        position="top"
        :text="stats.reserved + ' ' + $tc('reserved_books', stats.reserved)"
      >
        <div
          class="barchart_item"
          :style="{
            width: calcWidth(stats.reserved) + '%',
            background: 'var(--color-accent-yellow-10)',
          }"
        />
      </b-tooltip>
      <b-tooltip
        position="top"
        :text="stats.sold + ' ' + $tc('sold_books', stats.sold)"
      >
        <div
          class="barchart_item"
          :style="{
            width: calcWidth(stats.sold) + '%',
            background: 'var(--color-accent-green-10)',
          }"
        />
      </b-tooltip>
      <b-tooltip
        position="top"
        :text="stats.removed + ' ' + $tc('removed_books', stats.removed)"
      >
        <div
          class="barchart_item"
          :style="{
            width: calcWidth(stats.removed) + '%',
            background: 'var(--color-accent-red-10)',
          }"
        />
      </b-tooltip>
    </div>

    <ul class="barchart_legend">
      <li class="barchart_legend_item">
        <strong>{{ stats.available }}</strong>
        {{ $tc('available_books', stats.available) }}
      </li>
      <li class="barchart_legend_item">
        <strong>{{ stats.reserved }}</strong>
        {{ $tc('reserved_books', stats.reserved) }}
      </li>
      <li class="barchart_legend_item">
        <strong>{{ stats.sold }}</strong> {{ $tc('sold_books', stats.sold) }}
      </li>
      <li class="barchart_legend_item">
        <strong>{{ stats.removed }}</strong>
        {{ $tc('removed_books', stats.removed) }}
      </li>
      <li class="barchart_legend_item" :style="{ float: 'right' }">
        <strong>{{ stats.all }}</strong> {{ $tc('all_books', stats.all) }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'settings-stats',
  props: {
    stats: {
      type: Object,
    },
  },
  setup(props) {
    const calcWidth = (value) => {
      return (value / props.stats.all) * 100
    }

    return { calcWidth }
  },
}
</script>

<style scoped>
.barchart {
  width: 100%;
  height: 15px;
}
.barchart_item {
  float: left;
  height: 15px;
}
.barchart_legend {
  list-style: none;
  padding: 0;
}
.barchart_legend_item {
  float: left;
  margin-right: 20px;
}
.barchart_legend_item:last-of-type {
  margin-right: 0;
  margin-left: 20px;
}
</style>
