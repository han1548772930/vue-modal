import type { ExtractPropTypes, CSSProperties, PropType } from 'vue';
import { objectType } from '../../utils/types';
import type { VueNode } from '../../utils/types';

// Define button types locally since we removed the old Button component
type ButtonType = 'link' | 'default' | 'primary' | 'ghost' | 'dashed' | 'text' | 'danger';

// Simple ButtonProps interface for compatibility
export interface ButtonProps {
  [key: string]: any;
}

type MousePosition = { x: number; y: number } | null;

export const modalProps = () => ({
  prefixCls: String,
  /** @deprecated Please use `open` instead. */
  visible: { type: Boolean, default: undefined },
  open: { type: Boolean, default: undefined },
  confirmLoading: { type: Boolean, default: undefined },
  title: [String, Object] as PropType<VueNode>,
  closable: { type: Boolean, default: undefined },
  closeIcon: [String, Object] as PropType<VueNode>,
  onOk: Function as PropType<(e: MouseEvent) => void>,
  onCancel: Function as PropType<(e: MouseEvent) => void>,
  'onUpdate:visible': Function as PropType<(visible: boolean) => void>,
  'onUpdate:open': Function as PropType<(open: boolean) => void>,
  onChange: Function as PropType<(open: boolean) => void>,
  afterClose: Function as PropType<() => void>,
  centered: { type: Boolean, default: undefined },
  width: [String, Number],
  footer: [String, Object] as PropType<VueNode>,
  okText: [String, Object] as PropType<VueNode>,
  okType: String as PropType<ButtonType>,
  cancelText: [String, Object] as PropType<VueNode>,
  icon: [String, Object] as PropType<VueNode>,
  maskClosable: { type: Boolean, default: undefined },
  forceRender: { type: Boolean, default: undefined },
  okButtonProps: objectType<ButtonProps>(),
  cancelButtonProps: objectType<ButtonProps>(),
  destroyOnClose: { type: Boolean, default: undefined },
  wrapClassName: String,
  maskTransitionName: String,
  transitionName: String,
  getContainer: {
    type: [String, Function, Boolean, Object] as PropType<
      string | HTMLElement | (() => HTMLElement) | false
    >,
    default: undefined,
  },
  zIndex: Number,
  style: {
    type: [Object, String] as PropType<CSSProperties | string>,
    default: undefined,
  },
  bodyStyle: objectType<CSSProperties>(),
  maskStyle: objectType<CSSProperties>(),
  mask: { type: Boolean, default: undefined },
  keyboard: { type: Boolean, default: undefined },
  wrapProps: Object,
  focusTriggerAfterClose: { type: Boolean, default: undefined },
  modalRender: Function as PropType<(arg: { originVNode: VueNode }) => VueNode>,
  mousePosition: objectType<MousePosition>(),
});

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
  modalRender?: (arg: { originVNode: VueNode }) => VueNode;
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
