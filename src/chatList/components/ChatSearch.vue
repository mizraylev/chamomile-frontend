<template>
  <BaseInput hasBorder placeholder="Search" :value="value" @change="onChange">
    <img src="../assets/images/icons/search.svg" alt="Search" width="18" height="18" />
  </BaseInput>
</template>

<script setup lang="ts">
import BaseInput from '@/app/components/BaseInput.vue'

defineProps({
  value: {
    type: String,
    default: '',
  },
})

const emit = defineEmits<{
  change: [value: string]
}>()

const onChange = (value: string) => {
  emit('change', value)
}
</script>
