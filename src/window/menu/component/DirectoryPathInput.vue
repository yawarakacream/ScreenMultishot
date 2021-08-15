<template>
  <div class="container">
    <div class="title">{{ title }}</div>
    <div class="input-container">
      <div class="button-container">
        <input class="file" type="file" name="upfile[]" webkitdirectory @change="onFileChange" />
        <i class="dummy-button fas fa-folder-open" />
      </div>
      <input class="path" type="text" :value="directory_" @input="updateDirectory" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["title", "directory"],
  data: function () {
    return {
      directory_: this.directory,
    };
  },
  methods: {
    onFileChange(ev: any) {
      console.log("a", ev);
    },
    updateDirectory() {
      this.$emit("update-directory", this.directory_);
    },
  },
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
  gap: 4px;
}
.title {
  height: 24px;
  display: flex;
  align-items: flex-end;
}
.button-container {
  position: relative;
  height: 32px;
  width: 32px;
  cursor: pointer !important;
  transition: opacity 0.1s ease;
}
.button-container:hover {
  opacity: 0.5;
}
.file {
  position: absolute;
  height: 32px;
  width: 32px;
  margin: 0;
  padding: 0;
  opacity: 0;
}
.dummy-button {
  position: absolute;
  height: 32px;
  width: 32px;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}
input[type="file"]::-webkit-file-upload-button {
  position: absolute;
  height: 32px;
  width: 32px;
  margin: 0;
  padding: 0;
  cursor: pointer;
}
.path {
  height: 32px;
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
</style>
