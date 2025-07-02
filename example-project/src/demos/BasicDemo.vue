<template>
  <DemoSection>
    <template #title>基本用法</template>
    <template #description>第一个对话框。</template>
    <template #buttons>
      <Button variant="default" @click="showModal">Open Modal</Button>
    </template>
    <Modal v-model:open="open" title="Basic Modal"   @ok="handleOk" >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  </DemoSection>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Modal } from 'simple-modal';
import { Button } from '@/components/ui/button';
import DemoSection from '@/components/DemoSection.vue';

const open = ref<boolean>(false);

const showModal = () => {
  open.value = true;
};

const handleOk = (e: MouseEvent) => {
  console.log(e);
  open.value = false;
};
</script>
