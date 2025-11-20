<template>
  <div class="mime-search-tool">
    <div class="tool-header">
      <h2><i class="fas fa-file-alt"></i> {{ $t('tools.mimeSearch.ui.title') }}</h2>
      <p>{{ $t('tools.mimeSearch.ui.description') }}</p>
    </div>

    <div class="search-section">
      <div class="search-mode">
        <label class="radio-group">
          <input type="radio" v-model="searchMode" value="extension" />
          <span>{{ $t('tools.mimeSearch.ui.searchByExtension') }}</span>
        </label>
        <label class="radio-group">
          <input type="radio" v-model="searchMode" value="mime" />
          <span>{{ $t('tools.mimeSearch.ui.searchByMime') }}</span>
        </label>
      </div>
      
      <div class="input-section">
        <div class="input-group">
          <input 
            v-model="searchQuery"
            :placeholder="searchMode === 'extension' ? $t('tools.mimeSearch.ui.extensionPlaceholder') : $t('tools.mimeSearch.ui.mimePlaceholder')"
            @input="performSearch"
            class="search-input"
          />
          <button @click="clearSearch" class="clear-btn" v-if="searchQuery">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="results-section" v-if="searchResults.length > 0">
      <h3>{{ $t('tools.mimeSearch.ui.searchResults') }} ({{ searchResults.length }})</h3>
      <div class="results-grid">
        <div 
          v-for="result in searchResults" 
          :key="result.extension + result.mime"
          class="result-card"
        >
          <div class="result-header">
            <span class="extension">.{{ result.extension }}</span>
            <button @click="copyToClipboard(result.mime)" class="copy-btn" :title="$t('tools.mimeSearch.ui.copy') + ' ' + result.mime">
              <i class="fas fa-copy"></i>
            </button>
          </div>
          <div class="mime-type">{{ result.mime }}</div>
          <div class="description">{{ result.description }}</div>
        </div>
      </div>
    </div>

    <div class="common-types" v-if="searchQuery === ''">
      <h3>{{ $t('tools.mimeSearch.ui.commonMimeTypes') }}</h3>
      <div class="category-grid">
        <div v-for="category in commonCategories" :key="category.name" class="category-card">
          <h4><i :class="category.icon"></i> {{ category.name }}</h4>
          <div class="type-list">
            <div 
              v-for="type in category.types" 
              :key="type.extension"
              class="type-item"
              @click="selectType(type)"
            >
              <span class="ext">.{{ type.extension }}</span>
              <span class="mime">{{ type.mime }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="no-results" v-if="searchQuery && searchResults.length === 0">
      <i class="fas fa-search"></i>
      <p>{{ $t('tools.mimeSearch.ui.noResults') }}</p>
      <p class="hint">{{ $t('tools.mimeSearch.ui.tryOtherKeywords') }}</p>
    </div>

    <!-- 使用说明 -->
    <div class="info-section">
      <h3><i class="fas fa-info-circle"></i> {{ $t('tools.mimeSearch.ui.usageInfo') }}</h3>
      <ul>
        <li>{{ $t('tools.mimeSearch.ui.supportExtensionSearch') }}</li>
        <li>{{ $t('tools.mimeSearch.ui.supportMimeSearch') }}</li>
        <li>{{ $t('tools.mimeSearch.ui.quickCopy') }}</li>
        <li>{{ $t('tools.mimeSearch.ui.completeDatabase') }}</li>
        <li>{{ $t('tools.mimeSearch.ui.realtimeSearch') }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'MimeSearch',
  setup() {
    const { t } = useI18n()
    const searchMode = ref('extension')
    const searchQuery = ref('')
    const searchResults = ref([])

    // MIME类型数据库
    const mimeDatabase = [
      // 图片格式
      { extension: 'jpg', mime: 'image/jpeg', description: 'JPEG图片格式' },
      { extension: 'jpeg', mime: 'image/jpeg', description: 'JPEG图片格式' },
      { extension: 'png', mime: 'image/png', description: 'PNG图片格式' },
      { extension: 'gif', mime: 'image/gif', description: 'GIF动画图片' },
      { extension: 'webp', mime: 'image/webp', description: 'WebP图片格式' },
      { extension: 'svg', mime: 'image/svg+xml', description: 'SVG矢量图' },
      { extension: 'ico', mime: 'image/x-icon', description: '图标文件' },
      { extension: 'bmp', mime: 'image/bmp', description: 'BMP位图' },
      { extension: 'tiff', mime: 'image/tiff', description: 'TIFF图片' },
      { extension: 'avif', mime: 'image/avif', description: 'AVIF图片格式' },

      // 文档格式
      { extension: 'pdf', mime: 'application/pdf', description: 'PDF文档' },
      { extension: 'doc', mime: 'application/msword', description: 'Word文档' },
      { extension: 'docx', mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', description: 'Word文档(新版)' },
      { extension: 'xls', mime: 'application/vnd.ms-excel', description: 'Excel表格' },
      { extension: 'xlsx', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', description: 'Excel表格(新版)' },
      { extension: 'ppt', mime: 'application/vnd.ms-powerpoint', description: 'PowerPoint演示' },
      { extension: 'pptx', mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', description: 'PowerPoint(新版)' },

      // 音频格式
      { extension: 'mp3', mime: 'audio/mpeg', description: 'MP3音频' },
      { extension: 'wav', mime: 'audio/wav', description: 'WAV音频' },
      { extension: 'ogg', mime: 'audio/ogg', description: 'OGG音频' },
      { extension: 'aac', mime: 'audio/aac', description: 'AAC音频' },
      { extension: 'flac', mime: 'audio/flac', description: 'FLAC无损音频' },

      // 视频格式
      { extension: 'mp4', mime: 'video/mp4', description: 'MP4视频' },
      { extension: 'avi', mime: 'video/x-msvideo', description: 'AVI视频' },
      { extension: 'mov', mime: 'video/quicktime', description: 'QuickTime视频' },
      { extension: 'webm', mime: 'video/webm', description: 'WebM视频' },

      // 文本格式
      { extension: 'txt', mime: 'text/plain', description: '纯文本文件' },
      { extension: 'html', mime: 'text/html', description: 'HTML网页' },
      { extension: 'htm', mime: 'text/html', description: 'HTML网页' },
      { extension: 'css', mime: 'text/css', description: 'CSS样式表' },
      { extension: 'js', mime: 'text/javascript', description: 'JavaScript代码' },
      { extension: 'json', mime: 'application/json', description: 'JSON数据' },
      { extension: 'xml', mime: 'text/xml', description: 'XML文档' },
      { extension: 'csv', mime: 'text/csv', description: 'CSV逗号分隔值' },

      // 压缩格式
      { extension: 'zip', mime: 'application/zip', description: 'ZIP压缩包' },
      { extension: 'rar', mime: 'application/vnd.rar', description: 'RAR压缩包' },
      { extension: 'tar', mime: 'application/x-tar', description: 'TAR归档' },
      { extension: 'gz', mime: 'application/gzip', description: 'GZIP压缩' }
    ]

    // 常见类型分类
    const commonCategories = ref([
      {
        name: t('tools.mimeSearch.ui.imageFormats'),
        icon: 'fas fa-image',
        types: mimeDatabase.filter(item => item.mime.startsWith('image/')).slice(0, 6)
      },
      {
        name: t('tools.mimeSearch.ui.documentFormats'),
        icon: 'fas fa-file-alt',
        types: mimeDatabase.filter(item => 
          item.mime.includes('pdf') || 
          item.mime.includes('word') || 
          item.mime.includes('excel') || 
          item.mime.includes('powerpoint')
        ).slice(0, 6)
      },
      {
        name: t('tools.mimeSearch.ui.audioVideo'),
        icon: 'fas fa-play-circle',
        types: mimeDatabase.filter(item => 
          item.mime.startsWith('audio/') || 
          item.mime.startsWith('video/')
        ).slice(0, 6)
      },
      {
        name: t('tools.mimeSearch.ui.webFormats'),
        icon: 'fas fa-code',
        types: mimeDatabase.filter(item => 
          ['html', 'css', 'js', 'json', 'xml'].includes(item.extension)
        )
      }
    ])

    const performSearch = () => {
      if (!searchQuery.value.trim()) {
        searchResults.value = []
        return
      }

      const query = searchQuery.value.toLowerCase().trim()
      
      if (searchMode.value === 'extension') {
        // 搜索扩展名（移除开头的点）
        const cleanQuery = query.replace(/^\./, '')
        searchResults.value = mimeDatabase.filter(item => 
          item.extension.toLowerCase().includes(cleanQuery)
        )
      } else {
        // 搜索MIME类型
        searchResults.value = mimeDatabase.filter(item => 
          item.mime.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
        )
      }
    }

    const clearSearch = () => {
      searchQuery.value = ''
      searchResults.value = []
    }

    const selectType = (type) => {
      if (searchMode.value === 'extension') {
        searchQuery.value = type.extension
      } else {
        searchQuery.value = type.mime
      }
      performSearch()
    }

    const copyToClipboard = async (text) => {
      try {
        await navigator.clipboard.writeText(text)
      } catch (err) {
        console.error(t('tools.mimeSearch.ui.copyFailed') + ':', err)
      }
    }

    return {
      searchMode,
      searchQuery,
      searchResults,
      commonCategories,
      performSearch,
      clearSearch,
      selectType,
      copyToClipboard
    }
  }
}
</script>

<style scoped>
.mime-search-tool {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}

.tool-header {
  text-align: center;
  margin-bottom: 10px;
  padding: 10px;
}

.tool-header h2 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.tool-header p {
  color: #7f8c8d;
  font-size: 16px;
}

.search-section {
  background: white;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 10px;
}

.search-mode {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
  justify-content: center;
}

.radio-group {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: 500;
}

.radio-group input[type="radio"] {
  margin: 0;
}

.input-section .input-group {
  position: relative;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 2px solid #e1e8ed;
  border-radius: 25px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #3498db;
}

.clear-btn {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #95a5a6;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
}

.clear-btn:hover {
  background: #ecf0f1;
  color: #e74c3c;
}

.results-section h3,
.common-types h3 {
  color: #2c3e50;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
}

.result-card {
  background: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-left: 4px solid #3498db;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.extension {
  background: #3498db;
  color: white;
  padding: 10px;
  border-radius: 4px;
  font-weight: bold;
  font-family: monospace;
}

.copy-btn {
  background: none;
  border: none;
  color: #95a5a6;
  cursor: pointer;
  padding: 10px;
  border-radius: 4px;
}

.copy-btn:hover {
  background: #ecf0f1;
  color: #3498db;
}

.mime-type {
  font-family: monospace;
  background: #f8f9fa;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  font-size: 14px;
  word-break: break-all;
}

.description {
  color: #7f8c8d;
  font-size: 14px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 10px;
}

.category-card {
  background: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.category-card h4 {
  color: #2c3e50;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.type-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.type-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.type-item:hover {
  background: #e9ecef;
}

.type-item .ext {
  font-weight: bold;
  color: #3498db;
  font-family: monospace;
}

.type-item .mime {
  font-size: 12px;
  color: #6c757d;
  font-family: monospace;
}

.no-results {
  text-align: center;
  padding: 10px;
  color: #95a5a6;
}

.no-results i {
  font-size: 48px;
  margin-bottom: 10px;
}

.no-results .hint {
  font-size: 14px;
  margin-top: 5px;
}

.info-section {
  background: #f8f9fa;
  padding: 10px;
  border-radius: 8px;
  margin-top: 30px;
}

.info-section h3 {
  color: #2c3e50;
  margin-bottom: 10px;
}

.info-section ul {
  list-style: none;
  padding: 0;
}

.info-section li {
  margin: 8px 0;
  color: #5a6c7d;
}

/* 深色主题适配 */
:global(.dark-theme) .mime-search-tool {
  color: #e4e6ea;
}

:global(.dark-theme) .search-section,
:global(.dark-theme) .result-card,
:global(.dark-theme) .category-card {
  background: #2c2c2c;
  border-color: #404040;
}

:global(.dark-theme) .search-input {
  background: #2c2c2c;
  border-color: #404040;
  color: #e4e6ea;
}

:global(.dark-theme) .mime-type {
  background: #3c3c3c;
}

:global(.dark-theme) .type-item {
  background: #3c3c3c;
}

:global(.dark-theme) .type-item:hover {
  background: #4c4c4c;
}

:global(.dark-theme) .info-section {
  background: #2c2c2c;
}
</style> 