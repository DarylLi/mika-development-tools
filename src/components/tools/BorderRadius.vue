<template>
  <div class="border-radius-container">
    <div class="tool-header">
      <h2>📐 {{ $t('tools.borderRadius.ui.title') }}</h2>
      <p>{{ $t('tools.borderRadius.ui.description') }}</p>
    </div>

    <div class="preview-section">
      <div class="preview-box" :style="{ borderRadius: borderRadiusCSS }">
        {{ $t('tools.borderRadius.ui.previewText') }}
      </div>
    </div>

    <div class="radius-controls">
      <div class="control-group">
        <label>{{ $t('tools.borderRadius.ui.topLeft') }} ({{ topLeft }}px)</label>
        <input type="range" v-model="topLeft" min="0" max="100" @input="updateRadius" class="modern-slider">
      </div>

      <div class="control-group">
        <label>{{ $t('tools.borderRadius.ui.topRight') }} ({{ topRight }}px)</label>
        <input type="range" v-model="topRight" min="0" max="100" @input="updateRadius" class="modern-slider">
      </div>

      <div class="control-group">
        <label>{{ $t('tools.borderRadius.ui.bottomLeft') }} ({{ bottomLeft }}px)</label>
        <input type="range" v-model="bottomLeft" min="0" max="100" @input="updateRadius" class="modern-slider">
      </div>

      <div class="control-group">
        <label>{{ $t('tools.borderRadius.ui.bottomRight') }} ({{ bottomRight }}px)</label>
        <input type="range" v-model="bottomRight" min="0" max="100" @input="updateRadius" class="modern-slider">
      </div>

      <div class="control-group span-2">
        <label>
          <input type="checkbox" v-model="syncAll" @change="syncCorners">
          {{ $t('tools.borderRadius.ui.syncAll') }}
        </label>
      </div>
    </div>

    <div class="css-output">
      <label>{{ $t('tools.borderRadius.ui.cssCode') }}</label>
      <textarea v-model="borderRadiusCSS" readonly class="css-textarea" @click="copyCSS"></textarea>
      <button @click="copyCSS" class="copy-btn">📋 {{ $t('tools.borderRadius.ui.copyCSS') }}</button>
    </div>

    <div class="radius-presets">
      <h3>{{ $t('tools.borderRadius.ui.radiusPresets') }}</h3>
      <div class="presets-grid">
        <div 
          v-for="preset in radiusPresets" 
          :key="preset.key"
          class="preset-item"
          @click="loadPreset(preset)"
        >
          <div class="preset-preview" :style="{ borderRadius: preset.radius }"></div>
          <span class="preset-name">{{ preset.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'BorderRadius',
  setup() {
    const { t } = useI18n()
    const topLeft = ref(0)
    const topRight = ref(0)
    const bottomLeft = ref(0)
    const bottomRight = ref(0)
    const syncAll = ref(false)

    const radiusPresets = computed(() => [
      { key: 'none', name: t('tools.borderRadius.ui.presetNone'), radius: '0px' },
      { key: 'small', name: t('tools.borderRadius.ui.presetSmall'), radius: '4px' },
      { key: 'medium', name: t('tools.borderRadius.ui.presetMedium'), radius: '8px' },
      { key: 'large', name: t('tools.borderRadius.ui.presetLarge'), radius: '16px' },
      { key: 'circle', name: t('tools.borderRadius.ui.presetCircle'), radius: '50%' },
      { key: 'capsule', name: t('tools.borderRadius.ui.presetCapsule'), radius: '100px' },
      { key: 'left', name: t('tools.borderRadius.ui.presetLeft'), radius: '50px 0 0 50px' },
      { key: 'right', name: t('tools.borderRadius.ui.presetRight'), radius: '0 50px 50px 0' },
      { key: 'top', name: t('tools.borderRadius.ui.presetTop'), radius: '50px 50px 0 0' },
      { key: 'bottom', name: t('tools.borderRadius.ui.presetBottom'), radius: '0 0 50px 50px' }
    ])

    const borderRadiusCSS = computed(() => {
      const tl = topLeft.value
      const tr = topRight.value
      const bl = bottomLeft.value
      const br = bottomRight.value
      
      // 如果所有值相同，使用简写
      if (tl === tr && tr === bl && bl === br) {
        return `${tl}px`
      }
      
      // 使用完整写法
      return `${tl}px ${tr}px ${br}px ${bl}px`
    })

    // 监听同步状态
    watch(syncAll, (newVal) => {
      if (newVal) {
        syncCorners()
      }
    })

    // 当同步开启时，监听任意角的变化
    watch([topLeft, topRight, bottomLeft, bottomRight], () => {
      if (syncAll.value) {
        // 不再自动同步，避免循环
      }
    })

    const updateRadius = () => {
      if (syncAll.value) {
        // 如果开启同步，则所有角使用相同值
        const value = topLeft.value
        topRight.value = value
        bottomLeft.value = value
        bottomRight.value = value
      }
    }

    const syncCorners = () => {
      if (syncAll.value) {
        const value = topLeft.value
        topRight.value = value
        bottomLeft.value = value
        bottomRight.value = value
      }
    }

    const loadPreset = (preset) => {
      if (preset.radius.includes('%')) {
        // 百分比圆角
        const value = 50
        topLeft.value = value
        topRight.value = value
        bottomLeft.value = value
        bottomRight.value = value
      } else if (preset.radius.includes(' ')) {
        // 多个值
        const values = preset.radius.split(' ').map(v => parseInt(v) || 0)
        if (values.length === 4) {
          topLeft.value = values[0]
          topRight.value = values[1]
          bottomRight.value = values[2]
          bottomLeft.value = values[3]
        }
      } else {
        // 单个值
        const value = parseInt(preset.radius) || 0
        topLeft.value = value
        topRight.value = value
        bottomLeft.value = value
        bottomRight.value = value
      }
      syncAll.value = false
    }

    const copyCSS = async () => {
      try {
        await navigator.clipboard.writeText(`border-radius: ${borderRadiusCSS.value};`)
        console.log(t('tools.borderRadius.ui.cssCopied'))
      } catch (err) {
        console.error(t('tools.borderRadius.ui.copyFailed'), err)
      }
    }

    return {
      topLeft,
      topRight,
      bottomLeft,
      bottomRight,
      syncAll,
      radiusPresets,
      borderRadiusCSS,
      updateRadius,
      syncCorners,
      loadPreset,
      copyCSS
    }
  }
}
</script>

<style scoped>
.border-radius-container {
  padding: 10px;
}

.tool-header {
  text-align: center;
  margin-bottom: 10px;
  padding: 10px;
}

.tool-header h2 {
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
}

.preview-section {
  text-align: center;
  margin-bottom: 10px;
}

.preview-box {
  display: inline-block;
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 1.1rem;
}

.radius-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 10px;
  padding: 1.5rem;
  background: var(--bg-surface);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.control-group.span-2 {
  grid-column: span 2;
}

.control-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-primary);
}

