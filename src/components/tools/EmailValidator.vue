<template>
  <div class="tool-container">
    <div class="tool-header">
      <div class="header-icon">📧</div>
      <h2>{{ $t('tools.emailValidator.ui.title') }}</h2>
      <p>{{ $t('tools.emailValidator.ui.description') }}</p>
      
      <div class="example-section">
        <span class="example-label">{{ $t('tools.emailValidator.ui.quickStart') }}</span>
        <button @click="loadExample('valid')" class="example-btn">
          <i class="fas fa-check"></i> {{ $t('tools.emailValidator.ui.validEmail') }}
        </button>
        <button @click="loadExample('invalid')" class="example-btn">
          <i class="fas fa-times"></i> {{ $t('tools.emailValidator.ui.invalidEmail') }}
        </button>
        <button @click="loadExample('batch')" class="example-btn">
          <i class="fas fa-list"></i> {{ $t('tools.emailValidator.ui.batchValidation') }}
        </button>
      </div>
    </div>

    <div class="input-card">
      <div class="card-header">
        <h3><i class="fas fa-envelope"></i> {{ $t('tools.emailValidator.ui.emailInput') }}</h3>
        <div class="input-actions">
          <button @click="pasteFromClipboard" class="action-btn">
            <i class="fas fa-paste"></i> {{ $t('tools.emailValidator.ui.paste') }}
          </button>
          <button @click="clearInput" class="action-btn">
            <i class="fas fa-trash"></i> {{ $t('tools.emailValidator.ui.clear') }}
          </button>
          <button @click="validateEmails" class="action-btn validate-btn">
            <i class="fas fa-check-circle"></i> {{ $t('tools.emailValidator.ui.validate') }}
          </button>
        </div>
      </div>
      
      <div class="input-section">
        <div class="input-tabs">
          <button 
            @click="inputMode = 'single'"
            class="tab-btn"
            :class="{ active: inputMode === 'single' }"
          >
            <i class="fas fa-envelope"></i> {{ $t('tools.emailValidator.ui.singleEmail') }}
          </button>
          <button 
            @click="inputMode = 'batch'"
            class="tab-btn"
            :class="{ active: inputMode === 'batch' }"
          >
            <i class="fas fa-list"></i> {{ $t('tools.emailValidator.ui.batchValidation') }}
          </button>
        </div>
        
        <input
          v-if="inputMode === 'single'"
          v-model="singleEmail"
          type="email"
          :placeholder="$t('tools.emailValidator.ui.emailPlaceholder')"
          class="email-input"
          @input="validateSingle"
        />
        
        <textarea
          v-if="inputMode === 'batch'"
          v-model="batchEmails"
          :placeholder="$t('tools.emailValidator.ui.batchPlaceholder')"
          class="batch-input"
          @input="validateBatch"
        ></textarea>
        
        <div class="input-info">
          <div v-if="inputMode === 'single'" class="single-status">
            <div class="validation-status" :class="singleResult?.isValid ? 'valid' : 'invalid'">
              <i :class="singleResult?.isValid ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'"></i>
              {{ singleResult?.message || $t('tools.emailValidator.ui.waitingInput') }}
            </div>
          </div>
          
          <div v-if="inputMode === 'batch'" class="batch-stats">
            <span>{{ $t('tools.emailValidator.ui.total') }} {{ batchResults.length }}</span>
            <span>{{ $t('tools.emailValidator.ui.valid') }} {{ validCount }}</span>
            <span>{{ $t('tools.emailValidator.ui.invalid') }} {{ invalidCount }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="singleResult && inputMode === 'single'" class="result-card">
      <div class="card-header">
        <h3><i class="fas fa-search"></i> {{ $t('tools.emailValidator.ui.validationResult') }}</h3>
        <div class="result-actions">
          <button @click="copyResult" class="action-btn">
            <i class="fas fa-copy"></i> {{ $t('tools.emailValidator.ui.copyResult') }}
          </button>
        </div>
      </div>
      
      <div class="single-result">
        <div class="result-summary" :class="singleResult.isValid ? 'valid' : 'invalid'">
          <div class="result-icon">
            <i :class="singleResult.isValid ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
          </div>
          <div class="result-text">
            <h4>{{ singleResult.isValid ? $t('tools.emailValidator.ui.emailFormatCorrect') : $t('tools.emailValidator.ui.emailFormatError') }}</h4>
            <p>{{ singleResult.message }}</p>
          </div>
        </div>

        <div class="result-details">
          <div class="detail-section">
            <h5><i class="fas fa-info-circle"></i> {{ $t('tools.emailValidator.ui.emailInfo') }}</h5>
            <div class="detail-grid">
              <div class="detail-item">
                <label>{{ $t('tools.emailValidator.ui.fullEmail') }}</label>
                <span class="value">{{ singleResult.email }}</span>
              </div>
              <div class="detail-item" v-if="singleResult.parts">
                <label>{{ $t('tools.emailValidator.ui.username') }}</label>
                <span class="value">{{ singleResult.parts.username }}</span>
              </div>
              <div class="detail-item" v-if="singleResult.parts">
                <label>{{ $t('tools.emailValidator.ui.domain') }}</label>
                <span class="value">{{ singleResult.parts.domain }}</span>
              </div>
              <div class="detail-item" v-if="singleResult.provider">
                <label>{{ $t('tools.emailValidator.ui.emailProvider') }}</label>
                <span class="value provider">{{ singleResult.provider }}</span>
              </div>
            </div>
          </div>

          <div class="detail-section" v-if="singleResult.checks">
            <h5><i class="fas fa-list-check"></i> {{ $t('tools.emailValidator.ui.checkItems') }}</h5>
            <div class="checks-list">
              <div v-for="check in singleResult.checks" :key="check.name" 
                   class="check-item" 
                   :class="{ pass: check.pass, fail: !check.pass }">
                <i :class="check.pass ? 'fas fa-check' : 'fas fa-times'"></i>
                <span>{{ check.description }}</span>
              </div>
            </div>
          </div>

          <div class="detail-section" v-if="singleResult.suggestions?.length > 0">
            <h5><i class="fas fa-lightbulb"></i> {{ $t('tools.emailValidator.ui.suggestions') }}</h5>
            <div class="suggestions-list">
              <div v-for="suggestion in singleResult.suggestions" :key="suggestion" class="suggestion-item">
                <i class="fas fa-arrow-right"></i>
                <span>{{ suggestion }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="batchResults.length > 0 && inputMode === 'batch'" class="batch-card">
      <div class="card-header">
        <h3><i class="fas fa-list"></i> {{ $t('tools.emailValidator.ui.batchValidationResult') }}</h3>
        <div class="batch-actions">
          <button @click="exportResults" class="action-btn">
            <i class="fas fa-download"></i> {{ $t('tools.emailValidator.ui.exportResults') }}
          </button>
          <button @click="copyValidEmails" class="action-btn">
            <i class="fas fa-copy"></i> {{ $t('tools.emailValidator.ui.copyValidEmails') }}
          </button>
        </div>
      </div>
      
      <div class="batch-filters">
        <button 
          @click="filter = 'all'"
          class="filter-btn"
          :class="{ active: filter === 'all' }"
        >
          {{ $t('tools.emailValidator.ui.all') }} ({{ batchResults.length }})
        </button>
        <button 
          @click="filter = 'valid'"
          class="filter-btn valid"
          :class="{ active: filter === 'valid' }"
        >
          {{ $t('tools.emailValidator.ui.valid') }} ({{ validCount }})
        </button>
        <button 
          @click="filter = 'invalid'"
          class="filter-btn invalid"
          :class="{ active: filter === 'invalid' }"
        >
          {{ $t('tools.emailValidator.ui.invalid') }} ({{ invalidCount }})
        </button>
      </div>

      <div class="results-table">
        <div class="table-header">
          <span>{{ $t('tools.emailValidator.ui.emailAddress') }}</span>
          <span>{{ $t('tools.emailValidator.ui.status') }}</span>
          <span>{{ $t('tools.emailValidator.ui.issueDescription') }}</span>
        </div>
        <div class="table-body">
          <div v-for="result in filteredResults" :key="result.email" 
               class="result-row" 
               :class="{ valid: result.isValid, invalid: !result.isValid }">
            <span class="email-cell">{{ result.email }}</span>
            <span class="status-cell">
              <i :class="result.isValid ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
              {{ result.isValid ? $t('tools.emailValidator.ui.valid') : $t('tools.emailValidator.ui.invalid') }}
            </span>
            <span class="message-cell">{{ result.message }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="success" class="success-card">
      <i class="fas fa-check-circle"></i> {{ success }}
    </div>

    <div class="help-card">
      <h4><i class="fas fa-info-circle"></i> 使用说明</h4>
      <div class="help-content">
        <div class="help-section">
          <h5>验证规则：</h5>
          <ul>
            <li>基本格式检查 (含有@符号)</li>
            <li>用户名格式验证</li>
            <li>域名格式验证</li>
            <li>特殊字符检查</li>
            <li>长度限制检查</li>
            <li>常见错误检测</li>
          </ul>
        </div>
        
        <div class="help-section">
          <h5>邮箱格式示例：</h5>
          <div class="examples">
            <div class="example-item valid">
              <i class="fas fa-check"></i>
              <span>user@example.com</span>
            </div>
            <div class="example-item valid">
              <i class="fas fa-check"></i>
              <span>test.email@domain.co.uk</span>
            </div>
            <div class="example-item invalid">
              <i class="fas fa-times"></i>
              <span>invalid.email</span>
            </div>
            <div class="example-item invalid">
              <i class="fas fa-times"></i>
              <span>user@</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'EmailValidator',
  setup() {
    const { t } = useI18n()
    const inputMode = ref('single')
    const singleEmail = ref('')
    const batchEmails = ref('')
    const singleResult = ref(null)
    const batchResults = ref([])
    const filter = ref('all')
    const success = ref('')

    const validCount = computed(() => batchResults.value.filter(r => r.isValid).length)
    const invalidCount = computed(() => batchResults.value.filter(r => !r.isValid).length)

    const filteredResults = computed(() => {
      if (filter.value === 'valid') return batchResults.value.filter(r => r.isValid)
      if (filter.value === 'invalid') return batchResults.value.filter(r => !r.isValid)
      return batchResults.value
    })

    const emailProviders = {
      'gmail.com': 'Gmail',
      'outlook.com': 'Outlook',
      'hotmail.com': 'Hotmail',
      'yahoo.com': 'Yahoo',
      'qq.com': 'QQ邮箱',
      '163.com': '网易邮箱',
      '126.com': '网易邮箱',
      'sina.com': '新浪邮箱',
      'foxmail.com': 'Foxmail',
      'sohu.com': '搜狐邮箱'
    }

    const examples = {
      valid: 'user@example.com',
      invalid: 'invalid.email.address',
      batch: `john@example.com
jane.doe@gmail.com
invalid-email
test@domain.co.uk
user@
@domain.com
valid.email@test.org`
    }

    const loadExample = (type) => {
      if (type === 'batch') {
        inputMode.value = 'batch'
        batchEmails.value = examples[type]
        validateBatch()
      } else {
        inputMode.value = 'single'
        singleEmail.value = examples[type]
        validateSingle()
      }
    }

    const validateEmail = (email) => {
      const trimmedEmail = email.trim()
      
      if (!trimmedEmail) {
        return {
          email: trimmedEmail,
          isValid: false,
          message: '邮箱地址不能为空'
        }
      }

      const result = {
        email: trimmedEmail,
        isValid: false,
        message: '',
        parts: null,
        provider: null,
        checks: [],
        suggestions: []
      }

      // Basic format check
      const basicPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const hasAtSymbol = trimmedEmail.includes('@')
      const atCount = (trimmedEmail.match(/@/g) || []).length

      result.checks.push({
        name: 'hasAt',
        description: '包含@符号',
        pass: hasAtSymbol
      })

      result.checks.push({
        name: 'singleAt',
        description: '只有一个@符号',
        pass: atCount === 1
      })

      if (!hasAtSymbol) {
        result.message = '缺少@符号'
        result.suggestions.push('邮箱地址必须包含@符号')
        return result
      }

      if (atCount !== 1) {
        result.message = '@符号数量错误'
        result.suggestions.push('邮箱地址只能包含一个@符号')
        return result
      }

      // Split email into parts
      const [username, domain] = trimmedEmail.split('@')
      result.parts = { username, domain }

      // Username validation
      const usernameValid = username && username.length > 0 && username.length <= 64
      result.checks.push({
        name: 'usernameLength',
        description: '用户名长度合理 (1-64字符)',
        pass: usernameValid
      })

      const usernamePattern = /^[a-zA-Z0-9._-]+$/
      const usernameChars = usernamePattern.test(username)
      result.checks.push({
        name: 'usernameChars',
        description: '用户名字符合法',
        pass: usernameChars
      })

      // Domain validation
      const domainValid = domain && domain.length > 0 && domain.length <= 255
      result.checks.push({
        name: 'domainLength',
        description: '域名长度合理 (1-255字符)',
        pass: domainValid
      })

      const domainPattern = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      const domainFormat = domainPattern.test(domain)
      result.checks.push({
        name: 'domainFormat',
        description: '域名格式正确',
        pass: domainFormat
      })

      // Overall format validation
      const overallValid = basicPattern.test(trimmedEmail)
      result.checks.push({
        name: 'overallFormat',
        description: '整体格式正确',
        pass: overallValid
      })

      // Length check
      const lengthValid = trimmedEmail.length <= 320
      result.checks.push({
        name: 'totalLength',
        description: '总长度不超过320字符',
        pass: lengthValid
      })

      // Check for common issues
      if (trimmedEmail.startsWith('.') || trimmedEmail.endsWith('.')) {
        result.suggestions.push('邮箱地址不能以点号开始或结束')
      }

      if (trimmedEmail.includes('..')) {
        result.suggestions.push('邮箱地址不能包含连续的点号')
      }

      // Determine validity
      result.isValid = result.checks.every(check => check.pass)

      if (result.isValid) {
        result.message = '邮箱格式正确'
        
        // Identify provider
        if (emailProviders[domain]) {
          result.provider = emailProviders[domain]
        }
      } else {
        const failedChecks = result.checks.filter(check => !check.pass)
        result.message = failedChecks.map(check => check.description).join(', ') + ' 不符合要求'
      }

      return result
    }

    const validateSingle = () => {
      if (singleEmail.value.trim()) {
        singleResult.value = validateEmail(singleEmail.value)
      } else {
        singleResult.value = null
      }
    }

    const validateBatch = () => {
      const emails = batchEmails.value
        .split('\n')
        .map(email => email.trim())
        .filter(email => email.length > 0)

      batchResults.value = emails.map(email => validateEmail(email))
    }

    const validateEmails = () => {
      if (inputMode.value === 'single') {
        validateSingle()
      } else {
        validateBatch()
      }
    }

    const pasteFromClipboard = async () => {
      try {
        const text = await navigator.clipboard.readText()
        if (inputMode.value === 'single') {
          singleEmail.value = text.trim()
          validateSingle()
        } else {
          batchEmails.value = text
          validateBatch()
        }
        success.value = '已从剪贴板粘贴'
        setTimeout(() => success.value = '', 3000)
      } catch (err) {
        console.error('无法访问剪贴板')
      }
    }

    const clearInput = () => {
      if (inputMode.value === 'single') {
        singleEmail.value = ''
        singleResult.value = null
      } else {
        batchEmails.value = ''
        batchResults.value = []
      }
    }

    const copyResult = () => {
      if (singleResult.value) {
        const text = `邮箱: ${singleResult.value.email}\n状态: ${singleResult.value.isValid ? '有效' : '无效'}\n描述: ${singleResult.value.message}`
        navigator.clipboard.writeText(text)
      success.value = t('tools.emailValidator.ui.validationResultCopied')
      setTimeout(() => success.value = '', 3000)
      }
    }

    const copyValidEmails = () => {
      const validEmails = batchResults.value
        .filter(result => result.isValid)
        .map(result => result.email)
        .join('\n')
      
      navigator.clipboard.writeText(validEmails)
      success.value = t('tools.emailValidator.ui.validEmailsCopied', { count: validCount.value })
      setTimeout(() => success.value = '', 3000)
    }

    const exportResults = () => {
      const csvContent = [
        'Email,Status,Message',
        ...batchResults.value.map(result => 
          `"${result.email}","${result.isValid ? 'Valid' : 'Invalid'}","${result.message}"`
        )
      ].join('\n')
      
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'email-validation-results.csv'
      a.click()
      URL.revokeObjectURL(url)
      
      success.value = t('tools.emailValidator.ui.resultsExported')
      setTimeout(() => success.value = '', 3000)
    }

    return {
      inputMode,
      singleEmail,
      batchEmails,
      singleResult,
      batchResults,
      filter,
      success,
      validCount,
      invalidCount,
      filteredResults,
      loadExample,
      validateSingle,
      validateBatch,
      validateEmails,
      pasteFromClipboard,
      clearInput,
      copyResult,
      copyValidEmails,
      exportResults,
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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.tool-header {
  text-align: center;
  margin-bottom: 10px;
  padding: 10px;
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
  padding: 10px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);
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
  margin: 0 0 24px 0;
  font-size: 16px;
  opacity: 0.9;
  line-height: 1.5;
}

.example-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;
}

.example-label {
  font-size: 14px;
  opacity: 0.8;
}

.example-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 10px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
}

.example-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.input-card, .result-card, .batch-card, .help-card, .success-card {
  background: white;
  border-radius: 16px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
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

.input-actions, .result-actions, .batch-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #4a5568;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 4px;
}

.action-btn:hover {
  background: #e2e8f0;
  transform: translateY(-1px);
}

.validate-btn {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
  border-color: #8b5cf6;
}

.validate-btn:hover {
  background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
  border-color: #7c3aed;
}

.input-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 10px;
  border-bottom: 1px solid #e2e8f0;
}

.tab-btn {
  background: none;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.tab-btn:hover {
  color: #374151;
  background: #f8fafc;
}

.tab-btn.active {
  color: #8b5cf6;
  border-bottom-color: #8b5cf6;
  background: #f8fafc;
}

.email-input {
  width: 100%;
  padding: 10px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: #f8fafc;
}

.email-input:focus {
  outline: none;
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  background: white;
}

.batch-input {
  width: 100%;
  min-height: 200px;
  padding: 10px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
  line-height: 1.5;
  resize: vertical;
  transition: all 0.3s ease;
  background: #f8fafc;
}

.batch-input:focus {
  outline: none;
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
  background: white;
}

.input-info {
  margin-top: 12px;
}

.validation-status {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
}

.validation-status.valid {
  color: #059669;
}

.validation-status.invalid {
  color: #dc2626;
}

.batch-stats {
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: #6b7280;
}

.single-result {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.result-summary {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px;
  border-radius: 12px;
  border: 2px solid;
}

.result-summary.valid {
  background: #f0fdf4;
  border-color: #bbf7d0;
  color: #166534;
}

.result-summary.invalid {
  background: #fef2f2;
  border-color: #fecaca;
  color: #991b1b;
}

.result-icon {
  font-size: 32px;
}

.result-text h4 {
  margin: 0 0 4px 0;
  font-size: 18px;
  font-weight: 600;
}

.result-text p {
  margin: 0;
  font-size: 14px;
  opacity: 0.8;
}

.result-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.detail-section {
  background: #f8fafc;
  padding: 10px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.detail-section h5 {
  margin: 0 0 12px 0;
  color: #2d3748;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.detail-item label {
  font-weight: 500;
  color: #4a5568;
  font-size: 14px;
}

.value {
  font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
  font-size: 14px;
  color: #1f2937;
  background: white;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #e2e8f0;
}

.value.provider {
  background: #eff6ff;
  color: #1e40af;
  border-color: #bfdbfe;
}

.checks-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.check-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  border-radius: 6px;
  font-size: 14px;
}

.check-item.pass {
  background: #dcfce7;
  color: #166534;
}

.check-item.fail {
  background: #fef2f2;
  color: #991b1b;
}

.suggestions-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.suggestion-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  background: #fef3c7;
  color: #92400e;
  border-radius: 6px;
  font-size: 14px;
}

.batch-filters {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
}

.filter-btn {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #4a5568;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  background: #e2e8f0;
}

.filter-btn.active {
  background: #8b5cf6;
  color: white;
  border-color: #8b5cf6;
}

.filter-btn.valid.active {
  background: #059669;
  border-color: #059669;
}

.filter-btn.invalid.active {
  background: #dc2626;
  border-color: #dc2626;
}

.results-table {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  gap: 16px;
  padding: 10px;
  background: #f8fafc;
  font-weight: 600;
  color: #374151;
  font-size: 14px;
  border-bottom: 1px solid #e2e8f0;
}

.table-body {
  max-height: 400px;
  overflow-y: auto;
}

.result-row {
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  gap: 16px;
  padding: 10px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.result-row:hover {
  background: #f8fafc;
}

.result-row.valid {
  border-left: 4px solid #059669;
}

.result-row.invalid {
  border-left: 4px solid #dc2626;
}

.email-cell {
  font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
  color: #1f2937;
  word-break: break-all;
}

.status-cell {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
}

.result-row.valid .status-cell {
  color: #059669;
}

.result-row.invalid .status-cell {
  color: #dc2626;
}

.message-cell {
  color: #6b7280;
}

.success-card {
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}

.help-card h4 {
  margin: 0 0 20px 0;
  color: #2d3748;
  display: flex;
  align-items: center;
  gap: 8px;
}

.help-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.help-section h5 {
  margin: 0 0 12px 0;
  color: #4a5568;
  font-size: 16px;
  font-weight: 600;
}

.help-section ul {
  margin: 0;
  padding-left: 20px;
}

.help-section li {
  margin-bottom: 10px;
  color: #4a5568;
  line-height: 1.4;
}

.examples {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.example-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  border-radius: 6px;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
  font-size: 14px;
}

.example-item.valid {
  background: #dcfce7;
  color: #166534;
}

.example-item.invalid {
  background: #fef2f2;
  color: #991b1b;
}

@media (max-width: 768px) {
  .tool-container {
    padding: 10px;
  }
  
  .help-content {
    grid-template-columns: 1fr;
  }
  
  .example-section {
    flex-direction: column;
    gap: 8px;
  }
  
  .input-actions, .result-actions, .batch-actions {
    flex-direction: column;
  }
  
  .batch-filters {
    flex-direction: column;
  }
  
  .table-header, .result-row {
    grid-template-columns: 1fr;
    gap: 8px;
  }
  
  .detail-grid {
    grid-template-columns: 1fr;
  }
}
</style> 