<template>
  <Teleport to="body">
    <Transition name="modal" appear @enter="onEnter" @leave="onLeave">

      <div v-if="modelValue" class="fixed inset-0">
        <!-- 遮罩层 -->
        <div v-if="mask" class="modal-mask fixed inset-0 bg-black/45 transition-opacity duration-200" />
        <div class="fixed inset-0 p-4" @click.self="handleMaskClick">

          <div :id="id" ref="modalWrapperRef"
            class="modal-dialog fixed  bg-background rounded-lg outline-0 transition-all ease-out flex flex-col" :class="[
              'shadow-[0_6px_16px_0_rgba(0,0,0,0.08),0_3px_6px_-4px_rgba(0,0,0,0.12),0_9px_28px_8px_rgba(0,0,0,0.05)]',
              'max-w-[calc(100vw-32px)] max-h-[calc(100vh-32px)]',
              isDragging ? 'duration-0' : 'duration-200',
              sizeClass,
              { 'cursor-move': draggable && isDragging }
            ]" :style="[computedStyle]" role="dialog" aria-modal="true"
            :aria-labelledby="title ? 'modal-title' : undefined">

            <!-- 模态框内容 - 使用flex布局控制滚动 -->
            <div class=" bg-background rounded-lg flex flex-col min-h-0" ref="modalRef">
              <!-- 头部 - 固定不滚动 -->
              <div v-if="$slots.header || title || closable"
                class="flex-shrink-0  p-4  flex items-center justify-between"
                :class="{ 'cursor-move select-none': draggable }" ref="dragHandleRef">
                <!-- 根据 type 渲染不同的图标 -->
                <div v-if="shouldShowIcon" class="flex-shrink-0 mr-3">
                  <component :is="currentIcon" :class="iconClass" :size="20" />
                </div>
                <div class="text-lg  font-bold text-foreground flex-1 pr-6 leading-6" id="modal-title">
                  <slot name="header">{{ title }}</slot>
                </div>
                <Button v-if="closable" variant="ghost"
                  class="absolute top-4 right-4 w-6 h-6 flex items-center justify-center ring-offset-background focus:ring-ring d rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                  :aria-label="closeText" @click="handleClose">
                  <X :size="14" />
                </Button>
              </div>
              <!-- 主体内容 - 可滚动区域 -->
              <div class="flex-1 overflow-y-auto px-4 text-base">
                <slot>{{ content }}</slot>

              </div>

              <!-- 底部 - 固定不滚动 -->
              <div v-if="$slots.footer || showFooter" class="flex-shrink-0 px-6 py-4  flex justify-end gap-2">
                <slot name="footer">
                  <Button v-if="showCancel" @click="handleCancel" :disabled="confirmLoading" variant="outline">
                    {{ cancelText }}
                  </Button>
                  <Button type="primary" :disabled="confirmLoading" @click="handleOk">
                    <Loader2 v-if="confirmLoading" class="w-4 h-4 mr-2 animate-spin" />
                    {{ okText }}
                  </Button>
                </slot>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted, nextTick, type CSSProperties, useTemplateRef } from 'vue';

import { AlertTriangle, CheckCircle, HelpCircle, Info, X, XCircle } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-vue-next'
import type { ModalProps } from './hooks/useModal';
import { useDraggable, useElementSize, useWindowSize } from '@vueuse/core';
const props = withDefaults(defineProps<ModalProps>(), {
  title: '',
  content: '',
  width: 520,
  closable: true,
  mask: true,
  maskClosable: true,
  okText: '确定',
  cancelText: '取消',
  closeText: '关闭',
  confirmLoading: false,
  centered: false,
  size: 'default',
  showFooter: true,
  showCancel: true,
  zIndex: 1000,
  draggable: false,
  id: '',
  destroyOnClose: false,
  keyboard: true,
  forceRender: false,
  type: 'confirm',
});

const emit = defineEmits<{
  ok: [];
  cancel: [];
  close: [];
  afterClose: [];
}>();

