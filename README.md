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
- 🖱️ **Draggable Support** - Built-in support for draggable modals with boundary constraints
- 🔒 **Focus Management** - Automatic focus trapping and restoration
- ⌨️ **Keyboard Support** - ESC key to close, tab navigation
- 🌙 **Theme Support** - Compatible with dark/light mode themes
- 📦 **Lightweight** - Minimal bundle size with tree-shaking support
- 🛡️ **TypeScript** - Full TypeScript support with type definitions

### 🚀 Quick Start

#### Installation

```bash
npm install v-modals
# or
yarn add v-modals
# or
pnpm add v-modals
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
import { Modal } from 'v-modals'

const showModal = ref(false)
</script>
```

#### Programmatic Usage

```typescript
import { Modal } from 'v-modals'

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

#### Advanced Examples

##### Using createVNode for Complex Content

```typescript
import { createVNode } from 'vue'
import { Modal } from 'v-modals'

// Complex content with createVNode
Modal.info({
  title: 'Rich Content Modal',
  content: createVNode('div', { class: 'space-y-4' }, [
    createVNode('h3', { class: 'text-lg font-semibold' }, 'Product Information'),
    createVNode('div', { class: 'grid grid-cols-2 gap-4' }, [
      createVNode('div', { class: 'p-3 border rounded' }, [
        createVNode('h4', { class: 'font-medium' }, 'Features'),
        createVNode('ul', { class: 'list-disc list-inside' }, [
          createVNode('li', null, 'High Performance'),
          createVNode('li', null, 'Easy to Use'),
          createVNode('li', null, 'Extensible')
        ])
      ]),
      createVNode('div', { class: 'p-3 border rounded' }, [
        createVNode('h4', { class: 'font-medium' }, 'Specifications'),
        createVNode('p', null, 'Version: 2.0.0'),
        createVNode('p', null, 'Size: 15KB')
      ])
    ])
  ]),
  width: 600
})

// Interactive content with event handlers
Modal.confirm({
  title: 'Interactive Form',
  content: createVNode('form', { class: 'space-y-4' }, [
    createVNode('div', null, [
      createVNode('label', { class: 'block text-sm font-medium' }, 'Name'),
      createVNode('input', {
        type: 'text',
        class: 'w-full px-3 py-2 border rounded',
        placeholder: 'Enter your name'
      })
    ]),
    createVNode('div', null, [
      createVNode('label', { class: 'block text-sm font-medium' }, 'Email'),
      createVNode('input', {
        type: 'email',
        class: 'w-full px-3 py-2 border rounded',
        placeholder: 'Enter your email'
      })
    ])
  ]),
  onOk: () => {
    // Handle form submission
    console.log('Form submitted')
  }
})
```

##### Async Operations with Loading States

```typescript
// Async operation with loading
Modal.confirm({
  title: 'Save Changes',
  content: 'Do you want to save your changes?',
  onOk: async () => {
    try {
      // Show loading state
      const loadingModal = Modal.info({
        title: 'Saving...',
        content: 'Please wait while we save your changes.',
        closable: false,
        maskClosable: false
      })

      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Close loading modal
      loadingModal.destroy()

      // Show success
      Modal.success({
        title: 'Saved Successfully',
        content: 'Your changes have been saved.'
      })
    } catch (error) {
      Modal.error({
        title: 'Save Failed',
        content: 'Failed to save changes. Please try again.'
      })
    }
  }
})
```

##### Nested Modals

```typescript
// Parent modal that opens child modal
Modal.info({
  title: 'Parent Modal',
  content: createVNode('div', { class: 'space-y-4' }, [
    createVNode('p', null, 'This is the parent modal.'),
    createVNode('button', {
      class: 'px-4 py-2 bg-blue-500 text-white rounded',
      onClick: () => {
        Modal.confirm({
          title: 'Child Modal',
          content: 'This is a nested modal!',
          onOk: () => console.log('Child confirmed'),
          onCancel: () => console.log('Child cancelled')
        })
      }
    }, 'Open Child Modal')
  ])
})
```

##### Custom Positioning and Sizing

```typescript
// Custom positioned modal
Modal.info({
  title: 'Custom Modal',
  content: 'This modal has custom positioning and size.',
  width: 800,
  centered: true
})

