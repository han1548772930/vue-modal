First delete or modify the duration-200 in DialogContent and AlertDialogContent。

![屏幕录制 2025-03-21 135828(1)](https://github.com/user-attachments/assets/6eed08dd-3c54-4bc3-9865-2ae1ebf8ae8f)


Various usage scenarios and features of the Shadcn-Vue dialog component.

## Basic Dialog

The simplest way to use a dialog, providing title, content, and basic confirm/cancel callbacks.

```typescript
useDialog({
  title: 'Dialog Title',
  content: 'Dialog Content',
  onOk: () => {
    console.log('Confirmed');
  },
  onCancel: () => {
    console.log('Canceled');
  },
});
```

## Alert Dialog

Alert-type dialog with closable property.

```typescript
useAlertDialog({
  title: 'Dialog Title',
  content: 'Dialog Content',
  closable: true,
  onOk: () => {
    console.log('Confirmed');
  },
  onCancel: () => {
    console.log('Canceled');
  },
});
```

## Nested Dialogs

Demonstrates how to create nested dialogs and destroy all dialogs at once using the `destroyAll()` method.

```typescript
useDialog({
  title: 'Dialog Title',
  content: 'Dialog Content',
  okText: 'open second Dialog',
  onOk: () => {
    useDialog({
      title: 'second Dialog Title',
      content: 'destroy all Dialog',
      onOk: () => {
        console.log('Confirmed');
        destroyAll();  // Destroy all dialogs
      },
      onCancel: () => {
        console.log('Canceled');
      },
    });
    console.log('Confirmed');
  },
  onCancel: () => {
    console.log('Canceled');
  },
});
```

## Dynamic Updates

Dynamically update the content and title of an opened dialog.

```typescript
const { update } = useDialog({
  title: 'Dialog Title',
  content: 'Dialog Content',
  okText: 'update Dialog',
  onOk: () => {
    update({
      title: 'Updated Dialog Title',
      content: 'Updated Dialog Content',
    });
    console.log('Confirmed');
  },
  onCancel: () => {
    console.log('Canceled');
  },
});
```

## Custom Rendering with VNode

Use `createVNode` to create virtual nodes for custom rendering of dialog content.

```typescript
useDialog({
  title: createVNode('div', { class: 'flex items-center gap-2' }, [
    createVNode(Icon, {
      icon: "akar-icons:discord-fill",
      class: "cursor-pointer"
    }),
    createVNode('span', null, '菜单图标')
  ]),
  content: createVNode('div', {
    class: 'p-4 bg-slate-700',
  }, 'Dialog Content'),
  cancelText: createVNode('span', {
    class: 'text-red-500 p-2  cursor-pointer'
  }, '取消'),
  onOk: () => {
    console.log('Confirmed');
  },
  onCancel: () => {
    console.log('Canceled');
  },
});
```

## Async Operation Support

Support for executing asynchronous operations when the confirm button is clicked, with manual control of when to close the dialog.

```typescript
const { destroy } = useDialog({
  title: 'Dialog Title',
  content: 'two seconds later, the dialog will be closed',
  description: 'Are you sure?',
  onOk: async () => {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(1);
        console.log('Confirmed');
        destroy();  // Manually destroy the dialog
      }, 2000);
    })
  },
  onCancel: () => {
    console.log('Canceled');
  },
})
```


## template Support

Use Vue's template syntax for more flexible dialog customization with slots.

```vue
<MyDialog v-model="open" :close="() => open = false">
  <template #headerTitle>
    <div class="flex items-center gap-2">
      <Icon icon="akar-icons:discord-fill" class="cursor-pointer"></Icon>
      <span>Menu Icon</span>
    </div>
  </template>
  <template #headerDes>
    <div>Dialog Description</div>
  </template>
  <div class="p-4 bg-slate-700">Dialog Content</div>
</MyDialog>
```

