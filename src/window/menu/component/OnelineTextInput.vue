<template>
  <div class="container">
    <display-title :value="title" />
    <div class="input-container" :data-valid="valid">
      <input class="input" type="text" spellcheck="false" v-model="computedValue" />
      <input class="suffix" type="text" :size="suffix.length" :value="suffix" disabled />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DisplayTitle from "./DisplayTitle.vue";

export default defineComponent({
  components: { DisplayTitle },
  props: {
    title: String,
    modelValue: String,
    suffix: String,
    valid: Boolean,
  },
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
  display: flex;
  width: 100%;
}
.input-container > input {
  outline: none;
  border: none;
  border-bottom: 1px solid black;
}
.input-container[data-valid="false"] > input {
  border-bottom-color: red;
}
.input {
  flex: 1;
}
.suffix {
  background: none;
  text-align: right;
}
</style>
