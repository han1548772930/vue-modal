<template>
  <DemoSection>
    <template #title>信息提示</template>
    <template #description>各种类型的信息提示，只提供一个按钮用于关闭。</template>
    <template #buttons>
      <Button @click="info">Info</Button>
      <Button @click="success">Success</Button>
      <Button @click="error">Error</Button>
      <Button @click="warning">Warning</Button>
    </template>
  </DemoSection>
</template>

<script lang="ts" setup>
import { Modal } from 'simple-modal';
import { Button } from '@/components/ui/button';
import DemoSection from '@/components/DemoSection.vue';

const info = () => {
  Modal.info({
    title: 'This is a notification message',
    content: 'some messages...some messages...',
    onOk() {
      console.log('ok');
    },
  });
};

const success = () => {
  Modal.success({
    title: 'This is a success message',
    content: 'some messages...some messages...',
  });
};

const error = () => {
  Modal.error({
    title: 'This is an error message',
    content: 'some messages...some messages...',
  });
};

const warning = () => {
  Modal.warning({
    title: 'This is a warning message',
    content: 'some messages...some messages...',
  });
};
</script>
