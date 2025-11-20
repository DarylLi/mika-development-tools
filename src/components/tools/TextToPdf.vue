<template>
  <div class="tool-container">
    <div class="tool-header">
      <div class="header-icon">📄</div>
      <h2>{{ $t('tools.textToPdf.ui.title') }}</h2>
      <p>{{ $t('tools.textToPdf.ui.description') }}</p>
    </div>

    <div class="input-card">
      <div class="card-header">
        <h3><i class="fas fa-edit"></i> {{ $t('tools.textToPdf.ui.inputText') }}</h3>
      </div>
      
      <div class="input-section">
        <textarea
          v-model="textContent"
          :placeholder="$t('tools.textToPdf.ui.textPlaceholder')"
          class="text-input"
          @input="updateStats"
        ></textarea>
        
        <div class="stats">
          <span>{{ $t('tools.textToPdf.ui.charCount') }} {{ charCount }}</span>
          <span>{{ $t('tools.textToPdf.ui.wordCount') }} {{ wordCount }}</span>
          <span>{{ $t('tools.textToPdf.ui.lineCount') }} {{ lineCount }}</span>
        </div>
      </div>

      <div class="file-upload">
        <input
          type="file"
          ref="fileInput"
          @change="handleFileUpload"
          accept=".txt,.md"
          style="display: none"
        />
        <button @click="$refs.fileInput.click()" class="secondary-btn">
          <i class="fas fa-upload"></i> {{ $t('tools.textToPdf.ui.uploadTextFile') }}
        </button>
      </div>
    </div>

    <div class="config-card">
      <div class="card-header">
        <h3><i class="fas fa-cog"></i> {{ $t('tools.textToPdf.ui.configOptions') }}</h3>
      </div>
      
      <div class="options-grid">
        <div class="option-item">
          <label>{{ $t('tools.textToPdf.ui.fileName') }}</label>
          <input v-model="fileName" type="text" :placeholder="$t('tools.textToPdf.ui.fileNamePlaceholder')" class="text-input" />
        </div>
        
        <div class="option-item">
          <label>{{ $t('tools.textToPdf.ui.fontSize') }}</label>
          <select v-model="fontSize" class="styled-select">
            <option value="10">10pt</option>
            <option value="12">12pt</option>
            <option value="14">14pt</option>
            <option value="16">16pt</option>
            <option value="18">18pt</option>
          </select>
        </div>

        <div class="option-item">
          <label>{{ $t('tools.textToPdf.ui.pageOrientation') }}</label>
          <select v-model="pageOrientation" class="styled-select">
            <option value="portrait">{{ $t('tools.textToPdf.ui.portrait') }}</option>
            <option value="landscape">{{ $t('tools.textToPdf.ui.landscape') }}</option>
          </select>
        </div>

        <div class="option-item">
          <label>{{ $t('tools.textToPdf.ui.fontFamily') }}</label>
          <select v-model="fontFamily" class="styled-select">
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="SimSun">{{ $t('tools.textToPdf.ui.fontSimSun') }}</option>
            <option value="Microsoft YaHei">{{ $t('tools.textToPdf.ui.fontYaHei') }}</option>
          </select>
        </div>
      </div>

      <div class="checkbox-options">
        <label class="checkbox-label">
          <input type="checkbox" v-model="addPageNumbers" />
          <span class="checkmark"></span>
          {{ $t('tools.textToPdf.ui.addPageNumbers') }}
        </label>
        
        <label class="checkbox-label">
          <input type="checkbox" v-model="addTimestamp" />
          <span class="checkmark"></span>
          {{ $t('tools.textToPdf.ui.addTimestamp') }}
        </label>
        
        <label class="checkbox-label">
          <input type="checkbox" v-model="preserveLineBreaks" />
          <span class="checkmark"></span>
          {{ $t('tools.textToPdf.ui.preserveLineBreaks') }}
        </label>
      </div>
    </div>

    <div class="action-section">
      <button @click="generatePdf" class="primary-btn" :disabled="!textContent.trim() || isGenerating">
        <i :class="isGenerating ? 'fas fa-spinner fa-spin' : 'fas fa-file-pdf'"></i>
        {{ isGenerating ? $t('tools.textToPdf.ui.generating') : $t('tools.textToPdf.ui.generatePdf') }}
      </button>
      
      <button @click="previewContent" class="secondary-btn" :disabled="!textContent.trim()">
        <i class="fas fa-eye"></i> {{ $t('tools.textToPdf.ui.preview') }}
      </button>
      
      <button @click="clearAll" class="danger-btn">
        <i class="fas fa-trash"></i> {{ $t('tools.textToPdf.ui.clear') }}
      </button>
    </div>

    <div v-if="error" class="error-card">
      <i class="fas fa-exclamation-triangle"></i> {{ error }}
    </div>

    <div v-if="success" class="success-card">
      <i class="fas fa-check-circle"></i> {{ success }}
    </div>

    <div v-if="showPreview" class="preview-card">
      <div class="card-header">
        <h3><i class="fas fa-eye"></i> {{ $t('tools.textToPdf.ui.previewTitle') }}</h3>
        <button @click="showPreview = false" class="close-btn">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <div class="preview-content" :style="previewStyle">
        <div v-if="addTimestamp" class="preview-timestamp">
          {{ $t('tools.textToPdf.ui.generateTime') }} {{ currentTimestamp }}
        </div>
        <div class="preview-text">{{ formattedText }}</div>
      </div>
    </div>

    <div class="help-card">
      <h4><i class="fas fa-info-circle"></i> {{ $t('tools.textToPdf.ui.usageInstructions') }}</h4>
      <ul>
        <li>{{ $t('tools.textToPdf.ui.instruction1') }}</li>
        <li>{{ $t('tools.textToPdf.ui.instruction2') }}</li>
        <li>{{ $t('tools.textToPdf.ui.instruction3') }}</li>
        <li>{{ $t('tools.textToPdf.ui.instruction4') }}</li>
        <li>{{ $t('tools.textToPdf.ui.instruction5') }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'TextToPdf',
  setup() {
    const { t } = useI18n()
    const textContent = ref('')
    const fileName = ref('')
    const fontSize = ref('14')
    const pageOrientation = ref('portrait')
    const fontFamily = ref('Arial')
    const addPageNumbers = ref(false)
    const addTimestamp = ref(false)
    const preserveLineBreaks = ref(true)
    const error = ref('')
    const success = ref('')
    const isGenerating = ref(false)
    const showPreview = ref(false)

    const charCount = computed(() => textContent.value.length)
    const wordCount = computed(() => textContent.value.trim().split(/\s+/).filter(word => word.length > 0).length)
    const lineCount = computed(() => textContent.value.split('\n').length)
    
    const currentTimestamp = computed(() => {
      return new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    })

    const formattedText = computed(() => {
      return preserveLineBreaks.value ? textContent.value : textContent.value.replace(/\n/g, ' ')
    })

    const previewStyle = computed(() => ({
      fontFamily: fontFamily.value,
      fontSize: fontSize.value + 'pt',
      whiteSpace: preserveLineBreaks.value ? 'pre-wrap' : 'normal'
    }))

    const updateStats = () => {
      // 触发计算属性更新
    }

    const handleFileUpload = (event) => {
      const file = event.target.files[0]
      if (!file) return

      const reader = new FileReader()
      reader.onload = (e) => {
        textContent.value = e.target.result
        fileName.value = file.name.replace(/\.[^/.]+$/, "")
        updateStats()
      }
      reader.readAsText(file)
    }

    const previewContent = () => {
      showPreview.value = true
    }

    const generatePdf = () => {
      try {
        isGenerating.value = true
        error.value = ''
        success.value = ''

        // 创建新窗口用于打印
        const printWindow = window.open('', '_blank')
        
        // 构建HTML内容
        const htmlParts = []
        htmlParts.push('<!DOCTYPE html>')
        htmlParts.push('<html><head>')
        htmlParts.push('<meta charset="UTF-8">')
        htmlParts.push('<title>' + (fileName.value || t('tools.textToPdf.ui.fileNamePlaceholder')) + '</title>')
        
        // 添加样式
        htmlParts.push('<style>')
        htmlParts.push('body { font-family: ' + fontFamily.value + '; font-size: ' + fontSize.value + 'pt; line-height: 1.6; margin: 0; padding: 20mm; color: #333; background: white; }')
        if (preserveLineBreaks.value) {
          htmlParts.push('body { white-space: pre-wrap; }')
        }
        htmlParts.push('.header { text-align: right; font-size: 10pt; color: #666; margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 10px; }')
        htmlParts.push('.content { margin-bottom: 10px; }')
        htmlParts.push('@media print { body { margin: 0; } @page { margin: 20mm; size: ' + (pageOrientation.value === 'landscape' ? 'A4 landscape' : 'A4 portrait') + '; } }')
        htmlParts.push('</style>')
        
        htmlParts.push('</head><body>')
        
        if (addTimestamp.value) {
          htmlParts.push('<div class="header">' + t('tools.textToPdf.ui.generateTime') + ' ' + currentTimestamp.value + '</div>')
        }
        
        htmlParts.push('<div class="content">' + formattedText.value.replace(/\n/g, '<br>') + '</div>')
        
        htmlParts.push('<script>')
        htmlParts.push('window.onload = function() { setTimeout(function() { window.print(); window.close(); }, 500); }')
        htmlParts.push('</scr' + 'ipt>')
        
        htmlParts.push('</body></html>')

        printWindow.document.write(htmlParts.join('\n'))
        printWindow.document.close()
        printWindow.focus()

        success.value = t('tools.textToPdf.ui.pdfGenerated')
        setTimeout(() => success.value = '', 5000)

      } catch (err) {
        error.value = t('tools.textToPdf.ui.pdfFailed') + ' ' + err.message
      } finally {
        isGenerating.value = false
      }
    }

    const clearAll = () => {
      textContent.value = ''
      fileName.value = ''
      error.value = ''
      success.value = ''
      showPreview.value = false
    }

    return {
      textContent,
      fileName,
      fontSize,
      pageOrientation,
      fontFamily,
      addPageNumbers,
      addTimestamp,
      preserveLineBreaks,
      error,
      success,
      isGenerating,
      showPreview,
      charCount,
      wordCount,
      lineCount,
      currentTimestamp,
      formattedText,
      previewStyle,
      updateStats,
      handleFileUpload,
      previewContent,
      generatePdf,
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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.tool-header {
  text-align: center;
  margin-bottom: 10px;
  padding: 10px;
  background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
  color: white;
  padding: 10px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(220, 38, 38, 0.3);
}

.header-icon {
  font-size: 48px;
  margin-bottom: 10px;
  opacity: 0.9;
}

.tool-header h2 {
  margin: 0 0 12px 0;
  font-size: 32px;
  font-weight: 700;
}

.tool-header p {
  margin: 0;
  font-size: 16px;
  opacity: 0.9;
  line-height: 1.5;
}

/* 卡片样式 */
.input-card, .config-card, .preview-card, .help-card, .error-card, .success-card {
  background: white;
  border-radius: 16px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.input-card:hover, .config-card:hover, .preview-card:hover, .help-card:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f8fafc;
}

.card-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;
  display: flex;
  align-items: center;
  gap: 8px;
}

.text-input {
  width: 100%;
  padding: 10px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.5;
  transition: all 0.3s ease;
  font-family: inherit;
  resize: vertical;
}

.text-input:focus {
  outline: none;
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.text-input[type="textarea"] {
  min-height: 200px;
}

.stats {
  display: flex;
  gap: 20px;
  margin-top: 12px;
  font-size: 14px;
  color: #6b7280;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 10px;
}

.option-item label {
  display: block;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 10px;
}

.styled-select {
  width: 100%;
  padding: 10px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  color: #2d3748;
  font-size: 14px;
  transition: all 0.3s ease;
}

.styled-select:focus {
  outline: none;
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.checkbox-options {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
}

input[type="checkbox"] {
  width: 20px;
  margin-bottom: 0px;
}

.checkbox-label input[type="checkbox"] {
  margin-right: 8px;
  transform: scale(1.2);
}

.action-section {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
  margin: 32px 0;
}

.primary-btn, .secondary-btn, .danger-btn {
  padding: 10px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.primary-btn {
  background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
  color: white;
}

.primary-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #b91c1c 0%, #7f1d1d 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(220, 38, 38, 0.3);
}

.secondary-btn {
  background: #f8fafc;
  color: #4a5568;
  border: 2px solid #e2e8f0;
}

.secondary-btn:hover {
  background: #e2e8f0;
  transform: translateY(-2px);
}

.danger-btn {
  background: #fef2f2;
  color: #dc2626;
  border: 2px solid #fecaca;
}

.danger-btn:hover {
  background: #fee2e2;
  transform: translateY(-2px);
}

.primary-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.error-card {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.success-card {
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}

.preview-content {
  background: #f8fafc;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
}

.preview-timestamp {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 10px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e2e8f0;
}

.close-btn {
  background: #f3f4f6;
  border: none;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  color: #6b7280;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #e5e7eb;
  color: #374151;
}

.help-card h4 {
  margin: 0 0 16px 0;
  color: #2d3748;
  display: flex;
  align-items: center;
  gap: 8px;
}

.help-card ul {
  margin: 0;
  padding-left: 20px;
}

.help-card li {
  margin-bottom: 10px;
  color: #4a5568;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .tool-container {
    padding: 10px;
  }
  
  .options-grid {
    grid-template-columns: 1fr;
  }
  
  .action-section {
    flex-direction: column;
    align-items: stretch;
  }
  
  .checkbox-options {
    flex-direction: column;
    gap: 12px;
  }
}
</style> 