<template>
  <DemoSection>
    <template #title>自定义页脚</template>
    <template #description>更复杂的例子，自定义了页脚的按钮，点击提交后进入 loading 状态。</template>
    <template #buttons>
      <Button @click="showModal">Open Modal with customized footer</Button>
    </template>
    <Modal v-model:open="open" title="Title" @ok="handleOk">
      <template #footer>
        <Button key="back" @click="handleCancel">Return</Button>
        <Button key="submit" :loading="loading" @click="handleOk">Submit</Button>
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
import { Button } from '@/components/ui/button';
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
