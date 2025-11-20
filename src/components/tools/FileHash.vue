<template>
  <div class="tool-container">
    <div class="tool-header">
      <h2><i class="fas fa-shield-alt"></i> {{ $t('tools.fileHash.ui.title') }}</h2>
      <p>{{ $t('tools.fileHash.ui.description') }}</p>
    </div>

    <div class="tool-content">
      <div class="input-section">
        <h3><i class="fas fa-upload"></i> {{ $t('tools.fileHash.ui.selectFile') }}</h3>
        <div class="file-upload-area">
          <input
            type="file"
            ref="fileInput"
            @change="handleFileUpload"
            style="display: none"
          />
          <button @click="$refs.fileInput.click()" class="upload-btn">
            <i class="fas fa-cloud-upload-alt"></i> {{ $t('tools.fileHash.ui.selectFile') }}
          </button>
          <span class="file-info" v-if="fileName">{{ $t('tools.fileHash.ui.selected') }} {{ fileName }}</span>
        </div>

        <div class="hash-options" v-if="fileName">
          <h4>{{ $t('tools.fileHash.ui.selectHashAlgorithm') }}</h4>
          <div class="algorithm-list">
            <label class="algorithm-item">
              <input type="checkbox" v-model="selectedAlgorithms" value="md5" />
              MD5
            </label>
            <label class="algorithm-item">
              <input type="checkbox" v-model="selectedAlgorithms" value="sha256" />
              SHA-256
            </label>
          </div>
        </div>
      </div>

      <div class="action-section">
        <button @click="calculateHashes" class="calculate-btn" :disabled="!fileName || selectedAlgorithms.length === 0 || isCalculating">
          <i :class="isCalculating ? 'fas fa-spinner fa-spin' : 'fas fa-calculator'"></i>
          {{ isCalculating ? $t('tools.fileHash.ui.calculating') : $t('tools.fileHash.ui.calculateHash') }}
        </button>
        <button @click="clearAll" class="clear-btn">
          <i class="fas fa-trash"></i> {{ $t('tools.fileHash.ui.clear') }}
        </button>
      </div>

      <div class="results-section" v-if="hashResults.length > 0">
        <h3><i class="fas fa-key"></i> {{ $t('tools.fileHash.ui.hashResults') }}</h3>
        <div class="hash-result" v-for="result in hashResults" :key="result.algorithm">
          <div class="hash-label">{{ result.algorithm.toUpperCase() }}:</div>
          <div class="hash-value">
            <code>{{ result.hash }}</code>
            <button @click="copyHash(result.hash)" class="copy-btn">
              <i class="fas fa-copy"></i>
            </button>
          </div>
        </div>
      </div>

      <div v-if="error" class="error-message">
        <i class="fas fa-exclamation-triangle"></i> {{ error }}
      </div>

      <div class="note-section">
        <h4><i class="fas fa-info-circle"></i> {{ $t('tools.fileHash.ui.usageInstructions') }}</h4>
        <ul>
          <li>{{ $t('tools.fileHash.ui.instruction1') }}</li>
          <li>{{ $t('tools.fileHash.ui.instruction2') }}</li>
          <li>{{ $t('tools.fileHash.ui.instruction3') }}</li>
          <li>{{ $t('tools.fileHash.ui.instruction4') }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'FileHash',
  setup() {
    const { t } = useI18n()
    const fileName = ref('')
    const selectedFile = ref(null)
    const selectedAlgorithms = ref(['md5', 'sha256'])
    const hashResults = ref([])
    const error = ref('')
    const isCalculating = ref(false)

    const handleFileUpload = (event) => {
      const file = event.target.files[0]
      if (file) {
        selectedFile.value = file
        fileName.value = file.name
        hashResults.value = []
        error.value = ''
      }
    }

    const calculateHashes = () => {
      error.value = ''
      isCalculating.value = true
      
      // 文件哈希计算需要专业的库（如crypto-js），这里提供说明
      setTimeout(() => {
        error.value = t('tools.fileHash.ui.hashFailed')
        isCalculating.value = false
      }, 1000)
    }

    const copyHash = (hash) => {
      navigator.clipboard.writeText(hash)
    }

    const clearAll = () => {
      fileName.value = ''
      selectedFile.value = null
      hashResults.value = []
      error.value = ''
    }

    return {
      fileName,
      selectedAlgorithms,
      hashResults,
      error,
      isCalculating,
      handleFileUpload,
      calculateHashes,
      copyHash,
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

.hash-options {
  margin-top: 20px;
}

.hash-options h4 {
  margin-bottom: 10px;
  color: var(--text-primary);
}

.algorithm-list {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.algorithm-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  cursor: pointer;
}

.action-section {
  text-align: center;
  margin: 20px 0;
}

.calculate-btn, .clear-btn {
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin: 0 10px;
  transition: all 0.3s;
}

.calculate-btn {
  background: var(--success-color);
  color: white;
}

.calculate-btn:hover:not(:disabled) {
  background: var(--success-hover);
}

.calculate-btn:disabled {
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

.results-section {
  background: var(--bg-secondary);
  padding: 10px;
  border-radius: 12px;
  margin-bottom: 10px;
}

.results-section h3 {
  margin-bottom: 10px;
  color: var(--text-primary);
}

.hash-result {
  margin-bottom: 10px;
  padding: 10px;
  background: var(--bg-primary);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.hash-label {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.hash-value {
  display: flex;
  align-items: center;
  gap: 10px;
}

.hash-value code {
  flex: 1;
  background: var(--bg-secondary);
  padding: 10px;
  border-radius: 4px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
  word-break: break-all;
  color: var(--text-primary);
}

.copy-btn {
  padding: 10px;
  background: var(--info-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.3s;
}

.copy-btn:hover {
  background: var(--info-hover);
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