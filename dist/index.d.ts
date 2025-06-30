import type { App } from 'vue';
declare const SimpleModal: ({
    new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
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
        title: import("vue").PropType<import("./utils/types").VueNode>;
        closable: {
            type: BooleanConstructor;
            default: undefined;
        };
        closeIcon: import("vue").PropType<import("./utils/types").VueNode>;
        onOk: import("vue").PropType<(e: MouseEvent) => void>;
        onCancel: import("vue").PropType<(e: MouseEvent) => void>;
        'onUpdate:visible': import("vue").PropType<(visible: boolean) => void>;
        'onUpdate:open': import("vue").PropType<(open: boolean) => void>;
        onChange: import("vue").PropType<(open: boolean) => void>;
        afterClose: import("vue").PropType<() => void>;
        centered: {
            type: BooleanConstructor;
            default: undefined;
        };
        width: (StringConstructor | NumberConstructor)[];
        footer: import("vue").PropType<import("./utils/types").VueNode>;
        okText: import("vue").PropType<import("./utils/types").VueNode>;
        okType: import("vue").PropType<"link" | "default" | "primary" | "ghost" | "dashed" | "text" | "danger">;
        cancelText: import("vue").PropType<import("./utils/types").VueNode>;
        icon: import("vue").PropType<import("./utils/types").VueNode>;
        maskClosable: {
            type: BooleanConstructor;
            default: undefined;
        };
        forceRender: {
            type: BooleanConstructor;
            default: undefined;
        };
        okButtonProps: {
            type: import("vue").PropType<import("./components/Modal").ButtonProps>;
            default: import("./components/Modal").ButtonProps;
        };
        cancelButtonProps: {
            type: import("vue").PropType<import("./components/Modal").ButtonProps>;
            default: import("./components/Modal").ButtonProps;
        };
        destroyOnClose: {
            type: BooleanConstructor;
            default: undefined;
        };
        wrapClassName: StringConstructor;
        maskTransitionName: StringConstructor;
        transitionName: StringConstructor;
        getContainer: {
            type: import("vue").PropType<string | HTMLElement | (() => HTMLElement) | false>;
            default: undefined;
        };
        zIndex: NumberConstructor;
        bodyStyle: {
            type: import("vue").PropType<import("vue").CSSProperties>;
            default: import("vue").CSSProperties;
        };
        maskStyle: {
            type: import("vue").PropType<import("vue").CSSProperties>;
            default: import("vue").CSSProperties;
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
        modalRender: import("vue").PropType<(arg: {
            originVNode: import("./utils/types").VueNode;
        }) => import("./utils/types").VueNode>;
        mousePosition: {
            type: import("vue").PropType<{
                x: number;
                y: number;
            } | null>;
            default: {
                x: number;
                y: number;
            } | null;
        };
    }>> & Readonly<{}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {
        visible: boolean;
        open: boolean;
        confirmLoading: boolean;
        closable: boolean;
        centered: boolean;
        maskClosable: boolean;
        forceRender: boolean;
        okButtonProps: import("./components/Modal").ButtonProps;
        cancelButtonProps: import("./components/Modal").ButtonProps;
        destroyOnClose: boolean;
        getContainer: string | false | HTMLElement | (() => HTMLElement);
        bodyStyle: import("vue").CSSProperties;
        maskStyle: import("vue").CSSProperties;
        mask: boolean;
        keyboard: boolean;
        focusTriggerAfterClose: boolean;
        mousePosition: {
            x: number;
            y: number;
        } | null;
    }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
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
        title: import("vue").PropType<import("./utils/types").VueNode>;
        closable: {
            type: BooleanConstructor;
            default: undefined;
        };
        closeIcon: import("vue").PropType<import("./utils/types").VueNode>;
        onOk: import("vue").PropType<(e: MouseEvent) => void>;
        onCancel: import("vue").PropType<(e: MouseEvent) => void>;
        'onUpdate:visible': import("vue").PropType<(visible: boolean) => void>;
        'onUpdate:open': import("vue").PropType<(open: boolean) => void>;
        onChange: import("vue").PropType<(open: boolean) => void>;
        afterClose: import("vue").PropType<() => void>;
        centered: {
            type: BooleanConstructor;
            default: undefined;
        };
        width: (StringConstructor | NumberConstructor)[];
        footer: import("vue").PropType<import("./utils/types").VueNode>;
        okText: import("vue").PropType<import("./utils/types").VueNode>;
        okType: import("vue").PropType<"link" | "default" | "primary" | "ghost" | "dashed" | "text" | "danger">;
        cancelText: import("vue").PropType<import("./utils/types").VueNode>;
        icon: import("vue").PropType<import("./utils/types").VueNode>;
        maskClosable: {
            type: BooleanConstructor;
            default: undefined;
        };
        forceRender: {
            type: BooleanConstructor;
            default: undefined;
        };
        okButtonProps: {
            type: import("vue").PropType<import("./components/Modal").ButtonProps>;
            default: import("./components/Modal").ButtonProps;
        };
        cancelButtonProps: {
            type: import("vue").PropType<import("./components/Modal").ButtonProps>;
            default: import("./components/Modal").ButtonProps;
        };
        destroyOnClose: {
            type: BooleanConstructor;
            default: undefined;
        };
        wrapClassName: StringConstructor;
        maskTransitionName: StringConstructor;
        transitionName: StringConstructor;
        getContainer: {
            type: import("vue").PropType<string | HTMLElement | (() => HTMLElement) | false>;
            default: undefined;
        };
        zIndex: NumberConstructor;
        bodyStyle: {
            type: import("vue").PropType<import("vue").CSSProperties>;
            default: import("vue").CSSProperties;
        };
        maskStyle: {
            type: import("vue").PropType<import("vue").CSSProperties>;
            default: import("vue").CSSProperties;
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
        modalRender: import("vue").PropType<(arg: {
            originVNode: import("./utils/types").VueNode;
        }) => import("./utils/types").VueNode>;
        mousePosition: {
            type: import("vue").PropType<{
                x: number;
                y: number;
            } | null>;
            default: {
                x: number;
                y: number;
            } | null;
        };
    }>> & Readonly<{}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, {
        visible: boolean;
        open: boolean;
        confirmLoading: boolean;
        closable: boolean;
        centered: boolean;
        maskClosable: boolean;
        forceRender: boolean;
        okButtonProps: import("./components/Modal").ButtonProps;
        cancelButtonProps: import("./components/Modal").ButtonProps;
        destroyOnClose: boolean;
        getContainer: string | false | HTMLElement | (() => HTMLElement);
        bodyStyle: import("vue").CSSProperties;
        maskStyle: import("vue").CSSProperties;
        mask: boolean;
        keyboard: boolean;
        focusTriggerAfterClose: boolean;
        mousePosition: {
            x: number;
            y: number;
        } | null;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
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
    title: import("vue").PropType<import("./utils/types").VueNode>;
    closable: {
        type: BooleanConstructor;
        default: undefined;
    };
    closeIcon: import("vue").PropType<import("./utils/types").VueNode>;
    onOk: import("vue").PropType<(e: MouseEvent) => void>;
    onCancel: import("vue").PropType<(e: MouseEvent) => void>;
    'onUpdate:visible': import("vue").PropType<(visible: boolean) => void>;
    'onUpdate:open': import("vue").PropType<(open: boolean) => void>;
    onChange: import("vue").PropType<(open: boolean) => void>;
    afterClose: import("vue").PropType<() => void>;
    centered: {
        type: BooleanConstructor;
        default: undefined;
    };
    width: (StringConstructor | NumberConstructor)[];
    footer: import("vue").PropType<import("./utils/types").VueNode>;
    okText: import("vue").PropType<import("./utils/types").VueNode>;
    okType: import("vue").PropType<"link" | "default" | "primary" | "ghost" | "dashed" | "text" | "danger">;
    cancelText: import("vue").PropType<import("./utils/types").VueNode>;
    icon: import("vue").PropType<import("./utils/types").VueNode>;
    maskClosable: {
        type: BooleanConstructor;
        default: undefined;
    };
    forceRender: {
        type: BooleanConstructor;
        default: undefined;
    };
    okButtonProps: {
        type: import("vue").PropType<import("./components/Modal").ButtonProps>;
        default: import("./components/Modal").ButtonProps;
    };
    cancelButtonProps: {
        type: import("vue").PropType<import("./components/Modal").ButtonProps>;
        default: import("./components/Modal").ButtonProps;
    };
    destroyOnClose: {
        type: BooleanConstructor;
        default: undefined;
    };
    wrapClassName: StringConstructor;
    maskTransitionName: StringConstructor;
    transitionName: StringConstructor;
    getContainer: {
        type: import("vue").PropType<string | HTMLElement | (() => HTMLElement) | false>;
        default: undefined;
    };
    zIndex: NumberConstructor;
    bodyStyle: {
        type: import("vue").PropType<import("vue").CSSProperties>;
        default: import("vue").CSSProperties;
    };
    maskStyle: {
        type: import("vue").PropType<import("vue").CSSProperties>;
        default: import("vue").CSSProperties;
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
    modalRender: import("vue").PropType<(arg: {
        originVNode: import("./utils/types").VueNode;
    }) => import("./utils/types").VueNode>;
    mousePosition: {
        type: import("vue").PropType<{
            x: number;
            y: number;
        } | null>;
        default: {
            x: number;
            y: number;
        } | null;
    };
}>> & Readonly<{}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
    visible: boolean;
    open: boolean;
    confirmLoading: boolean;
    closable: boolean;
    centered: boolean;
    maskClosable: boolean;
    forceRender: boolean;
    okButtonProps: import("./components/Modal").ButtonProps;
    cancelButtonProps: import("./components/Modal").ButtonProps;
    destroyOnClose: boolean;
    getContainer: string | false | HTMLElement | (() => HTMLElement);
    bodyStyle: import("vue").CSSProperties;
    maskStyle: import("vue").CSSProperties;
    mask: boolean;
    keyboard: boolean;
    focusTriggerAfterClose: boolean;
    mousePosition: {
        x: number;
        y: number;
    } | null;
}, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & (import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (import("vue").Plugin & {
    readonly info: import("./components/Modal/types").ModalFunc;
    readonly success: import("./components/Modal/types").ModalFunc;
    readonly error: import("./components/Modal/types").ModalFunc;
    readonly warn: import("./components/Modal/types").ModalFunc;
    readonly warning: import("./components/Modal/types").ModalFunc;
    readonly confirm: import("./components/Modal/types").ModalFunc;
    readonly destroyAll: () => void;
    readonly useModal: typeof import(".").useModal;
}))) & import("vue").Plugin;
export { SimpleModal as Modal };
export { default as useModal } from './components/Modal/useModal';
export type { ModalProps, ModalFuncProps } from './components/Modal/types';
declare const _default: {
    Modal: ({
        new (...args: any[]): import("vue").CreateComponentPublicInstanceWithMixins<Readonly<import("vue").ExtractPropTypes<{
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
            title: import("vue").PropType<import("./utils/types").VueNode>;
            closable: {
                type: BooleanConstructor;
                default: undefined;
            };
            closeIcon: import("vue").PropType<import("./utils/types").VueNode>;
            onOk: import("vue").PropType<(e: MouseEvent) => void>;
            onCancel: import("vue").PropType<(e: MouseEvent) => void>;
            'onUpdate:visible': import("vue").PropType<(visible: boolean) => void>;
            'onUpdate:open': import("vue").PropType<(open: boolean) => void>;
            onChange: import("vue").PropType<(open: boolean) => void>;
            afterClose: import("vue").PropType<() => void>;
            centered: {
                type: BooleanConstructor;
                default: undefined;
            };
            width: (StringConstructor | NumberConstructor)[];
            footer: import("vue").PropType<import("./utils/types").VueNode>;
            okText: import("vue").PropType<import("./utils/types").VueNode>;
            okType: import("vue").PropType<"link" | "default" | "primary" | "ghost" | "dashed" | "text" | "danger">;
            cancelText: import("vue").PropType<import("./utils/types").VueNode>;
            icon: import("vue").PropType<import("./utils/types").VueNode>;
            maskClosable: {
                type: BooleanConstructor;
                default: undefined;
            };
            forceRender: {
                type: BooleanConstructor;
                default: undefined;
            };
            okButtonProps: {
                type: import("vue").PropType<import("./components/Modal").ButtonProps>;
                default: import("./components/Modal").ButtonProps;
            };
            cancelButtonProps: {
                type: import("vue").PropType<import("./components/Modal").ButtonProps>;
                default: import("./components/Modal").ButtonProps;
            };
            destroyOnClose: {
                type: BooleanConstructor;
                default: undefined;
            };
            wrapClassName: StringConstructor;
            maskTransitionName: StringConstructor;
            transitionName: StringConstructor;
            getContainer: {
                type: import("vue").PropType<string | HTMLElement | (() => HTMLElement) | false>;
                default: undefined;
            };
            zIndex: NumberConstructor;
            bodyStyle: {
                type: import("vue").PropType<import("vue").CSSProperties>;
                default: import("vue").CSSProperties;
            };
            maskStyle: {
                type: import("vue").PropType<import("vue").CSSProperties>;
                default: import("vue").CSSProperties;
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
            modalRender: import("vue").PropType<(arg: {
                originVNode: import("./utils/types").VueNode;
            }) => import("./utils/types").VueNode>;
            mousePosition: {
                type: import("vue").PropType<{
                    x: number;
                    y: number;
                } | null>;
                default: {
                    x: number;
                    y: number;
                } | null;
            };
        }>> & Readonly<{}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").PublicProps, {
            visible: boolean;
            open: boolean;
            confirmLoading: boolean;
            closable: boolean;
            centered: boolean;
            maskClosable: boolean;
            forceRender: boolean;
            okButtonProps: import("./components/Modal").ButtonProps;
            cancelButtonProps: import("./components/Modal").ButtonProps;
            destroyOnClose: boolean;
            getContainer: string | false | HTMLElement | (() => HTMLElement);
            bodyStyle: import("vue").CSSProperties;
            maskStyle: import("vue").CSSProperties;
            mask: boolean;
            keyboard: boolean;
            focusTriggerAfterClose: boolean;
            mousePosition: {
                x: number;
                y: number;
            } | null;
        }, true, {}, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, {}, any, import("vue").ComponentProvideOptions, {
            P: {};
            B: {};
            D: {};
            C: {};
            M: {};
            Defaults: {};
        }, Readonly<import("vue").ExtractPropTypes<{
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
            title: import("vue").PropType<import("./utils/types").VueNode>;
            closable: {
                type: BooleanConstructor;
                default: undefined;
            };
            closeIcon: import("vue").PropType<import("./utils/types").VueNode>;
            onOk: import("vue").PropType<(e: MouseEvent) => void>;
            onCancel: import("vue").PropType<(e: MouseEvent) => void>;
            'onUpdate:visible': import("vue").PropType<(visible: boolean) => void>;
            'onUpdate:open': import("vue").PropType<(open: boolean) => void>;
            onChange: import("vue").PropType<(open: boolean) => void>;
            afterClose: import("vue").PropType<() => void>;
            centered: {
                type: BooleanConstructor;
                default: undefined;
            };
            width: (StringConstructor | NumberConstructor)[];
            footer: import("vue").PropType<import("./utils/types").VueNode>;
            okText: import("vue").PropType<import("./utils/types").VueNode>;
            okType: import("vue").PropType<"link" | "default" | "primary" | "ghost" | "dashed" | "text" | "danger">;
            cancelText: import("vue").PropType<import("./utils/types").VueNode>;
            icon: import("vue").PropType<import("./utils/types").VueNode>;
            maskClosable: {
                type: BooleanConstructor;
                default: undefined;
            };
            forceRender: {
                type: BooleanConstructor;
                default: undefined;
            };
            okButtonProps: {
                type: import("vue").PropType<import("./components/Modal").ButtonProps>;
                default: import("./components/Modal").ButtonProps;
            };
            cancelButtonProps: {
                type: import("vue").PropType<import("./components/Modal").ButtonProps>;
                default: import("./components/Modal").ButtonProps;
            };
            destroyOnClose: {
                type: BooleanConstructor;
                default: undefined;
            };
            wrapClassName: StringConstructor;
            maskTransitionName: StringConstructor;
            transitionName: StringConstructor;
            getContainer: {
                type: import("vue").PropType<string | HTMLElement | (() => HTMLElement) | false>;
                default: undefined;
            };
            zIndex: NumberConstructor;
            bodyStyle: {
                type: import("vue").PropType<import("vue").CSSProperties>;
                default: import("vue").CSSProperties;
            };
            maskStyle: {
                type: import("vue").PropType<import("vue").CSSProperties>;
                default: import("vue").CSSProperties;
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
            modalRender: import("vue").PropType<(arg: {
                originVNode: import("./utils/types").VueNode;
            }) => import("./utils/types").VueNode>;
            mousePosition: {
                type: import("vue").PropType<{
                    x: number;
                    y: number;
                } | null>;
                default: {
                    x: number;
                    y: number;
                } | null;
            };
        }>> & Readonly<{}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, {
            visible: boolean;
            open: boolean;
            confirmLoading: boolean;
            closable: boolean;
            centered: boolean;
            maskClosable: boolean;
            forceRender: boolean;
            okButtonProps: import("./components/Modal").ButtonProps;
            cancelButtonProps: import("./components/Modal").ButtonProps;
            destroyOnClose: boolean;
            getContainer: string | false | HTMLElement | (() => HTMLElement);
            bodyStyle: import("vue").CSSProperties;
            maskStyle: import("vue").CSSProperties;
            mask: boolean;
            keyboard: boolean;
            focusTriggerAfterClose: boolean;
            mousePosition: {
                x: number;
                y: number;
            } | null;
        }>;
        __isFragment?: never;
        __isTeleport?: never;
        __isSuspense?: never;
    } & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
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
        title: import("vue").PropType<import("./utils/types").VueNode>;
        closable: {
            type: BooleanConstructor;
            default: undefined;
        };
        closeIcon: import("vue").PropType<import("./utils/types").VueNode>;
        onOk: import("vue").PropType<(e: MouseEvent) => void>;
        onCancel: import("vue").PropType<(e: MouseEvent) => void>;
        'onUpdate:visible': import("vue").PropType<(visible: boolean) => void>;
        'onUpdate:open': import("vue").PropType<(open: boolean) => void>;
        onChange: import("vue").PropType<(open: boolean) => void>;
        afterClose: import("vue").PropType<() => void>;
        centered: {
            type: BooleanConstructor;
            default: undefined;
        };
        width: (StringConstructor | NumberConstructor)[];
        footer: import("vue").PropType<import("./utils/types").VueNode>;
        okText: import("vue").PropType<import("./utils/types").VueNode>;
        okType: import("vue").PropType<"link" | "default" | "primary" | "ghost" | "dashed" | "text" | "danger">;
        cancelText: import("vue").PropType<import("./utils/types").VueNode>;
        icon: import("vue").PropType<import("./utils/types").VueNode>;
        maskClosable: {
            type: BooleanConstructor;
            default: undefined;
        };
        forceRender: {
            type: BooleanConstructor;
            default: undefined;
        };
        okButtonProps: {
            type: import("vue").PropType<import("./components/Modal").ButtonProps>;
            default: import("./components/Modal").ButtonProps;
        };
        cancelButtonProps: {
            type: import("vue").PropType<import("./components/Modal").ButtonProps>;
            default: import("./components/Modal").ButtonProps;
        };
        destroyOnClose: {
            type: BooleanConstructor;
            default: undefined;
        };
        wrapClassName: StringConstructor;
        maskTransitionName: StringConstructor;
        transitionName: StringConstructor;
        getContainer: {
            type: import("vue").PropType<string | HTMLElement | (() => HTMLElement) | false>;
            default: undefined;
        };
        zIndex: NumberConstructor;
        bodyStyle: {
            type: import("vue").PropType<import("vue").CSSProperties>;
            default: import("vue").CSSProperties;
        };
        maskStyle: {
            type: import("vue").PropType<import("vue").CSSProperties>;
            default: import("vue").CSSProperties;
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
        modalRender: import("vue").PropType<(arg: {
            originVNode: import("./utils/types").VueNode;
        }) => import("./utils/types").VueNode>;
        mousePosition: {
            type: import("vue").PropType<{
                x: number;
                y: number;
            } | null>;
            default: {
                x: number;
                y: number;
            } | null;
        };
    }>> & Readonly<{}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
        visible: boolean;
        open: boolean;
        confirmLoading: boolean;
        closable: boolean;
        centered: boolean;
        maskClosable: boolean;
        forceRender: boolean;
        okButtonProps: import("./components/Modal").ButtonProps;
        cancelButtonProps: import("./components/Modal").ButtonProps;
        destroyOnClose: boolean;
        getContainer: string | false | HTMLElement | (() => HTMLElement);
        bodyStyle: import("vue").CSSProperties;
        maskStyle: import("vue").CSSProperties;
        mask: boolean;
        keyboard: boolean;
        focusTriggerAfterClose: boolean;
        mousePosition: {
            x: number;
            y: number;
        } | null;
    }, {}, string, {}, import("vue").GlobalComponents, import("vue").GlobalDirectives, string, import("vue").ComponentProvideOptions> & import("vue").VNodeProps & (import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (import("vue").Plugin & {
        readonly info: import("./components/Modal/types").ModalFunc;
        readonly success: import("./components/Modal/types").ModalFunc;
        readonly error: import("./components/Modal/types").ModalFunc;
        readonly warn: import("./components/Modal/types").ModalFunc;
        readonly warning: import("./components/Modal/types").ModalFunc;
        readonly confirm: import("./components/Modal/types").ModalFunc;
        readonly destroyAll: () => void;
        readonly useModal: typeof import(".").useModal;
    }))) & import("vue").Plugin;
    install(app: App): App<any>;
};
export default _default;
//# sourceMappingURL=index.d.ts.map