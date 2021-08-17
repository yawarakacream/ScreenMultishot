<template>
  <span class="main">{{ value }}</span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["value"],
});
</script>

<style scoped>
.main {
  height: 24px;
  display: flex;
  align-items: center;
}
</style>