// Large modal with custom styling
Modal.confirm({
  title: 'Large Confirmation',
  content: 'This is a large modal for important confirmations.',
  width: 900,
  okText: 'Proceed',
  cancelText: 'Go Back',
  centered: true
})

// Full-screen modal
Modal.info({
  title: 'Full Screen Modal',
  content: 'This modal takes up most of the screen.',
  width: '90vw',
  height: '90vh',
  centered: true
})
```

##### Draggable Modal

```vue
<template>
  <div>
    <Button @click="showModal">Open Draggable Modal</Button>
    <Button @click="resetPosition" class="ml-2">Reset Position</Button>

    <Modal
      v-model:open="open"
      :wrap-style="{ overflow: 'hidden' }"
      @ok="handleOk"
      @after-close="handleAfterClose"
    >
      <div class="space-y-4">
        <p>🎯 This is a draggable modal example.</p>
        <p>📱 You can drag the title bar to move the modal.</p>
        <p>🔒 The modal is constrained within the browser window.</p>
        <p>💾 Position is preserved during dragging.</p>

        <div class="bg-gray-50 p-4 rounded-lg">
          <h4 class="font-medium mb-2">Drag Info:</h4>
          <div class="text-sm text-gray-600 space-y-1">
            <div>Position: X: {{ Math.round(transformX) }}px, Y: {{ Math.round(transformY) }}px</div>
            <div>Status: {{ isDragging ? 'Dragging' : 'Static' }}</div>
            <div>Has Moved: {{ startedDrag ? 'Yes' : 'No' }}</div>
          </div>
        </div>
      </div>

      <template #title>
        <div
          ref="modalTitleRef"
          class="w-full cursor-move select-none px-2 py-1 rounded transition-colors duration-200"
          :class="{
            'hover:bg-black/5': !isDragging,
            'bg-blue-50 border border-dashed border-blue-300': isDragging
          }"
        >
          <span class="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="text-gray-500">
              <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
            Draggable Modal (Drag Me)
          </span>
        </div>
      </template>

      <template #modalRender="{ originVNode }">
        <div
          :style="transformStyle"
          :class="{ 'shadow-2xl': isDragging }"
        >
          <component :is="originVNode" />
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import { useDraggable } from '@vueuse/core'
import { Modal } from 'v-modals'

const open = ref(false)
const modalTitleRef = ref()

const showModal = () => {
  open.value = true
}

const handleOk = () => {
  open.value = false
}

const handleAfterClose = () => {
  // Position is preserved after closing
  console.log('Modal closed, position preserved')
}

const resetPosition = () => {
  transformX.value = 0
  transformY.value = 0
  preTransformX.value = 0
  preTransformY.value = 0
  startedDrag.value = false
}

// VueUse draggable
const { x, y, isDragging } = useDraggable(modalTitleRef)

// Drag state management
const startX = ref(0)
const startY = ref(0)
const startedDrag = ref(false)
const transformX = ref(0)
const transformY = ref(0)
const preTransformX = ref(0)
const preTransformY = ref(0)
const dragRect = ref({ left: 0, right: 0, top: 0, bottom: 0 })

// Watch for drag start
watch([x, y], () => {
  if (!startedDrag.value) {
    startX.value = x.value
    startY.value = y.value
    const bodyRect = document.body.getBoundingClientRect()
    // Boundary calculation considering modal size
    dragRect.value.left = 0
    dragRect.value.top = 0
    dragRect.value.right = bodyRect.width - 520 // Assume modal width 520px
    dragRect.value.bottom = bodyRect.height - 400 // Assume modal height ~400px
    preTransformX.value = transformX.value
    preTransformY.value = transformY.value
  }
  startedDrag.value = true
})

// Watch for drag end
watch(isDragging, (dragging) => {
  if (!dragging && startedDrag.value) {
    startedDrag.value = false
  }
})

// Calculate transform with boundary constraints
watchEffect(() => {
  if (startedDrag.value) {
    transformX.value =
      preTransformX.value +
      Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) -
      startX.value
    transformY.value =
      preTransformY.value +
      Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) -
      startY.value
  }
})

