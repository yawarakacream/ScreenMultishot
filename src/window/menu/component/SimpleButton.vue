<template>
  <div class="container" :data-disabled="disabled" @click.prevent="onClick">
    <i :class="`button fas fa-${icon}`" />
    <span class="title">{{ title }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: String,
    icon: String,
    disabled: Boolean,
  },
  emits: ["click"],
  methods: {
    onClick: function () {
      if (!this.disabled) {
        this.$emit("click");
      }
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
.container[data-disabled="true"] {
  cursor: auto;
  opacity: 0.2;
}
.container[data-disabled="false"]:hover {
  opacity: 0.5;
}
.button {
  display: flex;
  align-items: center;
  width: 32px;
  font-size: 32px;
}
.title {
  display: flex;
  align-items: center;
}
</style>
