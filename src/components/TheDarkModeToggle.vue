<template>
  <v-btn :icon="mdiThemeLightDark" @click="toggleDark()"></v-btn>
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core';
import { mdiThemeLightDark } from '@mdi/js';
import { useTheme } from 'vuetify';

const theme = useTheme();

const isDark = useDark({
  onChanged(dark) {
    theme.global.name.value = dark ? 'dark' : 'light';
  },
});
const toggleDark = useToggle(isDark);
</script>

<style></style>
