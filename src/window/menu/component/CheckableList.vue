<template>
  <div class="container">
    <div class="title">{{ title }}</div>
    <div class="list">
      <div class="item-container" v-for="item in list" :key="item.name">
        <input class="item-checkbox" type="checkbox" />
        <span class="item-name">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["title", "list"],
});
</script>

<style scoped>
.container {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.title {
  height: 24px;
}
.list {
  flex: 1;
  padding: calc(var(--padding) / 2);
  display: flex;
  flex-direction: column;
  gap: calc(var(--padding) / 2);
  border: 1px solid black;
}
.item-container {
  height: 32px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: calc(var(--padding) / 2);
}
.item-checkbox {
  height: 100%;
  width: 24px;
}
.item-name {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
