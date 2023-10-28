<template>
  <v-layout>
    <v-navigation-drawer width="300">
      <div class="px-3">
        <div class="d-flex justify-space-between align-center py-1">
          <TheHelp />
          <TheOptions v-model="options" />
        </div>
        <v-divider class="mb-2" />
        <div class="mb-3 px-3 d-flex justify-space-between align-center">
          <div>Material Raw Colors</div>
          <v-btn
            class="ml-2 px-1"
            icon
            variant="text"
            density="comfortable"
            @click.stop="reset"
          >
            <v-icon :icon="mdiReload" size="small"></v-icon>
          </v-btn>
        </div>
        <div v-for="(rawColor, index) in currentTheme" :key="index">
          <AppColorPicker
            v-model="rawColor.color"
            v-model:mode-selected="rawColor.modeSelected"
            class="mb-3"
            :modes="rawColor.modes"
            :color-name="rawColor.name"
            :button-color="rawColor.buttonColor"
          ></AppColorPicker>
          <div v-if="rawColor.buttonColor === 'error'">
            <v-divider class="mt-2 mb-3" />
            <div class="mb-3 px-3">Vuetify Additionnal Raw Colors</div>
          </div>
          <div v-if="rawColor.buttonColor === 'info'">
            <v-divider class="mt-2 mb-3" />
            <div class="mb-3 px-3 d-flex justify-space-between align-center">
              <div>Custom Raw Colors</div>
              <v-btn
                icon
                variant="text"
                density="comfortable"
                @click.stop="clearCustomColors"
              >
                <v-icon :icon="mdiDelete" size="small"></v-icon>
              </v-btn>
            </div>
          </div>
        </div>
        <TheColorAdder @validate="addColor" />
      </div>
    </v-navigation-drawer>

    <v-app-bar density="comfortable" title="Vuetify Material Design Generator">
      <template #append>
        <TheDarkModeToggle></TheDarkModeToggle>
      </template>
    </v-app-bar>

    <v-main>
      <v-container>
        <div class="mb-5">
          <h2 class="text-h5 mb-2">Demo</h2>
          <TheDemo height="600"></TheDemo>
        </div>
        <div class="mb-5">
          <h2 class="text-h5 mb-2">Computed Colors</h2>
          <TheColors :custom-colors="customColors" />
        </div>
        <div>
          <TheGeneratedTheme />
        </div>
      </v-container>
    </v-main>
  </v-layout>
</template>

<script setup>
import AppColorPicker from '~/components/AppColorPicker.vue';
import { nextTick, onMounted, toRaw, watch } from 'vue';
import { useMaterialTheme } from '~/composables/useMaterialTheme.js';
import TheDarkModeToggle from '~/components/TheDarkModeToggle.vue';
import { useVuetifyTheme } from '~/composables/useVuetifyTheme.js';
import TheDemo from '~/components/TheDemo.vue';
import { useTheme } from 'vuetify';
import TheColors from '~/components/TheColors.vue';
import TheGeneratedTheme from '~/components/TheGeneratedTheme.vue';
import TheColorAdder from '~/components/TheColorAdder.vue';
import { useStorage, watchPausable } from '@vueuse/core';
import { mdiReload, mdiDelete } from '@mdi/js';
import TheOptions from '~/components/TheOptions.vue';
import TheHelp from '~/components/TheHelp.vue';

const defaultRawColors = {
  primary: {
    color: '#6750A4',
    modes: null,
    modeSelected: null,
    name: 'Raw Primary',
    buttonColor: 'primary',
  },
  secondary: {
    color: null,
    modes: [
      { value: 'inherited', name: 'Inherited' },
      { value: 'custom', name: 'Custom' },
      { value: 'blend', name: 'Blend' },
    ],
    modeSelected: 'inherited',
    name: 'Raw Secondary',
    buttonColor: 'secondary',
  },
  tertiary: {
    color: null,
    modes: [
      { value: 'inherited', name: 'Inherited' },
      { value: 'custom', name: 'Custom' },
      { value: 'blend', name: 'Blend' },
    ],
    modeSelected: 'inherited',
    name: 'Raw Tertiary',
    buttonColor: 'tertiary',
  },
  neutral: {
    color: null,
    modes: [
      { value: 'inherited', name: 'Inherited' },
      { value: 'custom', name: 'Custom' },
      { value: 'blend', name: 'Blend' },
    ],
    modeSelected: 'inherited',
    name: 'Raw Neutral',
    buttonColor: undefined,
  },
  error: {
    color: null,
    modes: [
      { value: 'inherited', name: 'Inherited' },
      { value: 'custom', name: 'Custom' },
      { value: 'blend', name: 'Blend' },
    ],
    modeSelected: 'inherited',
    name: 'Raw Error',
    buttonColor: 'error',
  },
  success: {
    color: '#4CAF50',
    modes: [
      { value: 'custom', name: 'Custom' },
      { value: 'blend', name: 'Blend' },
    ],
    modeSelected: 'custom',
    name: 'Raw Success',
    buttonColor: 'success',
  },
  warn: {
    color: '#FB8C00',
    modes: [
      { value: 'custom', name: 'Custom' },
      { value: 'blend', name: 'Blend' },
    ],
    modeSelected: 'custom',
    name: 'Raw Warning',
    buttonColor: 'warning',
  },
  info: {
    color: '#2196F3',
    modes: [
      { value: 'custom', name: 'Custom' },
      { value: 'blend', name: 'Blend' },
    ],
    modeSelected: 'custom',
    name: 'Raw Info',
    buttonColor: 'info',
  },
};

const currentTheme = useStorage(
  'currentTheme',
  structuredClone(defaultRawColors),
);
const vTheme = useTheme();
const customColors = useStorage('customColors', []);
const defaultVuetifyThemes = structuredClone(toRaw(vTheme.themes.value));
const options = useStorage('options', { surfaceDifferentBackground: true });

onMounted(() => {
  applyTheme();
});

const { pause, resume } = watchPausable(
  currentTheme,
  () => {
    applyTheme();
  },
  { deep: true },
);
watch(
  options,
  () => {
    applyTheme();
  },
  { deep: true },
);

async function applyTheme() {
  const materialTheme = useMaterialTheme(currentTheme.value, options.value);
  await nextTick();
  pause();
  for (const color in currentTheme.value) {
    if (currentTheme.value[color]?.modeSelected === 'inherited') {
      currentTheme.value[color].color = materialTheme.palettesColors[color];
    }
  }
  await nextTick();
  resume();
  const vuetifyTheme = useVuetifyTheme(materialTheme, customColors.value);
  vTheme.themes.value.dark.colors = {
    ...defaultVuetifyThemes.dark.colors,
    ...vuetifyTheme.themes.dark.colors,
  };
  vTheme.themes.value.light.colors = {
    ...defaultVuetifyThemes.light.colors,
    ...vuetifyTheme.themes.light.colors,
  };
}

function addColor(colorName) {
  currentTheme.value[colorName] = {
    color: '#16171D',
    modes: [
      { value: 'custom', name: 'Custom' },
      { value: 'blend', name: 'Blend' },
    ],
    modeSelected: 'custom',
    name: `Raw ${colorName}`,
    buttonColor: colorName,
  };
  customColors.value.push(colorName);
}

function reset() {
  currentTheme.value = structuredClone(defaultRawColors);
  customColors.value = [];
}

function clearCustomColors() {
  for (const color of customColors.value) {
    delete currentTheme.value[color];
  }
  customColors.value.splice(0, customColors.value.length);
}
</script>

<style scoped></style>