// Transform style with no transition during drag
const transformStyle = computed(() => {
  return {
    transform: `translate(${transformX.value}px, ${transformY.value}px)`,
    transition: isDragging.value ? 'none' : 'transform 0.2s ease-out',
  }
})
</script>
```

### 📖 API Reference

#### Modal Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Controls modal visibility |
| `title` | `string` | - | Modal title |
| `content` | `string \| VNode` | - | Modal content (for programmatic usage) |
| `width` | `string \| number` | `520` | Modal width |
| `height` | `string \| number` | - | Modal height |
| `centered` | `boolean` | `false` | Center modal vertically |
| `closable` | `boolean` | `true` | Show close button |
| `mask` | `boolean` | `true` | Show background mask |
| `maskClosable` | `boolean` | `true` | Close modal when clicking mask |
| `keyboard` | `boolean` | `true` | Close modal with ESC key |
| `destroyOnClose` | `boolean` | `false` | Destroy modal content when closed |
| `loading` | `boolean` | `false` | Show loading state |
| `confirmLoading` | `boolean` | `false` | Show loading on confirm button |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | Predefined modal sizes |
| `type` | `'info' \| 'success' \| 'error' \| 'warning' \| 'confirm'` | `'confirm'` | Modal type (affects icon and styling) |
| `okText` | `string` | `'OK'` | OK button text |
| `cancelText` | `string` | `'Cancel'` | Cancel button text |
| `showFooter` | `boolean` | `true` | Show modal footer |
| `showCancel` | `boolean` | `true` | Show cancel button |
| `zIndex` | `number` | `1000` | Modal z-index |
| `forceRender` | `boolean` | `false` | Force render modal content |

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
| `header` | Custom header content |
| `modalRender` | Custom modal wrapper (for draggable functionality) |

#### Programmatic API Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `Modal.info(options)` | `ModalOptions` | Show info modal |
| `Modal.success(options)` | `ModalOptions` | Show success modal |
| `Modal.error(options)` | `ModalOptions` | Show error modal |
| `Modal.warning(options)` | `ModalOptions` | Show warning modal |
| `Modal.confirm(options)` | `ModalOptions` | Show confirm modal |
| `Modal.destroyAll()` | - | Destroy all modals |

#### ModalOptions Interface

```typescript
interface ModalOptions {
  title?: string
  content?: string | VNode | (() => VNode)
  width?: number | string
  height?: number | string
  centered?: boolean
  closable?: boolean
  mask?: boolean
  maskClosable?: boolean
  keyboard?: boolean
  destroyOnClose?: boolean
  size?: 'small' | 'default' | 'large'
  type?: 'info' | 'success' | 'error' | 'warning' | 'confirm'
  okText?: string
  cancelText?: string
  closeText?: string
  showFooter?: boolean
  showCancel?: boolean
  zIndex?: number
  forceRender?: boolean

  // Event handlers
  onOk?: () => void | Promise<any>
  onCancel?: () => void
  onClose?: () => void
  afterClose?: () => void

  // Advanced options
  autoFocusButton?: 'ok' | 'cancel' | null
  okButtonProps?: Record<string, any>
  cancelButtonProps?: Record<string, any>
  class?: string
  style?: Record<string, any>
  wrapClassName?: string
  footer?: VNode
  icon?: Component | string
}
```

#### Return Value

All programmatic methods return an object with the following methods:

```typescript
interface ModalInstance {
  destroy(): void        // Manually destroy the modal
  update(options: Partial<ModalOptions>): void  // Update modal options
}
```

### 🎨 Styling

The modal component is designed to work with your existing CSS framework. You need to include the modal styles in your project:

```css
/* Import your modal styles */
@import 'path/to/your/modal.css';
```

The component uses CSS classes that you can customize:
- `.v-modals-*` - Modal container classes
- `.simple-dialog-*` - Dialog-specific classes
- `.v-modals-confirm-*` - Confirm dialog classes

### 🔧 Advanced Usage

#### Custom Animations

```vue
<Modal
  v-model:open="showModal"
  transition-name="custom-modal"
>
  <!-- Modal content -->
</Modal>

<style>
.custom-modal-enter-active,
.custom-modal-leave-active {
  transition: all 0.3s ease;
}

.custom-modal-enter-from {
  opacity: 0;
  transform: scale(0.8) translateY(-50px);
}

.custom-modal-leave-to {
  opacity: 0;
  transform: scale(1.1) translateY(50px);
}
</style>
```

#### Form Validation with Modals

```typescript
import { createVNode, ref } from 'vue'

