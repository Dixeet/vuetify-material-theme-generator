<template>
  <div>
    <div class="mb-3">
      <h4 class="text-subtitle mb-2">Elevated Buttons</h4>
      <div class="d-flex flex-wrap" style="gap: 8px">
        <v-btn
          v-for="(color, index) in elementColors"
          :key="`elev-btn-${index}`"
          variant="elevated"
          :color="color"
          density="comfortable"
          size="small"
        >
          {{ color }}
        </v-btn>
      </div>
    </div>
    <div>
      <h4 class="text-subtitle mb-2">Tonal Buttons</h4>
      <div class="d-flex flex-wrap" style="gap: 8px">
        <v-btn
          v-for="(color, index) in basicElementColors"
          :key="`elev-btn-${index}`"
          variant="tonal"
          :color="color"
          density="comfortable"
          size="small"
        >
          {{ color }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { vuetifyMainColors } from '~/composables/useVuetifyTheme.js';

const elementColors = vuetifyMainColors.filter(
  (color) =>
    !color.includes('on-') &&
    !color.includes('-darken') &&
    !color.includes('background'),
);
const basicElementColors = elementColors.filter(
  (color) => !color.includes('-container') && !color.includes('surface'),
);
</script>

<style></style>
