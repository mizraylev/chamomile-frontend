<template>
  <div class="chip" :style="style">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  backgroundColor: {
    type: String,
    default: 'var(--color-background-tertiary)',
  },
})

const style = computed(() => ({
  backgroundColor: props.backgroundColor,
}))
</script>

<style scoped>
.chip {
  padding: var(--spacing-2xs) var(--spacing-xs);
  font-size: 12px;
  color: var(--color-text-primary);
  border-radius: 100px;
  min-width: 18px;
  text-align: center;
}
</style>
