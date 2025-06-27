import type { PropType } from 'vue';
import type { VueTypeValidableDef, VueTypeDef } from 'vue-types';

export const initDefaultProps = <T>(
  types: T,
  defaultProps: {
    [K in keyof T]?: T[K] extends VueTypeValidableDef<infer U>
    ? U
    : T[K] extends VueTypeDef<infer U>
    ? U
    : T[K] extends { type: PropType<infer U> }
    ? U
    : any;
  },
): T => {
  const propTypes: T = { ...types };
  Object.keys(defaultProps).forEach(k => {
    const prop = (propTypes as any)[k] as VueTypeValidableDef;
    if (prop) {
      if (prop.type || prop.default) {
        prop.default = (defaultProps as any)[k];
      } else if (prop.def) {
        prop.def((defaultProps as any)[k]);
      } else {
        (propTypes as any)[k] = { type: prop, default: (defaultProps as any)[k] };
      }
    } else {
      throw new Error(`not have ${k} prop`);
    }
  });
  return propTypes;
};

export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach(key => {
    delete result[key];
  });
  return result;
}
