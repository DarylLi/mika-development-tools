<template>
  <div class="uuid-batch-tool">
    <div class="tool-header">
      <h3><i class="fas fa-fingerprint"></i> {{ $t('tools.uuidBatch.ui.title') }}</h3>
      <p>{{ $t('tools.uuidBatch.ui.description') }}</p>
    </div>

    <div class="tool-content">
      <div class="generation-controls">
        <div class="control-group">
          <label for="version">{{ $t('tools.uuidBatch.ui.version') }}</label>
          <select id="version" v-model="version">
            <option value="v4">{{ $t('tools.uuidBatch.ui.version4') }}</option>
            <option value="v1">{{ $t('tools.uuidBatch.ui.version1') }}</option>
          </select>
        </div>
        
        <div class="control-group">
          <label for="format">{{ $t('tools.uuidBatch.ui.format') }}</label>
          <select id="format" v-model="format">
            <option value="standard">{{ $t('tools.uuidBatch.ui.formatStandard') }}</option>
            <option value="compact">{{ $t('tools.uuidBatch.ui.formatCompact') }}</option>
            <option value="uppercase">{{ $t('tools.uuidBatch.ui.formatUppercase') }}</option>
            <option value="braces">{{ $t('tools.uuidBatch.ui.formatBraces') }}</option>
          </select>
        </div>
        
        <div class="control-group">
          <label for="count">{{ $t('tools.uuidBatch.ui.count') }}</label>
          <input type="number" id="count" v-model.number="count" min="1" max="1000" />
        </div>
        
        <div class="control-group">
          <label for="includeTimestamp">{{ $t('tools.uuidBatch.ui.includeTimestamp') }}</label>
          <input type="checkbox" id="includeTimestamp" v-model="includeTimestamp" />
        </div>
      </div>

      <div class="actions">
        <button @click="generateUUIDs" class="btn-primary">
          <i class="fas fa-fingerprint"></i> {{ $t('tools.uuidBatch.ui.generateUUID') }}
        </button>
        <button @click="copyAllUUIDs" class="btn-secondary" :disabled="!uuids.length">
          <i class="fas fa-copy"></i> {{ $t('tools.uuidBatch.ui.copyAll') }}
        </button>
        <button @click="exportUUIDs" class="btn-secondary" :disabled="!uuids.length">
          <i class="fas fa-download"></i> {{ $t('tools.uuidBatch.ui.exportFile') }}
        </button>
        <button @click="clearUUIDs" class="btn-secondary" :disabled="!uuids.length">
          <i class="fas fa-trash"></i> {{ $t('tools.uuidBatch.ui.clearList') }}
        </button>
      </div>

      <div class="uuid-stats" v-if="uuids.length">
        <div class="stat-card">
          <div class="stat-value">{{ uuids.length }}</div>
          <div class="stat-label">{{ $t('tools.uuidBatch.ui.generated') }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ version.toUpperCase() }}</div>
          <div class="stat-label">{{ $t('tools.uuidBatch.ui.versionLabel') }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ getFormatName(format) }}</div>
          <div class="stat-label">{{ $t('tools.uuidBatch.ui.formatLabel') }}</div>
        </div>
      </div>

      <div class="uuid-display" v-if="uuids.length">
        <h4>{{ $t('tools.uuidBatch.ui.uuidList') }}</h4>
        
        <div class="uuid-list">
          <div 
            v-for="(item, index) in uuids" 
            :key="index" 
            class="uuid-item"
          >
            <div class="uuid-content">
              <div class="uuid-value">{{ item.value }}</div>
              <div class="uuid-meta" v-if="includeTimestamp">
                <span class="timestamp">{{ item.timestamp }}</span>
                <span class="index">#{{ index + 1 }}</span>
              </div>
            </div>
            
            <div class="uuid-actions">
              <button @click="copyUUID(item.value)" class="btn-icon copy-btn" :title="$t('tools.uuidBatch.ui.copy')">
                <i class="fas fa-copy"></i>
              </button>
              <button @click="removeUUID(index)" class="btn-icon remove-btn" :title="$t('tools.uuidBatch.ui.delete')">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import messageService from '../../utils/message.js'

