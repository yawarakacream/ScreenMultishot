<template>
  <div class="container">
    <display-title :value="title" />
    <div class="input-container">
      <i class="button fas fa-folder-open" @click="() => $emit('click')" />
      <input class="path" type="text" spellcheck="false" v-model="computedValue" :data-valid="valid" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DisplayTitle from "./DisplayTitle.vue";

export default defineComponent({
  props: {
    title: String,
    modelValue: String,
    valid: Boolean,
  },
  components: { DisplayTitle },
  emits: ["update:modelValue", "click"],
  computed: {
    computedValue: {
      get: function () {
        return this.modelValue;
      },
      set: function (value: string) {
        this.$emit("update:modelValue", value);
      },
    },
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
.input-container {
  flex: 1;
  position: relative;
  display: flex;
  gap: 4px;
}
.button {
  position: relative;
  height: 100%;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  transition: opacity 0.1s ease;
}
.button:hover {
  opacity: 0.5;
}
.path {
  width: 32px;
  margin: 0;
  padding: 0;
  flex: 1;
  outline: none;
  border: none;
  border-bottom: 1px solid black;
  margin: 0;
  padding: 0;
}
.path[data-valid="false"] {
  border-bottom-color: red;
}
</style>
