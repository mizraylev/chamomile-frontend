<template>
  <button class="button">
    <div class="icon" v-if="slots.icon">
      <slot name="icon"></slot>
    </div>

    <div class="label" v-if="slots.default">
      <slot></slot>
    </div>

    <div class="icon" v-if="slots.postfixIcon">
      <slot name="postfixIcon"></slot>
    </div>
  </button>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'
import type { PropType } from 'vue'

const slots = useSlots()

defineProps({
  background: {
    type: String as PropType<'transparent'>,
    default: 'transparent',
  },
})
</script>

<style scoped>
.button {
  border: none;
  background-color: transparent;
  opacity: 60%;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 100px;
  padding: 7px;
  cursor: pointer;
}

.button:hover {
  opacity: 100%;
}

.button:active {
  background: var(--color-background-active);
}

.icon {
  width: 24px;
  height: 24px;
  pointer-events: none;
  user-select: none;
}
</style>
