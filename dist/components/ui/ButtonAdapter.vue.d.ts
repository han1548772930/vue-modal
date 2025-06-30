interface LegacyButtonProps {
    type?: 'link' | 'default' | 'primary' | 'ghost' | 'dashed' | 'text';
    danger?: boolean;
    ghost?: boolean;
    loading?: boolean | {
        delay?: number;
    };
    disabled?: boolean;
    block?: boolean;
    htmlType?: 'button' | 'submit' | 'reset';
    href?: string;
    target?: string;
    title?: string;
    icon?: any;
}
declare var __VLS_19: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_19) => any;
};
declare const __VLS_component: import("vue").DefineComponent<LegacyButtonProps, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (event: MouseEvent) => any;
    mousedown: (event: MouseEvent) => any;
}, string, import("vue").PublicProps, Readonly<LegacyButtonProps> & Readonly<{
    onClick?: ((event: MouseEvent) => any) | undefined;
    onMousedown?: ((event: MouseEvent) => any) | undefined;
}>, {
    ghost: boolean;
    danger: boolean;
    type: "link" | "default" | "primary" | "ghost" | "dashed" | "text";
    block: boolean;
    disabled: boolean;
    loading: boolean | {
        delay?: number;
    };
    htmlType: "button" | "submit" | "reset";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
//# sourceMappingURL=ButtonAdapter.vue.d.ts.map