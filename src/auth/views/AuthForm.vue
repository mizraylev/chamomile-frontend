<template>
  <div class="wrapper">
    <div class="form">
      <div class="header">
        <img
          v-if="showLogo"
          class="logo"
          src="../../app/assets/images/logos/chamomile-logo.svg"
          alt="Logo"
        />
        <div class="heading">
          <slot name="heading"></slot>
        </div>
      </div>

      <slot class="fields" name="fields"></slot>
    </div>

    <div class="footer">
      <div class="text">
        <slot name="info"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  showLogo: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m);
  width: 314px;
}

.form {
  background-color: var(--color-background-secondary);
  border-radius: var(--border-radius-l);
  padding: var(--spacing-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-l);
}

.header {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-s);
  align-items: center;
}

.heading {
  padding-block: var(--spacing-m);
  color: var(--color-text-primary);
  font-size: var(--font-size-m);
  font-weight: bold;
}

.logo {
  padding-top: var(--spacing-m);
  width: 60px;
  height: 60px;
}

.fields {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m);
}

.footer {
  padding: var(--spacing-s) var(--spacing-xl);

  & .text {
    color: var(--color-text-secondary);
    font-size: var(--font-size-xs);
    line-height: var(--line-height-m);
    text-align: center;
  }
}
</style>
