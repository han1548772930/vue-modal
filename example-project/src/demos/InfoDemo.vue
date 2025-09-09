<template>
  <DemoSection>
    <template #title>信息提示</template>
    <template #description>各种类型的信息提示，只提供一个按钮用于关闭。</template>
    <template #buttons>
      <button class="btn btn-info" @click="info">Info</button>
      <button class="btn btn-success" @click="success">Success</button>
      <button class="btn btn-error" @click="error">Error</button>
      <button class="btn btn-warning" @click="warning">Warning</button>
    </template>
  </DemoSection>
</template>

<script lang="ts" setup>
import { Modal } from 'simple-modal';
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
