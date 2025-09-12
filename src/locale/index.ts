import { reactive, computed } from 'vue';

// 语言包类型
export interface LocaleMessages {
  okText: string;
  cancelText: string;
  justOkText: string;
  confirmTitle: string;
  loadingText: string;
}

// 内置语言包
const builtInLocales: Record<string, LocaleMessages> = {
  'zh-CN': {
    okText: '确定',
    cancelText: '取消',
    justOkText: '知道了',
    confirmTitle: '确认',
    loadingText: '加载中...',
  },
  'en': {
    okText: 'OK',
    cancelText: 'Cancel',
    justOkText: 'Got it',
    confirmTitle: 'Confirm',
    loadingText: 'Loading...',
  },
  'ja': {
    okText: 'OK',
    cancelText: 'キャンセル',
    justOkText: 'わかりました',
    confirmTitle: '確認',
    loadingText: '読み込み中...',
  },
  'es': {
    okText: 'Aceptar',
    cancelText: 'Cancelar',
    justOkText: 'Entendido',
    confirmTitle: 'Confirmar',
    loadingText: 'Cargando...',
  },
  'fr': {
    okText: 'OK',
    cancelText: 'Annuler',
    justOkText: 'Compris',
    confirmTitle: 'Confirmer',
    loadingText: 'Chargement...',
  },
  'de': {
    okText: 'Bestätigen',
    cancelText: 'Abbrechen',
    justOkText: 'Verstanden',
    confirmTitle: 'Bestätigung',
    loadingText: 'Wird geladen...',
  },
  'ko': {
    okText: '확인',
    cancelText: '취소',
    justOkText: '알겠습니다',
    confirmTitle: '확인',
    loadingText: '로딩 중...',
  },
  'ru': {
    okText: 'ОК',
    cancelText: 'Отмена',
    justOkText: 'Понятно',
    confirmTitle: 'Подтвердить',
    loadingText: 'Загрузка...',
  },
  'ar': {
    okText: 'موافق',
    cancelText: 'إلغاء',
    justOkText: 'حسناً',
    confirmTitle: 'تأكيد',
    loadingText: 'جار التحميل...',
  },
  'pt': {
    okText: 'Confirmar',
    cancelText: 'Cancelar',
    justOkText: 'Entendi',
    confirmTitle: 'Confirmação',
    loadingText: 'Carregando...',
  },
  'it': {
    okText: 'Conferma',
    cancelText: 'Annulla',
    justOkText: 'Ho capito',
    confirmTitle: 'Conferma',
    loadingText: 'Caricamento...',
  },
};

// 响应式的语言配置
const localeState = reactive({
  current: 'zh-CN', // 默认中文
  messages: { ...builtInLocales },
});

/**
 * 设置当前语言
 */
export function setLocale(locale: string): void {
  if (localeState.messages[locale]) {
    localeState.current = locale;
  } else {
    console.warn(`Locale "${locale}" not found, falling back to zh-CN`);
    localeState.current = 'zh-CN';
  }
}

/**
 * 获取当前语言
 */
export function getLocale(): string {
  return localeState.current;
}

/**
 * 添加或更新语言包
 */
export function addLocale(locale: string, messages: Partial<LocaleMessages>): void {
  localeState.messages[locale] = {
    ...builtInLocales['zh-CN'], // 使用中文作为默认值
    ...(localeState.messages[locale] || {}),
    ...messages,
  };
}

/**
 * 批量添加语言包
 */
export function addLocales(locales: Record<string, Partial<LocaleMessages>>): void {
  Object.entries(locales).forEach(([locale, messages]) => {
    addLocale(locale, messages);
  });
}

/**
 * 获取当前语言的消息
 */
export function getMessage(key: keyof LocaleMessages): string {
  const messages = localeState.messages[localeState.current];
  if (!messages) {
    // 如果当前语言不存在,回退到中文
    return builtInLocales['zh-CN'][key];
  }
  return messages[key] || builtInLocales['zh-CN'][key];
}

/**
 * 获取所有可用的语言
 */
export function getAvailableLocales(): string[] {
  return Object.keys(localeState.messages);
}

/**
 * 检查语言是否可用
 */
export function hasLocale(locale: string): boolean {
  return locale in localeState.messages;
}

/**
 * 移除语言包
 */
export function removeLocale(locale: string): void {
  if (locale !== 'zh-CN' && locale !== 'en') {
    // 不允许移除中文和英文
    delete localeState.messages[locale];
    if (localeState.current === locale) {
      localeState.current = 'zh-CN';
    }
  }
}

/**
 * 重置为默认语言包
 */
export function resetLocales(): void {
  localeState.messages = { ...builtInLocales };
  localeState.current = 'zh-CN';
}

/**
 * 用于组件的响应式 hook
 */
export function useLocale() {
  const okText = computed(() => getMessage('okText'));
  const cancelText = computed(() => getMessage('cancelText'));
  const justOkText = computed(() => getMessage('justOkText'));
  const confirmTitle = computed(() => getMessage('confirmTitle'));
  const loadingText = computed(() => getMessage('loadingText'));

  return {
    okText,
    cancelText,
    justOkText,
    confirmTitle,
    loadingText,
    locale: computed(() => localeState.current),
    setLocale,
    getMessage,
  };
}