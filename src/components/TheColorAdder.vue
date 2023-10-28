<template>
  <div class="d-flex align-center justify-center">
    <v-btn
      v-if="!isAdding"
      :icon="mdiPlus"
      color="surface-variant"
      variant="flat"
      @click="add"
    ></v-btn>
    <v-text-field
      v-else
      v-model="colorName"
      class="input-color"
      :rules="[rules.unique, rules.lowercase, rules.oneWord]"
      density="compact"
      hint="New unique color name"
      label="Color Name"
      autofocus
      required
    >
      <template #prepend>
        <v-btn
          icon
          color="surface-variant"
          variant="flat"
          @click.stop="validate"
          >OK</v-btn
        >
      </template>
      <template #append-inner>
        <v-btn
          density="compact"
          :icon="mdiClose"
          variant="plain"
          @click="close"
        ></v-btn>
      </template>
    </v-text-field>
  </div>
</template>

<script setup>
import { mdiPlus, mdiClose } from '@mdi/js';
import { shallowRef } from 'vue';
import { useTheme } from 'vuetify';

const emit = defineEmits(['validate']);

const theme = useTheme();

const rules = {
  unique: (value) =>
    !Object.keys(theme.current.value.colors).includes(value) ||
    'Color name must be unique',
  lowercase: (value) => !/[A-Z]/.test(value) || 'Color name must be lowercase',
  oneWord: (value) => !/\s/.test(value) || 'Color name must be one word',
};

const isAdding = shallowRef(false);
const colorName = shallowRef('');

function add() {
  isAdding.value = true;
}

function close() {
  isAdding.value = false;
  colorName.value = '';
}

function validate() {
  const valide = Object.values(rules).every((rule) => {
    const test = rule(colorName.value);
    return typeof test === 'boolean' && test;
  });
  if (valide) {
    emit('validate', colorName.value);
    close();
  }
}
</script>

<style></style>
