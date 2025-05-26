import getRequestAnimationFrame, {
  cancelRequestAnimationFrame as caf,
} from './getRequestAnimationFrame';
const raf = getRequestAnimationFrame();

// 定义 AnimationFrame 类型接口
interface AnimationFrame {
  id: number;
}

// 使用正确的类型定义
export const cancelAnimationTimeout = (frame: AnimationFrame): void => caf(frame.id);

export const requestAnimationTimeout = (callback: () => void, delay: number = 0): AnimationFrame => {
  const start = Date.now();

  function timeout(): void {
    if (Date.now() - start >= delay) {
      callback();
    } else {
      frame.id = raf(timeout);
    }
  }

  const frame: AnimationFrame = {
    id: raf(timeout),
  };

  return frame;
};