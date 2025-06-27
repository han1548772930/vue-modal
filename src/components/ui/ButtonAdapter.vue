<script setup lang="ts">
import { computed } from 'vue'
import { Loader2 } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import type { ButtonVariants } from '@/components/ui/button'

// Legacy button props interface
interface LegacyButtonProps {
  type?: 'link' | 'default' | 'primary' | 'ghost' | 'dashed' | 'text'
  danger?: boolean
  ghost?: boolean
  loading?: boolean | { delay?: number }
  disabled?: boolean
  block?: boolean
  htmlType?: 'button' | 'submit' | 'reset'
  href?: string
  target?: string
  title?: string
  icon?: any
}

const props = withDefaults(defineProps<LegacyButtonProps>(), {
  type: 'default',
  htmlType: 'button',
  loading: false,
  disabled: false,
  danger: false,
  ghost: false,
  block: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
  mousedown: [event: MouseEvent]
}>()

// Convert legacy props to shadcn-vue props
const variant = computed((): ButtonVariants['variant'] => {
  if (props.danger) {
    return 'destructive'
  } else if (props.ghost) {
    return 'ghost'
  } else if (props.type === 'link') {
    return 'link'
  } else if (props.type === 'dashed') {
    return 'outline'
  } else if (props.type === 'text') {
    return 'ghost'
  } else if (props.type === 'primary') {
    return 'default'
  }
  return 'default'
})

const isLoading = computed(() => {
  const loading = props.loading
  if (typeof loading === 'object' && loading !== null) {
    return true // 如果是对象形式的 loading 配置，认为是 loading 状态
  }
  return Boolean(loading)
})

// 确保按钮内容高度一致
const hasContent = computed(() => {
  return Boolean(props.icon || isLoading.value)
})

const handleClick = (e: MouseEvent) => {
  if (props.disabled || isLoading.value) {
    e.preventDefault()
    return
  }
  emit('click', e)
}

const handleMousedown = (e: MouseEvent) => {
  emit('mousedown', e)
}
</script>

<template>
  <Button :as="href ? 'a' : 'button'" :variant="variant" size="default" :class="{ 'w-full': block }" :href="href"
    :target="target" :title="title" :disabled="disabled || isLoading" @click="handleClick" @mousedown="handleMousedown">
    <!-- 使用固定的图标容器确保高度一致 -->
    <span v-if="hasContent" class="inline-flex items-center justify-center w-4 h-4 mr-2">
      <Loader2 v-if="isLoading" :key="'loading'" class="h-4 w-4 animate-spin" />
      <component v-else-if="icon" :key="'icon'" :is="icon" class="h-4 w-4" />
    </span>
    <slot />
  </Button>
</template>
