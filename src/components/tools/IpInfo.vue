<template>
  <div class="ip-info-tool">
    <div class="tool-header">
      <h3><i class="fas fa-globe-americas"></i> {{ $t('tools.ipInfo.ui.title') }}</h3>
      <p>{{ $t('tools.ipInfo.ui.description') }}</p>
    </div>

    <div class="tool-content">
      <div class="input-section">
        <div class="input-group">
          <input
            v-model="ipAddress"
            type="text"
            :placeholder="$t('tools.ipInfo.ui.ipPlaceholder')"
            class="ip-input"
            @keyup.enter="queryIP"
          />
          <button @click="queryIP" class="query-btn" :disabled="loading">
            <i class="fas fa-search" v-if="!loading"></i>
            <i class="fas fa-spinner fa-spin" v-else></i>
            {{ $t('tools.ipInfo.ui.query') }}
          </button>
        </div>
        <div class="quick-actions">
          <button @click="getCurrentIP" class="action-btn">
            <i class="fas fa-map-marker-alt"></i> {{ $t('tools.ipInfo.ui.queryCurrentIP') }}
          </button>
          <button @click="loadExample" class="action-btn">
            <i class="fas fa-lightbulb"></i> {{ $t('tools.ipInfo.ui.exampleIP') }}
          </button>
        </div>
      </div>

      <div v-if="ipInfo" class="results-section">
        <div class="info-cards">
          <div class="info-card">
            <h4><i class="fas fa-network-wired"></i> {{ $t('tools.ipInfo.ui.networkInfo') }}</h4>
            <div class="info-item">
              <span class="label">{{ $t('tools.ipInfo.ui.ipAddress') }}</span>
              <span class="value">{{ ipInfo.ip }}</span>
            </div>
            <!-- <div class="info-item">
              <span class="label">{{ $t('tools.ipInfo.ui.ipVersion') }}</span>
              <span class="value">{{ ipInfo.version }}</span>
            </div> -->
            <div class="info-item">
              <span class="label">{{ $t('tools.ipInfo.ui.isp') }}</span>
              <span class="value">{{ ipInfo.isp || $t('tools.ipInfo.ui.unknown') }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('tools.ipInfo.ui.org') }}</span>
              <span class="value">{{ ipInfo.org || $t('tools.ipInfo.ui.unknown') }}</span>
            </div>
          </div>

          <div class="info-card">
            <h4><i class="fas fa-map-marked-alt"></i> {{ $t('tools.ipInfo.ui.location') }}</h4>
            <div class="info-item">
              <span class="label">{{ $t('tools.ipInfo.ui.country') }}</span>
              <span class="value">{{ ipInfo.country || $t('tools.ipInfo.ui.unknown') }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('tools.ipInfo.ui.region') }}</span>
              <span class="value">{{ ipInfo.region || $t('tools.ipInfo.ui.unknown') }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('tools.ipInfo.ui.city') }}</span>
              <span class="value">{{ ipInfo.city || $t('tools.ipInfo.ui.unknown') }}</span>
            </div>
            <div class="info-item">
              <span class="label">{{ $t('tools.ipInfo.ui.timezone') }}</span>
              <span class="value">{{ ipInfo.timezone || $t('tools.ipInfo.ui.unknown') }}</span>
            </div>
          </div>

          <div class="info-card">
            <h4><i class="fas fa-shield-alt"></i> {{ $t('tools.ipInfo.ui.securityInfo') }}</h4>
            <div class="info-item">
              <span class="label">{{ $t('tools.ipInfo.ui.isProxy') }}</span>
              <span class="value" :class="ipInfo.proxy ? 'warning' : 'safe'">
                {{ ipInfo.proxy ? $t('tools.ipInfo.ui.yes') : $t('tools.ipInfo.ui.no') }}
              </span>
            </div>
            <!-- <div class="info-item">
              <span class="label">{{ $t('tools.ipInfo.ui.isVPN') }}</span>
              <span class="value" :class="ipInfo.vpn ? 'warning' : 'safe'">
                {{ ipInfo.vpn ? $t('tools.ipInfo.ui.yes') : $t('tools.ipInfo.ui.no') }}
              </span>
            </div> -->
            <!-- <div class="info-item">
              <span class="label">{{ $t('tools.ipInfo.ui.isTor') }}</span>
              <span class="value" :class="ipInfo.tor ? 'danger' : 'safe'">
                {{ ipInfo.tor ? $t('tools.ipInfo.ui.yes') : $t('tools.ipInfo.ui.no') }}
              </span>
            </div> -->
            <!-- <div class="info-item">
              <span class="label">{{ $t('tools.ipInfo.ui.threatLevel') }}</span>
              <span class="value" :class="getThreatClass(ipInfo.threat)">
                {{ getThreatLevel(ipInfo.threat) }}
              </span>
            </div> -->
          </div>
        </div>

        <div class="json-section">
          <div class="section-header">
            <h4><i class="fas fa-code"></i> {{ $t('tools.ipInfo.ui.fullInfo') }}</h4>
            <button @click="copyJSON" class="copy-btn">
              <i class="fas fa-copy"></i> {{ $t('tools.ipInfo.ui.copy') }}
            </button>
          </div>
          <pre class="json-output">{{ formatJSON(ipInfo) }}</pre>
        </div>
      </div>

      <div v-if="loading" class="loading-section">
        <div class="loading-spinner">
          <i class="fas fa-spinner fa-spin"></i>
          <p>{{ $t('tools.ipInfo.ui.querying') }}</p>
        </div>
      </div>

      <div v-if="error" class="error-section">
        <div class="error-message">
          <i class="fas fa-exclamation-triangle"></i>
          <p>{{ error }}</p>
          <button @click="clearError" class="clear-error-btn">{{ $t('tools.ipInfo.ui.clearError') }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'IpInfo',
  setup() {
    const { t } = useI18n()
    const ipAddress = ref('')
    const loading = ref(false)
    const ipInfo = ref(null)
    const error = ref('')

    const exampleIPs = ['8.8.8.8', '1.1.1.1', '208.67.222.222', '114.114.114.114']

    function loadExample() {
      ipAddress.value = exampleIPs[Math.floor(Math.random() * exampleIPs.length)]
    }

    function getCurrentIP() {
      ipAddress.value = ''
      queryIP()
    }

    async function queryIP() {
      if (loading.value && !isValidIP(ipAddress.value.trim())) return

      loading.value = true
      error.value = ''
      ipInfo.value = null

      try {
        // 使用 ip-api.com 查询 API
        const result = await simulateIPLookup(ipAddress.value.trim())
        ipInfo.value = result
      } catch (err) {
        error.value = err.message || t('tools.ipInfo.ui.queryFailed')
      } finally {
        loading.value = false
      }
    }

    // 使用 ip-api.com 查询 IP
    async function simulateIPLookup(ip) {
        
        // 构建API URL
        // 如果没有输入IP，则查询当前IP
      const apiUrl = ip 
        ? `https://ip-api.com/json/${ip}?fields=66842623`
        : 'https://ip-api.com/json/?fields=66842623'
      const response = await fetch(apiUrl)
       if (!response.ok) {
          throw new Error(t('tools.ipInfo.ui.invalidIPFormat'))
      }
      const data = await response.json();
      const {
        query,
        status,
        continent,
        continentCode,
        country,
        countryCode,
        region,
        regionName,
        city,
        timezone,
        zip,
        isp,
        org,
        proxy,
        asname} = data;
      let rsltData = {
        ip:query,
        country,
        region:regionName,
        city,
        timezone,
        isp,
        org,
        proxy,
      }

      return rsltData
    }

    function isValidIP(ip) {
      // IPv4 正则
      const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
      // IPv6 正则（简化版）
      const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/
      
      return ipv4Regex.test(ip) || ipv6Regex.test(ip)
    }

    function getThreatLevel(threat) {
      if (threat === 0) return t('tools.ipInfo.ui.safe')
      if (threat <= 2) return t('tools.ipInfo.ui.lowRisk')
      if (threat <= 3) return t('tools.ipInfo.ui.mediumRisk')
      return t('tools.ipInfo.ui.highRisk')
    }

    function getThreatClass(threat) {
      if (threat === 0) return 'safe'
      if (threat <= 2) return 'warning'
      return 'danger'
    }

    function formatJSON(obj) {
      return JSON.stringify(obj, null, 2)
    }

    async function copyJSON() {
      if (!ipInfo.value) return
      try {
        await navigator.clipboard.writeText(formatJSON(ipInfo.value))
      } catch (err) {
        console.error(t('tools.ipInfo.ui.copyFailed') + ':', err)
      }
    }

    function clearError() {
      error.value = ''
    }

    return {
      ipAddress,
      loading,
      ipInfo,
      error,
      loadExample,
      getCurrentIP,
      queryIP,
      getThreatLevel,
      getThreatClass,
      formatJSON,
      copyJSON,
      clearError
    }
  }
}
</script>

