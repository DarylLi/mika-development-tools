<template>
  <div class="qr-generator-tool">
    <div class="tool-header">
      <h2><i class="fas fa-qrcode"></i> {{ $t('tools.qrGenerator.ui.title') }}</h2>
      <p>{{ $t('tools.qrGenerator.ui.description') }}</p>
    </div>

    <div class="tool-content">
      <div class="section">
        <h3><i class="fas fa-edit"></i> {{ $t('tools.qrGenerator.ui.inputContent') }}</h3>
        
        <div class="input-group">
          <label for="qrText">{{ $t('tools.qrGenerator.ui.qrContent') }}</label>
          <textarea 
            id="qrText"
            v-model="qrText" 
            :placeholder="$t('tools.qrGenerator.ui.placeholder')"
            class="text-input"
            rows="4"
          ></textarea>
        </div>

        <div class="options-group">
          <div class="option-item">
            <label for="qrSize">{{ $t('tools.qrGenerator.ui.size') }}</label>
            <select id="qrSize" v-model="qrSize" class="size-select">
              <option value="200">{{ $t('tools.qrGenerator.ui.sizeSmall') }}</option>
              <option value="300">{{ $t('tools.qrGenerator.ui.sizeMedium') }}</option>
              <option value="400">{{ $t('tools.qrGenerator.ui.sizeLarge') }}</option>
            </select>
          </div>
          
          <div class="option-item">
            <label for="errorLevel">{{ $t('tools.qrGenerator.ui.errorLevel') }}</label>
            <select id="errorLevel" v-model="errorLevel" class="error-select">
              <option value="L">{{ $t('tools.qrGenerator.ui.errorLevelL') }}</option>
              <option value="M">{{ $t('tools.qrGenerator.ui.errorLevelM') }}</option>
              <option value="Q">{{ $t('tools.qrGenerator.ui.errorLevelQ') }}</option>
              <option value="H">{{ $t('tools.qrGenerator.ui.errorLevelH') }}</option>
            </select>
          </div>
        </div>

        <div class="action-buttons">
          <button @click="generateQR" class="generate-btn" :disabled="!qrText.trim()">
            <i class="fas fa-magic"></i> {{ $t('tools.qrGenerator.ui.generateQr') }}
          </button>
          <button @click="loadExample" class="example-btn">
            <i class="fas fa-lightbulb"></i> {{ $t('tools.qrGenerator.ui.loadExample') }}
          </button>
        </div>
      </div>

      <div class="section" v-if="qrDataUrl">
        <h3><i class="fas fa-image"></i> {{ $t('tools.qrGenerator.ui.generationResult') }}</h3>
        
        <div class="qr-result">
          <div class="qr-display">
            <img :src="qrDataUrl" :alt="qrText" class="qr-image" />
          </div>
          
          <div class="download-section">
            <button @click="downloadQR" class="download-btn">
              <i class="fas fa-download"></i> {{ $t('tools.qrGenerator.ui.downloadQr') }}
            </button>
          </div>
        </div>
      </div>

      <div class="section">
        <h3><i class="fas fa-info-circle"></i> {{ $t('tools.qrGenerator.ui.usageInstructions') }}</h3>
        <div class="info-content">
          <div class="info-card">
            <h4>{{ $t('tools.qrGenerator.ui.supportedContentTypes') }}</h4>
            <ul>
              <li>{{ $t('tools.qrGenerator.ui.urlLink') }}</li>
              <li>{{ $t('tools.qrGenerator.ui.email') }}</li>
              <li>{{ $t('tools.qrGenerator.ui.phone') }}</li>
              <li>{{ $t('tools.qrGenerator.ui.wifi') }}</li>
              <li>{{ $t('tools.qrGenerator.ui.plainText') }}</li>
            </ul>
          </div>
          <div class="info-card">
            <h4>{{ $t('tools.qrGenerator.ui.errorLevelDescription') }}</h4>
            <ul>
              <li>{{ $t('tools.qrGenerator.ui.errorLevelLDesc') }}</li>
              <li>{{ $t('tools.qrGenerator.ui.errorLevelMDesc') }}</li>
              <li>{{ $t('tools.qrGenerator.ui.errorLevelQDesc') }}</li>
              <li>{{ $t('tools.qrGenerator.ui.errorLevelHDesc') }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import messageService from '../../utils/message.js'
import QRCode from 'qrcode'

export default {
  name: 'QRGenerator',
  props: {
    toolData: Object
  },
  setup() {
    const { t } = useI18n()
    const qrText = ref('')
    const qrSize = ref(300)
    const errorLevel = ref('M')
    const qrDataUrl = ref('')

    const loadExample = () => {
      qrText.value = `🛠️ 通用工具瑞士军刀
https://tools.example.com
一站式实用工具集合，包含50+个常用工具
📧 contact@example.com`
      
      setTimeout(() => {
        generateQR()
      }, 500)
    }

    const generateQR = async () => {
      const text = qrText.value.trim()
      
      if (!text) {
        messageService.warning(t('common.warning'))
        return
      }
      
      try {
        const dataUrl = await QRCode.toDataURL(text, {
          width: qrSize.value,
          height: qrSize.value,
          margin: 2,
          errorCorrectionLevel: errorLevel.value,
          type: 'image/png',
          quality: 0.92,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        })
        
        qrDataUrl.value = dataUrl
      } catch (error) {
        console.error(t('tools.qrGenerator.ui.generationFailed'), error)
        messageService.error(t('tools.qrGenerator.ui.generationFailed') + error.message)
      }
    }

    const downloadQR = () => {
      if (!qrDataUrl.value) return
      
      const link = document.createElement('a')
      link.download = `qrcode_${Date.now()}.png`
      link.href = qrDataUrl.value
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    return {
      qrText,
      qrSize,
      errorLevel,
      qrDataUrl,
      loadExample,
      generateQR,
      downloadQR
    }
  }
}
</script>

<style scoped>
.qr-generator-tool {
  max-width: 800px;
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

.tool-header p {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.section {
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid var(--border-color);
}

.section h3 {
  color: var(--primary-color);
  margin-bottom: 10px;
  font-size: 1.2rem;
}

.input-group {
  margin-bottom: 10px;
}

.input-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: 500;
  color: var(--text-primary);
}

.text-input {
  width: 100%;
  padding: 10px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.3s;
  background: var(--bg-primary);
  color: var(--text-primary);
}

.text-input:focus {
  border-color: var(--primary-color);
  outline: none;
}

.options-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 10px;
}

.option-item label {
  display: block;
  margin-bottom: 10px;
  font-weight: 500;
  color: var(--text-primary);
}

.size-select,
.error-select {
  width: 100%;
  padding: 10px;
  border: 2px solid var(--border-color);
  border-radius: 6px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 14px;
  cursor: pointer;
}

.size-select:focus,
.error-select:focus {
  border-color: var(--primary-color);
  outline: none;
}

.action-buttons {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.generate-btn,
.example-btn,
.download-btn {
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.generate-btn {
  background: var(--primary-color);
  color: white;
}

.generate-btn:hover:not(:disabled) {
  background: var(--primary-hover);
  transform: translateY(-2px);
}

.generate-btn:disabled {
  background: var(--text-disabled);
  cursor: not-allowed;
  transform: none;
}

.example-btn {
  background: var(--accent-color);
  color: white;
}

.example-btn:hover {
  background: var(--accent-hover);
  transform: translateY(-2px);
}

.download-btn {
  background: var(--success-color, #28a745);
  color: white;
}

.download-btn:hover {
  background: var(--success-hover, #218838);
  transform: translateY(-2px);
}

.qr-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.qr-display {
  background: white;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 2px solid var(--border-color);
}

.qr-image {
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.download-section {
  text-align: center;
}

.info-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.info-card {
  background: var(--bg-primary);
  padding: 10px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.info-card h4 {
  color: var(--primary-color);
  margin-bottom: 10px;
  font-size: 1rem;
}

.info-card ul {
  margin: 0;
  padding-left: 20px;
}

.info-card li {
  margin-bottom: 10px;
  color: var(--text-primary);
  font-size: 0.9rem;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .qr-generator-tool {
    padding: 10px;
  }
  
  .section {
    padding: 10px;
  }
  
  .options-group {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .action-buttons button {
    width: 100%;
    justify-content: center;
  }
  
  .qr-result {
    text-align: center;
  }
  
  .info-content {
    grid-template-columns: 1fr;
  }
}
</style> 