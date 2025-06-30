import type { Plugin } from 'vue';
import type { ModalFunc } from './types';
import Modal from './Modal';
import useModal from './useModal';
export type { ModalProps, ModalFuncProps, ButtonProps } from './types';
declare const _default: typeof Modal & Plugin & {
    readonly info: ModalFunc;
    readonly success: ModalFunc;
    readonly error: ModalFunc;
    readonly warn: ModalFunc;
    readonly warning: ModalFunc;
    readonly confirm: ModalFunc;
    readonly destroyAll: () => void;
    readonly useModal: typeof useModal;
};
export default _default;
//# sourceMappingURL=index.d.ts.map