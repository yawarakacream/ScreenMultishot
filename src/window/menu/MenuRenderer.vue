<template>
  <div id="menu-main">
    <div id="left">
      <button-container>
        <simple-button :title="'撮影'" :icon="'camera'" />
        <simple-button :title="'ヘルプ'" :icon="'question-circle'" />
      </button-container>
      <directory-path-input :title="'保存先ディレクトリ'" :directory="directory" @update-directory="setDirectory" />
      <oneline-text-input :title="'画像の名前'" :suffix="'.png'" :value="photoName" @update-value="setPhotoName" />
      <photo-preview />
    </div>
    <div id="middle"></div>
    <div id="right">
      <button-container>
        <simple-button :title="'pdf 作成'" :icon="'file-pdf'" />
      </button-container>
      <oneline-text-input :title="'pdf の名前'" :suffix="'.pdf'" :value="pdfName" @update-value="setPdfName" />
      <checkable-list :title="'画像一覧'" :list="photoList" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ButtonContainer from "./component/ButtonContainer.vue";
import SimpleButton from "./component/SimpleButton.vue";
import DirectoryPathInput from "./component/DirectoryPathInput.vue";
import OnelineTextInput from "./component/OnelineTextInput.vue";
import PhotoPreview from "./component/PhotoPreview.vue";
import CheckableList from "./component/CheckableList.vue";

export default defineComponent({
  data: function () {
    return {
      directory: "./stores",
      photoName: "aaa",
      pdfName: "aaa",
      photoList: [{ name: "aaaaaaa.png?" }, { name: "aaaaaaa.png?" }],
    };
  },
  components: {
    ButtonContainer,
    SimpleButton,
    DirectoryPathInput,
    OnelineTextInput,
    PhotoPreview,
    CheckableList,
  },
  methods: {
    setDirectory(value: string) {
      this.directory = value;
      console.log("set", value);
    },
    setPhotoName(value: string) {
      this.photoName = value;
      console.log("photo", this.photoName);
    },
    setPdfName(value: string) {
      this.pdfName = value;
      console.log("pdf", this.pdfName);
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
