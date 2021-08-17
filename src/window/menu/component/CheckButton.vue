<template>
  <div class="container">
    <i
      :class="`button far fa-${computedValue ? 'square' : 'check-square'}`"
      @click="() => (computedValue = !computedValue)"
    />
    <span class="title">{{ title }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: String,
    modelValue: Boolean,
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
  display: flex;
  flex-direction: row;
  gap: 4px;
  height: 32px;
  margin: 8px 0;
  font-size: var(--font-size);
  cursor: pointer;
  transition: opacity 0.1s ease;
}
.button {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  height: 32px;
  width: 32px;
  font-size: 32px;
}
.title {
  display: flex;
  align-items: center;
}
</style>
