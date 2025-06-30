import { ref, computed, watch, watchEffect, unref } from 'vue';
import type { CSSProperties, Ref, MaybeRef } from 'vue';
import { useDraggable } from '@vueuse/core';

export interface DraggableModalOptions {
  /** 模态框宽度，用于边界计算 */
  modalWidth?: number;
  /** 模态框高度，用于边界计算 */
  modalHeight?: number;
  /** 是否启用边界限制 */
  boundary?: MaybeRef<boolean>;
  /** 拖拽结束回调 */
  onDragEnd?: (position: { x: number; y: number }) => void;
  /** 拖拽开始回调 */
  onDragStart?: (position: { x: number; y: number }) => void;
}

export interface DraggableModalReturn {
  /** 拖拽目标元素的 ref */
  dragTargetRef: Ref<HTMLElement | undefined>;
  /** 是否正在拖拽 */
  isDragging: Ref<boolean>;
  /** 是否已开始拖拽 */
  startedDrag: Ref<boolean>;
  /** X 轴变换值 */
  transformX: Ref<number>;
  /** Y 轴变换值 */
  transformY: Ref<number>;
  /** 变换样式 */
  transformStyle: Ref<CSSProperties>;
  /** 重置位置 */
  resetPosition: () => void;
}

/**
 * 可拖拽模态框 Hook
 * @param options 配置选项
 * @returns 拖拽相关的状态和方法
 */
export function useDraggableModal(options: DraggableModalOptions = {}): DraggableModalReturn {
  const {
    modalWidth = 520,
    modalHeight = 400,
    boundary = true,
    onDragEnd,
    onDragStart
  } = options;

  // 拖拽目标元素
  const dragTargetRef = ref<HTMLElement>();

  // 使用 VueUse 的 useDraggable
  const { x, y, isDragging } = useDraggable(dragTargetRef);

  // 拖拽状态
  const startX = ref<number>(0);
  const startY = ref<number>(0);
  const startedDrag = ref(false);
  const transformX = ref(0);
  const transformY = ref(0);
  const preTransformX = ref(0);
  const preTransformY = ref(0);
  const dragRect = ref({ left: 0, right: 0, top: 0, bottom: 0 });

  // 监听拖拽开始
  watch([x, y], () => {
    if (!startedDrag.value) {
      startX.value = x.value;
      startY.value = y.value;

      if (unref(boundary)) {
        const bodyRect = document.body.getBoundingClientRect();
        dragRect.value.left = 0;
        dragRect.value.top = 0;
        dragRect.value.right = bodyRect.width - modalWidth;
        dragRect.value.bottom = bodyRect.height - modalHeight;
      }

      preTransformX.value = transformX.value;
      preTransformY.value = transformY.value;

      // 触发拖拽开始回调
      onDragStart?.({ x: transformX.value, y: transformY.value });
    }
    startedDrag.value = true;
  });

  // 监听拖拽结束
  watch(isDragging, (dragging) => {
    if (!dragging && startedDrag.value) {
      startedDrag.value = false;
      // 触发拖拽结束回调
      onDragEnd?.({ x: transformX.value, y: transformY.value });
    }
  });

  // 计算变换位置
  watchEffect(() => {
    if (startedDrag.value) {
      if (unref(boundary)) {
        transformX.value =
          preTransformX.value +
          Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) -
          startX.value;
        transformY.value =
          preTransformY.value +
          Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) -
          startY.value;
      } else {
        transformX.value = preTransformX.value + x.value - startX.value;
        transformY.value = preTransformY.value + y.value - startY.value;
      }
    }
  });

  // 计算变换样式
  const transformStyle = computed<CSSProperties>(() => {
    return {
      transform: `translate(${transformX.value}px, ${transformY.value}px)`,
      transition: isDragging.value ? 'none' : 'transform 0.2s ease-out',
    };
  });

  // 重置位置
  const resetPosition = () => {
    transformX.value = 0;
    transformY.value = 0;
    preTransformX.value = 0;
    preTransformY.value = 0;
    startedDrag.value = false;
  };

  return {
    dragTargetRef,
    isDragging,
    startedDrag,
    transformX,
    transformY,
    transformStyle,
    resetPosition
  };
}
