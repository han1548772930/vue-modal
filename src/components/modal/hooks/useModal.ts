import { h, render, type Component, type VNode, createVNode, type App } from 'vue';
import Modal from '../Modal.vue';
import { cancelAnimationTimeout, requestAnimationTimeout } from './requestAnimationTimeout';

// 基础的 Modal 组件 Props
export interface ModalProps {
  title?: string;
  content?: string;
  width?: number;
  height?: number | string;
  closable?: boolean;
  mask?: boolean;
  maskClosable?: boolean;
  okText?: string;
  cancelText?: string;
  closeText?: string;
  confirmLoading?: boolean;
  centered?: boolean;
  size?: 'small' | 'default' | 'large';
  showFooter?: boolean;
  showCancel?: boolean;
  zIndex?: number;
  draggable?: boolean;
  id?: string;
  destroyOnClose?: boolean;
  keyboard?: boolean;
  forceRender?: boolean;
  getContainer?: () => HTMLElement;
  type?: 'info' | 'success' | 'error' | 'warning' | 'confirm';
  icon?: Component | string;
}

// useModal 特有的配置选项 - 排除 content 后继承
export interface ModalOptions extends Omit<ModalProps, 'content'> {
  content?: string | Component | (() => VNode); // 重新定义 content 类型

  // useModal 特有的回调函数
  onOk?: () => void | Promise<any>;
  onCancel?: () => void;
  onClose?: () => void;
  afterClose?: () => void;

  // 额外的配置选项（用于函数式调用）
  autoFocusButton?: 'ok' | 'cancel' | null;
  okButtonProps?: Record<string, any>;
  cancelButtonProps?: Record<string, any>;
  class?: string;
  style?: Record<string, any>;
  wrapClassName?: string;
}
// z-index 管理器
class ZIndexManager {
  private baseZIndex = 1000;
  private increment = 1;

  getNextZIndex(): number {
    return this.baseZIndex + (this.increment++);
  }

  reset(): void {
    this.increment = 1;
  }
}

const zIndexManager = new ZIndexManager();

// 模态框实例管理
interface ModalInstance {
  id: string;
  destroy: () => void;
  update: (options: Partial<ModalOptions>) => void;
  vnode: VNode | null;
  container: HTMLElement;
  animationFrame?: ReturnType<typeof requestAnimationTimeout>;
}

class ModalManager {
  private instances = new Map<string, ModalInstance>();
  private destroying = new Set<string>();

  add(instance: ModalInstance): void {
    this.instances.set(instance.id, instance);
  }

  remove(id: string): void {
    this.instances.delete(id);
    this.destroying.delete(id);
  }

  get(id: string): ModalInstance | undefined {
    return this.instances.get(id);
  }

  isDestroying(id: string): boolean {
    return this.destroying.has(id);
  }

  setDestroying(id: string): void {
    this.destroying.add(id);
  }

  destroyAll(): void {
    const instances = Array.from(this.instances.values());
    this.instances.clear();
    this.destroying.clear();

    instances.forEach(instance => {
      try {
        // 取消待执行的动画帧
        if (instance.animationFrame) {
          cancelAnimationTimeout(instance.animationFrame);
        }

        if (instance.vnode?.component) {
          instance.vnode.component.props.modelValue = false;
        }

        // 使用新的 requestAnimationTimeout
        const frame = requestAnimationTimeout(() => {
          if (instance.container && instance.container.parentNode) {
            instance.container.parentNode.removeChild(instance.container);
          }
        }, 300);

        // 不需要保存这个 frame，因为实例即将被清理
      } catch (error) {
        console.error('Error destroying modal:', error);
      }
    });

    zIndexManager.reset();
  }

  getCount(): number {
    return this.instances.size;
  }
}

const modalManager = new ModalManager();

