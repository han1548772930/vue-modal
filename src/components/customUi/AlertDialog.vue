<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { type CSSProperties, nextTick, onBeforeUnmount, onMounted, ref, watch, watchEffect, isVNode, type HTMLAttributes } from "vue";
import { Button } from "@/components/ui/button";
import { useDraggable } from "@vueuse/core";
import type { VueNode } from '@/hooks';
import { cn } from '@/lib/utils';
import { LoadingButton } from "./index";
import { Icon } from "@iconify/vue";



const props = defineProps<{
  class?: HTMLAttributes['class'];
  title?: string | (() => VueNode) | VueNode;
  footer?: string | (() => VueNode) | VueNode;
  content?: string | (() => VueNode) | VueNode;
  description?: string | (() => VueNode) | VueNode;
  onOk?: (...args: any[]) => any;
  onCancel?: (...args: any[]) => any;
  width?: string;
  okText?: string | (() => VueNode) | VueNode;
  cancelText?: string | (() => VueNode) | VueNode;
  type?: 'info' | 'success' | 'error' | 'warn' | 'warning' | 'confirm';
  bodyStyle?: CSSProperties;
  close?: Function
  closable?: boolean
  open?: boolean
  changeStateFn?: (a: (b: boolean) => void) => void
}>()
const open = defineModel<boolean>('open');
const dialogTitleRef = ref<HTMLElement | null>(null);
const dialogContentRef = ref<HTMLElement | null>(null);
const { x, y, isDragging } = useDraggable(dialogTitleRef);
const slots = defineSlots<{
  default: any,
  headerTitle: any,
  headerDes: any,
  footer: any
}>()

props.changeStateFn && props.changeStateFn(function (b: boolean) {
  open.value = b
})
const startX = ref<number>(0);
const startY = ref<number>(0);
const startedDrag = ref(false);
const transformX = ref(0);
const transformY = ref(0);
const preTransformX = ref(0);
const preTransformY = ref(0);
const dragRect = ref({ left: 0, right: 0, top: 0, bottom: 0 });

const w1 = watch([x, y], () => {
  if (!startedDrag.value && dialogTitleRef.value && dialogContentRef.value) {
    startX.value = x.value;
    startY.value = y.value;
    const bodyRect = document.body.getBoundingClientRect();
    const titleRect = dialogTitleRef.value.getBoundingClientRect();
    dragRect.value.left = 0;
    dragRect.value.top = 0;
    dragRect.value.right = bodyRect.width - titleRect.width;
    dragRect.value.bottom = bodyRect.height - titleRect.height;
    preTransformX.value = transformX.value;
    preTransformY.value = transformY.value;
  }
  if (isDragging.value) {
    startedDrag.value = true;
  }
});

const w2 = watch(isDragging, () => {
  if (!isDragging.value) {
    startedDrag.value = false;
  }
});

watchEffect(() => {
  if (startedDrag.value) {
    transformX.value =
      preTransformX.value +
      Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) -
      startX.value;
    transformY.value =
      preTransformY.value +
      Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) -
      startY.value;
    if (dialogContentRef.value) {
      if (transformX.value === 0 && transformY.value === 0) {
        return
      } else {
        // dialogContentRef.value.style.transform = `translate(calc(-50% + ${transformX.value}px), calc(-50% + ${transformY.value}px))`;
        dialogContentRef.value.style.transform = `translate(${transformX.value}px,${transformY.value}px)`;
      }
    }
  }
});

const bindingEl = () => {
  nextTick(() => {
    const dialogHeaders = document.querySelectorAll('#alert-dialog-header');
    const dialogContents = document.querySelectorAll('.alert-dialog-content');
    // console.log(dialogHeaders, dialogContents)
    dialogTitleRef.value = dialogHeaders[dialogHeaders.length - 1] as HTMLElement;
    dialogContentRef.value = dialogContents[dialogContents.length - 1] as HTMLElement;
    // Reset initial positions
    startX.value = 0;
    startY.value = 0;
    preTransformX.value = 0;
    preTransformY.value = 0;
    transformX.value = 0;
    transformY.value = 0;
    // if (dialogContentRef.value) {
    //   dialogContentRef.value.style.transform = 'translate(-50%, -50%)';
    // }
  });
};
onMounted(() => {
  bindingEl()
})
onBeforeUnmount(() => {
  w1();
  w2();
})
watchEffect(() => {

  if (open.value && dialogContentRef.value == null && dialogTitleRef.value == null) {
    bindingEl()
  }
  if (!open.value) {
    dialogContentRef.value = null;
    dialogTitleRef.value = null;
  }
})

function close() {
  open.value = false
  props.onCancel?.()
  props.close?.()

}
async function confirm() {
  await props.onOk?.()

}
function closeIcon() {
  props.close?.()
  open.value = false
}
function onOpenChange(b: boolean) {
  if (!b)
    setTimeout(() => {
      props.close?.()
    }, 500)
}
</script>

<template>
  <AlertDialog v-model:open="open" @update:open="onOpenChange">

    <AlertDialogContent :class="cn(props.class, props.width, isDragging && 'duration-0')"
      class="alert-dialog-content select-none">
      <AlertDialogHeader id="alert-dialog-header" class="select-none cursor-move">
        <AlertDialogTitle>
          <div class="flex items-center justify-between">
            <slot name="headerTitle" v-if="slots.headerTitle"></slot>
            <template v-else-if="isVNode(title)">
              <component :is="title"></component>
            </template>
            <template v-else>
              {{ title }}
            </template>
            <Icon icon="line-md:menu-to-close-transition" class="cursor-pointer" v-if="closable" @click="closeIcon">
            </Icon>
          </div>
        </AlertDialogTitle>
        <AlertDialogDescription>
          <slot name="headerDes" v-if="slots.headerDes"></slot>
          <template v-else-if="isVNode(description)">
            <component :is="description"></component>
          </template>
          <template v-else-if="description">
            {{ description }}
          </template>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <slot v-if="slots.default"></slot>
      <template v-else-if="isVNode(content)">
        <component :is="content" :class="bodyStyle"></component>
      </template>
      <template v-else>
        {{ content }}
      </template>
      <AlertDialogFooter>
        <slot name="footer" v-if="slots.footer"></slot>
        <template v-else-if="isVNode(footer)">
          <component :is="footer"></component>
        </template>
        <div v-else class="w-full flex justify-end items-center">
          <template v-if="isVNode(cancelText)">
            <component :is="cancelText" @click="close"></component>
          </template>
          <template v-else>
            <Button class="mr-3 px-6" size="default" variant="outline" @click="close">
              {{ cancelText || '取消' }}
            </Button>
          </template>
          <template v-if="isVNode(okText)">
            <component :is="okText" @click="confirm"></component>
          </template>
          <template v-else>
            <LoadingButton :label="okText || '确认'" :click="confirm"></LoadingButton>
          </template>
        </div>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>