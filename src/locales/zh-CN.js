export default {
  // 通用
  common: {
    home: "首页",
    close: "关闭",
    search: "搜索",
    clear: "清空",
    tools: "个工具",
    found: "找到",
    noResults: "没有找到相关工具",
    tryOtherKeywords: "试试其他关键词？",
    moreResults: "还有",
    results: "个结果...",
    popularTools: "常用工具",
    selectCategory: "选择工具分类",
    switchToLight: "切换到浅色模式",
    switchToDark: "切换到深色模式",
    switchLanguage: "切换语言",
    confirm: "确认",
    confirmBtn: "确定",
    cancelBtn: "取消",
    loadExample: "加载示例",
    enterText: "请输入要转换的文本...",
    // 按钮文本
    copy: "复制",
    download: "下载",
    upload: "上传",
    convert: "转换",
    process: "处理",
    calculate: "计算",
    selectFile: "选择文件",
    clearAll: "清空全部",
    add: "添加",
    remove: "移除",
    start: "开始",
    stop: "停止",
    // 标签文本
    startDate: "开始日期",
    endDate: "结束日期",
    fileName: "文件名",
    fileSize: "文件大小",
    fileType: "文件类型",
    status: "状态",
    progress: "进度",
    result: "结果",
    options: "选项",
    selected: "已选择",
    // 提示文本
    success: "成功",
    error: "错误",
    warning: "警告",
    info: "提示",
    loading: "加载中...",
    processing: "处理中...",
    completed: "完成",
    failed: "失败",
    copied: "已复制到剪贴板",
    // 工具界面通用
    toolDescription: "工具说明",
    usageGuide: "使用说明",
    input: "输入",
    output: "输出",
    settings: "设置",
    preview: "预览",
    format: "格式化",
    minify: "压缩"
  },

  // 应用标题和描述
  app: {
    title: "通用工具瑞士军刀",
    subtitle: "一站式实用工具集合 | Swiss Army Tools",
    searchPlaceholder: "搜索工具... (支持工具名称、描述搜索)",
    footer: "© 2025 通用工具瑞士军刀 | 现代化开发，让工作更高效",
    poweredBy: "Powered by Vue 3 + Vite",
  },

  // 工具分类
  categories: {
    // 新添加的分类
    utilities: {
      name: "实用工具",
      description: "其他实用工具集合"
    },
    text: {
      name: "文本工具",
      description: "文本处理、格式化、统计分析等",
    },
    converter: {
      name: "转换工具",
      description: "多种格式转换工具",
    },
    crypto: {
      name: "编码/加密",
      description: "编码转换、哈希加密、JWT解析等安全工具",
    },
    generator: {
      name: "生成工具",
      description: "密码生成等实用生成器",
    },
    math: {
      name: "数学/单位",
      description: "数学计算、单位转换、数字处理等专业工具",
    },
    design: {
      name: "颜色/设计",
      description: "颜色选择、CSS生成、设计辅助工具",
    },
    media: {
      name: "图片/多媒体",
      description: "图片、音视频处理，格式转换，优化压缩",
    },
    datetime: {
      name: "日期/时间",
      description: "时间戳转换、日期计算、时区转换等",
    },
    webdev: {
      name: "Web / DevTools",
      description: "Web开发工具、API测试、数据转换等开发者必备工具",
    },
    random: {
      name: "随机 / 生成器",
      description: "随机数据生成、占位内容、名字生成等创意工具",
    },
    files: {
      name: "文件 / 文档",
      description: "文件格式转换、文档处理、压缩解压等工具",
    },
    dataViz: {
      name: "数据 / 可视化",
      description: "数据分析、图表生成、格式预览等可视化工具",
    },
  },

  // 工具名称和描述
  tools: {
    // 所有工具kebab-case格式别名 - 与组件ID匹配
    // 文本工具
    'text-formatter': {
      name: "文本格式化",
      description: "大小写转换、标题格式、文本反转等",
    },
    'text-stats': {
      name: "文本统计",
      description: "字符数、单词数、行数统计分析",
    },
    'json-processor': {
      name: "JSON处理",
      description: "JSON格式化、压缩、验证等",
    },
    'slug-generator': {
      name: "Slug Generator",
      description: "生成 URL-slug，支持多种命名格式",
    },
    'lorem-ipsum': {
      name: "Lorem Ipsum",
      description: "假文生成器，支持中英文占位文本",
    },
    'markdown-preview': {
      name: "Markdown Preview",
      description: "MD→HTML 实时预览转换",
    },
    'yaml-to-json': {
      name: "YAML→JSON",
      description: "YAML与JSON格式互转工具",
    },
    'html-to-text': {
      name: "HTML Stripper",
      description: "提取HTML中的纯文本内容",
    },
    'regex-tester': {
      name: "RegEx Tester",
      description: "正则表达式实时匹配测试",
    },
    'diff-viewer': {
      name: "Text Diff",
      description: "文本差异对比工具",
    },
    
    // 转换工具
    'color-converter': {
      name: "颜色转换",
      description: "HEX、RGB、HSL颜色格式转换",
    },
    'timestamp-converter': {
      name: "时间戳转换工具",
      description: "Unix时间戳、ISO字符串、本地时间等格式互转",
    },
    'word-to-html': {
      name: "Word转HTML工具",
      description: "将Word文档(.docx)转换为HTML格式",
    },
    'markdown-to-image': {
      name: "Markdown转图片工具",
      description: "将Markdown文本渲染为PNG/JPG图片",
    },
    'sql-converter': {
      name: "SQL转换工具",
      description: "多数据库SQL语法转换、格式化和优化",
    },
    
    // 编码/加密工具
    'base64-converter': {
      name: "Base64转换",
      description: "Base64编码解码，支持图片转换",
    },
    'url-converter': {
      name: "URL编码/解码",
      description: "URL编码与解码工具",
    },
    'jwt-decoder': {
      name: "JWT解析器",
      description: "解析和验证JWT令牌内容",
    },
    'md5-hash': {
      name: "MD5哈希",
      description: "计算字符串或文件的MD5哈希值",
    },
    'sha256-hash': {
      name: "SHA256哈希",
      description: "计算字符串或文件的SHA-256哈希值",
    },
    'uuid-generator': {
      name: "UUID生成器",
      description: "生成随机UUID/GUID唯一标识符",
    },
    'bcrypt-hash': {
      name: "BCrypt加密",
      description: "生成BCrypt密码哈希",
    },
    'qr-generator': {
      name: "二维码生成器",
      description: "生成自定义二维码，支持多种格式",
    },
    'barcode-generator': {
      name: "条形码生成器",
      description: "生成多种格式的条形码",
    },
    'password-strength': {
      name: "密码强度检测",
      description: "检测密码强度并提供改进建议",
    },
    
    // 生成工具
    'password-generator': {
      name: "密码生成器",
      description: "生成强密码，支持自定义长度、字符集",
    },
    'sql-in-generator': {
      name: "SQL IN生成器",
      description: "生成SQL IN子句的格式化值列表",
    },
    'sql-parameter-filler': {
      name: "SQL参数填充器",
      description: "将参数值填充到SQL查询语句中",
    },
    'credit-code-generator': {
      name: "企业信用代码生成器",
      description: "生成有效的企业信用代码",
    },
    
    // 数学/单位工具
    'calculator': {
      name: "基础计算器",
      description: "简单的数学计算",
    },
    'unit-converter': {
      name: "单位转换",
      description: "长度、重量、体积等单位转换",
    },
    'percentage-calc': {
      name: "百分比计算器",
      description: "计算百分比、比例和增减幅度",
    },
    'triangle-solver': {
      name: "三角形计算器",
      description: "计算三角形的边长、角度和面积",
    },
    'prime-checker': {
      name: "质数检查",
      description: "检查数字是否为质数",
    },
    'quadratic-solver': {
      name: "二次方程求解",
      description: "解二次方程的根",
    },
    'matrix-math': {
      name: "矩阵计算",
      description: "矩阵的加减乘除、转置等运算",
    },
    'currency-converter': {
      name: "货币转换",
      description: "实时货币汇率转换",
    },
    'roman-numeral': {
      name: "罗马数字转换",
      description: "罗马数字与阿拉伯数字互转",
    },
    'base-converter': {
      name: "进制转换",
      description: "不同进制数值之间的转换",
    },
    'random-number': {
      name: "随机数生成",
      description: "生成指定范围内的随机数",
    },
    
    // 颜色/设计工具
    'color-picker': {
      name: "颜色选择器",
      description: "选择颜色、获取颜色代码、对比颜色",
    },
    'hex-rgb-converter': {
      name: "颜色代码转换",
      description: "HEX、RGB、HSL、HSV颜色格式互转",
    },
    'palette-generator': {
      name: "调色板生成器",
      description: "生成和谐的颜色搭配方案",
    },
    'contrast-checker': {
      name: "对比度检查器",
      description: "检查颜色对比度是否符合可访问性标准",
    },
    'gradient-maker': {
      name: "渐变生成器",
      description: "创建CSS渐变背景代码",
    },
    'shadow-generator': {
      name: "阴影生成器",
      description: "创建CSS阴影效果代码",
    },
    'border-radius': {
      name: "圆角生成器",
      description: "生成CSS圆角样式代码",
    },
    'favicon-generator': {
      name: "图标生成器",
      description: "生成多种尺寸的网站图标",
    },
    'css-clamp': {
      name: "CSS Clamp计算器",
      description: "生成响应式CSS clamp()函数",
    },
    'tailwind-cheatsheet': {
      name: "Tailwind参考表",
      description: "Tailwind CSS常用类参考",
    },
    
    // 图片/多媒体工具
    'image-compress': {
      name: "图片压缩",
      description: "在线压缩图片大小，保持质量",
    },
    'image-resize': {
      name: "图片调整",
      description: "调整图片尺寸、比例",
    },
    'image-convert': {
      name: "图片格式转换",
      description: "转换图片格式，支持多种格式",
    },
    'image-crop': {
      name: "图片裁剪",
      description: "裁剪图片，调整构图",
    },
    'exif-viewer': {
      name: "EXIF查看器",
      description: "查看和编辑图片的EXIF元数据",
    },
    'svg-minify': {
      name: "SVG 压缩优化",
      description: "压缩SVG文件，移除冗余代码",
    },
    'gif-split': {
      name: "GIF分解器",
      description: "将GIF动画分解为单张图片",
    },
    'video-trim': {
      name: "视频剪辑",
      description: "在线剪辑视频片段",
    },
    'audio-convert': {
      name: "音频转换",
      description: "转换音频格式、调整音质",
    },
    'icon-spriter': {
      name: "图标精灵生成器",
      description: "将多个图标合并为CSS精灵图",
    },
    
    // 日期/时间工具
    'unix-timestamp': {
      name: "Unix时间戳",
      description: "Unix时间戳与日期格式互转",
    },
    'cron-parser': {
      name: "Cron表达式解析",
      description: "解析和验证Cron表达式",
    },
    'age-calculator': {
      name: "年龄计算器",
      description: "根据出生日期计算年龄",
    },
    'time-diff': {
      name: "时间差计算器",
      description: "计算两个日期时间之间的差值",
    },
    'timezone-convert': {
      name: "时区转换",
      description: "不同时区之间的时间转换",
    },
    'week-number': {
      name: "周数计算器",
      description: "计算日期对应的周数",
    },
    'countdown-timer': {
      name: "倒计时器",
      description: "设置倒计时，显示剩余时间",
    },
    'date-add': {
      name: "日期加减",
      description: "在日期上增加或减少天数、月数、年数",
    },
    'working-days': {
      name: "工作日计算器",
      description: "计算排除节假日的工作日",
    },
    'calendar-maker': {
      name: "日历生成器",
      description: "生成自定义日历",
    },
    
    // Web / DevTools
    'json-to-ts': {
      name: "JSON→TypeScript",
      description: "将JSON转换为TypeScript类型定义",
    },
    'http-status': {
      name: "HTTP状态码",
      description: "查询HTTP状态码的含义",
    },
    'user-agent': {
      name: "User-Agent解析",
      description: "解析浏览器User-Agent字符串",
    },
    'mime-search': {
      name: "MIME类型查询",
      description: "查询文件扩展名对应的MIME类型",
    },
    'dns-lookup': {
      name: "DNS查询",
      description: "查询域名的IP地址和DNS记录",
    },
    'ip-info': {
      name: "IP信息查询",
      description: "查询IP地址的地理位置和运营商信息",
    },
    'jwt-generator': {
      name: "JWT生成器",
      description: "生成和签名JWT令牌",
    },
    'uuid-namespace': {
      name: "UUID命名空间生成器",
      description: "基于命名空间和名称生成UUID",
    },
    'regex-cheatsheet': {
      name: "正则表达式速查表",
      description: "常用正则表达式模式参考",
    },
    'json-diff': {
      name: "JSON差异对比",
      description: "比较两个JSON对象的差异",
    },
    
    // 随机 / 生成器
    'lorem-image': {
      name: "占位图片生成器",
      description: "生成指定尺寸的占位图片",
    },
    'fake-user': {
      name: "虚拟用户数据",
      description: "生成虚拟用户的个人信息",
    },
    'random-color': {
      name: "随机颜色生成器",
      description: "生成随机颜色代码",
    },
    'name-generator': {
      name: "姓名生成器",
      description: "生成随机人名",
    },
    'quote-generator': {
      name: "名人名言生成器",
      description: "生成随机名人名言",
    },
    'uuid-batch': {
      name: "批量UUID生成器",
      description: "批量生成多个UUID",
    },
    'dice-roller': {
      name: "骰子模拟器",
      description: "模拟掷骰子，支持多种骰子类型",
    },
    'lottery-picker': {
      name: "抽奖器",
      description: "随机抽取指定数量的选项",
    },
    'story-prompt': {
      name: "故事灵感生成器",
      description: "生成创意写作的灵感和提示",
    },
    
    // 文件 / 文档工具
    'csv-to-json': {
      name: "CSV→JSON",
      description: "将CSV文件转换为JSON格式",
    },
    'json-to-csv': {
      name: "JSON→CSV",
      description: "将JSON数据转换为CSV格式",
    },
    'markdown-toc': {
      name: "Markdown目录生成器",
      description: "自动生成Markdown文档的目录",
    },
    'text-to-pdf': {
      name: "文本转PDF",
      description: "将文本转换为PDF文档",
    },
    'merge-pdf': {
      name: "PDF合并",
      description: "合并多个PDF文件为一个文档",
    },
    'split-pdf': {
      name: "PDF分割",
      description: "将PDF文档按页面分割",
    },
    'excel-to-json': {
      name: "Excel→JSON",
      description: "将Excel文件转换为JSON格式",
    },
    'zip-extract': {
      name: "ZIP解压",
      description: "在线解压ZIP文件",
    },
    'image-to-pdf': {
      name: "图片转PDF",
      description: "将图片转换为PDF文档",
    },
    'file-hash': {
      name: "文件哈希计算",
      description: "计算文件的MD5、SHA1、SHA256哈希值",
    },
    
    // 数据 / 可视化工具
    'csv-preview': {
      name: "CSV预览器",
      description: "预览和分析CSV文件内容",
    },
    'json-plot': {
      name: "JSON数据可视化",
      description: "将JSON数据转换为图表",
    },
    // 文本工具
    textFormatter: {
      name: "文本格式化",
      description: "大小写转换、标题格式、文本反转等",
    },
    textStats: {
      name: "文本统计",
      description: "字符数、单词数、行数统计分析",
    },
    jsonProcessor: {
      name: "JSON处理",
      description: "JSON格式化、压缩、验证等",
    },
    slugGenerator: {
      name: "Slug Generator",
      description: "生成 URL-slug，支持多种命名格式",
    },
    loremIpsum: {
      name: "Lorem Ipsum",
      description: "假文生成器，支持中英文占位文本",
    },
    markdownPreview: {
      name: "Markdown Preview",
      description: "MD→HTML 实时预览转换",
    },
    yamlToJson: {
      name: "YAML→JSON",
      description: "YAML与JSON格式互转工具",
    },
    htmlToText: {
      name: "HTML Stripper",
      description: "提取HTML中的纯文本内容",
    },
    regexTester: {
      name: "RegEx Tester",
      description: "正则表达式实时匹配测试",
    },
    diffViewer: {
      name: "Text Diff",
      description: "文本差异对比工具",
    },

    // 转换工具
    colorConverter: {
      name: "颜色转换",
      description: "HEX、RGB、HSL颜色格式转换",
    },
    timestampConverter: {
      name: "时间戳转换工具",
      description: "Unix时间戳、ISO字符串、本地时间等格式互转",
    },
    wordToHtml: {
      name: "Word转HTML工具",
      description: "将Word文档(.docx)转换为HTML格式",
    },
    markdownToImage: {
      name: "Markdown转图片工具",
      description: "将Markdown文本渲染为PNG/JPG图片",
    },
    sqlConverter: {
      name: "SQL转换工具",
      description: "多数据库SQL语法转换、格式化和优化",
    },

    // 编码/加密工具
    base64Converter: {
      name: "Base64编码",
      description: "Base64编码解码转换",
    },
    urlConverter: {
      name: "URL编码",
      description: "URL编码解码转换",
    },
    jwtDecoder: {
      name: "JWT解析器",
      description: "解析JWT Token，查看Header和Payload",
    },
    md5Hash: {
      name: "MD5哈希",
      description: "计算文本的MD5哈希值",
    },
    sha256Hash: {
      name: "SHA-256哈希",
      description: "计算文本的SHA-256哈希值",
    },
    uuidGenerator: {
      name: "UUID生成器",
      description: "生成UUID v4唯一标识符",
    },
    bcryptHash: {
      name: "Bcrypt哈希",
      description: "生成和验证Bcrypt密码哈希",
    },
    qrGenerator: {
      name: "二维码生成",
      description: "文本转二维码，支持多种格式",
    },
    barcodeGenerator: {
      name: "条形码生成",
      description: "生成Code 128条形码",
    },
    passwordStrength: {
      name: "密码强度检测",
      description: "检测密码强度并给出改进建议",
    },

    // 生成工具
    passwordGenerator: {
      name: "密码生成器",
      description: "安全密码生成，可自定义字符类型",
    },
    sqlInGenerator: {
      name: "SQL IN 语句生成器",
      description: "将多种格式数据转换为SQL IN语句",
    },
    sqlParameterFiller: {
      name: "SQL 参数填充工具",
      description: "将参数化SQL语句填充为完整的可执行SQL",
    },
    creditCodeGenerator: {
      name: "统一社会信用代码生成",
      description: "生成符合国标的18位统一社会信用代码",
    },

    // 数学/单位工具
    calculator: {
      name: "基础计算器",
      description: "四则运算、科学计算功能",
    },
    unitConverter: {
      name: "单位换算",
      description: "长度、重量、面积、体积等单位转换",
    },
    percentageCalc: {
      name: "百分比计算",
      description: "百分比增减、比例计算、折扣计算",
    },
    triangleSolver: {
      name: "三角形求解",
      description: "已知边角求其他边角，三角函数计算",
    },
    primeChecker: {
      name: "质数检测",
      description: "质数判断、因数分解、质数生成",
    },
    quadraticSolver: {
      name: "二次方程求解",
      description: "一元二次方程求根、判别式分析",
    },
    matrixMath: {
      name: "矩阵运算",
      description: "矩阵加减乘、求逆、行列式计算",
    },
    currencyConverter: {
      name: "汇率换算",
      description: "主要货币汇率转换，静态汇率数据",
    },
    romanNumeral: {
      name: "罗马数字转换",
      description: "阿拉伯数字与罗马数字互转",
    },
    baseConverter: {
      name: "进制转换",
      description: "2-36进制数字互转，程序员必备",
    },
    randomNumber: {
      name: "随机数生成",
      description: "各种类型随机数、序列、字符串生成",
    },

    // 颜色/设计工具
    colorPicker: {
      name: "颜色选择器",
      description: "专业取色工具，支持多种格式",
    },
    hexRgbConverter: {
      name: "HEX↔RGB转换",
      description: "颜色格式互转，支持HSL/HSV/CMYK",
    },
    paletteGenerator: {
      name: "调色板生成器",
      description: "智能配色方案生成，支持多种和谐色彩",
    },
    contrastChecker: {
      name: "对比度检测",
      description: "WCAG标准色彩对比度检测工具",
    },
    gradientMaker: {
      name: "CSS渐变生成",
      description: "可视化CSS渐变代码生成器",
    },
    shadowGenerator: {
      name: "盒阴影生成器",
      description: "CSS box-shadow 可视化生成",
    },
    borderRadius: {
      name: "圆角可视化",
      description: "CSS border-radius 可视化调节",
    },
    faviconGenerator: {
      name: "网站图标生成",
      description: "多尺寸favicon图标生成器",
    },
    cssClamp: {
      name: "CSS Clamp计算",
      description: "响应式尺寸clamp()函数生成",
    },
    tailwindCheatsheet: {
      name: "Tailwind速查",
      description: "Tailwind CSS类名快速查找",
    },

    // 图片/多媒体工具
    imageCompress: {
      name: "图片压缩器",
      description: "客户端压缩 JPG/PNG/WebP，保护隐私",
    },
    imageResize: {
      name: "图片尺寸调整",
      description: "等比缩放或自定义尺寸，保持质量",
    },
    imageConvert: {
      name: "图片格式转换",
      description: "PNG↔WebP↔JPG 格式互转",
    },
    imageCrop: {
      name: "图片裁剪工具",
      description: "精确裁剪并导出，支持多种比例",
    },
    exifViewer: {
      name: "EXIF 元数据查看",
      description: "查看/移除图片元数据，保护隐私",
    },
    svgMinify: {
      name: "SVG 压缩优化",
      description: "压缩SVG文件，移除冗余代码",
    },
    gifSplit: {
      name: "GIF 帧拆分",
      description: "将动画GIF拆分为单独帧",
    },
    videoTrim: {
      name: "视频剪辑工具",
      description: "浏览器端视频剪辑，无需上传",
    },
    audioConvert: {
      name: "音频格式转换",
      description: "MP3/WAV/OGG/AAC 格式互转",
    },
    iconSpriter: {
      name: "SVG 雪碧图生成",
      description: "合并SVG图标，生成雪碧图",
    },

    // 日期/时间工具
    unixTimestamp: {
      name: "Unix时间戳转换",
      description: "时间戳↔日期互转，支持秒/毫秒",
    },
    cronParser: {
      name: "Cron表达式解析",
      description: "解析Cron表达式，预测执行时间",
    },
    ageCalculator: {
      name: "年龄计算器",
      description: "精确计算年龄，统计生命时光",
    },
    timeDiff: {
      name: "日期间隔计算",
      description: "计算两个日期间的时间差",
    },
    timezoneConvert: {
      name: "时区转换器",
      description: "全球时区时间转换工具",
    },
    weekNumber: {
      name: "ISO周数计算",
      description: "计算ISO标准周数和年份",
    },
    countdownTimer: {
      name: "倒计时器",
      description: "事件倒计时，支持多种显示格式",
    },
    dateAdd: {
      name: "日期加减计算",
      description: "日期的加减运算，支持多种时间单位",
    },
    workingDays: {
      name: "工作日计算器",
      description: "计算工作日，排除节假日",
    },
    calendarMaker: {
      name: "月历生成器",
      description: "生成漂亮的月历PNG图片",
    },

    // Web/DevTools工具
    jsonToTs: {
      name: "JSON→TS Interface",
      description: "将JSON数据转换为TypeScript接口定义",
    },
    httpStatus: {
      name: "HTTP Status Lookup",
      description: "HTTP状态码查询和说明",
    },
    userAgent: {
      name: "User Agent Parser",
      description: "解析User Agent字符串，识别浏览器和设备",
    },
    mimeSearch: {
      name: "MIME Type Search",
      description: "搜索文件扩展名对应的MIME类型",
    },
    dnsLookup: {
      name: "DNS Lookup",
      description: "DNS查询工具，支持多种记录类型",
    },
    ipInfo: {
      name: "IP Info & Whois",
      description: "查询公网IP和Whois信息",
    },
    jwtGenerator: {
      name: "JWT Signer (HS256)",
      description: "本地JWT Token生成和签名",
    },
    uuidNamespace: {
      name: "UUID v5 生成",
      description: "基于命名空间生成UUID v5",
    },
    regexCheatsheet: {
      name: "RegEx 速查表",
      description: "正则表达式语法参考和常用模式",
    },
    jsonDiff: {
      name: "JSON Diff Viewer",
      description: "JSON对象差异对比工具",
    },

    // 随机/生成器工具
    loremImage: {
      name: "占位图片生成",
      description: "生成各种尺寸的占位图片，支持自定义颜色文字",
    },
    fakeUser: {
      name: "虚拟人员资料",
      description: "生成完整的虚拟人员信息，适用于开发测试",
    },
    randomColor: {
      name: "随机颜色生成",
      description: "生成随机颜色，支持多种格式和调色方案",
    },
    nameGenerator: {
      name: "名字生成器",
      description: "生成各种文化背景的姓名，支持多种风格",
    },
    quoteGenerator: {
      name: "随机名言生成",
      description: "生成励志名言、哲理语句、经典语录",
    },
    uuidBatch: {
      name: "UUID 批量生成",
      description: "批量生成UUID，支持多种版本和格式",
    },
    diceRoller: {
      name: "RPG 骰子模拟",
      description: "模拟各种游戏骰子，支持复杂骰子表达式",
    },
    lotteryPicker: {
      name: "抽奖器工具",
      description: "随机抽奖、名单随机选择、幸运转盘",
    },
    storyPrompt: {
      name: "写作灵感生成",
      description: "生成创意写作提示、故事开头、情节点子",
    },

    // 文件/文档工具
    csvToJson: {
      name: "CSV → JSON",
      description: "将CSV文件转换为JSON格式",
    },
    jsonToCsv: {
      name: "JSON → CSV",
      description: "将JSON数据转换为CSV格式",
    },
    markdownToc: {
      name: "MD TOC",
      description: "生成Markdown文档目录结构",
    },
    textToPdf: {
      name: "Text → PDF",
      description: "将文本转换为PDF文档",
    },
    mergePdf: {
      name: "PDF Merger",
      description: "合并多个PDF文件为一个文档",
    },
    splitPdf: {
      name: "PDF Split",
      description: "将PDF文档按页面分割",
    },
    excelToJson: {
      name: "XLSX → JSON",
      description: "将Excel文件转换为JSON格式",
    },
    zipExtract: {
      name: "ZIP Extract",
      description: "在线解压ZIP文件",
      selectZipFile: "选择ZIP文件",
      dragDrop: "或拖放文件到此处",
      extractFiles: "解压文件",
      extracting: "解压中...",
      extractionComplete: "解压完成",
      downloadAll: "下载全部",
      fileSize: "文件大小",
      files: "文件",
      folder: "文件夹",
      errorReadingFile: "读取文件错误",
      invalidZipFile: "无效的ZIP文件",
      noFilesExtracted: "没有提取到文件",
      extractTo: "解压到",
      extractedFiles: "已解压文件",
      cancel: "取消",
      supportStandardZip: "支持标准ZIP格式文件",
      previewFileList: "可以预览压缩包内的文件列表",
      supportDownload: "支持单个或批量下载文件",
      localProcessing: "处理过程在浏览器本地完成，保护隐私",
      libRequired: "抱歉，ZIP解压功能需要JSZip等专业库。建议使用在线ZIP解压工具。"
    },
    imageToPdf: {
      name: "Img → PDF",
      description: "将图片转换为PDF文档",
    },
    fileHash: {
      name: "File Checksum",
      description: "计算文件的哈希值校验码",
    },

    // 数据/可视化工具
    csvPreview: {
      name: "CSV Viewer",
      description: "CSV文件预览与分析工具",
    },
    jsonPlot: {
      name: "JSON Plot | Chart.js",
      description: "JSON数据可视化图表生成",
    },
    markdownMermaid: {
      name: "Mermaid Preview",
      description: "Mermaid图表预览与编辑",
    },
    geojsonViewer: {
      name: "GeoJSON Map",
      description: "GeoJSON地图数据查看器",
    },
    base64Image: {
      name: "Base64 Img Preview",
      description: "Base64图片编码预览与转换",
    },
    htmlPreview: {
      name: "Live HTML | iframe",
      description: "HTML实时预览与调试工具",
    },
    tableSorter: {
      name: "Table Sorter / Filter",
      description: "表格数据排序与筛选工具",
    },
    urlParser: {
      name: "URL Inspector",
      description: "URL结构解析与分析工具",
    },
    emailValidator: {
      name: "Email Regex Check",
      description: "邮箱地址格式验证工具",
    },
    creditCardCheck: {
      name: "Luhn Validator",
      description: "信用卡号码Luhn算法验证",
    },
  },
};
