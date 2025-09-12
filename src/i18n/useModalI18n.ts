import { computed, watchEffect } from 'vue';
import { getI18nInstance } from './index';

/**
 * 内部使用的 i18n hook
 */
export function useModalI18n() {
  // 每次调用都获取最新的 i18n 实例
  const i18nInstance = getI18nInstance();
  const i18n = i18nInstance.global;

  // 直接使用函数获取当前文本,不使用 computed
  // 因为 Modal 组件每次打开都会重新创建
  const getOkText = () => {
    const currentLocale = i18n.locale.value;
    try {
      return i18n.t('modal.okText');
    } catch (e) {
      return '确定';
    }
  };

  const okText = computed(() => getOkText());

  const getCancelText = () => {
    const currentLocale = i18n.locale.value;
    try {
      return i18n.t('modal.cancelText');
    } catch {
      return '取消';
    }
  };

  const cancelText = computed(() => getCancelText());

  const getJustOkText = () => {
    const currentLocale = i18n.locale.value;
    try {
      return i18n.t('modal.justOkText');
    } catch {
      return '知道了';
    }
  };

  const justOkText = computed(() => getJustOkText());

  const getConfirmTitle = () => {
    const currentLocale = i18n.locale.value;
    try {
      return i18n.t('modal.confirmTitle');
    } catch {
      return '确认';
    }
  };

  const confirmTitle = computed(() => getConfirmTitle());

  const getLoadingText = () => {
    const currentLocale = i18n.locale.value;
    try {
      return i18n.t('modal.loadingText');
    } catch {
      return '加载中...';
    }
  };

  const loadingText = computed(() => getLoadingText());

  return {
    okText,
    cancelText,
    justOkText,
    confirmTitle,
    loadingText,
  };
}
