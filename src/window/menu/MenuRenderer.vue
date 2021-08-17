<template>
  <div id="menu-main">
    <div id="left">
      <button-container>
        <simple-button
          :title="'撮影'"
          :icon="'camera'"
          :disabled="!isValidStorageDirectory || !isValidPhotoName || !isValidPdfName"
          @click="onCameraClicked"
        />
        <simple-button :title="'ヘルプ'" :icon="'question-circle'" />
      </button-container>
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
      <button-container>
        <simple-button :title="'pdf 作成'" :icon="'file-pdf'" />
      </button-container>
      <oneline-text-input :title="'pdf の名前'" :suffix="'.pdf'" v-model="pdfName" :valid="isValidPdfName" />
      <checkable-list :title="'画像一覧'" :list="photoList" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ButtonContainer from "./component/ButtonContainer.vue";
import SimpleButton from "./component/SimpleButton.vue";
import OnelineTextInputWithButton from "./component/OnelineTextInputWithButton.vue";
import OnelineTextInput from "./component/OnelineTextInput.vue";
import PhotoPreview from "./component/PhotoPreview.vue";
import CheckableList from "./component/CheckableList.vue";
import { MenuParameter } from "./menu-common";
import RendererCommunicator from "@/communicator/renderer-communicator";
import { Config } from "@/config/config";
import { isValidFileName } from "@/utility";

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
    return {
      storageDirectory,
      isValidStorageDirectory,
      photoName,
      isValidPhotoName,
      pdfName,
      isValidPdfName,
      photoList: [{ name: "aaaaaaa.png?" }, { name: "aaaaaaa.png?" }],
    };
  },
  components: {
    ButtonContainer,
    SimpleButton,
    OnelineTextInputWithButton,
    OnelineTextInput,
    PhotoPreview,
    CheckableList,
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

#right {
  grid-area: right;
  display: flex;
  flex-direction: column;
  gap: var(--padding);
}
</style>
