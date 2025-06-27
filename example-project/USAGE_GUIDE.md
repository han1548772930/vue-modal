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

### 使用 createVNode 创建复杂内容

```vue
<script setup>
import { createVNode } from 'vue'
import { Modal } from 'simple-modal'

// 创建表格内容
const showTableModal = () => {
  const tableData = [
    { id: 1, name: '张三', age: 25, city: '北京' },
    { id: 2, name: '李四', age: 30, city: '上海' },
    { id: 3, name: '王五', age: 28, city: '广州' }
  ]

  Modal.info({
    title: '用户列表',
    content: createVNode('div', { class: 'space-y-4' }, [
      createVNode('table', { class: 'w-full border-collapse border border-gray-300' }, [
        createVNode('thead', null, [
          createVNode('tr', { class: 'bg-gray-100' }, [
            createVNode('th', { class: 'border border-gray-300 px-4 py-2' }, 'ID'),
            createVNode('th', { class: 'border border-gray-300 px-4 py-2' }, '姓名'),
            createVNode('th', { class: 'border border-gray-300 px-4 py-2' }, '年龄'),
            createVNode('th', { class: 'border border-gray-300 px-4 py-2' }, '城市')
          ])
        ]),
        createVNode('tbody', null, tableData.map(row =>
          createVNode('tr', { key: row.id }, [
            createVNode('td', { class: 'border border-gray-300 px-4 py-2 text-center' }, row.id.toString()),
            createVNode('td', { class: 'border border-gray-300 px-4 py-2' }, row.name),
            createVNode('td', { class: 'border border-gray-300 px-4 py-2 text-center' }, row.age.toString()),
            createVNode('td', { class: 'border border-gray-300 px-4 py-2' }, row.city)
          ])
        ))
      ])
    ]),
    width: 600
  })
}

// 创建交互式内容
const showInteractiveModal = () => {
  let counter = 0
  let modalInstance

  const updateCounter = () => {
    counter++
    const content = createVNode('div', { class: 'text-center space-y-4' }, [
      createVNode('h3', { class: 'text-lg font-semibold' }, '计数器'),
      createVNode('div', { class: 'text-4xl font-bold text-blue-600' }, counter.toString()),
      createVNode('div', { class: 'space-x-2' }, [
        createVNode('button', {
          class: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600',
          onClick: updateCounter
        }, '增加'),
        createVNode('button', {
          class: 'px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600',
          onClick: () => {
            counter = 0
            updateCounter()
          }
        }, '重置')
      ])
    ])

    if (modalInstance) {
      modalInstance.update({ content })
    }
  }

  modalInstance = Modal.info({
    title: '交互式计数器',
    content: createVNode('div', { class: 'text-center space-y-4' }, [
      createVNode('h3', { class: 'text-lg font-semibold' }, '计数器'),
      createVNode('div', { class: 'text-4xl font-bold text-blue-600' }, '0'),
      createVNode('div', { class: 'space-x-2' }, [
        createVNode('button', {
          class: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600',
          onClick: updateCounter
        }, '增加'),
        createVNode('button', {
          class: 'px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600',
          onClick: () => {
            counter = 0
            updateCounter()
          }
        }, '重置')
      ])
    ])
  })
}

// 创建表单内容
const showFormModal = () => {
  const formData = { name: '', email: '', phone: '', message: '' }

  Modal.confirm({
    title: '联系我们',
    content: createVNode('form', { class: 'space-y-4' }, [
      createVNode('div', { class: 'grid grid-cols-2 gap-4' }, [
        createVNode('div', null, [
          createVNode('label', { class: 'block text-sm font-medium mb-1' }, '姓名 *'),
          createVNode('input', {
            type: 'text',
            required: true,
            class: 'w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500',
            placeholder: '请输入您的姓名',
            onInput: (e) => formData.name = e.target.value
          })
        ]),
        createVNode('div', null, [
          createVNode('label', { class: 'block text-sm font-medium mb-1' }, '邮箱 *'),
          createVNode('input', {
            type: 'email',
            required: true,
            class: 'w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500',
            placeholder: '请输入您的邮箱',
            onInput: (e) => formData.email = e.target.value
          })
        ])
      ]),
      createVNode('div', null, [
        createVNode('label', { class: 'block text-sm font-medium mb-1' }, '电话'),
        createVNode('input', {
          type: 'tel',
          class: 'w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500',
          placeholder: '请输入您的电话号码',
          onInput: (e) => formData.phone = e.target.value
        })
      ]),
      createVNode('div', null, [
        createVNode('label', { class: 'block text-sm font-medium mb-1' }, '留言'),
        createVNode('textarea', {
          rows: 4,
          class: 'w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500',
          placeholder: '请输入您的留言...',
          onInput: (e) => formData.message = e.target.value
        })
      ])
    ]),
    width: 600,
    onOk: () => {
      // 表单验证
      if (!formData.name || !formData.email) {
        Modal.warning({
          title: '表单验证',
          content: '请填写必填字段（姓名和邮箱）'
        })
        return false // 阻止模态框关闭
      }

      // 提交表单
      console.log('表单数据:', formData)
      Modal.success({
        title: '提交成功',
        content: `感谢您的留言，${formData.name}！我们会尽快回复您。`
      })
    }
  })
}
</script>
```

