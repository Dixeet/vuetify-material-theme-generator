<template>
  <v-btn icon variant="text" density="compact">
    <v-icon :icon="mdiCog" size="small"></v-icon>
    <v-menu
      activator="parent"
      location="bottom"
      offset="5"
      :close-on-content-click="false"
    >
      <v-sheet style="border: var(--app-border)" elevation="20" class="pa-3">
        <v-switch
          v-model="options.surfaceDifferentBackground"
          color="primary"
          label="Surface different from background"
          hide-details
        ></v-switch>
      </v-sheet>
    </v-menu>
  </v-btn>
</template>

<script setup>
import { useVModel } from '@vueuse/core';
import { mdiCog } from '@mdi/js';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});
defineEmits(['update:modelValue']);
const options = useVModel(props);
</script>

<style></style>
