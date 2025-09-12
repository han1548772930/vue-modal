import type { App, Plugin } from 'vue';
import type { ModalFunc, ModalFuncProps } from './types';
import Modal from './Modal';
import confirm, { withWarn, withInfo, withSuccess, withError, withConfirm } from './confirm';
import useModal from './useModal';
import destroyFns from './destroyFns';
import { 
  setLocale as setI18nLocale,
  addLocaleMessages,
  getLocale as getI18nLocale,
  getAvailableLocales
} from '../../i18n';

export type { ModalProps, ModalFuncProps, ButtonProps } from './types';

function modalWarn(props: ModalFuncProps) {
  return confirm(withWarn(props));
}

Modal.useModal = useModal;
Modal.info = function infoFn(props: ModalFuncProps) {
  return confirm(withInfo(props));
};

Modal.success = function successFn(props: ModalFuncProps) {
  return confirm(withSuccess(props));
};

Modal.error = function errorFn(props: ModalFuncProps) {
  return confirm(withError(props));
};

Modal.warning = modalWarn;

Modal.warn = modalWarn;

Modal.confirm = function confirmFn(props: ModalFuncProps) {
  return confirm(withConfirm(props));
};

Modal.destroyAll = function destroyAllFn() {
  while (destroyFns.length) {
    const close = destroyFns.pop();
    if (close) {
      close();
    }
  }
};

// 配置相关方法
Modal.setLocale = setI18nLocale;
Modal.getLocale = getI18nLocale;
Modal.getAvailableLocales = getAvailableLocales;
Modal.addLanguage = (locale: string, messages: any) => {
  addLocaleMessages(locale, { modal: messages });
};
Modal.config = (options: any) => {
  if (options.locale) {
    setI18nLocale(options.locale);
  }
  if (options.languages) {
    Object.entries(options.languages).forEach(([locale, messages]) => {
      addLocaleMessages(locale, { modal: messages as any });
    });
  }
};

/* istanbul ignore next */
Modal.install = function (app: App) {
  app.component(Modal.name || 'Modal', Modal);
  return app;
};

export default Modal as typeof Modal &
  Plugin & {
    readonly info: ModalFunc;
    readonly success: ModalFunc;
    readonly error: ModalFunc;
    readonly warn: ModalFunc;
    readonly warning: ModalFunc;
    readonly confirm: ModalFunc;
    readonly destroyAll: () => void;
    readonly useModal: typeof useModal;
    readonly setLocale: (locale: string) => void;
    readonly getLocale: () => string;
    readonly getAvailableLocales: () => string[];
    readonly addLanguage: (locale: string, messages: any) => void;
    readonly config: (options: any) => void;
  };
