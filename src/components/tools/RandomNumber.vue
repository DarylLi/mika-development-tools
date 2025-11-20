<template>
  <div class="random-number-generator">
    <!-- 基础随机数生成 -->
    <div class="card">
      <h3><i class="fas fa-dice"></i> {{ $t('tools.randomNumber.ui.title') }}</h3>
      <div class="input-row">
        <div class="input-group">
          <label>{{ $t('tools.randomNumber.ui.labelMin') }}</label>
          <input v-model.number="basicMin" type="number" placeholder="0">
        </div>
        <div class="input-group">
          <label>{{ $t('tools.randomNumber.ui.labelMax') }}</label>
          <input v-model.number="basicMax" type="number" placeholder="100">
        </div>
        <div class="input-group">
          <label>{{ $t('tools.randomNumber.ui.labelCount') }}</label>
          <input v-model.number="basicCount" type="number" min="1" max="10000" placeholder="1">
        </div>
      </div>
      
      <div class="button-row">
        <button @click="generateBasicNumbers" class="btn-primary">
          <i class="fas fa-random"></i> {{ $t('tools.randomNumber.ui.generateNumbers') }}
        </button>
        <button @click="basicAllowDuplicates = !basicAllowDuplicates" 
                :class="['btn-toggle', { active: basicAllowDuplicates }]">
          <i class="fas fa-clone"></i> {{ $t('tools.randomNumber.ui.allowDuplicates') }}
        </button>
      </div>

      <div v-if="basicResult.length > 0" class="result-section">
        <div class="result-header">
          <span>{{ $t('tools.randomNumber.ui.resultTitle') }}{{ basicResult.length }}{{ $t('tools.randomNumber.ui.resultTitleEnd') }}</span>
          <button @click="copyResult(basicResult.join(', '))" class="btn-copy">
            <i class="fas fa-copy"></i>
          </button>
        </div>
        <div class="number-grid">
          <span v-for="(num, index) in basicResult" :key="index" class="number-tag">
            {{ num }}
          </span>
        </div>
        <div class="statistics">
          <span>{{ $t('tools.randomNumber.ui.labelMinValue') }} {{ Math.min(...basicResult) }}</span>
          <span>{{ $t('tools.randomNumber.ui.labelMaxValue') }} {{ Math.max(...basicResult) }}</span>
          <span>{{ $t('tools.randomNumber.ui.labelAverage') }} {{ (basicResult.reduce((a, b) => a + b, 0) / basicResult.length).toFixed(2) }}</span>
          <span>{{ $t('tools.randomNumber.ui.labelSum') }} {{ basicResult.reduce((a, b) => a + b, 0) }}</span>
        </div>
      </div>
    </div>

    <!-- 特殊类型随机数 -->
    <div class="card">
      <h3><i class="fas fa-magic"></i> {{ $t('tools.randomNumber.ui.specialTypes') }}</h3>
      <div class="special-types">
        <div class="special-item">
          <h4>{{ $t('tools.randomNumber.ui.randomFloat') }}</h4>
          <div class="input-row">
            <input v-model.number="floatMin" type="number" step="0.01" placeholder="0.0">
            <span>{{ $t('tools.randomNumber.ui.labelFrom') }}</span>
            <input v-model.number="floatMax" type="number" step="0.01" placeholder="1.0">
            <select v-model="floatPrecision">
              <option value="2">2{{ $t('tools.randomNumber.ui.labelPrecision') }}</option>
              <option value="3">3{{ $t('tools.randomNumber.ui.labelPrecision') }}</option>
              <option value="4">4{{ $t('tools.randomNumber.ui.labelPrecision') }}</option>
              <option value="5">5{{ $t('tools.randomNumber.ui.labelPrecision') }}</option>
            </select>
          </div>
          <button @click="generateFloat" class="btn-secondary">{{ $t('tools.randomNumber.ui.generate') }}</button>
          <div v-if="floatResult !== null" class="result-display">
            {{ floatResult }}
            <button @click="copyResult(floatResult.toString())" class="btn-mini">
              <i class="fas fa-copy"></i>
            </button>
          </div>
        </div>

        <div class="special-item">
          <h4>{{ $t('tools.randomNumber.ui.randomPercentage') }}</h4>
          <button @click="generatePercentage" class="btn-secondary">{{ $t('tools.randomNumber.ui.generatePercentage') }}</button>
          <div v-if="percentageResult !== null" class="result-display">
            {{ percentageResult }}%
            <button @click="copyResult(percentageResult + '%')" class="btn-mini">
              <i class="fas fa-copy"></i>
            </button>
          </div>
        </div>

        <div class="special-item">
          <h4>{{ $t('tools.randomNumber.ui.randomBoolean') }}</h4>
          <div class="boolean-controls">
            <button @click="generateBoolean" class="btn-secondary">{{ $t('tools.randomNumber.ui.generateTrueFalse') }}</button>
            <button @click="generateBoolean('chinese')" class="btn-secondary">{{ $t('tools.randomNumber.ui.generateYesNo') }}</button>
            <button @click="generateBoolean('yesno')" class="btn-secondary">{{ $t('tools.randomNumber.ui.generateYesNoEn') }}</button>
          </div>
          <div v-if="booleanResult !== null" class="result-display">
            {{ booleanResult }}
            <button @click="copyResult(booleanResult)" class="btn-mini">
              <i class="fas fa-copy"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 随机序列和排列 -->
    <div class="card">
      <h3><i class="fas fa-list-ol"></i> {{ $t('tools.randomNumber.ui.sequences') }}</h3>
      <div class="sequence-controls">
        <div class="input-group">
          <label>{{ $t('tools.randomNumber.ui.labelRange') }}</label>
          <div class="range-inputs">
            <input v-model.number="sequenceStart" type="number" placeholder="1">
            <span>{{ $t('tools.randomNumber.ui.labelFrom') }}</span>
            <input v-model.number="sequenceEnd" type="number" placeholder="100">
          </div>
        </div>
        <div class="input-group">
          <label>{{ $t('tools.randomNumber.ui.labelSelectCount') }}</label>
          <input v-model.number="sequenceCount" type="number" min="1" placeholder="10">
        </div>
      </div>
      
      <div class="button-row">
        <button @click="generateSequence" class="btn-primary">{{ $t('tools.randomNumber.ui.generateSequence') }}</button>
        <button @click="generatePermutation" class="btn-secondary">{{ $t('tools.randomNumber.ui.generatePermutation') }}</button>
        <button @click="shuffleSequence" class="btn-secondary">{{ $t('tools.randomNumber.ui.shuffleSequence') }}</button>
      </div>

      <div v-if="sequenceResult.length > 0" class="result-section">
        <div class="result-header">
          <span>{{ $t('tools.randomNumber.ui.sequenceResult') }}{{ sequenceResult.length }}{{ $t('tools.randomNumber.ui.sequenceResultEnd') }}</span>
          <button @click="copyResult(sequenceResult.join(', '))" class="btn-copy">
            <i class="fas fa-copy"></i>
          </button>
        </div>
        <div class="number-grid">
          <span v-for="(num, index) in sequenceResult" :key="index" class="number-tag">
            {{ num }}
          </span>
        </div>
      </div>
    </div>

    <!-- 随机字符串 -->
    <div class="card">
      <h3><i class="fas fa-font"></i> {{ $t('tools.randomNumber.ui.randomString') }}</h3>
      <div class="string-controls">
        <div class="input-group">
          <label>{{ $t('tools.randomNumber.ui.labelLength') }}</label>
          <input v-model.number="stringLength" type="number" min="1" max="1000" placeholder="10">
        </div>
        <div class="charset-options">
          <label><input type="checkbox" v-model="charsets.uppercase"> {{ $t('tools.randomNumber.ui.charsetUppercase') }}</label>
          <label><input type="checkbox" v-model="charsets.lowercase"> {{ $t('tools.randomNumber.ui.charsetLowercase') }}</label>
          <label><input type="checkbox" v-model="charsets.numbers"> {{ $t('tools.randomNumber.ui.charsetNumbers') }}</label>
          <label><input type="checkbox" v-model="charsets.symbols"> {{ $t('tools.randomNumber.ui.charsetSymbols') }}</label>
          <label><input type="checkbox" v-model="charsets.custom"> {{ $t('tools.randomNumber.ui.charsetCustom') }}</label>
        </div>
        <div v-if="charsets.custom" class="input-group">
          <label>{{ $t('tools.randomNumber.ui.labelCustomCharset') }}</label>
          <input v-model="customCharset" type="text" :placeholder="$t('tools.randomNumber.ui.placeholderCustom')">
        </div>
      </div>
      
      <button @click="generateRandomString" class="btn-primary">{{ $t('tools.randomNumber.ui.generateString') }}</button>
      
      <div v-if="stringResult" class="result-section">
        <div class="result-header">
          <span>{{ $t('tools.randomNumber.ui.generatedString') }}</span>
          <button @click="copyResult(stringResult)" class="btn-copy">
            <i class="fas fa-copy"></i>
          </button>
        </div>
        <div class="string-result">{{ stringResult }}</div>
      </div>
    </div>

    <!-- 高级功能 -->
    <div class="card">
      <h3><i class="fas fa-cogs"></i> {{ $t('tools.randomNumber.ui.advanced') }}</h3>
      <div class="advanced-grid">
        <div class="advanced-item">
          <h4>{{ $t('tools.randomNumber.ui.randomColor') }}</h4>
          <button @click="generateColor" class="btn-secondary">{{ $t('tools.randomNumber.ui.generateColor') }}</button>
          <div v-if="colorResult" class="color-result">
            <div class="color-preview" :style="{ backgroundColor: colorResult }"></div>
            <span>{{ colorResult }}</span>
            <button @click="copyResult(colorResult)" class="btn-mini">
              <i class="fas fa-copy"></i>
            </button>
          </div>
        </div>

        <div class="advanced-item">
          <h4>{{ $t('tools.randomNumber.ui.randomUUID') }}</h4>
          <button @click="generateUUID" class="btn-secondary">{{ $t('tools.randomNumber.ui.generateUUID') }}</button>
          <div v-if="uuidResult" class="result-display">
            {{ uuidResult }}
            <button @click="copyResult(uuidResult)" class="btn-mini">
              <i class="fas fa-copy"></i>
            </button>
          </div>
        </div>

        <div class="advanced-item">
          <h4>{{ $t('tools.randomNumber.ui.weightedChoice') }}</h4>
          <div class="weight-input">
            <textarea v-model="weightedOptions" :placeholder="$t('tools.randomNumber.ui.placeholderWeighted')"></textarea>
          </div>
          <button @click="generateWeightedChoice" class="btn-secondary">{{ $t('tools.randomNumber.ui.generateWeighted') }}</button>
          <div v-if="weightedResult" class="result-display">
            {{ weightedResult }}
            <button @click="copyResult(weightedResult)" class="btn-mini">
              <i class="fas fa-copy"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 随机数历史 -->
    <div class="card">
      <h3><i class="fas fa-history"></i> {{ $t('tools.randomNumber.ui.history') }}</h3>
      <div class="history-controls">
        <button @click="clearHistory" class="btn-secondary">{{ $t('tools.randomNumber.ui.clearHistory') }}</button>
        <button @click="exportHistory" class="btn-secondary">{{ $t('tools.randomNumber.ui.exportHistory') }}</button>
      </div>
      <div v-if="history.length > 0" class="history-list">
        <div v-for="(item, index) in history.slice(-10)" :key="index" class="history-item">
          <div class="history-info">
            <span class="history-type">{{ $t('tools.randomNumber.ui.labelType') }}: {{ item.type }}</span>
            <span class="history-time">{{ $t('tools.randomNumber.ui.labelTime') }}: {{ item.time }}</span>
          </div>
          <div class="history-result">{{ item.result }}</div>
          <button @click="copyResult(item.result)" class="btn-mini">
            <i class="fas fa-copy"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- 知识科普 -->
    <div class="card info-card">
      <h3><i class="fas fa-info-circle"></i> {{ $t('tools.randomNumber.ui.knowledgeTitle') }}</h3>
      <div class="info-content">
        <div class="info-section">
          <h4>{{ $t('tools.randomNumber.ui.knowledgeTypes') }}</h4>
          <ul>
            <li>{{ $t('tools.randomNumber.ui.knowledgeTypes1') }}</li>
            <li>{{ $t('tools.randomNumber.ui.knowledgeTypes2') }}</li>
            <li>{{ $t('tools.randomNumber.ui.knowledgeTypes3') }}</li>
          </ul>
        </div>
        <div class="info-section">
          <h4>{{ $t('tools.randomNumber.ui.knowledgeApplication') }}</h4>
          <ul>
            <li>{{ $t('tools.randomNumber.ui.knowledgeApp1') }}</li>
            <li>{{ $t('tools.randomNumber.ui.knowledgeApp2') }}</li>
            <li>{{ $t('tools.randomNumber.ui.knowledgeApp3') }}</li>
            <li>{{ $t('tools.randomNumber.ui.knowledgeApp4') }}</li>
            <li>{{ $t('tools.randomNumber.ui.knowledgeApp5') }}</li>
          </ul>
        </div>
        <div class="info-section">
          <h4>{{ $t('tools.randomNumber.ui.knowledgeQuality') }}</h4>
          <ul>
            <li>{{ $t('tools.randomNumber.ui.knowledgeQuality1') }}</li>
            <li>{{ $t('tools.randomNumber.ui.knowledgeQuality2') }}</li>
            <li>{{ $t('tools.randomNumber.ui.knowledgeQuality3') }}</li>
            <li>{{ $t('tools.randomNumber.ui.knowledgeQuality4') }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import messageService from '../../utils/message.js'

export default {
  name: 'RandomNumber',
  setup() {
    const { t } = useI18n()
    // 基础随机数
    const basicMin = ref(0)
    const basicMax = ref(100)
    const basicCount = ref(1)
    const basicAllowDuplicates = ref(true)
    const basicResult = ref([])

    // 特殊类型
    const floatMin = ref(0.0)
    const floatMax = ref(1.0)
    const floatPrecision = ref(2)
    const floatResult = ref(null)
    const percentageResult = ref(null)
    const booleanResult = ref(null)

    // 序列
    const sequenceStart = ref(1)
    const sequenceEnd = ref(100)
    const sequenceCount = ref(10)
    const sequenceResult = ref([])

    // 字符串
    const stringLength = ref(10)
    const charsets = reactive({
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: false,
      custom: false
    })
    const customCharset = ref('')
    const stringResult = ref('')

    // 高级功能
    const colorResult = ref('')
    const uuidResult = ref('')
    const weightedOptions = ref('选项1:10\n选项2:20\n选项3:30')
    const weightedResult = ref('')

    // 历史记录
    const history = ref([])

    const addToHistory = (type, result) => {
      history.value.push({
        type,
        result: result.toString(),
        time: new Date().toLocaleTimeString()
      })
    }

    const generateBasicNumbers = () => {
      if (basicMin.value >= basicMax.value) {
        messageService.warning(t('common.warning'))
        return
      }

      const min = Math.ceil(basicMin.value)
      const max = Math.floor(basicMax.value)
      const count = Math.min(basicCount.value, basicAllowDuplicates.value ? 10000 : (max - min + 1))
      
      const numbers = []
      
      if (basicAllowDuplicates.value) {
        for (let i = 0; i < count; i++) {
          numbers.push(Math.floor(Math.random() * (max - min + 1)) + min)
        }
      } else {
        // 不允许重复
        const available = []
        for (let i = min; i <= max; i++) {
          available.push(i)
        }
        
        for (let i = 0; i < count && available.length > 0; i++) {
          const index = Math.floor(Math.random() * available.length)
          numbers.push(available.splice(index, 1)[0])
        }
      }
      
      basicResult.value = numbers
      addToHistory('基础随机数', numbers.join(', '))
    }

    const generateFloat = () => {
      const range = floatMax.value - floatMin.value
      const randomFloat = Math.random() * range + floatMin.value
      floatResult.value = parseFloat(randomFloat.toFixed(floatPrecision.value))
      addToHistory('随机小数', floatResult.value)
    }

    const generatePercentage = () => {
      percentageResult.value = parseFloat((Math.random() * 100).toFixed(2))
      addToHistory('随机百分比', percentageResult.value + '%')
    }

    const generateBoolean = (type = 'boolean') => {
      const random = Math.random() < 0.5
      
      switch (type) {
        case 'chinese':
          booleanResult.value = random ? '是' : '否'
          break
        case 'yesno':
          booleanResult.value = random ? 'Yes' : 'No'
          break
        default:
          booleanResult.value = random ? 'True' : 'False'
      }
      
      addToHistory('随机布尔值', booleanResult.value)
    }

    const generateSequence = () => {
      if (sequenceStart.value >= sequenceEnd.value) {
        messageService.warning(t('common.warning'))
        return
      }

      const range = sequenceEnd.value - sequenceStart.value + 1
      const count = Math.min(sequenceCount.value, range)
      const numbers = []
      
      for (let i = 0; i < count; i++) {
        let num
        do {
          num = Math.floor(Math.random() * range) + sequenceStart.value
        } while (numbers.includes(num))
        numbers.push(num)
      }
      
      sequenceResult.value = numbers.sort((a, b) => a - b)
      addToHistory('随机序列', sequenceResult.value.join(', '))
    }

    const generatePermutation = () => {
      const numbers = []
      for (let i = sequenceStart.value; i <= sequenceEnd.value; i++) {
        numbers.push(i)
      }
      
      // Fisher-Yates 洗牌算法
      for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]]
      }
      
      sequenceResult.value = numbers.slice(0, sequenceCount.value || numbers.length)
      addToHistory('随机排列', sequenceResult.value.join(', '))
    }

    const shuffleSequence = () => {
      if (sequenceResult.value.length === 0) {
        generateSequence()
        return
      }
      
      const shuffled = [...sequenceResult.value]
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      
      sequenceResult.value = shuffled
      addToHistory('打乱序列', sequenceResult.value.join(', '))
    }

    const generateRandomString = () => {
      let charset = ''
      
      if (charsets.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      if (charsets.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz'
      if (charsets.numbers) charset += '0123456789'
      if (charsets.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?'
      if (charsets.custom && customCharset.value) charset += customCharset.value
      
      if (!charset) {
        messageService.warning(t('common.warning'))
        return
      }
      
      let result = ''
      for (let i = 0; i < stringLength.value; i++) {
        result += charset.charAt(Math.floor(Math.random() * charset.length))
      }
      
      stringResult.value = result
      addToHistory('随机字符串', result)
    }

    const generateColor = () => {
      const hex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
      colorResult.value = hex
      addToHistory('随机颜色', hex)
    }

    const generateUUID = () => {
      const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0
        const v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
      uuidResult.value = uuid
      addToHistory('UUID', uuid)
    }

    const generateWeightedChoice = () => {
      const lines = weightedOptions.value.split('\n').filter(line => line.trim())
      const options = []
      let totalWeight = 0
      
      for (const line of lines) {
        const [option, weight] = line.split(':').map(s => s.trim())
        if (option && weight && !isNaN(weight)) {
          const w = parseFloat(weight)
          options.push({ option, weight: w })
          totalWeight += w
        }
      }
      
      if (options.length === 0) {
        messageService.warning(t('common.warning'))
        return
      }
      
      const random = Math.random() * totalWeight
      let currentWeight = 0
      
      for (const { option, weight } of options) {
        currentWeight += weight
        if (random <= currentWeight) {
          weightedResult.value = option
          addToHistory('权重选择', option)
          break
        }
      }
    }

    const copyResult = async (text) => {
      try {
        await navigator.clipboard.writeText(text)
        // 可以添加复制成功的提示
      } catch (err) {
        console.error('复制失败:', err)
      }
    }

    const clearHistory = () => {
      history.value = []
    }

    const exportHistory = () => {
      const data = history.value.map(item => `${item.time} - ${item.type}: ${item.result}`).join('\n')
      const blob = new Blob([data], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'random_history.txt'
      a.click()
      URL.revokeObjectURL(url)
    }

    return {
      // 基础随机数
      basicMin,
      basicMax,
      basicCount,
      basicAllowDuplicates,
      basicResult,
      generateBasicNumbers,
      
      // 特殊类型
      floatMin,
      floatMax,
      floatPrecision,
      floatResult,
      percentageResult,
      booleanResult,
      generateFloat,
      generatePercentage,
      generateBoolean,
      
      // 序列
      sequenceStart,
      sequenceEnd,
      sequenceCount,
      sequenceResult,
      generateSequence,
      generatePermutation,
      shuffleSequence,
      
      // 字符串
      stringLength,
      charsets,
      customCharset,
      stringResult,
      generateRandomString,
      
      // 高级功能
      colorResult,
      uuidResult,
      weightedOptions,
      weightedResult,
      generateColor,
      generateUUID,
      generateWeightedChoice,
      
      // 历史和工具
      history,
      copyResult,
      clearHistory,
      exportHistory
    }
  }
}
</script>

<style scoped>
.random-number-generator {
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

.input-row {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.input-group {
  flex: 1;
  min-width: 120px;
}

.input-group label {
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
}

.input-group input,
.input-group select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;
}

.range-inputs {
  display: flex;
  align-items: center;
  gap: 8px;
}

.range-inputs input {
  flex: 1;
}

.button-row {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
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
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.3);
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

.btn-copy,
.btn-mini {
  padding: 4px 8px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.result-section {
  margin-top: 16px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-weight: 500;
}

.number-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.number-tag {
  padding: 4px 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
}

.statistics {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 14px;
  color: #b0bec5;
}

.special-types {
  display: grid;
  gap: 20px;
}

.special-item {
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.special-item h4 {
  margin-bottom: 12px;
  color: #81c784;
}

.result-display {
  margin-top: 8px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Courier New', monospace;
}

.boolean-controls {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.sequence-controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.string-controls {
  margin-bottom: 16px;
}

.charset-options {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 12px 0;
}

.charset-options label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.string-result {
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  font-family: 'Courier New', monospace;
  word-break: break-all;
}

.advanced-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.advanced-item {
  padding: 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.advanced-item h4 {
  margin-bottom: 12px;
  color: #ffb74d;
}

.color-result {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
}

.color-preview {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.weight-input textarea {
  width: 100%;
  height: 80px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  color: white;
  resize: vertical;
  font-family: 'Courier New', monospace;
  font-size: 14px;
}

.history-controls {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.history-list {
  max-height: 300px;
  overflow-y: auto;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  margin-bottom: 8px;
}

.history-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 120px;
}

.history-type {
  font-weight: 500;
  color: #4fc3f7;
  font-size: 14px;
}

.history-time {
  font-size: 12px;
  color: #b0bec5;
}

.history-result {
  flex: 1;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  .random-number-generator {
    padding: 16px;
  }
  
  .input-row {
    flex-direction: column;
  }
  
  .sequence-controls {
    grid-template-columns: 1fr;
  }
  
  .advanced-grid {
    grid-template-columns: 1fr;
  }
  
  .info-content {
    grid-template-columns: 1fr;
  }
  
  .statistics {
    flex-direction: column;
    gap: 8px;
  }
  
  .button-row {
    flex-direction: column;
  }
  
  .btn-primary,
  .btn-secondary {
    width: 100%;
  }
}
</style> 