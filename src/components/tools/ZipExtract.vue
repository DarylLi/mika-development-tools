<template>
  <div class="tool-container">
    <div class="tool-header">
      <h2><i class="fas fa-file-archive"></i> {{ $t('tools.zipExtract.name') }}</h2>
      <p>{{ $t('tools.zipExtract.description') }}</p>
    </div>

    <div class="tool-content">
      <div class="input-section">
        <h3><i class="fas fa-upload"></i> {{ $t('tools.zipExtract.selectZipFile') }}</h3>
        <div class="file-upload-area">
          <input
            type="file"
            ref="fileInput"
            @change="handleFileUpload"
            accept=".zip"
            style="display: none"
          />
          <button @click="$refs.fileInput.click()" class="upload-btn">
            <i class="fas fa-cloud-upload-alt"></i> {{ $t('tools.zipExtract.selectZipFile') }}
          </button>
          <span class="file-info" v-if="fileName">{{ $t('tools.zipExtract.ui.selected') }}: {{ fileName }}</span>
        </div>
      </div>

      <div class="action-section">
        <button @click="extractZip" class="extract-btn" :disabled="!fileName || isProcessing">
          <i :class="isProcessing ? 'fas fa-spinner fa-spin' : 'fas fa-expand-arrows-alt'"></i>
          {{ isProcessing ? $t('tools.zipExtract.extracting') : $t('tools.zipExtract.extractFiles') }}
        </button>
        <button @click="clearAll" class="clear-btn">
          <i class="fas fa-trash"></i> {{ $t('tools.zipExtract.ui.clear') }}
        </button>
      </div>

      <div class="file-list" v-if="extractedFiles.length > 0">
        <h3><i class="fas fa-folder-open"></i> {{ $t('tools.zipExtract.extractedFiles') }} ({{ extractedFiles.length }} {{ $t('tools.zipExtract.files') }})</h3>
        <div class="file-item" v-for="(file, index) in extractedFiles" :key="index">
          <div class="file-info">
            <i :class="getFileIcon(file.name)"></i>
            <span class="file-name">{{ file.name }}</span>
            <span class="file-size">({{ formatFileSize(file.size) }})</span>
          </div>
          <button @click="downloadFile(file)" class="download-btn">
            <i class="fas fa-download"></i> {{ $t('tools.zipExtract.ui.download') }}
          </button>
        </div>
        
        <div class="batch-actions">
          <button @click="downloadAll" class="download-all-btn">
            <i class="fas fa-download"></i> {{ $t('tools.zipExtract.downloadAll') }}
          </button>
        </div>
      </div>

      <div v-if="error" class="error-message">
        <i class="fas fa-exclamation-triangle"></i> {{ error }}
      </div>

      <div class="note-section">
        <h4><i class="fas fa-info-circle"></i> {{ $t('tools.zipExtract.ui.usageInstructions') }}</h4>
        <ul>
          <li>{{ $t('tools.zipExtract.supportStandardZip') }}</li>
          <li>{{ $t('tools.zipExtract.previewFileList') }}</li>
          <li>{{ $t('tools.zipExtract.supportDownload') }}</li>
          <li>{{ $t('tools.zipExtract.localProcessing') }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'ZipExtract',
  setup() {
    const { t } = useI18n()
    const fileName = ref('')
    const extractedFiles = ref([])
    const error = ref('')
    const isProcessing = ref(false)

    const handleFileUpload = (event) => {
      const file = event.target.files[0]
      if (file && file.type === 'application/zip') {
        fileName.value = file.name
        error.value = ''
      } else {
        error.value = t('tools.zipExtract.invalidZipFile')
      }
    }

    const getFileIcon = (fileName) => {
      const ext = fileName.split('.').pop().toLowerCase()
      const iconMap = {
        'txt': 'fas fa-file-alt',
        'pdf': 'fas fa-file-pdf',
        'doc': 'fas fa-file-word',
        'docx': 'fas fa-file-word',
        'xls': 'fas fa-file-excel',
        'xlsx': 'fas fa-file-excel',
        'ppt': 'fas fa-file-powerpoint',
        'pptx': 'fas fa-file-powerpoint',
        'jpg': 'fas fa-file-image',
        'jpeg': 'fas fa-file-image',
        'png': 'fas fa-file-image',
        'gif': 'fas fa-file-image',
        'mp3': 'fas fa-file-audio',
        'wav': 'fas fa-file-audio',
        'mp4': 'fas fa-file-video',
        'avi': 'fas fa-file-video',
        'zip': 'fas fa-file-archive',
        'rar': 'fas fa-file-archive'
      }
      return iconMap[ext] || 'fas fa-file'
    }

    const formatFileSize = (bytes) => {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    const extractZip = () => {
      error.value = ''
      isProcessing.value = true
      
      // ZIP extraction requires professional libraries (e.g., JSZip), providing instructions here
      setTimeout(() => {
        error.value = t('tools.zipExtract.libRequired')
        isProcessing.value = false
      }, 1000)
    }

    const downloadFile = (file) => {
      // Download single file logic
      console.log(t('tools.zipExtract.ui.downloadingFile') + ':', file.name)
    }

    const downloadAll = () => {
      // Download all files logic
      console.log(t('tools.zipExtract.ui.downloadingAll'))
    }

    const clearAll = () => {
      fileName.value = ''
      extractedFiles.value = []
      error.value = ''
    }

    return {
      fileName,
      extractedFiles,
      error,
      isProcessing,
      handleFileUpload,
      getFileIcon,
      formatFileSize,
      extractZip,
      downloadFile,
      downloadAll,
      clearAll,
      t
    }
  }
}
</script>

<style scoped>
.tool-container {
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
  color: var(--primary-color);
  margin-bottom: 10px;
}

.input-section {
  background: var(--bg-secondary);
  padding: 10px;
  border-radius: 12px;
  margin-bottom: 10px;
}

.file-upload-area {
  text-align: center;
  margin-bottom: 10px;
}

.upload-btn {
  background: var(--primary-color);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.upload-btn:hover {
  background: var(--primary-hover);
}

.file-info {
  margin-left: 15px;
  color: var(--success-color);
  font-weight: 500;
}

.action-section {
  text-align: center;
  margin: 20px 0;
}

.extract-btn, .clear-btn {
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin: 0 10px;
  transition: all 0.3s;
}

.extract-btn {
  background: var(--success-color);
  color: white;
}

.extract-btn:hover:not(:disabled) {
  background: var(--success-hover);
}

.extract-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.clear-btn {
  background: var(--danger-color);
  color: white;
}

.clear-btn:hover {
  background: var(--danger-hover);
}

.file-list {
  background: var(--bg-secondary);
  padding: 10px;
  border-radius: 12px;
  margin-bottom: 10px;
}

.file-list h3 {
  margin-bottom: 10px;
  color: var(--text-primary);
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg-primary);
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  border: 1px solid var(--border-color);
}

.file-item .file-info {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  margin: 0;
  color: var(--text-primary);
}

.file-item .file-info i {
  font-size: 18px;
}

.file-name {
  font-weight: 500;
}

.file-size {
  color: var(--text-secondary);
  font-size: 14px;
}

.download-btn {
  padding: 10px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.3s;
}

.download-btn:hover {
  background: var(--primary-hover);
}

.batch-actions {
  margin-top: 20px;
  text-align: center;
}

.download-all-btn {
  padding: 10px;
  background: var(--success-color);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background-color 0.3s;
}

.download-all-btn:hover {
  background: var(--success-hover);
}

.note-section {
  background: var(--bg-secondary);
  padding: 10px;
  border-radius: 12px;
  margin-top: 20px;
}

.note-section h4 {
  margin-bottom: 10px;
  color: var(--text-primary);
}

.note-section ul {
  margin: 0;
  padding-left: 20px;
}

.note-section li {
  margin-bottom: 10px;
  color: var(--text-secondary);
}

.error-message {
  background: var(--danger-light);
  color: var(--danger-color);
  padding: 10px;
  border-radius: 8px;
  margin-top: 15px;
  border: 1px solid var(--danger-color);
}
</style>