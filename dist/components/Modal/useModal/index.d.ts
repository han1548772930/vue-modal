import type { MaybeRef, VueNode } from '../../../utils/types';
import type { ModalFuncProps } from '../types';
export type ModalFuncWithRef = (props: MaybeRef<ModalFuncProps>) => {
    destroy: () => void;
    update: (configUpdate: ModalFuncProps) => void;
};
export type ModalStaticFunctions = Record<NonNullable<ModalFuncProps['type']>, ModalFuncWithRef>;
export type UseModalReturnType = [
    Omit<ModalStaticFunctions, 'warn'> & {
        warn: ModalFuncWithRef;
        warning: ModalFuncWithRef;
    },
    () => VueNode
];
declare function useModal(): UseModalReturnType;
export default useModal;
//# sourceMappingURL=index.d.ts.map