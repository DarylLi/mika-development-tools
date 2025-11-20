<template>
  <div class="single-tool">
    <h2><i class="fas fa-link"></i> {{ $t('tools.urlConverter.ui.title') }}</h2>
    
    <div class="example-section">
      <button class="example-btn" @click="loadExample">
        <i class="fas fa-lightbulb"></i> {{ $t('tools.urlConverter.ui.loadExample') }}
      </button>
    </div>
    
    <textarea v-model="urlInput" :placeholder="$t('tools.urlConverter.ui.placeholder')"></textarea>
    
    <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
      <button @click="encode">{{ $t('tools.urlConverter.ui.encode') }}</button>
      <button @click="decode">{{ $t('tools.urlConverter.ui.decode') }}</button>
    </div>
    
    <div class="result-display">{{ result }}</div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'UrlConverter',
  props: {
    toolData: Object
  },
  setup() {
    const { t } = useI18n()
    const urlInput = ref('')
    const result = ref('')

    const loadExample = () => {
      urlInput.value = 'https://example.com/search?q=Vue3 工具&type=开发工具&category=前端框架'
      
      setTimeout(() => {
        encode()
      }, 500)
    }

    const encode = () => {
      try {
        result.value = encodeURIComponent(urlInput.value)
      } catch (error) {
        result.value = t('tools.urlConverter.ui.encodeFailed') + error.message
      }
    }

    const decode = () => {
      try {
        result.value = decodeURIComponent(urlInput.value)
      } catch (error) {
        result.value = t('tools.urlConverter.ui.decodeFailed') + error.message
      }
    }

    return {
      urlInput,
      result,
      loadExample,
      encode,
      decode
    }
  }
}
</script> 