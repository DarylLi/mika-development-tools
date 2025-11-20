<template>
  <div class="tool-card">
    <!-- 渐变色头部 -->
    <div class="tool-header" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);">
      <div class="tool-icon">
        <i class="fas fa-id-card"></i>
      </div>
      <div class="tool-title">
        <h2>{{ $t('tools.creditCodeGenerator.ui.title') }}</h2>
        <p>{{ $t('tools.creditCodeGenerator.ui.description') }}</p>
      </div>
    </div>

    <!-- 示例按钮 -->
    <div class="example-section">
      <button @click="generateRandom" class="example-btn">
        <i class="fas fa-random"></i> {{ $t('tools.creditCodeGenerator.ui.randomGenerate') }}
      </button>
      <button @click="loadExample" class="example-btn">
        <i class="fas fa-magic"></i> {{ $t('tools.creditCodeGenerator.ui.loadExample') }}
      </button>
    </div>

    <!-- 配置选项 -->
    <div class="form-section">
      <h3><i class="fas fa-cog"></i> {{ $t('tools.creditCodeGenerator.ui.codeComposition') }}</h3>
      
      <!-- 登记管理部门代码 -->
      <div class="form-group">
        <label>{{ $t('tools.creditCodeGenerator.ui.registrationAuthority') }}</label>
        <select v-model="registrationAuthority">
          <option value="1">{{ $t('tools.creditCodeGenerator.ui.registrationAuthority1') }}</option>
          <option value="5">{{ $t('tools.creditCodeGenerator.ui.registrationAuthority5') }}</option>
          <option value="9">{{ $t('tools.creditCodeGenerator.ui.registrationAuthority9') }}</option>
          <option value="Y">{{ $t('tools.creditCodeGenerator.ui.registrationAuthorityY') }}</option>
        </select>
      </div>

      <!-- 机构类别代码 -->
      <div class="form-group">
        <label>{{ $t('tools.creditCodeGenerator.ui.organizationType') }}</label>
        <select v-model="organizationType">
          <option value="1">{{ $t('tools.creditCodeGenerator.ui.organizationType1') }}</option>
          <option value="2">{{ $t('tools.creditCodeGenerator.ui.organizationType2') }}</option>
          <option value="3">{{ $t('tools.creditCodeGenerator.ui.organizationType3') }}</option>
          <option value="4">{{ $t('tools.creditCodeGenerator.ui.organizationType4') }}</option>
          <option value="5">{{ $t('tools.creditCodeGenerator.ui.organizationType5') }}</option>
          <option value="9">{{ $t('tools.creditCodeGenerator.ui.organizationType9') }}</option>
        </select>
      </div>

      <!-- 登记管理机关行政区划码 -->
      <div class="form-group">
        <label>{{ $t('tools.creditCodeGenerator.ui.areaCode') }}</label>
        <select v-model="areaCode" @change="updateAreaCode">
          <option value="">{{ $t('tools.creditCodeGenerator.ui.selectProvince') }}</option>
          <option v-for="area in areaList" :key="area.code" :value="area.code">
            {{ area.code }} - {{ area.name }}
          </option>
        </select>
        <input v-model="customAreaCode" type="text" :placeholder="$t('tools.creditCodeGenerator.ui.orManualInput')" maxlength="6">
      </div>

      <!-- 主体标识码 -->
      <div class="form-group">
        <label>{{ $t('tools.creditCodeGenerator.ui.identifierCode') }}</label>
        <div class="identifier-options">
          <label>
            <input type="radio" v-model="identifierMethod" value="auto">
            {{ $t('tools.creditCodeGenerator.ui.autoGenerate') }}
          </label>
          <label>
            <input type="radio" v-model="identifierMethod" value="manual">
            {{ $t('tools.creditCodeGenerator.ui.manualInput') }}
          </label>
        </div>
        <input 
          v-if="identifierMethod === 'manual'" 
          v-model="customIdentifier" 
          type="text" 
          :placeholder="$t('tools.creditCodeGenerator.ui.inputIdentifier')" 
          maxlength="9"
        >
      </div>

      <!-- 批量生成 -->
      <div class="form-group">
        <label>{{ $t('tools.creditCodeGenerator.ui.batchCount') }}</label>
        <input v-model.number="batchCount" type="number" min="1" max="1000" placeholder="1">
      </div>
    </div>

    <!-- 生成结果 -->
    <div v-if="generatedCodes.length > 0" class="result-display">
      <h3><i class="fas fa-list"></i> {{ $t('tools.creditCodeGenerator.ui.generationResult') }}</h3>
      <div v-if="generatedCodes.length === 1" class="single-result">
        <div class="code-display">{{ generatedCodes[0] }}</div>
        <div class="code-breakdown">
          <div class="breakdown-item">
            <span class="breakdown-label">{{ $t('tools.creditCodeGenerator.ui.registrationDepartment') }}</span>
            <span class="breakdown-value">{{ getAuthorityName(generatedCodes[0][0]) }}</span>
          </div>
          <div class="breakdown-item">
            <span class="breakdown-label">{{ $t('tools.creditCodeGenerator.ui.organizationCategory') }}</span>
            <span class="breakdown-value">{{ getTypeName(generatedCodes[0][1]) }}</span>
          </div>
          <div class="breakdown-item">
            <span class="breakdown-label">{{ $t('tools.creditCodeGenerator.ui.administrativeArea') }}</span>
            <span class="breakdown-value">{{ generatedCodes[0].substring(2, 8) }}</span>
          </div>
          <div class="breakdown-item">
            <span class="breakdown-label">{{ $t('tools.creditCodeGenerator.ui.subjectIdentifier') }}</span>
            <span class="breakdown-value">{{ generatedCodes[0].substring(8, 17) }}</span>
          </div>
          <div class="breakdown-item">
            <span class="breakdown-label">{{ $t('tools.creditCodeGenerator.ui.checkCode') }}</span>
            <span class="breakdown-value">{{ generatedCodes[0][17] }}</span>
          </div>
        </div>
      </div>
      
      <div v-else class="batch-results">
        <div class="batch-list">
          <div v-for="(code, index) in generatedCodes" :key="index" class="batch-item">
            <span class="batch-number">{{ index + 1 }}.</span>
            <span class="batch-code">{{ code }}</span>
            <button @click="copyToClipboard(code)" class="mini-copy-btn">
              <i class="fas fa-copy"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div class="result-actions">
        <button @click="copyAllCodes" class="copy-btn">
          <i class="fas fa-copy"></i> {{ $t('tools.creditCodeGenerator.ui.copyAll') }}
        </button>
        <button @click="downloadCodes" class="download-btn">
          <i class="fas fa-download"></i> {{ $t('tools.creditCodeGenerator.ui.downloadFile') }}
        </button>
        <button @click="validateCodes" class="validate-btn">
          <i class="fas fa-check"></i> {{ $t('tools.creditCodeGenerator.ui.validateCode') }}
        </button>
      </div>
    </div>

    <!-- 代码验证 -->
    <div class="validation-section">
      <h3><i class="fas fa-search"></i> {{ $t('tools.creditCodeGenerator.ui.codeValidation') }}</h3>
      <div class="form-group">
        <label>{{ $t('tools.creditCodeGenerator.ui.inputCreditCode') }}</label>
        <input style="margin-bottom: 0px;" v-model="validateCode" type="text" :placeholder="$t('tools.creditCodeGenerator.ui.inputCreditCodePlaceholder')" maxlength="18">
        <button @click="validateSingleCode" class="validate-btn">
          <i class="fas fa-check"></i> {{ $t('tools.creditCodeGenerator.ui.validate') }}
        </button>
      </div>
      
      <div v-if="validationResult" class="validation-result">
        <div :class="['validation-status', validationResult.valid ? 'valid' : 'invalid']">
          <i :class="validationResult.valid ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
          {{ validationResult.valid ? $t('tools.creditCodeGenerator.ui.codeValid') : $t('tools.creditCodeGenerator.ui.codeInvalid') }}
        </div>
        <div v-if="validationResult.valid" class="validation-details">
          <div class="detail-item">
            <span class="detail-label">{{ $t('tools.creditCodeGenerator.ui.registrationDepartment') }}</span>
            <span class="detail-value">{{ validationResult.authority }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">{{ $t('tools.creditCodeGenerator.ui.organizationCategory') }}</span>
            <span class="detail-value">{{ validationResult.type }}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">{{ $t('tools.creditCodeGenerator.ui.administrativeArea') }}</span>
            <span class="detail-value">{{ validationResult.area }}</span>
          </div>
        </div>
        <div v-if="!validationResult.valid" class="validation-errors">
          <ul>
            <li v-for="error in validationResult.errors" :key="error">{{ error }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 使用说明 -->
    <div class="help-section">
      <h3><i class="fas fa-question-circle"></i> {{ $t('tools.creditCodeGenerator.ui.usageInstructions') }}</h3>
      <ul>
        <li><strong>{{ $t('tools.creditCodeGenerator.ui.codeStructure') }}</strong>{{ $t('tools.creditCodeGenerator.ui.codeStructureDesc') }}</li>
        <li><strong>{{ $t('tools.creditCodeGenerator.ui.checkAlgorithm') }}</strong>{{ $t('tools.creditCodeGenerator.ui.checkAlgorithmDesc') }}</li>
        <li><strong>{{ $t('tools.creditCodeGenerator.ui.randomGenerateDesc') }}</strong>{{ $t('tools.creditCodeGenerator.ui.randomGenerateDescText') }}</li>
        <li><strong>{{ $t('tools.creditCodeGenerator.ui.batchGenerate') }}</strong>{{ $t('tools.creditCodeGenerator.ui.batchGenerateDesc') }}</li>
        <li><strong>{{ $t('tools.creditCodeGenerator.ui.codeValidationDesc') }}</strong>{{ $t('tools.creditCodeGenerator.ui.codeValidationDescText') }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import messageService from '../../utils/message.js'

export default {
  name: 'CreditCodeGenerator',
  setup() {
    const { t } = useI18n()
    // 响应式数据
    const registrationAuthority = ref('9')
    const organizationType = ref('4')
    const areaCode = ref('')
    const customAreaCode = ref('')
    const identifierMethod = ref('auto')
    const customIdentifier = ref('')
    const batchCount = ref(1)
    const generatedCodes = ref([])
    const validateCode = ref('')
    const validationResult = ref(null)

    // 行政区划代码列表 (简化版)
    const areaCodes = [
      '110000', '120000', '130000', '140000', '150000',
      '210000', '220000', '230000',
      '310000', '320000', '330000', '340000', '350000', '360000', '370000',
      '410000', '420000', '430000', '440000', '450000', '460000',
      '500000', '510000', '520000', '530000', '540000',
      '610000', '620000', '630000', '640000', '650000'
    ]
    
    // 获取国际化后的行政区划列表
    const areaList = computed(() => {
      return areaCodes.map(code => ({
        code,
        name: t(`tools.creditCodeGenerator.ui.area${code}`)
      }))
    })

    // 字符映射表
    const charMap = '0123456789ABCDEFGHJKLMNPQRTUWXY'

    // 加权因子
    const weights = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28]

    // 计算校验码
    const calculateCheckCode = (code17) => {
      let sum = 0
      for (let i = 0; i < 17; i++) {
        const char = code17[i]
        const value = charMap.indexOf(char)
        sum += value * weights[i]
      }
      const remainder = sum % 31
      return charMap[31 - remainder]
    }

    // 生成随机字符
    const randomChar = () => {
      return charMap[Math.floor(Math.random() * charMap.length)]
    }

    // 生成随机数字
    const randomDigit = () => {
      return Math.floor(Math.random() * 10).toString()
    }

    // 生成主体标识码
    const generateIdentifier = () => {
      if (identifierMethod.value === 'manual' && customIdentifier.value) {
        return customIdentifier.value.padEnd(9, '0').substring(0, 9)
      }
      
      let identifier = ''
      for (let i = 0; i < 9; i++) {
        identifier += randomChar()
      }
      return identifier
    }

    // 获取行政区划码
    const getAreaCode = () => {
      if (customAreaCode.value) {
        return customAreaCode.value.padEnd(6, '0').substring(0, 6)
      }
      if (areaCode.value) {
        return areaCode.value
      }
      // 默认使用北京
      return '110000'
    }

    // 生成单个代码
    const generateSingleCode = () => {
      const authority = registrationAuthority.value
      const type = organizationType.value
      const area = getAreaCode()
      const identifier = generateIdentifier()
      
      const code17 = authority + type + area + identifier
      const checkCode = calculateCheckCode(code17)
      
      return code17 + checkCode
    }

    // 随机生成
    const generateRandom = () => {
      // 随机选择部门和类型
      const authorities = ['1', '5', '9', 'Y']
      const types = ['1', '2', '3', '4', '5', '9']
      
      registrationAuthority.value = authorities[Math.floor(Math.random() * authorities.length)]
      organizationType.value = types[Math.floor(Math.random() * types.length)]
      
      // 随机选择区域
      const randomIndex = Math.floor(Math.random() * areaCodes.length)
      areaCode.value = areaCodes[randomIndex]
      
      // 自动生成标识码
      identifierMethod.value = 'auto'
      
      // 生成代码
      generateCodes()
    }

    // 生成代码
    const generateCodes = () => {
      const count = Math.min(Math.max(1, batchCount.value || 1), 1000)
      const codes = []
      
      for (let i = 0; i < count; i++) {
        codes.push(generateSingleCode())
      }
      
      generatedCodes.value = codes
    }

    // 更新区域代码
    const updateAreaCode = () => {
      customAreaCode.value = ''
    }

    // 加载示例
    const loadExample = () => {
      registrationAuthority.value = '9'
      organizationType.value = '4'
      areaCode.value = '110000'
      identifierMethod.value = 'auto'
      batchCount.value = 5
      generateCodes()
    }

    // 获取部门名称
    const getAuthorityName = (code) => {
      const map = {
        '1': t('tools.creditCodeGenerator.ui.registrationAuthority1'),
        '5': t('tools.creditCodeGenerator.ui.registrationAuthority5'),
        '9': t('tools.creditCodeGenerator.ui.registrationAuthority9'),
        'Y': t('tools.creditCodeGenerator.ui.registrationAuthorityY')
      }
      return map[code] || t('tools.creditCodeGenerator.ui.unknown')
    }

    // 获取类型名称
    const getTypeName = (code) => {
      const map = {
        '1': t('tools.creditCodeGenerator.ui.organizationType1'),
        '2': t('tools.creditCodeGenerator.ui.organizationType2'),
        '3': t('tools.creditCodeGenerator.ui.organizationType3'),
        '4': t('tools.creditCodeGenerator.ui.organizationType4'),
        '5': t('tools.creditCodeGenerator.ui.organizationType5'),
        '9': t('tools.creditCodeGenerator.ui.organizationType9')
      }
      return map[code] || t('tools.creditCodeGenerator.ui.unknown')
    }

    // 验证单个代码
    const validateSingleCode = () => {
      const code = validateCode.value.trim().toUpperCase()
      validationResult.value = validateCreditCode(code)
    }

    // 验证统一社会信用代码
    const validateCreditCode = (code) => {
      const errors = []
      
      if (!code) {
        errors.push(t('tools.creditCodeGenerator.ui.codeCannotBeEmpty'))
        return { valid: false, errors }
      }
      
      if (code.length !== 18) {
        errors.push(t('tools.creditCodeGenerator.ui.codeLengthMustBe18'))
        return { valid: false, errors }
      }
      
      // 检查字符有效性
      for (let i = 0; i < 18; i++) {
        if (charMap.indexOf(code[i]) === -1) {
          errors.push(t('tools.creditCodeGenerator.ui.invalidChar', { position: i + 1, char: code[i] }))
        }
      }
      
      if (errors.length > 0) {
        return { valid: false, errors }
      }
      
      // 验证校验码
      const code17 = code.substring(0, 17)
      const actualCheckCode = code[17]
      const expectedCheckCode = calculateCheckCode(code17)
      
      if (actualCheckCode !== expectedCheckCode) {
        errors.push(t('tools.creditCodeGenerator.ui.checkCodeError', { expected: expectedCheckCode }))
        return { valid: false, errors }
      }
      
      return {
        valid: true,
        authority: getAuthorityName(code[0]),
        type: getTypeName(code[1]),
        area: code.substring(2, 8)
      }
    }

    // 验证生成的代码
    const validateCodes = () => {
      const validCount = generatedCodes.value.filter(code => 
        validateCreditCode(code).valid
      ).length
      
      messageService.success(t('common.completed'))
    }

    // 复制到剪贴板
    const copyToClipboard = async (text) => {
      try {
        await navigator.clipboard.writeText(text)
        messageService.success(t('common.copied'))
      } catch (err) {
        const textArea = document.createElement('textarea')
        textArea.value = text
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        messageService.success(t('common.copied'))
      }
    }

    // 复制全部代码
    const copyAllCodes = () => {
      const text = generatedCodes.value.join('\n')
      copyToClipboard(text)
    }

    // 下载代码文件
    const downloadCodes = () => {
      if (generatedCodes.value.length === 0) return
      
      const content = generatedCodes.value.join('\n')
      const blob = new Blob([content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `credit_codes_${Date.now()}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }

    // 监听变化
    watch([registrationAuthority, organizationType, areaCode, customAreaCode, identifierMethod, customIdentifier], () => {
      if (generatedCodes.value.length > 0) {
        generateCodes()
      }
    })

    return {
      registrationAuthority,
      organizationType,
      areaCode,
      customAreaCode,
      identifierMethod,
      customIdentifier,
      batchCount,
      generatedCodes,
      validateCode,
      validationResult,
      areaList,
      generateRandom,
      generateCodes,
      updateAreaCode,
      loadExample,
      getAuthorityName,
      getTypeName,
      validateSingleCode,
      validateCodes,
      copyToClipboard,
      copyAllCodes,
      downloadCodes
    }
  }
}
</script>

<style scoped>
.form-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.identifier-options {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.identifier-options label {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
}

.code-display {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  margin-bottom: 10px;
  font-family: 'Courier New', monospace;
  letter-spacing: 2px;
}

.code-breakdown {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.breakdown-item {
  background: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  text-align: center;
}

.breakdown-label {
  display: block;
  font-size: 0.8rem;
  color: #6c757d;
  margin-bottom: 0.3rem;
}

.breakdown-value {
  display: block;
  font-weight: 600;
  color: #495057;
  font-size: 1.1rem;
}

.batch-results {
  max-height: 400px;
  overflow-y: auto;
  background: #f8f9fa;
  border-radius: 8px;
  padding: 10px;
}

.batch-list {
  display: grid;
  gap: 0.5rem;
}

.batch-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  padding: 0.8rem;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.batch-number {
  font-weight: 600;
  color: #6c757d;
  min-width: 30px;
}

.batch-code {
  font-family: 'Courier New', monospace;
  flex: 1;
  font-weight: 500;
}

.mini-copy-btn {
  background: linear-gradient(45deg, #6c757d, #495057);
  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
}

.result-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.copy-btn, .download-btn, .validate-btn {
  background: linear-gradient(45deg, #28a745, #20c997);
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.validate-btn {
  background: linear-gradient(45deg, #007bff, #6610f2);
}

.copy-btn:hover, .download-btn:hover, .validate-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(40, 167, 69, 0.3);
}

.validation-section {
  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 1.5rem;
}

.validation-section .form-group {
  display: flex;
  gap: 1rem;
  align-items: end;
}

.validation-section .form-group input {
  flex: 1;
}

.validation-result {
  margin-top: 1rem;
  padding: 10px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.validation-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.validation-status.valid {
  color: #28a745;
}

.validation-status.invalid {
  color: #dc3545;
}

.validation-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.detail-item {
  text-align: center;
}

.detail-label {
  display: block;
  font-size: 0.8rem;
  color: #6c757d;
  margin-bottom: 0.2rem;
}

.detail-value {
  display: block;
  font-weight: 600;
  color: #495057;
}

.validation-errors ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.validation-errors li {
  color: #dc3545;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
}

.validation-errors li::before {
  content: '×';
  position: absolute;
  left: 0;
  font-weight: bold;
}

.help-section {
  background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 1.5rem;
}

.help-section ul {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
}

.help-section li {
  margin-bottom: 0.8rem;
  padding-left: 1.5rem;
  position: relative;
}

.help-section li::before {
  content: '•';
  color: #4caf50;
  font-weight: bold;
  position: absolute;
  left: 0;
}

@media (max-width: 768px) {
  .code-breakdown {
    grid-template-columns: 1fr;
  }
  
  .validation-section .form-group {
    flex-direction: column;
    align-items: stretch;
  }
  
  .result-actions {
    flex-direction: column;
  }
  
  .validation-details {
    grid-template-columns: 1fr;
  }
}

/* 工具头部样式 */
.tool-header {
  padding: 10px;
  margin-bottom: 10px;
}

/* Example Section 样式 */
.example-section {
  margin-top: 10px;
}

/* Input 输入框统一样式 */
input[type="text"],
input[type="number"],
input[type="email"],
input[type="password"],
input[type="url"],
input[type="search"],
input[type="tel"] {
  background: #fff;
}

/* Example Button 样式 */
.example-btn {
  margin-right: 10px;
}
</style> 