<template>
  <h2 class="text-h5 mb-2">
    Generated Vuetify Theme
    <v-btn
      class="ml-2"
      variant="outlined"
      density="comfortable"
      @click.stop="copy()"
    >
      <v-icon class="mr-2" :icon="mdiContentCopy" size="small"></v-icon>
      Copy
    </v-btn>
  </h2>
  <highlightjs
    :style="{ 'max-height': `${height}px`, overflow: 'auto' }"
    language="javascript"
    :code="json"
  />
</template>

<script setup>
import { useTheme } from 'vuetify';
import JSON5 from 'json5';
import { computed } from 'vue';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import hljsVuePlugin from '@highlightjs/vue-plugin';
import { mdiContentCopy } from '@mdi/js';
import { useClipboard } from '@vueuse/core';

defineProps({
  height: {
    type: [Number, String],
    default: 500,
  },
});

hljs.registerLanguage('javascript', javascript);

const highlightjs = hljsVuePlugin.component;
const theme = useTheme();

const json = computed(() => {
  return JSON5.stringify(theme.themes.value, null, 2);
});
const { copy } = useClipboard({ source: json.value });
</script>

<style>
code.hljs {
  display: block;
  padding: 8px;
}

.hljs {
  color: #abb2bf;
  background: #282c34;
}

.hljs-comment,
.hljs-quote {
  color: #5c6370;
  font-style: italic;
}

.hljs-doctag,
.hljs-keyword,
.hljs-formula {
  color: #c678dd;
}

.hljs-section,
.hljs-name,
.hljs-selector-tag,
.hljs-deletion,
.hljs-subst {
  color: #e06c75;
}

.hljs-literal {
  color: #56b6c2;
}

.hljs-string,
.hljs-regexp,
.hljs-addition,
.hljs-attribute,
.hljs-meta .hljs-string {
  color: #98c379;
}

.hljs-attr,
.hljs-variable,
.hljs-template-variable,
.hljs-type,
.hljs-selector-class,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-number {
  color: #d19a66;
}

.hljs-symbol,
.hljs-bullet,
.hljs-link,
.hljs-meta,
.hljs-selector-id,
.hljs-title {
  color: #61aeee;
}

.hljs-built_in,
.hljs-title.class_,
.hljs-class .hljs-title {
  color: #e6c07b;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}

.hljs-link {
  text-decoration: underline;
}
</style>
