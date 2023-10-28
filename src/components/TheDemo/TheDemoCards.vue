<template>
  <div>
    <div>
      <v-row>
        <v-col
          v-for="(color, index) in elementColors"
          :key="`elev-card-${index}`"
          cols="3"
        >
          <v-card
            :color="color"
            variant="elevated"
            :title="color"
            text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos ea
        esse laudantium odio rerum?"
          />
        </v-col>
        <v-col
          v-for="(color, index) in basicElementColors"
          :key="`elev-card-${index}`"
          cols="3"
        >
          <v-card
            :color="color"
            variant="tonal"
            :title="`${color} tonal`"
            text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos ea
        esse laudantium odio rerum?"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import { vuetifyMainColors } from '~/composables/useVuetifyTheme.js';

const elementColors = vuetifyMainColors.filter(
  (color) =>
    !color.includes('on-') &&
    !color.includes('-darken') &&
    !color.includes('background') &&
    !color.includes('error') &&
    !color.includes('warn') &&
    !color.includes('success') &&
    !color.includes('info'),
);
const basicElementColors = elementColors.filter(
  (color) => !color.includes('-container') && !color.includes('surface'),
);
</script>

<style></style>
