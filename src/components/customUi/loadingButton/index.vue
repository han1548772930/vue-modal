<script setup lang="ts">
import { Button } from "@/components/ui/button";
import type { VueNode } from "@/hooks";
import { Loader2 } from "lucide-vue-next";
import { ref } from "vue";

defineOptions({
  name: 'LoadingButton',
})

const props = defineProps<{
  label: string | (() => VueNode) | VueNode
  click: () => Promise<void>
}>()
const loading = ref(false)
async function click() {
  loading.value = true
  await props.click()
  setTimeout(() => {
    loading.value = false
  }, 500)
}
</script>

<template>
  <Button class="mr-4  min-w-[60px]" size="sm" :disabled="loading" @click.stop.prevent="click">
    <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="loading" />
    {{ label }}
  </Button>
</template>

<style scoped></style>