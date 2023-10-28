<template>
  <div>
    <p class="mb-2 text-body-2">
      <span class="text-medium-emphasis">default</span><br />
      <span>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos ea
        esse laudantium odio rerum?
      </span>
    </p>
    <p
      v-for="(color, index) in vuetifyMainColors"
      :key="`text-${index}`"
      class="mb-2 text-body-2"
    >
      <span class="text-medium-emphasis">.text-{{ color }}</span
      ><br />
      <span :class="`text-${color}`">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos ea
        esse laudantium odio rerum?
      </span>
    </p>
  </div>
</template>

<script setup>
import { vuetifyMainColors } from '~/composables/useVuetifyTheme.js';
</script>

<style></style>
