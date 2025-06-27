# 使用指南

## 项目概述

这个示例项目展示了如何在 Vue 3 项目中集成：
- Tailwind CSS 4
- shadcn/vue 组件库
- simple-modal 插件

## 快速开始

### 1. 设置项目

```bash
# 进入项目目录
cd example-project

# 运行设置脚本（Windows PowerShell）
.\setup.ps1

# 或者手动安装依赖
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

项目将在 `http://localhost:3001` 启动。

## 核心配置说明

### Tailwind CSS 4 配置

**vite.config.ts**
```typescript
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  // ...
})
```

**src/styles/globals.css**
```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  /* CSS 变量定义 */
}

@theme inline {
  /* Tailwind 主题配置 */
}
```

### shadcn/vue 配置

**components.json**
```json
{
  "$schema": "https://shadcn-vue.com/schema.json",
  "style": "new-york",
  "typescript": true,
  "tailwind": {
    "css": "src/styles/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  },
  "iconLibrary": "lucide"
}
```

### simple-modal 集成

**package.json**
```json
{
  "dependencies": {
    "simple-modal": "file:../",
    "lucide-vue-next": "^0.523.0",
    "reka-ui": "^2.3.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.1"
  }
}
```

## Modal 使用示例

### 基础确认对话框

```vue
<script setup>
import { Modal } from 'simple-modal'

const showConfirm = () => {
  Modal.confirm({
    title: '确认删除',
    content: '删除后无法恢复，确定要删除吗？',
    onOk: () => {
      console.log('确认删除')
    },
    onCancel: () => {
      console.log('取消删除')
    }
  })
}
</script>
```

### 信息提示对话框

```vue
<script setup>
import { Modal } from 'simple-modal'

const showInfo = () => {
  Modal.info({
    title: '操作成功',
    content: '您的操作已成功完成！',
    okText: '我知道了'
  })
}
</script>
```

### 异步操作对话框

```vue
<script setup>
import { Modal } from 'simple-modal'

const showAsyncModal = () => {
  Modal.confirm({
    title: '保存数据',
    content: '正在保存数据，请稍候...',
    onOk: async () => {
      try {
        // 模拟异步操作
        await saveData()
        Modal.success({
          title: '保存成功',
          content: '数据已成功保存！'
        })
      } catch (error) {
        Modal.error({
          title: '保存失败',
          content: '保存数据时发生错误，请重试。'
        })
      }
    }
  })
}

async function saveData() {
  return new Promise((resolve) => {
    setTimeout(resolve, 2000)
  })
}
</script>
```

### 使用 useModal Hook

```vue
<script setup>
import { useModal } from 'simple-modal'

const { modal } = useModal()

const showModal = () => {
  modal.confirm({
    title: '使用 Hook',
    content: '这是通过 useModal Hook 创建的对话框',
    onOk: () => {
      console.log('Hook 确认')
    }
  })
}
</script>
```

## 主题系统

### 深色模式切换

```vue
<script setup>
import { ref } from 'vue'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
</script>

<template>
  <button @click="toggleTheme">
    {{ isDark ? '切换到亮色模式' : '切换到暗色模式' }}
  </button>
</template>
```

### 使用主题变量

```vue
<template>
  <!-- 使用 shadcn/vue 主题变量 -->
  <div class="bg-background text-foreground">
    <div class="bg-card text-card-foreground p-4 rounded-lg border">
      <h3 class="text-primary">主标题</h3>
      <p class="text-muted-foreground">副文本</p>
      <button class="bg-primary text-primary-foreground px-4 py-2 rounded">
        主要按钮
      </button>
    </div>
  </div>
</template>
```

### 缩放主题

在 HTML 元素上添加 `theme-scaled` 类来启用响应式缩放：

```html
<html class="theme-scaled">
  <!-- 内容 -->
</html>
```

## 添加新组件

### 使用 shadcn/vue CLI

```bash
# 添加按钮组件
npx shadcn-vue@latest add button

# 添加卡片组件
npx shadcn-vue@latest add card

# 添加输入框组件
npx shadcn-vue@latest add input
```

### 手动创建组件

在 `src/components/ui/` 目录下创建新组件，遵循 shadcn/vue 的设计规范。

## 构建和部署

### 开发构建

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

### 类型检查

```bash
npm run type-check
```

## 故障排除

### 常见问题

1. **样式不生效**
   - 确保 `src/styles/globals.css` 被正确导入
   - 检查 Tailwind CSS 配置

2. **Modal 不显示**
   - 确保 simple-modal 依赖已正确安装
   - 检查控制台是否有错误信息

3. **深色模式不工作**
   - 确保 HTML 元素上有 `dark` 类
   - 检查 CSS 变量是否正确定义

### 调试技巧

1. 使用浏览器开发者工具检查元素样式
2. 查看控制台错误信息
3. 确认依赖版本兼容性

## 进一步学习

- [Tailwind CSS 4 文档](https://tailwindcss.com/docs)
- [shadcn/vue 文档](https://shadcn-vue.com)
- [Vue 3 文档](https://vuejs.org)
- [Vite 文档](https://vitejs.dev)
