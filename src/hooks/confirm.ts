import { createVNode, render as vueRender } from 'vue';
import { type ConfigUpdate, type ModalFuncProps, omit, triggerVNodeUpdate } from ".";
import type { Component } from 'vue';



const destroyFns: Array<Function> = [];
export const destroyAll = () => {
    // 创建一个副本以避免在迭代过程中修改原数组导致的问题
    const fnsToDestroy = [...destroyFns];

    // 清空原始数组
    destroyFns.length = 0;

    // 调用每个销毁函数
    fnsToDestroy.forEach(fn => {
        try {
            fn();
        } catch (error) {
            console.error('Error destroying dialog:', error);
        }
    });
}

export const confirm = (config: ModalFuncProps, el: Component) => {
    const container = document.createDocumentFragment();
    // const open = ref(true)
    let currentConfig = {
        ...omit(config, []),
        close,
    } as any;
    let confirmDialogInstance: any = null;
    let changeStateFn: (b: boolean) => void
    function destroy(..._: any[]) {
        if (confirmDialogInstance) {
            // destroy
            vueRender(null, container as any);
            confirmDialogInstance = null;
        }
        // console.log('config', config)
        // const triggerCancel = args.some(param => param && param.triggerCancel);
        // console.log('triggerCancel', triggerCancel)
        // if (config.onCancel && triggerCancel) {
        //     config.onCancel(() => {
        //     }, ...args.slice(1));
        // }
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
        // Legacy support
        if (currentConfig.visible) {
            delete currentConfig.visible;
        }
        update(currentConfig);
        changeStateFn && changeStateFn(false)
        setTimeout(() => {
            destroy(...args);
        }, 200)
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
            changeStateFn: (fn: (b: boolean) => void) => {
                changeStateFn = fn
            }
        });
        vueRender(vm, container as any);
        return vm;
    }

    confirmDialogInstance = render(currentConfig);
    destroyFns.push(close);
    return {
        destroy: close,
        update,
    };
};
