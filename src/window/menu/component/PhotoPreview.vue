<template>
  <div class="container">
    <div class="title">{{ title }}</div>
    <div class="image-container">
      <img class="image" :src="src" v-if="src !== null" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["title", "src"],
});
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.title {
  height: 24px;
}
.image-container {
  height: 100%;
  width: 100%;
  flex: 1 1 0;
  display: flex;
  border: 1px solid black;
}
.image {
  height: 100%;
  width: 100%;
  flex: 1 1 0;
  outline: none;
  border: none;
  object-fit: contain;
}
</style>
