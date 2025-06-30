import type { CSSProperties, PropType } from 'vue';
import type { VueNode } from '../../utils/types';
export declare const dialogProps: () => {
    prefixCls: StringConstructor;
    class: StringConstructor;
    style: {
        type: PropType<CSSProperties>;
        default: CSSProperties;
    };
    rootClassName: StringConstructor;
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    destroyOnClose: {
        type: BooleanConstructor;
        default: boolean;
    };
    forceRender: {
        type: BooleanConstructor;
        default: boolean;
    };
    getContainer: {
        type: PropType<string | HTMLElement | (() => HTMLElement) | false>;
        default: undefined;
    };
    wrapClassName: StringConstructor;
    wrapStyle: {
        type: PropType<CSSProperties>;
        default: CSSProperties;
    };
    zIndex: NumberConstructor;
    mask: {
        type: BooleanConstructor;
        default: boolean;
    };
    maskClosable: {
        type: BooleanConstructor;
        default: boolean;
    };
    maskStyle: {
        type: PropType<CSSProperties>;
        default: CSSProperties;
    };
    maskProps: ObjectConstructor;
    keyboard: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: PropType<VueNode>;
    footer: PropType<VueNode>;
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeIcon: PropType<VueNode>;
    focusTriggerAfterClose: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: (StringConstructor | NumberConstructor)[];
    height: (StringConstructor | NumberConstructor)[];
    centered: {
        type: BooleanConstructor;
        default: boolean;
    };
    transitionName: StringConstructor;
    maskTransitionName: StringConstructor;
    animation: StringConstructor;
    maskAnimation: StringConstructor;
    mousePosition: {
        type: PropType<{
            x: number;
            y: number;
        }>;
        default: {
            x: number;
            y: number;
        };
    };
    onClose: {
        type: PropType<(e?: MouseEvent) => void>;
        default: (e?: MouseEvent) => void;
    };
    afterClose: {
        type: PropType<() => void>;
        default: () => void;
    };
    modalRender: PropType<(arg: {
        originVNode: VueNode;
    }) => VueNode>;
};
//# sourceMappingURL=types.d.ts.map