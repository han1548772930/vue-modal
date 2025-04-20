<script setup lang="ts">
import { useDialog } from './hooks/useDialog';
import Button from './components/ui/button/Button.vue';
import { useAlertDialog } from './hooks/useAlertDialog';
import { createVNode, ref, useTemplateRef, type ShallowRef } from 'vue';
import { Icon } from "@iconify/vue";
import { destroyAll } from './hooks/confirm';
import Hello from './components/hello/index.vue';
import MyDialog from './components/customUi/Dialog.vue';
import { useDraggable } from "@vueuse/core"

const open2 = ref(false)
const el = useTemplateRef<HTMLElement>('el')

const { x, y, style } = useDraggable(el, {
  initialValue: { x: 40, y: 40 },
})
// 使用展开对话框钩子

function open() {

  const { destroy } = useDialog({
    title: 'Dialog Title',
    content: 'Dialog Content',
    isMousePosition: true,
    onOk: () => {
      console.log('Confirmed');
      destroy()
    },
    onCancel: () => {
      console.log('Canceled');
    },
  });

}
function openAlert() {
  useAlertDialog({
    title: 'Dialog Title',
    content: 'Dialog Content',
    closable: true,
    onOk: () => {
      console.log('Confirmed');
    },
    onCancel: () => {
      console.log('Canceled');
    },
  });
}
function openTwo() {
  useDialog({
    title: 'Dialog Title',
    content: 'Dialog Content',
    okText: 'open second Dialog',
    isMousePosition: true,
    onOk: () => {
      useDialog({
        title: 'second Dialog Title',
        content: 'destroy all Dialog',
        isMousePosition: true,
        onOk: () => {
          console.log('Confirmed');

          destroyAll();
        },
        onCancel: () => {
          console.log('Canceled');
        },
      });
      console.log('Confirmed');
    },
    onCancel: () => {
      console.log('Canceled');
    },
  });
}
function update() {
  const { update, destroy } = useDialog({
    title: 'Dialog Title',
    content: 'Dialog Content',
    okText: 'update Dialog',
    onOk: () => {
      update({
        title: 'Updated Dialog Title',
        content: 'Updated Dialog Content',
        okText: 'Updated Dialog Ok',
      });
      destroy()
      console.log('Confirmed');
    },
    onCancel: () => {
      console.log('Canceled');
    },
  });
}
function vNode() {
  useDialog({
    title: createVNode('div', { class: 'flex items-center gap-2' }, [
      createVNode(Icon, {
        icon: "akar-icons:discord-fill",
        class: "cursor-pointer"
      }),
      createVNode('span', null, '菜单图标')
    ]),
    content: createVNode('div', {
      class: 'p-4 bg-slate-700',
    }, [
      createVNode(Hello)
    ]),
    cancelText: createVNode('span', {
      class: 'text-red-500 p-2  cursor-pointer'
    }, '取消'),
    onOk: () => {

      console.log('Confirmed');
    },
    onCancel: () => {
      console.log('Canceled');
    },
  });
}
function promise() {
  const { destroy } = useDialog({
    title: 'Dialog Title',
    content: 'two seconds later, the dialog will be closed',
    description: 'Are you sure?',
    onOk: async () => {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(1);
          console.log('Confirmed');
          destroy();
        }, 2000);
      })
    },
    onCancel: () => {
      console.log('Canceled');
    },
  })
}



</script>

<template>

  <div class="w-full h-full flex">
    <div ref="el" :style="style" class="fixed flex flex-col justify-center items-center space-y-2">
      <Button class="cursor-move">Drag</Button>
      <Button @click="open">Open Dialog</Button>
      <Button @click="openAlert">Open Alert Dialog</Button>
      <Button @click="openTwo">Open two Dialog</Button>
      <Button @click="update">update</Button>
      <Button @click="vNode">vNode</Button>
      <Button @click="promise">promise</Button>
      <Button @click="open2 = true">template</Button>

    </div>
  </div>
  <MyDialog v-model:open="open2" :close="() => open2 = false">
    <template #headerTitle>
      <div class="flex items-center gap-2">
        <Icon icon="akar-icons:discord-fill" class="cursor-pointer"></Icon>
        <span>Menu Icon</span>
      </div>
    </template>
    <template #headerDes>
      <div>Dialog Description</div>
    </template>
    <div class="p-4 bg-slate-700">Dialog Content</div>
  </MyDialog>
</template>

<style scoped></style>
