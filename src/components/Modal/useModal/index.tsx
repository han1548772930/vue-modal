import type { Ref } from 'vue';
import { isRef, unref, computed, defineComponent, shallowRef, watch } from 'vue';
import type { MaybeRef, VueNode } from '../../../utils/types';
import type { ModalFuncProps } from '../types';
import type { HookModalRef } from './HookModal';
import { withConfirm, withError, withInfo, withSuccess, withWarn } from '../confirm';
import HookModal from './HookModal';
import destroyFns from '../destroyFns';

let uuid = 0;

interface ElementsHolderRef {
  addModal: (modal: () => VueNode) => () => void;
}

const ElementsHolder = defineComponent({
  name: 'ElementsHolder',
  inheritAttrs: false,
  setup(_, { expose }) {
    const modals = shallowRef<(() => VueNode)[]>([]);
    const addModal = (modal: () => VueNode) => {
      modals.value.push(modal);
      modals.value = modals.value.slice();
      return () => {
        modals.value = modals.value.filter(currentModal => currentModal !== modal);
      };
    };

    expose({ addModal });
    return () => {
      return modals.value.map(modal => modal());
    };
  },
});

export type ModalFuncWithRef = (props: MaybeRef<ModalFuncProps>) => {
  destroy: () => void;
  update: (configUpdate: ModalFuncProps) => void;
};

export type ModalStaticFunctions = Record<
  NonNullable<ModalFuncProps['type']>,
  ModalFuncWithRef
>;

export type UseModalReturnType = [
  Omit<ModalStaticFunctions, 'warn'> & {
    warn: ModalFuncWithRef;
    warning: ModalFuncWithRef;
  },
  () => VueNode,
];

function useModal(): UseModalReturnType {
  const holderRef = shallowRef<ElementsHolderRef>();

  // ========================== Effect ==========================
  const actionQueue = shallowRef<(() => void)[]>([]);

  watch(
    holderRef,
    () => {
      if (holderRef.value) {
        actionQueue.value.forEach(fn => fn());
        actionQueue.value = [];
      }
    },
    { immediate: true },
  );

  // =========================== Hook ===========================
  const getConfirmFunc = (withFunc: (config: ModalFuncProps) => ModalFuncProps) =>
    function hookConfirm(config: MaybeRef<ModalFuncProps>) {
      uuid += 1;

      const modalRef = shallowRef<HookModalRef>();
      const open = shallowRef(true);

      let closeFunc: () => void;
      const modal = () => {
        const mergedConfig = computed(() => withFunc(unref(config)));
        return (
          <HookModal
            key={`modal-${uuid}`}
            config={mergedConfig.value}
            ref={modalRef}
            open={open.value}
            destroyAction={() => {
              // 先关闭 Modal 触发动画,然后在 afterClose 中移除
              open.value = false;
            }}
            afterClose={() => {
              // 动画完成后再移除组件
              closeFunc?.();
              mergedConfig.value.afterClose?.();
            }}
          />
        );
      };

      if (holderRef.value) {
        closeFunc = holderRef.value.addModal(modal);
      } else {
        actionQueue.value.push(() => {
          closeFunc = holderRef.value!.addModal(modal);
        });
      }

      const destroy = () => {
        if (modalRef.value) {
          modalRef.value.destroy();
        } else {
          // 如果 modalRef 还没有准备好,直接关闭
          open.value = false;
        }
      };

      const update = (newConfig: ModalFuncProps) => {
        if (modalRef.value) {
          modalRef.value.update(newConfig);
        }
      };

      return {
        destroy,
        update,
      };
    };

  const fns = {
    info: getConfirmFunc(withInfo),
    success: getConfirmFunc(withSuccess),
    error: getConfirmFunc(withError),
    warning: getConfirmFunc(withWarn),
    confirm: getConfirmFunc(withConfirm),
  } as any;

  fns.warn = fns.warning;

  return [
    fns,
    () => <ElementsHolder ref={holderRef} />,
  ];
}

export default useModal;
