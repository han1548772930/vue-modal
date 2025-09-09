<template>
  <DemoSection>
    <template #title>自定义页脚</template>
    <template #description>更复杂的例子，自定义了页脚的按钮，点击提交后进入 loading 状态。</template>
    <template #buttons>
      <button class="btn btn-accent" @click="showModal">Open Modal with customized footer</button>
    </template>
    <Modal v-model:open="open" title="Title" @ok="handleOk">
      <template #footer>
        <button key="back" class="btn" @click="handleCancel">Return</button>
        <button key="submit" class="btn btn-primary" :disabled="loading" @click="handleOk">Submit</button>
      </template>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  </DemoSection>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Modal } from 'simple-modal';
import DemoSection from '@/components/DemoSection.vue';

const loading = ref<boolean>(false);
const open = ref<boolean>(false);

const showModal = () => {
  open.value = true;
};

const handleOk = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    open.value = false;
  }, 2000);
};

const handleCancel = () => {
  open.value = false;
};
</script>
