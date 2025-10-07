export default {
  common: {
    appName: "Cursor Translate",
    description: "AIパワード翻訳ツール",
    searchPlaceholder: "翻訳するテキストを入力",
    selectSourceLanguage: "原文の言語",
    selectTargetLanguage: "訳文の言語",
    autoDetect: "自動検出",
    translate: "翻訳",
    clear: "消去",
    copy: "コピー",
    copied: "コピー済み",
    sourceText: "原文",
    targetText: "訳文",
    swapLanguages: "言語を入れ替え",
    history: "履歴",
    favorites: "お気に入り",
    settings: "設定",
    about: "約",
    help: "ヘルプ",
    darkMode: "ダークモード",
    lightMode: "ライトモード",
    systemTheme: "システムテーマ",
    fontFamily: "フォント",
    fontSize: "フォントサイズ",
    themeColor: "テーマカラー",
    apiKey: "APIキー",
    save: "保存",
    cancel: "キャンセル",
    delete: "削除",
    confirm: "確認",
    yes: "はい",
    no: "いいえ",
    error: "エラー",
    success: "成功",
    warning: "警告",
    info: "情報",
    loading: "読み込み中",
    networkError: "ネットワークエラー",
    apiKeyError: "APIキーが正しくありません",
    serverError: "サーバーエラー",
    rateLimitError: "リクエスト制限に達しました",
    noHistory: "履歴がありません",
    noFavorites: "お気に入りがありません",
    welcome: "ようこそ！",
    welcomeMessage: "AIパワードの翻訳ツールを使って、世界中の言語を自由に翻訳しましょう。",
    features: "機能",
    popularLanguages: "人気の言語",
    recentTranslations: "最近の翻訳",
    share: "共有",
    export: "エクスポート",
    import: "インポート",
    contact: "お問い合わせ",
    privacyPolicy: "プライバシーポリシー",
    termsOfService: "利用規約",
    feedback: "フィードバック",
    reportIssue: "問題を報告",
    version: "バージョン",
    updateAvailable: "アップデートが利用可能です",
    installUpdate: "アップデートをインストール",
    skip: "スキップ",
    later: "後で",
    ok: "OK",
    retry: "再試行",
    languageDetected: "言語が検出されました",
    selectAll: "すべて選択",
    deselectAll: "選択解除",
    batchTranslate: "一括翻訳",
    characterCount: "文字数",
    wordCount: "単語数",
    lineCount: "行数",
    preview: "プレビュー",
    apply: "適用",
    custom: "カスタム",
    default: "デフォルト",
    maximum: "最大",
    minimum: "最小",
    reset: "リセット",
    backup: "バックアップ",
    restore: "復元",
    backupCreated: "バックアップが作成されました",
    backupRestored: "バックアップが復元されました",
  },
  app: {
    title: "Cursor Translate",
    description: "AIパワード翻訳ツール",
    header: {
      logo: "Cursor Translate",
      nav: {
        home: "ホーム",
        tools: "ツール",
        settings: "設定",
        about: "約",
      },
    },
    footer: {
      copyright: "© 2023 Cursor Translate. All rights reserved.",
      links: {
        privacy: "プライバシーポリシー",
        terms: "利用規約",
        contact: "お問い合わせ",
      },
    },
    notFound: {
      title: "ページが見つかりません",
      message: "アクセスしようとしたページは存在しません。",
      backToHome: "ホームに戻る",
    },
    maintenance: {
      title: "メンテナンス中",
      message: "サービスの改善のため、一時的にメンテナンスを行っています。しばらくしてから再度アクセスしてください。",
    },
    offline: {
      title: "オフライン",
      message: "インターネット接続がありません。接続を確認してください。",
      retry: "再試行",
    },
  },
  categories: {
    text: {
      name: "テキストツール",
      description: "テキストの整形、分析、変換",
    },
    converter: {
      name: "変換ツール",
      description: "各種形式の相互変換",
    },
    math: {
      name: "数学/単位ツール",
      description: "計算、単位換算、数学的操作",
    },
    color: {
      name: "カラー/デザインツール",
      description: "カラー選択、変換、デザイン支援",
    },
    image: {
      name: "画像/マルチメディアツール",
      description: "画像処理、動画編集、メディア変換",
    },
    date: {
      name: "日付/時間ツール",
      description: "日付計算、タイムゾーン変換",
    },
    web: {
      name: "Web/DevToolsツール",
      description: "Web開発、APIテスト、デバッグ",
    },
    random: {
      name: "ランダム/生成器ツール",
      description: "ランダムデータ生成、シミュレーション",
    },
    file: {
      name: "ファイル/ドキュメントツール",
      description: "ファイル処理、PDF操作、文書変換",
    },
    "data-viz": {
      name: "データ/可視化ツール",
      description: "データ分析、可視化、チャート生成",
    },
    security: {
      name: "セキュリティ/暗号化ツール",
      description: "パスワード生成、暗号化、検証",
    },
    misc: {
      name: "その他のツール",
      description: "その他の便利なツール",
    },
  },
  tools: {
    "json-processor": {
      name: "JSON処理",
      description: "JSONの整形、検証、フォーマット",
    },
    "password-generator": {
      name: "パスワード生成器",
      description: "強力なランダムパスワードを生成",
    },
    "qr-code-generator": {
      name: "QRコード生成器",
      description: "URL、テキスト、連絡先からQRコードを生成",
    },
    "base64-encoder": {
      name: "Base64エンコーダー",
      description: "テキストをBase64にエンコード/デコード",
    },
    "url-encoder": {
      name: "URLエンコーダー",
      description: "URLエンコード/デコード、パーセントエンコーディング",
    },
    "html-encoder": {
      name: "HTMLエンコーダー",
      description: "HTML特殊文字のエンコード/デコード",
    },
    "escape-unescape": {
      name: "エスケープ/アンエスケープ",
      description: "特殊文字のエスケープとアンエスケープ",
    },
    "text-formatter": {
      name: "テキストフォーマッター",
      description: "テキストの整形、大文字小文字変換、空白処理",
    },
    "text-stats": {
      name: "テキスト統計",
      description: "文字数、単語数、行数、リーディングタイムの分析",
    },
    "slug-generator": {
      name: "スラッグ生成器",
      description: "SEOフレンドリーなURLスラッグを生成",
    },
    "lorem-ipsum": {
      name: "ロレム・イプサム生成器",
      description: "ダミーテキストを生成、複数の形式をサポート",
    },
    "markdown-preview": {
      name: "Markdownプレビュー",
      description: "リアルタイムMarkdownプレビューとエディター",
    },
    "yaml-to-json": {
      name: "YAML → JSON",
      description: "YAML形式をJSON形式に変換",
    },
    "html-to-text": {
      name: "HTML → テキスト",
      description: "HTMLコンテンツをプレーンテキストに変換",
    },
    "regex-tester": {
      name: "正規表現テスター",
      description: "正規表現のテスト、検証、デバッグ",
    },
    "diff-viewer": {
      name: "差分表示ツール",
      description: "テキストの差分を視覚的に比較",
    },

    // 数学/単位ツール
    calculator: {
      name: "基本電卓",
      description: "四則演算、科学計算機能",
    },
    "unit-converter": {
      name: "単位換算",
      description: "長さ、重量、面積、体積などの単位変換",
    },
    "percentage-calc": {
      name: "パーセンテージ計算",
      description: "パーセンテージ増減、比率計算、割引計算",
    },
    "triangle-solver": {
      name: "三角形ソルバー",
      description: "既知の辺角から他の辺角を求める、三角関数計算",
    },
    "prime-checker": {
      name: "素数チェッカー",
      description: "素数判定、因数分解、素数生成",
    },
    "quadratic-solver": {
      name: "二次方程式ソルバー",
      description: "一元二次方程式の根を求める、判別式分析",
    },
    "matrix-math": {
      name: "行列演算",
      description: "行列の加減乗、逆行列、行列式計算",
    },
    "currency-converter": {
      name: "通貨換算",
      description: "主要通貨の為替レート変換、静的為替レートデータ",
    },
    "roman-numeral": {
      name: "ローマ数字変換",
      description: "アラビア数字とローマ数字の相互変換",
    },
    "base-converter": {
      name: "進数変換",
      description: "2-36進数数字の相互変換、プログラマー必須",
    },
    "random-number": {
      name: "乱数生成器",
      description: "様々なタイプの乱数、シーケンス、文字列生成",
    },

    // カラー/デザインツール
    "color-picker": {
      name: "カラーピッカー",
      description: 
        "プロフェッショナルな色選択ツール、複数フォーマットをサポート",
    },
    "hex-rgb-converter": {
      name: "HEX↔RGBコンバーター",
      description: "カラーフォーマット変換、HSL/HSV/CMYKをサポート",
    },
    "palette-generator": {
      name: "パレット生成器",
      description: "インテリジェントな配色方案生成、複数の調和色をサポート",
    },
    "contrast-checker": {
      name: "コントラストチェッカー",
      description: "WCAG標準カラーコントラスト検出ツール",
    },
    "gradient-maker": {
      name: "CSSグラデーション生成器",
      description: "視覚的CSSグラデーションコード生成器",
    },
    "shadow-generator": {
      name: "ボックスシャドウ生成器",
      description: "CSS box-shadow視覚生成",
    },
    "border-radius": {
      name: "ボーダーラディウス視覚化",
      description: "CSS border-radius視覚調整",
    },
    "favicon-generator": {
      name: "ファビコン生成器",
      description: "マルチサイズファビコンアイコン生成器",
    },
    "css-clamp": {
      name: "CSS Clamp計算",
      description: "レスポンシブサイズclamp()関数生成器",
    },
    "tailwind-cheatsheet": {
      name: "Tailwindチートシート",
      description: "Tailwind CSSクラス名クイックルックアップ",
    },

    // 画像/マルチメディアツール
    "image-compress": {
      name: "画像圧縮器",
      description: "クライアントサイド圧縮JPG/PNG/WebP、プライバシー保護",
    },
    "image-resize": {
      name: "画像サイズ調整",
      description: "等比例スケーリングまたはカスタムサイズ、品質維持",
    },
    "image-convert": {
      name: "画像フォーマット変換",
      description: "PNG↔WebP↔JPGフォーマット変換",
    },
    "image-crop": {
      name: "画像クロップツール",
      description: "精密クロップとエクスポート、複数の比率をサポート",
    },
    "exif-viewer": {
      name: "EXIFメタデータビューアー",
      description: "画像メタデータの表示/削除、プライバシー保護",
    },
    "svg-minify": {
      name: "SVG圧縮最適化",
      description: "SVGファイルを圧縮、冗長コードを削除",
    },
    "gif-split": {
      name: "GIFフレーム分割",
      description: "アニメーションGIFを個別フレームに分割",
    },
    "video-trim": {
      name: "動画トリマー",
      description: "ブラウザサイド動画編集、アップロード不要",
    },
    "audio-convert": {
      name: "音声フォーマット変換",
      description: "MP3/WAV/OGG/AACフォーマット変換",
    },
    "icon-spriter": {
      name: "SVGスプライト生成器",
      description: "SVGアイコンをマージ、スプライトシートを生成",
    },

    // 日付/時間ツール
    "unix-timestamp": {
      name: "Unixタイムスタンプ変換",
      description: "タイムスタンプ↔日付変換、秒/ミリ秒をサポート",
    },
    "cron-parser": {
      name: "Cron式パーサー",
      description: "Cron式を解析、実行時間を予測",
    },
    "age-calculator": {
      name: "年齢計算器",
      description: "正確な年齢計算、人生の時間を統計",
    },
    "time-diff": {
      name: "日付間隔計算",
      description: "2つの日付間の時間差を計算",
    },
    "timezone-convert": {
      name: "タイムゾーン変換器",
      description: "グローバルタイムゾーン時間変換ツール",
    },
    "week-number": {
      name: "ISO週番号計算",
      description: "ISO標準週番号と年を計算",
    },
    "countdown-timer": {
      name: "カウントダウンタイマー",
      description: "イベントカウントダウン、複数の表示フォーマットをサポート",
    },
    "date-add": {
      name: "日付加減計算",
      description: "日付の加減演算、複数の時間単位をサポート",
    },
    "working-days": {
      name: "営業日計算器",
      description: "営業日を計算、祝日を除外",
    },
    "calendar-maker": {
      name: "カレンダー生成器",
      description: "美しい月間カレンダーPNG画像を生成",
    },

    // Web/DevToolsツール
    "json-to-ts": {
      name: "JSON→TS Interface",
      description: "JSONデータをTypeScriptインターフェース定義に変換",
    },
    "http-status": {
      name: "HTTP Status Lookup",
      description: "HTTPステータスコードクエリと説明",
    },
    "user-agent": {
      name: "User Agent Parser",
      description: "User Agent文字列を解析、ブラウザとデバイスを識別",
    },
    "mime-search": {
      name: "MIME Type Search",
      description: "ファイル拡張子に対応するMIMEタイプを検索",
    },
    "dns-lookup": {
      name: "DNS Lookup",
      description: "DNSクエリツール、複数のレコードタイプをサポート",
    },
    "ip-info": {
      name: "IP Info & Whois",
      description: "パブリックIPとWhois情報をクエリ",
    },
    "jwt-generator": {
      name: "JWT Signer (HS256)",
      description: "ローカルJWT Token生成と署名",
    },
    "uuid-namespace": {
      name: "UUID v5生成器",
      description: "ネームスペースベースでUUID v5を生成",
    },
    "regex-cheatsheet": {
      name: "RegExチートシート",
      description: "正規表現構文リファレンスと一般的なパターン",
    },
    "json-diff": {
      name: "JSON Diff Viewer",
      description: "JSONオブジェクト差分比較ツール",
    },

    // ランダム/生成器ツール
    "lorem-image": {
      name: "プレースホルダー画像生成器",
      description: 
        "様々なサイズのプレースホルダー画像を生成、カスタムカラーとテキストをサポート",
    },
    "fake-user": {
      name: "フェイクユーザープロフィール",
      description: "完全なフェイクユーザー情報を生成、開発テストに適用",
    },
    "random-color": {
      name: "ランダムカラー生成器",
      description: 
        "ランダムカラーを生成、複数のフォーマットとカラースキームをサポート",
    },
    "name-generator": {
      name: "名前生成器",
      description: "様々な文化背景の名前を生成、複数のスタイルをサポート",
    },
    "quote-generator": {
      name: "ランダム名言生成器",
      description: "励ましの名言、哲学的な文、古典的な引用を生成",
    },
    "uuid-batch": {
      name: "UUIDバッチ生成器",
      description: "UUIDをバッチ生成、複数のバージョンとフォーマットをサポート",
    },
    "dice-roller": {
      name: "RPGダイスシミュレーター",
      description: "様々なゲームダイスをシミュレート、複雑なダイス式をサポート",
    },
    "lottery-picker": {
      name: "抽選器ツール",
      description: "ランダム抽選、名前ランダム選択、幸運のルーレット",
    },
    "story-prompt": {
      name: "創作インスピレーション生成器",
      description: 
        "クリエイティブな創作プロンプト、ストーリーの始まり、プロットアイデアを生成",
    },

    // ファイル/ドキュメントツール
    "csv-to-json": {
      name: "CSV → JSON",
      description: "CSVファイルをJSONフォーマットに変換",
    },
    "json-to-csv": {
      name: "JSON → CSV",
      description: "JSONデータをCSVフォーマットに変換",
    },
    "markdown-toc": {
      name: "MD TOC",
      description: "Markdownドキュメントの目次構造を生成",
    },
    "text-to-pdf": {
      name: "Text → PDF",
      description: "テキストをPDFドキュメントに変換",
    },
    "merge-pdf": {
      name: "PDF Merger",
      description: "複数のPDFファイルを1つのドキュメントにマージ",
    },
    "split-pdf": {
      name: "PDF Split",
      description: "PDFドキュメントをページごとに分割",
    },
    "excel-to-json": {
      name: "XLSX → JSON",
      description: "ExcelファイルをJSONフォーマットに変換",
    },
    "zip-extract": {
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
    "image-to-pdf": {
      name: "Img → PDF",
      description: "画像をPDFドキュメントに変換",
    },
    "file-hash": {
      name: "File Checksum",
      description: "ファイルのハッシュチェックサムを計算",
    },

    // データ/可視化ツール
    "csv-preview": {
      name: "CSV Viewer",
      description: "CSVファイルプレビューと分析ツール",
    },
    "json-plot": {
      name: "JSON Plot | Chart.js",
      description: "JSONデータ可視化チャート生成",
    },
    "markdown-mermaid": {
      name: "Mermaid Preview",
      description: "Mermaid図表プレビューと編集",
    },
    "geojson-viewer": {
      name: "GeoJSON Map",
      description: "GeoJSONマップデータビューアー",
    },
    "base64-image": {
      name: "Base64 Img Preview",
      description: "Base64画像エンコードプレビューと変換",
    },
    "html-preview": {
      name: "Live HTML | iframe",
      description: "HTMLリアルタイムプレビューとデバッグツール",
    },
    "table-sorter": {
      name: "Table Sorter / Filter",
      description: "テーブルデータソートとフィルターツール",
    },
    "url-parser": {
      name: "URL Inspector",
      description: "URL構造解析と分析ツール",
    },
    "email-validator": {
      name: "Email Regex Check",
      description: "メールアドレスフォーマット検証ツール",
    },
    "credit-card-check": {
      name: "Luhn Validator",
      description: "クレジットカード番号Luhnアルゴリズム検証",
    },
  },
};