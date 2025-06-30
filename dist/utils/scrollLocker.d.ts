declare class ScrollLocker {
    private static lockCount;
    private static originalBodyStyle;
    static lock(): void;
    static unlock(): void;
}
export declare function useScrollLocker(shouldLock: () => boolean): {
    lock: () => void;
    unlock: () => void;
    isLocked: boolean;
};
export declare function useModalScrollLocker(visible: () => boolean): {
    lock: () => void;
    unlock: () => void;
};
export default ScrollLocker;
//# sourceMappingURL=scrollLocker.d.ts.map