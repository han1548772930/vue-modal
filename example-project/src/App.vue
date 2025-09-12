<template>
  <div class="min-h-screen bg-background text-foreground theme-scaled">
    <div class="container mx-auto p-8">
      <div class="max-w-6xl mx-auto space-y-8">
        <!-- Header -->
        <div class="text-center space-y-4">
          <h1 class="text-4xl font-bold">Tailwind CSS 4 + daisyUI 示例</h1>
          <p class="text-muted-foreground text-lg">
            使用 simple-modal 插件的完整示例项目
          </p>

          <!-- 语言和主题切换 -->
          <div class="flex justify-center gap-4">
            <!-- 语言切换 -->
            <div class="dropdown dropdown-end">
              <div tabindex="0" role="button" class="btn btn-sm gap-2 btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z">
                  </path>
                </svg>
                <span>{{ currentLocaleName }}</span>
              </div>
              <ul tabindex="0" class="dropdown-content menu bg-base-200 rounded-box w-52 p-2 shadow z-10">
                <li v-for="locale in locales" :key="locale.value">
                  <button @click="changeLocale(locale.value)" :class="currentLocale === locale.value ? 'active' : ''">
                    {{ locale.label }}
                  </button>
                </li>
              </ul>
            </div>

            <!-- 主题切换 -->
            <div title="Change Theme" class="dropdown dropdown-end">
              <div tabindex="0" role="button" class="btn group btn-sm gap-1.5 px-1.5 btn-ghost"
                aria-label="Change Theme">
                <div
                  class="bg-base-100 group-hover:border-base-content/20 border-base-content/10 grid shrink-0 grid-cols-2 gap-0.5 rounded-md border p-1 transition-colors">
                  <div class="bg-base-content size-1 rounded-full"></div>
                  <div class="bg-primary size-1 rounded-full"></div>
                  <div class="bg-secondary size-1 rounded-full"></div>
                  <div class="bg-accent size-1 rounded-full"></div>
                </div>
                <svg width="12px" height="12px" class="mt-px hidden size-2 fill-current opacity-60 sm:inline-block"
                  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
                  <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                </svg>
              </div>
              <div tabindex="0"
                class="dropdown-content bg-base-200 text-base-content rounded-box max-h-96 overflow-y-auto border-[length:var(--border)] border-white/5 shadow-2xl outline-[length:var(--border)] outline-black/5 mt-2">
                <ul class="menu w-56">
                  <li class="menu-title text-xs">主题</li>
                  <li v-for="theme in themes" :key="theme.value">
                    <button class="gap-3 px-2" :class="currentTheme === theme.value ? '[&_svg]:visible' : ''"
                      :data-set-theme="theme.value" @click="setTheme(theme.value)">
                      <div :data-theme="theme.value"
                        class="bg-base-100 grid shrink-0 grid-cols-2 gap-0.5 rounded-md p-1 shadow-sm">
                        <div class="bg-base-content size-1 rounded-full"></div>
                        <div class="bg-primary size-1 rounded-full"></div>
                        <div class="bg-secondary size-1 rounded-full"></div>
                        <div class="bg-accent size-1 rounded-full"></div>
                      </div>
                      <div class="w-32 truncate">{{ theme.label }}</div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                        fill="currentColor" class="invisible h-3 w-3 shrink-0">
                        <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
                      </svg>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Demo Examples -->
        <div class="space-y-6">
          <AddLanguageDemo />
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
              <h4 class="font-medium">🎨 daisyUI</h4>
              <p class="text-sm text-muted-foreground">
                集成 daisyUI 组件库和主题系统
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
                完全响应式设计,支持各种屏幕尺寸
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'


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
import AddLanguageDemo from './demos/AddLanguageDemo.vue'
import { Modal } from 'simple-modal';
interface Theme { value: string; label: string }
// DaisyUI 主题列表
const themes: Theme[] = [
  { value: 'light', label: 'light' },
  { value: 'dark', label: 'dark' },
  { value: 'cupcake', label: 'cupcake' },
  { value: 'bumblebee', label: 'bumblebee' },
  { value: 'emerald', label: 'emerald' },
  { value: 'corporate', label: 'corporate' },
  { value: 'synthwave', label: 'synthwave' },
  { value: 'retro', label: 'retro' },
  { value: 'cyberpunk', label: 'cyberpunk' },
  { value: 'valentine', label: 'valentine' },
  { value: 'halloween', label: 'halloween' },
  { value: 'garden', label: 'garden' },
  { value: 'forest', label: 'forest' },
  { value: 'aqua', label: 'aqua' },
  { value: 'lofi', label: 'lofi' },
  { value: 'pastel', label: 'pastel' },
  { value: 'fantasy', label: 'fantasy' },
  { value: 'wireframe', label: 'wireframe' },
  { value: 'black', label: 'black' },
  { value: 'luxury', label: 'luxury' },
  { value: 'dracula', label: 'dracula' },
  { value: 'cmyk', label: 'cmyk' },
  { value: 'autumn', label: 'autumn' },
  { value: 'business', label: 'business' },
  { value: 'acid', label: 'acid' },
  { value: 'lemonade', label: 'lemonade' },
  { value: 'night', label: 'night' },
  { value: 'coffee', label: 'coffee' },
  { value: 'winter', label: 'winter' },
  { value: 'dim', label: 'dim' },
  { value: 'nord', label: 'nord' },
  { value: 'sunset', label: 'sunset' },
  { value: 'abyss', label: 'abyss' },
  { value: 'silk', label: 'silk' },
  { value: 'caramellatte', label: 'caramellatte' }
]

// 语言配置 - 初始只显示插件内置的语言
const locales = ref([
  { value: 'zh-CN', label: '简体中文' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
])

const currentLocale = ref('zh-CN')
const currentLocaleName = computed(() => {
  return locales.value.find(l => l.value === currentLocale.value)?.label || currentLocale.value
})

const changeLocale = (locale: string) => {
  currentLocale.value = locale
  Modal.setLocale(locale)
}

// 主题配置
const currentTheme = ref<string>('light')

const applyTheme = (theme: string) => {
  document.documentElement.setAttribute('data-theme', theme)
  currentTheme.value = theme
  try { localStorage.setItem('daisyui-theme', theme) } catch { }
}

const setTheme = (theme: string) => {
  applyTheme(theme)
}

onMounted(() => {
  // 初始化语言
  if (Modal.getLocale) {
    currentLocale.value = Modal.getLocale()
  }

  // 监听动态添加语言事件
  window.addEventListener('language-added', (event: any) => {
    const { value, label } = event.detail
    // 检查是否已经存在
    if (!locales.value.find(l => l.value === value)) {
      locales.value.push({ value, label })
    }
  })

  // 初始化主题
  const saved = (() => { try { return localStorage.getItem('daisyui-theme') } catch { return null } })()
  if (saved) return applyTheme(saved)
  const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  applyTheme(prefersDark ? 'dark' : 'light')
})
</script>
