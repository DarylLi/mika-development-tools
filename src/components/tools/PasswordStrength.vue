<template>
  <div class="single-tool">
    <h2><i class="fas fa-shield-alt"></i> {{ $t('tools.passwordStrength.ui.title') }}</h2>
    <p>{{ $t('tools.passwordStrength.ui.description') }}</p>
    
    <div class="example-section">
      <button class="example-btn" @click="loadExample">
        <i class="fas fa-lightbulb"></i> {{ $t('tools.passwordStrength.ui.loadExample') }}
      </button>
    </div>
    
    <input 
      v-model="password" 
      @input="checkStrength"
      type="password" 
      :placeholder="$t('tools.passwordStrength.ui.placeholder')" 
      class="password-input"
    >
    
    <div class="show-password">
      <label>
        <input v-model="showPassword" type="checkbox">
        {{ $t('tools.passwordStrength.ui.showPassword') }}
      </label>
    </div>
    
    <div v-if="showPassword" class="password-display">{{ password }}</div>

    <div v-if="strength" class="result-display">
      <div class="strength-meter">
        <div class="strength-label">{{ $t('tools.passwordStrength.ui.passwordStrength') }}</div>
        <div class="strength-bar">
          <div 
            class="strength-fill" 
            :class="strength.level"
            :style="{ width: strength.score + '%' }"
          ></div>
        </div>
        <div class="strength-text" :class="strength.level">
          {{ strength.text }} ({{ strength.score }}/100)
        </div>
      </div>

      <div class="password-analysis">
        <h4>{{ $t('tools.passwordStrength.ui.passwordAnalysis') }}</h4>
        <div class="analysis-grid">
          <div class="analysis-item" :class="{ passed: analysis.length }">
            <i :class="analysis.length ? 'fas fa-check' : 'fas fa-times'"></i>
            {{ $t('tools.passwordStrength.ui.length', { count: password.length }) }} {{ analysis.length ? '✓' : $t('tools.passwordStrength.ui.lengthSuggestion') }}
          </div>
          <div class="analysis-item" :class="{ passed: analysis.uppercase }">
            <i :class="analysis.uppercase ? 'fas fa-check' : 'fas fa-times'"></i>
            {{ $t('tools.passwordStrength.ui.uppercase') }} {{ analysis.uppercase ? '✓' : '✗' }}
          </div>
          <div class="analysis-item" :class="{ passed: analysis.lowercase }">
            <i :class="analysis.lowercase ? 'fas fa-check' : 'fas fa-times'"></i>
            {{ $t('tools.passwordStrength.ui.lowercase') }} {{ analysis.lowercase ? '✓' : '✗' }}
          </div>
          <div class="analysis-item" :class="{ passed: analysis.numbers }">
            <i :class="analysis.numbers ? 'fas fa-check' : 'fas fa-times'"></i>
            {{ $t('tools.passwordStrength.ui.numbers') }} {{ analysis.numbers ? '✓' : '✗' }}
          </div>
          <div class="analysis-item" :class="{ passed: analysis.symbols }">
            <i :class="analysis.symbols ? 'fas fa-check' : 'fas fa-times'"></i>
            {{ $t('tools.passwordStrength.ui.symbols') }} {{ analysis.symbols ? '✓' : '✗' }}
          </div>
          <div class="analysis-item" :class="{ passed: !analysis.common }">
            <i :class="!analysis.common ? 'fas fa-check' : 'fas fa-times'"></i>
            {{ analysis.common ? $t('tools.passwordStrength.ui.commonPassword') : $t('tools.passwordStrength.ui.uncommonPassword') }}
          </div>
        </div>
      </div>

      <div v-if="suggestions.length" class="suggestions">
        <h4>{{ $t('tools.passwordStrength.ui.suggestions') }}</h4>
        <ul>
          <li v-for="suggestion in suggestions" :key="suggestion">{{ suggestion }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'PasswordStrength',
  props: {
    toolData: Object
  },
  setup() {
    const { t } = useI18n()
    const password = ref('')
    const showPassword = ref(false)

    // 常见密码列表（简化版）
    const commonPasswords = [
      'password', '123456', '123456789', 'qwerty', 'abc123', 
      'password123', 'admin', 'letmein', 'welcome', '123123'
    ]

    // 密码分析
    const analysis = computed(() => {
      if (!password.value) return {}
      
      return {
        length: password.value.length >= 8,
        uppercase: /[A-Z]/.test(password.value),
        lowercase: /[a-z]/.test(password.value),
        numbers: /\d/.test(password.value),
        symbols: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password.value),
        common: commonPasswords.includes(password.value.toLowerCase())
      }
    })

    // 密码强度计算
    const strength = computed(() => {
      if (!password.value) return null
      
      let score = 0
      
      // 长度评分
      if (password.value.length >= 8) score += 25
      if (password.value.length >= 12) score += 10
      if (password.value.length >= 16) score += 10
      
      // 字符类型评分
      if (analysis.value.uppercase) score += 15
      if (analysis.value.lowercase) score += 15
      if (analysis.value.numbers) score += 15
      if (analysis.value.symbols) score += 15
      
      // 扣分项
      if (analysis.value.common) score -= 30
      if (password.value.length < 6) score -= 20
      
      score = Math.max(0, Math.min(100, score))
      
      let level, text
      if (score < 30) {
        level = 'weak'
        text = t('tools.passwordStrength.ui.weak')
      } else if (score < 60) {
        level = 'medium'
        text = t('tools.passwordStrength.ui.medium')
      } else if (score < 80) {
        level = 'strong'
        text = t('tools.passwordStrength.ui.strong')
      } else {
        level = 'very-strong'
        text = t('tools.passwordStrength.ui.veryStrong')
      }
      
      return { score, level, text }
    })

    // 改进建议
    const suggestions = computed(() => {
      if (!password.value) return []
      
      const tips = []
      if (!analysis.value.length) tips.push(t('tools.passwordStrength.ui.increaseLength'))
      if (!analysis.value.uppercase) tips.push(t('tools.passwordStrength.ui.addUppercase'))
      if (!analysis.value.lowercase) tips.push(t('tools.passwordStrength.ui.addLowercase'))
      if (!analysis.value.numbers) tips.push(t('tools.passwordStrength.ui.addNumbers'))
      if (!analysis.value.symbols) tips.push(t('tools.passwordStrength.ui.addSymbols'))
      if (analysis.value.common) tips.push(t('tools.passwordStrength.ui.avoidCommon'))
      if (password.value.length > 0 && password.value.length < 6) tips.push(t('tools.passwordStrength.ui.tooShort'))
      
      return tips
    })

    const checkStrength = () => {
      // 触发计算
    }

    const loadExample = () => {
      password.value = 'MyStr0ng!P@ssw0rd'
      checkStrength()
    }

    return {
      password,
      showPassword,
      analysis,
      strength,
      suggestions,
      checkStrength,
      loadExample
    }
  }
}
</script>

