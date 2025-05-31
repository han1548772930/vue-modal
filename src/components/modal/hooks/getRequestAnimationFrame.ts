
const availablePrefixs: string[] = ['moz', 'ms', 'webkit'];

// 定义 RequestAnimationFrameFunction 类型
type RequestAnimationFrameFunction = (callback: FrameRequestCallback) => number;

function requestAnimationFramePolyfill(): RequestAnimationFrameFunction {
  let lastTime = 0;
  return function (callback: FrameRequestCallback): number {
    const currTime = new Date().getTime();
    const timeToCall = Math.max(0, 16 - (currTime - lastTime));
    const id = window.setTimeout(function () {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
}

export default function getRequestAnimationFrame(): RequestAnimationFrameFunction {
  if (typeof window === 'undefined') {
    return (): number => 0;
  }
  if (window.requestAnimationFrame) {
    // https://github.com/vuejs/vue/issues/4465
    return window.requestAnimationFrame.bind(window);
  }

  const prefix = availablePrefixs.filter(key => `${key}RequestAnimationFrame` in window)[0];

  return prefix
    ? (window as any)[`${prefix}RequestAnimationFrame`]
    : requestAnimationFramePolyfill();
}

export function cancelRequestAnimationFrame(id: number): void {
  if (typeof window === 'undefined') {
    return;
  }
  if (window.cancelAnimationFrame) {
    window.cancelAnimationFrame(id);
    return;
  }
  const prefix = availablePrefixs.filter(
    key => `${key}CancelAnimationFrame` in window || `${key}CancelRequestAnimationFrame` in window,
  )[0];

  if (prefix) {
    const func = (window as any)[`${prefix}CancelAnimationFrame`] ||
      (window as any)[`${prefix}CancelRequestAnimationFrame`];
    func.call(window, id);
  } else {
    clearTimeout(id);
  }
}