const modelValue = defineModel<boolean>();

const modalWrapperRef = useTemplateRef("modalWrapperRef");
const dragHandleRef = useTemplateRef("dragHandleRef");
const modalRef = useTemplateRef("modalRef");


const { width: modalActualWidth, height: modalActualHeight } = useElementSize(modalWrapperRef);
const { width: windowWidth, height: windowHeight } = useWindowSize();


// 计算居中位置
const centeredPosition = () => {
  const viewportWidth = windowWidth.value;
  const viewportHeight = windowHeight.value;


  // 获取模态框尺寸
  const modalWidth = props.width || (() => {
    const sizeWidthMap = {
      small: 320,
      default: 520,
      large: 800
    };
    return sizeWidthMap[props.size] || 520;
  })();

  const modalHeight = modalActualHeight.value || 400;

  const padding = 16; // 增加边距

  // X 轴计算 - 确保不会超出边界
  let x;
  if (modalWidth >= viewportWidth - padding * 2) {
    // 如果模态框宽度超过或接近视窗宽度，靠左对齐但保持边距
    x = padding;
  } else {
    // 否则居中
    x = (viewportWidth - modalWidth) / 2;
  }

  // Y 轴计算 - 确保不会超出边界
  let y;
  if (props.centered) {
    // 强制居中
    if (modalHeight >= viewportHeight - padding * 2) {
      // 如果模态框高度超过或接近视窗高度，靠顶部对齐但保持边距
      y = padding;
    } else {
      // 否则居中
      y = (viewportHeight - modalHeight) / 2;
    }
  } else {
    // 非居中模式，考虑顶部偏移
    const topOffset = 50; // 对应 pt-[50px]
    y = topOffset;

    // 如果模态框太高，调整到合适位置
    if (y + modalHeight > viewportHeight - padding) {
      y = Math.max(padding, viewportHeight - modalHeight - padding);
    }
  }

  // 最终边界检查，确保位置不会导致模态框超出边界
  x = Math.max(padding, Math.min(x, viewportWidth - modalWidth - padding));
  y = Math.max(padding, Math.min(y, viewportHeight - modalHeight - padding));


  return { x, y };
};

// 使用 useDraggable 替代 UseDraggable 组件
const { x, y, isDragging } = useDraggable(modalWrapperRef, {
  initialValue: centeredPosition,
  handle: dragHandleRef,
  disabled: computed(() => !props.draggable),
  onMove: (position) => {
    // 边界检查
    const viewportWidth = windowWidth.value;
    const viewportHeight = windowHeight.value;
    const modalWidth = modalActualWidth.value || 520;
    const modalHeight = modalActualHeight.value || 400;

    const padding = 2; // 边距

    // X 轴边界计算
    // 左边界：不能小于 0
    const minX = padding;
    // 右边界：模态框右边缘不能超出视窗右边缘
    const maxX = Math.max(padding, viewportWidth - modalWidth);

    // Y 轴边界计算  
    // 上边界：不能小于 padding
    const minY = padding;
    // 下边界：模态框底边缘不能超出视窗底边缘
    const maxY = Math.max(padding, viewportHeight - modalHeight);

    // 限制位置
    position.x = Math.max(minX, Math.min(maxX, position.x));
    position.y = Math.max(minY, Math.min(maxY, position.y));


    return position;
  }
});


// 更新计算样式以包含拖拽位置
const computedStyle = computed(() => {
  const baseStyle: CSSProperties = {};

  // 宽度设置
  if (typeof props.width === 'number') {
    baseStyle.width = `${props.width}px`;
  } else {
    baseStyle.width = props.width;
  }

  // 高度设置
  if (props.height) {
    if (typeof props.height === 'number') {
      baseStyle.height = `${props.height}px`;
    } else {
      baseStyle.height = props.height;
    }
  } else {
    baseStyle.maxHeight = 'calc(100vh - 64px)';
  }

  // 合并拖拽样式 - 安全地提取 transform 属性
  // if (props.draggable) {
  // 从 dragStyle 中安全地提取 transform 属性
  baseStyle.left = x.value + 'px';
  baseStyle.top = y.value + 'px';
  // }

  return baseStyle;
});


