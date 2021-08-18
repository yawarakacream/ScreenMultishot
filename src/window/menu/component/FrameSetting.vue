<template>
  <div class="wrapper">
    <simple-button :title="title" :icon="'palette'" @click="onClick" />
    <div class="container" v-if="visible">
      <div class="field">
        <div class="field-item">
          色
          <input class="input" type="color" v-model="computedRgb" />
        </div>
        <div class="field-item">
          透明度 {{ computedAlpha }} [%]
          <input class="input" type="range" min="0" max="100" v-model="computedAlpha" />
        </div>
        <div class="field-item">
          太さ {{ computedSize }} [px]
          <input class="input" type="range" min="0" max="100" v-model="computedSize" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SimpleButton from "./SimpleButton.vue";

export default defineComponent({
  props: {
    title: String,
    modelRgb: String,
    modelAlpha: Number,
    modelSize: Number,
  },
  data: function () {
    return {
      visible: false,
    };
  },
  components: {
    SimpleButton,
  },
  computed: {
    computedRgb: {
      get: function () {
        return this.modelRgb;
      },
      set: function (value: string) {
        this.$emit("update:modelRgb", value);
      },
    },
    computedAlpha: {
      get: function () {
        return this.modelAlpha;
      },
      set: function (value: string) {
        this.$emit("update:modelAlpha", Number.parseInt(value));
      },
    },
    computedSize: {
      get: function () {
        return this.modelSize;
      },
      set: function (value: string) {
        this.$emit("update:modelSize", Number.parseInt(value));
      },
    },
  },
  methods: {
    onClick: function () {
      this.visible = !this.visible;
    },
  },
});
</script>

<style scoped>
.wrapper {
  position: relative;
  height: 32px;
  padding: 8px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.container {
  position: relative;
  margin: 0;
  padding: 0;
}
.field {
  position: absolute;
  margin: 4px 0 0 0;
  padding: var(--padding);
  width: calc(256px - var(--padding) * 4 - 2px);
  display: flex;
  flex-direction: column;
  gap: var(--padding);
  border: 1px solid black;
  border-radius: 16px;
  background-color: white;
  transform: translateX(calc(-1 * var(--padding) / 2));
  z-index: 1;
}
.field-item {
  display: flex;
  flex-direction: column;
  gap: calc(var(--padding) / 2);
}
.field-item > input {
  margin: 0;
  padding: 0;
  outline: none;
  box-shadow: none;
}
</style>
