import { createVNode, nextTick, ref, render as vueRender } from 'vue';
import { type ConfigUpdate, type ModalFuncProps, omit, triggerVNodeUpdate } from ".";
import type { Component } from 'vue';


import { useDialogAnimation } from '@/hooks/useDialogAnimation';


export const destroyFns: Array<Function> = [];
export const destroyAll = () => {
    // 创建一个副本以避免在迭代过程中修改原数组导致的问题
    const fnsToDestroy = [...destroyFns];

    // 清空原始数组
    // destroyFns.length = 0;

    // 调用每个销毁函数
    fnsToDestroy.forEach((fn, index) => {
        try {
            fn(index + 1);
        } catch (error) {
            console.error('Error destroying dialog:', error);
        }
    });
    destroyFns.length = 0;
}

export const confirm = (config: ModalFuncProps, el: Component) => {
    let applyOpenAnimation: () => void = () => { };
    let applyCloseAnimation: () => void = () => { };
    const dialogId = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    if (config.isMousePosition) {
        const { applyOpenAnimation: f, applyCloseAnimation: f2 } = useDialogAnimation({
            contentSelector: `.dialog-content-${dialogId}`,
            duration: 200
        });
        applyCloseAnimation = f2
        applyOpenAnimation = f
    }

    const container = document.createDocumentFragment();
    let currentConfig = {
        ...omit(config, []),
        close,
    } as any;
    let confirmDialogInstance: any = null;

    function destroy(..._: any[]) {
        if (confirmDialogInstance) {
            vueRender(null, container as any);
            confirmDialogInstance = null;
        }
        for (let i = 0; i < destroyFns.length; i++) {
            const fn = destroyFns[i];
            if (fn === close) {
                destroyFns.splice(i, 1);
                break;
            }
        }

    }

    function close(...args: any[]) {
        currentConfig = {
            ...currentConfig,
        };



        if (config.isMousePosition) {
            applyCloseAnimation()
            setTimeout(() => {
                update({ ...currentConfig, open: false });
                destroy(...args);
            }, 200)
        } else {
            update({ ...currentConfig, open: false });
            setTimeout(() => {
                destroy(...args);
            }, 200)
        }

    }

    function update(configUpdate: ConfigUpdate) {
        if (typeof configUpdate === 'function') {
            currentConfig = configUpdate(currentConfig);
        } else {
            currentConfig = {
                ...currentConfig,
                ...configUpdate,
            };
        }
        if (confirmDialogInstance) {
            triggerVNodeUpdate(confirmDialogInstance, currentConfig, container);

        }
    }

    function render(props: ModalFuncProps) {
        const vm = createVNode(el, {
            ...props,
            open: true,
            "data-id": dialogId, // 传递ID
            "onUpdate:open": (newValue: boolean) => {
                currentConfig.open = newValue;
            }
        });
        vueRender(vm, container as any);
        if (config.isMousePosition) {
            nextTick(() => {
                applyOpenAnimation()
            })
        }

        return vm;
    }

    confirmDialogInstance = render(currentConfig);
    destroyFns.push(close);
    return {
        destroy: close,
        update,
    };
};