### 进度条和加载状态

```vue
<script setup>
import { createVNode } from 'vue'
import { Modal } from 'simple-modal'

// 进度条模态框
const showProgressModal = () => {
  let progress = 0
  let modalInstance

  const updateProgress = () => {
    progress += 10
    const content = createVNode('div', { class: 'space-y-4' }, [
      createVNode('div', { class: 'flex justify-between items-center' }, [
        createVNode('span', null, '处理进度'),
        createVNode('span', { class: 'font-semibold' }, `${progress}%`)
      ]),
      createVNode('div', { class: 'w-full bg-gray-200 rounded-full h-3' }, [
        createVNode('div', {
          class: 'bg-blue-500 h-3 rounded-full transition-all duration-300',
          style: `width: ${progress}%`
        })
      ]),
      createVNode('p', { class: 'text-sm text-gray-600' },
        progress < 100 ? '正在处理您的请求...' : '处理完成！'
      )
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
          title: '处理完成',
          content: '您的请求已成功处理！'
        })
      }, 1000)
    }
  }

  modalInstance = Modal.info({
    title: '处理中',
    content: createVNode('div', { class: 'space-y-4' }, [
      createVNode('div', { class: 'flex justify-between items-center' }, [
        createVNode('span', null, '处理进度'),
        createVNode('span', { class: 'font-semibold' }, '0%')
      ]),
      createVNode('div', { class: 'w-full bg-gray-200 rounded-full h-3' }, [
        createVNode('div', {
          class: 'bg-blue-500 h-3 rounded-full transition-all duration-300',
          style: 'width: 0%'
        })
      ]),
      createVNode('p', { class: 'text-sm text-gray-600' }, '正在初始化...')
    ]),
    closable: false,
    maskClosable: false
  })

  setTimeout(updateProgress, 500)
}

// 文件上传模拟
const showUploadModal = () => {
  const files = ['document.pdf', 'image.jpg', 'data.xlsx']
  let currentFile = 0
  let modalInstance

  const uploadNext = () => {
    if (currentFile >= files.length) {
      modalInstance.destroy()
      Modal.success({
        title: '上传完成',
        content: '所有文件已成功上传！'
      })
      return
    }

    const fileName = files[currentFile]
    const content = createVNode('div', { class: 'space-y-4' }, [
      createVNode('div', { class: 'text-center' }, [
        createVNode('div', { class: 'text-lg font-semibold' }, '正在上传文件'),
        createVNode('div', { class: 'text-blue-600' }, fileName)
      ]),
      createVNode('div', { class: 'space-y-2' }, [
        createVNode('div', { class: 'flex justify-between text-sm' }, [
          createVNode('span', null, `文件 ${currentFile + 1} / ${files.length}`),
          createVNode('span', null, '上传中...')
        ]),
        createVNode('div', { class: 'w-full bg-gray-200 rounded-full h-2' }, [
          createVNode('div', {
            class: 'bg-green-500 h-2 rounded-full animate-pulse',
            style: 'width: 60%'
          })
        ])
      ])
    ])

    modalInstance.update({ content })

    // 模拟上传时间
    setTimeout(() => {
      currentFile++
      uploadNext()
    }, 2000)
  }

  modalInstance = Modal.info({
    title: '文件上传',
    content: createVNode('div', { class: 'text-center' }, [
      createVNode('p', null, '准备上传文件...')
    ]),
    closable: false,
    maskClosable: false
  })

  setTimeout(uploadNext, 500)
}
</script>
```

