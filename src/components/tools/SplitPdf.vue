<template>
  <div class="tool-container">
    <div class="tool-header">
      <h2><i class="fas fa-cut"></i> {{ $t('tools.splitPdf.ui.title') }}</h2>
      <p>{{ $t('tools.splitPdf.ui.description') }}</p>
    </div>

    <div class="tool-content">
      <div class="input-section">
        <h3><i class="fas fa-upload"></i> {{ $t('tools.splitPdf.ui.selectPdfFile') }}</h3>
        <div class="file-upload-area">
          <input
            type="file"
            ref="fileInput"
            @change="handleFileUpload"
            accept=".pdf"
            style="display: none"
          />
          <button @click="$refs.fileInput.click()" class="upload-btn">
            <i class="fas fa-cloud-upload-alt"></i> {{ $t('tools.splitPdf.ui.selectPdfFile') }}
          </button>
          <span class="file-info" v-if="fileName">{{ $t('tools.splitPdf.ui.selected') }} {{ fileName }}</span>
        </div>

        <div class="split-options" v-if="fileName">
          <h4>{{ $t('tools.splitPdf.ui.splitOptions') }}</h4>
          <div class="option-group">
            <label>
              <input type="radio" v-model="splitMode" value="pages" />
              {{ $t('tools.splitPdf.ui.splitByPages') }}
            </label>
          </div>
          <div class="option-group">
            <label>
              <input type="radio" v-model="splitMode" value="every" />
              {{ $t('tools.splitPdf.ui.splitEveryN') }}
            </label>
          </div>

          <div v-if="splitMode === 'pages'" class="page-ranges">
            <label>{{ $t('tools.splitPdf.ui.pageRanges') }}</label>
            <input v-model="pageRanges" type="text" :placeholder="$t('tools.splitPdf.ui.pageRangesPlaceholder')" />
          </div>

          <div v-if="splitMode === 'every'" class="every-pages">
            <label>{{ $t('tools.splitPdf.ui.everyPages') }}</label>
            <select v-model="everyPages">
              <option value="1">{{ $t('tools.splitPdf.ui.every1Page') }}</option>
              <option value="2">{{ $t('tools.splitPdf.ui.every2Pages') }}</option>
              <option value="3">{{ $t('tools.splitPdf.ui.every3Pages') }}</option>
              <option value="5">{{ $t('tools.splitPdf.ui.every5Pages') }}</option>
              <option value="10">{{ $t('tools.splitPdf.ui.every10Pages') }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="action-section">
        <button @click="splitPdf" class="split-btn" :disabled="!fileName || isProcessing">
          <i :class="isProcessing ? 'fas fa-spinner fa-spin' : 'fas fa-cut'"></i>
          {{ isProcessing ? $t('tools.splitPdf.ui.splitting') : $t('tools.splitPdf.ui.splitPdf') }}
        </button>
        <button @click="clearAll" class="clear-btn">
          <i class="fas fa-trash"></i> {{ $t('tools.splitPdf.ui.clear') }}
        </button>
      </div>

      <div v-if="error" class="error-message">
        <i class="fas fa-exclamation-triangle"></i> {{ error }}
      </div>

      <div class="note-section">
        <h4><i class="fas fa-info-circle"></i> {{ $t('tools.splitPdf.ui.usageInstructions') }}</h4>
        <ul>
          <li>{{ $t('tools.splitPdf.ui.instruction1') }}</li>
          <li>{{ $t('tools.splitPdf.ui.instruction2') }}</li>
          <li>{{ $t('tools.splitPdf.ui.instruction3') }}</li>
          <li>{{ $t('tools.splitPdf.ui.instruction4') }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'SplitPdf',
  setup() {
    const { t } = useI18n()
    const fileName = ref('')
    const splitMode = ref('pages')
    const pageRanges = ref('')
    const everyPages = ref('2')
    const error = ref('')
    const isProcessing = ref(false)

    const handleFileUpload = (event) => {
      const file = event.target.files[0]
      if (file && file.type === 'application/pdf') {
        fileName.value = file.name
        error.value = ''
      } else {
        error.value = t('tools.splitPdf.ui.selectValidPdf')
      }
    }

    const splitPdf = () => {
      error.value = ''
      
      if (!fileName.value) {
        error.value = t('tools.splitPdf.ui.selectPdfFirst')
        return
      }

      // PDF分割需要专业的库（如PDF-lib），这里提供说明
      error.value = t('tools.splitPdf.ui.splitFailed')
    }

    const clearAll = () => {
      fileName.value = ''
      pageRanges.value = ''
      error.value = ''
    }

    return {
      fileName,
      splitMode,
      pageRanges,
      everyPages,
      error,
      isProcessing,
      handleFileUpload,
      splitPdf,
      clearAll
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

.split-options {
  margin-top: 20px;
  padding: 10px;
  background: var(--bg-primary);
  border-radius: 8px;
}

.split-options h4 {
  margin-bottom: 10px;
  color: var(--text-primary);
}

.option-group {
  margin-bottom: 10px;
}

.page-ranges, .every-pages {
  margin-top: 15px;
}

.page-ranges input,
.every-pages select {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  margin-top: 5px;
}

.action-section {
  text-align: center;
  margin: 20px 0;
}

.split-btn, .clear-btn {
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin: 0 10px;
  transition: all 0.3s;
}

.split-btn {
  background: var(--success-color);
  color: white;
}

.split-btn:hover:not(:disabled) {
  background: var(--success-hover);
}

.split-btn:disabled {
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