<template>
  <v-btn
    class="color-picker-button"
    :color="buttonColor"
    :variant="buttonVariant"
    density="default"
    block
  >
    <div class="w-100 d-flex justify-space-between align-center">
      <div class="color-viewer" :style="{ 'background-color': color }"></div>

      <div class="flex-grow-1">
        <div>
          {{ colorName }}
        </div>
        <div class="px-2 text-body-4">
          {{ color }}
        </div>
      </div>
      <div>
        <v-btn icon variant="flat" density="compact" @click.stop="copy()">
          <v-icon :icon="mdiContentCopy" size="small"></v-icon>
        </v-btn>
      </div>
    </div>

    <v-menu
      location="bottom left"
      offset="5"
      activator="parent"
      :close-on-content-click="false"
    >
      <v-sheet width="275">
        <div
          v-if="modeSelected !== null && modes?.length"
          class="d-flex align-center flex-wrap pa-2"
          style="gap: 5px"
        >
          <v-btn
            v-for="mode in modes"
            :key="mode.value"
            :active="modeSelected === mode.value"
            :color="modeSelected === mode.value ? 'primary' : 'surface-bright'"
            class="button-modes"
            size="x-small"
            variant="tonal"
            @click.stop="onModeClick(mode.value)"
          >
            <div class="text-body-4">
              {{ mode.name }}
            </div>
          </v-btn>
        </div>
        <div style="position: relative">
          <v-color-picker
            v-model="color"
            :modes="colorPickerModes"
            :disabled="isDisabled"
            canvas-height="125"
            width="275"
            elevation="0"
            rounded="0"
          ></v-color-picker>
          <v-btn
            v-if="!isDisabled"
            icon
            class="eye-dropper-button"
            :style="{ background: color }"
            variant="plain"
            density="compact"
            @click.stop="openColorPicker"
          >
            <v-icon :icon="mdiEyedropper" size="small"></v-icon>
          </v-btn>
        </div>
      </v-sheet>
    </v-menu>
  </v-btn>
</template>

<script setup>
import { mdiEyedropper, mdiContentCopy } from '@mdi/js';
import { useClipboard, useDebounceFn, useEyeDropper } from '@vueuse/core';
import { computed, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Object, null],
    required: true,
  },
  colorName: {
    type: String,
    default: null,
  },
  buttonColor: {
    type: String,
    default: undefined,
  },
  buttonVariant: {
    type: String,
    default: 'tonal',
  },
  modes: {
    type: Array,
    default: () => [
      { value: 'inherited', name: 'Inherited' },
      { value: 'custom', name: 'Custom' },
      { value: 'blend', name: 'Blend' },
    ],
  },
  modeSelected: {
    type: String,
    default: null,
  },
});
const emit = defineEmits(['update:modelValue', 'update:modeSelected']);

const colorPickerModes = ['hex', 'rgb', 'hsl'];
const isDisabled = computed(() => {
  return !!(props.modeSelected === 'inherited' && props.modes?.length);
});

const { open: openColorPicker, sRGBHex } = useEyeDropper();
const debounceEmit = useDebounceFn((v) => {
  emit('update:modelValue', v);
}, 200);

const color = computed({
  get() {
    return props.modelValue;
  },
  set(v) {
    debounceEmit(v);
  },
});
const { copy } = useClipboard({ source: color });

watch(sRGBHex, (v) => {
  if (!isDisabled.value) {
    color.value = v;
  }
});

function onModeClick(mode) {
  emit('update:modeSelected', mode);
}
</script>

<style lang="scss" scoped>
button {
  &.color-picker-button.v-btn {
    display: inline-block;
    height: 48px;
  }
  &.button-modes {
    align-items: end;
  }
}
.color-viewer {
  width: 32px;
  height: 32px;
  border: 2px solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 50%;
  z-index: 2;
}
.eye-dropper-button {
  position: absolute;
  top: calc(125px + 16px + 2px);
  left: calc(16px + 1px);
  :deep(.v-btn__content) {
    mix-blend-mode: color-dodge;
  }
}
</style>
