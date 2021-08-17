<template>
  <div class="container">
    <display-title :value="title" />
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
import DisplayTitle from "./DisplayTitle.vue";

export default defineComponent({
  props: ["title", "list"],
  components: { DisplayTitle },
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
  margin: 0;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
}
.item-container {
  height: 24px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.item-checkbox {
  height: var(--font-size);
  width: var(--font-size);
}
.item-name {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
