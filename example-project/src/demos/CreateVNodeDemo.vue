<template>
  <DemoSection>
    <template #title>CreateVNode 用法</template>
    <template #description>使用 createVNode 创建复杂的模态框内容,支持组件、HTML元素和交互功能。</template>
    <template #buttons>
      <div class="flex flex-wrap items-center gap-2">
        <button class="btn btn-primary" @click="showSimpleVNode">简单VNode</button>
        <button class="btn btn-secondary" @click="showComplexVNode">复杂VNode</button>
        <button class="btn btn-accent" @click="showInteractiveVNode">交互式VNode</button>
        <button class="btn btn-info" @click="showFormVNode">表单VNode</button>
        <button class="btn btn-success" @click="showListVNode">列表VNode</button>
        <button class="btn btn-warning" @click="showNestedVNode">嵌套VNode</button>
      </div>
    </template>
  </DemoSection>
</template>

<script lang="ts" setup>
import { createVNode, ref } from 'vue';
import { Modal } from 'simple-modal';
import DemoSection from '@/components/DemoSection.vue';

// 简单的VNode示例
const showSimpleVNode = () => {
  Modal.info({
    title: '简单VNode示例',
    content: createVNode('div', { class: 'space-y-3' }, [
      createVNode('p', { class: 'text-lg font-semibold' }, '这是使用createVNode创建的内容'),
      createVNode('p', { class: 'text-gray-600' }, '可以创建任意的HTML结构'),
      createVNode('div', { class: 'p-3 bg-blue-50 rounded border-l-4 border-blue-400' }, [
        createVNode('p', { class: 'text-blue-700' }, '💡 提示：createVNode可以创建复杂的DOM结构')
      ])
    ]),
    onOk: () => console.log('简单VNode确认')
  });
};

// 复杂的VNode示例
const showComplexVNode = () => {
  Modal.info({
    title: '复杂VNode示例',
    content: createVNode('div', { class: 'space-y-4' }, [
      // 标题区域
      createVNode('div', { class: 'text-center' }, [
        createVNode('h3', { class: 'text-xl font-bold text-gray-800' }, '产品信息'),
        createVNode('p', { class: 'text-gray-500' }, '详细的产品描述和特性')
      ]),

      // 网格布局
      createVNode('div', { class: 'grid grid-cols-2 gap-4' }, [
        createVNode('div', { class: 'p-4 border rounded-lg' }, [
          createVNode('h4', { class: 'font-semibold mb-2' }, '特性'),
          createVNode('ul', { class: 'list-disc list-inside space-y-1 text-sm' }, [
            createVNode('li', null, '高性能'),
            createVNode('li', null, '易于使用'),
            createVNode('li', null, '可扩展')
          ])
        ]),
        createVNode('div', { class: 'p-4 border rounded-lg' }, [
          createVNode('h4', { class: 'font-semibold mb-2' }, '规格'),
          createVNode('div', { class: 'space-y-1 text-sm' }, [
            createVNode('div', { class: 'flex justify-between' }, [
              createVNode('span', null, '版本:'),
              createVNode('span', { class: 'font-medium' }, 'v2.0.0')
            ]),
            createVNode('div', { class: 'flex justify-between' }, [
              createVNode('span', null, '大小:'),
              createVNode('span', { class: 'font-medium' }, '15KB')
            ])
          ])
        ])
      ]),

      // 进度条
      createVNode('div', { class: 'space-y-2' }, [
        createVNode('div', { class: 'flex justify-between text-sm' }, [
          createVNode('span', null, '完成度'),
          createVNode('span', null, '85%')
        ]),
        createVNode('div', { class: 'w-full bg-gray-200 rounded-full h-2' }, [
          createVNode('div', {
            class: 'bg-blue-500 h-2 rounded-full transition-all duration-300',
            style: 'width: 85%'
          })
        ])
      ])
    ]),
    width: 600,
    onOk: () => console.log('复杂VNode确认')
  });
};

// 交互式VNode示例
const showInteractiveVNode = () => {
  let counter = 0;
  let modalInstance: any;

  const updateContent = () => {
    counter++;
    const newContent = createVNode('div', { class: 'space-y-4 text-center' }, [
      createVNode('h3', { class: 'text-lg font-semibold' }, '交互式计数器'),
      createVNode('div', { class: 'text-3xl font-bold text-blue-600' }, counter.toString()),
      createVNode('div', { class: 'space-x-2' }, [
        createVNode('button', {
          class: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors',
          onClick: updateContent
        }, '点击增加'),
        createVNode('button', {
          class: 'px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors',
          onClick: () => {
            counter = 0;
            updateContent();
          }
        }, '重置')
      ]),
      createVNode('p', { class: 'text-sm text-gray-600' }, '点击按钮查看实时更新')
    ]);

    if (modalInstance) {
      modalInstance.update({ content: newContent });
    }
  };

  modalInstance = Modal.info({
    title: '交互式VNode示例',
    content: createVNode('div', { class: 'space-y-4 text-center' }, [
      createVNode('h3', { class: 'text-lg font-semibold' }, '交互式计数器'),
      createVNode('div', { class: 'text-3xl font-bold text-blue-600' }, '0'),
      createVNode('div', { class: 'space-x-2' }, [
        createVNode('button', {
          class: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors',
          onClick: updateContent
        }, '点击增加'),
        createVNode('button', {
          class: 'px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors',
          onClick: () => {
            counter = 0;
            updateContent();
          }
        }, '重置')
      ]),
      createVNode('p', { class: 'text-sm text-gray-600' }, '点击按钮查看实时更新')
    ]),
    onOk: () => console.log('交互式VNode确认', { finalCounter: counter })
  });
};

