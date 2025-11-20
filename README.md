# 🛠️ Mika Development Tools

> Cursor 生成常用工具集 - 一站式实用工具瑞士军刀

[![Vue](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)

## 📖 项目简介

Mika Cursor Tool 是一个基于 Vue 3 + Vite 构建的现代化工具集合，提供了丰富的实用工具，帮助开发者和用户提高工作效率。

## ✨ 功能特性

### 🔧 转换工具 (5 个)

- **颜色转换**: HEX、RGB、HSL 颜色格式转换
- **时间戳转换**: Unix 时间戳与多种时间格式互转
- **Word 转 HTML**: .docx 文档转换为 HTML 格式
- **Markdown 转图片**: Markdown 文本渲染为 PNG/JPG 图片
- **SQL 转换**: 多数据库 SQL 语法转换、格式化和优化

### 📝 文本工具 (10 个)

- 文本格式化、统计分析
- JSON 处理、YAML 转换
- Markdown 预览、Slug 生成
- 正则表达式测试
- 文本差异对比等

### 🔐 编码/加密工具 (10 个)

- Base64 编码/解码
- URL 编码/解码
- JWT Token 解析
- MD5/SHA-256 哈希
- UUID 生成器
- Bcrypt 密码哈希
- 二维码/条形码生成等

### 🎲 生成工具 (4 个)

- 安全密码生成器
- SQL IN 语句生成器
- SQL 参数填充工具
- 统一社会信用代码生成

### 🧮 数学/单位工具 (9 个)

- 基础/科学计算器
- 单位换算转换
- 百分比计算
- 三角形求解
- 质数检测
- 二次方程求解
- 矩阵运算
- 汇率换算
- 罗马数字转换等

### 🎨 设计工具 (11 个)

- 颜色选择器、调色板生成
- 对比度检查器
- 渐变色生成器
- 阴影生成器
- 圆角边框生成
- Favicon 生成器
- CSS Clamp 计算器
- Tailwind 速查表等

### 🖼️ 图片/媒体工具 (11 个)

- 图片压缩、调整大小
- 图片格式转换、裁剪
- **图片去水印** - 智能去除图片中的水印和标记
- EXIF 信息查看
- SVG 压缩优化
- GIF 分解
- 视频剪辑
- 音频转换
- 图标拼接器等

### ⏰ 时间/日期工具 (10 个)

- Unix 时间戳转换
- Cron 表达式解析
- 年龄计算器
- 时间差计算
- 时区转换
- 周数计算
- 倒计时器
- 日期加减
- 工作日计算
- 日历制作器

### 🌐 Web/开发工具 (11 个)

- JSON 转 TypeScript
- HTTP 状态码查询
- User-Agent 解析
- MIME 类型搜索
- DNS 查询
- IP 信息查询
- JWT 生成器
- UUID 命名空间
- 正则表达式速查表
- JSON 差异对比
- **运维指令大全** - 前端运维及Mac下常用命令速查表（251个命令）

### 🎯 随机/生成器工具 (9 个)

- Lorem 图片生成
- 假用户数据生成
- 随机颜色生成
- 姓名生成器
- 名言生成器
- UUID 批量生成
- 骰子模拟器
- 彩票选号器
- 故事提示生成器

### 📄 文件/文档工具 (10 个)

- CSV↔JSON 转换
- Markdown 目录生成
- 文本转 PDF
- PDF 合并/分割
- Excel 转 JSON
- ZIP 文件解压
- 图片转 PDF
- 文件哈希计算等

### 📊 数据/可视化工具 (10 个)

- CSV 数据预览
- JSON 数据可视化
- Markdown 图表生成
- GeoJSON 查看器
- Base64 图片处理
- HTML 预览
- 表格排序器
- URL 解析器
- 邮箱验证器
- 信用卡校验器

## 🚀 技术栈

- **前端框架**: Vue 3 (Composition API)
- **构建工具**: Vite 5.x
- **CSS 预处理**: Sass
- **图标库**: Font Awesome
- **现代化特性**: 响应式设计、深色主题、PWA 支持

## 💻 本地开发

### 环境要求

- Node.js >= 16.0.0
- npm 或 yarn

### 安装运行

```bash
# 克隆项目
git clone https://github.com/DarylLi/mika-cursor-tools.git

# 进入项目目录
cd mika-cursor-tools

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 打开浏览器访问 http://localhost:3000
```

### 构建部署

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 📁 项目结构

```
mika-cursor-tools/
├── src/
│   ├── components/
│   │   └── tools/          # 所有工具组件
│   │   └── App.vue            # 主应用组件
│   │   └── main.js            # 应用入口
│   │   └── style.scss         # 全局样式
│   ├── public/                # 静态资源
│   ├── index.html            # HTML模板
│   ├── vite.config.js        # Vite配置
│   └── package.json          # 项目配置
```

## 🎯 设计理念

- **用户友好**: 直观的界面设计，操作简单易懂
- **功能完整**: 涵盖开发和日常工作中的常用工具
- **性能优化**: 基于现代化技术栈，响应迅速
- **主题支持**: 内置深色/浅色主题切换
- **移动适配**: 响应式设计，支持各种设备
- **隐私保护**: 所有操作在本地完成，不上传数据

## 🔧 功能亮点

### 🎨 现代化 UI

- 渐变色头部设计
- 卡片式布局
- 平滑动画过渡
- 深色主题支持

### 💡 用户体验

- 弹窗式工具界面
- 面包屑导航
- 工具分类管理
- 一键复制功能

### ⚡ 技术特性

- Vue 3 Composition API
- Vite HMR 热更新
- ES6+ 模块化
- 代码分割优化

## ⭐ 常用工具

首页展示的 10 个最常用工具：

1. **JSON处理** - 格式化、验证、压缩 JSON 数据
2. **二维码生成** - 快速生成二维码
3. **HTTP Status Lookup** - HTTP 状态码查询
4. **IP Info & Whois** - IP 地址信息查询
5. **RegEx 速查表** - 正则表达式语法参考
6. **JSON Diff Viewer** - JSON 对象差异对比
7. **UUID 批量生成** - 批量生成 UUID
8. **图片转 PDF** - 将图片转换为 PDF
9. **Base64 Img Preview** - Base64 图片预览
10. **运维指令大全** - 251个运维命令速查

## 📊 统计信息

- **工具总数**: 121+ 个实用工具
- **文件数量**: 120+ 个组件
- **技术栈**: Vue 3 + Vite + Sass
- **国际化支持**: 中文、英文、日文、韩文

## 🤝 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建新的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📝 更新日志

### v1.1.0 (2025-11-20)

- ✨ 新增**图片去水印**工具 - 支持画笔和矩形两种标记模式，4种去除算法
- ✨ 新增**运维指令大全**工具 - 包含251个运维命令，涵盖端口管理、文件操作、Git、CI/CD等16个分类
- 🔄 更新常用工具列表 - 替换为10个最实用的工具
- 🎨 优化UI界面 - 添加时钟动画效果
- 🌍 完善国际化支持 - 所有新工具支持中英日韩四语言

### v1.0.0 (2025-01-01)

- ✨ 初始版本发布
- 🛠️ 添加 120+个实用工具
- 🎨 Vue 3 + Vite 现代化架构
- 🌙 深色主题支持
- 📱 响应式设计

## 📄 许可证

本项目基于 [MIT License](./LICENSE) 许可证开源。

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和设计师！

---

<div align="center">

**[⭐ 给个 Star](https://github.com/DarylLi/mika-cursor-tools) | [🚀 在线体验](https://darylli.github.io/mika-cursor-tools/dist/index.html) | [📖 文档](https://github.com/DarylLi/mika-cursor-tools)**

Made with ❤️ by [DarylLi](https://github.com/DarylLi)

</div>
