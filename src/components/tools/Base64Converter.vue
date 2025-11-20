<template>
  <div class="single-tool">
    <h2><i class="fas fa-code"></i> {{ $t('tools.base64Converter.ui.title') }}</h2>
    
    <div class="example-section">
      <button class="example-btn" @click="loadExample">
        <i class="fas fa-lightbulb"></i> {{ $t('tools.base64Converter.ui.loadExample') }}
      </button>
    </div>
    
    <textarea v-model="base64Input" :placeholder="$t('tools.base64Converter.ui.placeholder')"></textarea>
    
    <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
      <button @click="encode">{{ $t('tools.base64Converter.ui.encode') }}</button>
      <button @click="decode">{{ $t('tools.base64Converter.ui.decode') }}</button>
    </div>
    
    <div class="result-display">{{ result }}</div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'Base64Converter',
  props: {
    toolData: Object
  },
  setup() {
    const { t } = useI18n()
    const base64Input = ref('')
    const result = ref('')

    const loadExample = () => {
      base64Input.value = '通用工具瑞士军刀\nSwiss Army Tools\n一站式实用工具集合'
      
      setTimeout(() => {
        encode()
      }, 500)
    }

    const encode = () => {
      try {
        result.value = btoa(unescape(encodeURIComponent(base64Input.value)))
      } catch (error) {
        result.value = t('tools.base64Converter.ui.encodeFailed') + error.message
      }
    }

    const decode = () => {
      try {
        result.value = decodeURIComponent(escape(atob(base64Input.value)))
      } catch (error) {
        result.value = t('tools.base64Converter.ui.decodeFailed') + error.message
      }
    }

    return {
      base64Input,
      result,
      loadExample,
      encode,
      decode
    }
  }
}
</script> 