const showFormModal = () => {
  const formData = { name: '', email: '', message: '' }

  Modal.confirm({
    title: 'Contact Form',
    content: createVNode('form', { class: 'space-y-4' }, [
      createVNode('div', null, [
        createVNode('label', { class: 'block text-sm font-medium' }, 'Name *'),
        createVNode('input', {
          type: 'text',
          required: true,
          class: 'w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500',
          onInput: (e) => formData.name = e.target.value
        })
      ]),
      createVNode('div', null, [
        createVNode('label', { class: 'block text-sm font-medium' }, 'Email *'),
        createVNode('input', {
          type: 'email',
          required: true,
          class: 'w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500',
          onInput: (e) => formData.email = e.target.value
        })
      ]),
      createVNode('div', null, [
        createVNode('label', { class: 'block text-sm font-medium' }, 'Message'),
        createVNode('textarea', {
          rows: 4,
          class: 'w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500',
          onInput: (e) => formData.message = e.target.value
        })
      ])
    ]),
    onOk: () => {
      // Validate form
      if (!formData.name || !formData.email) {
        Modal.warning({
          title: 'Validation Error',
          content: 'Please fill in all required fields.'
        })
        return false // Prevent modal from closing
      }

      // Submit form
      console.log('Form submitted:', formData)
      Modal.success({
        title: 'Success',
        content: 'Your message has been sent successfully!'
      })
    }
  })
}
```

#### Dynamic Content Updates

```typescript
const showProgressModal = () => {
  let progress = 0
  let modalInstance

  const updateProgress = () => {
    progress += 10
    const content = createVNode('div', { class: 'space-y-4' }, [
      createVNode('p', null, 'Processing your request...'),
      createVNode('div', { class: 'w-full bg-gray-200 rounded-full h-2' }, [
        createVNode('div', {
          class: 'bg-blue-500 h-2 rounded-full transition-all duration-300',
          style: `width: ${progress}%`
        })
      ]),
      createVNode('p', { class: 'text-sm text-gray-600' }, `${progress}% complete`)
    ])

    if (modalInstance) {
      modalInstance.update({ content })
    }

    if (progress < 100) {
      setTimeout(updateProgress, 500)
    } else {
      setTimeout(() => {
        modalInstance.destroy()
        Modal.success({
          title: 'Complete',
          content: 'Processing completed successfully!'
        })
      }, 1000)
    }
  }

  modalInstance = Modal.info({
    title: 'Processing',
    content: createVNode('div', { class: 'space-y-4' }, [
      createVNode('p', null, 'Starting process...'),
      createVNode('div', { class: 'w-full bg-gray-200 rounded-full h-2' }, [
        createVNode('div', {
          class: 'bg-blue-500 h-2 rounded-full',
          style: 'width: 0%'
        })
      ])
    ]),
    closable: false,
    maskClosable: false
  })

  setTimeout(updateProgress, 500)
}
```

#### Conditional Modal Chains

```typescript
const showWizardModal = () => {
  // Step 1
  Modal.confirm({
    title: 'Setup Wizard - Step 1',
    content: 'Welcome to the setup wizard. Do you want to continue?',
    onOk: () => {
      // Step 2
      Modal.confirm({
        title: 'Setup Wizard - Step 2',
        content: 'Please configure your preferences.',
        onOk: () => {
          // Step 3
          Modal.confirm({
            title: 'Setup Wizard - Step 3',
            content: 'Review your settings and confirm.',
            onOk: () => {
              Modal.success({
                title: 'Setup Complete',
                content: 'Your setup has been completed successfully!'
              })
            }
          })
        }
      })
    }
  })
}
```

#### Global Modal Management

```typescript
// Create a modal manager
class ModalManager {
  private modals: Map<string, any> = new Map()

  create(id: string, options: ModalOptions) {
    const modal = Modal.info(options)
    this.modals.set(id, modal)
    return modal
  }

  destroy(id: string) {
    const modal = this.modals.get(id)
    if (modal) {
      modal.destroy()
      this.modals.delete(id)
    }
  }

  destroyAll() {
    this.modals.forEach(modal => modal.destroy())
    this.modals.clear()
  }

  update(id: string, options: Partial<ModalOptions>) {
    const modal = this.modals.get(id)
    if (modal) {
      modal.update(options)
    }
  }
}

// Usage
const modalManager = new ModalManager()

modalManager.create('loading', {
  title: 'Loading',
  content: 'Please wait...',
  closable: false
})

