<template>
  <DemoSection>
    <template #title>确认对话框</template>
    <template #description>使用 confirm() 可以快捷地弹出确认框。</template>
    <template #buttons>
      <button class="btn btn-primary" @click="showConfirm">Confirm</button>
      <button class="btn btn-primary" @click="showPromiseConfirm">With promise</button>
      <button class="btn btn-outline" @click="showDeleteConfirm">Delete</button>
      <button class="btn btn-outline" @click="showPropsConfirm">With extra props</button>
      <button class="btn btn-outline" @click="showNoIcon">No Icon</button>
      <button class="btn btn-outline" @click="showNoFooter">No Footer</button>
    </template>
  </DemoSection>
</template>

<script lang="ts" setup>
import { Modal } from 'simple-modal';
import DemoSection from '@/components/DemoSection.vue';

const showConfirm = () => {
  Modal.confirm({
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
  Modal.confirm({
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
  Modal.confirm({
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
  Modal.confirm({
    title: 'Do you want to delete these items?',
    content: 'When clicked the OK button, this dialog will be closed after 1 second',
    async onOk() {
      try {
        return await new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        });
      } catch {
        return console.log('Oops errors!');
      }
    },
    onCancel() { },
  });
}

const showNoIcon = () => {
  Modal.confirm({
    title: 'No Icon Test',
    content: 'This modal should not display any icon',
    icon: null,
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

const showNoFooter = () => {
  Modal.confirm({
    title: 'No Footer Test',
    content: 'This modal should not display footer buttons',
    footer: null,
    closable: true,
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};
</script>
