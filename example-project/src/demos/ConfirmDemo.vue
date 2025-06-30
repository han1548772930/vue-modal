<template>
  <DemoSection>
    <template #title>确认对话框</template>
    <template #description>使用 confirm() 可以快捷地弹出确认框。</template>
    <template #buttons>
      <Button @click="showConfirm">Confirm</Button>
      <Button @click="showPromiseConfirm">With promise</Button>
      <Button variant="outline" @click="showDeleteConfirm">Delete</Button>
      <Button variant="outline" @click="showPropsConfirm">With extra props</Button>
      <Button variant="outline" @click="showNoIcon">No Icon</Button>
      <Button variant="outline" @click="showNoFooter">No Footer</Button>
    </template>
  </DemoSection>
</template>

<script lang="ts" setup>
import { Modal } from 'simple-modal';
import { Button } from '@/components/ui/button';
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
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};
</script>