export default {
  name: 'UuidBatch',
  setup() {
    const { t } = useI18n()
    const version = ref('v4')
    const format = ref('standard')
    const count = ref(10)
    const includeTimestamp = ref(false)
    const uuids = ref([])

    // 生成 UUID v4
    const generateUUIDv4 = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0
        const v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    }

    // 生成 UUID v1 (简化版)
    const generateUUIDv1 = () => {
      const now = Date.now()
      const clockSeq = Math.random() * 0x3fff | 0
      const node = Array.from({length: 6}, () => Math.random() * 255 | 0)
      
      const timeLow = (now & 0xffffffff).toString(16).padStart(8, '0')
      const timeMid = ((now >>> 32) & 0xffff).toString(16).padStart(4, '0')
      const timeHi = (((now >>> 48) & 0x0fff) | 0x1000).toString(16).padStart(4, '0')
      const clockSeqHi = ((clockSeq >>> 8) | 0x80).toString(16).padStart(2, '0')
      const clockSeqLow = (clockSeq & 0xff).toString(16).padStart(2, '0')
      const nodeStr = node.map(n => n.toString(16).padStart(2, '0')).join('')
      
      return `${timeLow}-${timeMid}-${timeHi}-${clockSeqHi}${clockSeqLow}-${nodeStr}`
    }

    // 格式化 UUID
    const formatUUID = (uuid) => {
      const clean = uuid.replace(/-/g, '')
      
      switch (format.value) {
        case 'compact':
          return clean
        case 'uppercase':
          return uuid.toUpperCase()
        case 'braces':
          return `{${uuid}}`
        default:
          return uuid
      }
    }

    // 生成 UUID
    const generateUUID = () => {
      let uuid
      
      switch (version.value) {
        case 'v1':
          uuid = generateUUIDv1()
          break
        default:
          uuid = generateUUIDv4()
      }
      
      return formatUUID(uuid)
    }

    // 批量生成 UUIDs
    const generateUUIDs = () => {
      const newUUIDs = []
      
      for (let i = 0; i < count.value; i++) {
        const uuid = generateUUID()
        newUUIDs.push({
          value: uuid,
          timestamp: includeTimestamp.value ? new Date().toLocaleString() : null
        })
      }
      
      uuids.value.push(...newUUIDs)
    }

    // 复制单个 UUID
    const copyUUID = async (uuid) => {
      try {
        await navigator.clipboard.writeText(uuid)
        // 简单的视觉反馈
        const button = event.target.closest('button')
        if (button) {
          button.style.background = '#28a745'
          setTimeout(() => {
            button.style.background = ''
          }, 500)
        }
      } catch (error) {
        console.error(t('tools.uuidBatch.ui.copyFailed') + ':', error)
      }
    }

    // 复制所有 UUIDs
    const copyAllUUIDs = async () => {
      const uuidList = uuids.value.map(item => item.value).join('\n')
      
      try {
        await navigator.clipboard.writeText(uuidList)
        messageService.success(t('common.copied'))
      } catch (error) {
        console.error(t('tools.uuidBatch.ui.copyFailed') + ':', error)
      }
    }

    // 导出 UUIDs
    const exportUUIDs = async () => {
      const exportData = {
        uuids: uuids.value,
        metadata: {
          version: version.value,
          format: format.value,
          count: uuids.value.length,
          generatedAt: new Date().toISOString()
        }
      }
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `uuids_${version.value}_${new Date().toISOString().slice(0, 10)}.json`
      a.click()
      URL.revokeObjectURL(url)
    }

    // 删除 UUID
    const removeUUID = (index) => {
      uuids.value.splice(index, 1)
    }

    // 清空 UUIDs
    const clearUUIDs = async () => {
      if (await messageService.confirm(t('common.confirm'))) {
        uuids.value = []
      }
    }

    // 获取格式名称
    const getFormatName = (formatValue) => {
      const formatMap = {
        standard: t('tools.uuidBatch.ui.formatStandardName'),
        compact: t('tools.uuidBatch.ui.formatCompactName'),
        uppercase: t('tools.uuidBatch.ui.formatUppercaseName'),
        braces: t('tools.uuidBatch.ui.formatBracesName')
      }
      return formatMap[formatValue] || formatValue
    }

    return {
      version,
      format,
      count,
      includeTimestamp,
      uuids,
      generateUUIDs,
      copyUUID,
      copyAllUUIDs,
      exportUUIDs,
      removeUUID,
      clearUUIDs,
      getFormatName
    }
  }
}
</script>

<style scoped>
.uuid-batch-tool {
  max-width: 1200px;
  margin: 0 auto;
}

.tool-header {
  text-align: center;
  margin-bottom: 10px;
  padding: 10px;
}

.tool-header h3 {
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.tool-header p {
  color: var(--text-secondary);
}

.generation-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 10px;
  padding: 1.5rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.control-group {
  display: flex;
  flex-direction: column;
}

.control-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-primary);
}

.control-group select,
.control-group input[type="number"] {
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--bg-primary);
  color: var(--text-primary);
}

input[type="checkbox"] {
  width: 20px;
  margin-bottom: 0px;
}

.control-group input[type="checkbox"] {
  width: 20px;
  height: 20px;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background: var(--accent-color);
  color: white;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.btn-secondary {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--accent-color);
  color: white;
}

.btn-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-icon {
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--bg-secondary);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.btn-icon:hover {
  background: var(--accent-color);
  color: white;
}

.uuid-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 10px;
}

.stat-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 10px;
  text-align: center;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: var(--accent-color);
  margin-bottom: 0.5rem;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.uuid-display {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
}

.uuid-display h4 {
  color: var(--text-primary);
  margin-bottom: 10px;
}

.uuid-list {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid var(--border-color);
  border-radius: 4px;
}

.uuid-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.2s;
}

.uuid-item:last-child {
  border-bottom: none;
}

.uuid-item:hover {
  background: var(--bg-primary);
}

.uuid-content {
  flex: 1;
}

.uuid-value {
  font-family: monospace;
  font-weight: 500;
  color: var(--text-primary);
  word-break: break-all;
}

.uuid-meta {
  display: flex;
  gap: 1rem;
  margin-top: 0.25rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.uuid-actions {
  display: flex;
  gap: 0.5rem;
}

.copy-btn:hover {
  background: #28a745;
  color: white;
}

.remove-btn:hover {
  background: #dc3545;
  color: white;
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