### 嵌套模态框和模态框链

```vue
<script setup>
import { createVNode } from 'vue'
import { Modal } from 'simple-modal'

// 设置向导
const showWizardModal = () => {
  const wizardData = {
    step1: { name: '', email: '' },
    step2: { preferences: [] },
    step3: { confirmed: false }
  }

  // 第一步
  const showStep1 = () => {
    Modal.confirm({
      title: '设置向导 - 第 1 步',
      content: createVNode('div', { class: 'space-y-4' }, [
        createVNode('p', { class: 'text-gray-600' }, '请填写您的基本信息'),
        createVNode('div', null, [
          createVNode('label', { class: 'block text-sm font-medium mb-1' }, '姓名'),
          createVNode('input', {
            type: 'text',
            class: 'w-full px-3 py-2 border rounded',
            placeholder: '请输入您的姓名',
            onInput: (e) => wizardData.step1.name = e.target.value
          })
        ]),
        createVNode('div', null, [
          createVNode('label', { class: 'block text-sm font-medium mb-1' }, '邮箱'),
          createVNode('input', {
            type: 'email',
            class: 'w-full px-3 py-2 border rounded',
            placeholder: '请输入您的邮箱',
            onInput: (e) => wizardData.step1.email = e.target.value
          })
        ])
      ]),
      okText: '下一步',
      onOk: () => {
        if (!wizardData.step1.name || !wizardData.step1.email) {
          Modal.warning({
            title: '提示',
            content: '请填写完整信息'
          })
          return false
        }
        showStep2()
      }
    })
  }

  // 第二步
  const showStep2 = () => {
    Modal.confirm({
      title: '设置向导 - 第 2 步',
      content: createVNode('div', { class: 'space-y-4' }, [
        createVNode('p', { class: 'text-gray-600' }, '请选择您的偏好设置'),
        createVNode('div', { class: 'space-y-2' }, [
          createVNode('label', { class: 'flex items-center' }, [
            createVNode('input', {
              type: 'checkbox',
              class: 'mr-2',
              onChange: (e) => {
                if (e.target.checked) {
                  wizardData.step2.preferences.push('notifications')
                } else {
                  const index = wizardData.step2.preferences.indexOf('notifications')
                  if (index > -1) wizardData.step2.preferences.splice(index, 1)
                }
              }
            }),
            createVNode('span', null, '接收邮件通知')
          ]),
          createVNode('label', { class: 'flex items-center' }, [
            createVNode('input', {
              type: 'checkbox',
              class: 'mr-2',
              onChange: (e) => {
                if (e.target.checked) {
                  wizardData.step2.preferences.push('darkMode')
                } else {
                  const index = wizardData.step2.preferences.indexOf('darkMode')
                  if (index > -1) wizardData.step2.preferences.splice(index, 1)
                }
              }
            }),
            createVNode('span', null, '启用深色模式')
          ])
        ])
      ]),
      okText: '下一步',
      cancelText: '上一步',
      onOk: () => showStep3(),
      onCancel: () => showStep1()
    })
  }

  // 第三步
  const showStep3 = () => {
    Modal.confirm({
      title: '设置向导 - 第 3 步',
      content: createVNode('div', { class: 'space-y-4' }, [
        createVNode('p', { class: 'text-gray-600' }, '请确认您的设置'),
        createVNode('div', { class: 'bg-gray-50 p-4 rounded' }, [
          createVNode('h4', { class: 'font-semibold mb-2' }, '设置摘要'),
          createVNode('p', null, `姓名: ${wizardData.step1.name}`),
          createVNode('p', null, `邮箱: ${wizardData.step1.email}`),
          createVNode('p', null, `偏好: ${wizardData.step2.preferences.join(', ') || '无'}`)
        ])
      ]),
      okText: '完成设置',
      cancelText: '上一步',
      onOk: () => {
        Modal.success({
          title: '设置完成',
          content: '您的设置已保存成功！'
        })
      },
      onCancel: () => showStep2()
    })
  }

  showStep1()
}

// 确认删除链
const showDeleteConfirmChain = () => {
  Modal.warning({
    title: '删除警告',
    content: '您即将删除重要数据，此操作不可撤销。',
    okText: '我了解风险',
    onOk: () => {
      Modal.confirm({
        title: '最终确认',
        content: createVNode('div', { class: 'space-y-3' }, [
          createVNode('p', { class: 'text-red-600 font-semibold' }, '⚠️ 最后确认'),
          createVNode('p', null, '请输入 "DELETE" 来确认删除操作：'),
          createVNode('input', {
            type: 'text',
            class: 'w-full px-3 py-2 border border-red-300 rounded',
            placeholder: '输入 DELETE',
            id: 'deleteConfirm'
          })
        ]),
        okText: '确认删除',
        onOk: () => {
          const input = document.getElementById('deleteConfirm')
          if (input && input.value === 'DELETE') {
            Modal.success({
              title: '删除成功',
              content: '数据已被删除。'
            })
          } else {
            Modal.error({
              title: '确认失败',
              content: '请正确输入 "DELETE" 来确认删除。'
            })
            return false
          }
        }
      })
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

## 实用工具函数

### Modal 管理器

```typescript
// utils/modalManager.ts
import { Modal, type ModalOptions } from 'simple-modal'

