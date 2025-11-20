<template>
  <div class="single-tool">
    <h2><i class="fas fa-barcode"></i> {{ $t('tools.barcodeGenerator.ui.title') }}</h2>
    <p>{{ $t('tools.barcodeGenerator.ui.description') }}</p>
    
    <div class="example-section">
      <button class="example-btn" @click="loadExample">
        <i class="fas fa-lightbulb"></i> {{ $t('tools.barcodeGenerator.ui.loadExample') }}
      </button>
    </div>
    
    <textarea v-model="barcodeText" :placeholder="$t('tools.barcodeGenerator.ui.placeholder')"></textarea>
    
    <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
      <button @click="generateBarcode">{{ $t('tools.barcodeGenerator.ui.generateBarcode') }}</button>
      <button @click="clearText">{{ $t('tools.barcodeGenerator.ui.clear') }}</button>
    </div>
    
    <div v-if="barcodeResult" class="result-display">
      <div class="barcode-container">
        <h4>{{ $t('tools.barcodeGenerator.ui.generatedBarcode') }}</h4>
        <div class="barcode-display" v-html="barcodeResult"></div>
        <div class="barcode-text">{{ barcodeText }}</div>
        <button @click="downloadBarcode" class="download-btn">
          <i class="fas fa-download"></i> {{ $t('tools.barcodeGenerator.ui.downloadImage') }}
        </button>
      </div>
    </div>

    <div class="info-section">
      <h4><i class="fas fa-info-circle"></i> {{ $t('tools.barcodeGenerator.ui.aboutBarcode') }}</h4>
      <p>{{ $t('tools.barcodeGenerator.ui.barcodeInfo') }}</p>
      <p><strong>Code 128:</strong> {{ $t('tools.barcodeGenerator.ui.code128Info') }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import messageService from '../../utils/message.js'

export default {
  name: 'BarcodeGenerator',
  props: {
    toolData: Object
  },
  setup() {
    const { t } = useI18n()
    const barcodeText = ref('')
    const barcodeResult = ref('')

    // 简化的条形码生成（使用CSS模拟）
    const generateBarcode = () => {
      if (!barcodeText.value.trim()) {
        barcodeResult.value = ''
        return
      }

      // 简单的条形码样式生成
      const text = barcodeText.value.trim()
      let bars = ''
      
      // 为每个字符生成不同宽度的条纹
      for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i) % 10
        const pattern = generatePattern(charCode)
        bars += pattern
      }
      
      barcodeResult.value = `<div class="barcode-bars">${bars}</div>`
    }

    // 生成条形码图案
    const generatePattern = (code) => {
      const patterns = [
        '101010100', '110100100', '100110100', '110110000',
        '101100100', '110100100', '100100110', '100100100',
        '100110010', '110010100'
      ]
      
      const pattern = patterns[code] || patterns[0]
      let bars = ''
      
      for (let i = 0; i < pattern.length; i++) {
        const width = pattern[i] === '1' ? '2px' : '1px'
        const color = i % 2 === 0 ? '#000' : '#fff'
        bars += `<div class="bar" style="width: ${width}; background: ${color};"></div>`
      }
      
      return bars
    }

    const loadExample = () => {
      barcodeText.value = 'MIKA-TOOLS-123456'
      generateBarcode()
    }

    const clearText = () => {
      barcodeText.value = ''
      barcodeResult.value = ''
    }

    const downloadBarcode = () => {
      // 简单的下载功能提示
      messageService.info(t('common.info'))
    }

    return {
      barcodeText,
      barcodeResult,
      generateBarcode,
      loadExample,
      clearText,
      downloadBarcode
    }
  }
}
</script>

<style scoped>
.barcode-container {
  text-align: center;
}

.barcode-display {
  margin: 20px 0;
  padding: 20px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  display: inline-block;
}

.barcode-bars {
  display: flex;
  align-items: end;
  height: 60px;
  justify-content: center;
}

.bar {
  height: 100%;
  margin: 0;
}

.barcode-text {
  margin: 10px 0;
  font-family: 'Courier New', monospace;
  font-weight: bold;
}

.download-btn {
  padding: 8px 16px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 10px auto 0;
}

.info-section {
  margin-top: 20px;
  padding: 15px;
  background: #f0f9ff;
  border-radius: 8px;
  border: 1px solid #bae6fd;
}

.info-section h4 {
  margin: 0 0 10px 0;
  color: #1e40af;
}

.info-section p {
  margin: 5px 0;
  color: #1e40af;
  line-height: 1.5;
}
/* Example Section 样式 */
.example-section {
  margin-top: 10px;
}
/* Example Button 样式 */
.example-btn {
  margin-right: 10px;
}
/* Checkbox 统一样式 */
input[type="checkbox"] {
  width: 20px;
  margin-bottom: 0px;
}
</style>





