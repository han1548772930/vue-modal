# Simple Modal

[English](#english) | [中文](#中文) | [🎨 CSS Styling System](#-css-styling-system--css-样式系统)

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

#### Setup Styles

The modal component requires CSS styles to display properly. Please refer to the [CSS Styling System](#-css-styling-system--css-样式系统) section at the end of this document for a complete style file example.

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

// Large modal
Modal.info({
  title: 'Large Modal',
  content: 'This is a large modal for displaying more content.',
  width: '90vw',
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
| `title` | `string \| VNode` | - | Modal title |
| `width` | `string \| number` | `520` | Modal width |
| `centered` | `boolean` | `false` | Center modal vertically |
| `closable` | `boolean` | `true` | Show close button |
| `closeIcon` | `string \| VNode` | - | Custom close icon |
| `mask` | `boolean` | `true` | Show background mask |
| `maskClosable` | `boolean` | `true` | Close modal when clicking mask |
| `keyboard` | `boolean` | `true` | Close modal with ESC key |
| `destroyOnClose` | `boolean` | `false` | Destroy modal content when closed |
| `confirmLoading` | `boolean` | `false` | Show loading on confirm button |
| `okText` | `string \| VNode` | - | OK button text |
| `cancelText` | `string \| VNode` | - | Cancel button text |
| `okType` | `ButtonType` | - | OK button type |
| `okButtonProps` | `ButtonProps` | - | OK button props |
| `cancelButtonProps` | `ButtonProps` | - | Cancel button props |
| `zIndex` | `number` | - | Modal z-index |
| `forceRender` | `boolean` | `false` | Force render modal content |
| `getContainer` | `string \| HTMLElement \| (() => HTMLElement) \| false` | - | Container for modal |
| `maskStyle` | `CSSProperties` | - | Style for mask |
| `bodyStyle` | `CSSProperties` | - | Style for modal body |
| `wrapClassName` | `string` | - | Wrapper class name |
| `style` | `CSSProperties \| string` | - | Modal style |
| `transitionName` | `string` | - | Transition name |
| `maskTransitionName` | `string` | - | Mask transition name |
| `focusTriggerAfterClose` | `boolean` | `true` | Focus trigger after close |
| `modalRender` | `(originVNode: VNode) => VNode` | - | Custom modal render function |

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
  title?: string | VNode
  content?: string | VNode | (() => VNode)
  width?: number | string
  centered?: boolean
  closable?: boolean
  closeIcon?: string | VNode
  mask?: boolean
  maskClosable?: boolean
  keyboard?: boolean
  destroyOnClose?: boolean
  type?: 'info' | 'success' | 'error' | 'warn' | 'warning' | 'confirm'
  okText?: string | VNode
  cancelText?: string | VNode
  okType?: ButtonType
  zIndex?: number
  forceRender?: boolean
  getContainer?: string | HTMLElement | (() => HTMLElement) | false | null

  // Event handlers
  onOk?: (...args: any[]) => any
  onCancel?: (...args: any[]) => any
  afterClose?: () => void

  // Advanced options
  autoFocusButton?: null | 'ok' | 'cancel'
  okButtonProps?: ButtonProps
  cancelButtonProps?: ButtonProps
  class?: string
  style?: CSSProperties | string
  wrapClassName?: string
  footer?: VNode
  icon?: VNode
  maskStyle?: CSSProperties
  bodyStyle?: CSSProperties
  transitionName?: string
  maskTransitionName?: string
  focusTriggerAfterClose?: boolean
  modalRender?: (arg: { originVNode: VNode }) => VNode
  mousePosition?: { x: number; y: number } | null
  okCancel?: boolean
  appContext?: any
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



### ⚠️ Important Notes

#### confirmLoading Behavior
- When `confirmLoading` is `true`, the modal automatically disables all close operations
- This prevents users from accidentally closing the modal during async operations
- Make sure to set `confirmLoading` to `false` after operations complete

#### Event Handling
- Exceptions in `onOk` and `onCancel` callbacks are not automatically handled
- It's recommended to add proper error handling logic in callbacks
- Use `confirmLoading` to manage async operation states

#### Style Priority
- External styles will override internal default styles
- Use `!important` to force override component internal styles
- Recommended to customize themes through CSS variables

### 🔧 Troubleshooting

#### Styles Not Working
1. Ensure you have created and imported CSS style file (refer to [CSS Styling System](#-css-styling-system--css-样式系统))
2. Check for CSS style conflicts
3. Verify CSS variables are correctly defined
4. Confirm Tailwind CSS configuration is correct (if using)
5. Check CSS file path is correct

#### Modal Not Displaying
1. Check if `open` or `visible` property is correctly set
2. Confirm there are no CSS style conflicts
3. Check if `z-index` setting is appropriate

#### Animation Effects Not Working
1. Ensure `transitionName` corresponding CSS animation is defined
2. Check if other CSS is affecting animation effects
3. Verify `mousePosition` is correctly passed

#### Drag Functionality Not Working
1. Ensure `modalRender` function is correctly implemented
2. Check if drag target element is correctly bound
3. Verify drag library (like @vueuse/core) is correctly installed

### 📖 API Reference

#### Common Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `open` | `boolean` | `false` | Control modal visibility |
| `title` | `string \| VNode` | - | Modal title |
| `width` | `string \| number` | `520` | Modal width |
| `centered` | `boolean` | `false` | Vertically center modal |
| `confirmLoading` | `boolean` | `false` | Confirm button loading state |
| `okText` | `string \| VNode` | `'OK'` | OK button text |
| `cancelText` | `string \| VNode` | `'Cancel'` | Cancel button text |
| `okType` | `ButtonType` | `'primary'` | OK button type |

#### Style Properties

| Property | Type | Description |
|----------|------|-------------|
| `style` | `CSSProperties \| string` | Modal styles |
| `bodyStyle` | `CSSProperties` | Modal body styles |
| `maskStyle` | `CSSProperties` | Mask styles |
| `wrapClassName` | `string` | Wrapper class name |
| `zIndex` | `number` | Modal z-index |

#### Interaction Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `closable` | `boolean` | `true` | Show close button |
| `maskClosable` | `boolean` | `true` | Close on mask click |
| `keyboard` | `boolean` | `true` | Close on ESC key |
| `destroyOnClose` | `boolean` | `false` | Destroy content on close |

#### Advanced Properties

| Property | Type | Description |
|----------|------|-------------|
| `modalRender` | `(arg: { originVNode: VNode }) => VNode` | Custom render function (for drag functionality) |
| `mousePosition` | `{ x: number; y: number } \| null` | Mouse position for animation start point |
| `getContainer` | `string \| HTMLElement \| (() => HTMLElement) \| false` | Modal container |

#### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `@ok` | `(e: MouseEvent)` | OK button click |
| `@cancel` | `(e?: MouseEvent)` | Cancel button click or close |
| `@update:open` | `(open: boolean)` | Visibility state change |
| `@afterClose` | `()` | Triggered after completely closed |

#### Slots

| Slot | Description |
|------|-------------|
| `default` | Modal content |
| `title` | Custom title |
| `footer` | Custom footer |
| `modalRender` | Custom wrapper (for drag functionality) |

#### Programmatic API

```typescript
// Basic methods
Modal.info({ title: 'Info', content: 'Content' })
Modal.success({ title: 'Success', content: 'Operation successful' })
Modal.error({ title: 'Error', content: 'Operation failed' })
Modal.warning({ title: 'Warning', content: 'Warning message' })
Modal.confirm({ title: 'Confirm', content: 'Are you sure?' })
Modal.destroyAll() // Destroy all modals

// useModal Hook
const [modal, contextHolder] = Modal.useModal()
// Returns: [modal methods object, component to render]
```

#### Return Value

```typescript
const modal = Modal.confirm({...})
modal.destroy()  // Destroy modal
modal.update({...})  // Update configuration
```

#### ModalOptions Interface

```typescript
interface ModalOptions {
  // Basic configuration
  title?: string | VNode            // Title
  content?: string | VNode          // Content
  width?: string | number           // Width
  centered?: boolean                // Center display

  // Button configuration
  okText?: string | VNode           // OK button text
  cancelText?: string | VNode       // Cancel button text
  okType?: 'primary' | 'danger'     // OK button type

  // Style configuration
  style?: CSSProperties             // Custom styles
  maskStyle?: CSSProperties         // Mask styles
  bodyStyle?: CSSProperties         // Body styles

  // Event handling
  onOk?: () => void | Promise<void> // OK callback
  onCancel?: () => void             // Cancel callback
  afterClose?: () => void           // After close callback
}
```

### 🎨 CSS Style Examples

#### 1. Custom Modal Styles
```vue
<Modal
  v-model:open="open"
  title="Custom Style"
  :style="{
    top: '50px',
    border: '2px solid #1890ff',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
  }"
>
  <p>Custom border, border radius and shadow effects</p>
</Modal>
```

#### 2. Custom Mask Styles
```vue
<Modal
  v-model:open="open"
  title="Mask Style"
  :mask-style="{
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
    backdropFilter: 'blur(5px)'
  }"
>
  <p>Red semi-transparent mask + background blur effect</p>
</Modal>
```

#### 3. Custom Body Styles
```vue
<Modal
  v-model:open="open"
  title="Body Style"
  :body-style="{
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '24px',
    borderRadius: '8px'
  }"
>
  <p>Gradient background + white text + border radius effect</p>
</Modal>
```

#### 4. Wrapper Class Name Styles
```vue
<template>
  <Modal
    v-model:open="open"
    title="Wrapper Class"
    wrap-class-name="custom-modal-wrap"
  >
    <p>Complex style customization through CSS class names</p>
  </Modal>
</template>

<style>
.custom-modal-wrap {
  animation: customAnimation 0.3s ease-out;
}
.custom-modal-wrap .simple-dialog {
  border: 2px dashed #722ed1;
  border-radius: 16px;
}
</style>
```

#### 5. Z-Index Control
```vue
<Modal
  v-model:open="open"
  title="High Z-Index Modal"
  :z-index="2000"
  :style="{ border: '3px solid #52c41a' }"
>
  <p>Set high z-index to ensure above other elements</p>
</Modal>
```

### 🚀 Quick Examples

#### Basic Usage
```vue
<Modal v-model:open="open" title="Title" @ok="handleOk">
  <p>Content</p>
</Modal>
```

#### Programmatic Usage
```typescript
Modal.confirm({
  title: 'Confirm',
  content: 'Are you sure you want to proceed?',
  onOk: () => console.log('Confirmed')
})
```

#### useModal Hook
```vue
<script setup>
const [modal, contextHolder] = Modal.useModal()
modal.info({ title: 'Info', content: 'Message content' })
</script>
<template>
  <component :is="contextHolder" />
</template>
```

### 🔧 Advanced Features

#### confirmLoading Safety Mechanism
```vue
<Modal :confirm-loading="loading" @ok="handleSubmit">
  <!-- Automatically disables all close operations when loading -->
</Modal>
```

#### Mouse Position Animation
```vue
<Modal :mouse-position="{ x: 100, y: 100 }">
  <!-- Start scale animation from specified position -->
</Modal>
```

#### Drag Functionality
```vue
<Modal :modal-render="customRender">
  <!-- Implement drag through modalRender -->
</Modal>
```

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

### 🔧 常见问题解决

#### 样式不生效
1. 确保已创建并引入 CSS 样式文件（参考 [CSS 样式系统](#-css-styling-system--css-样式系统)）
2. 检查是否有 CSS 样式冲突
3. 验证 CSS 变量是否正确定义
4. 确认 Tailwind CSS 配置正确（如果使用）
5. 检查 CSS 文件路径是否正确

#### 模态框不显示
1. 检查 `open` 或 `visible` 属性是否正确设置
2. 确认没有 CSS 样式冲突
3. 检查 `z-index` 设置是否合适

#### 动画效果异常
1. 确保 `transitionName` 对应的 CSS 动画已定义
2. 检查是否有其他 CSS 影响了动画效果
3. 验证 `mousePosition` 是否正确传递

#### 拖拽功能不工作
1. 确保 `modalRender` 函数正确实现
2. 检查拖拽目标元素是否正确绑定
3. 验证拖拽库（如 @vueuse/core）是否正确安装

### ✅ 功能验证清单

以下是所有已验证可用的模态框选项和功能：

#### 基础组件属性 ✅
- [x] `open` / `visible` - 显示控制
- [x] `title` - 标题设置
- [x] `width` - 宽度控制
- [x] `centered` - 居中显示
- [x] `closable` - 关闭按钮控制
- [x] `closeIcon` - 自定义关闭图标
- [x] `mask` / `maskClosable` - 遮罩控制
- [x] `keyboard` - 键盘支持
- [x] `confirmLoading` - 加载状态（自动禁用关闭操作）

#### 按钮配置 ✅
- [x] `okText` / `cancelText` - 按钮文本
- [x] `okType` - 按钮类型（primary, danger 等）
- [x] `okButtonProps` / `cancelButtonProps` - 按钮属性

#### 样式配置 ✅
- [x] `style` - 自定义样式（如 `style="top: 20px"`）
- [x] `wrapClassName` - 包装器类名
- [x] `maskStyle` / `bodyStyle` - 遮罩和主体样式
- [x] `zIndex` - 层级控制

#### 高级功能 ✅
- [x] `modalRender` - 自定义渲染（拖拽功能）
- [x] `mousePosition` - 鼠标位置动画
- [x] `transitionName` / `maskTransitionName` - 自定义动画
- [x] `getContainer` - 自定义容器
- [x] `destroyOnClose` - 关闭时销毁

#### 编程式 API ✅
- [x] `Modal.info()` - 信息对话框
- [x] `Modal.success()` - 成功对话框
- [x] `Modal.error()` - 错误对话框
- [x] `Modal.warning()` / `Modal.warn()` - 警告对话框
- [x] `Modal.confirm()` - 确认对话框
- [x] `Modal.destroyAll()` - 销毁所有模态框
- [x] `Modal.useModal()` - Hook 版本

#### 事件系统 ✅
- [x] `@ok` / `@cancel` - 按钮点击事件
- [x] `@update:open` - 状态更新事件
- [x] `@change` - 状态改变事件
- [x] `@after-close` - 关闭后事件

#### 插槽系统 ✅
- [x] `default` - 默认内容插槽
- [x] `title` - 标题插槽
- [x] `footer` - 底部插槽
- [x] `closeIcon` - 关闭图标插槽
- [x] `modalRender` - 自定义渲染插槽

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

#### 设置样式

模态框组件需要 CSS 样式才能正常显示。请参考文档末尾的 [CSS 样式系统](#-css-styling-system--css-样式系统) 部分获取完整的样式文件示例。

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

#### 常用属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `open` | `boolean` | `false` | 控制模态框显示/隐藏 |
| `title` | `string \| VNode` | - | 模态框标题 |
| `width` | `string \| number` | `520` | 模态框宽度 |
| `centered` | `boolean` | `false` | 垂直居中显示 |
| `confirmLoading` | `boolean` | `false` | 确认按钮加载状态 |
| `okText` | `string \| VNode` | `'确定'` | 确定按钮文本 |
| `cancelText` | `string \| VNode` | `'取消'` | 取消按钮文本 |
| `okType` | `ButtonType` | `'primary'` | 确定按钮类型 |

#### 样式属性

| 属性 | 类型 | 描述 |
|------|------|------|
| `style` | `CSSProperties \| string` | 模态框样式 |
| `bodyStyle` | `CSSProperties` | 模态框主体样式 |
| `maskStyle` | `CSSProperties` | 遮罩样式 |
| `wrapClassName` | `string` | 包装器类名 |
| `zIndex` | `number` | 模态框层级 |

#### 交互属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `closable` | `boolean` | `true` | 显示关闭按钮 |
| `maskClosable` | `boolean` | `true` | 点击遮罩层关闭 |
| `keyboard` | `boolean` | `true` | ESC 键关闭 |
| `destroyOnClose` | `boolean` | `false` | 关闭时销毁内容 |

#### 高级属性

| 属性 | 类型 | 描述 |
|------|------|------|
| `modalRender` | `(arg: { originVNode: VNode }) => VNode` | 自定义渲染函数（拖拽功能） |
| `mousePosition` | `{ x: number; y: number } \| null` | 鼠标位置动画起始点 |
| `getContainer` | `string \| HTMLElement \| (() => HTMLElement) \| false` | 模态框容器 |

#### 事件

| 事件 | 参数 | 描述 |
|------|------|------|
| `@ok` | `(e: MouseEvent)` | 点击确定按钮 |
| `@cancel` | `(e?: MouseEvent)` | 点击取消按钮或关闭 |
| `@update:open` | `(open: boolean)` | 显示状态改变 |
| `@afterClose` | `()` | 完全关闭后触发 |

#### 插槽

| 插槽 | 描述 |
|------|------|
| `default` | 模态框内容 |
| `title` | 自定义标题 |
| `footer` | 自定义底部 |
| `modalRender` | 自定义包装器（拖拽功能） |

#### 编程式 API

```typescript
// 基础方法
Modal.info({ title: '信息', content: '内容' })
Modal.success({ title: '成功', content: '操作成功' })
Modal.error({ title: '错误', content: '操作失败' })
Modal.warning({ title: '警告', content: '注意事项' })
Modal.confirm({ title: '确认', content: '确定要执行吗？' })
Modal.destroyAll() // 销毁所有模态框

// useModal Hook
const [modal, contextHolder] = Modal.useModal()
// 返回：[modal方法对象, 需要渲染的组件]
```

#### ModalOptions 接口

```typescript
interface ModalOptions {
  // 基础配置
  title?: string | VNode            // 标题
  content?: string | VNode          // 内容
  width?: string | number           // 宽度
  centered?: boolean                // 居中显示

  // 按钮配置
  okText?: string | VNode           // 确定按钮文本
  cancelText?: string | VNode       // 取消按钮文本
  okType?: 'primary' | 'danger'     // 确定按钮类型

  // 样式配置
  style?: CSSProperties             // 自定义样式
  maskStyle?: CSSProperties         // 遮罩样式
  bodyStyle?: CSSProperties         // 主体样式

  // 事件处理
  onOk?: () => void | Promise<void> // 确定回调
  onCancel?: () => void             // 取消回调
  afterClose?: () => void           // 关闭后回调
}
```

#### 返回值

```typescript
const modal = Modal.confirm({...})
modal.destroy()  // 销毁模态框
modal.update({...})  // 更新配置
```








### 🔧 高级特性

#### confirmLoading 安全机制
```vue
<Modal :confirm-loading="loading" @ok="handleSubmit">
  <!-- 加载时自动禁用所有关闭操作 -->
</Modal>
```

#### 鼠标位置动画
```vue
<Modal :mouse-position="{ x: 100, y: 100 }">
  <!-- 从指定位置开始缩放动画 -->
</Modal>
```

#### 拖拽功能
```vue
<Modal :modal-render="customRender">
  <!-- 通过 modalRender 实现拖拽 -->
</Modal>
```

### 🎨 CSS 样式示例

#### 1. 自定义模态框样式
```vue
<Modal
  v-model:open="open"
  title="自定义样式"
  :style="{
    top: '50px',
    border: '2px solid #1890ff',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
  }"
>
  <p>自定义边框、圆角和阴影效果</p>
</Modal>
```

#### 2. 自定义遮罩样式
```vue
<Modal
  v-model:open="open"
  title="遮罩样式"
  :mask-style="{
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
    backdropFilter: 'blur(5px)'
  }"
>
  <p>红色半透明遮罩 + 背景模糊效果</p>
</Modal>
```

#### 3. 自定义主体样式
```vue
<Modal
  v-model:open="open"
  title="主体样式"
  :body-style="{
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '24px',
    borderRadius: '8px'
  }"
>
  <p>渐变背景 + 白色文字 + 圆角效果</p>
</Modal>
```

#### 4. 包装器类名样式
```vue
<template>
  <Modal
    v-model:open="open"
    title="包装器类名"
    wrap-class-name="custom-modal-wrap"
  >
    <p>通过CSS类名进行复杂样式定制</p>
  </Modal>
</template>

<style>
.custom-modal-wrap {
  animation: customAnimation 0.3s ease-out;
}
.custom-modal-wrap .simple-dialog {
  border: 2px dashed #722ed1;
  border-radius: 16px;
}
</style>
```

#### 5. 层级控制
```vue
<Modal
  v-model:open="open"
  title="高层级模态框"
  :z-index="2000"
  :style="{ border: '3px solid #52c41a' }"
>
  <p>设置高层级确保在其他元素之上</p>
</Modal>
```

### 🚀 快速示例

#### 基础用法
```vue
<Modal v-model:open="open" title="标题" @ok="handleOk">
  <p>内容</p>
</Modal>
```

#### 编程式调用
```typescript
Modal.confirm({
  title: '确认',
  content: '确定要执行此操作吗？',
  onOk: () => console.log('确认')
})
```

#### useModal Hook
```vue
<script setup>
const [modal, contextHolder] = Modal.useModal()
modal.info({ title: '信息', content: '消息内容' })
</script>
<template>
  <component :is="contextHolder" />
</template>
```

### 📦 打包信息

- **ES 模块**: ~25KB
- **UMD**: ~18KB
- **TypeScript**: 包含完整类型定义
- **Tree-shaking**: 支持

---

## 🎨 CSS Styling System | CSS 样式系统

### Complete Style File Example | 完整样式文件示例

Here's a complete `modal.css` style file example that you can use as a reference to create your own modal styles:

以下是一个完整的 `modal.css` 样式文件示例，你可以参考这个文件来创建自己的模态框样式：

```css
/* Simple Modal CSS - 独立的 Modal 样式文件 */
/* 这个文件包含所有 Modal 相关的样式，使用 Tailwind CSS 类 */

@import "tailwindcss";
@import "tw-animate-css";

/* Modal 基础样式 */
.simple-modal-root,
.simple-dialog-root {
  @apply relative;
}

/* 遮罩层 */
.simple-modal-mask,
.simple-dialog-mask {
  @apply fixed inset-0 z-[50] bg-base-300/60 backdrop-blur-sm;
}

/* Modal 容器 */
.simple-modal-wrap,
.simple-dialog-wrap {
  @apply fixed inset-0 overflow-auto outline-none z-[50];
  -webkit-overflow-scrolling: touch;
}

.simple-modal-wrap-rtl {
  direction: rtl;
}

/* 居中布局 */
.simple-modal-wrap.simple-modal-centered,
.simple-dialog-wrap.simple-dialog-centered,
.simple-dialog-wrap.simple-modal-centered {
  @apply text-center;
}

.simple-modal-wrap.simple-modal-centered::before,
.simple-dialog-wrap.simple-dialog-centered::before,
.simple-dialog-wrap.simple-modal-centered::before {
  @apply inline-block w-0 h-full align-middle;
  content: '';
}

.simple-modal-wrap.simple-modal-centered .simple-modal,
.simple-dialog-wrap.simple-dialog-centered .simple-dialog,
.simple-dialog-wrap.simple-modal-centered .simple-dialog {
  @apply top-0 inline-block pb-0 text-left align-middle;
}

/* Modal 主体 */
.simple-modal,
.simple-dialog {
  position: relative;
  top: var(--modal-top, 100px);
  /* 使用 CSS 变量，默认 100px */
  width: auto;
  max-width: calc(100vw - 32px);
  margin: 0 auto;
  padding-bottom: 1.5rem;
  pointer-events: none;
}

/* Modal 内容区域 */
.simple-modal-content,
.simple-dialog-content {
  @apply relative bg-base-100 text-base-content border border-base-content/15 rounded-box shadow-2xl p-6 text-base leading-relaxed pointer-events-auto;
}

/* 关闭按钮 */
.simple-modal-close,
.simple-dialog-close {
  @apply btn btn-sm btn-ghost btn-circle absolute top-4 right-4 z-10;
}

/* daisyUI 按钮自带 hover 态，这里无需额外样式 */

.simple-modal-close:disabled,
.simple-dialog-close:disabled {
  pointer-events: none;
  opacity: 0.5;
}

.simple-modal-close-x,
.simple-dialog-close-x {
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.simple-modal-close-icon,
.simple-dialog-close-icon {
  height: 1rem;
  width: 1rem;
}

/* Modal 头部 */
.simple-modal-header,
.simple-dialog-header {
  margin-bottom: 0.5rem;
}

/* Modal 标题 */
.simple-modal-title,
.simple-dialog-title {
  @apply m-0 text-lg font-bold leading-snug text-base-content;
}

/* Modal 内容 */
.simple-modal-body,
.simple-dialog-body {
  @apply text-base leading-relaxed text-base-content/70;
}

/* Modal 页脚 */
.simple-modal-footer,
.simple-dialog-footer {
  @apply flex items-center justify-end gap-2 pt-3;
}

/* Loading 动画 - 确保 spin 动画正确工作 */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* 动画效果 - 使用 transition 方式确保兼容性 */
.simple-zoom-enter-active {
  transition: all 0.3s cubic-bezier(0.08, 0.82, 0.17, 1);
}

.simple-zoom-leave-active {
  transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
  pointer-events: none;
}

.simple-zoom-enter-from,
.simple-zoom-leave-to {
  opacity: 0;
  transform: scale(0.2);
}

.simple-zoom-enter-to,
.simple-zoom-leave-from {
  opacity: 1;
  transform: scale(1);
}

.simple-fade-enter-active,
.simple-fade-leave-active {
  transition: opacity 0.3s;
}

.simple-fade-enter-from,
.simple-fade-leave-to {
  opacity: 0;
}

/* 响应式设计 */
@media (max-width: 767px) {

  .simple-modal,
  .simple-dialog {
    max-width: calc(100vw - 16px);
    margin: 8px auto;
  }

  .simple-modal-centered .simple-modal,
  .simple-dialog-centered .simple-dialog {
    flex: 1;
  }
}

/* 确保 Dialog 组件可见 */
.simple-dialog {
  pointer-events: auto;
}

.simple-dialog-content {
  pointer-events: auto;
}

/* Confirm Dialog 样式 */
.simple-modal-confirm .simple-modal-header {
  display: none;
}

.simple-modal-confirm-body {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

/* Confirm Dialog 标题样式 */
.simple-modal-confirm-title {
  @apply flex-none block overflow-hidden text-base-content font-semibold text-base leading-snug;
}

.simple-modal-confirm-title+.simple-modal-confirm-content {
  margin-top: 0.5rem;
  flex: 100%;
  max-width: calc(100% - 38px);
}

/* Confirm Dialog 内容样式 */
.simple-modal-confirm-content {
  @apply text-base text-base-content/70;
}

/* Confirm Dialog 图标样式 */
.simple-modal-confirm-body>* {
  flex: none;
  margin-right: 0.75rem;
  font-size: 1.125rem;
}

.simple-modal-confirm-body>*+.simple-modal-confirm-title {
  flex: 1;
}

.simple-modal-confirm-body>*+.simple-modal-confirm-title+.simple-modal-confirm-content {
  margin-left: 34px;
}

/* Confirm Modal 按钮样式 */
.simple-modal-confirm-btns {
  @apply flex items-center justify-end gap-2 pt-3;
}

.simple-modal-confirm-btns .simple-btn+.simple-btn {
  margin-bottom: 0;
  margin-left: 0.5rem;
}

/* 确认框图标颜色 - 直接在 body 元素上应用类型类名 */
.simple-modal-confirm-error>svg {
  @apply text-error;
}

.simple-modal-confirm-warning>svg,
.simple-modal-confirm-confirm>svg {
  @apply text-warning;
}

.simple-modal-confirm-info>svg {
  @apply text-info;
}

.simple-modal-confirm-success>svg {
  @apply text-success;
}
```

### Key Features | 关键特性

**CSS Variable Support | CSS 变量支持:**
- `--modal-top`: Controls modal distance from top, default 100px | 控制模态框距离顶部的距离，默认 100px
- Theme variables support | 支持主题变量: `--background`, `--foreground`, `--muted-foreground`, etc.

**Tailwind CSS Integration | Tailwind CSS 集成:**
- Uses `@apply` directive to integrate Tailwind classes | 使用 `@apply` 指令集成 Tailwind 类
- Supports responsive design and dark mode | 支持响应式设计和暗色模式

**Animation System | 动画系统:**
- `simple-zoom`: Scale animation effect | 缩放动画效果
- `simple-fade`: Fade in/out effect | 淡入淡出效果

### Usage Instructions | 使用方法

1. **Copy the CSS code above** to your project and save as `modal.css`
   **复制上面的 CSS 代码**到你的项目中，保存为 `modal.css`

2. **Import in your main style file | 在你的主样式文件中引入**:
   ```css
   @import "./modal.css";
   ```

3. **Customize as needed** CSS variables and styles
   **根据需要自定义** CSS 变量和样式

4. **Ensure Tailwind CSS is properly configured** (if using)
   **确保 Tailwind CSS 正确配置**（如果使用）

### CSS Class Structure | CSS 类名结构

The modal uses the following CSS class structure for customization:
模态框使用以下 CSS 类名结构进行自定义：

- `.simple-modal-root` / `.simple-dialog-root` - Root container | 根容器
- `.simple-modal-mask` / `.simple-dialog-mask` - Mask layer | 遮罩层
- `.simple-modal-wrap` / `.simple-dialog-wrap` - Modal wrapper | 模态框包装器
- `.simple-modal` / `.simple-dialog` - Modal body | 模态框主体
- `.simple-modal-content` / `.simple-dialog-content` - Content area | 内容区域
- `.simple-modal-header` / `.simple-dialog-header` - Header | 头部
- `.simple-modal-title` / `.simple-dialog-title` - Title | 标题
- `.simple-modal-body` / `.simple-dialog-body` - Body | 主体
- `.simple-modal-footer` / `.simple-dialog-footer` - Footer | 页脚
- `.simple-modal-close` / `.simple-dialog-close` - Close button | 关闭按钮

---

## License | 许可证

MIT License

## 🤝 Contributing | 贡献

Contributions are welcome! Please feel free to submit a Pull Request.

欢迎贡献！请随时提交 Pull Request。

## 📞 Support | 支持

If you encounter any issues while using this library, please submit an Issue or check the example project.

如果您在使用过程中遇到问题，请提交 Issue 或查看示例项目。

---

## 🙏 Acknowledgments | 致谢

This project is inspired by and built upon the excellent work of:

本项目受到以下优秀项目的启发并基于其构建：

- **[Ant Design Vue](https://antdv.com/)** - A high-quality Vue UI library that provides the foundation and design patterns for this modal component. Their modal implementation served as the primary reference for API design and functionality.

- **[Ant Design](https://ant.design/)** - The original React-based design system that established the design principles and interaction patterns that make this modal component intuitive and user-friendly.

We are grateful to the maintainers and contributors of these projects for their outstanding work in creating robust, accessible, and well-designed UI components that benefit the entire frontend development community.

我们感谢 Ant Design Vue 和 Ant Design 的维护者和贡献者们，感谢他们在创建强大、可访问且设计精良的 UI 组件方面所做的杰出工作，这些工作使整个前端开发社区受益。

Special thanks to:
- The Ant Design team for establishing the design language and interaction patterns
- The Ant Design Vue team for the Vue.js implementation and API design
- All contributors who have helped improve these libraries over the years

特别感谢：
- Ant Design 团队建立的设计语言和交互模式
- Ant Design Vue 团队的 Vue.js 实现和 API 设计
- 多年来帮助改进这些库的所有贡献者

---

*This modal component aims to provide a lightweight, framework-agnostic solution while maintaining the familiar API and behavior patterns that developers love from Ant Design Vue.*

*这个模态框组件旨在提供一个轻量级、框架无关的解决方案，同时保持开发者喜爱的 Ant Design Vue 熟悉的 API 和行为模式。*
