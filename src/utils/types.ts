import type { App, PropType, Plugin, Ref, VNode } from 'vue';

export type VueNode = VNode | string | number | boolean | null | undefined | void | VNode[];

export type Key = string | number;

export type Data = Record<string, unknown>;

export const withInstall = <T extends Record<string, any>>(comp: T) => {
  const c = comp as any;
  c.install = function (app: App) {
    app.component(c.displayName || c.name, comp as any);
  };
  return comp as T & Plugin;
};

export type MaybeRef<T> = T | Ref<T>;

export function eventType<T>() {
  return { type: [Function, Array] as PropType<T | T[]> };
}

export function objectType<T = {}>(defaultVal?: T) {
  return { type: Object as PropType<T>, default: defaultVal as T };
}

export function booleanType(defaultVal?: boolean) {
  return { type: Boolean, default: defaultVal as boolean };
}

export function functionType<T = () => {}>(defaultVal?: T) {
  return { type: Function as PropType<T>, default: defaultVal as T };
}

export function anyType<T = any>(defaultVal?: T, required?: boolean) {
  const type = { validator: () => true, default: defaultVal as T } as unknown;
  return required
    ? (type as {
      type: PropType<T>;
      default: T;
      required: true;
    })
    : (type as {
      default: T;
      type: PropType<T>;
    });
}

export function vNodeType<T = VueNode>() {
  return { validator: () => true } as unknown as { type: PropType<T> };
}

export function arrayType<T extends any[]>(defaultVal?: T) {
  return { type: Array as unknown as PropType<T>, default: defaultVal as T };
}

export function stringType<T extends string = string>(defaultVal?: T) {
  return { type: String as unknown as PropType<T>, default: defaultVal as T };
}

export type AnyObject = Record<PropertyKey, any>;
