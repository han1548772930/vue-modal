import type { PropType } from 'vue';
import type { VueTypeValidableDef, VueTypeDef } from 'vue-types';
export declare const initDefaultProps: <T>(types: T, defaultProps: { [K in keyof T]?: T[K] extends VueTypeValidableDef<infer U> ? U : T[K] extends VueTypeDef<infer U> ? U : T[K] extends {
    type: PropType<infer U>;
} ? U : any; }) => T;
export declare function omit<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>;
//# sourceMappingURL=props.d.ts.map