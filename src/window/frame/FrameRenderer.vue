<template>
  <div class="freeze" v-if="mode === 'freeze'" :style="style" />
  <div class="movable" v-if="mode === 'movable'" />
</template>

<script lang="ts">
import RendererCommunicator from "@/communicator/renderer-communicator";
import { FrameMode, FrameParameter } from "./frame-common";
import { defineComponent } from "vue";
import { Config } from "@/config/config";

const communicator = new RendererCommunicator<FrameParameter>("frame");

const getConfig = <K extends keyof Config>(key: K): Config[K] => {
  return communicator.send("getConfig", key);
};

const setConfig = <K extends keyof Config>(key: K, value: Config[K]) => {
  communicator.send("setConfig", { key, value });
};

export default defineComponent({
  name: "Frame",
  data: function () {
    const frameColor = getConfig("frameColor");
    return {
      mode: "freeze" as FrameMode,
      style: {
        "--background-color": frameColor.rgb,
        "--background-alpha": frameColor.alpha * 0.01,
      },
    };
  },
});
</script>

<style scoped>
.container {
  position: absolute;
  height: 100%;
  width: 100%;
}
.freeze {
  --size: 8px;
  position: absolute;
  height: calc(100% - var(--size) * 2);
  width: calc(100% - var(--size) * 2);
  border: var(--size) solid var(--background-color);
  opacity: var(--background-alpha);
  background: none;
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
  -webkit-app-region: drag;
}
</style>