<style scoped>
.password-input {
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  font-size: 1rem;
}

.show-password {
  margin-bottom: 15px;
}

.show-password label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.password-display {
  background: #f3f4f6;
  padding: 10px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  margin-bottom: 15px;
  border: 1px solid #e5e7eb;
}

.strength-meter {
  margin-bottom: 20px;
}

.strength-label {
  font-weight: 600;
  margin-bottom: 8px;
}

.strength-bar {
  width: 100%;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}

.strength-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.strength-fill.weak { background: #ef4444; }
.strength-fill.medium { background: #f59e0b; }
.strength-fill.strong { background: #10b981; }
.strength-fill.very-strong { background: #059669; }

.strength-text {
  font-weight: 600;
}

.strength-text.weak { color: #ef4444; }
.strength-text.medium { color: #f59e0b; }
.strength-text.strong { color: #10b981; }
.strength-text.very-strong { color: #059669; }

.password-analysis {
  margin-bottom: 20px;
}

.analysis-grid {
  display: grid;
  gap: 8px;
  margin-top: 10px;
}

.analysis-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 4px;
  background: #fef2f2;
  color: #dc2626;
}

.analysis-item.passed {
  background: #f0fdf4;
  color: #16a34a;
}

.suggestions {
  background: #fefce8;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #fde047;
}

.suggestions h4 {
  margin: 0 0 10px 0;
  color: #a16207;
}

.suggestions ul {
  margin: 0;
  padding-left: 20px;
  color: #a16207;
}

.suggestions li {
  margin-bottom: 5px;
}
/* Example Section 样式 */
.example-section {
  margin-top: 10px;
}
/* Input 输入框统一样式 */
/* Example Button 样式 */
.example-btn {
  margin-right: 10px;
}
/* Checkbox 统一样式 */
input[type="checkbox"] {
  width: 20px;
  margin-bottom: 0px;
}
/* Checkbox 统一样式 */
input[type="checkbox"] {
  width: 20px;
  margin-bottom: 0px;
}
/* Input 和 Select 统一样式 */
input[type="text"],
input[type="number"],
input[type="email"],
input[type="password"],
input[type="url"],
input[type="search"],
input[type="tel"],
select {
  background: #fff;
}
</style>





