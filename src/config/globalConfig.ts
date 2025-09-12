import { reactive, readonly } from 'vue';
import {
  setLocale as setI18nLocale,
  addLocaleMessages
} from '../i18n';

export type Locale = string;
export interface MessageSchema {
  okText: string;
  cancelText: string;
  justOkText: string;
  confirmTitle: string;
  loadingText: string;
}

export interface ModalGlobalConfig {
  // 当前语言
  locale?: Locale | string;
  // 自定义语言包
  locales?: Record<string, Partial<MessageSchema>>;
  // 默认按钮类型
  okType?: string;
  // 默认遮罩是否可关闭
  maskClosable?: boolean;
  // 默认是否显示关闭按钮
  closable?: boolean;
  // 默认是否支持键盘操作
  keyboard?: boolean;
  // 默认宽度
  width?: number | string;
  // 默认垂直居中
  centered?: boolean;
  // 默认 z-index
  zIndex?: number;
  // 自定义前缀类名
  prefixCls?: string;
  // 默认按钮文本（会被 i18n 覆盖）
  okText?: string;
  cancelText?: string;
}

// 默认配置
const defaultConfig: ModalGlobalConfig = {
  locale: 'zh-CN',
  okType: 'primary',
  maskClosable: true,
  closable: true,
  keyboard: true,
  width: 520,
  centered: false,
  zIndex: 1000,
  prefixCls: 'simple-modal',
};

// 全局配置实例（响应式）
const globalConfig = reactive<ModalGlobalConfig>({ ...defaultConfig });

// 配置更新记录
const configUpdateCallbacks: Array<(config: ModalGlobalConfig) => void> = [];

/**
 * 设置全局配置
 * @param config 配置对象
 */
export function setGlobalConfig(config: Partial<ModalGlobalConfig>): void {
  // 更新配置
  Object.assign(globalConfig, config);

  // 如果配置了语言,更新 i18n
  if (config.locale) {
    setI18nLocale(config.locale as Locale);
  }

  // 如果配置了自定义语言包,添加到 i18n
  if (config.locales) {
    Object.entries(config.locales).forEach(([locale, messages]) => {
      addLocaleMessages(locale, { modal: messages as any });
    });
  }

  // 触发所有回调
  configUpdateCallbacks.forEach(callback => callback(globalConfig));
}

/**
 * 获取全局配置（只读）
 */
export function getGlobalConfig(): Readonly<ModalGlobalConfig> {
  return readonly(globalConfig);
}

/**
 * 重置全局配置
 */
export function resetGlobalConfig(): void {
  Object.keys(globalConfig).forEach(key => {
    delete globalConfig[key as keyof ModalGlobalConfig];
  });
  Object.assign(globalConfig, defaultConfig);

  // 重置语言
  if (defaultConfig.locale) {
    setI18nLocale(defaultConfig.locale as Locale);
  }
}

/**
 * 订阅配置更新
 * @param callback 配置更新回调
 * @returns 取消订阅函数
 */
export function subscribeConfigUpdate(callback: (config: ModalGlobalConfig) => void): () => void {
  configUpdateCallbacks.push(callback);
  return () => {
    const index = configUpdateCallbacks.indexOf(callback);
    if (index > -1) {
      configUpdateCallbacks.splice(index, 1);
    }
  };
}

/**
 * 快捷方法：设置语言
 * @param locale 语言代码
 */
export function setLocale(locale: Locale | string): void {
  setGlobalConfig({ locale });
}

/**
 * 快捷方法：添加语言包
 * @param locale 语言代码
 * @param messages 语言包内容
 */
export function addLanguage(locale: string, messages: Partial<MessageSchema>): void {
  addLocaleMessages(locale, { modal: messages as any });
}

/**
 * 快捷方法：批量添加语言包
 * @param locales 语言包对象
 */
export function addLanguages(locales: Record<string, Partial<MessageSchema>>): void {
  Object.entries(locales).forEach(([locale, messages]) => {
    addLocaleMessages(locale, { modal: messages as any });
  });
}

