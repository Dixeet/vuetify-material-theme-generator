<template>
  <div class="the-demo rounded">
    <v-layout :style="{ height: `${height}px` }" class="rounded rounded-md">
      <v-app-bar density="compact" title="Application bar"></v-app-bar>

      <v-navigation-drawer width="200">
        <v-list>
          <v-list-item
            v-for="(color, index) in navigationDrawerColors"
            :key="`nav-${index}`"
            to="/"
            class="mb-2"
            :color="color"
            :title="`${color || 'default'} active link`"
            active
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-container :style="{ height: `${height - 48}px`, overflow: 'auto' }">
          <div class="mb-5">
            <h3 class="text-h5">Buttons</h3>
            <v-divider class="mb-3" />
            <TheDemoButtons />
          </div>
          <div class="mb-5">
            <h3 class="text-h5">Cards</h3>
            <v-divider class="mb-3" />
            <TheDemoCards />
          </div>
          <div class="mb-5">
            <h3 class="text-h5">Text</h3>
            <v-divider class="mb-3" />
            <TheDemoText />
          </div>
        </v-container>
      </v-main>
    </v-layout>
  </div>
</template>

<script setup>
import TheDemoText from '~/components/TheDemo/TheDemoText.vue';
import TheDemoButtons from '~/components/TheDemo/TheDemoButtons.vue';
import TheDemoCards from '~/components/TheDemo/TheDemoCards.vue';

defineProps({
  height: {
    type: [Number, String],
    default: 500,
  },
});

const navigationDrawerColors = ['primary', 'secondary', 'tertiary', ''];
</script>

<style lang="scss">
.the-demo {
  border: 2px solid rgba(var(--v-border-color), var(--v-border-opacity));
}
</style>
