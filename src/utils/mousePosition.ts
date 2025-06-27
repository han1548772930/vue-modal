import { addEventListener, canUseDocElement } from './dom';

type MousePosition = { x: number; y: number } | null;

let mousePosition: MousePosition = null;

// ref: https://github.com/ant-design/ant-design/issues/15795
const getClickPosition = (e: MouseEvent) => {
  mousePosition = {
    x: e.pageX,
    y: e.pageY,
  };
  // 100ms 内发生过点击事件，则从点击位置动画展示
  // 否则直接 zoom 展示
  // 这样可以兼容非点击方式展开
  setTimeout(() => (mousePosition = null), 100);
};

// 只有点击事件支持从鼠标位置动画展开
if (canUseDocElement()) {
  addEventListener(document.documentElement, 'click', getClickPosition, true);
}

export const getMousePosition = () => mousePosition;

export type { MousePosition };