<style scoped>
  
.ip-info-tool {
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

.ip-input {
  flex: 1;
  min-width: 250px;
  padding: 10px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 16px;
  transition: all 0.3s;
  margin-bottom: 0px;
}

.ip-input:focus {
  border-color: var(--accent-color);
  outline: none;
  box-shadow: 0 0 0 3px rgba(69, 183, 209, 0.1);
}

.query-btn {
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

.query-btn:hover:not(:disabled) {
  background: var(--accent-hover);
  transform: translateY(-2px);
}

.query-btn:disabled {
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

.action-btn:hover {
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

.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 10px;
}

.info-card {
  background: var(--bg-primary);
  padding: 10px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
}

.info-card h4 {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  color: var(--text-primary);
  font-size: 16px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid var(--border-color);
}

.info-item:last-child {
  border-bottom: none;
}

.label {
  color: var(--text-secondary);
  font-size: 14px;
}

.value {
  color: var(--text-primary);
  font-weight: 500;
  font-size: 14px;
}

.value.safe {
  color: #00b894;
}

.value.warning {
  color: #fdcb6e;
}

.value.danger {
  color: #e17055;
}

.json-section {
  background: var(--bg-primary);
  padding: 10px;
  border-radius: 10px;
  border: 1px solid var(--border-color);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.section-header h4 {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-primary);
  margin: 0;
}

.copy-btn {
  background: var(--accent-color);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.copy-btn:hover {
  background: var(--accent-hover);
  transform: translateY(-1px);
}

.json-output {
  background: var(--bg-secondary);
  padding: 10px;
  border-radius: 8px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
  color: var(--text-primary);
  overflow-x: auto;
  margin: 0;
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

.error-section {
  background: #fff5f5;
  border: 1px solid #fed7d7;
  border-radius: 12px;
  padding: 10px;
  text-align: center;
}

.error-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.error-message i {
  font-size: 32px;
  color: #e53e3e;
}

.error-message p {
  color: #e53e3e;
  font-weight: 500;
  margin: 0;
}

.clear-error-btn {
  background: #e53e3e;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
}

.clear-error-btn:hover {
  background: #c53030;
}

@media (max-width: 768px) {
  .input-group {
    flex-direction: column;
  }
  
  .ip-input {
    min-width: unset;
  }
  
  .info-cards {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
}
</style> 