<template>
  <div class="wrapper">
    <div class="dots">
      <div v-for="n in 3" :key="n" :class="'d' + n"></div>
    </div>
    <div>Typing</div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.dots {
  display: flex;
  gap: 3px;
  align-items: center;
  transform: translateY(3px);
}

.dots > * {
  animation: slide 0.8s ease-in-out infinite alternate;
  background: var(--color-text-secondary);
  width: 4px;
  height: 4px;
  border-radius: 50%;
}

.d1 {
  animation-delay: 0;
}

.d2 {
  animation-delay: 0.4s;
}

.d3 {
  animation-delay: 0.8s;
}

@keyframes slide {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-3px);
  }
}
</style>
