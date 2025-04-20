import { animate } from 'animejs';
import { useMouse } from '@vueuse/core'

const { x, y } = useMouse()
export interface DialogAnimationOptions {
  // 选择器，用于找到对话框内容元素
  contentSelector?: string;
  // 动画持续时间
  duration?: number;
  // 缓动函数
  easing?: string;
  // 初始缩放比例
  initialScale?: number;
}

export function useDialogAnimation(options: DialogAnimationOptions = {}) {
  const {
    contentSelector = '.dialog-content',
    duration = 200,
    easing = 'cubicBezier(0.16, 1, 0.3, 1)',
    initialScale = 0.2,
  } = options;

  // 保存鼠标点击位置
  const savedMousePosition: { x: number, y: number } = {
    x: -1,
    y: -1
  };

  // 应用从鼠标位置展开的动画
  function applyOpenAnimation() {


    // 保存鼠标位置
    savedMousePosition.x = x.value;
    savedMousePosition.y = y.value;

    const elements = document.querySelectorAll(contentSelector);

    const element = elements[elements.length - 1] as HTMLElement;
    if (!element) return;

    const mouseX = savedMousePosition.x;
    const mouseY = savedMousePosition.y;

    // 获取元素的尺寸
    const rect = element.getBoundingClientRect();
    const elementWidth = rect.width;
    const elementHeight = rect.height;

    // 计算初始位置（以鼠标位置为中心）
    const initialX = mouseX - elementWidth / 2;
    const initialY = mouseY - elementHeight / 2;

    // 计算屏幕中心位置（目标位置）
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;

    // 计算从鼠标位置到屏幕中心的偏移量
    const deltaX = viewportCenterX - rect.width / 2;
    const deltaY = viewportCenterY - rect.height / 2;

    // 禁用元素的默认动画和过渡
    element.style.animation = 'none';
    element.style.transition = 'none';

    // 使用anime.js创建动画
    return animate(element, {

      translateX: {
        from: initialX,
        to: deltaX,
      },
      translateY: {
        from: initialY,
        to: deltaY,
      },
      scale: {
        from: initialScale,
        to: 1,
      },
      opacity: {
        from: 0,
        to: 1,
      },
      duration,
      easing,
      complete: function () {
        // 动画完成后恢复原始样式
        element.style.transform = '';
        element.style.opacity = '';
      }
    });
  }
  // 辅助函数：获取元素当前的transform值
  function getCurrentTransform(element: HTMLElement) {
    const style = window.getComputedStyle(element);
    const matrix = new DOMMatrixReadOnly(style.transform);
    return {
      x: matrix.m41,
      y: matrix.m42
    };
  }
  // 应用关闭动画函数
  function applyCloseAnimation() {
    if (savedMousePosition.x === -1 && savedMousePosition.y == -1) return;

    const elements = document.querySelectorAll(contentSelector);
    const element = elements[elements.length - 1] as HTMLElement;


    if (!element) return;

    const mouseX = savedMousePosition.x;
    const mouseY = savedMousePosition.y;


    // 获取元素的尺寸
    const rect = element.getBoundingClientRect();
    const elementWidth = rect.width;
    const elementHeight = rect.height;

    // 计算目标位置（鼠标点击位置）
    const targetX = mouseX - elementWidth / 2;
    const targetY = mouseY - elementHeight / 2;

    // 获取当前transform值（考虑拖动后的位置）
    const currentTransform = getCurrentTransform(element);

    // 禁用元素的默认动画和过渡
    element.style.animation = 'none';
    element.style.transition = 'none';

    // 使用anime.js创建动画，从当前位置到鼠标点击位置
    return animate(element, {
      translateX: {
        from: currentTransform.x,
        to: targetX
      },
      translateY: {
        from: currentTransform.y,
        to: targetY
      },
      scale: 0,
      opacity: 0,
      duration,
      easing
    });
  }

  return {
    applyOpenAnimation,
    applyCloseAnimation
  };
}