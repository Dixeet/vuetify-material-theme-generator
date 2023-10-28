<template>
  <div :style="blockStyle" class="pa-2 d-flex align-center">
    <div class="flex-grow-1 text-center">
      <div>
        {{ color.name }}
      </div>
      <div class="text-body-3">
        {{ color.value }}
      </div>
    </div>
    <v-btn
      :style="colorStyle"
      icon
      variant="text"
      density="comfortable"
      @click.stop="copy()"
    >
      <v-icon :icon="mdiContentCopy" size="small"></v-icon>
    </v-btn>
  </div>
</template>

<script setup>
import { mdiContentCopy } from '@mdi/js';
import { useClipboard } from '@vueuse/core';
import { computed } from 'vue';

const props = defineProps({
  color: {
    type: Object,
    required: true,
  },
  height: {
    type: [Number, String],
    default: 50,
  },
});

const { copy } = useClipboard({ source: props.color.value });
const colorStyle = computed(() => {
  let bgColor,
    textColor = null;
  if (props.color.name.startsWith('on-')) {
    bgColor = props.color.name;
    textColor = props.color.name.replace('on-', '');
  } else {
    bgColor = props.color.name;
    textColor = `on-${props.color.name}`;
  }
  return {
    backgroundColor: `rgb(var(--v-theme-${bgColor}))`,
    color: `rgb(var(--v-theme-${textColor}))`,
  };
});
const blockStyle = computed(() => {
  return {
    ...colorStyle.value,
    height: `${props.height}px`,
  };
});
</script>

<style></style>