// 生成唯一ID
function generateId(): string {
  return `modal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// 创建容器
function createContainer(): HTMLElement {
  const container = document.createDocumentFragment() as unknown as HTMLElement;

  document.body.appendChild(container);
  return container;
}

// 主要的 useModal 函数
export function useModal(options: ModalOptions = {}) {
  const id = generateId();
  const container = createContainer();
  let vnode: VNode | null = null;
  let confirmLoading = false;
  let destroyAnimationFrame: ReturnType<typeof requestAnimationTimeout> | null = null;

  // 安全执行回调
  const safeExecute = async (callback?: Function, ...args: any[]) => {
    if (typeof callback === 'function') {
      try {
        const result = callback(...args);
        if (result instanceof Promise) {
          return await result;
        }
        return result;
      } catch (error) {
        console.error('Modal callback error:', error);
        throw error;
      }
    }
  };
  const updateInstanceAnimationFrame = () => {
    const instance = modalManager.get(id);
    if (instance) {
      instance.animationFrame = destroyAnimationFrame || undefined;
    }
  };
  // 销毁方法 - 简化版本
  const destroy = () => {
    if (modalManager.isDestroying(id)) return;

    modalManager.setDestroying(id);

    if (destroyAnimationFrame) {
      cancelAnimationTimeout(destroyAnimationFrame);
      destroyAnimationFrame = null;
    }

    if (vnode?.component) {
      vnode.component.props.modelValue = false;

      destroyAnimationFrame = requestAnimationTimeout(() => {
        try {
          render(null, container);
          if (container.parentNode) {
            container.parentNode.removeChild(container);
          }
          modalManager.remove(id);
          safeExecute(options.afterClose);
        } catch (error) {
          console.error('Error in destroy:', error);
        }
        destroyAnimationFrame = null;
      }, 300);

      // 更新实例中的动画帧引用
      updateInstanceAnimationFrame();
    } else {
      // 立即销毁逻辑保持不变
      try {
        render(null, container);
        if (container.parentNode) {
          container.parentNode.removeChild(container);
        }
        modalManager.remove(id);
        safeExecute(options.afterClose);
      } catch (error) {
        console.error('Error in immediate destroy:', error);
      }
    }
  };

  // 确认处理
  const handleOk = async () => {
    try {
      if (options.onOk) {
        confirmLoading = true;
        updateLoading(true);

        await safeExecute(options.onOk);
      }
      destroy();
    } catch (error) {
      console.error('Modal onOk error:', error);
      // 发生错误时不关闭模态框，让用户处理
    } finally {
      confirmLoading = false;
      updateLoading(false);
    }
  };

  // 取消处理
  const handleCancel = async () => {
    await safeExecute(options.onCancel);
    destroy();
  };

  // 关闭处理
  const handleClose = async () => {
    await safeExecute(options.onClose);
    destroy();
  };

  // 更新加载状态
  const updateLoading = (loading: boolean) => {
    if (vnode?.component) {
      vnode.component.props.confirmLoading = loading;
    }
  };

  // 渲染模态框
  const renderModal = (config: ModalOptions) => {

    const baseDefaults = {
      centered: false,
      closable: true,
      maskClosable: true,
      showFooter: true,
      showCancel: true,
      keyboard: true,
      destroyOnClose: false,
      okText: 'OK',
      cancelText: 'Cancel',
      closeText: 'Close',
      mask: true,
      size: 'default' as const,
      draggable: false,
      forceRender: false,
      type: 'confirm' as const,
    };

    // 合并用户配置
    const mergedOptions = { ...baseDefaults, ...config };

    // 处理不同类型的模态框特殊逻辑
    if (mergedOptions.type && mergedOptions.type !== 'confirm') {
      mergedOptions.showCancel = false;

      // 如果用户没有明确指定 okText，使用类型特定的默认值
      if (!config.hasOwnProperty('okText')) {
        mergedOptions.okText = mergedOptions.type === 'info' ? 'Got it' : 'OK';
      }
    }

    let slots: Record<string, any> = {};

    // 处理内容插槽
    if (typeof config.content === 'function') {
      slots.default = config.content;
    } else if (config.content && typeof config.content === 'object') {
      slots.default = () => h(config.content as Component);
    }

    // 只传递 Modal 组件需要的属性
    const modalProps: Record<string, any> = {
      title: mergedOptions.title,
      content: typeof mergedOptions.content === 'string' ? mergedOptions.content : '',
      width: mergedOptions.width,
      height: mergedOptions.height,
      closable: mergedOptions.closable,
      mask: mergedOptions.mask,
      maskClosable: mergedOptions.maskClosable,
      okText: mergedOptions.okText,
      cancelText: mergedOptions.cancelText,
      closeText: mergedOptions.closeText,
      confirmLoading: confirmLoading,
      centered: mergedOptions.centered,
      size: mergedOptions.size,
      showFooter: mergedOptions.showFooter,
      showCancel: mergedOptions.showCancel,
      zIndex: mergedOptions.zIndex || zIndexManager.getNextZIndex(),
      draggable: mergedOptions.draggable,
      id: id || `modal-${id}`,
      destroyOnClose: mergedOptions.destroyOnClose,
      keyboard: mergedOptions.keyboard,
      forceRender: mergedOptions.forceRender,
      type: mergedOptions.type,
      icon: mergedOptions.icon,
      modelValue: true,
      'onUpdate:modelValue': (val: boolean) => {
        if (!val) handleCancel();
      },
      onOk: handleOk,
      onCancel: handleCancel,
      onClose: handleClose,
      onAfterClose: () => safeExecute(options.afterClose),
    };

    const newVnode = createVNode(Modal, modalProps, slots);
    render(newVnode, container);
    return newVnode;
  };
  // 更新配置
  const update = (newOptions: Partial<ModalOptions>) => {
    Object.assign(options, newOptions);
    vnode = renderModal(options);

    const instance = modalManager.get(id);
    if (instance) {
      instance.vnode = vnode;
    }
  };

  // 初始渲染
  vnode = renderModal(options);

  // 创建实例
  const instance: ModalInstance = {
    id,
    destroy,
    update,
    vnode,
    container,
  };

  modalManager.add(instance);

  return {
    destroy,
    update,
  };
}

// 静态方法
useModal.info = (options: ModalOptions) => useModal({
  type: 'info',
  ...options,
});

useModal.success = (options: ModalOptions) => useModal({
  type: 'success',
  ...options,
});

useModal.error = (options: ModalOptions) => useModal({
  type: 'error',
  ...options,
});

useModal.warning = (options: ModalOptions) => useModal({
  type: 'warning',
  ...options,
});

useModal.warn = useModal.warning; // 别名

useModal.confirm = (options: ModalOptions) => useModal({
  type: 'confirm',
  ...options,
});

// 销毁所有模态框
useModal.destroyAll = () => {
  modalManager.destroyAll();
};

// 获取当前模态框数量
useModal.getModalCount = () => {
  return modalManager.getCount();
};

// Vue 插件安装方法
useModal.install = (app: App) => {
  app.config.globalProperties.$modal = useModal;
  app.provide('$modal', useModal);
};

export default useModal;