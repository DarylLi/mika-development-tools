<template>
  <div class="single-tool">
    <h2><i class="fas fa-fingerprint"></i> {{ $t('tools.uuidGenerator.ui.title') }}</h2>
    <p>{{ $t('tools.uuidGenerator.ui.description') }}</p>
    
    <div class="example-section">
      <button class="example-btn" @click="generateUUID">
        <i class="fas fa-magic"></i> {{ $t('tools.uuidGenerator.ui.generateUuid') }}
      </button>
    </div>

    <div class="generator-controls">
      <div class="quantity-control">
        <label for="quantity">{{ $t('tools.uuidGenerator.ui.quantity') }}</label>
        <input 
          id="quantity"
          v-model.number="quantity" 
          type="number" 
          min="1" 
          max="20"
          class="quantity-input"
          style="margin-bottom: 0px;"
        >
        <button @click="generateMultiple">{{ $t('tools.uuidGenerator.ui.generateMultiple') }}</button>
      </div>
      
      <div class="format-options">
        <label class="check-box-label">
          <input v-model="includeHyphens" type="checkbox">
          <span>{{ $t('tools.uuidGenerator.ui.includeHyphens') }}</span>
        </label>
        <label class="check-box-label">
          <input v-model="uppercase" type="checkbox">
          <span>{{ $t('tools.uuidGenerator.ui.uppercase') }}</span>
        </label>
      </div>
    </div>

    <div v-if="uuids.length" class="result-display">
      <div class="results-header">
        <h4>{{ $t('tools.uuidGenerator.ui.generatedUuids', { count: uuids.length }) }}</h4>
        <button @click="copyAllUUIDs" class="copy-all-btn">
          <i class="fas fa-copy"></i> {{ $t('tools.uuidGenerator.ui.copyAll') }}
        </button>
      </div>

      <div class="uuid-list">
        <div v-for="(uuid, index) in uuids" :key="index" class="uuid-item">
          <code class="uuid-value">{{ formatUUID(uuid) }}</code>
          <button @click="copyUUID(uuid)" class="copy-btn">
            <i class="fas fa-copy"></i>
          </button>
        </div>
      </div>
    </div>

    <div class="info-section">
      <h4><i class="fas fa-info-circle"></i> {{ $t('tools.uuidGenerator.ui.aboutUuid') }}</h4>
      <p><strong>UUID</strong> {{ $t('tools.uuidGenerator.ui.uuidInfo') }}</p>
      <div class="format-example">
        <strong>{{ $t('tools.uuidGenerator.ui.format') }}</strong> <code>xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</code>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'UuidGenerator',
  props: {
    toolData: Object
  },
  setup() {
    const { t } = useI18n()
    const quantity = ref(1)
    const includeHyphens = ref(true)
    const uppercase = ref(false)
    const uuids = ref([])

    // 生成UUID v4
    const generateUUIDv4 = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0
        const v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    }

    // 格式化UUID
    const formatUUID = (uuid) => {
      let formatted = uuid
      if (!includeHyphens.value) {
        formatted = uuid.replace(/-/g, '')
      }
      if (uppercase.value) {
        formatted = formatted.toUpperCase()
      }
      return formatted
    }

    // 生成单个UUID
    const generateUUID = () => {
      uuids.value = [generateUUIDv4()]
    }

    // 生成多个UUID
    const generateMultiple = () => {
      const newUUIDs = []
      for (let i = 0; i < quantity.value; i++) {
        newUUIDs.push(generateUUIDv4())
      }
      uuids.value = newUUIDs
    }

    // 复制单个UUID
    const copyUUID = async (uuid) => {
      try {
        await navigator.clipboard.writeText(formatUUID(uuid))
      } catch (e) {
        console.error(t('tools.uuidGenerator.ui.copyFailed'), e)
      }
    }

    // 复制全部UUID
    const copyAllUUIDs = async () => {
      try {
        const formatted = uuids.value.map(uuid => formatUUID(uuid)).join('\n')
        await navigator.clipboard.writeText(formatted)
      } catch (e) {
        console.error(t('tools.uuidGenerator.ui.copyFailed'), e)
      }
    }

    return {
      quantity,
      includeHyphens,
      uppercase,
      uuids,
      generateUUID,
      generateMultiple,
      formatUUID,
      copyUUID,
      copyAllUUIDs
    }
  }
}
</script>

<style scoped>
.generator-controls {
  margin-bottom: 20px;
  padding: 15px;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.quantity-input {
  width: 60px;
  padding: 4px 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  text-align: center;
}

.format-options {
  display: flex;
  gap: 20px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.copy-all-btn {
  padding: 6px 12px;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}

.uuid-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.uuid-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #f3f4f6;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
}

.uuid-value {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  background: transparent;
  flex: 1;
}

.copy-btn {
  padding: 4px 8px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 4px;
}

.info-section {
  margin-top: 20px;
  padding: 15px;
  background: #f0f9ff;
  border-radius: 8px;
  border: 1px solid #bae6fd;
}

.info-section h4 {
  margin: 0 0 10px 0;
  color: #1e40af;
}

.info-section p {
  margin: 0 0 10px 0;
  color: #1e40af;
  line-height: 1.5;
}

.format-example {
  background: white;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #e0f2fe;
  font-family: 'Courier New', monospace;
  color: #1e40af;
}
</style> 