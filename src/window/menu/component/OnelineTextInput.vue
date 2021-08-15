<template>
  <div class="container">
    <div class="title">{{ title }}</div>
    <div class="input-container">
      <input class="input" type="text" v-model="value_" @input="(e) => $emit('update-value', this.value_)" />
      <input class="suffix" type="text" :size="suffix.length" :value="suffix" disabled />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    title: String,
    value: String,
    suffix: String,
  },
  data: function () {
    return {
      value_: this.value,
    };
  },
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
  display: flex;
  align-items: flex-end;
}
.input-container {
  flex: 1;
  display: flex;
  width: 100%;
}
.input-container > input {
  outline: none;
  border: none;
  border-bottom: 1px solid black;
}
.input {
  flex: 1;
}
.suffix {
  background: none;
  text-align: right;
}
</style>
