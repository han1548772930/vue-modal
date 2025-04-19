<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { isVNode, type Ref, ref, watchEffect } from "vue";
import { Button } from "@/components/ui/button";
import type { ModalFuncProps } from '@/hooks';
import { cn } from '@/lib/utils';
import { LoadingButton } from "./index";
import { useDraggableDialog } from './useDraggableDialog';

const props = defineProps<ModalFuncProps>()
const open = ref(props.isOpen || false)

props.changeStateFn && props.changeStateFn(function (b: boolean) {
  open.value = b
})

const slots = defineSlots<{
  default: any,
  headerTitle: any,
  headerDes: any,
  footer: any
}>()

// 使用通用拖拽方法
const { isDragging } = useDraggableDialog({
  open: (open as Ref<boolean>),
  contentSelector: '.dialog-content',
  headerSelector: '#dialog-header'
})

function close() {
  props.onCancel?.()
  props.close?.()
}
async function confirm() {
  await props.onOk?.()
}
function onOpenChange(b: boolean) {
  if (!b)
    props.close?.()
}
watchEffect(() => {
  if (props.isOpen !== undefined) {
    open.value = props.isOpen
  }
})
</script>

<template>
  <Dialog v-model:open="open" @update:open="onOpenChange" >
    <DialogContent :class="cn(props.class, props.width, isDragging && 'duration-0')" class="dialog-content select-none"
      :OverlayClass="cn(
        'bg-black/50'
      )">
      <DialogHeader id="dialog-header" class="select-none cursor-move">
        <DialogTitle>
          <div class="flex items-center justify-between">
            <slot name="headerTitle" v-if="slots.headerTitle"></slot>
            <template v-else-if="isVNode(title)">
              <component :is="title"></component>
            </template>
            <template v-else>
              {{ title }}
            </template>
          </div>
        </DialogTitle>
        <DialogDescription>
          <slot name="headerDes" v-if="slots.headerDes"></slot>
          <template v-else-if="isVNode(description)">
            <component :is="description"></component>
          </template>
          <template v-else-if="description">
            {{ description }}
          </template>
        </DialogDescription>
      </DialogHeader>
      <slot v-if="slots.default"></slot>
      <template v-else-if="isVNode(content)">
        <component :is="content" :class="bodyStyle"></component>
      </template>
      <template v-else>
        {{ content }}
      </template>
      <DialogFooter>
        <slot name="footer" v-if="slots.footer"></slot>
        <template v-else-if="isVNode(footer)">
          <component :is="footer"></component>
        </template>
        <div v-else class="w-full flex justify-end items-center">
          <template v-if="isVNode(cancelText)">
            <component :is="cancelText" @click="close"></component>
          </template>
          <template v-else>
            <Button class="mr-3 w-[60px]" size="default" variant="outline" @click="close">
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
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>