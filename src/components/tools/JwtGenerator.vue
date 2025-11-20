<template>
  <div class="jwt-generator-tool">
    <div class="tool-header">
      <h3><i class="fas fa-key"></i> {{ $t('tools.jwtGenerator.ui.title') }}</h3>
      <p>{{ $t('tools.jwtGenerator.ui.description') }}</p>
    </div>

    <div class="tool-content">
      <div class="input-section">
        <div class="jwt-inputs">
          <div class="input-group">
            <label>{{ $t('tools.jwtGenerator.ui.header') }}</label>
            <textarea v-model="header" class="code-input" placeholder='{"alg": "HS256", "typ": "JWT"}'></textarea>
          </div>
          <div class="input-group">
            <label>{{ $t('tools.jwtGenerator.ui.payload') }}</label>
            <textarea v-model="payload" class="code-input" placeholder='{"sub": "1234567890", "name": "John Doe", "iat": 1516239022}'></textarea>
          </div>
          <div class="input-group">
            <label>{{ $t('tools.jwtGenerator.ui.secretKey') }}</label>
            <input v-model="secret" type="text" class="secret-input" placeholder="your-256-bit-secret" />
          </div>
        </div>
        <div class="actions">
          <button @click="generateJWT" class="action-btn primary">
            <i class="fas fa-cog"></i> {{ $t('tools.jwtGenerator.ui.generateJWT') }}
          </button>
          <button @click="loadExample" class="action-btn">
            <i class="fas fa-lightbulb"></i> {{ $t('tools.jwtGenerator.ui.example') }}
          </button>
          <button @click="clearAll" class="action-btn">
            <i class="fas fa-eraser"></i> {{ $t('tools.jwtGenerator.ui.clear') }}
          </button>
        </div>
      </div>

      <div v-if="generatedJWT" class="output-section">
        <div class="section-header">
          <label>{{ $t('tools.jwtGenerator.ui.generatedJWT') }}</label>
          <button @click="copyJWT" class="copy-btn">
            <i class="fas fa-copy"></i> {{ $t('tools.jwtGenerator.ui.copy') }}
          </button>
        </div>
        <div class="jwt-output">
          <pre class="jwt-token">{{ generatedJWT }}</pre>
        </div>
        <div class="jwt-parts">
          <div class="jwt-part header">
            <h5>{{ $t('tools.jwtGenerator.ui.headerLabel') }}</h5>
            <pre>{{ formatJSON(decodedHeader) }}</pre>
          </div>
          <div class="jwt-part payload">
            <h5>{{ $t('tools.jwtGenerator.ui.payloadLabel') }}</h5>
            <pre>{{ formatJSON(decodedPayload) }}</pre>
          </div>
          <div class="jwt-part signature">
            <h5>{{ $t('tools.jwtGenerator.ui.signatureLabel') }}</h5>
            <pre>{{ signature }}</pre>
          </div>
        </div>
      </div>

      <div v-if="error" class="error-section">
        <i class="fas fa-exclamation-triangle"></i>
        <span>{{ error }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import CryptoJS from 'crypto-js'

export default {
  name: 'JwtGenerator',
  setup() {
    const { t } = useI18n()
    const header = ref('{"alg": "HS256", "typ": "JWT"}')
    const payload = ref('{"sub": "1234567890", "name": "John Doe", "iat": 1516239022}')
    const secret = ref('your-256-bit-secret')
    const generatedJWT = ref('')
    const error = ref('')

    const decodedHeader = computed(() => {
      try {
        return JSON.parse(header.value)
      } catch {
        return {}
      }
    })

    const decodedPayload = computed(() => {
      try {
        return JSON.parse(payload.value)
      } catch {
        return {}
      }
    })

    const signature = computed(() => {
      if (!generatedJWT.value) return ''
      return generatedJWT.value.split('.')[2] || ''
    })

    function base64UrlEncode(obj) {
      const str = typeof obj === 'string' ? obj : JSON.stringify(obj)
      return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
    }

    function generateJWT() {
      error.value = ''
      
      try {
        const headerObj = JSON.parse(header.value)
        const payloadObj = JSON.parse(payload.value)
        
        const encodedHeader = base64UrlEncode(headerObj)
        const encodedPayload = base64UrlEncode(payloadObj)
        
        const data = `${encodedHeader}.${encodedPayload}`
        const signature = CryptoJS.HmacSHA256(data, secret.value).toString(CryptoJS.enc.Base64)
          .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
        
        generatedJWT.value = `${data}.${signature}`
      } catch (e) {
        error.value = t('tools.jwtGenerator.ui.generateFailed') + ': ' + e.message
      }
    }

    function loadExample() {
      header.value = JSON.stringify({ alg: "HS256", typ: "JWT" }, null, 2)
      payload.value = JSON.stringify({
        sub: "1234567890",
        name: "John Doe",
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600
      }, null, 2)
      secret.value = 'your-256-bit-secret'
    }

    function clearAll() {
      header.value = ''
      payload.value = ''
      secret.value = ''
      generatedJWT.value = ''
      error.value = ''
    }

    async function copyJWT() {
      if (!generatedJWT.value) return
      try {
        await navigator.clipboard.writeText(generatedJWT.value)
      } catch (err) {
        console.error(t('tools.jwtGenerator.ui.copyFailed') + ':', err)
      }
    }

    function formatJSON(obj) {
      return JSON.stringify(obj, null, 2)
    }

    return {
      header,
      payload,
      secret,
      generatedJWT,
      error,
      decodedHeader,
      decodedPayload,
      signature,
      generateJWT,
      loadExample,
      clearAll,
      copyJWT,
      formatJSON
    }
  }
}
</script>

<style scoped>
.jwt-generator-tool {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}

.tool-header {
  text-align: center;
  margin-bottom: 10px;
  padding: 10px;
}

.tool-header h3 {
  font-size: 24px;
  margin-bottom: 10px;
  color: var(--text-primary);
}

.input-section {
  background: var(--bg-secondary);
  padding: 10px;
  border-radius: 12px;
  margin-bottom: 10px;
}

.jwt-inputs {
  display: grid;
  gap: 20px;
  margin-bottom: 10px;
}

.input-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
  color: var(--text-primary);
}

