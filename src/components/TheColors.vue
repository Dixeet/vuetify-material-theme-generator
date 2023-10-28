<template>
  <div>
    <h4 class="text-subtitle">Material and Vuetify</h4>
    <div class="d-flex flex-wrap align-center colors-container">
      <div v-for="color in colors" :key="color.name" class="w-25 color-block">
        <AppColor height="60" :color="color"></AppColor>
      </div>
    </div>
    <div v-show="customColorsList?.length" class="mt-3">
      <h4 class="text-subtitle">Custom</h4>
      <div class="d-flex flex-wrap align-center colors-container">
        <div
          v-for="color in customColorsList"
          :key="color.name"
          class="w-25 color-block"
        >
          <AppColor height="60" :color="color"></AppColor>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTheme } from 'vuetify';
import AppColor from '~/components/AppColor.vue';
import { computed } from 'vue';
import { vuetifyMainColors } from '~/composables/useVuetifyTheme.js';

const props = defineProps({
  customColors: {
    type: Array,
    default: () => [],
  },
});

const theme = useTheme();

const mainColors = vuetifyMainColors
  .filter((color) => !color.includes('-darken'))
  .concat('primary-darken-1', 'secondary-darken-1');

const colors = computed(() => {
  return mainColors.map((name) => {
    return {
      name,
      value: theme.current.value.colors[name],
    };
  });
});

const customColorsList = computed(() => {
  const list = [];
  props.customColors.forEach((name) => {
    const names = [
      name,
      `on-${name}`,
      `${name}-container`,
      `on-${name}-container`,
    ];
    for (const n of names) {
      if (theme.current.value.colors[n]) {
        list.push({
          name: n,
          value: theme.current.value.colors[n],
        });
      }
    }
  });
  return list;
});
</script>

<style>
.colors-container {
  margin: -2px -2px;
}
.color-block {
  padding: 2px 2px;
}
</style>
