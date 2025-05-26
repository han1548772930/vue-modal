import Modal from './Modal.vue';
import useModal from './hooks/useModal';

 // 确保Modal和useModal共享destroyAll方法和其他静态方法
Modal.destroyAll= useModal.destroyAll;

Modal.info = useModal.info;
Modal.success = useModal.success;
Modal.error = useModal.error;
Modal.warning = useModal.warning;
Modal.confirm = useModal.confirm;

export { Modal, useModal };
export default Modal;