.control-group input[type="range"] {
  width: 100%;
}

.css-output {
  margin-bottom: 10px;
}

.css-output label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-primary);
}

.css-textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-family: 'Courier New', monospace;
  background: var(--bg-surface);
  color: var(--text-primary);
  resize: none;
  height: 60px;
  margin-bottom: 0.5rem;
}

.copy-btn {
  padding: 0.5rem 1rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.copy-btn:hover {
  background: var(--bg-hover);
}

.radius-presets h3 {
  margin: 0 0 1rem 0;
  color: var(--text-primary);
}

.presets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1rem;
}

.preset-item {
  cursor: pointer;
  text-align: center;
  transition: transform 0.2s;
}

.preset-item:hover {
  transform: scale(1.05);
}

.preset-preview {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin: 0 auto 0.5rem;
  border: 2px solid var(--border-color);
}

.preset-name {
  font-size: 0.875rem;
  color: var(--text-primary);
}

@media (max-width: 768px) {
  .radius-controls {
    grid-template-columns: 1fr;
  }
  
  .control-group.span-2 {
    grid-column: span 1;
  }
}

/* 现代化 Slider 样式 */
.modern-slider {
  position: relative;
  width: 100%;
  height: 8px;
  background: linear-gradient(90deg, #e2e8f0 0%, #cbd5e1 100%);
  border-radius: 10px;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.modern-slider:hover {
  height: 10px;
  background: linear-gradient(90deg, #d1d5db 0%, #9ca3af 100%);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.modern-slider:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

.modern-slider::-webkit-slider-thumb {
  appearance: none;
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4), 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
}

.modern-slider::-webkit-slider-thumb:hover {
  transform: scale(1.15);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.5), 0 4px 8px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
}

.modern-slider::-webkit-slider-thumb:active {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.6), 0 2px 4px rgba(0, 0, 0, 0.2);
}

.modern-slider::-webkit-slider-track {
  height: 8px;
  background: linear-gradient(90deg, #e2e8f0 0%, #cbd5e1 100%);
  border-radius: 10px;
  border: none;
}

/* Firefox 样式 */
.modern-slider::-moz-range-track {
  height: 8px;
  background: linear-gradient(90deg, #e2e8f0 0%, #cbd5e1 100%);
  border-radius: 10px;
  border: none;
}

.modern-slider::-moz-range-thumb {
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4), 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}

.modern-slider::-moz-range-thumb:hover {
  transform: scale(1.15);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.5), 0 4px 8px rgba(0, 0, 0, 0.15);
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
}

.modern-slider::-moz-range-thumb:active {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.6), 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* 深色主题适配 */
:global(.dark-theme) .modern-slider {
  background: linear-gradient(90deg, #374151 0%, #4b5563 100%);
}

:global(.dark-theme) .modern-slider:hover {
  background: linear-gradient(90deg, #4b5563 0%, #6b7280 100%);
}

:global(.dark-theme) .modern-slider::-webkit-slider-track {
  background: linear-gradient(90deg, #374151 0%, #4b5563 100%);
}

:global(.dark-theme) .modern-slider::-moz-range-track {
  background: linear-gradient(90deg, #374151 0%, #4b5563 100%);
}

:global(.dark-theme) .modern-slider::-webkit-slider-thumb {
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
  border-color: #1f2937;
}

:global(.dark-theme) .modern-slider::-webkit-slider-thumb:hover {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

:global(.dark-theme) .modern-slider::-moz-range-thumb {
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
  border-color: #1f2937;
}

:global(.dark-theme) .modern-slider::-moz-range-thumb:hover {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

/* Checkbox 统一样式 */
input[type="checkbox"] {
  width: 20px;
  margin-bottom: 0px;
}
</style> 