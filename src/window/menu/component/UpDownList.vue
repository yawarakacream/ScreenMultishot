<template>
  <div class="container">
    <display-title :value="title" />
    <div class="menu">
      <button class="menu-button" @click="setAll(true)">
        <i class="far fa-circle" />
        すべて選択
      </button>
      <button class="menu-button" @click="setAll(false)">
        <i class="far fa-circle" />
        すべて解除
      </button>
    </div>
    <div class="list">
      <div
        class="drag-line"
        :data-visible="drag !== null"
        :style="!!drag && `transform: translateY(${24 * drag.target}px)`"
      />
      <div
        class="item-container"
        draggable="true"
        v-for="(item, i) in computedList"
        :key="item.name"
        :data-selected="computedSelectedIndex === i"
        @dragstart="() => onDragStart(i)"
        @dragover="(e) => onDragOver(e, i)"
        @drop="() => onDrop()"
        @click="computedSelectedIndex = i"
      >
        <!-- <i class="fas fa-arrow-up" />
        <i class="fas fa-arrow-down" /> -->
        <i
          :class="`item-checkbox far fa-${item.value ? 'check-square' : 'square'}`"
          @click="() => setOne(i, !item.value)"
        />
        <span class="item-name" :data-check="item.value">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DisplayTitle from "./DisplayTitle.vue";

export default defineComponent({
  props: {
    title: String,
    modelList: Array,
    modelSelectedIndex: Number,
  },
  components: { DisplayTitle },
  data: function () {
    return {
      drag: null as null | {
        index: number;
        target: number;
      },
    };
  },
  computed: {
    computedList: {
      get: function () {
        return this.modelList;
      },
      set: function (value: string) {
        this.$emit("update:modelList", value);
      },
    },
    computedSelectedIndex: {
      get: function () {
        return this.modelSelectedIndex;
      },
      set: function (value: number) {
        this.$emit("update:modelSelectedIndex", value);
      },
    },
  },
  methods: {
    onDragStart: function (index: number) {
      this.drag = { index, target: index };
    },
    onDragOver: function (event: DragEvent, index: number) {
      let target = index;
      if ((event.target as any).clientHeight < event.offsetY * 2) {
        target++;
      }
      this.drag!.target = target;
      event.preventDefault();
    },
    onDrop: function () {
      const { index, target } = this.drag!;
      const element = this.computedList![index];
      const ret = (this.computedList as []).reduce((acc, curr, i) => {
        if (i === target) {
          acc.push(element);
        }
        if (curr !== element) {
          acc.push(curr);
        }
        return acc;
      }, [] as any);

      if (target === this.modelList!.length) {
        ret.push(element);
      }

      this.computedList = ret;
      this.drag = null;
    },
    setOne: function (index: number, value: boolean) {
      const ret = this.computedList?.map((e: any, i) => {
        if (i === index) {
          e.value = value;
        }
        return e;
      });
      this.computedList = ret;
    },
    setAll: function (value: boolean) {
      this.computedList = this.computedList?.map((e: any) => ({ name: e.name, value }));
    },
  },
});
</script>

<style scoped>
.container {
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.title {
  height: 24px;
}

.menu {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.menu-button {
  margin: 2px 0;
  padding: 0;
  font-size: var(--font-size);
  background: none;
  border: none;
  transition: opacity 0.1s ease;
}
.menu-button:hover {
  opacity: 0.5;
}

.list {
  flex: 1 1 0;
  padding: 1px 0;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  overflow-y: scroll;
}

.drag-line {
  margin: 0 calc(var(--padding) / 4);
  height: 1px;
  background-color: paleturquoise;
  pointer-events: none;
}
.drag-line[data-visible="false"] {
  background-color: rgba(0, 0, 0, 0);
}

.item-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.item-container[data-selected="true"] {
  background-color: lavender;
}
.item-checkbox {
  display: flex;
  align-items: center;
  font-size: 12px;
  margin: calc(var(--padding) / 4) calc(var(--padding) / 2);
}
.item-name {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
}
.item-name[data-check="false"] {
  color: lightgray;
}
</style>
