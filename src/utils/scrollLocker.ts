import { ref, watch, onUnmounted } from 'vue';

// 获取滚动条宽度
function getScrollBarSize(): number {
  if (typeof document === 'undefined') {
    return 0;
  }

  const scrollDiv = document.createElement('div');
  scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
  document.body.appendChild(scrollDiv);
  const scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarSize;
}

// 检查body是否有滚动条
function isBodyOverflowing(): boolean {
  return (
    document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) &&
    window.innerWidth > document.body.offsetWidth
  );
}

// 滚动锁定管理器
class ScrollLocker {
  private static lockCount = 0;
  private static originalBodyStyle: {
    overflow?: string;
    width?: string;
    paddingRight?: string;
  } = {};

  static lock(): void {
    if (this.lockCount === 0) {
      // 保存原始样式
      this.originalBodyStyle = {
        overflow: document.body.style.overflow,
        width: document.body.style.width,
        paddingRight: document.body.style.paddingRight,
      };

      const scrollbarSize = getScrollBarSize();
      const isOverflow = isBodyOverflowing();

      // 设置body样式来禁用滚动
      document.body.style.overflow = 'hidden';
      
      // 如果有滚动条，添加padding来防止内容跳动
      if (isOverflow && scrollbarSize > 0) {
        const currentPaddingRight = parseInt(
          window.getComputedStyle(document.body).paddingRight || '0',
          10
        );
        document.body.style.paddingRight = `${currentPaddingRight + scrollbarSize}px`;
      }
    }
    this.lockCount++;
  }

  static unlock(): void {
    this.lockCount = Math.max(0, this.lockCount - 1);
    
    if (this.lockCount === 0) {
      // 恢复原始样式
      document.body.style.overflow = this.originalBodyStyle.overflow || '';
      document.body.style.width = this.originalBodyStyle.width || '';
      document.body.style.paddingRight = this.originalBodyStyle.paddingRight || '';
    }
  }
}

// Vue 组合式函数
export function useScrollLocker(shouldLock: () => boolean) {
  const isLocked = ref(false);

  const lock = () => {
    if (!isLocked.value && shouldLock()) {
      ScrollLocker.lock();
      isLocked.value = true;
    }
  };

  const unlock = () => {
    if (isLocked.value) {
      ScrollLocker.unlock();
      isLocked.value = false;
    }
  };

  // 组件卸载时自动解锁
  onUnmounted(() => {
    unlock();
  });

  return {
    lock,
    unlock,
    isLocked: isLocked.value,
  };
}

// 监听visible状态的滚动锁定
export function useModalScrollLocker(visible: () => boolean) {
  const { lock, unlock } = useScrollLocker(() => true);

  watch(
    visible,
    (newVisible) => {
      if (newVisible) {
        lock();
      } else {
        unlock();
      }
    },
    { immediate: true }
  );

  return { lock, unlock };
}

export default ScrollLocker;
