<template>
  <div class="dns-lookup-tool">
    <div class="tool-header">
      <h3><i class="fas fa-server"></i> {{ $t('tools.dnsLookup.ui.title') }}</h3>
      <p>{{ $t('tools.dnsLookup.ui.description') }}</p>
    </div>

    <div class="tool-content">
      <div class="input-section">
        <div class="input-group">
          <input
            v-model="domain"
            type="text"
            :placeholder="$t('tools.dnsLookup.ui.domainPlaceholder')"
            class="domain-input"
            @keyup.enter="lookupDNS"
          />
          <select v-model="recordType" class="record-select">
            <option value="A">{{ $t('tools.dnsLookup.ui.recordA') }}</option>
            <option value="AAAA">{{ $t('tools.dnsLookup.ui.recordAAAA') }}</option>
            <option value="CNAME">{{ $t('tools.dnsLookup.ui.recordCNAME') }}</option>
            <option value="MX">{{ $t('tools.dnsLookup.ui.recordMX') }}</option>
            <option value="TXT">{{ $t('tools.dnsLookup.ui.recordTXT') }}</option>
            <option value="NS">{{ $t('tools.dnsLookup.ui.recordNS') }}</option>
            <option value="SOA">{{ $t('tools.dnsLookup.ui.recordSOA') }}</option>
          </select>
          <button @click="lookupDNS" class="lookup-btn" :disabled="loading || !domain.trim()">
            <i class="fas fa-search" v-if="!loading"></i>
            <i class="fas fa-spinner fa-spin" v-else></i>
            {{ $t('tools.dnsLookup.ui.query') }}
          </button>
        </div>
        <div class="quick-actions">
          <button @click="loadExample" class="action-btn">
            <i class="fas fa-lightbulb"></i> {{ $t('tools.dnsLookup.ui.exampleDomain') }}
          </button>
          <button @click="lookupAll" class="action-btn" :disabled="loading || !domain.trim()">
            <i class="fas fa-list"></i> {{ $t('tools.dnsLookup.ui.queryAllRecords') }}
          </button>
        </div>
      </div>

      <div v-if="results.length > 0" class="results-section">
        <div class="results-header">
          <h4><i class="fas fa-list-ul"></i> {{ $t('tools.dnsLookup.ui.dnsQueryResults') }}</h4>
          <div class="result-actions">
            <button @click="exportResults" class="export-btn">
              <i class="fas fa-download"></i> {{ $t('tools.dnsLookup.ui.export') }}
            </button>
            <button @click="clearResults" class="clear-btn">
              <i class="fas fa-trash"></i> {{ $t('tools.dnsLookup.ui.clear') }}
            </button>
          </div>
        </div>

        <div class="dns-records">
          <div
            v-for="(result, index) in results"
            :key="index"
            class="record-card"
            :class="`record-${result.type.toLowerCase()}`"
          >
            <div class="record-header">
              <span class="record-type">{{ result.type }}</span>
              <span class="record-domain">{{ result.domain }}</span>
              <button @click="copyRecord(result)" class="copy-btn" :title="$t('tools.dnsLookup.ui.copyRecord')">
                <i class="fas fa-copy"></i>
              </button>
            </div>
            <div class="record-content">
              <div v-if="result.records && result.records.length > 0">
                <div
                  v-for="(record, i) in result.records"
                  :key="i"
                  class="record-item"
                >
                  <div class="record-value">{{ record.value }}</div>
                  <div v-if="record.ttl" class="record-ttl">TTL: {{ record.ttl }}</div>
                  <div v-if="record.priority" class="record-priority">{{ $t('tools.dnsLookup.ui.priority') }} {{ record.priority }}</div>
                </div>
              </div>
              <div v-else-if="result.error" class="record-error">
                <i class="fas fa-exclamation-triangle"></i>
                {{ result.error }}
              </div>
              <div v-else class="record-empty">
                {{ $t('tools.dnsLookup.ui.noRecordFound') }} {{ result.type }} {{ $t('tools.dnsLookup.ui.record') }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="loading" class="loading-section">
        <div class="loading-spinner">
          <i class="fas fa-spinner fa-spin"></i>
          <p>{{ $t('tools.dnsLookup.ui.querying') }}</p>
        </div>
      </div>

      <div class="info-section">
        <h4><i class="fas fa-info-circle"></i> {{ $t('tools.dnsLookup.ui.recordTypeInfo') }}</h4>
        <div class="info-grid">
          <div class="info-card">
            <div class="info-header">{{ $t('tools.dnsLookup.ui.recordA') }}</div>
            <p>{{ $t('tools.dnsLookup.ui.recordADesc') }}</p>
          </div>
          <div class="info-card">
            <div class="info-header">{{ $t('tools.dnsLookup.ui.recordAAAA') }}</div>
            <p>{{ $t('tools.dnsLookup.ui.recordAAAADesc') }}</p>
          </div>
          <div class="info-card">
            <div class="info-header">{{ $t('tools.dnsLookup.ui.recordCNAME') }}</div>
            <p>{{ $t('tools.dnsLookup.ui.recordCNAMEDesc') }}</p>
          </div>
          <div class="info-card">
            <div class="info-header">{{ $t('tools.dnsLookup.ui.recordMX') }}</div>
            <p>{{ $t('tools.dnsLookup.ui.recordMXDesc') }}</p>
          </div>
          <div class="info-card">
            <div class="info-header">{{ $t('tools.dnsLookup.ui.recordTXT') }}</div>
            <p>{{ $t('tools.dnsLookup.ui.recordTXTDesc') }}</p>
          </div>
          <div class="info-card">
            <div class="info-header">{{ $t('tools.dnsLookup.ui.recordNS') }}</div>
            <p>{{ $t('tools.dnsLookup.ui.recordNSDesc') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'DnsLookup',
  setup() {
    const { t } = useI18n()
    const domain = ref('')
    const recordType = ref('A')
    const loading = ref(false)
    const results = ref([])

    const exampleDomains = ['google.com', 'github.com', 'cloudflare.com', 'baidu.com']

    function loadExample() {
      domain.value = exampleDomains[Math.floor(Math.random() * exampleDomains.length)]
    }

    async function lookupDNS() {
      if (!domain.value.trim() || loading.value) return

      loading.value = true
      try {
        // 模拟 DNS 查询 - 在实际应用中需要使用真实的 DNS API
        const result = await simulateDNSLookup(domain.value.trim(), recordType.value)
        
        // 检查是否已存在相同类型的记录
        const existingIndex = results.value.findIndex(
          r => r.domain === result.domain && r.type === result.type
        )
        
        if (existingIndex >= 0) {
          results.value[existingIndex] = result
        } else {
          results.value.unshift(result)
        }
      } catch (error) {
        console.error(t('tools.dnsLookup.ui.queryFailed') + ':', error)
        results.value.unshift({
          domain: domain.value.trim(),
          type: recordType.value,
          error: t('tools.dnsLookup.ui.queryFailed') + ': ' + error.message,
          timestamp: new Date()
        })
      } finally {
        loading.value = false
      }
    }

    async function lookupAll() {
      if (!domain.value.trim() || loading.value) return

      const types = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS']
      loading.value = true

      try {
        for (const type of types) {
          const result = await simulateDNSLookup(domain.value.trim(), type)
          
          const existingIndex = results.value.findIndex(
            r => r.domain === result.domain && r.type === result.type
          )
          
          if (existingIndex >= 0) {
            results.value[existingIndex] = result
          } else {
            results.value.unshift(result)
          }
        }
      } catch (error) {
        console.error(t('tools.dnsLookup.ui.batchQueryFailed') + ':', error)
      } finally {
        loading.value = false
      }
    }

    // 模拟 DNS 查询函数
    async function simulateDNSLookup(domainName, type) {
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

      // 模拟不同类型的 DNS 记录
      const mockData = {
        A: [
          { value: '93.184.216.34', ttl: 300 },
          { value: '93.184.216.35', ttl: 300 }
        ],
        AAAA: [
          { value: '2606:2800:220:1:248:1893:25c8:1946', ttl: 300 }
        ],
        CNAME: [
          { value: 'example.com.cdn.cloudflare.net', ttl: 300 }
        ],
        MX: [
          { value: 'mail.example.com', ttl: 300, priority: 10 },
          { value: 'backup.example.com', ttl: 300, priority: 20 }
        ],
        TXT: [
          { value: 'v=spf1 include:_spf.google.com ~all', ttl: 300 },
          { value: 'google-site-verification=abcd1234', ttl: 300 }
        ],
        NS: [
          { value: 'ns1.example.com', ttl: 86400 },
          { value: 'ns2.example.com', ttl: 86400 }
        ]
      }

      // 随机决定是否返回记录
      const hasRecords = Math.random() > 0.2 // 80% 概率有记录

      return {
        domain: domainName,
        type: type,
        records: hasRecords ? mockData[type] || [] : [],
        timestamp: new Date()
      }
    }

    async function copyRecord(record) {
      const text = formatRecordForCopy(record)
      try {
        await navigator.clipboard.writeText(text)
      } catch (err) {
        console.error(t('tools.dnsLookup.ui.copyFailed') + ':', err)
      }
    }

    function formatRecordForCopy(record) {
      let text = `${record.domain} ${record.type} ${t('tools.dnsLookup.ui.record')}:\n`
      
      if (record.records && record.records.length > 0) {
        record.records.forEach(r => {
          text += `  ${r.value}`
          if (r.ttl) text += ` (TTL: ${r.ttl})`
          if (r.priority) text += ` (${t('tools.dnsLookup.ui.priority')} ${r.priority})`
          text += '\n'
        })
      } else {
        text += `  ${t('tools.dnsLookup.ui.noRecordFound')}\n`
      }
      
      return text
    }

    function exportResults() {
      if (results.value.length === 0) return

      const data = results.value.map(result => {
        const records = result.records || []
        return records.map(record => ({
          domain: result.domain,
          type: result.type,
          value: record.value,
          ttl: record.ttl || '',
          priority: record.priority || '',
          timestamp: result.timestamp.toISOString()
        }))
      }).flat()

      const csv = [
        ['Domain', 'Type', 'Value', 'TTL', 'Priority', 'Timestamp'],
        ...data.map(row => [
          row.domain,
          row.type,
          row.value,
          row.ttl,
          row.priority,
          row.timestamp
        ])
      ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')

      const blob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `dns-records-${domain.value}-${new Date().toISOString().split('T')[0]}.csv`
      a.click()
      URL.revokeObjectURL(url)
    }

    function clearResults() {
      results.value = []
    }

    return {
      domain,
      recordType,
      loading,
      results,
      loadExample,
      lookupDNS,
      lookupAll,
      copyRecord,
      exportResults,
      clearResults
    }
  }
}
</script>

<style scoped>
.dns-lookup-tool {
  max-width: 1000px;
  margin: 0 auto;
  padding: 10px;
}

.tool-header {
  text-align: center;
  margin-bottom: 10px;
  padding: 10px;
}

.tool-header h3 {
  font-size: 24px;
  margin-bottom: 10px;
  color: var(--text-primary);
}

.tool-header p {
  color: var(--text-secondary);
  font-size: 14px;
}

.input-section {
  background: var(--bg-secondary);
  padding: 10px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  margin-bottom: 10px;
}

.input-group {
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.domain-input {
  flex: 1;
  min-width: 250px;
  padding: 10px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 16px;
  transition: all 0.3s;
}

.domain-input:focus {
  border-color: var(--accent-color);
  outline: none;
  box-shadow: 0 0 0 3px rgba(69, 183, 209, 0.1);
}

.record-select {
  padding: 10px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 16px;
  min-width: 120px;
}

.lookup-btn {
  padding: 10px;
  background: var(--accent-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.lookup-btn:hover:not(:disabled) {
  background: var(--accent-hover);
  transform: translateY(-2px);
}

.lookup-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.quick-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.action-btn {
  padding: 10px;
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.action-btn:hover:not(:disabled) {
  border-color: var(--accent-color);
  color: var(--accent-color);
}

.results-section {
  background: var(--bg-secondary);
  padding: 10px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  margin-bottom: 10px;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--border-color);
}

.results-header h4 {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-primary);
  margin: 0;
}

.result-actions {
  display: flex;
  gap: 10px;
}

.export-btn, .clear-btn {
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.export-btn {
  background: var(--accent-color);
  color: white;
}

.clear-btn {
  background: #ff6b6b;
  color: white;
}

.export-btn:hover, .clear-btn:hover {
  transform: translateY(-1px);
  opacity: 0.9;
}

.dns-records {
  display: grid;
  gap: 15px;
}

.record-card {
  background: var(--bg-primary);
  border-radius: 10px;
  border-left: 4px solid var(--border-color);
  overflow: hidden;
  transition: all 0.3s;
}

.record-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.record-card.record-a { border-left-color: #74b9ff; }
.record-card.record-aaaa { border-left-color: #00b894; }
.record-card.record-cname { border-left-color: #fdcb6e; }
.record-card.record-mx { border-left-color: #e17055; }
.record-card.record-txt { border-left-color: #a29bfe; }
.record-card.record-ns { border-left-color: #fd79a8; }

.record-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
}

.record-type {
  background: var(--accent-color);
  color: white;
  padding: 10px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: bold;
}

.record-domain {
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--text-primary);
  font-weight: 500;
}

.copy-btn {
  background: none;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-btn:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
}

.record-content {
  padding: 10px;
}

.record-item {
  padding: 10px 0;
  border-bottom: 1px solid var(--border-color);
}

.record-item:last-child {
  border-bottom: none;
}

.record-value {
  font-family: 'Consolas', 'Monaco', monospace;
  color: var(--text-primary);
  font-weight: 500;
  margin-bottom: 10px;
}

.record-ttl, .record-priority {
  font-size: 12px;
  color: var(--text-secondary);
}

.record-error, .record-empty {
  color: var(--text-secondary);
  font-style: italic;
  display: flex;
  align-items: center;
  gap: 8px;
}

.record-error {
  color: #ff6b6b;
}

.loading-section {
  text-align: center;
  padding: 10px;
}

.loading-spinner i {
  font-size: 32px;
  color: var(--accent-color);
  margin-bottom: 10px;
}

.loading-spinner p {
  color: var(--text-secondary);
}

.info-section {
  background: var(--bg-secondary);
  padding: 10px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.info-section h4 {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  color: var(--text-primary);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.info-card {
  background: var(--bg-primary);
  padding: 10px;
  border-radius: 8px;
  border-left: 4px solid var(--accent-color);
}

.info-header {
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.info-card p {
  color: var(--text-secondary);
  font-size: 14px;
  margin: 0;
  line-height: 1.4;
}

@media (max-width: 768px) {
  .input-group {
    flex-direction: column;
  }
  
  .domain-input {
    min-width: unset;
  }
  
  .results-header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
  
  .record-header {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
}
</style> 