<template>
  <div class="min-h-screen bg-background text-foreground theme-scaled">
    <div class="container mx-auto p-8">
      <div class="max-w-6xl mx-auto space-y-8">
        <!-- Header -->
        <div class="text-center space-y-4">
          <h1 class="text-4xl font-bold">Tailwind CSS 4 + shadcn/vue 示例</h1>
          <p class="text-muted-foreground text-lg">
            使用 simple-modal 插件的完整示例项目
          </p>
          <div class="flex justify-center">
            <button @click="toggleTheme"
              class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
              <Sun v-if="isDark" class="h-4 w-4" />
              <Moon v-else class="h-4 w-4" />
              <span class="ml-2">{{ isDark ? '切换到亮色模式' : '切换到暗色模式' }}</span>
            </button>
          </div>
        </div>

        <!-- Demo Examples -->
        <div class="space-y-6">
          <BasicDemo />
          <DraggableDemo />
          <DraggableHookDemo />
          <ConfirmDemo />
          <InfoDemo />
          <CreateVNodeDemo />
          <HookModalDemo />
          <AsyncDemo />
          <CustomFooterDemo />
          <ManualDemo />
          <PositionDemo />
          <ConfirmRouterDemo />
        </div>

        <!-- Features -->
        <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <h3 class="text-lg font-semibold mb-4">功能特性</h3>
          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-2">
              <h4 class="font-medium">✨ Tailwind CSS 4</h4>
              <p class="text-sm text-muted-foreground">
                使用最新的 Tailwind CSS 4 和 @tailwindcss/vite 插件
              </p>
            </div>
            <div class="space-y-2">
              <h4 class="font-medium">🎨 shadcn/vue</h4>
              <p class="text-sm text-muted-foreground">
                集成 shadcn/vue 组件库和主题系统
              </p>
            </div>
            <div class="space-y-2">
              <h4 class="font-medium">🌙 深色模式</h4>
              <p class="text-sm text-muted-foreground">
                支持亮色/暗色主题切换
              </p>
            </div>
            <div class="space-y-2">
              <h4 class="font-medium">📱 响应式</h4>
              <p class="text-sm text-muted-foreground">
                完全响应式设计，支持各种屏幕尺寸
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Sun, Moon } from 'lucide-vue-next'

// Import all demo components
import BasicDemo from './demos/BasicDemo.vue'
import DraggableDemo from './demos/DraggableDemo.vue'
import DraggableHookDemo from './demos/DraggableHookDemo.vue'
import ConfirmDemo from './demos/ConfirmDemo.vue'
import InfoDemo from './demos/InfoDemo.vue'
import CreateVNodeDemo from './demos/CreateVNodeDemo.vue'
import HookModalDemo from './demos/HookModalDemo.vue'
import AsyncDemo from './demos/AsyncDemo.vue'
import CustomFooterDemo from './demos/CustomFooterDemo.vue'
import ManualDemo from './demos/ManualDemo.vue'
import PositionDemo from './demos/PositionDemo.vue'
import ConfirmRouterDemo from './demos/ConfirmRouterDemo.vue'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

onMounted(() => {
  // 检查系统主题偏好
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>
