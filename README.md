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
- 🌍 **i18n Support** - Built-in internationalization with 11 languages
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

### 📚 Usage & Examples

For detailed usage examples and code demonstrations, please check out our example project:

👉 **[View Demo Code](./example-project/src/demos)**

The example project includes:
- Basic usage
- Programmatic API
- Internationalization (i18n)
- Draggable modals
- Custom content with hooks
- Async operations
- And more...

#### Setup Styles

The modal component requires CSS styles to display properly. Please refer to the [CSS Styling System](#-css-styling-system--css-样式系统) section at the end of this document for a complete style file example.





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

For advanced usage examples including custom animations, form validation, dynamic content updates, modal chains, and global modal management, please refer to our example project:

👉 **[View Advanced Examples](./example-project/src/demos)**



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

---

## 中文

一个轻量级、灵活的 Vue 3 模态框组件库,使用 TypeScript 构建,专为现代 Vue 应用设计。

### ✨ 特性

- 🚀 **Vue 3 Composition API** - 基于 Vue 3 和 TypeScript 构建
- 🎨 **灵活样式** - 支持任何 CSS 框架（Tailwind CSS 等）
- 📱 **响应式设计** - 移动端友好，支持触摸操作
- 🔧 **多种使用方式** - 组件式和编程式 API
- 🎭 **丰富动画** - 平滑的进入/退出动画，可自定义效果
- 🖱️ **可拖拽** - 内置拖拽支持，带边界约束
- 🔒 **焦点管理** - 自动焦点陷阱和恢复
- ⌨️ **键盘支持** - ESC 键关闭，Tab 导航
- 🌙 **主题支持** - 兼容深色/浅色主题
- 🌍 **国际化** - 内置 11 种语言支持
- 📦 **轻量级** - 最小打包体积，支持 tree-shaking
- 🛡️ **TypeScript** - 完整的 TypeScript 支持

### 🚀 快速开始

#### 安装

```bash
npm install v-modals
# 或
yarn add v-modals
# 或
pnpm add v-modals
```

### 📚 用法和示例

如需查看详细的使用示例和代码演示，请查看我们的示例项目：

👉 **[查看演示代码](./example-project/src/demos)**

示例项目包括：
- 基础用法
- 编程式 API
- 国际化（i18n）
- 可拖拽模态框
- 自定义内容与钩子
- 异步操作
- 以及更多...

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


### 🔧 高级用法

有关高级用法示例，包括复杂内容创建、异步操作、嵌套模态框、可拖拽模态框等，请参考我们的示例项目：

👉 **[查看高级示例](./example-project/src/demos)**

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




### 📦 打包信息

- **ES 模块**: ~25KB
- **UMD**: ~18KB
- **TypeScript**: 包含完整类型定义
- **Tree-shaking**: 支持

---

## 🎨 CSS Styling System | CSS 样式系统

### Complete Style File Example | 完整样式文件示例

Here's a complete `modal.css` style file example that you can use as a reference to create your own modal styles:

以下是一个完整的 `modal.css` 样式文件示例,你可以参考这个文件来创建自己的模态框样式：

```css
/* Simple Modal CSS - 独立的 Modal 样式文件 */
/* 这个文件包含所有 Modal 相关的样式,使用 Tailwind CSS 类 */

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
  /* 使用 CSS 变量,默认 100px */
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

/* daisyUI 按钮自带 hover 态,这里无需额外样式 */

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
- `--modal-top`: Controls modal distance from top, default 100px | 控制模态框距离顶部的距离,默认 100px
- Theme variables support | 支持主题变量: `--background`, `--foreground`, `--muted-foreground`, etc.

**Tailwind CSS Integration | Tailwind CSS 集成:**
- Uses `@apply` directive to integrate Tailwind classes | 使用 `@apply` 指令集成 Tailwind 类
- Supports responsive design and dark mode | 支持响应式设计和暗色模式

**Animation System | 动画系统:**
- `simple-zoom`: Scale animation effect | 缩放动画效果
- `simple-fade`: Fade in/out effect | 淡入淡出效果

### Usage Instructions | 使用方法

1. **Copy the CSS code above** to your project and save as `modal.css`
   **复制上面的 CSS 代码**到你的项目中,保存为 `modal.css`

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

如果您在使用过程中遇到问题,请提交 Issue 或查看示例项目。

---

## 🙏 Acknowledgments | 致谢

This project is inspired by and built upon the excellent work of:

本项目受到以下优秀项目的启发并基于其构建：

- **[Ant Design Vue](https://antdv.com/)** - A high-quality Vue UI library that provides the foundation and design patterns for this modal component. Their modal implementation served as the primary reference for API design and functionality.

- **[Ant Design](https://ant.design/)** - The original React-based design system that established the design principles and interaction patterns that make this modal component intuitive and user-friendly.

We are grateful to the maintainers and contributors of these projects for their outstanding work in creating robust, accessible, and well-designed UI components that benefit the entire frontend development community.

我们感谢 Ant Design Vue 和 Ant Design 的维护者和贡献者们,感谢他们在创建强大、可访问且设计精良的 UI 组件方面所做的杰出工作,这些工作使整个前端开发社区受益。

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

*这个模态框组件旨在提供一个轻量级、框架无关的解决方案,同时保持开发者喜爱的 Ant Design Vue 熟悉的 API 和行为模式。*
