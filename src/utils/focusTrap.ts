import { ref, onMounted, onUnmounted, nextTick } from 'vue';

// 可聚焦元素的选择器
const FOCUSABLE_ELEMENTS = [
  'a[href]',
  'area[href]',
  'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
  'select:not([disabled]):not([aria-hidden])',
  'textarea:not([disabled]):not([aria-hidden])',
  'button:not([disabled]):not([aria-hidden])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  '[tabindex]:not([tabindex^="-"])',
].join(',');

/**
 * 获取容器内所有可聚焦的元素
 */
function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const elements = Array.from(container.querySelectorAll(FOCUSABLE_ELEMENTS)) as HTMLElement[];
  return elements.filter(element => {
    // 过滤掉不可见的元素
    const style = window.getComputedStyle(element);
    return (
      style.display !== 'none' &&
      style.visibility !== 'hidden' &&
      !element.hasAttribute('disabled') &&
      element.offsetWidth > 0 &&
      element.offsetHeight > 0
    );
  });
}

/**
 * 焦点捕获 Hook
 */
export function useFocusTrap(active: () => boolean) {
  const containerRef = ref<HTMLElement>();
  const lastActiveElement = ref<HTMLElement>();
  const firstFocusableElement = ref<HTMLElement>();
  const lastFocusableElement = ref<HTMLElement>();

  // 更新可聚焦元素列表
  const updateFocusableElements = () => {
    if (!containerRef.value) return;

    const focusableElements = getFocusableElements(containerRef.value);
    firstFocusableElement.value = focusableElements[0];
    lastFocusableElement.value = focusableElements[focusableElements.length - 1];
  };

  // 处理 Tab 键事件
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!active() || !containerRef.value) return;

    if (e.key === 'Tab') {
      updateFocusableElements();

      if (!firstFocusableElement.value) {
        // 如果没有可聚焦元素,阻止默认行为
        e.preventDefault();
        return;
      }

      if (e.shiftKey) {
        // Shift + Tab (向后)
        if (document.activeElement === firstFocusableElement.value) {
          e.preventDefault();
          lastFocusableElement.value?.focus();
        }
      } else {
        // Tab (向前)
        if (document.activeElement === lastFocusableElement.value) {
          e.preventDefault();
          firstFocusableElement.value?.focus();
        }
      }
    }
  };

  // 激活焦点捕获
  const activate = async () => {
    if (!containerRef.value) return;

    // 保存当前活动元素
    lastActiveElement.value = document.activeElement as HTMLElement;

    // 等待 DOM 更新
    await nextTick();

    // 更新可聚焦元素
    updateFocusableElements();

    // 聚焦到第一个可聚焦元素,如果没有则聚焦容器
    if (firstFocusableElement.value) {
      firstFocusableElement.value.focus();
    } else {
      // 确保容器可以接收焦点
      if (containerRef.value.tabIndex < 0) {
        containerRef.value.tabIndex = -1;
      }
      containerRef.value.focus();
    }

    // 添加键盘事件监听
    document.addEventListener('keydown', handleKeyDown, true);
  };

  // 停用焦点捕获
  const deactivate = () => {
    // 移除键盘事件监听
    document.removeEventListener('keydown', handleKeyDown, true);

    // 恢复之前的焦点
    if (lastActiveElement.value && document.body.contains(lastActiveElement.value)) {
      try {
        lastActiveElement.value.focus();
      } catch (error) {
        // 如果无法聚焦,忽略错误
        console.warn('Failed to restore focus:', error);
      }
    }

    // 清理引用
    lastActiveElement.value = undefined;
    firstFocusableElement.value = undefined;
    lastFocusableElement.value = undefined;
  };

  // 组件卸载时清理
  onUnmounted(() => {
    deactivate();
  });

  return {
    containerRef,
    activate,
    deactivate,
    updateFocusableElements,
  };
}

/**
 * 模态框焦点捕获 Hook
 */
export function useModalFocusTrap(visible: () => boolean, options: {
  autoFocus?: boolean;
  restoreFocus?: boolean;
} = {}) {
  const { autoFocus = true, restoreFocus = true } = options;
  const { containerRef, activate, deactivate } = useFocusTrap(visible);

  // 监听可见性变化
  const handleVisibilityChange = async (isVisible: boolean) => {
    if (isVisible && autoFocus) {
      await nextTick();
      activate();
    } else if (!isVisible && restoreFocus) {
      deactivate();
    }
  };

  return {
    containerRef,
    activate,
    deactivate,
    handleVisibilityChange,
  };
}

export default useFocusTrap;
