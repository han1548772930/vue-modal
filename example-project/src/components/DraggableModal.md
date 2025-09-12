# 可拖拽模态框

基于您的 DraggableDemo.vue 封装的 Hook 版本,提供可复用的拖拽逻辑。

## 🎯 Hook 版本 - `useDraggableModal`

### 特点
- **逻辑复用**：可在多个组件中使用
- **灵活配置**：支持自定义边界、尺寸等
- **事件回调**：提供拖拽开始和结束回调
- **状态暴露**：完全控制拖拽状态

### 使用方法

```vue
<template>
  <Modal v-model:open="open" :wrap-style="{ overflow: 'hidden' }">
    <div>模态框内容</div>
    
    <template #title>
      <div ref="dragTargetRef" class="cursor-move">
        可拖拽标题
      </div>
    </template>
    
    <template #modalRender="{ originVNode }">
      <div :style="transformStyle">
        <component :is="originVNode" />
      </div>
    </template>
  </Modal>
</template>

<script setup>
import { useDraggableModal } from '@/hooks/useDraggableModal'

const {
  dragTargetRef,
  isDragging,
  transformStyle,
  resetPosition
} = useDraggableModal({
  modalWidth: 520,
  modalHeight: 400,
  boundary: true,
  onDragStart: (position) => console.log('开始拖拽', position),
  onDragEnd: (position) => console.log('结束拖拽', position)
})
</script>
```

### API

#### 参数 (DraggableModalOptions)
| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| modalWidth | number | 520 | 模态框宽度,用于边界计算 |
| modalHeight | number | 400 | 模态框高度,用于边界计算 |
| boundary | boolean | true | 是否启用边界限制 |
| onDragStart | function | - | 拖拽开始回调 |
| onDragEnd | function | - | 拖拽结束回调 |

#### 返回值 (DraggableModalReturn)
| 属性 | 类型 | 说明 |
|------|------|------|
| dragTargetRef | Ref\<HTMLElement\> | 拖拽目标元素的 ref |
| isDragging | Ref\<boolean\> | 是否正在拖拽 |
| startedDrag | Ref\<boolean\> | 是否已开始拖拽 |
| transformX | Ref\<number\> | X 轴变换值 |
| transformY | Ref\<number\> | Y 轴变换值 |
| transformStyle | Ref\<CSSProperties\> | 变换样式 |
| resetPosition | function | 重置位置方法 |

## 🔄 使用场景

### 使用 Hook 版本 (`useDraggableModal`) 的场景
- 需要在多个组件中复用拖拽逻辑
- 需要完全自定义模态框样式和行为
- 需要精细控制拖拽状态和事件
- 已有现成的模态框组件,只需要添加拖拽功能

## 📝 示例文件

- Hook 版本示例：`src/demos/DraggableHookDemo.vue`
- 原始示例：`src/demos/DraggableDemo.vue`
