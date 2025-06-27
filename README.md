# Simple Modal

[English](#english) | [中文](#中文)

---

## English

A lightweight, flexible Vue 3 modal component library built with TypeScript and designed for modern Vue applications.

### ✨ Features

- 🚀 **Vue 3 Composition API** - Built with modern Vue 3 and TypeScript
- 🎨 **Flexible Styling** - Works with any CSS framework (Tailwind CSS, etc.)
- 📱 **Responsive Design** - Mobile-friendly with touch support
- 🔧 **Multiple Usage Patterns** - Component-based and programmatic API
- 🎭 **Rich Animations** - Smooth enter/exit animations with customizable effects
- 🔒 **Focus Management** - Automatic focus trapping and restoration
- ⌨️ **Keyboard Support** - ESC key to close, tab navigation
- 🌙 **Theme Support** - Compatible with dark/light mode themes
- 📦 **Lightweight** - Minimal bundle size with tree-shaking support
- 🛡️ **TypeScript** - Full TypeScript support with type definitions

### 🚀 Quick Start

#### Installation

```bash
npm install simple-modal
# or
yarn add simple-modal
# or
pnpm add simple-modal
```

#### Basic Usage

```vue
<template>
  <div>
    <Button @click="showModal = true">Open Modal</Button>
    
    <Modal v-model:open="showModal" title="Basic Modal">
      <p>This is a basic modal example.</p>
      <template #footer>
        <Button @click="showModal = false">Close</Button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Modal } from 'simple-modal'

const showModal = ref(false)
</script>
```

#### Programmatic Usage

```typescript
import { Modal } from 'simple-modal'

// Info dialog
Modal.info({
  title: 'Information',
  content: 'This is an info message.',
  onOk: () => console.log('OK clicked')
})

// Confirm dialog
Modal.confirm({
  title: 'Confirm Action',
  content: 'Are you sure you want to proceed?',
  onOk: () => console.log('Confirmed'),
  onCancel: () => console.log('Cancelled')
})

// Success dialog
Modal.success({
  title: 'Success',
  content: 'Operation completed successfully!'
})

// Error dialog
Modal.error({
  title: 'Error',
  content: 'Something went wrong.'
})

// Warning dialog
Modal.warning({
  title: 'Warning',
  content: 'Please check your input.'
})
```

### 📖 API Reference

#### Modal Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Controls modal visibility |
| `title` | `string` | - | Modal title |
| `width` | `string \| number` | `520` | Modal width |
| `centered` | `boolean` | `false` | Center modal vertically |
| `closable` | `boolean` | `true` | Show close button |
| `maskClosable` | `boolean` | `true` | Close modal when clicking mask |
| `keyboard` | `boolean` | `true` | Close modal with ESC key |
| `destroyOnClose` | `boolean` | `false` | Destroy modal content when closed |
| `loading` | `boolean` | `false` | Show loading state |
| `confirmLoading` | `boolean` | `false` | Show loading on confirm button |

#### Modal Component Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `update:open` | `(open: boolean)` | Emitted when modal visibility changes |
| `ok` | `(e: Event)` | Emitted when OK button is clicked |
| `cancel` | `(e: Event)` | Emitted when Cancel button is clicked |
| `afterClose` | `()` | Emitted after modal is completely closed |

#### Modal Component Slots

| Slot | Description |
|------|-------------|
| `default` | Modal content |
| `title` | Custom title content |
| `footer` | Custom footer content |

### 🎨 Styling

The modal component is designed to work with your existing CSS framework. You need to include the modal styles in your project:

```css
/* Import your modal styles */
@import 'path/to/your/modal.css';
```

The component uses CSS classes that you can customize:
- `.simple-modal-*` - Modal container classes
- `.simple-dialog-*` - Dialog-specific classes
- `.simple-modal-confirm-*` - Confirm dialog classes

### 🔧 Advanced Usage

#### Custom Animations

```vue
<Modal 
  v-model:open="showModal"
  transition-name="custom-modal"
>
  <!-- Modal content -->
</Modal>
```

#### Async Operations

```typescript
Modal.confirm({
  title: 'Delete Item',
  content: 'This action cannot be undone.',
  onOk: async () => {
    try {
      await deleteItem()
      Modal.success({ content: 'Item deleted successfully!' })
    } catch (error) {
      Modal.error({ content: 'Failed to delete item.' })
    }
  }
})
```

### 📦 Bundle Information

- **ES Module**: ~25KB
- **UMD**: ~18KB
- **TypeScript**: Full type definitions included
- **Tree-shaking**: Supported

---

## 中文

一个轻量级、灵活的 Vue 3 模态框组件库，使用 TypeScript 构建，专为现代 Vue 应用设计。

### ✨ 特性

- 🚀 **Vue 3 组合式 API** - 使用现代 Vue 3 和 TypeScript 构建
- 🎨 **灵活样式** - 兼容任何 CSS 框架（Tailwind CSS 等）
- 📱 **响应式设计** - 移动端友好，支持触摸操作
- 🔧 **多种使用方式** - 组件式和编程式 API
- 🎭 **丰富动画** - 流畅的进入/退出动画，可自定义效果
- 🔒 **焦点管理** - 自动焦点捕获和恢复
- ⌨️ **键盘支持** - ESC 键关闭，Tab 键导航
- 🌙 **主题支持** - 兼容深色/浅色模式主题
- 📦 **轻量级** - 最小打包体积，支持 tree-shaking
- 🛡️ **TypeScript** - 完整的 TypeScript 支持和类型定义

### 🚀 快速开始

#### 安装

```bash
npm install simple-modal
# 或
yarn add simple-modal
# 或
pnpm add simple-modal
```

#### 基础用法

```vue
<template>
  <div>
    <Button @click="showModal = true">打开模态框</Button>
    
    <Modal v-model:open="showModal" title="基础模态框">
      <p>这是一个基础模态框示例。</p>
      <template #footer>
        <Button @click="showModal = false">关闭</Button>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Modal } from 'simple-modal'

const showModal = ref(false)
</script>
```

#### 编程式调用

```typescript
import { Modal } from 'simple-modal'

// 信息对话框
Modal.info({
  title: '信息',
  content: '这是一条信息消息。',
  onOk: () => console.log('确定被点击')
})

// 确认对话框
Modal.confirm({
  title: '确认操作',
  content: '您确定要继续吗？',
  onOk: () => console.log('已确认'),
  onCancel: () => console.log('已取消')
})

// 成功对话框
Modal.success({
  title: '成功',
  content: '操作成功完成！'
})

// 错误对话框
Modal.error({
  title: '错误',
  content: '出现了一些问题。'
})

// 警告对话框
Modal.warning({
  title: '警告',
  content: '请检查您的输入。'
})
```

### 📖 API 参考

#### Modal 组件属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `open` | `boolean` | `false` | 控制模态框显示/隐藏 |
| `title` | `string` | - | 模态框标题 |
| `width` | `string \| number` | `520` | 模态框宽度 |
| `centered` | `boolean` | `false` | 垂直居中显示 |
| `closable` | `boolean` | `true` | 显示关闭按钮 |
| `maskClosable` | `boolean` | `true` | 点击遮罩层关闭 |
| `keyboard` | `boolean` | `true` | ESC 键关闭 |
| `destroyOnClose` | `boolean` | `false` | 关闭时销毁内容 |
| `loading` | `boolean` | `false` | 显示加载状态 |
| `confirmLoading` | `boolean` | `false` | 确认按钮加载状态 |

#### Modal 组件事件

| 事件 | 参数 | 描述 |
|------|------|------|
| `update:open` | `(open: boolean)` | 模态框显示状态改变时触发 |
| `ok` | `(e: Event)` | 点击确定按钮时触发 |
| `cancel` | `(e: Event)` | 点击取消按钮时触发 |
| `afterClose` | `()` | 模态框完全关闭后触发 |

#### Modal 组件插槽

| 插槽 | 描述 |
|------|------|
| `default` | 模态框内容 |
| `title` | 自定义标题内容 |
| `footer` | 自定义底部内容 |

### 🎨 样式

模态框组件设计为与您现有的 CSS 框架配合使用。您需要在项目中包含模态框样式：

```css
/* 导入您的模态框样式 */
@import 'path/to/your/modal.css';
```

组件使用可自定义的 CSS 类：
- `.simple-modal-*` - 模态框容器类
- `.simple-dialog-*` - 对话框特定类
- `.simple-modal-confirm-*` - 确认对话框类

### 🔧 高级用法

#### 自定义动画

```vue
<Modal 
  v-model:open="showModal"
  transition-name="custom-modal"
>
  <!-- 模态框内容 -->
</Modal>
```

#### 异步操作

```typescript
Modal.confirm({
  title: '删除项目',
  content: '此操作无法撤销。',
  onOk: async () => {
    try {
      await deleteItem()
      Modal.success({ content: '项目删除成功！' })
    } catch (error) {
      Modal.error({ content: '删除项目失败。' })
    }
  }
})
```

### 📦 打包信息

- **ES 模块**: ~25KB
- **UMD**: ~18KB
- **TypeScript**: 包含完整类型定义
- **Tree-shaking**: 支持

### 📄 许可证

MIT License

### 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 📞 支持

如果您在使用过程中遇到问题，请提交 Issue 或查看示例项目。