// Later...
modalManager.destroy('loading')
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
- 🖱️ **拖拽支持** - 内置可拖拽模态框支持，带边界限制
- 🔒 **焦点管理** - 自动焦点捕获和恢复
- ⌨️ **键盘支持** - ESC 键关闭，Tab 键导航
- 🌙 **主题支持** - 兼容深色/浅色模式主题
- 📦 **轻量级** - 最小打包体积，支持 tree-shaking
- 🛡️ **TypeScript** - 完整的 TypeScript 支持和类型定义

### 🚀 快速开始

#### 安装

```bash
npm install v-modals
# 或
yarn add v-modals
# 或
pnpm add v-modals
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
import { Modal } from 'v-modals'

const showModal = ref(false)
</script>
```

#### 编程式调用

```typescript
import { Modal } from 'v-modals'

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

#### 高级示例

##### 使用 createVNode 创建复杂内容

```typescript
import { createVNode } from 'vue'
import { Modal } from 'v-modals'

// 使用 createVNode 创建复杂内容
Modal.info({
  title: '产品信息',
  content: createVNode('div', { class: 'space-y-4' }, [
    createVNode('h3', { class: 'text-lg font-semibold' }, '产品详情'),
    createVNode('div', { class: 'grid grid-cols-2 gap-4' }, [
      createVNode('div', { class: 'p-3 border rounded' }, [
        createVNode('h4', { class: 'font-medium' }, '特性'),
        createVNode('ul', { class: 'list-disc list-inside' }, [
          createVNode('li', null, '高性能'),
          createVNode('li', null, '易于使用'),
          createVNode('li', null, '可扩展')
        ])
      ]),
      createVNode('div', { class: 'p-3 border rounded' }, [
        createVNode('h4', { class: 'font-medium' }, '规格'),
        createVNode('p', null, '版本: 2.0.0'),
        createVNode('p', null, '大小: 15KB')
      ])
    ])
  ]),
  width: 600
})

// 带事件处理的交互式内容
Modal.confirm({
  title: '交互式表单',
  content: createVNode('form', { class: 'space-y-4' }, [
    createVNode('div', null, [
      createVNode('label', { class: 'block text-sm font-medium' }, '姓名'),
      createVNode('input', {
        type: 'text',
        class: 'w-full px-3 py-2 border rounded',
        placeholder: '请输入您的姓名'
      })
    ]),
    createVNode('div', null, [
      createVNode('label', { class: 'block text-sm font-medium' }, '邮箱'),
      createVNode('input', {
        type: 'email',
        class: 'w-full px-3 py-2 border rounded',
        placeholder: '请输入您的邮箱'
      })
    ])
  ]),
  onOk: () => {
    // 处理表单提交
    console.log('表单已提交')
  }
})
```

##### 带加载状态的异步操作

```typescript
// 带加载状态的异步操作
Modal.confirm({
  title: '保存更改',
  content: '您要保存更改吗？',
  onOk: async () => {
    try {
      // 显示加载状态
      const loadingModal = Modal.info({
        title: '保存中...',
        content: '请稍候，正在保存您的更改。',
        closable: false,
        maskClosable: false
      })

      // 模拟异步操作
      await new Promise(resolve => setTimeout(resolve, 2000))

      // 关闭加载模态框
      loadingModal.destroy()

      // 显示成功消息
      Modal.success({
        title: '保存成功',
        content: '您的更改已保存。'
      })
    } catch (error) {
      Modal.error({
        title: '保存失败',
        content: '保存更改失败，请重试。'
      })
    }
  }
})
```

##### 嵌套模态框

```typescript
// 打开子模态框的父模态框
Modal.info({
  title: '父模态框',
  content: createVNode('div', { class: 'space-y-4' }, [
    createVNode('p', null, '这是父模态框。'),
    createVNode('button', {
      class: 'px-4 py-2 bg-blue-500 text-white rounded',
      onClick: () => {
        Modal.confirm({
          title: '子模态框',
          content: '这是一个嵌套的模态框！',
          onOk: () => console.log('子模态框确认'),
          onCancel: () => console.log('子模态框取消')
        })
      }
    }, '打开子模态框')
  ])
})
```

##### 可拖拽模态框

```vue
<template>
  <div>
    <Button @click="showModal">打开可拖拽模态框</Button>
    <Button @click="resetPosition" class="ml-2">重置位置</Button>

    <Modal
      v-model:open="open"
      :wrap-style="{ overflow: 'hidden' }"
      @ok="handleOk"
      @after-close="handleAfterClose"
    >
      <div class="space-y-4">
        <p>🎯 这是一个可拖拽的模态框示例。</p>
        <p>📱 您可以通过拖拽标题栏来移动模态框。</p>
        <p>🔒 模态框会被限制在浏览器窗口内。</p>
        <p>💾 位置会在拖拽过程中保持记忆。</p>

        <div class="bg-gray-50 p-4 rounded-lg">
          <h4 class="font-medium mb-2">拖拽信息：</h4>
          <div class="text-sm text-gray-600 space-y-1">
            <div>当前位置: X: {{ Math.round(transformX) }}px, Y: {{ Math.round(transformY) }}px</div>
            <div>拖拽状态: {{ isDragging ? '拖拽中' : '静止' }}</div>
            <div>已拖拽: {{ startedDrag ? '是' : '否' }}</div>
          </div>
        </div>
      </div>

      <template #title>
        <div
          ref="modalTitleRef"
          class="w-full cursor-move select-none px-2 py-1 rounded transition-colors duration-200"
          :class="{
            'hover:bg-black/5': !isDragging,
            'bg-blue-50 border border-dashed border-blue-300': isDragging
          }"
        >
          <span class="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="text-gray-500">
              <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
            可拖拽模态框 (拖拽我)
          </span>
        </div>
      </template>

      <template #modalRender="{ originVNode }">
        <div
          :style="transformStyle"
          :class="{ 'shadow-2xl': isDragging }"
        >
          <component :is="originVNode" />
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed, watch, watchEffect } from 'vue'
import { useDraggable } from '@vueuse/core'
import { Modal } from 'v-modals'

