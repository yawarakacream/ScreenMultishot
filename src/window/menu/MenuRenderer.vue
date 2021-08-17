<template>
  <div id="menu-main">
    <div id="left">
      <div class="button-container">
        <simple-button
          :title="'撮影'"
          :icon="'camera'"
          :disabled="!isValidStorageDirectory || !isValidPhotoName || !isValidPdfName"
          @click="onCameraClicked"
        />
        <simple-button :title="'ヘルプ'" :icon="'question-circle'" />
        <check-button :title="'移動'" v-model="frameMovable" />
        <color-picker :title="'枠色'" v-model:modelRgb="frameRgb" v-model:modelAlpha="frameAlpha" />
      </div>

      <oneline-text-input-with-button
        :title="'保存先ディレクトリ'"
        v-model="storageDirectory"
        @click="openStorageDirectoryDialog"
        :valid="isValidStorageDirectory"
      />
      <oneline-text-input :title="'画像の名前'" :suffix="'.png'" v-model="photoName" :valid="isValidPhotoName" />
      <photo-preview />
    </div>

    <div id="middle"></div>

    <div id="right">
      <div class="button-container">
        <simple-button :title="'pdf 作成'" :icon="'file-pdf'" />
      </div>
      <oneline-text-input :title="'pdf の名前'" :suffix="'.pdf'" v-model="pdfName" :valid="isValidPdfName" />
      <checkable-list :title="'画像一覧'" :list="photoList" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RendererCommunicator from "@/communicator/renderer-communicator";
import { Config } from "@/config/config";
import { isValidFileName } from "@/utility";
import { MenuParameter } from "./menu-common";
import SimpleButton from "./component/SimpleButton.vue";
import OnelineTextInputWithButton from "./component/OnelineTextInputWithButton.vue";
import OnelineTextInput from "./component/OnelineTextInput.vue";
import PhotoPreview from "./component/PhotoPreview.vue";
import CheckableList from "./component/CheckableList.vue";
import ColorPicker from "./component/ColorPicker.vue";
import CheckButton from "./component/CheckButton.vue";

const communicator = new RendererCommunicator<MenuParameter>("menu");

const getConfig = <K extends keyof Config>(key: K): Config[K] => {
  return communicator.send("getConfig", key);
};

const setConfig = <K extends keyof Config>(key: K, value: Config[K]) => {
  communicator.send("setConfig", { key, value });
};

export default defineComponent({
  data: function () {
    const storageDirectory = getConfig("storageDirectory");
    const isValidStorageDirectory =
      !!storageDirectory && communicator.send("isValidStorageDirectory", storageDirectory);

    const photoName = getConfig("photoName");
    const isValidPhotoName = !!photoName && isValidFileName(photoName);

    const pdfName = getConfig("pdfName");
    const isValidPdfName = !!pdfName && isValidFileName(pdfName);

    const { rgb: frameRgb, alpha: frameAlpha } = getConfig("frameColor");

    return {
      storageDirectory,
      isValidStorageDirectory,

      photoName,
      isValidPhotoName,

      pdfName,
      isValidPdfName,

      frameRgb,
      frameAlpha,
      frameMovable: false,

      photoList: [{ name: "aaaaaaa.png?" }, { name: "aaaaaaa.png?" }],
    };
  },
  components: {
    SimpleButton,
    OnelineTextInputWithButton,
    OnelineTextInput,
    PhotoPreview,
    CheckableList,
    ColorPicker,
    CheckButton,
  },
  methods: {
    getConfig,
    openStorageDirectoryDialog: function () {
      this.storageDirectory = communicator.send("openStorageDirectoryDialog", undefined);
    },
    onCameraClicked: function () {
      console.log("camera");
    },
  },
  watch: {
    storageDirectory: function (value) {
      this.isValidStorageDirectory = communicator.send("isValidStorageDirectory", value);
      setConfig("storageDirectory", value);
    },
    photoName: function (value) {
      this.isValidPhotoName = !!value && isValidFileName(value);
      setConfig("photoName", value);
    },
    pdfName: function (value) {
      this.isValidPdfName = !!value && isValidFileName(value);
      setConfig("pdfName", value);
    },
    frameRgb: function (value) {
      setConfig("frameColor", { rgb: value, alpha: this.frameAlpha });
    },
    frameAlpha: function (value) {
      setConfig("frameColor", { rgb: this.frameRgb, alpha: value });
    },
  },
});
</script>

<style scoped>
#menu-main {
  --padding: 16px;
  --font-size: 0.8rem;

  position: absolute;
  height: calc(100% - var(--padding) * 2);
  width: calc(100% - var(--padding) * 2);
  margin: 0;
  padding: var(--padding);
  font-size: var(--font-size);

  display: grid;
  gap: var(--padding);
  grid-template-columns: 1fr 1px 1fr;
  grid-template-areas: "left middle right";
}

#middle {
  background-color: lightgray;
}

#left {
  grid-area: left;
  display: flex;
  flex-direction: column;
  gap: var(--padding);
}

.button-container {
  width: 100%;
  display: flex;
  gap: var(--padding);
  flex-direction: row;
  align-items: space-around;
  justify-content: space-between;
  flex-wrap: wrap;
}
.button-container > * {
  flex: 1 1 0;
  min-width: 64px;
}

#right {
  grid-area: right;
  display: flex;
  flex-direction: column;
  gap: var(--padding);
}
</style>
