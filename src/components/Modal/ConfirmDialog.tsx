import { defineComponent, computed, ref } from 'vue';
import { Info, CheckCircle, XCircle, AlertTriangle, HelpCircle } from 'lucide-vue-next';
import classNames from '../../utils/classNames';
import Modal from './Modal';
import ButtonAdapter from '../ui/ButtonAdapter.vue';
import type { ModalFuncProps } from './types';
import type { VueNode } from '../../utils/types';
import { getTransitionName } from '../../utils/transition';
import { useModalI18n } from '../../i18n/useModalI18n';

interface ConfirmDialogProps extends ModalFuncProps {
  afterClose?: () => void;
  close?: (...args: any[]) => void;
  autoFocusButton?: null | 'ok' | 'cancel';
  rootPrefixCls: string;
  iconPrefixCls?: string;
}

function renderSomeContent(someContent: any) {
  if (typeof someContent === 'function') {
    return someContent();
  }
  return someContent;
}

export default defineComponent({
  name: 'ConfirmDialog',
  props: [
    'icon',
    'onCancel',
    'onOk',
    'close',
    'zIndex',
    'afterClose',
    'open',
    'keyboard',
    'centered',
    'getContainer',
    'maskStyle',
    'okButtonProps',
    'cancelButtonProps',
    'okType',
    'prefixCls',
    'okCancel',
    'width',
    'mask',
    'maskClosable',
    'okText',
    'cancelText',
    'autoFocusButton',
    'transitionName',
    'maskTransitionName',
    'type',
    'title',
    'content',
    'direction',
    'rootPrefixCls',
    'bodyStyle',
    'closeIcon',
    'modalRender',
    'focusTriggerAfterClose',
    'wrapClassName',
    'iconPrefixCls',
    'style',
    'mousePosition',
    'footer',
  ],
  setup(props: ConfirmDialogProps, { attrs }) {
    const confirmLoading = ref(false);

    // 使用内置 i18n
    const {
      okText: i18nOkText,
      cancelText: i18nCancelText,
      justOkText: i18nJustOkText
    } = useModalI18n();

    const iconNode = computed(() => {
      const { icon, type } = props;

      // 如果 icon 明确设置为 null,则不显示图标
      if (icon === null) {
        return null;
      }

      // 如果 icon 有值,则渲染自定义图标
      if (icon !== undefined) {
        return renderSomeContent(icon);
      }

      // 使用 lucide 图标,移除内联颜色,让 CSS 样式控制颜色
      const iconMap = {
        info: <Info class="w-6 h-6" />,
        success: <CheckCircle class="w-6 h-6" />,
        error: <XCircle class="w-6 h-6" />,
        warning: <AlertTriangle class="w-6 h-6" />,
        warn: <AlertTriangle class="w-6 h-6" />,
        confirm: <HelpCircle class="w-6 h-6" />,
      };

      return iconMap[type as keyof typeof iconMap] || <HelpCircle class="w-6 h-6 text-blue-500" />;
    });

    const mergedOkCancel = computed(() => {
      const { okCancel, type } = props;
      return okCancel ?? (type === 'confirm');
    });

    const handleOk = async (e: MouseEvent) => {
      const { onOk, close } = props;
      if (onOk) {
        console.log('ConfirmDialog: Setting loading to true');
        confirmLoading.value = true;
        try {
          const result = await onOk(e);
          console.log('ConfirmDialog: onOk result:', result);
          // 如果 onOk 返回 false,不关闭 Modal
          if (result !== false) {
            close?.({ triggerCancel: false }, e);
          }
        } catch (error) {
          console.error('ConfirmDialog: onOk error:', error);
          // 即使出错也不关闭 Modal,让用户决定下一步操作
        } finally {
          console.log('ConfirmDialog: Setting loading to false');
          confirmLoading.value = false;
        }
      } else {
        close?.({ triggerCancel: false }, e);
      }
    };

    return () => {
      const {
        icon,
        onCancel,
        onOk,
        close,
        zIndex,
        afterClose,
        open,
        keyboard,
        centered,
        getContainer,
        maskStyle,
        okButtonProps,
        cancelButtonProps,
        okType = 'primary',
        prefixCls,
        width,
        mask = true,
        maskClosable = false,
        okText,
        cancelText,
        autoFocusButton = 'ok',
        transitionName,
        maskTransitionName,
        type,
        title,
        content,
        rootPrefixCls,
        bodyStyle,
        closeIcon,
        modalRender,
        focusTriggerAfterClose,
        wrapClassName,
        style,
        mousePosition,
        footer,
      } = props;

      const baseClassName = `${prefixCls}-confirm`;
      const contentPrefixCls = `${baseClassName}`;
      const mergedIcon = iconNode.value;

      // 调试信息
      console.log('ConfirmDialog Debug:', {
        prefixCls,
        type,
        baseClassName,
        finalClassName: `${baseClassName}-${type}`
      });

      const cancelButton = mergedOkCancel.value && (
        <ButtonAdapter
          type="dashed"
          onClick={(e: MouseEvent) => {
            if (confirmLoading.value) return;
            close?.({ triggerCancel: true }, e);
          }}
          disabled={confirmLoading.value}
          {...cancelButtonProps}
        >
          {cancelText || i18nCancelText.value}
        </ButtonAdapter>
      );

      const okButton = (
        <ButtonAdapter
          type={okType === 'danger' ? 'primary' : okType}
          danger={okType === 'danger'}
          loading={confirmLoading.value}
          onClick={handleOk}
          {...okButtonProps}
        >
          {okText || (mergedOkCancel.value ? i18nOkText.value : i18nJustOkText.value)}
        </ButtonAdapter>
      );

      return (
        <Modal
          prefixCls={prefixCls}
          class={classNames(
            baseClassName,
            `${baseClassName}-${type}`,
            attrs.class,
          )}
          wrapClassName={classNames(
            { [`${baseClassName}-centered`]: !!centered },
            wrapClassName,
          )}
          onCancel={(e: MouseEvent) => {
            if (confirmLoading.value) return;
            close?.({ triggerCancel: true }, e);
          }}
          open={open}
          title=""
          footer=""
          confirmLoading={confirmLoading.value}
          transitionName={getTransitionName(rootPrefixCls, 'zoom', transitionName)}
          maskTransitionName={getTransitionName(rootPrefixCls, 'fade', maskTransitionName)}
          mask={mask}
          maskClosable={confirmLoading.value ? false : maskClosable}
          maskStyle={maskStyle}
          style={style}
          bodyStyle={bodyStyle}
          width={width}
          zIndex={zIndex}
          afterClose={afterClose}
          keyboard={confirmLoading.value ? false : keyboard}
          centered={centered}
          getContainer={getContainer || undefined}
          closable={false}
          closeIcon={typeof closeIcon === 'function' ? closeIcon() : closeIcon}
          modalRender={modalRender}
          focusTriggerAfterClose={focusTriggerAfterClose}
          mousePosition={mousePosition}
        >
          <div class={`${contentPrefixCls}-body-wrapper`}>
            <div class={classNames(`${contentPrefixCls}-body`, `${contentPrefixCls}-${type}`)}>
              {mergedIcon && renderSomeContent(mergedIcon)}
              {title === undefined ? null : (
                <span class={`${contentPrefixCls}-title`}>
                  {renderSomeContent(title)}
                </span>
              )}
              <div class={`${contentPrefixCls}-content`}>
                {renderSomeContent(content)}
              </div>
            </div>
            {footer === null ? null : (
              <div class={`${contentPrefixCls}-btns`}>
                {footer !== undefined ? renderSomeContent(footer) : (
                  <>
                    {cancelButton}
                    {okButton}
                  </>
                )}
              </div>
            )}
          </div>
        </Modal>
      );
    };
  },
});
