<template>
  <div class="base-n-converter">
    <!-- 基础转换 -->
    <div class="card">
      <h3><i class="fas fa-code"></i> {{ $t('tools.baseConverter.ui.title') }}</h3>
      <div class="conversion-section">
        <div class="input-section">
          <div class="input-group">
            <label>{{ $t('tools.baseConverter.ui.labelInput') }}</label>
            <input 
              v-model="inputValue" 
              type="text" 
              :placeholder="$t('tools.baseConverter.ui.placeholderInput')"
              @input="validateAndConvert"
              :class="{ error: hasError }"
            >
            <div v-if="hasError" class="error-message">{{ errorMessage }}</div>
          </div>
          <div class="base-selector">
            <label>{{ $t('tools.baseConverter.ui.labelFromBase') }}</label>
            <select v-model="fromBase" @change="validateAndConvert">
              <option v-for="base in availableBases" :key="base" :value="base">
                {{ base }}进制{{ getBaseLabel(base) }}
              </option>
            </select>
          </div>
        </div>

        <div class="convert-arrow">
          <i class="fas fa-arrow-right"></i>
        </div>

        <div class="output-section">
          <div class="base-grid">
            <div 
              v-for="base in targetBases" 
              :key="base" 
              class="base-result"
              :class="{ highlighted: base === toBase }"
            >
              <div class="base-label">{{ base }}进制{{ getBaseLabel(base) }}</div>
              <div class="base-value">
                {{ results[base] || '-' }}
                <button 
                  v-if="results[base]" 
                  @click="copyResult(results[base])" 
                  class="btn-copy"
                >
                  <i class="fas fa-copy"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 详细转换步骤 -->
    <div class="card" v-if="conversionSteps.length > 0">
      <h3><i class="fas fa-route"></i> {{ $t('tools.baseConverter.ui.conversionSteps') }}</h3>
      <div class="steps-container">
        <div class="step-section">
          <h4>{{ $t('tools.baseConverter.ui.step1') }} {{ fromBase }}{{ $t('tools.baseConverter.ui.stepBase') }} → 10{{ $t('tools.baseConverter.ui.stepBase') }}</h4>
          <div class="calculation-steps">
            <div v-for="(step, index) in conversionSteps" :key="index" class="step-item">
              <span class="step-formula">{{ step.formula }}</span>
              <span class="step-result">= {{ step.result }}</span>
            </div>
            <div class="final-decimal">
              <strong>{{ $t('tools.baseConverter.ui.decimalResult') }} {{ decimalValue }}</strong>
            </div>
          </div>
        </div>

        <div class="step-section" v-if="toBase !== 10">
          <h4>{{ $t('tools.baseConverter.ui.step2') }} 10{{ $t('tools.baseConverter.ui.stepBase') }} → {{ toBase }}{{ $t('tools.baseConverter.ui.stepBase') }}</h4>
          <div class="division-steps">
            <div v-for="(step, index) in divisionSteps" :key="index" class="division-item">
              {{ step.dividend }} ÷ {{ step.divisor }} = {{ step.quotient }} {{ $t('tools.baseConverter.ui.remainder') }} {{ step.remainder }} ({{ step.remainderChar }})
            </div>
            <div class="final-result">
              <strong>{{ toBase }}{{ $t('tools.baseConverter.ui.baseResult') }} {{ results[toBase] }}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 批量转换 -->
    <div class="card">
      <h3><i class="fas fa-list"></i> {{ $t('tools.baseConverter.ui.batchConvert') }}</h3>
      <div class="batch-controls">
        <div class="input-group">
          <label>{{ $t('tools.baseConverter.ui.labelBatchInput') }}</label>
          <textarea 
            v-model="batchInput" 
            placeholder="123&#10;456&#10;789"
            rows="5"
          ></textarea>
        </div>
        <div class="batch-settings">
          <div class="input-group">
            <label>{{ $t('tools.baseConverter.ui.labelFromBase') }}</label>
            <select v-model="batchFromBase">
              <option v-for="base in availableBases" :key="base" :value="base">
                {{ base }}进制
              </option>
            </select>
          </div>
          <div class="input-group">
            <label>{{ $t('tools.baseConverter.ui.labelToBase') }}</label>
            <select v-model="batchToBase">
              <option v-for="base in availableBases" :key="base" :value="base">
                {{ base }}进制
              </option>
            </select>
          </div>
        </div>
        <button @click="processBatch" class="btn-primary">
          <i class="fas fa-play"></i> {{ $t('tools.baseConverter.ui.batchConvertBtn') }}
        </button>
      </div>

      <div v-if="batchResults.length > 0" class="batch-results">
        <div class="result-header">
          <span>{{ $t('tools.baseConverter.ui.resultCount') }}{{ batchResults.length }}{{ $t('tools.baseConverter.ui.resultCountEnd') }}</span>
          <button @click="exportBatchResults" class="btn-secondary">
            <i class="fas fa-download"></i> {{ $t('tools.baseConverter.ui.exportCSV') }}
          </button>
        </div>
        <div class="results-table">
          <div class="table-header">
            <span>{{ $t('tools.baseConverter.ui.labelOriginal') }}{{ batchFromBase }}{{ $t('tools.baseConverter.ui.stepBase') }})</span>
            <span>{{ $t('tools.baseConverter.ui.labelConverted') }}{{ batchToBase }}{{ $t('tools.baseConverter.ui.stepBase') }})</span>
            <span>{{ $t('tools.baseConverter.ui.labelDecimal') }}</span>
          </div>
          <div v-for="(result, index) in batchResults" :key="index" class="table-row">
            <span>{{ result.original }}</span>
            <span>{{ result.converted }}</span>
            <span>{{ result.decimal }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 常用对照表 -->
    <div class="card">
      <h3><i class="fas fa-table"></i> {{ $t('tools.baseConverter.ui.referenceTable') }}</h3>
      <div class="reference-controls">
        <button @click="showPowersOf2 = !showPowersOf2" 
                :class="['btn-toggle', { active: showPowersOf2 }]">
          {{ $t('tools.baseConverter.ui.togglePowersOf2') }}
        </button>
        <button @click="showDecimalRange = !showDecimalRange" 
                :class="['btn-toggle', { active: showDecimalRange }]">
          {{ $t('tools.baseConverter.ui.toggleDecimalRange') }}
        </button>
      </div>

      <div v-if="showPowersOf2" class="reference-table">
        <h4>{{ $t('tools.baseConverter.ui.togglePowersOf2') }}</h4>
        <div class="powers-grid">
          <div class="table-header">
            <span>{{ $t('tools.baseConverter.ui.labelPower') }}</span>
            <span>{{ $t('tools.baseConverter.ui.labelDecimal') }}</span>
            <span>{{ $t('tools.baseConverter.ui.labelBinary') }}</span>
            <span>{{ $t('tools.baseConverter.ui.labelOctal') }}</span>
            <span>{{ $t('tools.baseConverter.ui.labelHex') }}</span>
          </div>
          <div v-for="n in 16" :key="n" class="table-row">
            <span>2^{{ n-1 }}</span>
            <span>{{ Math.pow(2, n-1) }}</span>
            <span>{{ convertBase(Math.pow(2, n-1), 10, 2) }}</span>
            <span>{{ convertBase(Math.pow(2, n-1), 10, 8) }}</span>
            <span>{{ convertBase(Math.pow(2, n-1), 10, 16) }}</span>
          </div>
        </div>
      </div>

      <div v-if="showDecimalRange" class="reference-table">
        <h4>{{ $t('tools.baseConverter.ui.toggleDecimalRange') }}</h4>
        <div class="range-grid">
          <div class="table-header">
            <span>十进制</span>
            <span>二进制</span>
            <span>八进制</span>
            <span>十六进制</span>
          </div>
          <div class="table-body">
            <div v-for="n in Math.min(rangeLimit, 256)" :key="n" class="table-row">
              <span>{{ n-1 }}</span>
              <span>{{ convertBase(n-1, 10, 2).padStart(8, '0') }}</span>
              <span>{{ convertBase(n-1, 10, 8) }}</span>
              <span>{{ convertBase(n-1, 10, 16).toUpperCase() }}</span>
            </div>
          </div>
          <div v-if="rangeLimit < 256" class="show-more">
            <button @click="rangeLimit += 50" class="btn-secondary">{{ $t('tools.baseConverter.ui.showMore') }}</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 知识科普 -->
    <div class="card info-card">
      <h3><i class="fas fa-info-circle"></i> {{ $t('tools.baseConverter.ui.knowledgeTitle') }}</h3>
      <div class="info-content">
        <div class="info-section">
          <h4>{{ $t('tools.baseConverter.ui.knowledgeCommon') }}</h4>
          <ul>
            <li>{{ $t('tools.baseConverter.ui.knowledgeCommon1') }}</li>
            <li>{{ $t('tools.baseConverter.ui.knowledgeCommon2') }}</li>
            <li>{{ $t('tools.baseConverter.ui.knowledgeCommon3') }}</li>
            <li>{{ $t('tools.baseConverter.ui.knowledgeCommon4') }}</li>
          </ul>
        </div>
        <div class="info-section">
          <h4>{{ $t('tools.baseConverter.ui.knowledgePrinciple') }}</h4>
          <ul>
            <li>{{ $t('tools.baseConverter.ui.knowledgePrinciple1') }}</li>
            <li>{{ $t('tools.baseConverter.ui.knowledgePrinciple2') }}</li>
            <li>{{ $t('tools.baseConverter.ui.knowledgePrinciple3') }}</li>
          </ul>
        </div>
        <div class="info-section">
          <h4>{{ $t('tools.baseConverter.ui.knowledgeApplication') }}</h4>
          <ul>
            <li>{{ $t('tools.baseConverter.ui.knowledgeApp1') }}</li>
            <li>{{ $t('tools.baseConverter.ui.knowledgeApp2') }}</li>
            <li>{{ $t('tools.baseConverter.ui.knowledgeApp3') }}</li>
            <li>{{ $t('tools.baseConverter.ui.knowledgeApp4') }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'BaseNConverter',
  setup() {
    const { t } = useI18n()
    const inputValue = ref('')
    const fromBase = ref(10)
    const toBase = ref(16)
    const hasError = ref(false)
    const errorMessage = ref('')
    const decimalValue = ref(0)
    const conversionSteps = ref([])
    const divisionSteps = ref([])
    
    // 批量转换
    const batchInput = ref('')
    const batchFromBase = ref(10)
    const batchToBase = ref(16)
    const batchResults = ref([])
    
    // 对照表控制
    const showPowersOf2 = ref(false)
    const showDecimalRange = ref(false)
    const rangeLimit = ref(50)

    const availableBases = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
    
    const targetBases = [2, 8, 10, 16]

    const results = reactive({})

    const getBaseLabel = (base) => {
      const labels = {
        2: `(${t('tools.baseConverter.ui.labelBinary')})`,
        8: `(${t('tools.baseConverter.ui.labelOctal')})`, 
        10: `(${t('tools.baseConverter.ui.labelDecimal')})`,
        16: `(${t('tools.baseConverter.ui.labelHex')})`
      }
      return labels[base] || ''
    }

    const getDigitChar = (digit) => {
      if (digit < 10) return digit.toString()
      return String.fromCharCode(65 + digit - 10) // A-Z
    }

    const getDigitValue = (char) => {
      if (char >= '0' && char <= '9') {
        return parseInt(char)
      }
      if (char >= 'A' && char <= 'Z') {
        return char.charCodeAt(0) - 65 + 10
      }
      if (char >= 'a' && char <= 'z') {
        return char.charCodeAt(0) - 97 + 10
      }
      return -1
    }

    const isValidNumber = (value, base) => {
      if (!value) return false
      const upperValue = value.toString().toUpperCase()
      for (let char of upperValue) {
        const digitValue = getDigitValue(char)
        if (digitValue === -1 || digitValue >= base) {
          return false
        }
      }
      return true
    }

    const convertToDecimal = (value, fromBase) => {
      const upperValue = value.toString().toUpperCase()
      let decimal = 0
      const steps = []
      
      for (let i = 0; i < upperValue.length; i++) {
        const digit = getDigitValue(upperValue[i])
        const power = upperValue.length - 1 - i
        const contribution = digit * Math.pow(fromBase, power)
        
        steps.push({
          formula: `${digit} × ${fromBase}^${power}`,
          result: contribution
        })
        
        decimal += contribution
      }
      
      conversionSteps.value = steps
      return decimal
    }

    const convertFromDecimal = (decimal, toBase) => {
      if (decimal === 0) return '0'
      
      let result = ''
      let remaining = decimal
      const steps = []
      
      while (remaining > 0) {
        const remainder = remaining % toBase
        const quotient = Math.floor(remaining / toBase)
        const remainderChar = getDigitChar(remainder)
        
        steps.push({
          dividend: remaining,
          divisor: toBase,
          quotient: quotient,
          remainder: remainder,
          remainderChar: remainderChar
        })
        
        result = remainderChar + result
        remaining = quotient
      }
      
      divisionSteps.value = steps
      return result
    }

    const convertBase = (value, fromBase, toBase) => {
      if (!value) return ''
      
      try {
        const decimal = convertToDecimal(value, fromBase)
        if (toBase === 10) return decimal.toString()
        return convertFromDecimal(decimal, toBase)
      } catch (error) {
        return ''
      }
    }

    const validateAndConvert = () => {
      hasError.value = false
      errorMessage.value = ''
      
      if (!inputValue.value) {
        Object.keys(results).forEach(key => results[key] = '')
        return
      }
      
      if (!isValidNumber(inputValue.value, fromBase.value)) {
        hasError.value = true
        errorMessage.value = `${t('tools.baseConverter.ui.errorInvalidChar')}${fromBase.value}${t('tools.baseConverter.ui.stepBase')}${t('tools.baseConverter.ui.errorInvalidCharEnd')}`
        Object.keys(results).forEach(key => results[key] = '')
        return
      }
      
      try {
        decimalValue.value = convertToDecimal(inputValue.value, fromBase.value)
        
        targetBases.forEach(base => {
          if (base === 10) {
            results[base] = decimalValue.value.toString()
          } else {
            results[base] = convertFromDecimal(decimalValue.value, base)
          }
        })
      } catch (error) {
        hasError.value = true
        errorMessage.value = t('tools.baseConverter.ui.errorConversion')
      }
    }

    const processBatch = () => {
      const lines = batchInput.value.split('\n').filter(line => line.trim())
      const results = []
      
      for (const line of lines) {
        const trimmed = line.trim()
        if (isValidNumber(trimmed, batchFromBase.value)) {
          const decimal = convertToDecimal(trimmed, batchFromBase.value)
          const converted = batchToBase.value === 10 ? 
            decimal.toString() : 
            convertFromDecimal(decimal, batchToBase.value)
          
          results.push({
            original: trimmed,
            converted: converted,
            decimal: decimal
          })
        }
      }
      
      batchResults.value = results
    }

    const exportBatchResults = () => {
      const csvContent = [
        `原始值(${batchFromBase.value}进制),转换值(${batchToBase.value}进制),十进制值`,
        ...batchResults.value.map(r => `${r.original},${r.converted},${r.decimal}`)
      ].join('\n')
      
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'base_conversion_results.csv'
      link.click()
      URL.revokeObjectURL(link.href)
    }

    const copyResult = async (text) => {
      try {
        await navigator.clipboard.writeText(text)
      } catch (err) {
        console.error('复制失败:', err)
      }
    }

    return {
      inputValue,
      fromBase,
      toBase,
      hasError,
      errorMessage,
      availableBases,
      targetBases,
      results,
      decimalValue,
      conversionSteps,
      divisionSteps,
      batchInput,
      batchFromBase,
      batchToBase,
      batchResults,
      showPowersOf2,
      showDecimalRange,
      rangeLimit,
      getBaseLabel,
      validateAndConvert,
      processBatch,
      exportBatchResults,
      copyResult,
      convertBase
    }
  }
}
</script>

<style scoped>
.base-n-converter {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
}

.card h3 {
  color: #4fc3f7;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.conversion-section {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 20px;
  align-items: start;
}

.input-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-group label {
  font-weight: 500;
  color: #e3f2fd;
}

.input-group input,
.input-group select,
.input-group textarea {
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;
}

.input-group input.error {
  border-color: #f44336;
  background: rgba(244, 67, 54, 0.1);
}

.error-message {
  color: #f44336;
  font-size: 12px;
  margin-top: 4px;
}

.convert-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4fc3f7;
  font-size: 24px;
}

