<template>
  <div class="inputWrapper" :class="{ hasIcon: slots.default }">
    <div class="icon" v-if="slots.default">
      <slot />
    </div>
    <input
      class="input"
      type="text"
      :placeholder="placeholder"
      :value="value"
      :class="{ hasBorder }"
      @change="onChange"
    />
  </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue'

const slots = useSlots()

defineProps({
  value: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  hasBorder: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits<{
  change: [value: string]
}>()

const onChange = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('change', value)
}
</script>

<style scoped>
.inputWrapper {
  position: relative;
  width: 100%;
}

.input {
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  gap: var(--spacing-s);
  border-radius: var(--border-radius-m);
  padding-block: var(--spacing-s);
  padding-inline: calc(var(--spacing-s) * 2 + var(--icon-size-s)) var(--spacing-l);
  cursor: pointer;
  color: var(--color-text-primary);
  width: 100%;
  outline: none;
  font-size: var(--font-size-m);
  text-overflow: ellipsis;
}

.input.hasBorder {
  border: var(--border-width-m) solid var(--color-outline-primary);
}

.inputWrapper:not(.hasIcon) .input {
  padding: var(--spacing-s) var(--spacing-m);
}

.input::placeholder {
  color: var(--color-text-secondary);
}

.input:active {
  background: var(--color-background-active);
}

.input:focus {
  border-color: var(--color-outline-focused);
}

.icon {
  width: var(--icon-size-s);
  height: var(--icon-size-s);
  pointer-events: none;
  user-select: none;
  position: absolute;
  top: 50%;
  left: calc(var(--border-width-m) + var(--spacing-s));
  transform: translateY(-50%);
}
</style>