export class ModalManager {
  private modals = new Map<string, any>()

  // 创建模态框
  create(id: string, options: ModalOptions) {
    if (this.modals.has(id)) {
      this.destroy(id)
    }

    const modal = Modal.info(options)
    this.modals.set(id, modal)
    return modal
  }

  // 销毁指定模态框
  destroy(id: string) {
    const modal = this.modals.get(id)
    if (modal) {
      modal.destroy()
      this.modals.delete(id)
    }
  }

  // 更新模态框
  update(id: string, options: Partial<ModalOptions>) {
    const modal = this.modals.get(id)
    if (modal) {
      modal.update(options)
    }
  }

  // 销毁所有模态框
  destroyAll() {
    this.modals.forEach(modal => modal.destroy())
    this.modals.clear()
  }

  // 检查模态框是否存在
  exists(id: string) {
    return this.modals.has(id)
  }

  // 获取模态框数量
  getCount() {
    return this.modals.size
  }
}

// 全局实例
export const modalManager = new ModalManager()
```

### 常用模态框模板

```typescript
// utils/modalTemplates.ts
import { createVNode } from 'vue'
import { Modal } from 'simple-modal'

// 加载模态框
export const showLoading = (message = '加载中...') => {
  return Modal.info({
    title: '请稍候',
    content: createVNode('div', { class: 'flex items-center space-x-3' }, [
      createVNode('div', { class: 'animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500' }),
      createVNode('span', null, message)
    ]),
    closable: false,
    maskClosable: false,
    showFooter: false
  })
}

