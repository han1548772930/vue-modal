<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { isVNode } from "vue";
import { Button } from "@/components/ui/button";
import type { ModalFuncProps } from '@/hooks';
import { cn } from '@/lib/utils';
import { LoadingButton } from "./index";
import { Icon } from "@iconify/vue";
import { useDraggableDialog } from '../../hooks/useDraggableDialog';

const props = defineProps<ModalFuncProps>()
const open = defineModel<boolean>('open', { default: false })

const slots = defineSlots<{
  default: any,
  headerTitle: any,
  headerDes: any,
  footer: any
}>()



// 使用通用拖拽方法
const { isDragging } = useDraggableDialog({
  open,
  contentSelector: `.alert-dialog-content-${props.dataId}`,
  headerSelector: '#alert-dialog-header'
})

function close() {
  props.onCancel?.()
  props.close?.()
}
async function confirm() {
  await props.onOk?.()
}
function closeIcon() {
  props.close?.()
}
function onOpenChange(b: boolean) {
  if (!b)
    props.close?.()
}

</script>

<template>
  <AlertDialog v-model:open="open" @update:open="onOpenChange">
    <AlertDialogContent :class="cn(props.class,
      props.width,
      `alert-dialog-content-${dataId}`,
      isDragging && 'duration-0'),
      'select-none'" :OverlayClass="cn(
        'bg-black/50'
      )">
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
            <Button class="mr-3" size="default" variant="outline" @click="close">
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