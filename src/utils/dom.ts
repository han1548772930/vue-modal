export function addEventListener<K extends keyof HTMLElementEventMap>(
  target: HTMLElement | Document,
  eventType: K,
  callback: (e: HTMLElementEventMap[K]) => void,
  options?: boolean | AddEventListenerOptions
): void;
export function addEventListener(
  target: HTMLElement | Document,
  eventType: string,
  callback: (e: Event) => void,
  options?: boolean | AddEventListenerOptions
): void;
export function addEventListener(
  target: HTMLElement | Document,
  eventType: string,
  callback: (e: Event) => void,
  options?: boolean | AddEventListenerOptions
) {
  if (target.addEventListener) {
    target.addEventListener(eventType, callback, options);
  }
}

export function canUseDocElement(): boolean {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
}
