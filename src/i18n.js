import { createI18n } from 'vue-i18n';
import zhCN from "./locales/zh-CN.js";
import enUS from "./locales/en-US.js";
import jaJP from "./locales/ja-JP.js";
import koKR from "./locales/ko-KR.js";

const messages = {
  "zh-CN": zhCN,
  "en-US": enUS,
  "ja-JP": jaJP,
  "ko-KR": koKR,
};

// 获取浏览器语言设置
const getBrowserLocale = () => {
  const browserLocale = navigator.language || navigator.languages[0];

  // 检查是否支持该语言
  if (messages[browserLocale]) {
    return browserLocale;
  }

  // 检查语言代码前缀（如 zh-CN -> zh）
  const languageCode = browserLocale.split("-")[0];
  for (const locale in messages) {
    if (locale.startsWith(languageCode)) {
      return locale;
    }
  }

  // 默认返回中文
  return "zh-CN";
};

// 从localStorage获取保存的语言设置
const getSavedLocale = () => {
  return localStorage.getItem("locale") || getBrowserLocale();
};

const i18n = createI18n({
  legacy: false,
  locale: getSavedLocale(),
  fallbackLocale: "zh-CN",
  messages,
});

export default i18n;