// 确认删除模态框
export const showDeleteConfirm = (itemName: string, onConfirm: () => void) => {
  Modal.confirm({
    title: '确认删除',
    content: createVNode('div', { class: 'space-y-3' }, [
      createVNode('p', null, `确定要删除 "${itemName}" 吗？`),
      createVNode('div', { class: 'p-3 bg-red-50 border-l-4 border-red-400' }, [
        createVNode('p', { class: 'text-red-700 text-sm' }, '⚠️ 此操作不可撤销')
      ])
    ]),
    okText: '删除',
    cancelText: '取消',
    onOk: onConfirm
  })
}

// 表单验证错误模态框
export const showValidationError = (errors: string[]) => {
  Modal.warning({
    title: '表单验证失败',
    content: createVNode('div', { class: 'space-y-2' }, [
      createVNode('p', null, '请修正以下错误：'),
      createVNode('ul', { class: 'list-disc list-inside space-y-1 text-sm' },
        errors.map(error => createVNode('li', { class: 'text-red-600' }, error))
      )
    ])
  })
}

// 网络错误模态框
export const showNetworkError = (retry?: () => void) => {
  Modal.error({
    title: '网络错误',
    content: createVNode('div', { class: 'space-y-3' }, [
      createVNode('p', null, '网络连接失败，请检查您的网络设置。'),
      retry ? createVNode('button', {
        class: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600',
        onClick: () => {
          Modal.destroyAll()
          retry()
        }
      }, '重试') : null
    ].filter(Boolean))
  })
}

// 权限不足模态框
export const showPermissionError = () => {
  Modal.warning({
    title: '权限不足',
    content: createVNode('div', { class: 'space-y-3' }, [
      createVNode('p', null, '您没有执行此操作的权限。'),
      createVNode('p', { class: 'text-sm text-gray-600' }, '请联系管理员获取相应权限。')
    ])
  })
}
```

### 响应式模态框

```typescript
// composables/useResponsiveModal.ts
import { ref, computed } from 'vue'
import { Modal, type ModalOptions } from 'simple-modal'

export function useResponsiveModal() {
  const screenWidth = ref(window.innerWidth)

  // 监听窗口大小变化
  window.addEventListener('resize', () => {
    screenWidth.value = window.innerWidth
  })

  const isMobile = computed(() => screenWidth.value < 768)
  const isTablet = computed(() => screenWidth.value >= 768 && screenWidth.value < 1024)
  const isDesktop = computed(() => screenWidth.value >= 1024)

  const showResponsiveModal = (options: ModalOptions) => {
    const responsiveOptions = {
      ...options,
      width: isMobile.value ? '95vw' : isTablet.value ? '80vw' : options.width || 520,
      centered: isMobile.value ? true : options.centered
    }

    return Modal.info(responsiveOptions)
  }

  return {
    isMobile,
    isTablet,
    isDesktop,
    showResponsiveModal
  }
}
```

### 模态框状态管理

```typescript
// stores/modalStore.ts (使用 Pinia)
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const activeModals = ref<string[]>([])
  const modalHistory = ref<string[]>([])

  const addModal = (id: string) => {
    activeModals.value.push(id)
    modalHistory.value.push(id)
  }

  const removeModal = (id: string) => {
    const index = activeModals.value.indexOf(id)
    if (index > -1) {
      activeModals.value.splice(index, 1)
    }
  }

  const clearAll = () => {
    activeModals.value = []
  }

  const getLastModal = () => {
    return modalHistory.value[modalHistory.value.length - 1]
  }

  return {
    activeModals,
    modalHistory,
    addModal,
    removeModal,
    clearAll,
    getLastModal
  }
})
```

## 最佳实践

### 1. 模态框设计原则

- **简洁明了**：模态框内容应该简洁，避免过多信息
- **明确目的**：每个模态框应该有明确的目的和行动号召
- **易于关闭**：提供多种关闭方式（ESC键、点击遮罩、关闭按钮）
- **响应式设计**：确保在不同设备上都有良好的显示效果

### 2. 用户体验优化

```typescript
// 防止模态框滥用
const modalQueue = []
let isModalShowing = false

