<template>
  <div id="menu-main">
    <div id="left">
      <button-container>
        <simple-button :title="'撮影'" />
        <simple-button :title="'ヘルプ'" />
      </button-container>
      <directory-path-input :title="'保存先ディレクトリ'" />
      <oneline-text-input :title="'画像の名前'" />
      <photo-preview />
    </div>
    <div id="middle"></div>
    <div id="right">
      <button-container>
        <simple-button :title="'pdf 作成'" />
      </button-container>
      <oneline-text-input :title="'pdf の名前'" />
      <checkable-list :title="'画像一覧'" :list="[{ name: 'aaaaaaa.png?' }]" />
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
  components: {
    ButtonContainer,
    SimpleButton,
    DirectoryPathInput,
    OnelineTextInput,
    PhotoPreview,
    CheckableList,
  },
});
</script>

<style scoped>
#menu-main {
  --padding: 16px;

  position: absolute;
  height: calc(100% - var(--padding) * 2);
  width: calc(100% - var(--padding) * 2);
  margin: 0;
  padding: var(--padding);

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
