<template>
  <DemoSection>
    <template #title>异步关闭</template>
    <template #description>点击确定后异步关闭对话框,例如提交表单。</template>
    <template #buttons>
      <button class="btn btn-primary" @click="showModal">Open Modal with async logic</button>
    </template>
    <Modal v-model:open="open" title="Title" :confirm-loading="confirmLoading" @ok="handleOk">
      <p>{{ modalText }}</p>
    </Modal>
  </DemoSection>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Modal } from 'simple-modal';
import DemoSection from '@/components/DemoSection.vue';

const modalText = ref<string>('Content of the modal');
const open = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);

const showModal = () => {
  open.value = true;
};

const handleOk = () => {
  modalText.value = 'The modal will be closed after two seconds';
  confirmLoading.value = true;
  setTimeout(() => {
    open.value = false;
    confirmLoading.value = false;
  }, 2000);
};
</script>
