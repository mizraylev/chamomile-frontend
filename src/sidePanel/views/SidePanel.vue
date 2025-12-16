<template>
  <div class="sidePanel">
    <BaseSettings />
  </div>
</template>

<script setup lang="ts">
import BaseSettings from '../components/BaseSettings.vue'
</script>

<style scoped>
.sidePanel {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m);
  padding: var(--spacing-l);
}
</style>
