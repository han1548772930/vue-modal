<template>
  <DemoSection>
    <template #title>使用 useModal 获取上下文</template>
    <template #description>通过 Modal.useModal 创建支持读取 context 的 contextHolder。</template>
    <template #buttons>
      <Button @click="showConfirm">Confirm</Button>
      <Button @click="showPromiseConfirm">With promise</Button>
      <Button variant="outline" @click="showDeleteConfirm">Delete</Button>
      <Button variant="outline" @click="showPropsConfirm">With extra props</Button>
    </template>
    <contextHolder />
  </DemoSection>
</template>

<script lang="ts" setup>
import { Modal } from 'simple-modal';
import { Button } from '@/components/ui/button';
import DemoSection from '@/components/DemoSection.vue';

const [modal, contextHolder] = Modal.useModal();

const showConfirm = () => {
  modal.confirm({
    title: 'Do you Want to delete these items?',
    content: 'Some descriptions',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

const showDeleteConfirm = () => {
  modal.confirm({
    title: 'Are you sure delete this task?',
    content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

const showPropsConfirm = () => {
  modal.confirm({
    title: 'Are you sure delete this task?',
    content: 'Some descriptions',
    okText: 'Yes',
    okType: 'danger',
    okButtonProps: {
      disabled: true,
    },
    cancelText: 'No',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

function showPromiseConfirm() {
  modal.confirm({
    title: 'Do you want to delete these items?',
    content: 'When clicked the OK button, this dialog will be closed after 1 second',
    async onOk() {
      console.log('onOk started');
      try {
        const result = await new Promise((resolve, reject) => {
          setTimeout(() => {
            const success = Math.random() > 0.5;
            console.log('Promise result:', success ? 'resolve' : 'reject');
            success ? resolve('success') : reject(new Error('Random failure'));
          }, 1000);
        });
        console.log('onOk completed successfully:', result);
        return result;
      } catch (error) {
        console.log('onOk caught error:', error);
        // 返回 false 表示不关闭 Modal
        return false;
      }
    },
    onCancel() { },
  });
}
</script>
