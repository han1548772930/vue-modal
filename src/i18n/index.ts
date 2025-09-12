import { createI18n, I18n } from 'vue-i18n';
import type { App } from 'vue';
import en from './locales/en';
import zhCN from './locales/zh-CN';
import ja from './locales/ja';
import es from './locales/es';
import fr from './locales/fr';

export type MessageSchema = typeof en;

// Define available locales (mutable for dynamic language addition)
export let SUPPORT_LOCALES = ['en', 'zh-CN', 'ja', 'es', 'fr'];
export type Locale = 'en' | 'zh-CN' | 'ja' | 'es' | 'fr' | string;

// Define messages
const messages = {
  en,
  'zh-CN': zhCN,
  ja,
  es,
  fr,
};

// Create i18n instance singleton (内部自动初始化)
let i18nInstance: any = null;

/**
 * 内部初始化 i18n 实例
 */
function initI18n(): any {
  const i18n = createI18n({
    legacy: false,
    locale: 'zh-CN', // 默认中文
    fallbackLocale: 'zh-CN',
    messages,
    globalInjection: false,
    missingWarn: false,
    fallbackWarn: false,
  });
  i18nInstance = i18n;
  return i18n;
}

/**
 * Get or create i18n instance (内部使用)
 */
export function getI18nInstance(): any {
  if (!i18nInstance) {
    initI18n();
  }
  return i18nInstance;
}


/**
 * Change locale
 */
export function setLocale(locale: Locale | string): void {
  const i18n = getI18nInstance();
  if (i18n.global.locale && typeof i18n.global.locale === 'object' && 'value' in i18n.global.locale) {
    i18n.global.locale.value = locale;
  }
}

/**
 * Get current locale
 */
export function getLocale(): string {
  const i18n = getI18nInstance();
  if (i18n.global.locale && typeof i18n.global.locale === 'object' && 'value' in i18n.global.locale) {
    return i18n.global.locale.value;
  }
  return 'en';
}

/**
 * Add or update locale messages
 */
export function addLocaleMessages(locale: string, messages: Partial<MessageSchema>): void {
  const i18n = getI18nInstance();
  const currentMessages = i18n.global.getLocaleMessage(locale) || {};
  
  // Merge new messages with existing ones
  const mergedMessages = {
    ...currentMessages,
    ...messages,
    modal: {
      ...(currentMessages?.modal || {}),
      ...(messages?.modal || {}),
    },
  };
  
  i18n.global.setLocaleMessage(locale, mergedMessages);
  
  // Add locale to supported locales if not already there
  if (!SUPPORT_LOCALES.includes(locale)) {
    SUPPORT_LOCALES.push(locale);
  }
}

/**
 * Remove locale messages
 */
export function removeLocaleMessages(locale: string): void {
  const i18n = getI18nInstance();
  // Just remove the messages, but keep the locale available
  i18n.global.setLocaleMessage(locale, {});
  
  // Remove from supported locales
  const index = SUPPORT_LOCALES.indexOf(locale);
  if (index > -1) {
    SUPPORT_LOCALES.splice(index, 1);
  }
}

/**
 * Get all available locales
 */
export function getAvailableLocales(): string[] {
  const i18n = getI18nInstance();
  return i18n.global.availableLocales;
}

/**
 * Check if locale is available
 */
export function hasLocale(locale: string): boolean {
  const i18n = getI18nInstance();
  return i18n.global.availableLocales.includes(locale);
}

// Export types and utilities
export { messages };
export type { I18n };