const currentIcon = computed(() => {
  // 如果用户自定义了图标，优先使用自定义图标
  if (props.icon) {
    return props.icon;
  }

  // 根据 type 返回对应的图标
  const iconMap = {
    info: Info,
    success: CheckCircle,
    error: XCircle,
    warning: AlertTriangle,
    confirm: HelpCircle,
  };

  return iconMap[props.type] || HelpCircle;
});


// 根据 type 计算图标样式类
const iconClass = computed(() => {
  const classMap = {
    info: 'text-blue-500',
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-orange-500',
    confirm: 'text-blue-500',
  };

  return classMap[props.type] || 'text-blue-500';
});

// 是否应该显示图标
const shouldShowIcon = computed(() => {
  // 如果用户明确传递了 icon 属性（包括 null），则尊重用户的选择
  if (props.icon !== undefined) {
    return props.icon !== null;
  }

  // 如果没有传递 icon 属性，则根据 type 决定是否显示
  return props.type !== 'confirm' || props.title;
});






// 尺寸类名
const sizeClass = computed(() => {
  const sizeMap = {
    small: 'w-80', // 320px
    default: 'w-[520px]',
    large: 'w-[800px] xl:w-[900px]'
  };
  return sizeMap[props.size];
});

// 事件处理
const handleOk = () => {
  emit('ok');
};

const handleCancel = () => {
  emit('cancel');
  if (modelValue.value) {
    modelValue.value = false;
  }
};

const handleClose = () => {
  emit('close');

  handleCancel();

};

const handleMaskClick = () => {
  if (props.maskClosable) {
    handleCancel();
  }

};

// ESC 键处理
const handleKeyDown = (e: KeyboardEvent) => {
  if (modelValue.value && e.key === 'Escape' && props.keyboard && props.closable) {
    handleCancel();
  }
};

// 动画回调
const onEnter = () => {
  nextTick(() => {
    // 自动聚焦
    if (modalRef.value) {
      const focusableElement = modalRef.value.querySelector(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
      );
      if (focusableElement) {
        (focusableElement as HTMLElement).focus();
      } else {
        modalRef.value.focus();
      }
    }
  });
};

const onLeave = () => {
  emit('afterClose');
};

// 滚动锁定 - 优化版本
const lockBodyScroll = () => {
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = 'hidden';
  if (scrollBarWidth > 0) {
    document.body.style.paddingRight = `${scrollBarWidth}px`;
  }
};

const unlockBodyScroll = () => {
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
};

// 滚动锁定
watch(() => modelValue.value, (val) => {
  if (val) {

    lockBodyScroll();
  } else {
    unlockBodyScroll();
  }
});

// 生命周期
onMounted(() => {
  if (props.keyboard) {
    window.addEventListener('keydown', handleKeyDown);
  }
});

onUnmounted(() => {
  if (props.keyboard) {
    window.removeEventListener('keydown', handleKeyDown);
  }
  // 确保清理样式
  unlockBodyScroll();
});

</script>

<style>
/* Vue 动画效果 - 精简版 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease-out;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* 遮罩层动画 */
.modal-enter-from .modal-mask,
.modal-leave-to .modal-mask {
  opacity: 0;
}

/* 模态框动画 */
.modal-enter-from .modal-dialog,
.modal-leave-to .modal-dialog {
  opacity: 0;
  transform: scale(0.7) translateY(-20px);
}

/* 移动端响应式调整 */
@media (max-width: 768px) {

  .modal-enter-from .modal-dialog,
  .modal-leave-to .modal-dialog {
    transform: scale(0.9) translateY(20px);
  }
}

/* 自定义滚动条样式（可选） */
.modal-dialog .overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.modal-dialog .overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.modal-dialog .overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.modal-dialog .overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>