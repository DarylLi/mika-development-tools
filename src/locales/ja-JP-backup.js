export default {
  // 共通
  common: {
    home: "ホーム",
    close: "閉じる",
    search: "検索",
    clear: "クリア",
    tools: "個のツール",
    found: "見つかりました",
    noResults: "関連するツールが見つかりません",
    tryOtherKeywords: "他のキーワードを試してみますか？",
    moreResults: "さらに",
    results: "個の結果...",
    popularTools: "人気ツール",
    selectCategory: "ツールカテゴリを選択",
    switchToLight: "ライトモードに切り替え",
    switchToDark: "ダークモードに切り替え",
    switchLanguage: "言語切り替え",
    confirm: "確認",
    confirmBtn: "確認",
    cancelBtn: "キャンセル",
    loadExample: "例を読み込む",
    enterText: "変換するテキストを入力してください...",
    // ボタンテキスト
    copy: "コピー",
    download: "ダウンロード",
    upload: "アップロード",
    convert: "変換",
    process: "処理",
    calculate: "計算",
    selectFile: "ファイルを選択",
    clearAll: "すべてクリア",
    add: "追加",
    remove: "削除",
    start: "開始",
    stop: "停止",
    // ラベルテキスト
    startDate: "開始日",
    endDate: "終了日",
    fileName: "ファイル名",
    fileSize: "ファイルサイズ",
    fileType: "ファイルタイプ",
    status: "ステータス",
    progress: "進捗状況",
    result: "結果",
    options: "オプション",
    selected: "選択済み",
    // プロンプトテキスト
    success: "成功",
    error: "エラー",
    warning: "警告",
    info: "情報",
    loading: "読み込み中...",
    processing: "処理しています...",
    completed: "完了",
    failed: "失敗",
    copied: "クリップボードにコピーされました",
    // ツールインターフェース共通
    toolDescription: "ツールの説明",
    usageGuide: "使用ガイド",
    input: "入力",
    output: "出力",
    settings: "設定",
    preview: "プレビュー",
    format: "フォーマット",
    minify: "縮小"
  },

  // アプリタイトルと説明
  app: {
    title: "ユニバーサル・スイスアーミーツール",
    subtitle: "ワンストップ実用ツール集 | Swiss Army Tools",
    searchPlaceholder: "ツールを検索... (ツール名、説明検索をサポート)",
    footer:
      "© 2025 ユニバーサル・スイスアーミーツール | モダン開発、より効率的な作業",
    poweredBy: "Powered by Vue 3 + Vite",
  },

  // ツールカテゴリ
  categories: {
    text: {
      name: "テキストツール",
      description: "テキスト処理、フォーマット、統計分析など",
    },
    converter: {
      name: "変換ツール",
      description: "様々なフォーマット変換ツール",
    },
    crypto: {
      name: "エンコード/暗号化",
      description:
        "エンコード変換、ハッシュ暗号化、JWT解析などのセキュリティツール",
    },
    generator: {
      name: "生成ツール",
      description: "パスワード生成などの実用的な生成器",
    },
    math: {
      name: "数学/単位",
      description: "数学計算、単位変換、数値処理などの専門ツール",
    },
    design: {
      name: "カラー/デザイン",
      description: "カラー選択、CSS生成、デザイン支援ツール",
    },
    media: {
      name: "画像/マルチメディア",
      description: "画像、音声/動画処理、フォーマット変換、最適化圧縮",
    },
    datetime: {
      name: "日付/時間",
      description: "タイムスタンプ変換、日付計算、タイムゾーン変換など",
    },
    webdev: {
      name: "Web / DevTools",
      description: "Web開発ツール、APIテスト、データ変換などの開発者必須ツール",
    },
    random: {
      name: "ランダム / 生成器",
      description:
        "ランダムデータ生成、プレースホルダーコンテンツ、名前生成などのクリエイティブツール",
    },
    files: {
      name: "ファイル / ドキュメント",
      description:
        "ファイルフォーマット変換、ドキュメント処理、圧縮/解凍ツール",
    },
    dataViz: {
      name: "データ / 可視化",
      description:
        "データ分析、チャート生成、フォーマットプレビューなどの可視化ツール",
    },
  },

  // ツール名と説明
  tools: {
    // よく使われるツールのkebab-caseエイリアス - コンポーネントIDに一致
    'json-processor': {
      name: "JSONプロセッサ",
      description: "JSONの整形、圧縮、検証など",
    },
    'password-generator': {
      name: "パスワード生成器",
      description: "カスタム長と文字セットで強力なパスワードを生成",
    },
    'qr-generator': {
      name: "QRコード生成器",
      description: "複数の形式でカスタムQRコードを生成",
    },
    'base64-converter': {
      name: "Base64変換器",
      description: "Base64エンコーディング/デコーディング、画像変換をサポート",
    },
    'color-picker': {
      name: "カラーピッカー",
      description: "色の選択、色コードの取得、色の比較",
    },
    'unix-timestamp': {
      name: "Unixタイムスタンプ",
      description: "Unixタイムスタンプと日付形式の変換",
    },
    'calculator': {
      name: "基本電卓",
      description: "単純な数学的計算",
    },
    // テキストツール
    textFormatter: {
      name: "テキストフォーマッター",
      description: "大文字小文字変換、タイトルフォーマット、テキスト反転など",
    },
    textStats: {
      name: "テキスト統計",
      description: "文字数、単語数、行数の統計分析",
    },
    jsonProcessor: {
      name: "JSONプロセッサー",
      description: "JSONフォーマット、圧縮、検証など",
    },
    slugGenerator: {
      name: "Slug Generator",
      description: "URL-slugを生成、複数の命名フォーマットをサポート",
    },
    loremIpsum: {
      name: "Lorem Ipsum",
      description:
        "ダミーテキスト生成器、中国語と英語のプレースホルダーテキストをサポート",
    },
    markdownPreview: {
      name: "Markdown Preview",
      description: "MD→HTMLリアルタイムプレビュー変換",
    },
    yamlToJson: {
      name: "YAML→JSON",
      description: "YAMLとJSONフォーマット変換ツール",
    },
    htmlToText: {
      name: "HTML Stripper",
      description: "HTMLからプレーンテキストコンテンツを抽出",
    },
    regexTester: {
      name: "RegEx Tester",
      description: "正規表現リアルタイムマッチングテスト",
    },
    diffViewer: {
      name: "Text Diff",
      description: "テキスト差分比較ツール",
    },

    // 変換ツール
    colorConverter: {
      name: "カラーコンバーター",
      description: "HEX、RGB、HSLカラーフォーマット変換",
    },
    timestampConverter: {
      name: "タイムスタンプ変換ツール",
      description:
        "Unixタイムスタンプ、ISO文字列、ローカル時間などのフォーマット変換",
    },
    wordToHtml: {
      name: "Word to HTMLツール",
      description: "Word文書(.docx)をHTMLフォーマットに変換",
    },
    markdownToImage: {
      name: "Markdown to Imageツール",
      description: "MarkdownテキストをPNG/JPG画像にレンダリング",
    },
    sqlConverter: {
      name: "SQLコンバーター",
      description: "マルチデータベースSQL構文変換、フォーマット、最適化",
    },

    // エンコード/暗号化ツール
    base64Converter: {
      name: "Base64エンコーダー",
      description: "Base64エンコード/デコード変換",
    },
    urlConverter: {
      name: "URLエンコーダー",
      description: "URLエンコード/デコード変換",
    },
    jwtDecoder: {
      name: "JWTパーサー",
      description: "JWT Tokenを解析、HeaderとPayloadを表示",
    },
    md5Hash: {
      name: "MD5ハッシュ",
      description: "テキストのMD5ハッシュ値を計算",
    },
    sha256Hash: {
      name: "SHA-256ハッシュ",
      description: "テキストのSHA-256ハッシュ値を計算",
    },
    uuidGenerator: {
      name: "UUID生成器",
      description: "UUID v4一意識別子を生成",
    },
    bcryptHash: {
      name: "Bcryptハッシュ",
      description: "Bcryptパスワードハッシュの生成と検証",
    },
    qrGenerator: {
      name: "QRコード生成器",
      description: "テキストをQRコードに変換、複数フォーマットをサポート",
    },
    barcodeGenerator: {
      name: "バーコード生成器",
      description: "Code 128バーコードを生成",
    },
    passwordStrength: {
      name: "パスワード強度チェック",
      description: "パスワード強度をチェックし、改善提案を提供",
    },

    // 生成ツール
    passwordGenerator: {
      name: "パスワード生成器",
      description: "セキュアなパスワード生成、カスタマイズ可能な文字タイプ",
    },
    sqlInGenerator: {
      name: "SQL IN文生成器",
      description: "様々なフォーマットデータをSQL IN文に変換",
    },
    sqlParameterFiller: {
      name: "SQLパラメータフィラー",
      description: "パラメータ化SQL文を完全な実行可能SQLに変換",
    },
    creditCodeGenerator: {
      name: "統一社会信用コード生成器",
      description: "国標準に準拠した18桁統一社会信用コードを生成",
    },

    // 数学/単位ツール
    calculator: {
      name: "基本電卓",
      description: "四則演算、科学計算機能",
    },
    unitConverter: {
      name: "単位換算",
      description: "長さ、重量、面積、体積などの単位変換",
    },
    percentageCalc: {
      name: "パーセンテージ計算",
      description: "パーセンテージ増減、比率計算、割引計算",
    },
    triangleSolver: {
      name: "三角形ソルバー",
      description: "既知の辺角から他の辺角を求める、三角関数計算",
    },
    primeChecker: {
      name: "素数チェッカー",
      description: "素数判定、因数分解、素数生成",
    },
    quadraticSolver: {
      name: "二次方程式ソルバー",
      description: "一元二次方程式の根を求める、判別式分析",
    },
    matrixMath: {
      name: "行列演算",
      description: "行列の加減乗、逆行列、行列式計算",
    },
    currencyConverter: {
      name: "通貨換算",
      description: "主要通貨の為替レート変換、静的為替レートデータ",
    },
    romanNumeral: {
      name: "ローマ数字変換",
      description: "アラビア数字とローマ数字の相互変換",
    },
    baseConverter: {
      name: "進数変換",
      description: "2-36進数数字の相互変換、プログラマー必須",
    },
    randomNumber: {
      name: "乱数生成器",
      description: "様々なタイプの乱数、シーケンス、文字列生成",
    },

    // カラー/デザインツール
    colorPicker: {
      name: "カラーピッカー",
      description:
        "プロフェッショナルな色選択ツール、複数フォーマットをサポート",
    },
    hexRgbConverter: {
      name: "HEX↔RGBコンバーター",
      description: "カラーフォーマット変換、HSL/HSV/CMYKをサポート",
    },
    paletteGenerator: {
      name: "パレット生成器",
      description: "インテリジェントな配色方案生成、複数の調和色をサポート",
    },
    contrastChecker: {
      name: "コントラストチェッカー",
      description: "WCAG標準カラーコントラスト検出ツール",
    },
    gradientMaker: {
      name: "CSSグラデーション生成器",
      description: "視覚的CSSグラデーションコード生成器",
    },
    shadowGenerator: {
      name: "ボックスシャドウ生成器",
      description: "CSS box-shadow視覚生成",
    },
    borderRadius: {
      name: "ボーダーラディウス視覚化",
      description: "CSS border-radius視覚調整",
    },
    faviconGenerator: {
      name: "ファビコン生成器",
      description: "マルチサイズファビコンアイコン生成器",
    },
    cssClamp: {
      name: "CSS Clamp計算",
      description: "レスポンシブサイズclamp()関数生成器",
    },
    tailwindCheatsheet: {
      name: "Tailwindチートシート",
      description: "Tailwind CSSクラス名クイックルックアップ",
    },

    // 画像/マルチメディアツール
    imageCompress: {
      name: "画像圧縮器",
      description: "クライアントサイド圧縮JPG/PNG/WebP、プライバシー保護",
    },
    imageResize: {
      name: "画像サイズ調整",
      description: "等比例スケーリングまたはカスタムサイズ、品質維持",
    },
    imageConvert: {
      name: "画像フォーマット変換",
      description: "PNG↔WebP↔JPGフォーマット変換",
    },
    imageCrop: {
      name: "画像クロップツール",
      description: "精密クロップとエクスポート、複数の比率をサポート",
    },
    exifViewer: {
      name: "EXIFメタデータビューアー",
      description: "画像メタデータの表示/削除、プライバシー保護",
    },
    svgMinify: {
      name: "SVG圧縮最適化",
      description: "SVGファイルを圧縮、冗長コードを削除",
    },
    gifSplit: {
      name: "GIFフレーム分割",
      description: "アニメーションGIFを個別フレームに分割",
    },
    videoTrim: {
      name: "動画トリマー",
      description: "ブラウザサイド動画編集、アップロード不要",
    },
    audioConvert: {
      name: "音声フォーマット変換",
      description: "MP3/WAV/OGG/AACフォーマット変換",
    },
    iconSpriter: {
      name: "SVGスプライト生成器",
      description: "SVGアイコンをマージ、スプライトシートを生成",
    },

    // 日付/時間ツール
    unixTimestamp: {
      name: "Unixタイムスタンプ変換",
      description: "タイムスタンプ↔日付変換、秒/ミリ秒をサポート",
    },
    cronParser: {
      name: "Cron式パーサー",
      description: "Cron式を解析、実行時間を予測",
    },
    ageCalculator: {
      name: "年齢計算器",
      description: "正確な年齢計算、人生の時間を統計",
    },
    timeDiff: {
      name: "日付間隔計算",
      description: "2つの日付間の時間差を計算",
    },
    timezoneConvert: {
      name: "タイムゾーン変換器",
      description: "グローバルタイムゾーン時間変換ツール",
    },
    weekNumber: {
      name: "ISO週番号計算",
      description: "ISO標準週番号と年を計算",
    },
    countdownTimer: {
      name: "カウントダウンタイマー",
      description: "イベントカウントダウン、複数の表示フォーマットをサポート",
    },
    dateAdd: {
      name: "日付加減計算",
      description: "日付の加減演算、複数の時間単位をサポート",
    },
    workingDays: {
      name: "営業日計算器",
      description: "営業日を計算、祝日を除外",
    },
    calendarMaker: {
      name: "カレンダー生成器",
      description: "美しい月間カレンダーPNG画像を生成",
    },

    // Web/DevToolsツール
    jsonToTs: {
      name: "JSON→TS Interface",
      description: "JSONデータをTypeScriptインターフェース定義に変換",
    },
    httpStatus: {
      name: "HTTP Status Lookup",
      description: "HTTPステータスコードクエリと説明",
    },
    userAgent: {
      name: "User Agent Parser",
      description: "User Agent文字列を解析、ブラウザとデバイスを識別",
    },
    mimeSearch: {
      name: "MIME Type Search",
      description: "ファイル拡張子に対応するMIMEタイプを検索",
    },
    dnsLookup: {
      name: "DNS Lookup",
      description: "DNSクエリツール、複数のレコードタイプをサポート",
    },
    ipInfo: {
      name: "IP Info & Whois",
      description: "パブリックIPとWhois情報をクエリ",
    },
    jwtGenerator: {
      name: "JWT Signer (HS256)",
      description: "ローカルJWT Token生成と署名",
    },
    uuidNamespace: {
      name: "UUID v5生成器",
      description: "ネームスペースベースでUUID v5を生成",
    },
    regexCheatsheet: {
      name: "RegExチートシート",
      description: "正規表現構文リファレンスと一般的なパターン",
    },
    jsonDiff: {
      name: "JSON Diff Viewer",
      description: "JSONオブジェクト差分比較ツール",
    },

    // ランダム/生成器ツール
    loremImage: {
      name: "プレースホルダー画像生成器",
      description:
        "様々なサイズのプレースホルダー画像を生成、カスタムカラーとテキストをサポート",
    },
    fakeUser: {
      name: "フェイクユーザープロフィール",
      description: "完全なフェイクユーザー情報を生成、開発テストに適用",
    },
    randomColor: {
      name: "ランダムカラー生成器",
      description:
        "ランダムカラーを生成、複数のフォーマットとカラースキームをサポート",
    },
    nameGenerator: {
      name: "名前生成器",
      description: "様々な文化背景の名前を生成、複数のスタイルをサポート",
    },
    quoteGenerator: {
      name: "ランダム名言生成器",
      description: "励ましの名言、哲学的な文、古典的な引用を生成",
    },
    uuidBatch: {
      name: "UUIDバッチ生成器",
      description: "UUIDをバッチ生成、複数のバージョンとフォーマットをサポート",
    },
    diceRoller: {
      name: "RPGダイスシミュレーター",
      description: "様々なゲームダイスをシミュレート、複雑なダイス式をサポート",
    },
    lotteryPicker: {
      name: "抽選器ツール",
      description: "ランダム抽選、名前ランダム選択、幸運のルーレット",
    },
    storyPrompt: {
      name: "創作インスピレーション生成器",
      description:
        "クリエイティブな創作プロンプト、ストーリーの始まり、プロットアイデアを生成",
    },

    // ファイル/ドキュメントツール
    csvToJson: {
      name: "CSV → JSON",
      description: "CSVファイルをJSONフォーマットに変換",
    },
    jsonToCsv: {
      name: "JSON → CSV",
      description: "JSONデータをCSVフォーマットに変換",
    },
    markdownToc: {
      name: "MD TOC",
      description: "Markdownドキュメントの目次構造を生成",
    },
    textToPdf: {
      name: "Text → PDF",
      description: "テキストをPDFドキュメントに変換",
    },
    mergePdf: {
      name: "PDF Merger",
      description: "複数のPDFファイルを1つのドキュメントにマージ",
    },
    splitPdf: {
      name: "PDF Split",
      description: "PDFドキュメントをページごとに分割",
    },
    excelToJson: {
      name: "XLSX → JSON",
      description: "ExcelファイルをJSONフォーマットに変換",
    },
    zipExtract: {
      name: "ZIP Extract",
      description: "オンラインZIPファイル解凍",
      selectZipFile: "ZIPファイルを選択",
      dragDrop: "またはここにファイルをドラッグ",
      extractFiles: "ファイルを解凍",
      extracting: "解凍中...",
      extractionComplete: "解凍完了",
      downloadAll: "すべてダウンロード",
      fileSize: "ファイルサイズ",
      files: "ファイル",
      folder: "フォルダー",
      errorReadingFile: "ファイルの読み取りエラー",
      invalidZipFile: "無効なZIPファイル",
      noFilesExtracted: "ファイルが抽出されませんでした",
      extractTo: "解凍先",
      extractedFiles: "抽出されたファイル",
      cancel: "キャンセル",
      supportStandardZip: "標準のZIP形式ファイルをサポート",
      previewFileList: "アーカイブ内のファイルリストをプレビュー可能",
      supportDownload: "単一またはバッチファイルのダウンロードをサポート",
      localProcessing: "処理はブラウザ内でローカルで行われ、プライバシーが保護されます",
      libRequired: "申し訳ありませんが、ZIP抽出にはJSZipなどの専門ライブラリが必要です。オンラインZIP抽出ツールの使用を推奨します。"
    },
    imageToPdf: {
      name: "Img → PDF",
      description: "画像をPDFドキュメントに変換",
    },
    fileHash: {
      name: "File Checksum",
      description: "ファイルのハッシュチェックサムを計算",
    },

    // データ/可視化ツール
    csvPreview: {
      name: "CSV Viewer",
      description: "CSVファイルプレビューと分析ツール",
    },
    jsonPlot: {
      name: "JSON Plot | Chart.js",
      description: "JSONデータ可視化チャート生成",
    },
    markdownMermaid: {
      name: "Mermaid Preview",
      description: "Mermaid図表プレビューと編集",
    },
    geojsonViewer: {
      name: "GeoJSON Map",
      description: "GeoJSONマップデータビューアー",
    },
    base64Image: {
      name: "Base64 Img Preview",
      description: "Base64画像エンコードプレビューと変換",
    },
    htmlPreview: {
      name: "Live HTML | iframe",
      description: "HTMLリアルタイムプレビューとデバッグツール",
    },
    tableSorter: {
      name: "Table Sorter / Filter",
      description: "テーブルデータソートとフィルターツール",
    },
    urlParser: {
      name: "URL Inspector",
      description: "URL構造解析と分析ツール",
    },
    emailValidator: {
      name: "Email Regex Check",
      description: "メールアドレスフォーマット検証ツール",
    },
    creditCardCheck: {
      name: "Luhn Validator",
      description: "クレジットカード番号Luhnアルゴリズム検証",
    },
  },
};
