<template>
  <div
    class="inputWrapper"
    :class="{ hasIcon: slots.default, filled: !!value.length, error: !!errorMessage }"
  >
    <div class="icon" v-if="slots.default">
      <slot />
    </div>

    <input
      class="input"
      :type="isPasswordShown ? 'text' : type"
      :autocomplete="autocomplete"
      :name="name"
      :value="value"
      :class="{ hasBorder, password: type === 'password' }"
      @change="onChange"
      @input="onInput"
    />

    <label class="label">{{ errorMessage || placeholder }}</label>

    <div class="eye" v-if="type === 'password'">
      <img
        v-if="!isPasswordShown"
        src="../../auth/assets/images/icons/eye.svg"
        alt="Show password"
        @click="isPasswordShown = true"
      />
      <img
        v-else
        src="../../auth/assets/images/icons/eye-off.svg"
        alt="Hide password"
        @click="isPasswordShown = false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, useSlots } from 'vue'

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
  errorMessage: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  autocomplete: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
})

const emit = defineEmits<{
  change: [value: string]
  input: [value: string]
}>()

const isPasswordShown = ref(false)

const slots = useSlots()

const onChange = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('change', value)
}

const onInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('input', value)
}
</script>

<style scoped lang="scss">
@mixin label-on-top {
  top: 0;
  left: calc(var(--spacing-m) + var(--border-width-m) - var(--spacing-xs));
  color: var(--color-text-primary);
  font-size: var(--font-size-xs);
}

.inputWrapper {
  position: relative;
  width: 100%;

  &.filled .label {
    @include label-on-top;
  }

  &.error {
    & .label {
      color: var(--color-outline-error) !important;
    }

    & .input {
      border-color: var(--color-outline-error);
    }
  }

  &:not(.hasIcon) .input {
    padding: var(--spacing-s) var(--spacing-m);
  }

  &.hasIcon .label {
    left: calc(var(--spacing-s) * 2 + var(--icon-size-s) - var(--spacing-xs));
  }
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

  &.password {
    padding-right: calc(var(--spacing-s) * 2 + var(--icon-size-s)) !important;
  }

  &.hasBorder {
    border: var(--border-width-m) solid var(--color-outline-primary);
  }

  &:active {
    background: var(--color-background-active);
  }

  &:focus {
    border-color: var(--color-outline-focused);

    & ~ .label {
      @include label-on-top;
    }
  }

  &:is(:-webkit-autofill, :autofill) {
    -webkit-background-clip: text;
    -webkit-text-fill-color: var(--color-text-primary);
    caret-color: var(--color-text-primary);
  }
}

.label {
  pointer-events: none;
  user-select: none;
  position: absolute;
  top: 50%;
  left: calc(var(--spacing-m) + var(--border-width-m) - var(--spacing-xs));
  transform: translateY(-50%);
  transition: all 0.2s ease;
  padding-inline: var(--spacing-xs);
  background-color: var(--color-background-secondary);
  color: var(--color-text-secondary);
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

.eye {
  width: var(--icon-size-s);
  height: var(--icon-size-s);
  cursor: pointer;
  user-select: none;
  position: absolute;
  top: 50%;
  right: calc(var(--border-width-m) + var(--spacing-s));
  transform: translateY(-50%);

  & img {
    width: 100%;
    height: 100%;
  }
}
</style>
