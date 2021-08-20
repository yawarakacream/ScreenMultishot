<template>
  <div id="menu-main">
    <div id="left">
      <div class="button-container">
        <simple-button
          :title="'撮影'"
          :icon="'camera'"
          :disabled="!isValidStorageDirectory || !isValidPhotoName || !isValidPdfName || !frameFreeze"
          @click="onCameraButtonClicked"
        />
        <simple-button :title="'ヘルプ'" :icon="'question-circle'" />
        <check-button :title="'枠を固定'" v-model="frameFreeze" />
        <frame-setting
          :title="'固定枠'"
          v-model:modelRgb="frameRgb"
          v-model:modelAlpha="frameAlpha"
          v-model:modelSize="frameSize"
        />
      </div>

      <oneline-text-input-with-button
        :title="'保存先フォルダ'"
        v-model="storageDirectory"
        @click="openStorageDirectoryDialog"
        :valid="isValidStorageDirectory"
        :editable="false"
      />
      <oneline-text-input :title="'画像の名前'" :suffix="'.png'" v-model="photoName" :valid="isValidPhotoName" />
      <photo-preview style="flex: 1 1 0" :title="'プレビュー'" :src="previewPhotoSrc" />
    </div>

    <div id="middle"></div>

    <div id="right">
      <div class="button-container">
        <simple-button
          :title="'pdf 作成'"
          :icon="'file-pdf'"
          :disabled="!isPdfAvailable.main || !isPdfAvailable.renderer"
          @click="onPdfButtonClicked"
        />
      </div>
      <oneline-text-input :title="'pdf の名前'" :suffix="'.pdf'" v-model="pdfName" :valid="isValidPdfName" />
      <up-down-list :title="'画像一覧'" v-model:modelList="photoList" v-model:modelSelectedIndex="selectedPhotoIndex" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RendererCommunicator from "@/communicator/renderer-communicator";
import { Config } from "@/config/config";
import { isValidFileName } from "@/utility";
import { M2RMenuParameter, R2MMenuParameter } from "./menu-common";
import SimpleButton from "./component/SimpleButton.vue";
import OnelineTextInputWithButton from "./component/OnelineTextInputWithButton.vue";
import OnelineTextInput from "./component/OnelineTextInput.vue";
import PhotoPreview from "./component/PhotoPreview.vue";
import UpDownList from "./component/UpDownList.vue";
import FrameSetting from "./component/FrameSetting.vue";
import CheckButton from "./component/CheckButton.vue";

export default defineComponent({
  data: function () {
    const communicator = new RendererCommunicator<R2MMenuParameter, M2RMenuParameter>("menu", {
      onStorageUpdate: (value) => this.onStorageUpdate(value),
      onStorageFileUpdate: (value) => this.onStorageFileUpdate(value),
      setPdfAvailableOnMain: () => this.setPdfAvailableOnMain(),
    });
    const getConfig = <K extends keyof Config>(key: K): Config[K] => {
      return communicator.send("getConfig", key);
    };
    const setConfig = <K extends keyof Config>(key: K, value: Config[K]) => {
      communicator.send("setConfig", { key, value });
    };

    const storageDirectory = getConfig("storageDirectory");
    const isValidStorageDirectory = storageDirectory !== null;

    const photoName = getConfig("photoName");
    const isValidPhotoName = !!photoName && isValidFileName(photoName);

    const { rgb: frameRgb, alpha: frameAlpha, size: frameSize } = getConfig("frameStyle");
    const frameFreeze = getConfig("frameMode") === "freeze";

    const pdfName = getConfig("pdfName");
    const isValidPdfName = !!pdfName && isValidFileName(pdfName);
    const isPdfAvailable = {
      main: true,
      renderer: false,
    };

    const selectedPhotoIndex = -1;
    const previewPhotoSrc = null as string | null;

    let photoList: { name: string; value: boolean }[] | null = null;
    const files = communicator.send("getStorageFiles", undefined);
    if (files !== null) {
      photoList = files.filter((f) => f && f.endsWith(".png")).map((f) => ({ name: f, value: false }));
    }

    return {
      communicator,
      getConfig,
      setConfig,

      storageDirectory,
      isValidStorageDirectory,

      photoName,
      isValidPhotoName,

      frameRgb,
      frameAlpha,
      frameSize,
      frameFreeze,

      pdfName,
      isValidPdfName,
      isPdfAvailable,

      selectedPhotoIndex,
      previewPhotoSrc,

      photoList,
    };
  },
  components: {
    SimpleButton,
    OnelineTextInputWithButton,
    OnelineTextInput,
    PhotoPreview,
    UpDownList,
    FrameSetting,
    CheckButton,
  },
  methods: {
    openStorageDirectoryDialog: function () {
      this.communicator.send("openStorageDirectoryDialog", undefined);
    },
    onCameraButtonClicked: function () {
      this.communicator.send("onCameraButtonClicked", undefined);
    },
    onPdfButtonClicked: function () {
      if (this.photoList === null) {
        return;
      }
      const photos = this.photoList.filter((p) => p.value).map((p) => p.name);
      if (photos.length === 0) {
        return;
      }
      this.isPdfAvailable.main = false;
      this.communicator.send("onPdfButtonClicked", { photos });
    },
    onStorageUpdate: function (value: string | null) {
      this.storageDirectory = value;
      this.isValidStorageDirectory = value !== null;
      this.onStorageFileUpdate(value === null ? null : this.communicator.send("getStorageFiles", undefined));
    },
    onStorageFileUpdate: function (files: string[] | null) {
      if (files === null) {
        this.photoList = [];
        return;
      }
      const photos = files
        .filter((f) => f.endsWith(".png"))
        .reduce((acc, curr) => ((acc[curr] = true), acc), {} as { [key: string]: boolean });
      const photoList =
        this.photoList === null
          ? []
          : this.photoList.reduce((acc, curr) => {
              if (photos[curr.name]) {
                acc.push(curr);
                photos[curr.name] = false;
              }
              return acc;
            }, [] as { name: string; value: boolean }[]);
      Object.entries(photos).forEach(([k, v]) => {
        if (v) {
          photoList.push({ name: k, value: false });
        }
      });
      this.photoList = photoList;
    },
    setPdfAvailableOnMain: function () {
      this.isPdfAvailable.main = true;
    },
  },
  watch: {
    photoName: function (value) {
      this.isValidPhotoName = !!value && isValidFileName(value);
      this.setConfig("photoName", value);
    },
    pdfName: function (value) {
      this.isValidPdfName = !!value && isValidFileName(value);
      this.setConfig("pdfName", value);
    },
    frameRgb: function (value) {
      this.setConfig("frameStyle", { rgb: value, alpha: this.frameAlpha, size: this.frameSize });
    },
    frameAlpha: function (value) {
      this.setConfig("frameStyle", { rgb: this.frameRgb, alpha: value, size: this.frameSize });
    },
    frameSize: function (value) {
      this.setConfig("frameStyle", { rgb: this.frameRgb, alpha: this.frameAlpha, size: value });
    },
    frameFreeze: function (value) {
      this.setConfig("frameMode", value ? "freeze" : "movable");
    },
    selectedPhotoIndex: function (value) {
      if (value === -1) {
        this.previewPhotoSrc = null;
      } else {
        this.previewPhotoSrc = `file://${this.storageDirectory}/${this.photoList![value].name}`;
      }
    },
    photoList: function (value: { name: string; value: boolean }[] | null) {
      this.selectedPhotoIndex = -1;
      this.isPdfAvailable.renderer = !!value && value.some((e) => e.value);
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
