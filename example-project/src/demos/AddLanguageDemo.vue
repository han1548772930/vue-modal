<template>
  <div class="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
    <h2 class="text-2xl font-bold mb-4">动态添加语言 (Add Custom Language)</h2>

    <div class="space-y-4">
      <p class="text-muted-foreground">
        演示如何动态添加插件中没有的语言。
      </p>

      <!-- 添加荷兰语按钮 -->
      <div class="space-y-2">
        <button @click="addDutchLanguage" class="btn btn-primary" :disabled="dutchAdded">
          {{ dutchAdded ? '✓ 荷兰语已添加' : '添加荷兰语 (Add Dutch)' }}
        </button>

        <p v-if="dutchAdded" class="text-sm text-success">
          荷兰语已成功添加！请在顶部语言切换器中选择 "Nederlands" 来测试。
        </p>
      </div>

      <!-- 代码示例 -->
      <div class="mt-4">
        <h3 class="font-semibold mb-2">代码示例 (Code Example)</h3>
        <pre class="bg-base-200 p-4 rounded-lg overflow-x-auto text-sm"><code>// 添加新语言
Modal.addLanguage('nl', {
  okText: 'Bevestigen',
  cancelText: 'Annuleren',
  justOkText: 'Begrepen',
  confirmTitle: 'Bevestiging',
  loadingText: 'Laden...'
});

// 切换到新语言
Modal.setLocale('nl');</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Modal } from 'simple-modal';

const dutchAdded = ref(false)

// 检查荷兰语是否已经添加
onMounted(() => {
  // 检查是否已经有荷兰语
  const locales = Modal.getAvailableLocales ? Modal.getAvailableLocales() : []
  dutchAdded.value = locales.includes('nl')
})

// 添加荷兰语
const addDutchLanguage = () => {
  // 添加荷兰语翻译
  Modal.addLanguage('nl', {
    okText: 'Bevestigen',
    cancelText: 'Annuleren',
    justOkText: 'Begrepen',
    confirmTitle: 'Bevestiging',
    loadingText: 'Laden...'
  })

  dutchAdded.value = true

  // 自动添加到语言选择器（需要更新 App.vue）
  // 这里我们触发一个自定义事件
  window.dispatchEvent(new CustomEvent('language-added', {
    detail: {
      value: 'nl',
      label: 'Nederlands'
    }
  }))

  // 显示成功消息
  Modal.success({
    title: '成功 / Success',
    content: '荷兰语已成功添加!Dutch language has been added successfully!'
  })
}
</script>