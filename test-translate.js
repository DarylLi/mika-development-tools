// 测试翻译功能
console.log('开始测试翻译功能...');

// 导入所需的模块
import { createI18n } from 'vue-i18n';
import jaJP from './src/locales/ja-JP.js';

// 创建i18n实例
const i18n = createI18n({
  legacy: false,
  locale: 'ja-JP',
  messages: {
    'ja-JP': jaJP
  }
});

// 测试翻译功能
const t = i18n.global.t;

// 测试分类翻译
console.log('--- 分类翻译测试 ---');
const categoriesToTest = ['data-viz', 'text', 'image'];

categoriesToTest.forEach(cat => {
  const key = `categories.${cat}.name`;
  const translated = t(key);
  console.log(`${key}: ${translated}`);
  
  if (translated === key) {
    console.error(`❌ 翻译未找到: ${key}`);
  } else {
    console.log(`✅ 翻译成功: ${translated}`);
  }
});

// 测试工具翻译
console.log('\n--- 工具翻译测试 ---');
const toolsToTest = ['markdown-mermaid', 'base64-image', 'html-preview'];

toolsToTest.forEach(tool => {
  const key = `tools.${tool}.name`;
  const translated = t(key);
  console.log(`${key}: ${translated}`);
  
  if (translated === key) {
    console.error(`❌ 翻译未找到: ${key}`);
  } else {
    console.log(`✅ 翻译成功: ${translated}`);
  }
});

// 检查翻译对象的完整结构
console.log('\n--- 翻译对象结构 ---');
console.log('Categories 键列表:', Object.keys(jaJP.categories || {}));
console.log('Tools 数量:', Object.keys(jaJP.tools || {}).length);

// 导出函数供其他脚本使用
export const testTranslations = () => {
  return {
    categories: categoriesToTest.map(cat => ({
      key: `categories.${cat}.name`,
      value: t(`categories.${cat}.name`)
    })),
    tools: toolsToTest.map(tool => ({
      key: `tools.${tool}.name`,
      value: t(`tools.${tool}.name`)
    }))
  };
};