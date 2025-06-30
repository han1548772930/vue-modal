import type { ExtractPropTypes, CSSProperties, PropType } from 'vue';
import type { VueNode } from '../../utils/types';
declare const _default: import("vue").DefineComponent<ExtractPropTypes<{
    prefixCls: StringConstructor;
    visible: {
        type: BooleanConstructor;
        default: undefined;
    };
    open: {
        type: BooleanConstructor;
        default: undefined;
    };
    confirmLoading: {
        type: BooleanConstructor;
        default: undefined;
    };
    title: PropType<VueNode>;
    closable: {
        type: BooleanConstructor;
        default: undefined;
    };
    closeIcon: PropType<VueNode>;
    onOk: PropType<(e: MouseEvent) => void>;
    onCancel: PropType<(e: MouseEvent) => void>;
    'onUpdate:visible': PropType<(visible: boolean) => void>;
    'onUpdate:open': PropType<(open: boolean) => void>;
    onChange: PropType<(open: boolean) => void>;
    afterClose: PropType<() => void>;
    centered: {
        type: BooleanConstructor;
        default: undefined;
    };
    width: (StringConstructor | NumberConstructor)[];
    footer: PropType<VueNode>;
    okText: PropType<VueNode>;
    okType: PropType<"link" | "default" | "primary" | "ghost" | "dashed" | "text" | "danger">;
    cancelText: PropType<VueNode>;
    icon: PropType<VueNode>;
    maskClosable: {
        type: BooleanConstructor;
        default: undefined;
    };
    forceRender: {
        type: BooleanConstructor;
        default: undefined;
    };
    okButtonProps: {
        type: PropType<import("./types").ButtonProps>;
        default: import("./types").ButtonProps;
    };
    cancelButtonProps: {
        type: PropType<import("./types").ButtonProps>;
        default: import("./types").ButtonProps;
    };
    destroyOnClose: {
        type: BooleanConstructor;
        default: undefined;
    };
    wrapClassName: StringConstructor;
    maskTransitionName: StringConstructor;
    transitionName: StringConstructor;
    getContainer: {
        type: PropType<string | HTMLElement | (() => HTMLElement) | false>;
        default: undefined;
    };
    zIndex: NumberConstructor;
    bodyStyle: {
        type: PropType<CSSProperties>;
        default: CSSProperties;
    };
    maskStyle: {
        type: PropType<CSSProperties>;
        default: CSSProperties;
    };
    mask: {
        type: BooleanConstructor;
        default: undefined;
    };
    keyboard: {
        type: BooleanConstructor;
        default: undefined;
    };
    wrapProps: ObjectConstructor;
    focusTriggerAfterClose: {
        type: BooleanConstructor;
        default: undefined;
    };
    modalRender: PropType<(arg: {
        originVNode: VueNode;
    }) => VueNode>;
    mousePosition: {
        type: PropType<{
            x: number;
            y: number;
        } | null>;
        default: {
            x: number;
            y: number;
        } | null;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<ExtractPropTypes<{
    prefixCls: StringConstructor;
    visible: {
        type: BooleanConstructor;
        default: undefined;
    };
    open: {
        type: BooleanConstructor;
        default: undefined;
    };
    confirmLoading: {
        type: BooleanConstructor;
        default: undefined;
    };
    title: PropType<VueNode>;
    closable: {
        type: BooleanConstructor;
        default: undefined;
    };
    closeIcon: PropType<VueNode>;
    onOk: PropType<(e: MouseEvent) => void>;
    onCancel: PropType<(e: MouseEvent) => void>;
    'onUpdate:visible': PropType<(visible: boolean) => void>;
    'onUpdate:open': PropType<(open: boolean) => void>;
    onChange: PropType<(open: boolean) => void>;
    afterClose: PropType<() => void>;
    centered: {
        type: BooleanConstructor;
        default: undefined;
    };
    width: (StringConstructor | NumberConstructor)[];
    footer: PropType<VueNode>;
    okText: PropType<VueNode>;
    okType: PropType<"link" | "default" | "primary" | "ghost" | "dashed" | "text" | "danger">;
    cancelText: PropType<VueNode>;
    icon: PropType<VueNode>;
    maskClosable: {
        type: BooleanConstructor;
        default: undefined;
    };
    forceRender: {
        type: BooleanConstructor;
        default: undefined;
    };
    okButtonProps: {
        type: PropType<import("./types").ButtonProps>;
        default: import("./types").ButtonProps;
    };
    cancelButtonProps: {
        type: PropType<import("./types").ButtonProps>;
        default: import("./types").ButtonProps;
    };
    destroyOnClose: {
        type: BooleanConstructor;
        default: undefined;
    };
    wrapClassName: StringConstructor;
    maskTransitionName: StringConstructor;
    transitionName: StringConstructor;
    getContainer: {
        type: PropType<string | HTMLElement | (() => HTMLElement) | false>;
        default: undefined;
    };
    zIndex: NumberConstructor;
    bodyStyle: {
        type: PropType<CSSProperties>;
        default: CSSProperties;
    };
    maskStyle: {
        type: PropType<CSSProperties>;
        default: CSSProperties;
    };
    mask: {
        type: BooleanConstructor;
        default: undefined;
    };
    keyboard: {
        type: BooleanConstructor;
        default: undefined;
    };
    wrapProps: ObjectConstructor;
    focusTriggerAfterClose: {
        type: BooleanConstructor;
        default: undefined;
    };
    modalRender: PropType<(arg: {
        originVNode: VueNode;
    }) => VueNode>;
    mousePosition: {
        type: PropType<{
            x: number;
            y: number;
        } | null>;
        default: {
            x: number;
            y: number;
        } | null;
    };
}>> & Readonly<{}>, {
    visible: boolean;
    open: boolean;
    confirmLoading: boolean;
    closable: boolean;
    centered: boolean;
    maskClosable: boolean;
    forceRender: boolean;
    okButtonProps: import("./types").ButtonProps;
    cancelButtonProps: import("./types").ButtonProps;
    destroyOnClose: boolean;
    getContainer: string | false | HTMLElement | (() => HTMLElement);
    bodyStyle: CSSProperties;
    maskStyle: CSSProperties;
    mask: boolean;
    keyboard: boolean;
    focusTriggerAfterClose: boolean;
    mousePosition: {
        x: number;
        y: number;
    } | null;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
//# sourceMappingURL=Modal.d.ts.map