<template>
  <DemoSection>
    <template #title>CSS 样式选项验证</template>
    <template #description>验证各种CSS相关的属性选项。</template>
    <template #buttons>
      <div class="flex flex-wrap items-center gap-2">
        <button class="btn btn-primary" @click="showBasicModal">基础样式</button>
        <button class="btn btn-outline" @click="showStyledModal">自定义样式</button>
        <button class="btn btn-outline" @click="showMaskStyledModal">遮罩样式</button>
        <button class="btn btn-outline" @click="showBodyStyledModal">主体样式</button>
        <button class="btn btn-outline" @click="showWrapClassModal">包装器类名</button>
        <button class="btn btn-outline" @click="showZIndexModal">层级控制</button>
      </div>
    </template>

    <!-- 基础模态框 -->
    <Modal v-model:open="basicOpen" title="基础模态框" @ok="() => basicOpen = false">
      <p>这是基础模态框,没有额外样式。</p>
      <p>用于对比其他样式效果。</p>
    </Modal>

    <!-- 自定义样式模态框 -->
    <Modal v-model:open="styledOpen" title="自定义样式模态框" :style="{
      top: '50px',
      border: '2px solid #1890ff',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
    }" @ok="() => styledOpen = false">
      <p>✨ 这个模态框使用了自定义 style 属性：</p>
      <ul class="list-disc list-inside space-y-1 text-sm">
        <li>top: 50px - 距离顶部50px</li>
        <li>border: 2px solid #1890ff - 蓝色边框</li>
        <li>borderRadius: 12px - 圆角</li>
        <li>boxShadow - 自定义阴影</li>
      </ul>
    </Modal>

    <!-- 遮罩样式模态框 -->
    <Modal v-model:open="maskStyledOpen" title="遮罩样式模态框" :mask-style="{
      backgroundColor: 'rgba(255, 0, 0, 0.3)',
      backdropFilter: 'blur(5px)'
    }" @ok="() => maskStyledOpen = false">
      <p>🎭 这个模态框自定义了遮罩样式：</p>
      <ul class="list-disc list-inside space-y-1 text-sm">
        <li>backgroundColor: rgba(255, 0, 0, 0.3) - 红色半透明遮罩</li>
        <li>backdropFilter: blur(5px) - 背景模糊效果</li>
      </ul>
    </Modal>

    <!-- 主体样式模态框 -->
    <Modal v-model:open="bodyStyledOpen" title="主体样式模态框" :body-style="{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '24px',
      borderRadius: '8px'
    }" @ok="() => bodyStyledOpen = false">
      <p>🎨 这个模态框自定义了主体样式：</p>
      <ul class="list-disc list-inside space-y-1 text-sm">
        <li>渐变背景色</li>
        <li>白色文字</li>
        <li>增加内边距</li>
        <li>圆角效果</li>
      </ul>
    </Modal>

    <!-- 包装器类名模态框 -->
    <Modal v-model:open="wrapClassOpen" title="包装器类名模态框" wrap-class-name="custom-modal-wrap"
      @ok="() => wrapClassOpen = false">
      <p>📦 这个模态框使用了自定义包装器类名：</p>
      <p class="text-sm text-gray-600">wrapClassName="custom-modal-wrap"</p>
      <p class="text-sm">可以通过CSS类名进行更复杂的样式定制。</p>
    </Modal>

    <!-- 高层级模态框 -->
    <Modal v-model:open="zIndexOpen" title="高层级模态框" :z-index="2000" :style="{ border: '3px solid #52c41a' }"
      @ok="() => zIndexOpen = false">
      <p>🔝 这个模态框设置了高层级：</p>
      <ul class="list-disc list-inside space-y-1 text-sm">
        <li>zIndex: 2000 - 确保在其他元素之上</li>
        <li>绿色边框用于识别</li>
      </ul>
      <div class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
        <p class="text-sm text-yellow-800">
          💡 提示：可以同时打开多个模态框来测试层级效果
        </p>
      </div>
    </Modal>
  </DemoSection>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Modal } from 'simple-modal';
import DemoSection from '@/components/DemoSection.vue';

// 各种模态框的显示状态
const basicOpen = ref<boolean>(false);
const styledOpen = ref<boolean>(false);
const maskStyledOpen = ref<boolean>(false);
const bodyStyledOpen = ref<boolean>(false);
const wrapClassOpen = ref<boolean>(false);
const zIndexOpen = ref<boolean>(false);

// 显示各种模态框的方法
const showBasicModal = () => {
  basicOpen.value = true;
};

const showStyledModal = () => {
  styledOpen.value = true;
};

const showMaskStyledModal = () => {
  maskStyledOpen.value = true;
};

const showBodyStyledModal = () => {
  bodyStyledOpen.value = true;
};

const showWrapClassModal = () => {
  wrapClassOpen.value = true;
};

const showZIndexModal = () => {
  zIndexOpen.value = true;
};
</script>

<style scoped>
/* 自定义包装器类名样式 */
:global(.custom-modal-wrap) {
  /* 添加动画效果 */
  animation: customModalAnimation 0.3s ease-out;
}

:global(.custom-modal-wrap .simple-dialog) {
  /* 自定义模态框样式 */
  border: 2px dashed #722ed1;
  border-radius: 16px;
  overflow: hidden;
}

:global(.custom-modal-wrap .simple-dialog-header) {
  /* 自定义头部样式 */
  background: linear-gradient(90deg, #722ed1, #eb2f96);
  color: white;
}

@keyframes customModalAnimation {
  from {
    transform: scale(0.8) rotate(-5deg);
    opacity: 0;
  }

  to {
    transform: scale(1) rotate(0deg);
    opacity: 1;
  }
}
</style>
