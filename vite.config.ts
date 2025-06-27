import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // 在所有环境下都使用 tailwindcss 插件
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  // 在生产构建时移除 console.log
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },

  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SimpleModal',
      fileName: (format) => `simple-modal.${format}.js`,
    },
    minify: 'esbuild',
    cssCodeSplit: false,
    rollupOptions: {
      // 将这些依赖标记为外部依赖，用户项目中应该已经有这些依赖
      external: [
        'vue',
        'lucide-vue-next',
        'reka-ui',
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
        '@vueuse/core',
        // Tailwind CSS 相关
        'tailwindcss',
        '@tailwindcss/vite',
        // UI 组件 - 这些应该来自用户项目
        /^@\/components\/ui\//,
        /^@\/lib\//,
        // 具体的 UI 组件路径
        '@/components/ui/button',
        '@/components/ui/dropdown-menu',
        '@/lib/utils'
      ],
      output: {
        globals: {
          vue: 'Vue',
          'lucide-vue-next': 'LucideVueNext',
          'reka-ui': 'RekaUI',
          'class-variance-authority': 'ClassVarianceAuthority',
          'clsx': 'clsx',
          'tailwind-merge': 'tailwindMerge',
          '@vueuse/core': 'VueUse'
        },
        assetFileNames: (assetInfo) => {
          // 只保留 modal.css，其他 CSS 文件不打包
          if (assetInfo.names?.[0] === 'style.css') return 'simple-modal.css';
          return assetInfo.names?.[0] || 'asset';
        },
      },
    },
  },
});
