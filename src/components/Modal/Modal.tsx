import type { ExtractPropTypes, CSSProperties, PropType } from 'vue';
import { defineComponent, ref, watch } from 'vue';
import { X } from 'lucide-vue-next';
import classNames from '../../utils/classNames';
import Dialog from '../Dialog/Dialog';
import ButtonAdapter from '../ui/ButtonAdapter.vue';
import { initDefaultProps } from '../../utils/props';
import type { VueNode } from '../../utils/types';
import { getTransitionName } from '../../utils/transition';
import { getMousePosition } from '../../utils/mousePosition';
import type { MousePosition } from '../../utils/mousePosition';
import { modalProps } from './types';

export default defineComponent({
  name: 'SimpleModal',
  inheritAttrs: false,
  props: initDefaultProps(modalProps(), {
    width: 520,
    confirmLoading: false,
    okType: 'primary',
  }),
  setup(props, { emit, slots, attrs }) {
    const prefixCls = props.prefixCls || 'simple-modal';
    const dialogPrefixCls = 'simple-dialog';
    const rootPrefixCls = 'simple';

    // 保存鼠标位置，确保在关闭时仍能使用
    const savedMousePosition = ref<MousePosition>(null);

    // 监听 visible/open 变化，在打开时保存鼠标位置
    watch(
      () => props.open ?? props.visible,
      (visible) => {
        if (visible) {
          // 打开时保存当前鼠标位置
          savedMousePosition.value = props.mousePosition ?? getMousePosition();
          console.log('Modal opening, saved mouse position:', savedMousePosition.value);
        }
      },
      { immediate: true }
    );

    const handleCancel = (e?: MouseEvent) => {
      // 当 confirmLoading 为 true 时，不允许取消
      if (props.confirmLoading) {
        return;
      }
      emit('update:visible', false);
      emit('update:open', false);
      emit('cancel', e);
      emit('change', false);
    };

    const handleOk = (e: MouseEvent) => {
      emit('ok', e);
    };

    const renderFooter = () => {
      const {
        okText = slots.okText?.(),
        okType,
        cancelText = slots.cancelText?.(),
        confirmLoading,
      } = props;
      return (
        <>
          <ButtonAdapter
            type="dashed"
            onClick={handleCancel}
            disabled={confirmLoading}
            {...props.cancelButtonProps}
          >
            {cancelText || '取消'}
          </ButtonAdapter>
          <ButtonAdapter
            type={okType === 'danger' ? 'primary' : okType}
            danger={okType === 'danger'}
            loading={confirmLoading}
            onClick={handleOk}
            {...props.okButtonProps}
          >
            {okText || '确定'}
          </ButtonAdapter>
        </>
      );
    };

    return () => {
      const {
        prefixCls: customizePrefixCls,
        visible,
        open,
        wrapClassName,
        centered,
        getContainer,
        closeIcon = slots.closeIcon?.(),
        focusTriggerAfterClose = true,
        confirmLoading,
        maskClosable = true,
        ...restProps
      } = props;

      const wrapClassNameExtended = classNames(wrapClassName, {
        [`${prefixCls}-centered`]: !!centered,
      });

      // 当 confirmLoading 为 true 时，禁用遮罩点击关闭、键盘关闭和关闭按钮
      const finalMaskClosable = confirmLoading ? false : maskClosable;
      const finalKeyboard = confirmLoading ? false : (restProps.keyboard ?? true);
      const finalClosable = confirmLoading ? false : (restProps.closable ?? true);

      return (
        <Dialog
          {...restProps}
          {...attrs}
          class={classNames(attrs.class)}
          getContainer={getContainer}
          prefixCls={dialogPrefixCls}
          wrapClassName={wrapClassNameExtended}
          visible={open ?? visible}
          onClose={handleCancel}
          focusTriggerAfterClose={focusTriggerAfterClose}
          maskClosable={finalMaskClosable}
          keyboard={finalKeyboard}
          closable={finalClosable}
          transitionName={getTransitionName(rootPrefixCls, 'zoom', props.transitionName)}
          maskTransitionName={getTransitionName(
            rootPrefixCls,
            'fade',
            props.maskTransitionName,
          )}
          mousePosition={savedMousePosition.value!}
          modalRender={props.modalRender}
        >
          {{
            ...slots,
            footer: slots.footer || renderFooter,
            closeIcon: () => {
              return (
                <span class={`${prefixCls}-close-x`}>
                  {closeIcon || <X class={`${prefixCls}-close-icon`} size={16} />}
                </span>
              );
            },
          }}
        </Dialog>
      );
    };
  },
});
