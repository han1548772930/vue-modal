<script setup lang="ts">
import { computed } from 'vue'
import { Loader2 } from 'lucide-vue-next'

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

// 计算 daisyUI 按钮类名
const variantClass = computed(() => {
  if (props.danger) return 'btn-error'
  if (props.ghost || props.type === 'text') return 'btn-ghost'
  if (props.type === 'link') return 'btn-link'
  if (props.type === 'dashed') return 'btn-outline'
  if (props.type === 'primary') return 'btn-primary'
  return 'btn-primary'
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
  <component :is="href ? 'a' : 'button'" :href="href" :target="target" :title="title"
    :type="href ? undefined : htmlType" :disabled="disabled || isLoading" @click="handleClick"
    @mousedown="handleMousedown" :class="['btn', variantClass, { 'btn-block': block }]">
    <!-- 使用固定的图标容器确保高度一致 -->
    <span v-if="hasContent" class="inline-flex items-center justify-center w-4 h-4 mr-2">
      <Loader2 v-if="isLoading" :key="'loading'" class="h-4 w-4 animate-spin" />
      <component v-else-if="icon" :key="'icon'" :is="icon" class="h-4 w-4" />
    </span>
    <slot />
  </component>
</template>
