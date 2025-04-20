import { ref, watch, watchEffect, nextTick, onBeforeUnmount, onMounted, type Ref, type ModelRef } from 'vue'
import { useDraggable } from '@vueuse/core'

export function useDraggableDialog(options: {
  open: ModelRef<boolean>,
  contentSelector: string,
  headerSelector: string
}) {
  const { open, contentSelector, headerSelector } = options

  // 引用和拖拽状态
  const dialogTitleRef = ref<HTMLElement | null>(null)
  const dialogContentRef = ref<HTMLElement | null>(null)
  const { x, y, isDragging } = useDraggable(dialogTitleRef)

  // 拖拽位置相关状态
  const startX = ref<number>(0)
  const startY = ref<number>(0)
  const startedDrag = ref(false)
  const transformX = ref(0)
  const transformY = ref(0)
  const preTransformX = ref(0)
  const preTransformY = ref(0)
  const dragRect = ref({ left: 0, right: 0, top: 0, bottom: 0 })

  // 获取当前transform值
  const getCurrentTransform = (element: HTMLElement) => {
    const style = window.getComputedStyle(element);
    const matrix = new DOMMatrixReadOnly(style.transform);
    return {
      x: matrix.m41,
      y: matrix.m42
    };
  }

  // 监听拖拽开始
  const w1 = watch([x, y], () => {
    if (!startedDrag.value && dialogTitleRef.value && dialogContentRef.value) {
      // 设置起始鼠标位置
      startX.value = x.value
      startY.value = y.value

      // 计算可拖动的边界
      const bodyRect = document.body.getBoundingClientRect()
      const titleRect = dialogTitleRef.value.getBoundingClientRect()
      dragRect.value.left = 0
      dragRect.value.top = 0
      dragRect.value.right = bodyRect.width - titleRect.width
      dragRect.value.bottom = bodyRect.height - titleRect.height

      // 重要：获取当前位置作为拖拽起始位置
      const currentTransform = getCurrentTransform(dialogContentRef.value);
      preTransformX.value = currentTransform.x
      preTransformY.value = currentTransform.y
    }
    if (isDragging.value) {
      startedDrag.value = true
    }
  })

  // 监听拖拽结束
  const w2 = watch(isDragging, () => {
    if (!isDragging.value) {
      startedDrag.value = false
    }
  })

  // 计算拖拽位置
  watchEffect(() => {
    if (startedDrag.value) {
      transformX.value =
        preTransformX.value +
        Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) -
        startX.value
      transformY.value =
        preTransformY.value +
        Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) -
        startY.value
      if (dialogContentRef.value) {
        if (transformX.value === 0 && transformY.value === 0) {
          return
        } else {
          dialogContentRef.value.style.transform = `translateX(${transformX.value}px) translateY(${transformY.value}px)`
        }
      }
    }
  })

  // 绑定DOM元素
  const bindingEl = () => {
    nextTick(() => {
      const dialogHeaders = document.querySelectorAll(headerSelector)
      const dialogContents = document.querySelectorAll(contentSelector)

      dialogTitleRef.value = dialogHeaders[dialogHeaders.length - 1] as HTMLElement
      dialogContentRef.value = dialogContents[dialogContents.length - 1] as HTMLElement

      // 注意：这里不再重置transform值，保留当前位置
      // 仅在必要时重置
      if (!open.value) {
        transformX.value = 0
        transformY.value = 0
      }
    })
  }

  // 重置拖拽状态
  const resetDragState = () => {
    transformX.value = 0
    transformY.value = 0
    preTransformX.value = 0
    preTransformY.value = 0
    startX.value = 0
    startY.value = 0
  }

  // 生命周期钩子
  onMounted(() => {
    bindingEl()
  })

  onBeforeUnmount(() => {
    w1()
    w2()
  })

  // 监听对话框打开状态
  watchEffect(() => {
    if (open.value && dialogContentRef.value == null && dialogTitleRef.value == null) {
      bindingEl()
    }
    if (!open.value) {
      dialogContentRef.value = null
      dialogTitleRef.value = null
      resetDragState() // 关闭对话框时重置状态
    }
  })

  return {
    dialogTitleRef,
    dialogContentRef,
    isDragging,
    bindingEl,
    transformX,
    transformY,
    preTransformX,
    preTransformY,
    resetDragState // 导出重置方法，以便在动画完成后调用
  }
}