.code-input {
  width: 100%;
  height: 120px;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: 'Consolas', monospace;
  font-size: 14px;
  resize: vertical;
}

.secret-input {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: 'Consolas', monospace;
}

.actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.action-btn {
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}

.action-btn.primary {
  background: var(--accent-color);
  color: white;
}

.action-btn:not(.primary) {
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.action-btn:hover {
  transform: translateY(-2px);
}

.output-section {
  background: var(--bg-secondary);
  padding: 10px;
  border-radius: 12px;
  margin-bottom: 10px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.copy-btn {
  background: var(--accent-color);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}

.jwt-output {
  background: var(--bg-primary);
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
}

.jwt-token {
  font-family: 'Consolas', monospace;
  font-size: 12px;
  word-break: break-all;
  margin: 0;
  color: var(--text-primary);
}

.jwt-parts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px;
}

.jwt-part {
  background: var(--bg-primary);
  padding: 10px;
  border-radius: 8px;
}

.jwt-part h5 {
  margin-bottom: 10px;
  color: var(--text-primary);
}

.jwt-part pre {
  font-family: 'Consolas', monospace;
  font-size: 12px;
  margin: 0;
  color: var(--text-primary);
  word-break: break-all;
}

.error-section {
  background: #fff5f5;
  color: #e53e3e;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
}

@media (max-width: 768px) {
  .actions {
    flex-direction: column;
  }
  
  .section-header {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
  
  .jwt-parts {
    grid-template-columns: 1fr;
  }
}
</style> 