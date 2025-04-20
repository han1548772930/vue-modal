import { cloneVNode, render as vueRender } from 'vue';
import type { CSSProperties, HTMLAttributes, VNode } from 'vue';

declare type VNodeChildAtom = VNode | string | number | boolean | null | undefined | void;
export type VueNode = VNodeChildAtom | VNodeChildAtom[] | VNode;

export function omit<T extends object, K extends keyof T>(obj: T, fields: K[]): Omit<T, K> {
  // eslint-disable-next-line prefer-object-spread
  const shallowCopy = Object.assign({}, obj);
  for (let i = 0; i < fields.length; i += 1) {
    const key = fields[i];
    delete shallowCopy[key];
  }
  return shallowCopy;
}
export interface ModalFuncProps {
  class?: HTMLAttributes['class'];
  title?: string | (() => VueNode) | VueNode;
  footer?: string | (() => VueNode) | VueNode;
  content?: string | (() => VueNode) | VueNode;
  description?: string | (() => VueNode) | VueNode;
  onOk?: (...args: any[]) => any;
  onCancel?: (...args: any[]) => any;
  width?: string;
  okText?: string | (() => VueNode) | VueNode;
  cancelText?: string | (() => VueNode) | VueNode;
  type?: 'info' | 'success' | 'error' | 'warn' | 'warning' | 'confirm';
  bodyStyle?: CSSProperties;
  close?: Function
  closable?: boolean
  open?: boolean
  isMousePosition?:boolean;
  dataId?: string | number;
}



export type ModalFunc = (props: ModalFuncProps) => {
  destroy: () => void;
  update: (newConfig: ModalFuncProps) => void;
};



export function triggerVNodeUpdate(vm: VNode, attrs: Record<string, any>, dom: any) {
  vueRender(cloneVNode(vm, { ...attrs }), dom);
}

export type ConfigUpdate = ModalFuncProps | ((prevConfig: ModalFuncProps) => ModalFuncProps);
export type ModalStaticFunctions<T = ModalFunc> = Record<NonNullable<ModalFuncProps['type']>, T>;