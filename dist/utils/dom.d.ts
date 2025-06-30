export declare function addEventListener<K extends keyof HTMLElementEventMap>(target: HTMLElement | Document, eventType: K, callback: (e: HTMLElementEventMap[K]) => void, options?: boolean | AddEventListenerOptions): void;
export declare function addEventListener(target: HTMLElement | Document, eventType: string, callback: (e: Event) => void, options?: boolean | AddEventListenerOptions): void;
export declare function canUseDocElement(): boolean;
//# sourceMappingURL=dom.d.ts.map