.base-grid {
  display: grid;
  gap: 12px;
}

.base-result {
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.base-result.highlighted {
  border-color: #4fc3f7;
  background: rgba(79, 195, 247, 0.1);
}

.base-label {
  font-size: 12px;
  color: #b0bec5;
  margin-bottom: 4px;
}

.base-value {
  font-family: 'Courier New', monospace;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-copy {
  padding: 4px 6px;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 10px;
}

.steps-container {
  display: grid;
  gap: 20px;
}

.step-section h4 {
  color: #81c784;
  margin-bottom: 12px;
}

.calculation-steps,
.division-steps {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.step-item,
.division-item {
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
}

.step-formula {
  color: #ffcc80;
}

.step-result {
  color: #81c784;
  margin-left: 8px;
}

.final-decimal,
.final-result {
  padding: 12px;
  background: rgba(76, 175, 80, 0.2);
  border-radius: 8px;
  margin-top: 8px;
}

.batch-controls {
  display: grid;
  gap: 20px;
  margin-bottom: 20px;
}

.batch-settings {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.btn-primary {
  padding: 10px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  padding: 8px 16px;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-toggle {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-toggle.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
}

.batch-results {
  margin-top: 20px;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.results-table,
.reference-table {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1px;
  background: rgba(79, 195, 247, 0.3);
  padding: 12px;
  font-weight: 500;
}

.table-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1px;
  padding: 8px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  font-family: 'Courier New', monospace;
  font-size: 14px;
}

.table-row:last-child {
  border-bottom: none;
}

.reference-controls {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.powers-grid .table-header,
.powers-grid .table-row {
  grid-template-columns: 80px 100px 150px 100px 120px;
}

.range-grid .table-header,
.range-grid .table-row {
  grid-template-columns: 80px 120px 80px 100px;
}

.table-body {
  max-height: 400px;
  overflow-y: auto;
}

.show-more {
  padding: 16px;
  text-align: center;
}

.info-card {
  background: rgba(76, 175, 80, 0.1);
  border-color: rgba(76, 175, 80, 0.3);
}

.info-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.info-section h4 {
  color: #81c784;
  margin-bottom: 8px;
}

.info-section ul {
  margin: 0;
  padding-left: 20px;
}

.info-section li {
  margin-bottom: 6px;
  line-height: 1.4;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .base-n-converter {
    padding: 16px;
  }
  
  .conversion-section {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .convert-arrow {
    transform: rotate(90deg);
  }
  
  .batch-settings {
    grid-template-columns: 1fr;
  }
  
  .reference-controls {
    flex-direction: column;
  }
  
  .info-content {
    grid-template-columns: 1fr;
  }
  
  .table-header,
  .table-row {
    grid-template-columns: 1fr !important;
    gap: 8px;
  }
  
  .table-header span,
  .table-row span {
    padding: 4px 0;
  }
}
</style> 