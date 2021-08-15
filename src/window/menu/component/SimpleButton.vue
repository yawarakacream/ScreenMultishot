<template>
  <div class="container">
    <i :class="`button fas fa-${icon}`" />
    <span class="title">{{ title }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["title", "icon"],
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  gap: 0;
  height: 48px;
  font-size: var(--font-size);
  cursor: pointer;
  transition: opacity 0.1s ease;
}
.container:hover {
  opacity: 0.5;
}
.button {
  display: flex;
  align-items: center;
  height: 48px;
  width: 36px;
  font-size: 32px;
}
.title {
  display: flex;
  align-items: center;
}
</style>
