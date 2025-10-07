export default {
  // Common
  common: {
    home: "Home",
    close: "Close",
    search: "Search",
    clear: "Clear",
    tools: " tools",
    found: "Found",
    noResults: "No related tools found",
    tryOtherKeywords: "Try other keywords?",
    moreResults: "More",
    results: " results...",
    popularTools: "Popular Tools",
    selectCategory: "Select Tool Category",
    switchToLight: "Switch to Light Mode",
    switchToDark: "Switch to Dark Mode",
    switchLanguage: "Switch Language",
    confirm: "Confirm",
    confirmBtn: "Confirm",
    cancelBtn: "Cancel",
    loadExample: "Load Example",
    enterText: "Please enter text to convert...",
    // Button Text
    copy: "Copy",
    download: "Download",
    upload: "Upload",
    convert: "Convert",
    process: "Process",
    calculate: "Calculate",
    selectFile: "Select File",
    clearAll: "Clear All",
    add: "Add",
    remove: "Remove",
    start: "Start",
    stop: "Stop",
    extract: "Extract",
    // 标签文本
      startDate: "Start Date",
      endDate: "End Date",
      fileName: "File Name",
      fileSize: "File Size",
      fileType: "File Type",
      status: "Status",
      progress: "Progress",
      result: "Result",
      options: "Options",
      selected: "Selected",
    // Prompt Text
    success: "Success",
    error: "Error",
    warning: "Warning",
    info: "Info",
    loading: "Loading...",
    processing: "Processing...",
    completed: "Completed",
    failed: "Failed",
    copied: "Copied to clipboard",
    // Common Tool Interface
    toolDescription: "Tool Description",
    usageGuide: "Usage Guide",
    input: "Input",
    output: "Output",
    settings: "Settings",
    preview: "Preview",
    format: "Format",
    minify: "Minify"
  },

  // App title and description
  app: {
    title: "Universal Swiss Army Tools",
    subtitle: "One-stop Practical Tools Collection | Swiss Army Tools",
    searchPlaceholder:
      "Search tools... (supports tool name, description search)",
    footer:
      "© 2025 Universal Swiss Army Tools | Modern Development, More Efficient Work",
    poweredBy: "Powered by Vue 3 + Vite",
  },

  // Tool categories
  categories: {
    text: {
      name: "Text Tools",
      description: "Text processing, formatting, statistical analysis, etc.",
    },
    converter: {
      name: "Converter Tools",
      description: "Various format conversion tools",
    },
    crypto: {
      name: "Encoding/Encryption",
      description:
        "Encoding conversion, hash encryption, JWT parsing and other security tools",
    },
    generator: {
      name: "Generator Tools",
      description: "Password generation and other practical generators",
    },
    math: {
      name: "Math/Units",
      description:
        "Mathematical calculations, unit conversion, number processing and other professional tools",
    },
    design: {
      name: "Color/Design",
      description: "Color selection, CSS generation, design assistance tools",
    },
    media: {
      name: "Image/Multimedia",
      description:
        "Image, audio/video processing, format conversion, optimization compression",
    },
    datetime: {
      name: "Date/Time",
      description:
        "Timestamp conversion, date calculation, timezone conversion, etc.",
    },
    webdev: {
      name: "Web / DevTools",
      description:
        "Web development tools, API testing, data conversion and other essential developer tools",
    },
    random: {
      name: "Random / Generator",
      description:
        "Random data generation, placeholder content, name generation and other creative tools",
    },
    files: {
      name: "Files / Documents",
      description:
        "File format conversion, document processing, compression/decompression tools",
    },
    dataViz: {
      name: "Data / Visualization",
      description:
        "Data analysis, chart generation, format preview and other visualization tools",
    },
  },

  // Tool names and descriptions
  tools: {
    // All tools kebab-case aliases - matching component IDs
    // Text tools
    'text-formatter': {
      name: "Text Formatter",
      description: "Case conversion, title formatting, text reversal, etc.",
    },
    'text-stats': {
      name: "Text Statistics",
      description: "Character count, word count, line count statistical analysis",
    },
    'json-processor': {
      name: "JSON Processor",
      description: "JSON formatting, compression, validation, etc.",
    },
    'slug-generator': {
      name: "Slug Generator",
      description: "Generate URL-slug, supports multiple naming formats",
    },
    'lorem-ipsum': {
      name: "Lorem Ipsum",
      description: "Dummy text generator, supports Chinese and English placeholder text",
    },
    'markdown-preview': {
      name: "Markdown Preview",
      description: "MD→HTML real-time preview conversion",
    },
    'yaml-to-json': {
      name: "YAML→JSON",
      description: "YAML and JSON format conversion tool",
    },
    'html-to-text': {
      name: "HTML Stripper",
      description: "Extract plain text content from HTML",
    },
    'regex-tester': {
      name: "RegEx Tester",
      description: "Regular expression real-time matching test",
    },
    'diff-viewer': {
      name: "Text Diff",
      description: "Text difference comparison tool",
    },
    
    // Converter tools
    'color-converter': {
      name: "Color Converter",
      description: "HEX, RGB, HSL color format conversion",
    },
    'timestamp-converter': {
      name: "Timestamp Converter",
      description: "Unix timestamp, ISO string, local time and other format conversion",
    },
    'word-to-html': {
      name: "Word to HTML Tool",
      description: "Convert Word documents (.docx) to HTML format",
    },
    'markdown-to-image': {
      name: "Markdown to Image Tool",
      description: "Render Markdown text as PNG/JPG images",
    },
    'sql-converter': {
      name: "SQL Converter",
      description: "Multi-database SQL syntax conversion, formatting and optimization",
    },
    
    // Encoding/Encryption tools
    'base64-converter': {
      name: "Base64 Encoder",
      description: "Base64 encoding and decoding conversion",
    },
    'url-converter': {
      name: "URL Encoder",
      description: "URL encoding and decoding conversion",
    },
    'jwt-decoder': {
      name: "JWT Parser",
      description: "Parse JWT Token, view Header and Payload",
    },
    'md5-hash': {
      name: "MD5 Hash",
      description: "Calculate MD5 hash value of text",
    },
    'sha256-hash': {
      name: "SHA-256 Hash",
      description: "Calculate SHA-256 hash value of text",
    },
    'uuid-generator': {
      name: "UUID Generator",
      description: "Generate UUID v4 unique identifier",
    },
    'bcrypt-hash': {
      name: "Bcrypt Hash",
      description: "Generate and verify Bcrypt password hash",
    },
    'qr-generator': {
      name: "QR Code Generator",
      description: "Text to QR code, supports multiple formats",
    },
    'barcode-generator': {
      name: "Barcode Generator",
      description: "Generate Code 128 barcode",
    },
    'password-strength': {
      name: "Password Strength Check",
      description: "Check password strength and provide improvement suggestions",
    },
    
    // Generator tools
    'password-generator': {
      name: "Password Generator",
      description: "Secure password generation, customizable character types",
    },
    'sql-in-generator': {
      name: "SQL IN Statement Generator",
      description: "Convert various format data to SQL IN statements",
    },
    'sql-parameter-filler': {
      name: "SQL Parameter Filler",
      description: "Fill parameterized SQL statements into complete executable SQL",
    },
    'credit-code-generator': {
      name: "Unified Social Credit Code Generator",
      description: "Generate 18-digit unified social credit code compliant with national standards",
    },
    
    // Math/Units tools
    'calculator': {
      name: "Basic Calculator",
      description: "Four arithmetic operations, scientific calculation functions",
    },
    'unit-converter': {
      name: "Unit Converter",
      description: "Length, weight, area, volume and other unit conversion",
    },
    'percentage-calc': {
      name: "Percentage Calculator",
      description: "Percentage increase/decrease, ratio calculation, discount calculation",
    },
    'triangle-solver': {
      name: "Triangle Solver",
      description: "Find other sides and angles from known sides and angles, trigonometric calculation",
    },
    'prime-checker': {
      name: "Prime Checker",
      description: "Prime number judgment, factorization, prime number generation",
    },
    'quadratic-solver': {
      name: "Quadratic Equation Solver",
      description: "Quadratic equation root finding, discriminant analysis",
    },
    'matrix-math': {
      name: "Matrix Math",
      description: "Matrix addition, subtraction, multiplication, inverse, determinant calculation",
    },
    'currency-converter': {
      name: "Currency Converter",
      description: "Major currency exchange rate conversion, static exchange rate data",
    },
    'roman-numeral': {
      name: "Roman Numeral Converter",
      description: "Arabic numerals and Roman numerals conversion",
    },
    'base-converter': {
      name: "Base Converter",
      description: "2-36 base number conversion, essential for programmers",
    },
    'random-number': {
      name: "Random Number Generator",
      description: "Various types of random numbers, sequences, string generation",
    },
    
    // Color/Design tools
    'color-picker': {
      name: "Color Picker",
      description: "Professional color picker tool, supports multiple formats",
    },
    'hex-rgb-converter': {
      name: "HEX↔RGB Converter",
      description: "Color format conversion, supports HSL/HSV/CMYK",
    },
    'palette-generator': {
      name: "Palette Generator",
      description: "Intelligent color scheme generation, supports multiple harmonious colors",
    },
    'contrast-checker': {
      name: "Contrast Checker",
      description: "WCAG standard color contrast detection tool",
    },
    'gradient-maker': {
      name: "CSS Gradient Generator",
      description: "Visual CSS gradient code generator",
    },
    'shadow-generator': {
      name: "Box Shadow Generator",
      description: "CSS box-shadow visual generation",
    },
    'border-radius': {
      name: "Border Radius Visualizer",
      description: "CSS border-radius visual adjustment",
    },
    'favicon-generator': {
      name: "Favicon Generator",
      description: "Multi-size favicon icon generator",
    },
    'css-clamp': {
      name: "CSS Clamp Calculator",
      description: "Responsive size clamp() function generator",
    },
    'tailwind-cheatsheet': {
      name: "Tailwind Cheatsheet",
      description: "Tailwind CSS class name quick lookup",
    },
    
    // Image/Multimedia tools
    'image-compress': {
      name: "Image Compressor",
      description: "Client-side compression JPG/PNG/WebP, privacy protection",
    },
    'image-resize': {
      name: "Image Resizer",
      description: "Proportional scaling or custom size, maintain quality",
    },
    'image-convert': {
      name: "Image Format Converter",
      description: "PNG↔WebP↔JPG format conversion",
    },
    'image-crop': {
      name: "Image Cropping Tool",
      description: "Precise cropping and export, supports multiple ratios",
    },
    'exif-viewer': {
      name: "EXIF Metadata Viewer",
      description: "View/remove image metadata, privacy protection",
    },
    'svg-minify': {
      name: "SVG Minifier",
      description: "Compress SVG files, remove redundant code",
    },
    'gif-split': {
      name: "GIF Frame Splitter",
      description: "Split animated GIF into separate frames",
    },
    'video-trim': {
      name: "Video Trimmer",
      description: "Browser-side video editing, no upload required",
    },
    'audio-convert': {
      name: "Audio Format Converter",
      description: "MP3/WAV/OGG/AAC format conversion",
    },
    'icon-spriter': {
      name: "SVG Sprite Generator",
      description: "Merge SVG icons, generate sprite sheets",
    },
    
    // Date/Time tools
    'unix-timestamp': {
      name: "Unix Timestamp Converter",
      description: "Timestamp↔date conversion, supports seconds/milliseconds",
    },
    'cron-parser': {
      name: "Cron Expression Parser",
      description: "Parse Cron expressions, predict execution time",
    },
    'age-calculator': {
      name: "Age Calculator",
      description: "Accurately calculate age, count life time",
    },
    'time-diff': {
      name: "Date Interval Calculator",
      description: "Calculate time difference between two dates",
    },
    'timezone-convert': {
      name: "Timezone Converter",
      description: "Global timezone time conversion tool",
    },
    'week-number': {
      name: "ISO Week Number Calculator",
      description: "Calculate ISO standard week numbers and years",
    },
    'countdown-timer': {
      name: "Countdown Timer",
      description: "Event countdown, supports multiple display formats",
    },
    'date-add': {
      name: "Date Addition Calculator",
      description: "Date addition and subtraction operations, supports multiple time units",
    },
    'working-days': {
      name: "Working Days Calculator",
      description: "Calculate working days, exclude holidays",
    },
    'calendar-maker': {
      name: "Calendar Generator",
      description: "Generate beautiful monthly calendar PNG images",
    },
    
    // Web/DevTools tools
    'json-to-ts': {
      name: "JSON→TS Interface",
      description: "Convert JSON data to TypeScript interface definitions",
    },
    'http-status': {
      name: "HTTP Status Lookup",
      description: "HTTP status code query and explanation",
    },
    'user-agent': {
      name: "User Agent Parser",
      description: "Parse User Agent strings, identify browsers and devices",
    },
    'mime-search': {
      name: "MIME Type Search",
      description: "Search MIME types corresponding to file extensions",
    },
    'dns-lookup': {
      name: "DNS Lookup",
      description: "DNS query tool, supports multiple record types",
    },
    'ip-info': {
      name: "IP Info & Whois",
      description: "Query public IP and Whois information",
    },
    'jwt-generator': {
      name: "JWT Signer (HS256)",
      description: "Local JWT Token generation and signing",
    },
    'uuid-namespace': {
      name: "UUID v5 Generator",
      description: "Generate UUID v5 based on namespace",
    },
    'regex-cheatsheet': {
      name: "RegEx Cheatsheet",
      description: "Regular expression syntax reference and common patterns",
    },
    'json-diff': {
      name: "JSON Diff Viewer",
      description: "JSON object difference comparison tool",
    },
    
    // Random/Generator tools
    'lorem-image': {
      name: "Placeholder Image Generator",
      description: "Generate placeholder images of various sizes, supports custom colors and text",
    },
    'fake-user': {
      name: "Fake User Profile",
      description: "Generate complete fake user information, suitable for development testing",
    },
    'random-color': {
      name: "Random Color Generator",
      description: "Generate random colors, supports multiple formats and color schemes",
    },
    'name-generator': {
      name: "Name Generator",
      description: "Generate names from various cultural backgrounds, supports multiple styles",
    },
    'quote-generator': {
      name: "Random Quote Generator",
      description: "Generate inspirational quotes, philosophical statements, classic quotes",
    },
    'uuid-batch': {
      name: "UUID Batch Generator",
      description: "Batch generate UUIDs, supports multiple versions and formats",
    },
    'dice-roller': {
      name: "RPG Dice Simulator",
      description: "Simulate various game dice, supports complex dice expressions",
    },
    'lottery-picker': {
      name: "Lottery Picker Tool",
      description: "Random lottery, random name selection, lucky wheel",
    },
    'story-prompt': {
      name: "Writing Inspiration Generator",
      description: "Generate creative writing prompts, story beginnings, plot ideas",
    },
    
    // Files/Documents tools
    'csv-to-json': {
      name: "CSV → JSON",
      description: "Convert CSV files to JSON format",
    },
    'json-to-csv': {
      name: "JSON → CSV",
      description: "Convert JSON data to CSV format",
    },
    'markdown-toc': {
      name: "MD TOC",
      description: "Generate Markdown document table of contents structure",
    },
    'text-to-pdf': {
      name: "Text → PDF",
      description: "Convert text to PDF documents",
    },
    'merge-pdf': {
      name: "PDF Merger",
      description: "Merge multiple PDF files into one document",
    },
    'split-pdf': {
      name: "PDF Split",
      description: "Split PDF documents by pages",
    },
    'excel-to-json': {
      name: "XLSX → JSON",
      description: "Convert Excel files to JSON format",
    },
    'zip-extract': {
      name: "ZIP Extract",
      description: "Online ZIP file extraction",
    },
    'image-to-pdf': {
      name: "Img → PDF",
      description: "Convert images to PDF documents",
    },
    'file-hash': {
      name: "File Checksum",
      description: "Calculate file hash checksum",
    },
    
    // Data/Visualization tools
    'csv-preview': {
      name: "CSV Viewer",
      description: "CSV file preview and analysis tool",
    },
    'json-plot': {
      name: "JSON Plot | Chart.js",
      description: "JSON data visualization chart generation",
    },
    // Text tools
    textFormatter: {
      name: "Text Formatter",
      description: "Case conversion, title formatting, text reversal, etc.",
    },
    textStats: {
      name: "Text Statistics",
      description:
        "Character count, word count, line count statistical analysis",
    },
    jsonProcessor: {
      name: "JSON Processor",
      description: "JSON formatting, compression, validation, etc.",
    },
    slugGenerator: {
      name: "Slug Generator",
      description: "Generate URL-slug, supports multiple naming formats",
    },
    loremIpsum: {
      name: "Lorem Ipsum",
      description:
        "Dummy text generator, supports Chinese and English placeholder text",
    },
    markdownPreview: {
      name: "Markdown Preview",
      description: "MD→HTML real-time preview conversion",
    },
    yamlToJson: {
      name: "YAML→JSON",
      description: "YAML and JSON format conversion tool",
    },
    htmlToText: {
      name: "HTML Stripper",
      description: "Extract plain text content from HTML",
    },
    regexTester: {
      name: "RegEx Tester",
      description: "Regular expression real-time matching test",
    },
    diffViewer: {
      name: "Text Diff",
      description: "Text difference comparison tool",
    },

    // Converter tools
    colorConverter: {
      name: "Color Converter",
      description: "HEX, RGB, HSL color format conversion",
    },
    timestampConverter: {
      name: "Timestamp Converter",
      description:
        "Unix timestamp, ISO string, local time and other format conversion",
    },
    wordToHtml: {
      name: "Word to HTML Tool",
      description: "Convert Word documents (.docx) to HTML format",
    },
    markdownToImage: {
      name: "Markdown to Image Tool",
      description: "Render Markdown text as PNG/JPG images",
    },
    sqlConverter: {
      name: "SQL Converter",
      description:
        "Multi-database SQL syntax conversion, formatting and optimization",
    },

    // Encoding/Encryption tools
    base64Converter: {
      name: "Base64 Encoder",
      description: "Base64 encoding and decoding conversion",
    },
    urlConverter: {
      name: "URL Encoder",
      description: "URL encoding and decoding conversion",
    },
    jwtDecoder: {
      name: "JWT Parser",
      description: "Parse JWT Token, view Header and Payload",
    },
    md5Hash: {
      name: "MD5 Hash",
      description: "Calculate MD5 hash value of text",
    },
    sha256Hash: {
      name: "SHA-256 Hash",
      description: "Calculate SHA-256 hash value of text",
    },
    uuidGenerator: {
      name: "UUID Generator",
      description: "Generate UUID v4 unique identifier",
    },
    bcryptHash: {
      name: "Bcrypt Hash",
      description: "Generate and verify Bcrypt password hash",
    },
    qrGenerator: {
      name: "QR Code Generator",
      description: "Text to QR code, supports multiple formats",
    },
    barcodeGenerator: {
      name: "Barcode Generator",
      description: "Generate Code 128 barcode",
    },
    passwordStrength: {
      name: "Password Strength Check",
      description:
        "Check password strength and provide improvement suggestions",
    },

    // Generator tools
    passwordGenerator: {
      name: "Password Generator",
      description: "Secure password generation, customizable character types",
    },
    sqlInGenerator: {
      name: "SQL IN Statement Generator",
      description: "Convert various format data to SQL IN statements",
    },
    sqlParameterFiller: {
      name: "SQL Parameter Filler",
      description:
        "Fill parameterized SQL statements into complete executable SQL",
    },
    creditCodeGenerator: {
      name: "Unified Social Credit Code Generator",
      description:
        "Generate 18-digit unified social credit code compliant with national standards",
    },

    // Math/Units tools
    calculator: {
      name: "Basic Calculator",
      description:
        "Four arithmetic operations, scientific calculation functions",
    },
    unitConverter: {
      name: "Unit Converter",
      description: "Length, weight, area, volume and other unit conversion",
    },
    percentageCalc: {
      name: "Percentage Calculator",
      description:
        "Percentage increase/decrease, ratio calculation, discount calculation",
    },
    triangleSolver: {
      name: "Triangle Solver",
      description:
        "Find other sides and angles from known sides and angles, trigonometric calculation",
    },
    primeChecker: {
      name: "Prime Checker",
      description:
        "Prime number judgment, factorization, prime number generation",
    },
    quadraticSolver: {
      name: "Quadratic Equation Solver",
      description: "Quadratic equation root finding, discriminant analysis",
    },
    matrixMath: {
      name: "Matrix Math",
      description:
        "Matrix addition, subtraction, multiplication, inverse, determinant calculation",
    },
    currencyConverter: {
      name: "Currency Converter",
      description:
        "Major currency exchange rate conversion, static exchange rate data",
    },
    romanNumeral: {
      name: "Roman Numeral Converter",
      description: "Arabic numerals and Roman numerals conversion",
    },
    baseConverter: {
      name: "Base Converter",
      description: "2-36 base number conversion, essential for programmers",
    },
    randomNumber: {
      name: "Random Number Generator",
      description:
        "Various types of random numbers, sequences, string generation",
    },

    // Color/Design tools
    colorPicker: {
      name: "Color Picker",
      description: "Professional color picker tool, supports multiple formats",
    },
    hexRgbConverter: {
      name: "HEX↔RGB Converter",
      description: "Color format conversion, supports HSL/HSV/CMYK",
    },
    paletteGenerator: {
      name: "Palette Generator",
      description:
        "Intelligent color scheme generation, supports multiple harmonious colors",
    },
    contrastChecker: {
      name: "Contrast Checker",
      description: "WCAG standard color contrast detection tool",
    },
    gradientMaker: {
      name: "CSS Gradient Generator",
      description: "Visual CSS gradient code generator",
    },
    shadowGenerator: {
      name: "Box Shadow Generator",
      description: "CSS box-shadow visual generation",
    },
    borderRadius: {
      name: "Border Radius Visualizer",
      description: "CSS border-radius visual adjustment",
    },
    faviconGenerator: {
      name: "Favicon Generator",
      description: "Multi-size favicon icon generator",
    },
    cssClamp: {
      name: "CSS Clamp Calculator",
      description: "Responsive size clamp() function generator",
    },
    tailwindCheatsheet: {
      name: "Tailwind Cheatsheet",
      description: "Tailwind CSS class name quick lookup",
    },

    // Image/Multimedia tools
    imageCompress: {
      name: "Image Compressor",
      description: "Client-side compression JPG/PNG/WebP, privacy protection",
    },
    imageResize: {
      name: "Image Resizer",
      description: "Proportional scaling or custom size, maintain quality",
    },
    imageConvert: {
      name: "Image Format Converter",
      description: "PNG↔WebP↔JPG format conversion",
    },
    imageCrop: {
      name: "Image Cropping Tool",
      description: "Precise cropping and export, supports multiple ratios",
    },
    exifViewer: {
      name: "EXIF Metadata Viewer",
      description: "View/remove image metadata, privacy protection",
    },
    svgMinify: {
      name: "SVG Minifier",
      description: "Compress SVG files, remove redundant code",
    },
    gifSplit: {
      name: "GIF Frame Splitter",
      description: "Split animated GIF into separate frames",
    },
    videoTrim: {
      name: "Video Trimmer",
      description: "Browser-side video editing, no upload required",
    },
    audioConvert: {
      name: "Audio Format Converter",
      description: "MP3/WAV/OGG/AAC format conversion",
    },
    iconSpriter: {
      name: "SVG Sprite Generator",
      description: "Merge SVG icons, generate sprite sheets",
    },

    // Date/Time tools
    unixTimestamp: {
      name: "Unix Timestamp Converter",
      description: "Timestamp↔date conversion, supports seconds/milliseconds",
    },
    cronParser: {
      name: "Cron Expression Parser",
      description: "Parse Cron expressions, predict execution time",
    },
    ageCalculator: {
      name: "Age Calculator",
      description: "Accurately calculate age, count life time",
    },
    timeDiff: {
      name: "Date Interval Calculator",
      description: "Calculate time difference between two dates",
    },
    timezoneConvert: {
      name: "Timezone Converter",
      description: "Global timezone time conversion tool",
    },
    weekNumber: {
      name: "ISO Week Number Calculator",
      description: "Calculate ISO standard week numbers and years",
    },
    countdownTimer: {
      name: "Countdown Timer",
      description: "Event countdown, supports multiple display formats",
    },
    dateAdd: {
      name: "Date Addition Calculator",
      description:
        "Date addition and subtraction operations, supports multiple time units",
    },
    workingDays: {
      name: "Working Days Calculator",
      description: "Calculate working days, exclude holidays",
    },
    calendarMaker: {
      name: "Calendar Generator",
      description: "Generate beautiful monthly calendar PNG images",
    },

    // Web/DevTools tools
    jsonToTs: {
      name: "JSON→TS Interface",
      description: "Convert JSON data to TypeScript interface definitions",
    },
    httpStatus: {
      name: "HTTP Status Lookup",
      description: "HTTP status code query and explanation",
    },
    userAgent: {
      name: "User Agent Parser",
      description: "Parse User Agent strings, identify browsers and devices",
    },
    mimeSearch: {
      name: "MIME Type Search",
      description: "Search MIME types corresponding to file extensions",
    },
    dnsLookup: {
      name: "DNS Lookup",
      description: "DNS query tool, supports multiple record types",
    },
    ipInfo: {
      name: "IP Info & Whois",
      description: "Query public IP and Whois information",
    },
    jwtGenerator: {
      name: "JWT Signer (HS256)",
      description: "Local JWT Token generation and signing",
    },
    uuidNamespace: {
      name: "UUID v5 Generator",
      description: "Generate UUID v5 based on namespace",
    },
    regexCheatsheet: {
      name: "RegEx Cheatsheet",
      description: "Regular expression syntax reference and common patterns",
    },
    jsonDiff: {
      name: "JSON Diff Viewer",
      description: "JSON object difference comparison tool",
    },

    // Random/Generator tools
    loremImage: {
      name: "Placeholder Image Generator",
      description:
        "Generate placeholder images of various sizes, supports custom colors and text",
    },
    fakeUser: {
      name: "Fake User Profile",
      description:
        "Generate complete fake user information, suitable for development testing",
    },
    randomColor: {
      name: "Random Color Generator",
      description:
        "Generate random colors, supports multiple formats and color schemes",
    },
    nameGenerator: {
      name: "Name Generator",
      description:
        "Generate names from various cultural backgrounds, supports multiple styles",
    },
    quoteGenerator: {
      name: "Random Quote Generator",
      description:
        "Generate inspirational quotes, philosophical statements, classic quotes",
    },
    uuidBatch: {
      name: "UUID Batch Generator",
      description:
        "Batch generate UUIDs, supports multiple versions and formats",
    },
    diceRoller: {
      name: "RPG Dice Simulator",
      description:
        "Simulate various game dice, supports complex dice expressions",
    },
    lotteryPicker: {
      name: "Lottery Picker Tool",
      description: "Random lottery, random name selection, lucky wheel",
    },
    storyPrompt: {
      name: "Writing Inspiration Generator",
      description:
        "Generate creative writing prompts, story beginnings, plot ideas",
    },

    // Files/Documents tools
    csvToJson: {
      name: "CSV → JSON",
      description: "Convert CSV files to JSON format",
    },
    jsonToCsv: {
      name: "JSON → CSV",
      description: "Convert JSON data to CSV format",
    },
    markdownToc: {
      name: "MD TOC",
      description: "Generate Markdown document table of contents structure",
    },
    textToPdf: {
      name: "Text → PDF",
      description: "Convert text to PDF documents",
    },
    mergePdf: {
      name: "PDF Merger",
      description: "Merge multiple PDF files into one document",
    },
    splitPdf: {
      name: "PDF Split",
      description: "Split PDF documents by pages",
    },
    excelToJson: {
      name: "XLSX → JSON",
      description: "Convert Excel files to JSON format",
    },
    zipExtract: {
      name: "ZIP Extract",
      description: "Online ZIP file extraction",
      selectZipFile: "Select ZIP File",
      dragDrop: "or drag files here",
      extractFiles: "Extract Files",
      extracting: "Extracting...",
      extractionComplete: "Extraction Complete",
      downloadAll: "Download All",
      fileSize: "File Size",
      files: "Files",
      folder: "Folder",
      errorReadingFile: "Error reading file",
      invalidZipFile: "Invalid ZIP file",
      noFilesExtracted: "No files extracted",
      extractTo: "Extract to",
      extractedFiles: "Extracted Files",
      cancel: "Cancel",
      supportStandardZip: "Supports standard ZIP format files",
      previewFileList: "Can preview file list in the archive",
      supportDownload: "Supports single or batch file download",
      localProcessing: "Processing is done locally in browser, privacy protected",
      libRequired: "Sorry, ZIP extraction requires JSZip or other professional libraries. It is recommended to use online ZIP extraction tools."
    },
    imageToPdf: {
      name: "Img → PDF",
      description: "Convert images to PDF documents",
    },
    fileHash: {
      name: "File Checksum",
      description: "Calculate file hash checksum",
    },

    // Data/Visualization tools
    csvPreview: {
      name: "CSV Viewer",
      description: "CSV file preview and analysis tool",
    },
    jsonPlot: {
      name: "JSON Plot | Chart.js",
      description: "JSON data visualization chart generation",
    },
    markdownMermaid: {
      name: "Mermaid Preview",
      description: "Mermaid diagram preview and editing",
    },
    geojsonViewer: {
      name: "GeoJSON Map",
      description: "GeoJSON map data viewer",
    },
    base64Image: {
      name: "Base64 Img Preview",
      description: "Base64 image encoding preview and conversion",
    },
    htmlPreview: {
      name: "Live HTML | iframe",
      description: "HTML real-time preview and debugging tool",
    },
    tableSorter: {
      name: "Table Sorter / Filter",
      description: "Table data sorting and filtering tool",
    },
    urlParser: {
      name: "URL Inspector",
      description: "URL structure parsing and analysis tool",
    },
    emailValidator: {
      name: "Email Regex Check",
      description: "Email address format validation tool",
    },
    creditCardCheck: {
      name: "Luhn Validator",
      description: "Credit card number Luhn algorithm validation",
    },
  },
};