const open = ref(false)
const modalTitleRef = ref()

const showModal = () => {
  open.value = true
}

const handleOk = () => {
  open.value = false
}

const handleAfterClose = () => {
  // 关闭后保持位置
  console.log('模态框已关闭，位置已保留')
}

const resetPosition = () => {
  transformX.value = 0
  transformY.value = 0
  preTransformX.value = 0
  preTransformY.value = 0
  startedDrag.value = false
}

// VueUse 拖拽功能
const { x, y, isDragging } = useDraggable(modalTitleRef)

// 拖拽状态管理
const startX = ref(0)
const startY = ref(0)
const startedDrag = ref(false)
const transformX = ref(0)
const transformY = ref(0)
const preTransformX = ref(0)
const preTransformY = ref(0)
const dragRect = ref({ left: 0, right: 0, top: 0, bottom: 0 })

// 监听拖拽开始
watch([x, y], () => {
  if (!startedDrag.value) {
    startX.value = x.value
    startY.value = y.value
    const bodyRect = document.body.getBoundingClientRect()
    // 边界计算，考虑模态框大小
    dragRect.value.left = 0
    dragRect.value.top = 0
    dragRect.value.right = bodyRect.width - 520 // 假设模态框宽度 520px
    dragRect.value.bottom = bodyRect.height - 400 // 假设模态框高度约 400px
    preTransformX.value = transformX.value
    preTransformY.value = transformY.value
  }
  startedDrag.value = true
})

// 监听拖拽结束
watch(isDragging, (dragging) => {
  if (!dragging && startedDrag.value) {
    startedDrag.value = false
  }
})

// 计算带边界限制的变换
watchEffect(() => {
  if (startedDrag.value) {
    transformX.value =
      preTransformX.value +
      Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) -
      startX.value
    transformY.value =
      preTransformY.value +
      Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) -
      startY.value
  }
})

