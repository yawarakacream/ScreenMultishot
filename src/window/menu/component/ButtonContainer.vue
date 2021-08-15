<template>
  <div class="container">
    <slot />
  </div>
</template>

<style scoped>
.container {
  height: 48px;
  display: flex;
  gap: var(--padding);
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
}
</style>
