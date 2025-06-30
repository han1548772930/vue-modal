import type { PropType, Plugin, Ref, VNode } from 'vue';
export type VueNode = VNode | string | number | boolean | null | undefined | void | VNode[];
export type Key = string | number;
export type Data = Record<string, unknown>;
export declare const withInstall: <T extends Record<string, any>>(comp: T) => T & Plugin;
export type MaybeRef<T> = T | Ref<T>;
export declare function eventType<T>(): {
    type: PropType<T | T[]>;
};
export declare function objectType<T = {}>(defaultVal?: T): {
    type: PropType<T>;
    default: T;
};
export declare function booleanType(defaultVal?: boolean): {
    type: BooleanConstructor;
    default: boolean;
};
export declare function functionType<T = () => {}>(defaultVal?: T): {
    type: PropType<T>;
    default: T;
};
export declare function anyType<T = any>(defaultVal?: T, required?: boolean): {
    default: T;
    type: PropType<T>;
};
export declare function vNodeType<T = VueNode>(): {
    type: PropType<T>;
};
export declare function arrayType<T extends any[]>(defaultVal?: T): {
    type: PropType<T>;
    default: T;
};
export declare function stringType<T extends string = string>(defaultVal?: T): {
    type: PropType<T>;
    default: T;
};
export type AnyObject = Record<PropertyKey, any>;
//# sourceMappingURL=types.d.ts.map