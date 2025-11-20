<template>
  <div class="quadratic-solver">
    <div class="solver-container">
      <!-- 方程输入 -->
      <div class="equation-input">
        <h3><i class="fas fa-square-root-alt"></i> {{ $t('tools.quadraticSolver.ui.title') }}</h3>
        
        <div class="equation-form">
          <div class="equation-display">
            <div class="equation-visual">
              <span class="coefficient-input">
                <input v-model="coefficients.a" type="number" step="0.1" placeholder="1" @input="solve">
                <label>a</label>
              </span>
              <span class="term">x²</span>
              
              <span class="operator">{{ coefficients.b >= 0 ? '+' : '' }}</span>
              
              <span class="coefficient-input">
                <input v-model="coefficients.b" type="number" step="0.1" placeholder="0" @input="solve">
                <label>b</label>
              </span>
              <span class="term">x</span>
              
              <span class="operator">{{ coefficients.c >= 0 ? '+' : '' }}</span>
              
              <span class="coefficient-input">
                <input v-model="coefficients.c" type="number" step="0.1" placeholder="0" @input="solve">
                <label>c</label>
              </span>
              
              <span class="equals">=</span>
              <span class="zero">0</span>
            </div>
          </div>
          
          <div class="formatted-equation">
            <strong>{{ $t('tools.quadraticSolver.ui.standardForm') }}</strong>
            <span class="equation-text">{{ formattedEquation }}</span>
          </div>
        </div>
      </div>

      <!-- 求解结果 -->
      <div v-if="solution.calculated" class="solution-section">
        <h3><i class="fas fa-calculator"></i> {{ $t('tools.quadraticSolver.ui.solutionTitle') }}</h3>
        
        <!-- 判别式信息 -->
        <div class="discriminant-info">
          <div class="discriminant-card">
            <div class="discriminant-label">{{ $t('tools.quadraticSolver.ui.discriminantLabel') }}</div>
            <div class="discriminant-calc">
              {{ $t('tools.quadraticSolver.ui.discriminantCalc') }} {{ coefficients.b }}² - 4 × {{ coefficients.a }} × {{ coefficients.c }}
              {{ $t('tools.quadraticSolver.ui.discriminantEquals') }} {{ solution.discriminant }}
            </div>
            <div :class="['discriminant-type', solution.rootType]">
              {{ solution.rootDescription }}
            </div>
          </div>
        </div>

        <!-- 根的结果 -->
        <div class="roots-section">
          <div v-if="solution.rootType === 'two-real'" class="roots-display">
            <div class="root-card">
              <div class="root-label">{{ $t('tools.quadraticSolver.ui.rootX1') }}</div>
              <div class="root-value">{{ solution.roots.x1 }}</div>
              <div class="root-decimal">{{ $t('tools.quadraticSolver.ui.rootApprox') }} {{ solution.roots.x1Decimal }}</div>
            </div>
            <div class="root-card">
              <div class="root-label">{{ $t('tools.quadraticSolver.ui.rootX2') }}</div>
              <div class="root-value">{{ solution.roots.x2 }}</div>
              <div class="root-decimal">{{ $t('tools.quadraticSolver.ui.rootApprox') }} {{ solution.roots.x2Decimal }}</div>
            </div>
          </div>
          
          <div v-else-if="solution.rootType === 'one-real'" class="roots-display">
            <div class="root-card single">
              <div class="root-label">{{ $t('tools.quadraticSolver.ui.rootX') }}</div>
              <div class="root-value">{{ solution.roots.x }}</div>
              <div class="root-decimal">{{ $t('tools.quadraticSolver.ui.rootApprox') }} {{ solution.roots.xDecimal }}</div>
            </div>
          </div>
          
          <div v-else-if="solution.rootType === 'complex'" class="roots-display">
            <div class="root-card">
              <div class="root-label">{{ $t('tools.quadraticSolver.ui.rootX1') }}</div>
              <div class="root-value complex">{{ solution.roots.x1 }}</div>
            </div>
            <div class="root-card">
              <div class="root-label">{{ $t('tools.quadraticSolver.ui.rootX2') }}</div>
              <div class="root-value complex">{{ solution.roots.x2 }}</div>
            </div>
          </div>
        </div>

        <!-- 解题步骤 -->
        <div class="solution-steps">
          <h4><i class="fas fa-list-ol"></i> {{ $t('tools.quadraticSolver.ui.solutionSteps') }}</h4>
          <div class="steps-container">
            <div v-for="(step, index) in solution.steps" :key="index" class="step-item">
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-content">
                <div class="step-description">{{ step.description }}</div>
                <div class="step-formula">{{ step.formula }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 函数图像信息 -->
        <div class="graph-info">
          <h4><i class="fas fa-chart-line"></i> {{ $t('tools.quadraticSolver.ui.parabolaProps') }}</h4>
          <div class="properties-grid">
            <div class="property-item">
              <label>{{ $t('tools.quadraticSolver.ui.labelOpening') }}</label>
              <span>{{ properties.opening }}</span>
            </div>
            <div class="property-item">
              <label>{{ $t('tools.quadraticSolver.ui.labelAxis') }}</label>
              <span>x = {{ properties.axisOfSymmetry }}</span>
            </div>
            <div class="property-item">
              <label>{{ $t('tools.quadraticSolver.ui.labelVertex') }}</label>
              <span>({{ properties.vertex.x }}, {{ properties.vertex.y }})</span>
            </div>
            <div class="property-item">
              <label>{{ $t('tools.quadraticSolver.ui.labelYIntercept') }}</label>
              <span>{{ coefficients.c }}</span>
            </div>
            <div v-if="solution.rootType !== 'complex'" class="property-item">
              <label>{{ $t('tools.quadraticSolver.ui.labelXIntercepts') }}</label>
              <span>{{ properties.xIntercepts }}</span>
            </div>
            <div class="property-item">
              <label>{{ $t('tools.quadraticSolver.ui.labelExtremum') }}</label>
              <span>{{ properties.extremum }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 快速示例 -->
      <div class="examples-section">
        <h3><i class="fas fa-lightbulb"></i> {{ $t('tools.quadraticSolver.ui.examples') }}</h3>
        <div class="examples-grid">
          <div v-for="example in examples" :key="example.name" class="example-card" @click="loadExample(example)">
            <div class="example-name">{{ example.name }}</div>
            <div class="example-equation">{{ example.equation }}</div>
            <div class="example-type">{{ example.type }}</div>
          </div>
        </div>
      </div>

      <!-- 工具按钮 -->
      <div class="tools-section">
        <div class="tools-grid">
          <button @click="clearAll" class="tool-btn secondary">
            <i class="fas fa-eraser"></i>
            {{ $t('tools.quadraticSolver.ui.clear') }}
          </button>
          <button @click="randomExample" class="tool-btn primary">
            <i class="fas fa-dice"></i>
            {{ $t('tools.quadraticSolver.ui.randomExample') }}
          </button>
          <button @click="validateSolution" class="tool-btn success" :disabled="!solution.calculated">
            <i class="fas fa-check"></i>
            {{ $t('tools.quadraticSolver.ui.validateSolution') }}
          </button>
          <button @click="showDerivative" class="tool-btn info">
            <i class="fas fa-chart-area"></i>
            {{ $t('tools.quadraticSolver.ui.showDerivative') }}
          </button>
        </div>
      </div>

      <!-- 知识点 -->
      <div class="knowledge-section">
        <h3><i class="fas fa-book"></i> {{ $t('tools.quadraticSolver.ui.knowledgeTitle') }}</h3>
        <div class="knowledge-grid">
          <div class="knowledge-card">
            <i class="fas fa-info-circle"></i>
            <div>
              <strong>{{ $t('tools.quadraticSolver.ui.knowledgeStandard') }}</strong>
              <p>{{ $t('tools.quadraticSolver.ui.knowledgeStandardDesc') }}</p>
            </div>
          </div>
          <div class="knowledge-card">
            <i class="fas fa-square-root-alt"></i>
            <div>
              <strong>{{ $t('tools.quadraticSolver.ui.knowledgeFormula') }}</strong>
              <p>{{ $t('tools.quadraticSolver.ui.knowledgeFormulaDesc') }}</p>
            </div>
          </div>
          <div class="knowledge-card">
            <i class="fas fa-calculator"></i>
            <div>
              <strong>{{ $t('tools.quadraticSolver.ui.knowledgeDiscriminant') }}</strong>
              <p>{{ $t('tools.quadraticSolver.ui.knowledgeDiscriminantDesc') }}</p>
            </div>
          </div>
          <div class="knowledge-card">
            <i class="fas fa-chart-line"></i>
            <div>
              <strong>{{ $t('tools.quadraticSolver.ui.knowledgeRoots') }}</strong>
              <p>{{ $t('tools.quadraticSolver.ui.knowledgeRootsDesc') }}</p>
            </div>
          </div>
          <div class="knowledge-card">
            <i class="fas fa-plus"></i>
            <div>
              <strong>{{ $t('tools.quadraticSolver.ui.knowledgeVieta') }}</strong>
              <p>{{ $t('tools.quadraticSolver.ui.knowledgeVietaDesc') }}</p>
            </div>
          </div>
          <div class="knowledge-card">
            <i class="fas fa-anchor"></i>
            <div>
              <strong>{{ $t('tools.quadraticSolver.ui.knowledgeVertex') }}</strong>
              <p>{{ $t('tools.quadraticSolver.ui.knowledgeVertexDesc') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import messageService from '../../utils/message.js'

export default {
  name: 'QuadraticSolver',
  setup() {
    const { t } = useI18n()
    const coefficients = ref({
      a: '1',
      b: '0',
      c: '0'
    })
    
    const solution = ref({
      calculated: false,
      discriminant: 0,
      rootType: '',
      rootDescription: '',
      roots: {},
      steps: []
    })
    
    const examples = computed(() => [
      {
        name: t('tools.quadraticSolver.ui.exampleClassic'),
        equation: 'x² - 5x + 6 = 0',
        type: t('tools.quadraticSolver.ui.exampleTypeTwoReal'),
        a: 1, b: -5, c: 6
      },
      {
        name: t('tools.quadraticSolver.ui.examplePerfectSquare'),
        equation: 'x² - 4x + 4 = 0',
        type: t('tools.quadraticSolver.ui.exampleTypeOneReal'),
        a: 1, b: -4, c: 4
      },
      {
        name: t('tools.quadraticSolver.ui.exampleNoReal'),
        equation: 'x² + x + 1 = 0',
        type: t('tools.quadraticSolver.ui.exampleTypeComplex'),
        a: 1, b: 1, c: 1
      },
      {
        name: t('tools.quadraticSolver.ui.exampleNoB'),
        equation: '2x² - 8 = 0',
        type: t('tools.quadraticSolver.ui.exampleTypeSimple'),
        a: 2, b: 0, c: -8
      },
      {
        name: t('tools.quadraticSolver.ui.exampleNoC'),
        equation: '3x² - 12x = 0',
        type: t('tools.quadraticSolver.ui.exampleTypeFactor'),
        a: 3, b: -12, c: 0
      },
      {
        name: t('tools.quadraticSolver.ui.exampleFraction'),
        equation: '0.5x² + 1.5x - 2 = 0',
        type: t('tools.quadraticSolver.ui.exampleTypeDecimal'),
        a: 0.5, b: 1.5, c: -2
      }
    ])
    
    const formattedEquation = computed(() => {
      const a = parseFloat(coefficients.value.a) || 1
      const b = parseFloat(coefficients.value.b) || 0
      const c = parseFloat(coefficients.value.c) || 0
      
      let equation = ''
      
      // a项
      if (a === 1) {
        equation += 'x²'
      } else if (a === -1) {
        equation += '-x²'
      } else {
        equation += `${a}x²`
      }
      
      // b项
      if (b > 0) {
        equation += b === 1 ? ' + x' : ` + ${b}x`
      } else if (b < 0) {
        equation += b === -1 ? ' - x' : ` - ${Math.abs(b)}x`
      }
      
      // c项
      if (c > 0) {
        equation += ` + ${c}`
      } else if (c < 0) {
        equation += ` - ${Math.abs(c)}`
      }
      
      return equation + ' = 0'
    })
    
    const properties = computed(() => {
      const a = parseFloat(coefficients.value.a) || 1
      const b = parseFloat(coefficients.value.b) || 0
      const c = parseFloat(coefficients.value.c) || 0
      
      const axisX = -b / (2 * a)
      const vertexY = (4 * a * c - b * b) / (4 * a)
      
      return {
        opening: a > 0 ? t('tools.quadraticSolver.ui.openingUp') : t('tools.quadraticSolver.ui.openingDown'),
        axisOfSymmetry: axisX.toFixed(2),
        vertex: {
          x: axisX.toFixed(2),
          y: vertexY.toFixed(2)
        },
        xIntercepts: getXIntercepts(),
        extremum: a > 0 ? `${t('tools.quadraticSolver.ui.minValue')}${vertexY.toFixed(2)}` : `${t('tools.quadraticSolver.ui.maxValue')}${vertexY.toFixed(2)}`
      }
    })
    
    const getXIntercepts = () => {
      if (solution.value.rootType === 'two-real') {
        return `${solution.value.roots.x1Decimal}, ${solution.value.roots.x2Decimal}`
      } else if (solution.value.rootType === 'one-real') {
        return solution.value.roots.xDecimal
      } else {
        return t('tools.quadraticSolver.ui.noRealIntercepts')
      }
    }
    
    const solve = () => {
      const a = parseFloat(coefficients.value.a)
      const b = parseFloat(coefficients.value.b) || 0
      const c = parseFloat(coefficients.value.c) || 0
      
      if (!a || a === 0) {
        solution.value.calculated = false
        return
      }
      
      const discriminant = b * b - 4 * a * c
      solution.value.discriminant = discriminant
      solution.value.steps = []
      
      // 添加解题步骤
      solution.value.steps.push({
        description: t('tools.quadraticSolver.ui.stepDetermine'),
        formula: `a = ${a}, b = ${b}, c = ${c}`
      })
      
      solution.value.steps.push({
        description: t('tools.quadraticSolver.ui.stepCalculate'),
        formula: `Δ = b² - 4ac = ${b}² - 4(${a})(${c}) = ${discriminant}`
      })
      
      if (discriminant > 0) {
        // 两个不等实根
        solution.value.rootType = 'two-real'
        solution.value.rootDescription = t('tools.quadraticSolver.ui.rootDescTwoReal')
        
        const sqrtD = Math.sqrt(discriminant)
        const x1 = (-b + sqrtD) / (2 * a)
        const x2 = (-b - sqrtD) / (2 * a)
        
        solution.value.roots = {
          x1: `(-${b} + √${discriminant}) / ${2 * a}`,
          x2: `(-${b} - √${discriminant}) / ${2 * a}`,
          x1Decimal: x1.toFixed(4),
          x2Decimal: x2.toFixed(4)
        }
        
        solution.value.steps.push({
          description: t('tools.quadraticSolver.ui.stepUseFormula'),
          formula: `x = (-b ± √Δ) / 2a = (-${b} ± √${discriminant}) / ${2 * a}`
        })
        
        solution.value.steps.push({
          description: t('tools.quadraticSolver.ui.stepCalculateRoots'),
          formula: `x₁ = ${x1.toFixed(4)}, x₂ = ${x2.toFixed(4)}`
        })
        
      } else if (discriminant === 0) {
        // 重根
        solution.value.rootType = 'one-real'
        solution.value.rootDescription = t('tools.quadraticSolver.ui.rootDescOneReal')
        
        const x = -b / (2 * a)
        
        solution.value.roots = {
          x: `(-${b}) / ${2 * a}`,
          xDecimal: x.toFixed(4)
        }
        
        solution.value.steps.push({
          description: t('tools.quadraticSolver.ui.stepCalculateDouble'),
          formula: `x = -b / 2a = -${b} / ${2 * a} = ${x.toFixed(4)}`
        })
        
      } else {
        // 复数根
        solution.value.rootType = 'complex'
        solution.value.rootDescription = t('tools.quadraticSolver.ui.rootDescComplex')
        
        const realPart = -b / (2 * a)
        const imagPart = Math.sqrt(-discriminant) / (2 * a)
        
        solution.value.roots = {
          x1: `${realPart.toFixed(4)} + ${imagPart.toFixed(4)}i`,
          x2: `${realPart.toFixed(4)} - ${imagPart.toFixed(4)}i`
        }
        
        solution.value.steps.push({
          description: t('tools.quadraticSolver.ui.stepCalculateComplex'),
          formula: `x = (-${b} ± √${discriminant}i) / ${2 * a}`
        })
        
        solution.value.steps.push({
          description: t('tools.quadraticSolver.ui.stepSimplify'),
          formula: `x₁ = ${realPart.toFixed(4)} + ${imagPart.toFixed(4)}i, x₂ = ${realPart.toFixed(4)} - ${imagPart.toFixed(4)}i`
        })
      }
      
      solution.value.calculated = true
    }
    
    const loadExample = (example) => {
      coefficients.value.a = example.a.toString()
      coefficients.value.b = example.b.toString()
      coefficients.value.c = example.c.toString()
      solve()
    }
    
    const clearAll = () => {
      coefficients.value.a = '1'
      coefficients.value.b = '0'
      coefficients.value.c = '0'
      solution.value.calculated = false
    }
    
    const randomExample = () => {
      const randomIndex = Math.floor(Math.random() * examples.length)
      loadExample(examples[randomIndex])
    }
    
    const validateSolution = () => {
      if (!solution.value.calculated) return
      
      const a = parseFloat(coefficients.value.a)
      const b = parseFloat(coefficients.value.b) || 0
      const c = parseFloat(coefficients.value.c) || 0
      
      let message = '验证结果:\n'
      
      if (solution.value.rootType === 'two-real') {
        const x1 = parseFloat(solution.value.roots.x1Decimal)
        const x2 = parseFloat(solution.value.roots.x2Decimal)
        
        const result1 = a * x1 * x1 + b * x1 + c
        const result2 = a * x2 * x2 + b * x2 + c
        
        message += `将x₁ = ${x1}代入: ${result1.toFixed(6)}\n`
        message += `将x₂ = ${x2}代入: ${result2.toFixed(6)}\n`
        message += Math.abs(result1) < 0.001 && Math.abs(result2) < 0.001 ? '✓ 验证正确' : '✗ 验证有误'
        
      } else if (solution.value.rootType === 'one-real') {
        const x = parseFloat(solution.value.roots.xDecimal)
        const result = a * x * x + b * x + c
        
        message += `将x = ${x}代入: ${result.toFixed(6)}\n`
        message += Math.abs(result) < 0.001 ? '✓ 验证正确' : '✗ 验证有误'
      } else {
        message += '复数根无法直接验证'
      }
      
      messageService.info(message)
    }
    
    const showDerivative = () => {
      const a = parseFloat(coefficients.value.a)
      const b = parseFloat(coefficients.value.b) || 0
      
      const derivative = `f'(x) = ${2 * a}x + ${b}`
      messageService.info(`f(x) = ${formattedEquation.value.replace(' = 0', '')} ${t('common.info')}:\n${derivative}`)
    }
    
    // 监听系数变化自动求解
    watch(coefficients, solve, { deep: true })
    
    // 初始求解
    solve()
    
    return {
      coefficients,
      solution,
      examples,
      formattedEquation,
      properties,
      solve,
      loadExample,
      clearAll,
      randomExample,
      validateSolution,
      showDerivative
    }
  }
}
</script>

<style scoped>
.quadratic-solver {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.solver-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.equation-input {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.equation-input h3 {
  margin: 0 0 1.5rem 0;
  color: #667eea;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
}

.equation-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  font-size: 1.5rem;
}

.coefficient-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.coefficient-input input {
  width: 60px;
  padding: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  color: inherit;
  text-align: center;
  font-size: 1rem;
}

.coefficient-input label {
  color: #667eea;
  font-size: 0.8rem;
  font-weight: 500;
}

.term, .operator, .equals, .zero {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.operator {
  margin: 0 0.25rem;
}

.formatted-equation {
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  margin-top: 1rem;
}

.equation-text {
  font-family: monospace;
  color: #667eea;
  font-size: 1.1rem;
}

.solution-section {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.solution-section h3 {
  margin: 0 0 1.5rem 0;
  color: #667eea;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.discriminant-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.discriminant-label {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 0.5rem;
}

.discriminant-calc {
  font-family: monospace;
  color: #667eea;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.discriminant-type {
  font-weight: 500;
  padding: 0.5rem;
  border-radius: 6px;
}

.discriminant-type.two-real {
  color: #4CAF50;
  background: rgba(76, 175, 80, 0.1);
}

.discriminant-type.one-real {
  color: #ff9800;
  background: rgba(255, 152, 0, 0.1);
}

.discriminant-type.complex {
  color: #f44336;
  background: rgba(244, 67, 54, 0.1);
}

.roots-display {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.root-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  min-width: 200px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.root-card.single {
  background: rgba(255, 152, 0, 0.1);
  border-color: rgba(255, 152, 0, 0.3);
}

.root-label {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.root-value {
  color: #667eea;
  font-family: monospace;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.root-value.complex {
  color: #f44336;
}

.root-decimal {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.solution-steps {
  margin-bottom: 2rem;
}

.solution-steps h4 {
  margin: 0 0 1rem 0;
  color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.steps-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.step-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.step-number {
  min-width: 2rem;
  height: 2rem;
  background: #667eea;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9rem;
}

.step-content {
  flex: 1;
}

.step-description {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.25rem;
}

.step-formula {
  font-family: monospace;
  background: rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  border-radius: 4px;
  color: #667eea;
}

.graph-info h4 {
  margin: 0 0 1rem 0;
  color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.properties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.property-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
}

.property-item label {
  color: rgba(255, 255, 255, 0.8);
}

.property-item span {
  color: #667eea;
  font-family: monospace;
}

.examples-section {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.examples-section h3 {
  margin: 0 0 1rem 0;
  color: #667eea;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.examples-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.example-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.example-card:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.example-name {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.5rem;
}

.example-equation {
  font-family: monospace;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.example-type {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
}

.tools-section {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.tool-btn {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.tool-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.tool-btn.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.tool-btn.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: inherit;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.tool-btn.success {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
}

.tool-btn.info {
  background: linear-gradient(135deg, #2196F3, #1976D2);
  color: white;
}

.tool-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
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
  font-family: monospace;
}

@media (max-width: 768px) {
  .equation-visual {
    font-size: 1.2rem;
  }
  
  .roots-display {
    flex-direction: column;
    align-items: center;
  }
  
  .properties-grid {
    grid-template-columns: 1fr;
  }
  
  .examples-grid {
    grid-template-columns: 1fr;
  }
  
  .tools-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .knowledge-grid {
    grid-template-columns: 1fr;
  }
}
</style> 