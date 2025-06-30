declare const _default: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    prefixCls: StringConstructor;
    class: StringConstructor;
    style: {
        type: import("vue").PropType<import("vue").CSSProperties>;
        default: import("vue").CSSProperties;
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
        type: import("vue").PropType<string | HTMLElement | (() => HTMLElement) | false>;
        default: undefined;
    };
    wrapClassName: StringConstructor;
    wrapStyle: {
        type: import("vue").PropType<import("vue").CSSProperties>;
        default: import("vue").CSSProperties;
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
        type: import("vue").PropType<import("vue").CSSProperties>;
        default: import("vue").CSSProperties;
    };
    maskProps: ObjectConstructor;
    keyboard: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: import("vue").PropType<import("../../utils/types").VueNode>;
    footer: import("vue").PropType<import("../../utils/types").VueNode>;
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeIcon: import("vue").PropType<import("../../utils/types").VueNode>;
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
        type: import("vue").PropType<{
            x: number;
            y: number;
        }>;
        default: {
            x: number;
            y: number;
        };
    };
    onClose: {
        type: import("vue").PropType<(e?: MouseEvent) => void>;
        default: (e?: MouseEvent) => void;
    };
    afterClose: {
        type: import("vue").PropType<() => void>;
        default: () => void;
    };
    modalRender: import("vue").PropType<(arg: {
        originVNode: import("../../utils/types").VueNode;
    }) => import("../../utils/types").VueNode>;
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    prefixCls: StringConstructor;
    class: StringConstructor;
    style: {
        type: import("vue").PropType<import("vue").CSSProperties>;
        default: import("vue").CSSProperties;
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
        type: import("vue").PropType<string | HTMLElement | (() => HTMLElement) | false>;
        default: undefined;
    };
    wrapClassName: StringConstructor;
    wrapStyle: {
        type: import("vue").PropType<import("vue").CSSProperties>;
        default: import("vue").CSSProperties;
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
        type: import("vue").PropType<import("vue").CSSProperties>;
        default: import("vue").CSSProperties;
    };
    maskProps: ObjectConstructor;
    keyboard: {
        type: BooleanConstructor;
        default: boolean;
    };
    title: import("vue").PropType<import("../../utils/types").VueNode>;
    footer: import("vue").PropType<import("../../utils/types").VueNode>;
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeIcon: import("vue").PropType<import("../../utils/types").VueNode>;
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
        type: import("vue").PropType<{
            x: number;
            y: number;
        }>;
        default: {
            x: number;
            y: number;
        };
    };
    onClose: {
        type: import("vue").PropType<(e?: MouseEvent) => void>;
        default: (e?: MouseEvent) => void;
    };
    afterClose: {
        type: import("vue").PropType<() => void>;
        default: () => void;
    };
    modalRender: import("vue").PropType<(arg: {
        originVNode: import("../../utils/types").VueNode;
    }) => import("../../utils/types").VueNode>;
}>> & Readonly<{}>, {
    visible: boolean;
    closable: boolean;
    afterClose: () => void;
    centered: boolean;
    maskClosable: boolean;
    forceRender: boolean;
    destroyOnClose: boolean;
    getContainer: string | false | HTMLElement | (() => HTMLElement);
    maskStyle: import("vue").CSSProperties;
    mask: boolean;
    keyboard: boolean;
    focusTriggerAfterClose: boolean;
    mousePosition: {
        x: number;
        y: number;
    };
    style: import("vue").CSSProperties;
    wrapStyle: import("vue").CSSProperties;
    onClose: (e?: MouseEvent) => void;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
//# sourceMappingURL=Dialog.d.ts.map