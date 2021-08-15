<template>
  <button class="main">
    {{ title }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["title"],
});
</script>

<style scoped>
.main {
  height: 64px;
  width: 64px;
}
</style>