// 表单VNode示例
const showFormVNode = () => {
  const formData = {
    name: '',
    email: '',
    message: ''
  };

  Modal.confirm({
    title: '联系表单',
    content: createVNode('form', { class: 'space-y-4' }, [
      createVNode('div', { class: 'space-y-2' }, [
        createVNode('label', { class: 'block text-sm font-medium' }, '姓名 *'),
        createVNode('input', {
          type: 'text',
          class: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
          placeholder: '请输入您的姓名',
          onInput: (e: Event) => {
            formData.name = (e.target as HTMLInputElement).value;
          }
        })
      ]),
      createVNode('div', { class: 'space-y-2' }, [
        createVNode('label', { class: 'block text-sm font-medium' }, '邮箱 *'),
        createVNode('input', {
          type: 'email',
          class: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
          placeholder: '请输入您的邮箱',
          onInput: (e: Event) => {
            formData.email = (e.target as HTMLInputElement).value;
          }
        })
      ]),
      createVNode('div', { class: 'space-y-2' }, [
        createVNode('label', { class: 'block text-sm font-medium' }, '留言'),
        createVNode('textarea', {
          rows: 4,
          class: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
          placeholder: '请输入您的留言...',
          onInput: (e: Event) => {
            formData.message = (e.target as HTMLTextAreaElement).value;
          }
        })
      ])
    ]),
    onOk: () => {
      if (!formData.name || !formData.email) {
        Modal.warning({
          title: '表单验证',
          content: '请填写必填字段（姓名和邮箱）'
        });
        return false; // 阻止关闭
      }
      console.log('表单提交:', formData);
      Modal.success({
        title: '提交成功',
        content: `感谢您的留言,${formData.name}！我们会尽快回复您。`
      });
    },
    onCancel: () => console.log('表单取消')
  });
};

// 列表VNode示例
const showListVNode = () => {
  const items = [
    { id: 1, name: '苹果', price: 5.99, category: '水果' },
    { id: 2, name: '香蕉', price: 3.99, category: '水果' },
    { id: 3, name: '胡萝卜', price: 2.99, category: '蔬菜' },
    { id: 4, name: '西兰花', price: 4.99, category: '蔬菜' }
  ];

  Modal.info({
    title: '商品列表',
    content: createVNode('div', { class: 'space-y-4' }, [
      createVNode('div', { class: 'flex justify-between items-center' }, [
        createVNode('h3', { class: 'text-lg font-semibold' }, '商品清单'),
        createVNode('span', { class: 'text-sm text-gray-500' }, `共 ${items.length} 件商品`)
      ]),
      createVNode('div', { class: 'space-y-2' }, items.map(item =>
        createVNode('div', {
          key: item.id,
          class: 'flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors'
        }, [
          createVNode('div', { class: 'flex-1' }, [
            createVNode('div', { class: 'font-medium' }, item.name),
            createVNode('div', { class: 'text-sm text-gray-500' }, item.category)
          ]),
          createVNode('div', { class: 'text-right' }, [
            createVNode('div', { class: 'font-semibold text-green-600' }, `¥${item.price}`),
            createVNode('button', {
              class: 'text-xs text-blue-500 hover:text-blue-700',
              onClick: () => {
                Modal.success({
                  title: '添加成功',
                  content: `${item.name} 已添加到购物车`
                });
              }
            }, '添加到购物车')
          ])
        ])
      )),
      createVNode('div', { class: 'pt-3 border-t' }, [
        createVNode('div', { class: 'flex justify-between items-center' }, [
          createVNode('span', { class: 'font-semibold' }, '总计:'),
          createVNode('span', { class: 'text-lg font-bold text-green-600' },
            `¥${items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}`
          )
        ])
      ])
    ]),
    width: 500,
    onOk: () => console.log('列表VNode确认')
  });
};

// 嵌套VNode示例
const showNestedVNode = () => {
  Modal.info({
    title: '嵌套VNode示例',
    content: createVNode('div', { class: 'space-y-4' }, [
      createVNode('p', null, '这个模态框包含一个按钮,点击可以打开另一个模态框'),
      createVNode('button', {
        class: 'px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors',
        onClick: () => {
          Modal.confirm({
            title: '嵌套的模态框',
            content: createVNode('div', { class: 'space-y-3' }, [
              createVNode('p', null, '这是一个嵌套的模态框！'),
              createVNode('div', { class: 'p-3 bg-yellow-50 border-l-4 border-yellow-400' }, [
                createVNode('p', { class: 'text-yellow-700' }, '⚠️ 注意：这是从另一个模态框中打开的')
              ]),
              createVNode('button', {
                class: 'px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600',
                onClick: () => {
                  Modal.destroyAll();
                }
              }, '关闭所有模态框')
            ]),
            onOk: () => console.log('嵌套模态框确认'),
            onCancel: () => console.log('嵌套模态框取消')
          });
        }
      }, '打开嵌套模态框'),
      createVNode('div', { class: 'p-3 bg-gray-50 rounded' }, [
        createVNode('h4', { class: 'font-semibold mb-2' }, 'VNode的优势:'),
        createVNode('ul', { class: 'list-disc list-inside space-y-1 text-sm' }, [
          createVNode('li', null, '完全的编程控制'),
          createVNode('li', null, '支持事件处理'),
          createVNode('li', null, '可以创建复杂的交互'),
          createVNode('li', null, '类型安全（TypeScript）')
        ])
      ])
    ]),
    onOk: () => console.log('嵌套VNode确认')
  });
};
</script>
