<template>
  <DemoSection>
    <template #title>可拖拽模态框 - Hook 版本</template>
    <template #description>使用 useDraggableModal Hook 实现的可拖拽模态框，提供更灵活的自定义能力。</template>
    <template #buttons>
      <Button variant="default" @click="showModal">打开 Hook 版本模态框</Button>
      <Button variant="outline" @click="resetPosition" class="ml-2">重置位置</Button>
      <Button variant="secondary" @click="toggleBoundary" class="ml-2">
        {{ boundary ? '禁用' : '启用' }}边界限制
      </Button>
    </template>

    <Modal v-model:open="open" :wrap-style="{ overflow: 'hidden' }" @ok="handleOk" @after-close="handleAfterClose">
      <div class="space-y-4">
        <p>🎯 这是使用 Hook 版本实现的可拖拽模态框。</p>
        <p>📱 您可以通过拖拽标题栏来移动模态框。</p>
        <p>🔒 {{ boundary ? '模态框会被限制在浏览器窗口内' : '模态框可以自由拖拽到任意位置' }}。</p>
        <p>💾 位置会在拖拽过程中保持记忆。</p>

        <div class="bg-gray-50 p-4 rounded-lg">
          <h4 class="font-medium mb-2">拖拽信息：</h4>
          <div class="text-sm text-gray-600 space-y-1">
            <div>当前位置: X: {{ Math.round(transformX) }}px, Y: {{ Math.round(transformY) }}px</div>
            <div>拖拽状态: {{ isDragging ? '拖拽中' : '静止' }}</div>
            <div>已拖拽: {{ startedDrag ? '是' : '否' }}</div>
            <div>边界限制: {{ boundary ? '启用' : '禁用' }}</div>
          </div>
        </div>

        <div class="bg-blue-50 p-4 rounded-lg">
          <h4 class="font-medium mb-2">Hook 优势：</h4>
          <ul class="text-sm text-blue-700 space-y-1">
            <li>• 逻辑复用：可在多个组件中使用</li>
            <li>• 灵活配置：支持自定义边界、尺寸等</li>
            <li>• 事件回调：提供拖拽开始和结束回调</li>
            <li>• 状态暴露：完全控制拖拽状态</li>
          </ul>
        </div>
      </div>

      <template #title>
        <div ref="dragTargetRef" class="w-full cursor-move select-none px-2 py-1 rounded transition-colors duration-200"
          :class="{
            'hover:bg-black/5': !isDragging,
            'bg-blue-50 border border-dashed border-blue-300': isDragging
          }">
          <span class="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="text-gray-500">
              <path
                d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
            Hook 版本可拖拽模态框 (拖拽我)
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
import { ref } from 'vue';
import { Modal } from 'simple-modal';
import { Button } from '@/components/ui/button';
import DemoSection from '@/components/DemoSection.vue';
import { useDraggableModal } from '@/hooks/useDraggableModal';

const open = ref<boolean>(false);
const boundary = ref<boolean>(true);

const showModal = () => {
  open.value = true;
};

const handleOk = (e: MouseEvent) => {
  console.log(e);
  open.value = false;
};

const handleAfterClose = () => {
  console.log('Hook Modal closed, position preserved');
};

const toggleBoundary = () => {
  boundary.value = !boundary.value;
  // 重新初始化 Hook 以应用新的边界设置
  resetPosition();
};

// 使用拖拽 Hook
const {
  dragTargetRef,
  isDragging,
  startedDrag,
  transformX,
  transformY,
  transformStyle,
  resetPosition
} = useDraggableModal({
  modalWidth: 520,
  modalHeight: 450,
  boundary: boundary,
  onDragStart: (position) => {
    console.log('Hook: Drag started at:', position);
  },
  onDragEnd: (position) => {
    console.log('Hook: Drag ended at:', position);
  }
});
</script>
