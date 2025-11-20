<template>
  <div class="tool-card">
    <!-- 渐变色头部 -->
    <div class="tool-header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <div class="tool-icon">
        <i class="fas fa-list"></i>
      </div>
      <div class="tool-title">
        <h2>{{ $t('tools.sqlInGenerator.ui.title') }}</h2>
        <p>{{ $t('tools.sqlInGenerator.ui.description') }}</p>
      </div>
    </div>

    <!-- 示例按钮 -->
    <div class="example-section">
      <button @click="loadExample" class="example-btn">
        <i class="fas fa-magic"></i> {{ $t('tools.sqlInGenerator.ui.loadExample') }}
      </button>
    </div>

    <!-- 输入区域 -->
    <div class="form-group">
      <label for="input-data">
        <i class="fas fa-keyboard"></i> {{ $t('tools.sqlInGenerator.ui.inputData') }}
      </label>
      <textarea 
        id="input-data"
        v-model="inputData" 
        :placeholder="$t('tools.sqlInGenerator.ui.inputDataPlaceholder')"
        rows="8"
      ></textarea>
    </div>

    <!-- 配置选项 -->
    <div class="options-grid">
      <div class="form-group">
        <label>{{ $t('tools.sqlInGenerator.ui.dataType') }}</label>
        <select v-model="dataType">
          <option value="auto">{{ $t('tools.sqlInGenerator.ui.dataTypeAuto') }}</option>
          <option value="string">{{ $t('tools.sqlInGenerator.ui.dataTypeString') }}</option>
          <option value="number">{{ $t('tools.sqlInGenerator.ui.dataTypeNumber') }}</option>
          <option value="mixed">{{ $t('tools.sqlInGenerator.ui.dataTypeMixed') }}</option>
        </select>
      </div>

      <div class="form-group">
        <label>{{ $t('tools.sqlInGenerator.ui.fieldName') }}</label>
        <input v-model="fieldName" type="text" :placeholder="$t('tools.sqlInGenerator.ui.fieldNamePlaceholder')">
      </div>

      <div class="form-group">
        <label>{{ $t('tools.sqlInGenerator.ui.quoteType') }}</label>
        <select v-model="quoteType">
          <option value="single">{{ $t('tools.sqlInGenerator.ui.quoteTypeSingle') }}</option>
          <option value="double">{{ $t('tools.sqlInGenerator.ui.quoteTypeDouble') }}</option>
          <option value="none">{{ $t('tools.sqlInGenerator.ui.quoteTypeNone') }}</option>
        </select>
      </div>

      <div class="form-group">
        <label>{{ $t('tools.sqlInGenerator.ui.outputFormat') }}</label>
        <select v-model="outputFormat">
          <option value="single">{{ $t('tools.sqlInGenerator.ui.outputFormatSingle') }}</option>
          <option value="multi">{{ $t('tools.sqlInGenerator.ui.outputFormatMulti') }}</option>
          <option value="formatted">{{ $t('tools.sqlInGenerator.ui.outputFormatFormatted') }}</option>
        </select>
      </div>
    </div>

    <!-- 高级选项 -->
    <div class="checkbox-group">
      <label>
        <input type="checkbox" v-model="removeDuplicates">
        <span>{{ $t('tools.sqlInGenerator.ui.removeDuplicates') }}</span>
      </label>
      <label>
        <input type="checkbox" v-model="removeEmpty">
        <span>{{ $t('tools.sqlInGenerator.ui.removeEmpty') }}</span>
      </label>
      <label>
        <input type="checkbox" v-model="sortResults">
        <span>{{ $t('tools.sqlInGenerator.ui.sortResults') }}</span>
      </label>
      <label>
        <input type="checkbox" v-model="includeNot">
        <span>{{ $t('tools.sqlInGenerator.ui.includeNot') }}</span>
      </label>
    </div>

    <!-- 结果显示 -->
    <div v-if="sqlResult" class="result-display">
      <h3><i class="fas fa-code"></i> {{ $t('tools.sqlInGenerator.ui.generatedSql') }}</h3>
      <div class="result-code">{{ sqlResult }}</div>
      <div class="result-actions">
        <button @click="copyToClipboard(sqlResult)" class="copy-btn">
          <i class="fas fa-copy"></i> {{ $t('tools.sqlInGenerator.ui.copySql') }}
        </button>
        <button @click="downloadSql" class="download-btn">
          <i class="fas fa-download"></i> {{ $t('tools.sqlInGenerator.ui.downloadFile') }}
        </button>
      </div>
    </div>

    <!-- 数据统计 -->
    <div v-if="statistics.total > 0" class="statistics">
      <h3><i class="fas fa-chart-bar"></i> {{ $t('tools.sqlInGenerator.ui.dataStatistics') }}</h3>
      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-label">{{ $t('tools.sqlInGenerator.ui.total') }}</span>
          <span class="stat-value">{{ statistics.total }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">{{ $t('tools.sqlInGenerator.ui.valid') }}</span>
          <span class="stat-value">{{ statistics.valid }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">{{ $t('tools.sqlInGenerator.ui.duplicates') }}</span>
          <span class="stat-value">{{ statistics.duplicates }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">{{ $t('tools.sqlInGenerator.ui.empty') }}</span>
          <span class="stat-value">{{ statistics.empty }}</span>
        </div>
      </div>
    </div>

    <!-- 使用说明 -->
    <div class="help-section">
      <h3><i class="fas fa-question-circle"></i> {{ $t('tools.sqlInGenerator.ui.usageInstructions') }}</h3>
      <ul>
        <li><strong>{{ $t('tools.sqlInGenerator.ui.inputFormat') }}</strong>{{ $t('tools.sqlInGenerator.ui.inputFormatDesc') }}</li>
        <li><strong>{{ $t('tools.sqlInGenerator.ui.autoDetect') }}</strong>{{ $t('tools.sqlInGenerator.ui.autoDetectDesc') }}</li>
        <li><strong>{{ $t('tools.sqlInGenerator.ui.fieldNameDesc') }}</strong>{{ $t('tools.sqlInGenerator.ui.fieldNameDescText') }}</li>
        <li><strong>{{ $t('tools.sqlInGenerator.ui.dedupeSort') }}</strong>{{ $t('tools.sqlInGenerator.ui.dedupeSortDesc') }}</li>
        <li><strong>{{ $t('tools.sqlInGenerator.ui.notIn') }}</strong>{{ $t('tools.sqlInGenerator.ui.notInDesc') }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import messageService from '../../utils/message.js'

export default {
  name: 'SqlInGenerator',
  setup() {
    const { t } = useI18n()
    // 响应式数据
    const inputData = ref('')
    const fieldName = ref('id')
    const dataType = ref('auto')
    const quoteType = ref('single')
    const outputFormat = ref('single')
    const removeDuplicates = ref(true)
    const removeEmpty = ref(true)
    const sortResults = ref(false)
    const includeNot = ref(false)

    // 统计信息
    const statistics = ref({
      total: 0,
      valid: 0,
      duplicates: 0,
      empty: 0
    })

    // 解析输入数据
    const parseInputData = (input) => {
      if (!input.trim()) return []

      let items = []
      
      try {
        // 尝试解析为JSON数组
        if (input.trim().startsWith('[') && input.trim().endsWith(']')) {
          items = JSON.parse(input)
        } else {
          // 按逗号分隔
          if (input.includes(',')) {
            items = input.split(',')
          } else {
            // 按换行分隔
            items = input.split('\n')
          }
        }
      } catch (e) {
        // 如果JSON解析失败，按逗号或换行分隔
        if (input.includes(',')) {
          items = input.split(',')
        } else {
          items = input.split('\n')
        }
      }

      // 清理数据
      const originalLength = items.length
      let cleaned = items.map(item => {
        if (typeof item === 'string') {
          return item.trim().replace(/^['"]|['"]$/g, '') // 移除首尾引号
        }
        return String(item).trim()
      })

      // 统计信息
      const emptyCount = cleaned.filter(item => !item).length
      
      if (removeEmpty.value) {
        cleaned = cleaned.filter(item => item)
      }

      const duplicateCount = originalLength - [...new Set(cleaned)].length
      
      if (removeDuplicates.value) {
        cleaned = [...new Set(cleaned)]
      }

      if (sortResults.value) {
        cleaned.sort((a, b) => {
          const aNum = Number(a)
          const bNum = Number(b)
          if (!isNaN(aNum) && !isNaN(bNum)) {
            return aNum - bNum
          }
          return a.localeCompare(b)
        })
      }

      // 更新统计
      statistics.value = {
        total: originalLength,
        valid: cleaned.length,
        duplicates: duplicateCount,
        empty: emptyCount
      }

      return cleaned
    }

    // 检测数据类型
    const detectDataType = (items) => {
      if (items.length === 0) return 'string'
      
      const allNumbers = items.every(item => !isNaN(Number(item)) && item !== '')
      if (allNumbers) return 'number'
      
      return 'string'
    }

    // 格式化值
    const formatValue = (value, type, quote) => {
      if (type === 'number' || quote === 'none') {
        return value
      }
      
      const quoteChar = quote === 'double' ? '"' : "'"
      return `${quoteChar}${value}${quoteChar}`
    }

    // 生成SQL语句
    const sqlResult = computed(() => {
      if (!inputData.value.trim()) return ''

      const items = parseInputData(inputData.value)
      if (items.length === 0) return ''

      // 确定数据类型
      const actualType = dataType.value === 'auto' ? detectDataType(items) : dataType.value
      const actualQuote = dataType.value === 'auto' && actualType === 'number' ? 'none' : quoteType.value

      // 格式化值
      const formattedItems = items.map(item => formatValue(item, actualType, actualQuote))

      // 构建SQL语句
      const operator = includeNot.value ? 'NOT IN' : 'IN'
      const field = fieldName.value || 'id'

      if (outputFormat.value === 'single') {
        return `${field} ${operator} (${formattedItems.join(', ')})`
      } else if (outputFormat.value === 'multi') {
        const indentedItems = formattedItems.map(item => `  ${item}`).join(',\n')
        return `${field} ${operator} (\n${indentedItems}\n)`
      } else { // formatted
        const chunks = []
        for (let i = 0; i < formattedItems.length; i += 5) {
          chunks.push(formattedItems.slice(i, i + 5))
        }
        const formattedChunks = chunks.map(chunk => `  ${chunk.join(', ')}`).join(',\n')
        return `${field} ${operator} (\n${formattedChunks}\n)`
      }
    })

    // 监听输入变化
    watch([inputData, fieldName, dataType, quoteType, outputFormat, removeDuplicates, removeEmpty, sortResults, includeNot], () => {
      // 触发重新计算
    })

    // 加载示例数据
    const loadExample = () => {
      inputData.value = `1001,1002,1003,1004,1005
user_001
user_002
user_003
'admin'
"guest"
1000`
      fieldName.value = 'user_id'
    }

    // 复制到剪贴板
    const copyToClipboard = async (text) => {
      try {
        await navigator.clipboard.writeText(text)
        messageService.success(t('common.copied'))
      } catch (err) {
        // 备用方法
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
      if (!sqlResult.value) return

      const blob = new Blob([sqlResult.value], { type: 'text/sql' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `sql_in_statement_${Date.now()}.sql`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }

    return {
      inputData,
      fieldName,
      dataType,
      quoteType,
      outputFormat,
      removeDuplicates,
      removeEmpty,
      sortResults,
      includeNot,
      sqlResult,
      statistics,
      loadExample,
      copyToClipboard,
      downloadSql
    }
  }
}
</script>

<style scoped>
.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.result-code {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 10px;
  font-family: 'Courier New', monospace;
  white-space: pre-wrap;
  max-height: 300px;
  overflow-y: auto;
  line-height: 1.4;
}

.result-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.copy-btn, .download-btn {
  background: linear-gradient(45deg, #28a745, #20c997);
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.copy-btn:hover, .download-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(40, 167, 69, 0.3);
}

.statistics {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 1.5rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.stat-item {
  text-align: center;
  padding: 0.8rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.stat-label {
  display: block;
  font-size: 0.8rem;
  color: #6c757d;
  margin-bottom: 0.2rem;
}

.stat-value {
  display: block;
  font-size: 1.4rem;
  font-weight: 600;
  color: #495057;
}

.help-section {
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
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
  color: #1976d2;
  font-weight: bold;
  position: absolute;
  left: 0;
}

@media (max-width: 768px) {
  .options-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .result-actions {
    flex-direction: column;
  }
}

/* 工具头部样式 */
.tool-header {
  padding: 10px;
  margin-bottom: 10px;
}
</style> 