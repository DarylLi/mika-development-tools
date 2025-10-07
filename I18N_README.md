# 国际化功能使用说明

## 功能概述

本项目已成功集成 Vue I18n 国际化功能，支持以下语言：

- 🇨🇳 简体中文 (zh-CN) - 默认语言
- 🇺🇸 English (en-US)
- 🇯🇵 日本語 (ja-JP)
- 🇰🇷 한국어 (ko-KR)

## 功能特性

### 1. 语言切换按钮

- 位置：页面右上角，主题切换按钮旁边
- 功能：点击可切换语言，支持下拉菜单选择
- 持久化：语言选择会保存到 localStorage

### 2. 自动语言检测

- 首次访问时自动检测浏览器语言设置
- 如果浏览器语言不在支持列表中，默认使用中文

### 3. 完整翻译覆盖

- ✅ 应用标题和描述
- ✅ 搜索框占位符
- ✅ 所有工具分类名称和描述
- ✅ 所有工具名称和描述
- ✅ 常用工具列表
- ✅ 面包屑导航
- ✅ 按钮和提示文本
- ✅ 页脚信息

## 文件结构

```
src/
├── locales/                 # 语言文件目录
│   ├── zh-CN.js            # 中文语言包
│   ├── en-US.js            # 英文语言包
│   ├── ja-JP.js            # 日文语言包
│   └── ko-KR.js            # 韩文语言包
├── components/
│   └── LanguageSwitcher.vue # 语言切换组件
├── i18n.js                 # 国际化配置文件
└── main.js                 # 主入口文件（已配置i18n）
```

## 使用方法

### 1. 在组件中使用翻译

```vue
<template>
  <div>
    <!-- 使用 $t() 函数进行翻译 -->
    <h1>{{ $t("app.title") }}</h1>
    <p>{{ $t("app.subtitle") }}</p>

    <!-- 带参数的翻译 -->
    <p>{{ $t("common.found") }} {{ count }} {{ $t("common.tools") }}</p>
  </div>
</template>
```

### 2. 在 JavaScript 中使用翻译

```javascript
import { useI18n } from "vue-i18n";

export default {
  setup() {
    const { t } = useI18n();

    const message = t("common.noResults");
    return { message };
  },
};
```

### 3. 添加新的翻译

在对应的语言文件中添加新的键值对：

```javascript
// src/locales/zh-CN.js
export default {
  common: {
    // 现有翻译...
    newKey: '新翻译内容'
  }
}

// src/locales/en-US.js
export default {
  common: {
    // 现有翻译...
    newKey: 'New translation content'
  }
}
```

## 技术实现

### 1. 依赖包

- `vue-i18n@9` - Vue 3 国际化插件

### 2. 配置特点

- 使用 Composition API 模式
- 支持浏览器语言自动检测
- 语言设置持久化存储
- 回退语言设置为中文

### 3. 组件特性

- 响应式设计，支持移动端
- 深色主题适配
- 平滑的动画效果
- 点击外部自动关闭菜单

## 开发说明

### 添加新语言

1. 在 `src/locales/` 目录下创建新的语言文件
2. 在 `src/i18n.js` 中导入并添加到 messages 对象
3. 在 `LanguageSwitcher.vue` 中添加新语言选项

### 翻译键命名规范

- 使用点号分隔的层级结构
- 使用 camelCase 命名
- 保持键名简洁且有意义

示例：

```javascript
{
  app: {
    title: '应用标题',
    subtitle: '应用副标题'
  },
  common: {
    home: '首页',
    close: '关闭'
  },
  tools: {
    calculator: {
      name: '计算器',
      description: '基础数学计算器'
    }
  }
}
```

## 测试验证

启动开发服务器后，可以通过以下方式测试国际化功能：

1. 访问应用首页
2. 点击右上角的语言切换按钮
3. 选择不同语言验证翻译效果
4. 刷新页面验证语言设置是否持久化
5. 检查浏览器开发者工具中的 localStorage

## 注意事项

- 确保所有语言文件中的键名保持一致
- 新增翻译内容时需要在所有语言文件中添加对应翻译
- 建议使用专业的翻译服务确保翻译质量
- 定期检查翻译内容的准确性和一致性

