<template>
  <DemoSection>
    <template #title>手动更新和移除</template>
    <template #description>手动更新和关闭 Modal.method 方式创建的对话框。</template>
    <template #buttons>
      <button class="btn btn-primary" @click="countDown">Open modal to close in 5s</button>
    </template>
  </DemoSection>
</template>

<script lang="ts" setup>
import { Modal } from 'simple-modal';
import DemoSection from '@/components/DemoSection.vue';

const countDown = () => {
  let secondsToGo = 5;
  const modal = Modal.success({
    title: 'This is a notification message',
    content: `This modal will be destroyed after ${secondsToGo} second.`,
  });
  const interval = setInterval(() => {
    secondsToGo -= 1;
    modal.update({
      content: `This modal will be destroyed after ${secondsToGo} second.`,
    });
  }, 1000);
  setTimeout(() => {
    clearInterval(interval);
    modal.destroy();
  }, secondsToGo * 1000);
};
</script>
