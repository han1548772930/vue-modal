import type { ExtractPropTypes, CSSProperties, PropType } from 'vue';
import type { VueNode } from '../../utils/types';
type ButtonType = 'link' | 'default' | 'primary' | 'ghost' | 'dashed' | 'text' | 'danger';
export interface ButtonProps {
    [key: string]: any;
}
type MousePosition = {
    x: number;
    y: number;
} | null;
export declare const modalProps: () => {
    prefixCls: StringConstructor;
    /** @deprecated Please use `open` instead. */
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
    okType: PropType<ButtonType>;
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
        type: PropType<ButtonProps>;
        default: ButtonProps;
    };
    cancelButtonProps: {
        type: PropType<ButtonProps>;
        default: ButtonProps;
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
        type: PropType<MousePosition>;
        default: MousePosition;
    };
};
export type ModalProps = Partial<ExtractPropTypes<ReturnType<typeof modalProps>>>;
export interface ModalFuncProps {
    prefixCls?: string;
    class?: string;
    open?: boolean;
    title?: string | (() => VueNode) | VueNode;
    footer?: string | (() => VueNode) | VueNode;
    closable?: boolean;
    content?: string | (() => VueNode) | VueNode;
    onOk?: (...args: any[]) => any;
    onCancel?: (...args: any[]) => any;
    afterClose?: () => void;
    okButtonProps?: ButtonProps;
    cancelButtonProps?: ButtonProps;
    centered?: boolean;
    width?: string | number;
    okText?: string | (() => VueNode) | VueNode;
    okType?: ButtonType;
    cancelText?: string | (() => VueNode) | VueNode;
    icon?: (() => VueNode) | VueNode;
    wrapClassName?: String;
    mask?: boolean;
    maskClosable?: boolean;
    zIndex?: number;
    okCancel?: boolean;
    style?: CSSProperties | string;
    maskStyle?: CSSProperties;
    type?: 'info' | 'success' | 'error' | 'warn' | 'warning' | 'confirm';
    keyboard?: boolean;
    getContainer?: string | HTMLElement | (() => HTMLElement) | false | null;
    autoFocusButton?: null | 'ok' | 'cancel';
    transitionName?: string;
    maskTransitionName?: string;
    bodyStyle?: CSSProperties;
    closeIcon?: string | (() => VueNode) | VueNode;
    modalRender?: (arg: {
        originVNode: VueNode;
    }) => VueNode;
    focusTriggerAfterClose?: boolean;
    appContext?: any;
    /** @deprecated please use `open` instead */
    visible?: boolean;
    mousePosition?: MousePosition;
}
export type ModalFunc = (props: ModalFuncProps) => {
    destroy: () => void;
    update: (newConfig: ModalFuncProps) => void;
};
export {};
//# sourceMappingURL=types.d.ts.map