<template>
  <div class="container">
    <div class="title">{{ title }}</div>
    <div class="input-container">
      <div class="buton-container">
        <button class="dummy-button">参照</button>
        <input class="file" type="file" name="upfile[]" webkitdirectory />
      </div>
      <input class="path" type="text" />
    </div>
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
  height: 64px;
  width: 100%;
}
.input-container {
  position: relative;
  display: flex;
  gap: calc(var(--padding) / 2);
}
.title {
  height: 24px;
}
.buton-container {
  position: relative;
  height: 100%;
  width: 32px;
}
.dummy-button {
  height: 32px;
  width: 32px;
}
.file {
  display: none;
  position: absolute;
  height: 100%;
  width: 32px;
}
.path {
  flex: 1;
  outline: none;
  border: none;
  border-bottom: 1px solid black;
  margin: 0;
  padding: 0;
}
</style>
