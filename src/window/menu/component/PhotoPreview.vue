<template>
  <div class="container">
    <div class="title">プレビュー</div>
    <img class="image" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["title"],
});
</script>

<style scoped>
.container {
  flex: 1;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.title {
  height: 24px;
}
.image {
  flex: 1;
  outline: none;
  border: 1px solid black;
}
</style>
