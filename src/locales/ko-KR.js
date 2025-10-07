export default {
  // 공통
  common: {
    home: "홈",
    close: "닫기",
    search: "검색",
    clear: "지우기",
    tools: "개의 도구",
    found: "찾았습니다",
    noResults: "관련 도구를 찾을 수 없습니다",
    tryOtherKeywords: "다른 키워드를 시도해보시겠습니까?",
    moreResults: "더",
    results: "개의 결과...",
    popularTools: "인기 도구",
    selectCategory: "도구 카테고리 선택",
    switchToLight: "라이트 모드로 전환",
    switchToDark: "다크 모드로 전환",
    switchLanguage: "언어 전환",
    confirm: "확인",
    confirmBtn: "확인",
    cancelBtn: "취소",
    loadExample: "예제 로드",
    enterText: "변환할 텍스트를 입력하세요...",
    // 버튼 텍스트
    copy: "복사",
    download: "다운로드",
    upload: "업로드",
    convert: "변환",
    process: "처리",
    calculate: "계산",
    selectFile: "파일 선택",
    clearAll: "모두 지우기",
    add: "추가",
    remove: "제거",
    start: "시작",
    stop: "중지",
    // 레이블 텍스트
    startDate: "시작 날짜",
    endDate: "종료 날짜",
    fileName: "파일 이름",
    fileSize: "파일 크기",
    fileType: "파일 유형",
    status: "상태",
    progress: "진행률",
    result: "결과",
    options: "옵션",
    selected: "선택됨",
    // 프롬프트 텍스트
    success: "성공",
    error: "오류",
    warning: "경고",
    info: "정보",
    loading: "로딩 중...",
    processing: "처리 중...",
    completed: "완료",
    failed: "실패",
    copied: "클립보드에 복사되었습니다",
    // 도구 인터페이스 공통
    toolDescription: "도구 설명",
    usageGuide: "사용 가이드",
    input: "입력",
    output: "출력",
    settings: "설정",
    preview: "미리보기",
    format: "포맷",
    minify: "압축"
  },

  // 앱 제목과 설명
  app: {
    title: "유니버설 스위스 아미 도구",
    subtitle: "원스톱 실용 도구 모음 | Swiss Army Tools",
    searchPlaceholder: "도구 검색... (도구 이름, 설명 검색 지원)",
    footer: "© 2025 유니버설 스위스 아미 도구 | 현대적 개발, 더 효율적인 작업",
    poweredBy: "Powered by Vue 3 + Vite",
  },

  // 도구 카테고리
  categories: {
    text: {
      name: "텍스트 도구",
      description: "텍스트 처리, 포맷팅, 통계 분석 등",
    },
    converter: {
      name: "변환 도구",
      description: "다양한 형식 변환 도구",
    },
    crypto: {
      name: "인코딩/암호화",
      description: "인코딩 변환, 해시 암호화, JWT 파싱 등의 보안 도구",
    },
    generator: {
      name: "생성 도구",
      description: "비밀번호 생성 등의 실용적인 생성기",
    },
    math: {
      name: "수학/단위",
      description: "수학 계산, 단위 변환, 숫자 처리 등의 전문 도구",
    },
    design: {
      name: "색상/디자인",
      description: "색상 선택, CSS 생성, 디자인 지원 도구",
    },
    media: {
      name: "이미지/멀티미디어",
      description: "이미지, 오디오/비디오 처리, 형식 변환, 최적화 압축",
    },
    datetime: {
      name: "날짜/시간",
      description: "타임스탬프 변환, 날짜 계산, 시간대 변환 등",
    },
    webdev: {
      name: "Web / DevTools",
      description:
        "웹 개발 도구, API 테스트, 데이터 변환 등의 개발자 필수 도구",
    },
    random: {
      name: "랜덤 / 생성기",
      description:
        "랜덤 데이터 생성, 플레이스홀더 콘텐츠, 이름 생성 등의 창의적 도구",
    },
    files: {
      name: "파일 / 문서",
      description: "파일 형식 변환, 문서 처리, 압축/해제 도구",
    },
    dataViz: {
      name: "데이터 / 시각화",
      description: "데이터 분석, 차트 생성, 형식 미리보기 등의 시각화 도구",
    },
  },

  // 도구 이름과 설명
  tools: {
    // 일반적으로 사용되는 도구의 kebab-case 별칭 - 구성 요소 ID와 일치
    'json-processor': {
      name: "JSON 프로세서",
      description: "JSON 서식 지정, 압축, 유효성 검사 등",
    },
    'password-generator': {
      name: "비밀번호 생성기",
      description: "사용자 정의 길이와 문자 세트로 강력한 비밀번호 생성",
    },
    'qr-generator': {
      name: "QR 코드 생성기",
      description: "여러 형식으로 맞춤형 QR 코드 생성",
    },
    'base64-converter': {
      name: "Base64 변환기",
      description: "Base64 인코딩/디코딩, 이미지 변환 지원",
    },
    'color-picker': {
      name: "색상 선택기",
      description: "색상 선택, 색상 코드 가져오기, 색상 비교",
    },
    'unix-timestamp': {
      name: "Unix 타임스탬프",
      description: "Unix 타임스탬프와 날짜 형식 간 변환",
    },
    'calculator': {
      name: "기본 계산기",
      description: "단순한 수학적 계산",
    },
    // 텍스트 도구
    textFormatter: {
      name: "텍스트 포맷터",
      description: "대소문자 변환, 제목 형식, 텍스트 반전 등",
    },
    textStats: {
      name: "텍스트 통계",
      description: "문자 수, 단어 수, 줄 수 통계 분석",
    },
    jsonProcessor: {
      name: "JSON 프로세서",
      description: "JSON 포맷팅, 압축, 검증 등",
    },
    slugGenerator: {
      name: "Slug Generator",
      description: "URL-slug 생성, 여러 명명 형식 지원",
    },
    loremIpsum: {
      name: "Lorem Ipsum",
      description: "더미 텍스트 생성기, 중국어와 영어 플레이스홀더 텍스트 지원",
    },
    markdownPreview: {
      name: "Markdown Preview",
      description: "MD→HTML 실시간 미리보기 변환",
    },
    yamlToJson: {
      name: "YAML→JSON",
      description: "YAML과 JSON 형식 변환 도구",
    },
    htmlToText: {
      name: "HTML Stripper",
      description: "HTML에서 일반 텍스트 콘텐츠 추출",
    },
    regexTester: {
      name: "RegEx Tester",
      description: "정규식 실시간 매칭 테스트",
    },
    diffViewer: {
      name: "Text Diff",
      description: "텍스트 차이 비교 도구",
    },

    // 변환 도구
    colorConverter: {
      name: "색상 변환기",
      description: "HEX, RGB, HSL 색상 형식 변환",
    },
    timestampConverter: {
      name: "타임스탬프 변환 도구",
      description: "Unix 타임스탬프, ISO 문자열, 로컬 시간 등의 형식 변환",
    },
    wordToHtml: {
      name: "Word to HTML 도구",
      description: "Word 문서(.docx)를 HTML 형식으로 변환",
    },
    markdownToImage: {
      name: "Markdown to Image 도구",
      description: "Markdown 텍스트를 PNG/JPG 이미지로 렌더링",
    },
    sqlConverter: {
      name: "SQL 변환기",
      description: "다중 데이터베이스 SQL 구문 변환, 포맷팅 및 최적화",
    },

    // 인코딩/암호화 도구
    base64Converter: {
      name: "Base64 인코더",
      description: "Base64 인코딩/디코딩 변환",
    },
    urlConverter: {
      name: "URL 인코더",
      description: "URL 인코딩/디코딩 변환",
    },
    jwtDecoder: {
      name: "JWT 파서",
      description: "JWT Token 파싱, Header와 Payload 보기",
    },
    md5Hash: {
      name: "MD5 해시",
      description: "텍스트의 MD5 해시 값 계산",
    },
    sha256Hash: {
      name: "SHA-256 해시",
      description: "텍스트의 SHA-256 해시 값 계산",
    },
    uuidGenerator: {
      name: "UUID 생성기",
      description: "UUID v4 고유 식별자 생성",
    },
    bcryptHash: {
      name: "Bcrypt 해시",
      description: "Bcrypt 비밀번호 해시 생성 및 검증",
    },
    qrGenerator: {
      name: "QR 코드 생성기",
      description: "텍스트를 QR 코드로 변환, 여러 형식 지원",
    },
    barcodeGenerator: {
      name: "바코드 생성기",
      description: "Code 128 바코드 생성",
    },
    passwordStrength: {
      name: "비밀번호 강도 검사",
      description: "비밀번호 강도 검사 및 개선 제안 제공",
    },

    // 생성 도구
    passwordGenerator: {
      name: "비밀번호 생성기",
      description: "보안 비밀번호 생성, 사용자 정의 문자 유형",
    },
    sqlInGenerator: {
      name: "SQL IN 문 생성기",
      description: "다양한 형식 데이터를 SQL IN 문으로 변환",
    },
    sqlParameterFiller: {
      name: "SQL 매개변수 채우기",
      description: "매개변수화된 SQL 문을 완전한 실행 가능한 SQL로 변환",
    },
    creditCodeGenerator: {
      name: "통합 사회 신용 코드 생성기",
      description: "국가 표준에 부합하는 18자리 통합 사회 신용 코드 생성",
    },

    // 수학/단위 도구
    calculator: {
      name: "기본 계산기",
      description: "사칙연산, 과학 계산 기능",
    },
    unitConverter: {
      name: "단위 변환기",
      description: "길이, 무게, 면적, 부피 등의 단위 변환",
    },
    percentageCalc: {
      name: "백분율 계산기",
      description: "백분율 증감, 비율 계산, 할인 계산",
    },
    triangleSolver: {
      name: "삼각형 솔버",
      description: "알려진 변과 각에서 다른 변과 각 구하기, 삼각함수 계산",
    },
    primeChecker: {
      name: "소수 검사기",
      description: "소수 판정, 인수분해, 소수 생성",
    },
    quadraticSolver: {
      name: "이차방정식 솔버",
      description: "일원이차방정식 근 구하기, 판별식 분석",
    },
    matrixMath: {
      name: "행렬 연산",
      description: "행렬 덧셈, 뺄셈, 곱셈, 역행렬, 행렬식 계산",
    },
    currencyConverter: {
      name: "환율 변환기",
      description: "주요 통화 환율 변환, 정적 환율 데이터",
    },
    romanNumeral: {
      name: "로마 숫자 변환기",
      description: "아라비아 숫자와 로마 숫자 상호 변환",
    },
    baseConverter: {
      name: "진법 변환기",
      description: "2-36진법 숫자 상호 변환, 프로그래머 필수",
    },
    randomNumber: {
      name: "난수 생성기",
      description: "다양한 유형의 난수, 시퀀스, 문자열 생성",
    },

    // 색상/디자인 도구
    colorPicker: {
      name: "색상 선택기",
      description: "전문 색상 선택 도구, 여러 형식 지원",
    },
    hexRgbConverter: {
      name: "HEX↔RGB 변환기",
      description: "색상 형식 변환, HSL/HSV/CMYK 지원",
    },
    paletteGenerator: {
      name: "팔레트 생성기",
      description: "지능형 색상 조합 생성, 여러 조화 색상 지원",
    },
    contrastChecker: {
      name: "대비 검사기",
      description: "WCAG 표준 색상 대비 검출 도구",
    },
    gradientMaker: {
      name: "CSS 그라데이션 생성기",
      description: "시각적 CSS 그라데이션 코드 생성기",
    },
    shadowGenerator: {
      name: "박스 섀도우 생성기",
      description: "CSS box-shadow 시각적 생성",
    },
    borderRadius: {
      name: "보더 반지름 시각화",
      description: "CSS border-radius 시각적 조정",
    },
    faviconGenerator: {
      name: "파비콘 생성기",
      description: "다중 크기 파비콘 아이콘 생성기",
    },
    cssClamp: {
      name: "CSS Clamp 계산기",
      description: "반응형 크기 clamp() 함수 생성기",
    },
    tailwindCheatsheet: {
      name: "Tailwind 치트시트",
      description: "Tailwind CSS 클래스명 빠른 조회",
    },

    // 이미지/멀티미디어 도구
    imageCompress: {
      name: "이미지 압축기",
      description: "클라이언트 사이드 압축 JPG/PNG/WebP, 개인정보 보호",
    },
    imageResize: {
      name: "이미지 크기 조정",
      description: "비례 스케일링 또는 사용자 정의 크기, 품질 유지",
    },
    imageConvert: {
      name: "이미지 형식 변환기",
      description: "PNG↔WebP↔JPG 형식 변환",
    },
    imageCrop: {
      name: "이미지 크롭 도구",
      description: "정밀 크롭 및 내보내기, 여러 비율 지원",
    },
    exifViewer: {
      name: "EXIF 메타데이터 뷰어",
      description: "이미지 메타데이터 보기/제거, 개인정보 보호",
    },
    svgMinify: {
      name: "SVG 압축 최적화",
      description: "SVG 파일 압축, 중복 코드 제거",
    },
    gifSplit: {
      name: "GIF 프레임 분할",
      description: "애니메이션 GIF를 개별 프레임으로 분할",
    },
    videoTrim: {
      name: "비디오 트리머",
      description: "브라우저 사이드 비디오 편집, 업로드 불필요",
    },
    audioConvert: {
      name: "오디오 형식 변환기",
      description: "MP3/WAV/OGG/AAC 형식 변환",
    },
    iconSpriter: {
      name: "SVG 스프라이트 생성기",
      description: "SVG 아이콘 병합, 스프라이트 시트 생성",
    },

    // 날짜/시간 도구
    unixTimestamp: {
      name: "Unix 타임스탬프 변환기",
      description: "타임스탬프↔날짜 변환, 초/밀리초 지원",
    },
    cronParser: {
      name: "Cron 표현식 파서",
      description: "Cron 표현식 파싱, 실행 시간 예측",
    },
    ageCalculator: {
      name: "나이 계산기",
      description: "정확한 나이 계산, 인생 시간 통계",
    },
    timeDiff: {
      name: "날짜 간격 계산",
      description: "두 날짜 간의 시간 차이 계산",
    },
    timezoneConvert: {
      name: "시간대 변환기",
      description: "글로벌 시간대 시간 변환 도구",
    },
    weekNumber: {
      name: "ISO 주 번호 계산기",
      description: "ISO 표준 주 번호와 연도 계산",
    },
    countdownTimer: {
      name: "카운트다운 타이머",
      description: "이벤트 카운트다운, 여러 표시 형식 지원",
    },
    dateAdd: {
      name: "날짜 가감 계산",
      description: "날짜의 가감 연산, 여러 시간 단위 지원",
    },
    workingDays: {
      name: "근무일 계산기",
      description: "근무일 계산, 공휴일 제외",
    },
    calendarMaker: {
      name: "달력 생성기",
      description: "아름다운 월간 달력 PNG 이미지 생성",
    },

    // Web/DevTools 도구
    jsonToTs: {
      name: "JSON→TS Interface",
      description: "JSON 데이터를 TypeScript 인터페이스 정의로 변환",
    },
    httpStatus: {
      name: "HTTP Status Lookup",
      description: "HTTP 상태 코드 쿼리 및 설명",
    },
    userAgent: {
      name: "User Agent Parser",
      description: "User Agent 문자열 파싱, 브라우저와 디바이스 식별",
    },
    mimeSearch: {
      name: "MIME Type Search",
      description: "파일 확장자에 해당하는 MIME 타입 검색",
    },
    dnsLookup: {
      name: "DNS Lookup",
      description: "DNS 쿼리 도구, 여러 레코드 타입 지원",
    },
    ipInfo: {
      name: "IP Info & Whois",
      description: "공용 IP와 Whois 정보 쿼리",
    },
    jwtGenerator: {
      name: "JWT Signer (HS256)",
      description: "로컬 JWT Token 생성 및 서명",
    },
    uuidNamespace: {
      name: "UUID v5 생성기",
      description: "네임스페이스 기반으로 UUID v5 생성",
    },
    regexCheatsheet: {
      name: "RegEx 치트시트",
      description: "정규식 구문 참조 및 일반적인 패턴",
    },
    jsonDiff: {
      name: "JSON Diff Viewer",
      description: "JSON 객체 차이 비교 도구",
    },

    // 랜덤/생성기 도구
    loremImage: {
      name: "플레이스홀더 이미지 생성기",
      description:
        "다양한 크기의 플레이스홀더 이미지 생성, 사용자 정의 색상과 텍스트 지원",
    },
    fakeUser: {
      name: "가짜 사용자 프로필",
      description: "완전한 가짜 사용자 정보 생성, 개발 테스트에 적합",
    },
    randomColor: {
      name: "랜덤 색상 생성기",
      description: "랜덤 색상 생성, 여러 형식과 색상 스키마 지원",
    },
    nameGenerator: {
      name: "이름 생성기",
      description: "다양한 문화적 배경의 이름 생성, 여러 스타일 지원",
    },
    quoteGenerator: {
      name: "랜덤 명언 생성기",
      description: "격려 명언, 철학적 문장, 고전 인용구 생성",
    },
    uuidBatch: {
      name: "UUID 배치 생성기",
      description: "UUID 배치 생성, 여러 버전과 형식 지원",
    },
    diceRoller: {
      name: "RPG 주사위 시뮬레이터",
      description: "다양한 게임 주사위 시뮬레이션, 복잡한 주사위 표현식 지원",
    },
    lotteryPicker: {
      name: "추첨기 도구",
      description: "랜덤 추첨, 이름 랜덤 선택, 행운의 룰렛",
    },
    storyPrompt: {
      name: "창작 영감 생성기",
      description: "창의적 창작 프롬프트, 스토리 시작, 플롯 아이디어 생성",
    },

    // 파일/문서 도구
    csvToJson: {
      name: "CSV → JSON",
      description: "CSV 파일을 JSON 형식으로 변환",
    },
    jsonToCsv: {
      name: "JSON → CSV",
      description: "JSON 데이터를 CSV 형식으로 변환",
    },
    markdownToc: {
      name: "MD TOC",
      description: "Markdown 문서 목차 구조 생성",
    },
    textToPdf: {
      name: "Text → PDF",
      description: "텍스트를 PDF 문서로 변환",
    },
    mergePdf: {
      name: "PDF Merger",
      description: "여러 PDF 파일을 하나의 문서로 병합",
    },
    splitPdf: {
      name: "PDF Split",
      description: "PDF 문서를 페이지별로 분할",
    },
    excelToJson: {
      name: "XLSX → JSON",
      description: "Excel 파일을 JSON 형식으로 변환",
    },
    zipExtract: {
      name: "ZIP Extract",
      description: "온라인 ZIP 파일 압축 해제",
      selectZipFile: "ZIP 파일 선택",
      dragDrop: "또는 여기에 파일을 드래그",
      extractFiles: "파일 압축 해제",
      extracting: "압축 해제 중...",
      extractionComplete: "압축 해제 완료",
      downloadAll: "모두 다운로드",
      fileSize: "파일 크기",
      files: "파일",
      folder: "폴더",
      errorReadingFile: "파일 읽기 오류",
      invalidZipFile: "유효하지 않은 ZIP 파일",
      noFilesExtracted: "추출된 파일이 없습니다",
      extractTo: "압축 해제 위치",
      extractedFiles: "추출된 파일",
      cancel: "취소",
      supportStandardZip: "표준 ZIP 형식 파일을 지원합니다",
      previewFileList: "아카이브 내의 파일 목록을 미리 볼 수 있습니다",
      supportDownload: "단일 또는 일괄 파일 다운로드를 지원합니다",
      localProcessing: "처리는 브라우저에서 로컬로 수행되며 개인 정보가 보호됩니다",
      libRequired: "죄송합니다. ZIP 압축 해제에는 JSZip과 같은 전문 라이브러리가 필요합니다. 온라인 ZIP 압축 해제 도구를 사용하는 것이 좋습니다."
    },
    imageToPdf: {
      name: "Img → PDF",
      description: "이미지를 PDF 문서로 변환",
    },
    fileHash: {
      name: "File Checksum",
      description: "파일의 해시 체크섬 계산",
    },

    // 데이터/시각화 도구
    csvPreview: {
      name: "CSV Viewer",
      description: "CSV 파일 미리보기 및 분석 도구",
    },
    jsonPlot: {
      name: "JSON Plot | Chart.js",
      description: "JSON 데이터 시각화 차트 생성",
    },
    markdownMermaid: {
      name: "Mermaid Preview",
      description: "Mermaid 다이어그램 미리보기 및 편집",
    },
    geojsonViewer: {
      name: "GeoJSON Map",
      description: "GeoJSON 맵 데이터 뷰어",
    },
    base64Image: {
      name: "Base64 Img Preview",
      description: "Base64 이미지 인코딩 미리보기 및 변환",
    },
    htmlPreview: {
      name: "Live HTML | iframe",
      description: "HTML 실시간 미리보기 및 디버깅 도구",
    },
    tableSorter: {
      name: "Table Sorter / Filter",
      description: "테이블 데이터 정렬 및 필터링 도구",
    },
    urlParser: {
      name: "URL Inspector",
      description: "URL 구조 파싱 및 분석 도구",
    },
    emailValidator: {
      name: "Email Regex Check",
      description: "이메일 주소 형식 검증 도구",
    },
    creditCardCheck: {
      name: "Luhn Validator",
      description: "신용카드 번호 Luhn 알고리즘 검증",
    },
  },
};

