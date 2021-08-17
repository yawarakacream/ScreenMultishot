<template>
  <div class="freeze" v-if="mode === 'freeze'" :style="style" />
  <div class="movable" v-if="mode === 'movable'">
    <span>ScreenMultishot</span>
  </div>
</template>

<script lang="ts">
import RendererCommunicator from "@/communicator/renderer-communicator";
import { FrameMode, M2RFrameParameter, R2MFrameParameter } from "./frame-common";
import { defineComponent } from "vue";

const vm = defineComponent({
  name: "Frame",
  data: function () {
    const communicator = new RendererCommunicator<R2MFrameParameter, M2RFrameParameter>("frame", {
      setStyle: ({ rgb, alpha, size }) => this.setStyle(rgb, alpha, size),
      setMode: (value) => this.setMode(value),
    });
    const frameStyle = communicator.send("getConfig", "frameStyle");
    const frameMode = communicator.send("getConfig", "frameMode");
    return {
      communicator,
      style: this.createStyle(frameStyle.rgb, frameStyle.alpha, frameStyle.size),
      mode: frameMode,
    };
  },
  methods: {
    createStyle: function (rgb: string, alpha: number, size: number) {
      return {
        "--background-color": rgb,
        "--background-alpha": alpha * 0.01,
        "--size": `calc(min(${size}px, min(50vh, 50vw)))`,
      };
    },
    setStyle: function (rgb: string, alpha: number, size: number) {
      this.style = this.createStyle(rgb, alpha, size);
    },
    setMode: function (value: FrameMode) {
      this.mode = value;
    },
  },
});

export default vm;
</script>

<style scoped>
.freeze {
  position: absolute;
  height: calc(100% - var(--size) * 2);
  width: calc(100% - var(--size) * 2);
  border: var(--size) solid var(--background-color);
  opacity: var(--background-alpha);
  background: none;
  user-select: none;
  box-shadow: none;
}
.movable {
  --size: 8px;
  position: absolute;
  height: calc(100% - var(--size) * 2);
  width: calc(100% - var(--size) * 2);
  border: var(--size) solid black;
  background: rgba(0, 0, 0, 50%);
  user-select: none;
  cursor: move;
  overflow: hidden;
  -webkit-app-region: drag;
}
.movable > span {
  margin: 4px;
  color: lightgray;
}
</style>