// 拖拽时无过渡效果的变换样式
const transformStyle = computed(() => {
  return {
    transform: `translate(${transformX.value}px, ${transformY.value}px)`,
    transition: isDragging.value ? 'none' : 'transform 0.2s ease-out',
  }
})
</script>
```

### 📖 API 参考

#### Modal 组件属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `open` | `boolean` | `false` | 控制模态框显示/隐藏 |
| `title` | `string` | - | 模态框标题 |
| `content` | `string \| VNode` | - | 模态框内容（编程式调用时使用） |
| `width` | `string \| number` | `520` | 模态框宽度 |
| `height` | `string \| number` | - | 模态框高度 |
| `centered` | `boolean` | `false` | 垂直居中显示 |
| `closable` | `boolean` | `true` | 显示关闭按钮 |
| `mask` | `boolean` | `true` | 显示背景遮罩 |
| `maskClosable` | `boolean` | `true` | 点击遮罩层关闭 |
| `keyboard` | `boolean` | `true` | ESC 键关闭 |
| `destroyOnClose` | `boolean` | `false` | 关闭时销毁内容 |
| `loading` | `boolean` | `false` | 显示加载状态 |
| `confirmLoading` | `boolean` | `false` | 确认按钮加载状态 |
| `size` | `'small' \| 'default' \| 'large'` | `'default'` | 预定义模态框尺寸 |
| `type` | `'info' \| 'success' \| 'error' \| 'warning' \| 'confirm'` | `'confirm'` | 模态框类型（影响图标和样式） |
| `okText` | `string` | `'确定'` | 确定按钮文本 |
| `cancelText` | `string` | `'取消'` | 取消按钮文本 |
| `showFooter` | `boolean` | `true` | 显示模态框底部 |
| `showCancel` | `boolean` | `true` | 显示取消按钮 |
| `zIndex` | `number` | `1000` | 模态框层级 |
| `forceRender` | `boolean` | `false` | 强制渲染模态框内容 |

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
| `header` | 自定义头部内容 |
| `modalRender` | 自定义模态框包装器（用于拖拽功能） |

#### 编程式 API 方法

| 方法 | 参数 | 描述 |
|------|------|------|
| `Modal.info(options)` | `ModalOptions` | 显示信息模态框 |
| `Modal.success(options)` | `ModalOptions` | 显示成功模态框 |
| `Modal.error(options)` | `ModalOptions` | 显示错误模态框 |
| `Modal.warning(options)` | `ModalOptions` | 显示警告模态框 |
| `Modal.confirm(options)` | `ModalOptions` | 显示确认模态框 |
| `Modal.destroyAll()` | - | 销毁所有模态框 |

#### ModalOptions 接口

```typescript
interface ModalOptions {
  title?: string                    // 标题
  content?: string | VNode | (() => VNode)  // 内容
  width?: number | string           // 宽度
  height?: number | string          // 高度
  centered?: boolean                // 居中显示
  closable?: boolean                // 可关闭
  mask?: boolean                    // 显示遮罩
  maskClosable?: boolean            // 点击遮罩关闭
  keyboard?: boolean                // 键盘支持
  destroyOnClose?: boolean          // 关闭时销毁
  size?: 'small' | 'default' | 'large'  // 尺寸
  type?: 'info' | 'success' | 'error' | 'warning' | 'confirm'  // 类型
  okText?: string                   // 确定按钮文本
  cancelText?: string               // 取消按钮文本
  closeText?: string                // 关闭按钮文本
  showFooter?: boolean              // 显示底部
  showCancel?: boolean              // 显示取消按钮
  zIndex?: number                   // 层级
  forceRender?: boolean             // 强制渲染

  // 事件处理器
  onOk?: () => void | Promise<any>  // 确定回调
  onCancel?: () => void             // 取消回调
  onClose?: () => void              // 关闭回调
  afterClose?: () => void           // 关闭后回调

  // 高级选项
  autoFocusButton?: 'ok' | 'cancel' | null  // 自动聚焦按钮
  okButtonProps?: Record<string, any>       // 确定按钮属性
  cancelButtonProps?: Record<string, any>   // 取消按钮属性
  class?: string                            // 自定义类名
  style?: Record<string, any>               // 自定义样式
  wrapClassName?: string                    // 包装器类名
  footer?: VNode                            // 自定义底部
  icon?: Component | string                 // 自定义图标
}
```

#### 返回值

所有编程式方法都返回一个包含以下方法的对象：

```typescript
interface ModalInstance {
  destroy(): void                           // 手动销毁模态框
  update(options: Partial<ModalOptions>): void  // 更新模态框选项
}
```

### 🎨 样式

模态框组件设计为与您现有的 CSS 框架配合使用。您需要在项目中包含模态框样式：

```css
/* 导入您的模态框样式 */
@import 'path/to/your/modal.css';
```

组件使用可自定义的 CSS 类：
- `.v-modals-*` - 模态框容器类
- `.simple-dialog-*` - 对话框特定类
- `.v-modals-confirm-*` - 确认对话框类

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
