<template>
  <DemoSection>
    <template #title>可拖拽模态框</template>
    <template #description>使用 VueUse 的 useDraggable 实现可拖拽的模态框，支持边界限制和位置记忆。</template>
    <template #buttons>
      <Button variant="default" @click="showModal">打开可拖拽模态框</Button>
      <Button variant="outline" @click="resetPosition" class="ml-2">重置位置</Button>
    </template>

    <Modal v-model:open="open" :wrap-style="{ overflow: 'hidden' }" @ok="handleOk" @after-close="handleAfterClose">
      <div class="space-y-4">
        <p>🎯 这是一个可拖拽的模态框示例。</p>
        <p>📱 您可以通过拖拽标题栏来移动模态框。</p>
        <p>🔒 模态框会被限制在浏览器窗口内。</p>
        <p>💾 位置会在拖拽过程中保持记忆。</p>

        <div class="bg-gray-50 p-4 rounded-lg">
          <h4 class="font-medium mb-2">拖拽信息：</h4>
          <div class="text-sm text-gray-600 space-y-1">
            <div>当前位置: X: {{ Math.round(transformX) }}px, Y: {{ Math.round(transformY) }}px</div>
            <div>拖拽状态: {{ isDragging ? '拖拽中' : '静止' }}</div>
            <div>已拖拽: {{ startedDrag ? '是' : '否' }}</div>
          </div>
        </div>
      </div>

      <template #title>
        <div ref="modalTitleRef" class="w-full cursor-move select-none px-2 py-1 rounded transition-colors duration-200"
          :class="{
            'hover:bg-black/5': !isDragging,
            'bg-blue-50 border border-dashed border-blue-300': isDragging
          }">
          <span class="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="text-gray-500">
              <path
                d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
            可拖拽模态框 (拖拽我)
          </span>
        </div>
      </template>

      <template #modalRender="{ originVNode }">
        <div :style="transformStyle" :class="{
          'shadow-2xl': isDragging
        }">
          <component :is="originVNode" />
        </div>
      </template>
    </Modal>
  </DemoSection>
</template>

<script lang="ts" setup>
import { ref, computed, watch, watchEffect } from 'vue';
import type { CSSProperties } from 'vue';
import { useDraggable } from '@vueuse/core';
import { Modal } from 'simple-modal';
import { Button } from '@/components/ui/button';
import DemoSection from '@/components/DemoSection.vue';

const open = ref<boolean>(false);
const modalTitleRef = ref<HTMLElement>();

const showModal = () => {
  open.value = true;
};

const handleOk = (e: MouseEvent) => {
  console.log(e);
  open.value = false;
};

const handleAfterClose = () => {
  // 关闭动画完成后不重置位置，保持用户拖拽的位置
  console.log('Modal closed, position preserved');
};

const resetPosition = () => {
  transformX.value = 0;
  transformY.value = 0;
  preTransformX.value = 0;
  preTransformY.value = 0;
  startedDrag.value = false;
  console.log('Position reset to center');
};




const { x, y, isDragging } = useDraggable(modalTitleRef);


const startX = ref<number>(0);
const startY = ref<number>(0);
const startedDrag = ref(false);
const transformX = ref(0);
const transformY = ref(0);
const preTransformX = ref(0);
const preTransformY = ref(0);
const dragRect = ref({ left: 0, right: 0, top: 0, bottom: 0 });


// 改进的拖拽逻辑
watch([x, y], () => {
  if (!startedDrag.value) {
    startX.value = x.value;
    startY.value = y.value;
    const bodyRect = document.body.getBoundingClientRect();
    // 改进边界计算，考虑模态框的实际大小
    dragRect.value.left = 0;
    dragRect.value.top = 0;
    dragRect.value.right = bodyRect.width - 520; // 假设模态框宽度为520px
    dragRect.value.bottom = bodyRect.height - 400; // 假设模态框高度约为400px
    preTransformX.value = transformX.value;
    preTransformY.value = transformY.value;
  }
  startedDrag.value = true;
});

watch(isDragging, (dragging) => {
  if (!dragging && startedDrag.value) {
    startedDrag.value = false;
    // 拖拽结束时的回调
    console.log('Drag ended at:', { x: transformX.value, y: transformY.value });
  }
});


watchEffect(() => {
  if (startedDrag.value) {
    transformX.value =
      preTransformX.value +
      Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) -
      startX.value;
    transformY.value =
      preTransformY.value +
      Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) -
      startY.value;
  }
});

const transformStyle = computed<CSSProperties>(() => {
  return {
    transform: `translate(${transformX.value}px, ${transformY.value}px)`,
    // 拖拽时移除 transition，停止拖拽后恢复
    transition: isDragging.value ? 'none' : 'transform 0.2s ease-out',
  };
});


</script>
