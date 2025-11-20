<template>
  <div class="tool-card">
    <!-- 渐变色头部 -->
    <div class="tool-header" style="background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);">
      <div class="tool-icon">
        <i class="fas fa-database"></i>
      </div>
      <div class="tool-title">
        <h2>{{ $t('tools.sqlConverter.ui.title') }}</h2>
        <p>{{ $t('tools.sqlConverter.ui.description') }}</p>
      </div>
    </div>

    <!-- 示例按钮 -->
    <div class="example-section" style="display: flex;justify-content: space-between;width: 500px;">
      <button @click="loadExample('basic')" class="example-btn">
        <i class="fas fa-magic"></i> {{ $t('tools.sqlConverter.ui.basicQuery') }}
      </button>
      <button @click="loadExample('complex')" class="example-btn">
        <i class="fas fa-layer-group"></i> {{ $t('tools.sqlConverter.ui.complexQuery') }}
      </button>
      <button @click="loadExample('ddl')" class="example-btn">
        <i class="fas fa-table"></i> {{ $t('tools.sqlConverter.ui.tableStructure') }}
      </button>
    </div>

    <!-- SQL输入区域 -->
    <div class="input-section">
      <h3><i class="fas fa-code"></i> {{ $t('tools.sqlConverter.ui.inputSql') }}</h3>
      <div class="input-container">
        <div class="input-toolbar">
          <select v-model="sourceDatabase" class="db-select">
            <option value="mysql">MySQL</option>
            <option value="postgresql">PostgreSQL</option>
            <option value="sqlite">SQLite</option>
            <option value="sqlserver">SQL Server</option>
            <option value="oracle">Oracle</option>
            <option value="standard">{{ $t('tools.sqlConverter.ui.standardSql') }}</option>
          </select>
          <button @click="formatSql" class="toolbar-btn" :title="$t('tools.sqlConverter.ui.format')">
            <i class="fas fa-align-left"></i> {{ $t('tools.sqlConverter.ui.format') }}
          </button>
          <button @click="minifySql" class="toolbar-btn" :title="$t('tools.sqlConverter.ui.minify')">
            <i class="fas fa-compress"></i> {{ $t('tools.sqlConverter.ui.minify') }}
          </button>
          <button @click="clearInput" class="toolbar-btn" :title="$t('tools.sqlConverter.ui.clear')">
            <i class="fas fa-trash"></i> {{ $t('tools.sqlConverter.ui.clear') }}
          </button>
        </div>
        <textarea 
          v-model="inputSql" 
          :placeholder="$t('tools.sqlConverter.ui.placeholder')"
          rows="12"
          @input="analyzeSql"
        ></textarea>
      </div>
    </div>

    <!-- 转换设置 -->
    <div class="conversion-section">
      <h3><i class="fas fa-exchange-alt"></i> {{ $t('tools.sqlConverter.ui.conversionSettings') }}</h3>
      <div class="conversion-options">
        <div class="form-group">
          <label>{{ $t('tools.sqlConverter.ui.targetDatabase') }}</label>
          <select v-model="targetDatabase">
            <option value="mysql">MySQL</option>
            <option value="postgresql">PostgreSQL</option>
            <option value="sqlite">SQLite</option>
            <option value="sqlserver">SQL Server</option>
            <option value="oracle">Oracle</option>
            <option value="standard">{{ $t('tools.sqlConverter.ui.standardSql') }}</option>
          </select>
        </div>

        <div class="form-group">
          <label>{{ $t('tools.sqlConverter.ui.outputFormat') }}</label>
          <select v-model="outputFormat">
            <option value="formatted">{{ $t('tools.sqlConverter.ui.formatted') }}</option>
            <option value="compact">{{ $t('tools.sqlConverter.ui.compact') }}</option>
            <option value="minified">{{ $t('tools.sqlConverter.ui.minified') }}</option>
            <option value="pretty">{{ $t('tools.sqlConverter.ui.pretty') }}</option>
          </select>
        </div>

        <div class="checkbox-options">
          <label>
            <input type="checkbox" v-model="conversionOptions.preserveComments">
            <span>{{ $t('tools.sqlConverter.ui.preserveComments') }}</span>
          </label>
          <label>
            <input type="checkbox" v-model="conversionOptions.convertCase">
            <span>{{ $t('tools.sqlConverter.ui.convertCase') }}</span>
          </label>
          <label>
            <input type="checkbox" v-model="conversionOptions.addTablePrefix">
            <span>{{ $t('tools.sqlConverter.ui.addTablePrefix') }}</span>
          </label>
          <label>
            <input type="checkbox" v-model="conversionOptions.optimizeQuery">
            <span>{{ $t('tools.sqlConverter.ui.optimizeQuery') }}</span>
          </label>
        </div>

        <button @click="convertSql" class="convert-btn" :disabled="!inputSql.trim() || converting">
          <i class="fas fa-sync-alt"></i>
          {{ converting ? $t('tools.sqlConverter.ui.converting') : $t('tools.sqlConverter.ui.startConversion') }}
        </button>
      </div>
    </div>

    <!-- 转换结果 -->
    <div v-if="convertedSql" class="result-section">
      <h3><i class="fas fa-check-circle"></i> {{ $t('tools.sqlConverter.ui.conversionResult') }}</h3>
      
      <!-- 结果标签页 -->
      <div class="tab-container">
        <div class="tabs">
          <button 
            :class="['tab', { active: activeTab === 'result' }]"
            @click="activeTab = 'result'"
          >
            <i class="fas fa-code"></i> {{ $t('tools.sqlConverter.ui.result') }}
          </button>
          <button 
            :class="['tab', { active: activeTab === 'diff' }]"
            @click="activeTab = 'diff'"
          >
            <i class="fas fa-code-branch"></i> {{ $t('tools.sqlConverter.ui.diffComparison') }}
          </button>
          <button 
            :class="['tab', { active: activeTab === 'analysis' }]"
            @click="activeTab = 'analysis'"
          >
            <i class="fas fa-chart-bar"></i> {{ $t('tools.sqlConverter.ui.analysisReport') }}
          </button>
        </div>
        
        <div class="tab-content">
          <!-- 转换结果 -->
          <div v-if="activeTab === 'result'" class="result-container">
            <div class="result-header">
              <span class="db-label">{{ targetDatabase.toUpperCase() }}</span>
              <div class="result-actions">
                <button @click="copyToClipboard(convertedSql)" class="action-btn">
                  <i class="fas fa-copy"></i> {{ $t('tools.sqlConverter.ui.copy') }}
                </button>
                <button @click="downloadSql" class="action-btn">
                  <i class="fas fa-download"></i> {{ $t('tools.sqlConverter.ui.download') }}
                </button>
                <button @click="validateSql" class="action-btn">
                  <i class="fas fa-check"></i> {{ $t('tools.sqlConverter.ui.validate') }}
                </button>
              </div>
            </div>
            <pre class="sql-code"><code>{{ convertedSql }}</code></pre>
          </div>
          
          <!-- 差异对比 -->
          <div v-if="activeTab === 'diff'" class="diff-container">
            <div class="diff-comparison">
              <div class="diff-side">
                <h4>{{ $t('tools.sqlConverter.ui.originalSql') }} ({{ sourceDatabase.toUpperCase() }})</h4>
                <pre class="sql-code original"><code>{{ formattedOriginalSql }}</code></pre>
              </div>
              <div class="diff-side">
                <h4>{{ $t('tools.sqlConverter.ui.convertedSql') }} ({{ targetDatabase.toUpperCase() }})</h4>
                <pre class="sql-code converted"><code>{{ convertedSql }}</code></pre>
              </div>
            </div>
          </div>
          
          <!-- 分析报告 -->
          <div v-if="activeTab === 'analysis'" class="analysis-container">
            <div class="analysis-stats">
              <div class="stat-card">
                <div class="stat-icon">
                  <i class="fas fa-table"></i>
                </div>
                <div class="stat-content">
                  <span class="stat-value">{{ analysisResult.tableCount }}</span>
                  <span class="stat-label">{{ $t('tools.sqlConverter.ui.tableCount') }}</span>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">
                  <i class="fas fa-columns"></i>
                </div>
                <div class="stat-content">
                  <span class="stat-value">{{ analysisResult.columnCount }}</span>
                  <span class="stat-label">{{ $t('tools.sqlConverter.ui.columnCount') }}</span>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">
                  <i class="fas fa-layer-group"></i>
                </div>
                <div class="stat-content">
                  <span class="stat-value">{{ analysisResult.queryType }}</span>
                  <span class="stat-label">{{ $t('tools.sqlConverter.ui.queryType') }}</span>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">
                  <i class="fas fa-tachometer-alt"></i>
                </div>
                <div class="stat-content">
                  <span class="stat-value">{{ analysisResult.complexity }}</span>
                  <span class="stat-label">{{ $t('tools.sqlConverter.ui.complexity') }}</span>
                </div>
              </div>
            </div>
            
            <div class="analysis-details">
              <h4><i class="fas fa-list"></i> {{ $t('tools.sqlConverter.ui.conversionDetails') }}</h4>
              <ul class="conversion-changes">
                <li v-for="change in analysisResult.changes" :key="change" class="change-item">
                  <i class="fas fa-check text-success"></i>
                  {{ change }}
                </li>
              </ul>
              
              <h4><i class="fas fa-exclamation-triangle"></i> {{ $t('tools.sqlConverter.ui.notes') }}</h4>
              <ul class="conversion-warnings">
                <li v-for="warning in analysisResult.warnings" :key="warning" class="warning-item">
                  <i class="fas fa-exclamation-triangle text-warning"></i>
                  {{ warning }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- SQL语法检查 -->
    <div v-if="syntaxErrors.length > 0" class="syntax-errors">
      <h3><i class="fas fa-exclamation-circle"></i> {{ $t('tools.sqlConverter.ui.syntaxCheck') }}</h3>
      <div class="error-list">
        <div v-for="error in syntaxErrors" :key="error.line" class="error-item">
          <span class="error-line">{{ $t('tools.sqlConverter.ui.line') }}{{ error.line }}{{ $t('tools.sqlConverter.ui.lineUnit') }}</span>
          <span class="error-message">{{ error.message }}</span>
          <span class="error-suggestion" v-if="error.suggestion">{{ $t('tools.sqlConverter.ui.suggestion') }} {{ error.suggestion }}</span>
        </div>
      </div>
    </div>

    <!-- 使用说明 -->
    <div class="help-section">
      <h3><i class="fas fa-question-circle"></i> {{ $t('tools.sqlConverter.ui.usageInstructions') }}</h3>
      <ul>
        <li><strong>{{ $t('tools.sqlConverter.ui.databaseSupport').split('：')[0] }}：</strong>{{ $t('tools.sqlConverter.ui.databaseSupport').split('：')[1] }}</li>
        <li><strong>{{ $t('tools.sqlConverter.ui.syntaxConversion').split('：')[0] }}：</strong>{{ $t('tools.sqlConverter.ui.syntaxConversion').split('：')[1] }}</li>
        <li><strong>{{ $t('tools.sqlConverter.ui.formatting').split('：')[0] }}：</strong>{{ $t('tools.sqlConverter.ui.formatting').split('：')[1] }}</li>
        <li><strong>{{ $t('tools.sqlConverter.ui.syntaxValidation').split('：')[0] }}：</strong>{{ $t('tools.sqlConverter.ui.syntaxValidation').split('：')[1] }}</li>
        <li><strong>{{ $t('tools.sqlConverter.ui.queryOptimization').split('：')[0] }}：</strong>{{ $t('tools.sqlConverter.ui.queryOptimization').split('：')[1] }}</li>
        <li><strong>{{ $t('tools.sqlConverter.ui.batchProcessing').split('：')[0] }}：</strong>{{ $t('tools.sqlConverter.ui.batchProcessing').split('：')[1] }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
export default {
  name: 'SqlConverter',
  setup() {
    const { t } = useI18n()
    // 响应式数据
    const inputSql = ref('')
    const sourceDatabase = ref('mysql')
    const targetDatabase = ref('postgresql')
    const outputFormat = ref('formatted')
    const convertedSql = ref('')
    const formattedOriginalSql = ref('')
    const converting = ref(false)
    const activeTab = ref('result')
    const syntaxErrors = ref([])

    // 转换选项
    const conversionOptions = reactive({
      preserveComments: true,
      convertCase: false,
      addTablePrefix: false,
      optimizeQuery: false
    })

    // 分析结果
    const analysisResult = reactive({
      tableCount: 0,
      columnCount: 0,
      queryType: '',
      complexity: '',
      changes: [],
      warnings: []
    })

    // 数据库特性映射
    const databaseFeatures = {
      mysql: {
        quoteChar: '`',
        limitSyntax: 'LIMIT',
        autoIncrement: 'AUTO_INCREMENT',
        stringConcat: 'CONCAT',
        dateFormat: 'DATE_FORMAT',
        ifNull: 'IFNULL'
      },
      postgresql: {
        quoteChar: '"',
        limitSyntax: 'LIMIT',
        autoIncrement: 'SERIAL',
        stringConcat: '||',
        dateFormat: 'TO_CHAR',
        ifNull: 'COALESCE'
      },
      sqlite: {
        quoteChar: '"',
        limitSyntax: 'LIMIT',
        autoIncrement: 'AUTOINCREMENT',
        stringConcat: '||',
        dateFormat: 'strftime',
        ifNull: 'IFNULL'
      },
      sqlserver: {
        quoteChar: '[',
        limitSyntax: 'TOP',
        autoIncrement: 'IDENTITY',
        stringConcat: '+',
        dateFormat: 'FORMAT',
        ifNull: 'ISNULL'
      },
      oracle: {
        quoteChar: '"',
        limitSyntax: 'ROWNUM',
        autoIncrement: 'SEQUENCE',
        stringConcat: '||',
        dateFormat: 'TO_CHAR',
        ifNull: 'NVL'
      }
    }

    // 格式化SQL
    const formatSql = () => {
      if (!inputSql.value.trim()) return

      let formatted = inputSql.value
        // 添加换行和缩进
        .replace(/\bSELECT\b/gi, '\nSELECT')
        .replace(/\bFROM\b/gi, '\nFROM')
        .replace(/\bWHERE\b/gi, '\nWHERE')
        .replace(/\bAND\b/gi, '\n  AND')
        .replace(/\bOR\b/gi, '\n  OR')
        .replace(/\bORDER BY\b/gi, '\nORDER BY')
        .replace(/\bGROUP BY\b/gi, '\nGROUP BY')
        .replace(/\bHAVING\b/gi, '\nHAVING')
        .replace(/\bLEFT JOIN\b/gi, '\nLEFT JOIN')
        .replace(/\bRIGHT JOIN\b/gi, '\nRIGHT JOIN')
        .replace(/\bINNER JOIN\b/gi, '\nINNER JOIN')
        .replace(/\bJOIN\b/gi, '\nJOIN')
        .replace(/\bON\b/gi, '\n  ON')
        // 清理多余空格和换行
        .replace(/\s+/g, ' ')
        .replace(/\n\s+/g, '\n')
        .trim()

      inputSql.value = formatted
      analyzeSql()
    }

    // 压缩SQL
    const minifySql = () => {
      if (!inputSql.value.trim()) return

      const minified = inputSql.value
        .replace(/\s+/g, ' ')
        .replace(/\s*,\s*/g, ',')
        .replace(/\s*=\s*/g, '=')
        .replace(/\s*\(\s*/g, '(')
        .replace(/\s*\)\s*/g, ')')
        .trim()

      inputSql.value = minified
      analyzeSql()
    }

    // 清空输入
    const clearInput = () => {
      inputSql.value = ''
      convertedSql.value = ''
      syntaxErrors.value = []
      analysisResult.tableCount = 0
      analysisResult.columnCount = 0
      analysisResult.queryType = ''
      analysisResult.complexity = ''
      analysisResult.changes = []
      analysisResult.warnings = []
    }

    // 分析SQL
    const analyzeSql = () => {
      if (!inputSql.value.trim()) return

      const sql = inputSql.value.toLowerCase()
      
      // 分析查询类型
      if (sql.includes('select')) {
        analysisResult.queryType = 'SELECT'
      } else if (sql.includes('insert')) {
        analysisResult.queryType = 'INSERT'
      } else if (sql.includes('update')) {
        analysisResult.queryType = 'UPDATE'
      } else if (sql.includes('delete')) {
        analysisResult.queryType = 'DELETE'
      } else if (sql.includes('create')) {
        analysisResult.queryType = 'CREATE'
      } else {
        analysisResult.queryType = 'OTHER'
      }

      // 统计表数量
      const tableMatches = sql.match(/from\s+(\w+)|join\s+(\w+)|update\s+(\w+)|into\s+(\w+)/g)
      analysisResult.tableCount = tableMatches ? new Set(tableMatches.map(m => m.split(/\s+/)[1])).size : 0

      // 统计字段数量（简单估算）
      const columnMatches = sql.match(/select\s+([^from]+)/i)
      if (columnMatches) {
        const columns = columnMatches[1].split(',').filter(c => c.trim() && !c.includes('*'))
        analysisResult.columnCount = columns.length || 1
      }

      // 评估复杂度
      let complexity = 0
      if (sql.includes('join')) complexity += 2
      if (sql.includes('subquery') || sql.includes('select') && sql.match(/select/g).length > 1) complexity += 3
      if (sql.includes('union')) complexity += 2
      if (sql.includes('group by')) complexity += 1
      if (sql.includes('having')) complexity += 1

      if (complexity === 0) analysisResult.complexity = t('tools.sqlConverter.ui.complexitySimple')
      else if (complexity <= 3) analysisResult.complexity = t('tools.sqlConverter.ui.complexityMedium')
      else if (complexity <= 6) analysisResult.complexity = t('tools.sqlConverter.ui.complexityComplex')
      else analysisResult.complexity = t('tools.sqlConverter.ui.complexityVeryComplex')

      // 简单的语法检查
      checkSyntax()
    }

    // 语法检查
    const checkSyntax = () => {
      syntaxErrors.value = []
      const lines = inputSql.value.split('\n')
      
      lines.forEach((line, index) => {
        const trimmedLine = line.trim().toLowerCase()
        
        // 检查括号匹配
        const openParens = (line.match(/\(/g) || []).length
        const closeParens = (line.match(/\)/g) || []).length
        
        if (openParens !== closeParens && trimmedLine.length > 0) {
          syntaxErrors.value.push({
            line: index + 1,
            message: t('tools.sqlConverter.ui.bracketMismatch'),
            suggestion: t('tools.sqlConverter.ui.checkBrackets')
          })
        }

        // 检查常见错误
        if (trimmedLine.includes('select') && !trimmedLine.includes('from') && !trimmedLine.includes('*')) {
          if (index === lines.length - 1 || !lines.slice(index + 1).some(l => l.toLowerCase().includes('from'))) {
            syntaxErrors.value.push({
              line: index + 1,
              message: t('tools.sqlConverter.ui.missingFromClause'),
              suggestion: t('tools.sqlConverter.ui.addFromClause')
            })
          }
        }
      })
    }

    // 转换SQL
    const convertSql = async () => {
      if (!inputSql.value.trim()) return

      converting.value = true
      
      try {
        // 模拟转换过程
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        let converted = inputSql.value
        const sourceFeatures = databaseFeatures[sourceDatabase.value]
        const targetFeatures = databaseFeatures[targetDatabase.value]
        
        // 格式化原始SQL
        formattedOriginalSql.value = formatSqlForDisplay(inputSql.value)
        
        // 重置分析结果
        analysisResult.changes = []
        analysisResult.warnings = []

        // 转换引号字符
        if (sourceFeatures.quoteChar !== targetFeatures.quoteChar) {
          const sourceQuote = sourceFeatures.quoteChar === '[' ? '\\[' : sourceFeatures.quoteChar
          const sourceQuoteEnd = sourceFeatures.quoteChar === '[' ? '\\]' : sourceFeatures.quoteChar
          const targetQuoteEnd = targetFeatures.quoteChar === '[' ? ']' : targetFeatures.quoteChar
          
          converted = converted.replace(new RegExp(sourceQuote + '([^' + sourceQuoteEnd + ']+)' + sourceQuoteEnd, 'g'), 
            targetFeatures.quoteChar + '$1' + targetQuoteEnd)
          
          analysisResult.changes.push(t('tools.sqlConverter.ui.quoteConversion', { source: sourceFeatures.quoteChar, target: targetFeatures.quoteChar }))
        }

        // 转换LIMIT语法
        if (sourceDatabase.value === 'mysql' && targetDatabase.value === 'sqlserver') {
          converted = converted.replace(/LIMIT\s+(\d+)/gi, 'TOP $1')
          analysisResult.changes.push(t('tools.sqlConverter.ui.limitToTop'))
        } else if (sourceDatabase.value === 'sqlserver' && targetDatabase.value === 'mysql') {
          converted = converted.replace(/TOP\s+(\d+)/gi, 'LIMIT $1')
          analysisResult.changes.push(t('tools.sqlConverter.ui.topToLimit'))
        }

        // 转换自增字段
        if (sourceFeatures.autoIncrement !== targetFeatures.autoIncrement) {
          converted = converted.replace(new RegExp(sourceFeatures.autoIncrement, 'gi'), targetFeatures.autoIncrement)
          analysisResult.changes.push(t('tools.sqlConverter.ui.autoIncrementConversion', { source: sourceFeatures.autoIncrement, target: targetFeatures.autoIncrement }))
        }

        // 转换字符串连接
        if (sourceFeatures.stringConcat !== targetFeatures.stringConcat) {
          if (sourceFeatures.stringConcat === 'CONCAT') {
            converted = converted.replace(/CONCAT\s*\(\s*([^,]+)\s*,\s*([^)]+)\s*\)/gi, '$1 ' + targetFeatures.stringConcat + ' $2')
          }
          analysisResult.changes.push(t('tools.sqlConverter.ui.stringConcatConversion'))
        }

        // 转换NULL处理函数
        if (sourceFeatures.ifNull !== targetFeatures.ifNull) {
          converted = converted.replace(new RegExp(sourceFeatures.ifNull, 'gi'), targetFeatures.ifNull)
          analysisResult.changes.push(t('tools.sqlConverter.ui.nullFunctionConversion', { source: sourceFeatures.ifNull, target: targetFeatures.ifNull }))
        }

        // 格式化输出
        converted = formatSqlForDisplay(converted)

        // 添加转换警告
        if (sourceDatabase.value !== targetDatabase.value) {
          analysisResult.warnings.push(t('tools.sqlConverter.ui.testInTargetDb'))
          
          if (sourceDatabase.value === 'oracle' || targetDatabase.value === 'oracle') {
            analysisResult.warnings.push(t('tools.sqlConverter.ui.oracleManualAdjust'))
          }
          
          if (sourceDatabase.value === 'sqlserver' || targetDatabase.value === 'sqlserver') {
            analysisResult.warnings.push(t('tools.sqlConverter.ui.sqlserverIdentityNote'))
          }
        }

        if (analysisResult.changes.length === 0) {
          analysisResult.changes.push(t('tools.sqlConverter.ui.noConversionNeeded'))
        }

        convertedSql.value = converted
        activeTab.value = 'result'

      } catch (error) {
        console.error('SQL conversion failed:', error)
      } finally {
        converting.value = false
      }
    }

    // 格式化SQL用于显示
    const formatSqlForDisplay = (sql) => {
      if (outputFormat.value === 'minified') {
        return sql.replace(/\s+/g, ' ').trim()
      } else if (outputFormat.value === 'compact') {
        return sql.replace(/\n\s+/g, '\n').replace(/\s+/g, ' ').trim()
      } else {
        // 格式化或美化
        return sql
          .replace(/\bSELECT\b/gi, 'SELECT')
          .replace(/\bFROM\b/gi, '\nFROM')
          .replace(/\bWHERE\b/gi, '\nWHERE')
          .replace(/\bAND\b/gi, '\n  AND')
          .replace(/\bOR\b/gi, '\n  OR')
          .replace(/\bORDER BY\b/gi, '\nORDER BY')
          .replace(/\bGROUP BY\b/gi, '\nGROUP BY')
          .replace(/\bHAVING\b/gi, '\nHAVING')
          .replace(/\bLEFT JOIN\b/gi, '\nLEFT JOIN')
          .replace(/\bRIGHT JOIN\b/gi, '\nRIGHT JOIN')
          .replace(/\bINNER JOIN\b/gi, '\nINNER JOIN')
          .replace(/\bJOIN\b/gi, '\nJOIN')
          .replace(/\bON\b/gi, '\n  ON')
          .replace(/\n\s*\n/g, '\n')
          .trim()
      }
    }

    // 加载示例
    const loadExample = (type) => {
      const examples = {
        basic: `SELECT u.id, u.name, u.email
FROM users u
WHERE u.status = 'active'
  AND u.created_at >= '2024-01-01'
ORDER BY u.created_at DESC
LIMIT 10;`,

        complex: `SELECT 
    u.id,
    u.name,
    COUNT(o.id) as order_count,
    SUM(o.total_amount) as total_spent,
    IFNULL(p.discount_rate, 0) as discount_rate
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
LEFT JOIN user_profiles p ON u.id = p.user_id
WHERE u.status = 'active'
  AND o.created_at >= DATE_SUB(NOW(), INTERVAL 1 YEAR)
GROUP BY u.id, u.name, p.discount_rate
HAVING COUNT(o.id) > 5
ORDER BY total_spent DESC
LIMIT 20;`,

        ddl: `CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_status_created (status, created_at)
);`
      }

      inputSql.value = examples[type] || examples.basic
      analyzeSql()
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

    // 下载SQL文件
    const downloadSql = () => {
      if (!convertedSql.value) return

      const blob = new Blob([convertedSql.value], { type: 'text/sql' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `converted_${targetDatabase.value}_${Date.now()}.sql`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }

    // 验证SQL
    const validateSql = () => {
      // 简单验证
      const sql = convertedSql.value.toLowerCase()
      const hasValidStructure = 
        sql.includes('select') || 
        sql.includes('insert') || 
        sql.includes('update') || 
        sql.includes('delete') || 
        sql.includes('create')

      if (hasValidStructure) {
        messageService.success(t('common.completed'))
      } else {
        messageService.warning(t('common.warning'))
      }
    }

    return {
      inputSql,
      sourceDatabase,
      targetDatabase,
      outputFormat,
      convertedSql,
      formattedOriginalSql,
      converting,
      activeTab,
      syntaxErrors,
      conversionOptions,
      analysisResult,
      formatSql,
      minifySql,
      clearInput,
      analyzeSql,
      convertSql,
      loadExample,
      copyToClipboard,
      downloadSql,
      validateSql
    }
  }
}
</script>

<style scoped>
.input-section, .conversion-section, .result-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.input-container {
  position: relative;
}

.input-toolbar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.db-select {
  background: linear-gradient(45deg, #007bff, #6610f2);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
}

.toolbar-btn {
  background: linear-gradient(45deg, #6c757d, #495057);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.toolbar-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(108, 117, 125, 0.3);
}

.input-container textarea {
  width: 100%;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 10px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  resize: vertical;
  min-height: 200px;
}

.conversion-options {
  display: grid;
  gap: 1.5rem;
}

.conversion-options .form-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.checkbox-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.convert-btn {
  background: linear-gradient(45deg, #28a745, #20c997);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.convert-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(40, 167, 69, 0.3);
}

.convert-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.tab-container {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.tabs {
  display: flex;
  background: #f8f9fa;
}

.tab {
  background: none;
  border: none;
  padding: 1rem 1.5rem;
  cursor: pointer;
  font-weight: 500;
  color: #6c757d;
  transition: all 0.3s ease;
  flex: 1;
}

.tab.active {
  background: white;
  color: #495057;
  border-bottom: 2px solid #007bff;
}

.tab-content {
  padding: 1.5rem;
  min-height: 400px;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.db-label {
  background: linear-gradient(45deg, #007bff, #6610f2);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.8rem;
}

.result-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  background: linear-gradient(45deg, #28a745, #20c997);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

.action-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(40, 167, 69, 0.3);
}

.sql-code {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  padding: 10px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.4;
  overflow-x: auto;
  white-space: pre-wrap;
}

.sql-code.original {
  border-left: 4px solid #dc3545;
}

.sql-code.converted {
  border-left: 4px solid #28a745;
}

.diff-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.diff-side h4 {
  margin-bottom: 0.5rem;
  color: #495057;
}

.analysis-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 10px;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  background: linear-gradient(45deg, #007bff, #6610f2);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.stat-content {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #495057;
}

.stat-label {
  font-size: 0.8rem;
  color: #6c757d;
}

.analysis-details h4 {
  color: #495057;
  margin-bottom: 10px;
  margin-top: 2rem;
}

.conversion-changes, .conversion-warnings {
  list-style: none;
  padding: 0;
}

.change-item, .warning-item {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.text-success {
  color: #28a745;
}

.text-warning {
  color: #ffc107;
}

.syntax-errors {
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.error-list {
  margin-top: 1rem;
}

.error-item {
  margin-bottom: 10px;
  padding: 10px;
  background: white;
  border-radius: 6px;
  border-left: 4px solid #dc3545;
}

.error-line {
  background: #dc3545;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-right: 0.5rem;
}

.error-message {
  color: #721c24;
  font-weight: 500;
}

.error-suggestion {
  display: block;
  color: #856404;
  font-size: 0.9rem;
  margin-top: 0.5rem;
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
  color: #ff9a9e;
  font-weight: bold;
  position: absolute;
  left: 0;
}

@media (max-width: 768px) {
  .input-toolbar {
    flex-direction: column;
    align-items: stretch;
  }
  
  .toolbar-btn, .db-select {
    width: 100%;
  }
  
  .diff-comparison {
    grid-template-columns: 1fr;
  }
  
  .analysis-stats {
    grid-template-columns: 1fr;
  }
  
  .result-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  
  .result-actions {
    justify-content: center;
  }
  
  .tabs {
    flex-direction: column;
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

/* Checkbox 统一样式 */
input[type="checkbox"] {
  width: 20px;
  margin-bottom: 0px;
}
</style> 