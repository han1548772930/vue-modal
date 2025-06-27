import type { PropType } from 'vue';
import { computed, defineComponent } from 'vue';
import ConfirmDialog from '../ConfirmDialog';
import type { ModalFuncProps } from '../types';
import { initDefaultProps } from '../../../utils/props';
import { getMousePosition } from '../../../utils/mousePosition';

export interface HookModalProps {
  afterClose: () => void;
  config: ModalFuncProps;
  destroyAction: (...args: any[]) => void;
  open: boolean;
}

export interface HookModalRef {
  destroy: () => void;
  update: (config: ModalFuncProps) => void;
}

const HookModal = defineComponent({
  name: 'HookModal',
  inheritAttrs: false,
  props: initDefaultProps(
    {
      config: Object as PropType<ModalFuncProps>,
      afterClose: Function as PropType<() => void>,
      destroyAction: Function as PropType<HookModalProps['destroyAction']>,
      open: { type: Boolean, default: undefined },
    },
    {
      config: {},
    },
  ),
  setup(props: HookModalProps, { expose }) {
    const rootPrefixCls = 'simple';
    const prefixCls = computed(() => props.config.prefixCls || `${rootPrefixCls}-modal`);
    const iconPrefixCls = 'simple-icon';

    const mergedAfterClose = () => {
      props.afterClose();
    };

    const destroy = () => {
      props.destroyAction();
    };

    const update = (newConfig: ModalFuncProps) => {
      Object.assign(props.config, newConfig);
    };

    expose({
      destroy,
      update,
    });

    return () => {
      return (
        <ConfirmDialog
          {...props.config}
          close={props.destroyAction}
          open={props.open}
          afterClose={mergedAfterClose}
          rootPrefixCls={rootPrefixCls}
          prefixCls={prefixCls.value}
          iconPrefixCls={iconPrefixCls}
          mousePosition={props.config.mousePosition || getMousePosition()}
        />
      );
    };
  },
});

export default HookModal;
