<script setup lang="ts">


import { useDraggable } from "@vueuse/core"
import Test from './components/test.vue';
import { useTemplateRef } from "vue";
import Button from "./components/ui/button/Button.vue";

const el = useTemplateRef('el')

const { style } = useDraggable(el, {
  initialValue: { x: 40, y: 40 },
})




</script>

<template>
  <div class="w-full h-full flex">
    <div ref="el" :style="style" class="fixed flex flex-col justify-center items-center space-y-2">
      <Button class="cursor-move">Drag</Button>
      <Test></Test>

    </div>
  </div>

</template>

<style scoped></style>
