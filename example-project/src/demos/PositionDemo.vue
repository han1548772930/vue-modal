<template>
  <DemoSection>
    <template #title>自定义位置</template>
    <template #description>使用 centered 或类似 style.top 的样式来设置对话框位置。</template>
    <template #buttons>
      <Button @click="setModal1Visible(true)">
        Display a modal dialog at 20px to Top
      </Button>
      <Button @click="modal2Visible = true">
        Vertically centered modal dialog
      </Button>
    </template>

    <Modal v-model:open="modal1Visible" title="20px to Top" style="top: 20px" @ok="setModal1Visible(false)">
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
    </Modal>

    <Modal v-model:open="modal2Visible" title="垂直居中的对话框" centered @ok="modal2Visible = false">
      <p>这个Modal应该垂直居中显示</p>
    </Modal>
  </DemoSection>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Modal } from 'simple-modal';
import { Button } from '@/components/ui/button';
import DemoSection from '@/components/DemoSection.vue';

const modal1Visible = ref<boolean>(false);
const modal2Visible = ref<boolean>(false);

const setModal1Visible = (open: boolean) => {
  modal1Visible.value = open;
};
</script>
