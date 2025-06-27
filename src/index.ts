import type { App } from 'vue';
import Modal from './components/Modal';
import { withInstall } from './utils/types';

// 为组件添加 install 方法
const SimpleModal = withInstall(Modal);

// 导出组件
export { SimpleModal as Modal };

// 导出 useModal hook
export { default as useModal } from './components/Modal/useModal';



// 导出类型
export type { ModalProps, ModalFuncProps } from './components/Modal/types';

// 默认导出
export default {
  Modal: SimpleModal,
  install(app: App) {
    app.use(SimpleModal);
    return app;
  },
};
