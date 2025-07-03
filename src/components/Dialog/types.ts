import type { CSSProperties, PropType } from 'vue';
import { objectType, functionType, booleanType } from '../../utils/types';
import type { VueNode } from '../../utils/types';

export const dialogProps = () => ({
  prefixCls: String,
  class: String,
  style: {
    type: [Object, String] as PropType<CSSProperties | string>,
    default: undefined,
  },
  rootClassName: String,
  visible: booleanType(),
  destroyOnClose: booleanType(),
  forceRender: booleanType(),
  getContainer: {
    type: [String, Function, Boolean, Object] as PropType<
      string | HTMLElement | (() => HTMLElement) | false
    >,
    default: undefined,
  },
  wrapClassName: String,
  wrapStyle: objectType<CSSProperties>(),
  zIndex: Number,
  mask: booleanType(true),
  maskClosable: booleanType(true),
  maskStyle: objectType<CSSProperties>(),
  maskProps: Object,
  keyboard: booleanType(true),
  title: [String, Object] as PropType<VueNode>,
  footer: [String, Object] as PropType<VueNode>,
  closable: booleanType(true),
  closeIcon: [String, Object] as PropType<VueNode>,
  focusTriggerAfterClose: booleanType(true),
  width: [String, Number],
  height: [String, Number],
  centered: booleanType(),
  transitionName: String,
  maskTransitionName: String,
  animation: String,
  maskAnimation: String,
  mousePosition: objectType<{ x: number; y: number }>(),
  bodyStyle: objectType<CSSProperties>(),
  onClose: functionType<(e?: MouseEvent) => void>(),
  afterClose: functionType<() => void>(),
  modalRender: Function as PropType<(arg: { originVNode: VueNode }) => VueNode>,
});
