<template>
  <div class="loader"></div>
</template>

<style scoped>
.loader {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid transparent;
  border-top: 1px solid var(--color-background-loader-primary);
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
