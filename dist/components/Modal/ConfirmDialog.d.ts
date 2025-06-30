import type { VueNode } from '../../utils/types';
declare const _default: import("vue").DefineComponent<{
    afterClose?: (() => void) | undefined;
    close?: ((...args: any[]) => void) | undefined;
    autoFocusButton?: null | "ok" | "cancel" | undefined;
    rootPrefixCls: string;
    iconPrefixCls?: string | undefined;
    prefixCls?: string | undefined;
    class?: string | undefined;
    open?: boolean | undefined;
    title?: string | number | boolean | void | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[] | (() => VueNode) | null;
    footer?: string | number | boolean | void | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[] | (() => VueNode) | null;
    closable?: boolean | undefined;
    content?: string | number | boolean | void | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[] | (() => VueNode) | null;
    onOk?: ((...args: any[]) => any) | undefined;
    onCancel?: ((...args: any[]) => any) | undefined;
    okButtonProps?: import("./types").ButtonProps | undefined;
    cancelButtonProps?: import("./types").ButtonProps | undefined;
    centered?: boolean | undefined;
    width?: string | number | undefined;
    okText?: string | number | boolean | void | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[] | (() => VueNode) | null;
    okType?: ("link" | "default" | "primary" | "ghost" | "dashed" | "text" | "danger") | undefined;
    cancelText?: string | number | boolean | void | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[] | (() => VueNode) | null;
    icon?: string | number | boolean | void | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[] | (() => VueNode) | null;
    wrapClassName?: String | undefined;
    mask?: boolean | undefined;
    maskClosable?: boolean | undefined;
    zIndex?: number | undefined;
    okCancel?: boolean | undefined;
    style?: (import("vue").CSSProperties | string) | undefined;
    maskStyle?: import("vue").CSSProperties | undefined;
    type?: "info" | "success" | "error" | "warn" | "warning" | "confirm" | undefined;
    keyboard?: boolean | undefined;
    getContainer?: (string | HTMLElement | (() => HTMLElement) | false | null) | undefined;
    transitionName?: string | undefined;
    maskTransitionName?: string | undefined;
    bodyStyle?: import("vue").CSSProperties | undefined;
    closeIcon?: string | number | boolean | void | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[] | (() => VueNode) | null;
    modalRender?: ((arg: {
        originVNode: VueNode;
    }) => VueNode) | undefined;
    focusTriggerAfterClose?: boolean | undefined;
    appContext?: any;
    visible?: boolean | undefined;
    mousePosition?: ({
        x: number;
        y: number;
    } | null) | undefined;
}, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{
    afterClose?: (() => void) | undefined;
    close?: ((...args: any[]) => void) | undefined;
    autoFocusButton?: null | "ok" | "cancel" | undefined;
    rootPrefixCls: string;
    iconPrefixCls?: string | undefined;
    prefixCls?: string | undefined;
    class?: string | undefined;
    open?: boolean | undefined;
    title?: string | number | boolean | void | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[] | (() => VueNode) | null;
    footer?: string | number | boolean | void | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[] | (() => VueNode) | null;
    closable?: boolean | undefined;
    content?: string | number | boolean | void | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[] | (() => VueNode) | null;
    onOk?: ((...args: any[]) => any) | undefined;
    onCancel?: ((...args: any[]) => any) | undefined;
    okButtonProps?: import("./types").ButtonProps | undefined;
    cancelButtonProps?: import("./types").ButtonProps | undefined;
    centered?: boolean | undefined;
    width?: string | number | undefined;
    okText?: string | number | boolean | void | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[] | (() => VueNode) | null;
    okType?: ("link" | "default" | "primary" | "ghost" | "dashed" | "text" | "danger") | undefined;
    cancelText?: string | number | boolean | void | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[] | (() => VueNode) | null;
    icon?: string | number | boolean | void | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[] | (() => VueNode) | null;
    wrapClassName?: String | undefined;
    mask?: boolean | undefined;
    maskClosable?: boolean | undefined;
    zIndex?: number | undefined;
    okCancel?: boolean | undefined;
    style?: (import("vue").CSSProperties | string) | undefined;
    maskStyle?: import("vue").CSSProperties | undefined;
    type?: "info" | "success" | "error" | "warn" | "warning" | "confirm" | undefined;
    keyboard?: boolean | undefined;
    getContainer?: (string | HTMLElement | (() => HTMLElement) | false | null) | undefined;
    transitionName?: string | undefined;
    maskTransitionName?: string | undefined;
    bodyStyle?: import("vue").CSSProperties | undefined;
    closeIcon?: string | number | boolean | void | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>[] | (() => VueNode) | null;
    modalRender?: ((arg: {
        originVNode: VueNode;
    }) => VueNode) | undefined;
    focusTriggerAfterClose?: boolean | undefined;
    appContext?: any;
    visible?: boolean | undefined;
    mousePosition?: ({
        x: number;
        y: number;
    } | null) | undefined;
}> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
//# sourceMappingURL=ConfirmDialog.d.ts.map