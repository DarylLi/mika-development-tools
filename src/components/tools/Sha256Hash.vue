<template>
  <div class="single-tool">
    <h2><i class="fas fa-shield-alt"></i> {{ $t('tools.sha256Hash.ui.title') }}</h2>
    <p>{{ $t('tools.sha256Hash.ui.description') }}</p>
    
    <div class="example-section">
      <button class="example-btn" @click="loadExample">
        <i class="fas fa-lightbulb"></i> {{ $t('tools.sha256Hash.ui.loadExample') }}
      </button>
    </div>
    
    <textarea v-model="inputText" :placeholder="$t('tools.sha256Hash.ui.placeholder')"></textarea>
    
    <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
      <button @click="calculateHash">{{ $t('tools.sha256Hash.ui.calculateSha256') }}</button>
      <button @click="clearText">{{ $t('tools.sha256Hash.ui.clear') }}</button>
    </div>
    
    <div class="result-display" v-if="result">
      <div class="hash-result">
        <label>{{ $t('tools.sha256Hash.ui.sha256HashValue') }}</label>
        <div class="hash-value">{{ result }}</div>
        <button @click="copyHash" class="copy-btn">
          <i class="fas fa-copy"></i> {{ $t('tools.sha256Hash.ui.copy') }}
        </button>
      </div>
    </div>

    <div class="info-section">
      <h4><i class="fas fa-info-circle"></i> {{ $t('tools.sha256Hash.ui.aboutSha256') }}</h4>
      <p>{{ $t('tools.sha256Hash.ui.sha256Info') }}</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import CryptoJS from 'crypto-js'

export default {
  name: 'Sha256Hash',
  props: {
    toolData: Object
  },
  setup() {
    const { t } = useI18n()
    const inputText = ref('')
    const result = ref('')

    const loadExample = () => {
      inputText.value = 'Hello, World!'
      calculateHash()
    }

    const calculateHash = () => {
      if (!inputText.value) {
        result.value = ''
        return
      }
      result.value = CryptoJS.SHA256(inputText.value).toString()
    }

    const clearText = () => {
      inputText.value = ''
      result.value = ''
    }

    const copyHash = async () => {
      try {
        await navigator.clipboard.writeText(result.value)
      } catch (e) {
        console.error(t('tools.sha256Hash.ui.copyFailed'), e)
      }
    }

    return {
      inputText,
      result,
      loadExample,
      calculateHash,
      clearText,
      copyHash
    }
  }
}
</script>

<style scoped>
.hash-result {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.hash-value {
  background: #f3f4f6;
  padding: 10px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  word-break: break-all;
  border: 1px solid #e5e7eb;
  font-size: 0.9rem;
}

.copy-btn {
  align-self: flex-start;
  padding: 6px 12px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}

.copy-btn:hover {
  background: #059669;
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
  margin: 0;
  color: #1e40af;
  line-height: 1.5;
}
</style> 