const showModalWithQueue = (options: ModalOptions) => {
  if (isModalShowing) {
    modalQueue.push(options)
    return
  }

  isModalShowing = true
  const modal = Modal.info({
    ...options,
    afterClose: () => {
      isModalShowing = false
      options.afterClose?.()

      // 显示队列中的下一个模态框
      if (modalQueue.length > 0) {
        const nextOptions = modalQueue.shift()
        setTimeout(() => showModalWithQueue(nextOptions), 100)
      }
    }
  })

  return modal
}
```

### 3. 错误处理

```typescript
// 统一错误处理
const handleApiError = (error: any) => {
  if (error.code === 401) {
    showPermissionError()
  } else if (error.code === 500) {
    Modal.error({
      title: '服务器错误',
      content: '服务器暂时无法处理您的请求，请稍后重试。'
    })
  } else if (error.code === 'NETWORK_ERROR') {
    showNetworkError(() => {
      // 重试逻辑
      window.location.reload()
    })
  } else {
    Modal.error({
      title: '操作失败',
      content: error.message || '发生未知错误'
    })
  }
}
```

### 4. 性能优化

```typescript
// 懒加载大型模态框内容
const showLargeContentModal = async () => {
  const loadingModal = showLoading('加载内容中...')

  try {
    // 动态导入大型组件
    const { default: LargeComponent } = await import('./LargeComponent.vue')

    loadingModal.destroy()

    Modal.info({
      title: '大型内容',
      content: createVNode(LargeComponent),
      width: 800,
      height: 600
    })
  } catch (error) {
    loadingModal.destroy()
    handleApiError(error)
  }
}
```

## 故障排除

### 常见问题

1. **样式不生效**
   - 确保 `src/styles/globals.css` 被正确导入
   - 检查 Tailwind CSS 配置
   - 验证 CSS 变量是否正确定义

2. **Modal 不显示**
   - 确保 simple-modal 依赖已正确安装
   - 检查控制台是否有错误信息
   - 验证 z-index 设置是否正确

3. **深色模式不工作**
   - 确保 HTML 元素上有 `dark` 类
   - 检查 CSS 变量是否正确定义
   - 验证主题切换逻辑

4. **模态框重叠问题**
   - 检查 z-index 设置
   - 使用模态框管理器控制显示顺序
   - 避免同时显示多个模态框

5. **移动端显示问题**
   - 使用响应式宽度设置
   - 启用 centered 属性
   - 检查视口设置

### 调试技巧

1. **使用浏览器开发者工具**
   ```javascript
   // 在控制台中检查模态框状态
   console.log('Active modals:', document.querySelectorAll('[role="dialog"]'))
   ```

2. **启用调试模式**
   ```typescript
   // 在开发环境中启用详细日志
   if (process.env.NODE_ENV === 'development') {
     Modal.config({
       debug: true
     })
   }
   ```

3. **性能监控**
   ```typescript
   // 监控模态框性能
   const observer = new PerformanceObserver((list) => {
     list.getEntries().forEach((entry) => {
       if (entry.name.includes('modal')) {
         console.log('Modal performance:', entry)
       }
     })
   })
   observer.observe({ entryTypes: ['measure'] })
   ```

## 进一步学习

- [Tailwind CSS 4 文档](https://tailwindcss.com/docs)
- [shadcn/vue 文档](https://shadcn-vue.com)
- [Vue 3 文档](https://vuejs.org)
- [Vite 文档](https://vitejs.dev)
