import { defineComponent, ref, computed, watch, Teleport, Transition, nextTick } from 'vue';
import classNames from '../../utils/classNames';
import { dialogProps } from './types';
import { initDefaultProps } from '../../utils/props';
import { useModalScrollLocker } from '../../utils/scrollLocker';

export default defineComponent({
  name: 'SimpleDialog',
  inheritAttrs: false,
  props: initDefaultProps(dialogProps(), {
    prefixCls: 'simple-dialog',
    mask: true,
    visible: false,
    keyboard: true,
    closable: true,
    maskClosable: true,
    destroyOnClose: false,
    focusTriggerAfterClose: true,
  }),
  setup(props, { attrs, slots, emit }) {
    const wrapperRef = ref<HTMLDivElement>();
    const contentRef = ref<HTMLDivElement>();
    const animatedVisible = ref(props.visible);
    const transformOrigin = ref<string>();

    // 滚动锁定 - 当Modal可见时锁定背景滚动
    useModalScrollLocker(() => props.visible);

    // 计算内容样式 - 参考原始 vc-dialog/Content.tsx
    const contentStyle = computed(() => {
      const { width, height } = props;
      const style: any = {};
      if (width !== undefined) {
        style.width = typeof width === 'number' ? `${width}px` : width;
      }
      if (height !== undefined) {
        style.height = typeof height === 'number' ? `${height}px` : height;
      }
      if (transformOrigin.value) {
        style.transformOrigin = transformOrigin.value;
      }
      return style;
    });

    watch(
      () => props.visible,
      (visible) => {
        if (visible) {
          animatedVisible.value = true;
        }
      },
      { immediate: true }
    );

    const onInternalClose = (e?: MouseEvent) => {
      emit('close', e);
    };

    const onMaskClick = (e: MouseEvent) => {
      if (props.maskClosable && e.target === e.currentTarget) {
        onInternalClose(e);
      }
    };

    const onWrapperKeyDown = (e: KeyboardEvent) => {
      if (props.keyboard && e.key === 'Escape') {
        e.stopPropagation();
        onInternalClose();
      }
    };

    const onDialogVisibleChanged = (visible: boolean) => {
      console.log('onDialogVisibleChanged called', visible);
      if (!visible) {
        animatedVisible.value = false;
        props.afterClose?.();
      }
    };

    // 计算元素偏移量 - 参考 vc-dialog/util.ts 的 offset 函数
    const getElementOffset = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const pos = {
        left: rect.left,
        top: rect.top,
      };
      const doc = element.ownerDocument;
      const w = doc.defaultView || (doc as any).parentWindow;

      // 获取滚动偏移量
      const getScroll = (win: Window, top?: boolean): number => {
        let ret = win[`page${top ? 'Y' : 'X'}Offset`];
        const method = `scroll${top ? 'Top' : 'Left'}`;
        if (typeof ret !== 'number') {
          const d = win.document;
          ret = (d.documentElement as any)[method];
          if (typeof ret !== 'number') {
            ret = (d.body as any)[method];
          }
        }
        return ret;
      };

      pos.left += getScroll(w);
      pos.top += getScroll(w, true);
      return pos;
    };

    // 在动画开始前计算 transform-origin - 完全按照原始 vc-dialog/Content.tsx 实现
    const onPrepare = () => {
      console.log('onPrepare called', props.mousePosition);
      nextTick(() => {
        if (contentRef.value) {
          const elementOffset = getElementOffset(contentRef.value);
          transformOrigin.value = props.mousePosition
            ? `${props.mousePosition.x - elementOffset.left}px ${props.mousePosition.y - elementOffset.top
            }px`
            : '';

          console.log('setTransformOrigin details:', {
            mousePosition: props.mousePosition,
            elementOffset,
            transformOrigin: transformOrigin.value
          });
        }
      });
    };

    // 在关闭动画开始前确保 transform-origin 正确
    const onBeforeLeave = () => {
      console.log('onBeforeLeave called', transformOrigin.value, 'mousePosition:', props.mousePosition);
      // 确保关闭动画使用正确的 transform-origin
      // 如果没有值或者鼠标位置发生了变化，重新计算
      if (props.mousePosition && contentRef.value) {
        const elementOffset = getElementOffset(contentRef.value);
        const newTransformOrigin = `${props.mousePosition.x - elementOffset.left}px ${props.mousePosition.y - elementOffset.top}px`;

        // 只有在值不同时才更新，避免不必要的重新计算
        if (transformOrigin.value !== newTransformOrigin) {
          transformOrigin.value = newTransformOrigin;
          console.log('transform-origin updated for leave:', transformOrigin.value);
        }
      }
    };



    const getContainer = computed(() => {
      const { getContainer } = props;
      if (getContainer === false) {
        return false;
      }
      if (typeof getContainer === 'function') {
        return getContainer();
      }
      if (typeof getContainer === 'string') {
        return document.querySelector(getContainer);
      }
      return document.body;
    });

    return () => {
      const {
        prefixCls,
        mask,
        visible,
        destroyOnClose,
        maskTransitionName,
        zIndex,
        wrapClassName,
        rootClassName,
        wrapStyle,
        closable,
        maskProps,
        maskStyle,
        transitionName,
        title = slots.title?.(),
        footer = slots.footer?.(),
        closeIcon = slots.closeIcon?.(),
        width,
        height,
        centered,
        modalRender,
        mousePosition,
      } = props;

      const { style, class: className } = attrs;

      const maskElement = mask ? (
        <Transition
          name={maskTransitionName || 'simple-fade'}
          appear
        >
          {visible ? (
            <div
              class={`${prefixCls}-mask`}
              style={{
                zIndex,
                ...maskStyle,
              }}
              {...maskProps}
            />
          ) : null}
        </Transition>
      ) : null;

      const dialogElement = (
        <div
          tabindex={-1}
          onKeydown={onWrapperKeyDown}
          class={classNames(`${prefixCls}-wrap`, wrapClassName, {
            [`${prefixCls}-centered`]: !!centered,
          })}
          ref={wrapperRef}
          onClick={onMaskClick}
          style={{ zIndex, ...wrapStyle, display: !animatedVisible.value ? 'none' : undefined }}
        >

          <Transition
            name={transitionName || 'simple-zoom'}
            appear
            onBeforeEnter={onPrepare}
            onBeforeLeave={onBeforeLeave}
            onAfterLeave={() => onDialogVisibleChanged(false)}
          >
            {visible || !destroyOnClose ? (
              <div
                ref={contentRef}
                v-show={visible}
                key="dialog-element"
                role="document"
                class={classNames(`${prefixCls}`, className)}
                style={[contentStyle.value, style]}
              >
                <div class={`${prefixCls}-content`}>
                  {closable && (
                    <button
                      type="button"
                      onClick={onInternalClose}
                      aria-label="Close"
                      class={`${prefixCls}-close`}
                    >
                      {closeIcon || (
                        <span class={`${prefixCls}-close-x`}>
                          <span class={`${prefixCls}-close-icon`}>×</span>
                        </span>
                      )}
                    </button>
                  )}
                  {title && (
                    <div class={`${prefixCls}-header`}>
                      <div class={`${prefixCls}-title`}>{title}</div>
                    </div>
                  )}
                  <div class={`${prefixCls}-body`}>
                    {slots.default?.()}
                  </div>
                  {footer && (
                    <div class={`${prefixCls}-footer`}>
                      {footer}
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </Transition>
        </div>
      );

      const dialogNode = (
        <div class={classNames(`${prefixCls}-root`, rootClassName)}>
          {maskElement}
          {dialogElement}
        </div>
      );

      if (modalRender) {
        return modalRender({ originVNode: dialogNode });
      }

      if (getContainer.value === false) {
        return dialogNode;
      }

      return (
        <Teleport to={getContainer.value || document.body}>
          {dialogNode}
        </Teleport>
      );
    };
  },
});
