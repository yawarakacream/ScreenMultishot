<template>
  <div id="frame" @mouseenter="frameenter"></div>
  <div id="transparent" @mouseenter="frameleave"></div>
</template>

<script lang="ts">
import RendererCommunicator from "@/communicator/renderer-communicator";
import { FrameParameter } from "./frame-common";
import { defineComponent } from "vue";

const communicator = new RendererCommunicator<FrameParameter>("frame");

export default defineComponent({
  name: "Frame",
  methods: {
    frameenter: function (event: MouseEvent) {
      communicator.send("onFrame", true);
    },
    frameleave: function (event: MouseEvent) {
      communicator.send("onFrame", false);
    },
  },
});
</script>

<style>
:root {
  --size: 8px;
}
#frame {
  position: absolute;
  height: calc(100% - var(--size) * 2);
  width: calc(100% - var(--size) * 2);
  border: var(--size) solid rgba(0, 0, 0, 20%);
  background: rgba(0, 0, 0, 0);
  box-shadow: none;
  pointer-events: all;
}
#transparent {
  position: absolute;
  top: var(--size);
  left: var(--size);
  height: calc(100% - var(--size) * 2);
  width: calc(100% - var(--size) * 2);
}
</style>
