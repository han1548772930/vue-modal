# Tailwind CSS 4 + daisyUI 示例项目

这是一个使用 Tailwind CSS 4 和 daisyUI 的示例项目,展示了如何集成和使用 simple-modal 插件。

## 功能特性

- ✨ **Tailwind CSS 4**: 使用最新的 Tailwind CSS 4 和 @tailwindcss/vite 插件
- 🎨 **daisyUI**: 集成 daisyUI 组件库和主题系统
- 🌙 **深色模式**: 支持亮色/暗色主题切换
- 📱 **响应式设计**: 完全响应式,支持各种屏幕尺寸
- 🚀 **TypeScript**: 完整的 TypeScript 支持
- 🎯 **Modal 组件**: 集成 simple-modal 插件的各种使用示例

## 快速开始

### 1. 安装依赖

```bash
cd example-project
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

### 3. 构建生产版本

```bash
npm run build
```

## 项目结构

```
example-project/
├── src/
│   ├── components/          # Vue 组件
│   ├── lib/                # 工具函数
│   │   └── utils.ts        # 工具函数
│   ├── styles/             # 样式文件
│   │   └── globals.css     # 全局样式和 Tailwind CSS 配置
│   ├── App.vue             # 主应用组件
│   └── main.ts             # 应用入口
├── components.json         # 组件配置（可选）
├── package.json            # 项目配置
├── tsconfig.json           # TypeScript 配置
└── vite.config.ts          # Vite 配置
```

## Modal 使用示例

### 基础用法

```vue
<script setup>
import { Modal } from 'simple-modal'

const showModal = () => {
  Modal.confirm({
    title: '确认操作',
    content: '您确定要执行此操作吗？',
    onOk: () => {
      console.log('用户点击了确认')
    }
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
    title: '确认操作',
    content: '您确定要执行此操作吗？'
  })
}
</script>
```

## 主题配置

项目使用 daisyUI 的主题系统,支持：

- 多种预设主题（neutral、stone、zinc、gray、slate）
- 深色/亮色模式切换
- 自定义 CSS 变量
- 响应式缩放主题（theme-scaled）

## 技术栈

- **Vue 3**: 渐进式 JavaScript 框架
- **TypeScript**: 类型安全的 JavaScript
- **Vite**: 快速的构建工具
- **Tailwind CSS 4**: 实用优先的 CSS 框架
- **daisyUI**: 基于 Tailwind 的组件库
- **Lucide Vue**: 美观的图标库
- **simple-modal**: 简洁的 Modal 组件库

## 开发说明

1. 本项目使用 `file:../` 引用父目录的 simple-modal 插件
2. 样式系统基于 Tailwind CSS 4 的新特性
3. 组件库使用 daisyUI 的主题系统
4. 支持完整的 TypeScript 类型检查

## 许可证

MIT
