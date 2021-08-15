<template>
  <div class="container">
    <div class="title">{{ title }}</div>
    <input class="input" type="text" />
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
  height: 56px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.title {
  height: 24px;
}
.input {
  flex: 1;
  width: 100%;
  outline: none;
  border: none;
  border-bottom: 1px solid black;
}
</style>
