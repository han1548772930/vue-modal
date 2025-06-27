<template>
  <DemoSection>
    <template #title>销毁确认对话框</template>
    <template #description>
      使用 Modal.destroyAll() 可以销毁弹出的确认窗。通常用于路由监听当中，处理路由前进、后退不能销毁确认对话框的问题。
    </template>
    <template #buttons>
      <Button @click="showConfirm">Confirm</Button>
    </template>
  </DemoSection>
</template>

<script lang="ts" setup>
import { Modal } from 'simple-modal';
import { Button } from '@/components/ui/button';
import DemoSection from '@/components/DemoSection.vue';

const showConfirm = () => {
  for (let i = 0; i < 3; i += 1) {
    setTimeout(() => {
      Modal.confirm({
        content: 'destroy all',
        async onOk() {
          try {
            return await new Promise((resolve, reject) => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            });
          } catch {
            return console.log('Oops errors!');
          }
        },
        cancelText: 'Click to destroy all',
        onCancel() {
          Modal.destroyAll();
        },
      });
    }, i * 500);
  }
};
</script>
