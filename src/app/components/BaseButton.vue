<template>
  <button class="button" :class="[background, { disabled }]">
    <template v-if="!isLoading">
      <div class="icon" v-if="slots.icon">
        <slot name="icon"></slot>
      </div>

      <div class="label" v-if="slots.default">
        <slot></slot>
      </div>

      <div class="icon" v-if="slots.postfixIcon">
        <slot name="postfixIcon"></slot>
      </div>
    </template>

    <CircularLoader v-if="isLoading" />
  </button>
</template>

<script setup lang="ts">
import CircularLoader from './CircularLoader.vue'

import { useSlots } from 'vue'
import type { PropType } from 'vue'

const slots = useSlots()

defineProps({
  background: {
    type: String as PropType<'transparent' | 'primary'>,
    default: 'transparent',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped lang="scss">
.button {
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 100px;
  padding: 7px;
  min-height: 32px;
  cursor: pointer;

  &.transparent {
    background-color: transparent;
  }

  &.primary {
    background-color: var(--color-background-button-primary);
  }

  &:not(.disabled):hover {
    background-color: var(--color-background-hover);
  }

  &:not(.disabled):active {
    background: var(--color-background-active);
  }

  &.disabled {
    filter: brightness(0.5);
    cursor: default;
  }
}

.label {
  color: var(--color-text-primary);
  font-size: var(--font-size-s);
}

.icon {
  width: 24px;
  height: 24px;
  pointer-events: none;
  user-select: none;
}
</style>
