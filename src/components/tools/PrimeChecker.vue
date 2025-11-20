<template>
  <div class="prime-checker">
    <div class="checker-container">
      <!-- 质数检查主工具 -->
      <div class="main-checker">
        <h3><i class="fas fa-search"></i> {{ $t('tools.primeChecker.ui.title') }}</h3>
        <div class="input-section">
          <div class="number-input">
            <input 
              v-model="inputNumber" 
              type="number" 
              min="1"
              max="1000000"
              :placeholder="$t('tools.primeChecker.ui.placeholder')"
              @input="checkPrime"
              class="main-input">
            <button @click="checkPrime" class="check-btn">
              <i class="fas fa-play"></i>
              {{ $t('tools.primeChecker.ui.check') }}
            </button>
          </div>
          
          <div v-if="result.checked" class="result-display">
            <div :class="['result-badge', result.isPrime ? 'is-prime' : 'not-prime']">
              <i :class="result.isPrime ? 'fas fa-check-circle' : 'fas fa-times-circle'"></i>
              {{ result.number }} {{ result.isPrime ? $t('tools.primeChecker.ui.isPrime') : $t('tools.primeChecker.ui.notPrime') }}
            </div>
            
            <div v-if="!result.isPrime && result.factors.length > 0" class="factors-info">
              <strong>{{ $t('tools.primeChecker.ui.factorDecomposition') }}</strong>
              <span class="factors">{{ result.number }} = {{ result.factorization }}</span>
            </div>
            
            <div class="additional-info">
              <div class="info-grid">
                <div class="info-item">
                  <label>{{ $t('tools.primeChecker.ui.labelDigits') }}</label>
                  <span>{{ result.digits }}</span>
                </div>
                <div class="info-item">
                  <label>{{ $t('tools.primeChecker.ui.labelParity') }}</label>
                  <span>{{ result.number % 2 === 0 ? $t('tools.primeChecker.ui.labelEven') : $t('tools.primeChecker.ui.labelOdd') }}</span>
                </div>
                <div v-if="result.isPrime" class="info-item">
                  <label>{{ $t('tools.primeChecker.ui.labelPrimeIndex') }}</label>
                  <span>{{ result.primeIndex }}</span>
                </div>
                <div class="info-item">
                  <label>{{ $t('tools.primeChecker.ui.labelSqrt') }}</label>
                  <span>{{ Math.sqrt(result.number).toFixed(3) }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 质数范围生成器 -->
      <div class="range-generator">
        <h3><i class="fas fa-list"></i> {{ $t('tools.primeChecker.ui.rangeGenerator') }}</h3>
        <div class="range-inputs">
          <div class="input-group">
            <label>{{ $t('tools.primeChecker.ui.labelStart') }}</label>
            <input v-model="rangeStart" type="number" min="1" max="10000" :placeholder="$t('tools.primeChecker.ui.placeholderStart')">
          </div>
          <div class="input-group">
            <label>{{ $t('tools.primeChecker.ui.labelEnd') }}</label>
            <input v-model="rangeEnd" type="number" min="1" max="10000" :placeholder="$t('tools.primeChecker.ui.placeholderEnd')">
          </div>
          <button @click="generatePrimesInRange" class="generate-btn">
            <i class="fas fa-magic"></i>
            {{ $t('tools.primeChecker.ui.generatePrimes') }}
          </button>
        </div>
        
        <div v-if="primeList.length > 0" class="prime-list-section">
          <div class="list-header">
            <h4>{{ rangeStart }} {{ $t('tools.primeChecker.ui.primeListTitle') }} {{ rangeEnd }} {{ $t('tools.primeChecker.ui.primeListTitleEnd') }} {{ primeList.length }} {{ $t('tools.primeChecker.ui.primeListTitleEnd2') }}</h4>
            <button @click="copyPrimeList" class="copy-btn">
              <i class="fas fa-copy"></i>
              {{ $t('tools.primeChecker.ui.copyList') }}
            </button>
          </div>
          <div class="prime-grid">
            <span 
              v-for="prime in primeList" 
              :key="prime"
              @click="selectPrime(prime)"
              :class="['prime-item', { selected: selectedPrime === prime }]">
              {{ prime }}
            </span>
          </div>
        </div>
      </div>

      <!-- 快速质数工具 -->
      <div class="quick-tools">
        <h3><i class="fas fa-bolt"></i> {{ $t('tools.primeChecker.ui.quickTools') }}</h3>
        <div class="tools-grid">
          <div class="tool-card" @click="findNextPrime">
            <i class="fas fa-arrow-right"></i>
            <div>
              <strong>{{ $t('tools.primeChecker.ui.nextPrime') }}</strong>
              <p>{{ $t('tools.primeChecker.ui.nextPrimeDesc') }}</p>
            </div>
          </div>
          <div class="tool-card" @click="findPrevPrime">
            <i class="fas fa-arrow-left"></i>
            <div>
              <strong>{{ $t('tools.primeChecker.ui.prevPrime') }}</strong>
              <p>{{ $t('tools.primeChecker.ui.prevPrimeDesc') }}</p>
            </div>
          </div>
          <div class="tool-card" @click="generateRandomPrime">
            <i class="fas fa-dice"></i>
            <div>
              <strong>{{ $t('tools.primeChecker.ui.randomPrime') }}</strong>
              <p>{{ $t('tools.primeChecker.ui.randomPrimeDesc') }}</p>
            </div>
          </div>
          <div class="tool-card" @click="showFactorization">
            <i class="fas fa-sitemap"></i>
            <div>
              <strong>{{ $t('tools.primeChecker.ui.factorization') }}</strong>
              <p>{{ $t('tools.primeChecker.ui.factorizationDesc') }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 前100个质数 -->
      <div class="first-primes">
        <h3><i class="fas fa-star"></i> {{ $t('tools.primeChecker.ui.first100Primes') }}</h3>
        <div class="primes-grid">
          <span 
            v-for="(prime, index) in first100Primes" 
            :key="prime"
            @click="selectPrime(prime)"
            :class="['prime-number', { selected: selectedPrime === prime }]"
            :title="`${index + 1}`">
            {{ prime }}
          </span>
        </div>
      </div>

      <!-- 质数算法测试 -->
      <div class="algorithm-test">
        <h3><i class="fas fa-stopwatch"></i> {{ $t('tools.primeChecker.ui.algorithmTest') }}</h3>
        <div class="test-controls">
          <div class="input-group">
            <label>{{ $t('tools.primeChecker.ui.labelTestRange') }}</label>
            <select v-model="testRange">
              <option value="1000">1 - 1,000</option>
              <option value="10000">1 - 10,000</option>
              <option value="100000">1 - 100,000</option>
            </select>
          </div>
          <button @click="runPerformanceTest" :disabled="testing" class="test-btn">
            <div v-if="testing" class="loading-ring"></div>
            <i v-else class="fas fa-play"></i>
            {{ testing ? $t('tools.primeChecker.ui.testing') : $t('tools.primeChecker.ui.startTest') }}
          </button>
        </div>
        
        <div v-if="testResult" class="test-results">
          <div class="result-item">
            <label>{{ $t('tools.primeChecker.ui.labelFoundPrimes') }}</label>
            <span>{{ testResult.count }}</span>
          </div>
          <div class="result-item">
            <label>{{ $t('tools.primeChecker.ui.labelTime') }}</label>
            <span>{{ testResult.time }} ms</span>
          </div>
          <div class="result-item">
            <label>{{ $t('tools.primeChecker.ui.labelAlgorithm') }}</label>
            <span>{{ testResult.algorithm }}</span>
          </div>
        </div>
      </div>

      <!-- 质数知识 -->
      <div class="knowledge-section">
        <h3><i class="fas fa-book"></i> {{ $t('tools.primeChecker.ui.knowledgeTitle') }}</h3>
        <div class="knowledge-grid">
          <div class="knowledge-card">
            <i class="fas fa-info-circle"></i>
            <div>
              <strong>{{ $t('tools.primeChecker.ui.knowledgeDef') }}</strong>
              <p>{{ $t('tools.primeChecker.ui.knowledgeDefDesc') }}</p>
            </div>
          </div>
          <div class="knowledge-card">
            <i class="fas fa-chart-line"></i>
            <div>
              <strong>{{ $t('tools.primeChecker.ui.knowledgeTheorem') }}</strong>
              <p>{{ $t('tools.primeChecker.ui.knowledgeTheoremDesc') }}</p>
            </div>
          </div>
          <div class="knowledge-card">
            <i class="fas fa-infinity"></i>
            <div>
              <strong>{{ $t('tools.primeChecker.ui.knowledgeEuclid') }}</strong>
              <p>{{ $t('tools.primeChecker.ui.knowledgeEuclidDesc') }}</p>
            </div>
          </div>
          <div class="knowledge-card">
            <i class="fas fa-puzzle-piece"></i>
            <div>
              <strong>{{ $t('tools.primeChecker.ui.knowledgeTwin') }}</strong>
              <p>{{ $t('tools.primeChecker.ui.knowledgeTwinDesc') }}</p>
            </div>
          </div>
          <div class="knowledge-card">
            <i class="fas fa-key"></i>
            <div>
              <strong>{{ $t('tools.primeChecker.ui.knowledgeApp') }}</strong>
              <p>{{ $t('tools.primeChecker.ui.knowledgeAppDesc') }}</p>
            </div>
          </div>
          <div class="knowledge-card">
            <i class="fas fa-calculator"></i>
            <div>
              <strong>{{ $t('tools.primeChecker.ui.knowledgeAlgo') }}</strong>
              <p>{{ $t('tools.primeChecker.ui.knowledgeAlgoDesc') }}</p>
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
import messageService from '../../utils/message.js'

export default {
  name: 'PrimeChecker',
  setup() {
    const { t } = useI18n()
    const inputNumber = ref('')
    const rangeStart = ref(1)
    const rangeEnd = ref(100)
    const selectedPrime = ref(null)
    const testRange = ref('1000')
    const testing = ref(false)
    
    const result = ref({
      checked: false,
      number: null,
      isPrime: false,
      factors: [],
      factorization: '',
      digits: 0,
      primeIndex: 0
    })
    
    const primeList = ref([])
    const testResult = ref(null)
    
    // 前100个质数
    const first100Primes = [
      2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
      73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151,
      157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233,
      239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317,
      331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419,
      421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503,
      509, 521, 523, 541
    ]
    
    // 检查是否为质数
    const isPrime = (n) => {
      if (n < 2) return false
      if (n === 2) return true
      if (n % 2 === 0) return false
      
      for (let i = 3; i <= Math.sqrt(n); i += 2) {
        if (n % i === 0) return false
      }
      return true
    }
    
    // 质因数分解
    const primeFactorization = (n) => {
      const factors = []
      let temp = n
      
      // 检查2
      while (temp % 2 === 0) {
        factors.push(2)
        temp /= 2
      }
      
      // 检查奇数因子
      for (let i = 3; i <= Math.sqrt(temp); i += 2) {
        while (temp % i === 0) {
          factors.push(i)
          temp /= i
        }
      }
      
      if (temp > 2) {
        factors.push(temp)
      }
      
      return factors
    }
    
    // 格式化因式分解
    const formatFactorization = (factors) => {
      const factorCount = {}
      factors.forEach(factor => {
        factorCount[factor] = (factorCount[factor] || 0) + 1
      })
      
      return Object.entries(factorCount)
        .map(([factor, count]) => count > 1 ? `${factor}^${count}` : factor)
        .join(' × ')
    }
    
    // 找到质数在质数序列中的位置
    const findPrimeIndex = (n) => {
      let count = 0
      for (let i = 2; i <= n; i++) {
        if (isPrime(i)) {
          count++
          if (i === n) return count
        }
      }
      return 0
    }
    
    // 检查质数
    const checkPrime = () => {
      const num = parseInt(inputNumber.value)
      if (isNaN(num) || num < 1) {
        result.value.checked = false
        return
      }
      
      const factors = primeFactorization(num)
      
      result.value = {
        checked: true,
        number: num,
        isPrime: isPrime(num),
        factors: factors,
        factorization: formatFactorization(factors),
        digits: num.toString().length,
        primeIndex: isPrime(num) ? findPrimeIndex(num) : 0
      }
      
      selectedPrime.value = num
    }
    
    // 生成范围内的质数
    const generatePrimesInRange = () => {
      const start = parseInt(rangeStart.value) || 1
      const end = parseInt(rangeEnd.value) || 100
      
      if (start > end || end - start > 10000) {
        messageService.warning(t('common.warning'))
        return
      }
      
      const primes = []
      for (let i = Math.max(start, 2); i <= end; i++) {
        if (isPrime(i)) {
          primes.push(i)
        }
      }
      
      primeList.value = primes
    }
    
    // 选择质数
    const selectPrime = (prime) => {
      selectedPrime.value = prime
      inputNumber.value = prime.toString()
      checkPrime()
    }
    
    // 复制质数列表
    const copyPrimeList = () => {
      const text = primeList.value.join(', ')
      navigator.clipboard.writeText(text).then(() => {
        messageService.success(t('common.copied'))
      })
    }
    
    // 找下一个质数
    const findNextPrime = () => {
      const num = parseInt(inputNumber.value) || 2
      let next = num + 1
      while (!isPrime(next)) {
        next++
      }
      inputNumber.value = next.toString()
      checkPrime()
    }
    
    // 找上一个质数
    const findPrevPrime = () => {
      const num = parseInt(inputNumber.value) || 3
      let prev = Math.max(num - 1, 2)
      while (prev >= 2 && !isPrime(prev)) {
        prev--
      }
      if (prev >= 2) {
        inputNumber.value = prev.toString()
        checkPrime()
      }
    }
    
    // 生成随机质数
    const generateRandomPrime = () => {
      const randomIndex = Math.floor(Math.random() * first100Primes.length)
      const randomPrime = first100Primes[randomIndex]
      inputNumber.value = randomPrime.toString()
      checkPrime()
    }
    
    // 显示因式分解
    const showFactorization = () => {
      if (!result.value.checked) {
        messageService.warning(t('common.warning'))
        return
      }
      
      if (result.value.isPrime) {
        messageService.info(`${result.value.number} ${t('common.info')}`)
      } else {
        messageService.info(`${result.value.number} = ${result.value.factorization}`)
      }
    }
    
    // 性能测试
    const runPerformanceTest = async () => {
      testing.value = true
      const limit = parseInt(testRange.value)
      
      const startTime = performance.now()
      let count = 0
      
      for (let i = 2; i <= limit; i++) {
        if (isPrime(i)) {
          count++
        }
      }
      
      const endTime = performance.now()
      
      testResult.value = {
        count: count,
        time: (endTime - startTime).toFixed(2),
        algorithm: '试除法优化版'
      }
      
      testing.value = false
    }
    
    return {
      inputNumber,
      rangeStart,
      rangeEnd,
      selectedPrime,
      testRange,
      testing,
      result,
      primeList,
      testResult,
      first100Primes,
      checkPrime,
      generatePrimesInRange,
      selectPrime,
      copyPrimeList,
      findNextPrime,
      findPrevPrime,
      generateRandomPrime,
      showFactorization,
      runPerformanceTest
    }
  }
}
</script>

<style scoped>
.prime-checker {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.checker-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.main-checker {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.main-checker h3 {
  margin: 0 0 1.5rem 0;
  color: #667eea;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
}

.number-input {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.main-input {
  flex: 1;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: inherit;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.main-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.check-btn {
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.check-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.result-display {
  text-align: center;
}

.result-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.result-badge.is-prime {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
}

.result-badge.not-prime {
  background: linear-gradient(135deg, #f44336, #d32f2f);
  color: white;
}

.factors-info {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.factors {
  font-family: monospace;
  color: #667eea;
  font-weight: 500;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
}

.info-item label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.info-item span {
  color: #667eea;
  font-weight: 500;
}

.range-generator {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.range-generator h3 {
  margin: 0 0 1.5rem 0;
  color: #667eea;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.range-inputs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  align-items: end;
}

.input-group {
  display: flex;
  flex-direction: column;
  min-width: 120px;
}

.input-group label {
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9rem;
}

.input-group input, .input-group select {
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: inherit;
}

.generate-btn, .copy-btn, .test-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.generate-btn:hover, .copy-btn:hover, .test-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.test-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.list-header h4 {
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
}

.prime-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: 0.5rem;
}

.prime-item {
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.prime-item:hover {
  background: rgba(102, 126, 234, 0.2);
  transform: translateY(-2px);
}

.prime-item.selected {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.3);
}

.quick-tools {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.quick-tools h3 {
  margin: 0 0 1rem 0;
  color: #667eea;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.tool-card {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.tool-card:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.tool-card i {
  color: #667eea;
  font-size: 1.2rem;
  margin-top: 0.2rem;
}

.tool-card strong {
  color: rgba(255, 255, 255, 0.9);
  display: block;
  margin-bottom: 0.25rem;
}

.tool-card p {
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.first-primes {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.first-primes h3 {
  margin: 0 0 1rem 0;
  color: #667eea;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.primes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
  gap: 0.5rem;
}

.prime-number {
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  font-size: 0.9rem;
}

.prime-number:hover {
  background: rgba(102, 126, 234, 0.2);
  transform: translateY(-1px);
}

.prime-number.selected {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.3);
}

.algorithm-test {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.algorithm-test h3 {
  margin: 0 0 1rem 0;
  color: #667eea;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.test-controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: end;
  flex-wrap: wrap;
}

.test-results {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.result-item {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
}

.result-item label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.result-item span {
  color: #667eea;
  font-weight: 500;
}

.knowledge-section {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.knowledge-section h3 {
  margin: 0 0 1rem 0;
  color: #667eea;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.knowledge-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.knowledge-card {
  display: flex;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;
}

.knowledge-card i {
  color: #667eea;
  font-size: 1.2rem;
  margin-top: 0.2rem;
}

.knowledge-card strong {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.5rem;
  display: block;
}

.knowledge-card p {
  margin: 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .number-input {
    flex-direction: column;
  }
  
  .range-inputs {
    flex-direction: column;
    align-items: stretch;
  }
  
  .list-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .test-controls {
    flex-direction: column;
    align-items: stretch;
  }
  
  .tools-grid {
    grid-template-columns: 1fr;
  }
  
  .knowledge-grid {
    grid-template-columns: 1fr;
  }
}
</style> 