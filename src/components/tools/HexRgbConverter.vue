<template>
  <div class="hex-rgb-container">
    <div class="tool-header">
      <h2>🔄 {{ $t('tools.hexRgbConverter.ui.title') }}</h2>
      <p>{{ $t('tools.hexRgbConverter.ui.description') }}</p>
    </div>

    <div class="converter-section">
      <div class="input-group">
        <label>{{ $t('tools.hexRgbConverter.ui.hexColorLabel') }}</label>
        <div class="input-with-preview">
          <input 
            type="text" 
            v-model="hexValue" 
            placeholder="#FF5733"
            @input="hexToRgb"
            class="color-input"
          >
          <div class="color-preview" :style="{ backgroundColor: previewColor }"></div>
        </div>
      </div>

      <div class="converter-arrow">⇅</div>

      <div class="input-group">
        <label>{{ $t('tools.hexRgbConverter.ui.rgbColorLabel') }}</label>
        <div class="rgb-inputs">
          <div class="rgb-input-group">
            <label>R</label>
            <input 
              type="number" 
              v-model.number="rgbValues.r" 
              min="0" 
              max="255"
              @input="rgbToHex"
              class="rgb-input"
            >
          </div>
          <div class="rgb-input-group">
            <label>G</label>
            <input 
              type="number" 
              v-model.number="rgbValues.g" 
              min="0" 
              max="255"
              @input="rgbToHex"
              class="rgb-input"
            >
          </div>
          <div class="rgb-input-group">
            <label>B</label>
            <input 
              type="number" 
              v-model.number="rgbValues.b" 
              min="0" 
              max="255"
              @input="rgbToHex"
              class="rgb-input"
            >
          </div>
        </div>
        <div class="rgb-text">
          <span>{{ $t('tools.hexRgbConverter.ui.cssPrefix') }}rgb({{ rgbValues.r }}, {{ rgbValues.g }}, {{ rgbValues.b }})</span>
          <button @click="copyRgb" class="copy-btn">📋</button>
        </div>
      </div>
    </div>

    <div class="additional-formats">
      <h3>{{ $t('tools.hexRgbConverter.ui.otherFormats') }}</h3>
      <div class="format-grid">
        <div class="format-item" @click="copyFormat(hslValue)">
          <span class="format-label">HSL:</span>
          <span class="format-value">{{ hslValue }}</span>
          <button class="copy-btn">📋</button>
        </div>
        <div class="format-item" @click="copyFormat(hsvValue)">
          <span class="format-label">HSV:</span>
          <span class="format-value">{{ hsvValue }}</span>
          <button class="copy-btn">📋</button>
        </div>
        <div class="format-item" @click="copyFormat(cmykValue)">
          <span class="format-label">CMYK:</span>
          <span class="format-value">{{ cmykValue }}</span>
          <button class="copy-btn">📋</button>
        </div>
      </div>
    </div>

    <div class="quick-colors">
      <h3>{{ $t('tools.hexRgbConverter.ui.quickColors') }}</h3>
      <div class="color-swatches">
        <div 
          v-for="color in quickColors" 
          :key="color.key"
          class="color-swatch"
          :style="{ backgroundColor: color.hex }"
          @click="loadColor(color.hex)"
          :title="color.name"
        >
          <span class="color-name">{{ color.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'HexRgbConverter',
  setup() {
    const { t } = useI18n()
    const hexValue = ref('#FF5733')
    const rgbValues = ref({ r: 255, g: 87, b: 51 })

    const previewColor = computed(() => {
      return isValidHex(hexValue.value) ? hexValue.value : '#000000'
    })

    const hslValue = computed(() => {
      const hsl = rgbToHsl(rgbValues.value.r, rgbValues.value.g, rgbValues.value.b)
      return `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`
    })

    const hsvValue = computed(() => {
      const hsv = rgbToHsv(rgbValues.value.r, rgbValues.value.g, rgbValues.value.b)
      return `hsv(${Math.round(hsv.h)}, ${Math.round(hsv.s)}%, ${Math.round(hsv.v)}%)`
    })

    const cmykValue = computed(() => {
      const cmyk = rgbToCmyk(rgbValues.value.r, rgbValues.value.g, rgbValues.value.b)
      return `cmyk(${Math.round(cmyk.c)}%, ${Math.round(cmyk.m)}%, ${Math.round(cmyk.y)}%, ${Math.round(cmyk.k)}%)`
    })

    const quickColors = computed(() => [
      { key: 'red', name: t('tools.hexRgbConverter.ui.colorRed'), hex: '#FF0000' },
      { key: 'green', name: t('tools.hexRgbConverter.ui.colorGreen'), hex: '#00FF00' },
      { key: 'blue', name: t('tools.hexRgbConverter.ui.colorBlue'), hex: '#0000FF' },
      { key: 'yellow', name: t('tools.hexRgbConverter.ui.colorYellow'), hex: '#FFFF00' },
      { key: 'purple', name: t('tools.hexRgbConverter.ui.colorPurple'), hex: '#800080' },
      { key: 'orange', name: t('tools.hexRgbConverter.ui.colorOrange'), hex: '#FFA500' },
      { key: 'pink', name: t('tools.hexRgbConverter.ui.colorPink'), hex: '#FFC0CB' },
      { key: 'cyan', name: t('tools.hexRgbConverter.ui.colorCyan'), hex: '#00FFFF' },
      { key: 'black', name: t('tools.hexRgbConverter.ui.colorBlack'), hex: '#000000' },
      { key: 'white', name: t('tools.hexRgbConverter.ui.colorWhite'), hex: '#FFFFFF' },
      { key: 'gray', name: t('tools.hexRgbConverter.ui.colorGray'), hex: '#808080' },
      { key: 'brown', name: t('tools.hexRgbConverter.ui.colorBrown'), hex: '#A52A2A' }
    ])

    const hexToRgb = () => {
      if (isValidHex(hexValue.value)) {
        const rgb = hexToRgbValue(hexValue.value)
        rgbValues.value = rgb
      }
    }

    const rgbToHex = () => {
      const hex = rgbToHexValue(rgbValues.value.r, rgbValues.value.g, rgbValues.value.b)
      hexValue.value = hex
    }

    const loadColor = (hex) => {
      hexValue.value = hex
      hexToRgb()
    }

    const copyRgb = async () => {
      const rgbText = `rgb(${rgbValues.value.r}, ${rgbValues.value.g}, ${rgbValues.value.b})`
      await copyToClipboard(rgbText)
    }

    const copyFormat = async (text) => {
      await copyToClipboard(text)
    }

    const copyToClipboard = async (text) => {
      try {
        await navigator.clipboard.writeText(text)
        console.log(t('tools.hexRgbConverter.ui.copied'), text)
      } catch (err) {
        console.error(t('tools.hexRgbConverter.ui.copyFailed'), err)
      }
    }

    // 工具函数
    const isValidHex = (hex) => {
      return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)
    }

    const hexToRgbValue = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 0, b: 0 }
    }

    const rgbToHexValue = (r, g, b) => {
      return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
    }

    const rgbToHsl = (r, g, b) => {
      r /= 255
      g /= 255
      b /= 255
      
      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      let h, s, l = (max + min) / 2
      
      if (max === min) {
        h = s = 0
      } else {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break
          case g: h = (b - r) / d + 2; break
          case b: h = (r - g) / d + 4; break
        }
        h /= 6
      }
      
      return { h: h * 360, s: s * 100, l: l * 100 }
    }

    const rgbToHsv = (r, g, b) => {
      r /= 255
      g /= 255
      b /= 255
      
      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      const diff = max - min
      
      let h = 0
      const s = max === 0 ? 0 : diff / max
      const v = max
      
      if (diff !== 0) {
        switch (max) {
          case r: h = ((g - b) / diff) % 6; break
          case g: h = (b - r) / diff + 2; break
          case b: h = (r - g) / diff + 4; break
        }
        h *= 60
        if (h < 0) h += 360
      }
      
      return { h, s: s * 100, v: v * 100 }
    }

    const rgbToCmyk = (r, g, b) => {
      r /= 255
      g /= 255
      b /= 255
      
      const k = 1 - Math.max(r, g, b)
      const c = k < 1 ? (1 - r - k) / (1 - k) : 0
      const m = k < 1 ? (1 - g - k) / (1 - k) : 0
      const y = k < 1 ? (1 - b - k) / (1 - k) : 0
      
      return { c: c * 100, m: m * 100, y: y * 100, k: k * 100 }
    }

    // 初始化时同步一次
    hexToRgb()

    return {
      hexValue,
      rgbValues,
      previewColor,
      hslValue,
      hsvValue,
      cmykValue,
      quickColors,
      hexToRgb,
      rgbToHex,
      loadColor,
      copyRgb,
      copyFormat
    }
  }
}
</script>

<style scoped>
.hex-rgb-container {
  max-width: 100%;
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

.tool-header p {
  margin: 0;
  color: var(--text-muted);
}

.converter-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 10px;
  align-items: center;
}

.input-group {
  width: 100%;
  max-width: 400px;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-primary);
}

.input-with-preview {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.color-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-family: 'Courier New', monospace;
}

.color-preview {
  width: 60px;
  height: 42px;
  border-radius: 6px;
  border: 2px solid var(--border-color);
}

.converter-arrow {
  font-size: 2rem;
  color: var(--text-primary);
  margin: 1rem 0;
}

.rgb-inputs {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.rgb-input-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.rgb-input-group label {
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
}

.rgb-input {
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  text-align: center;
}

.rgb-text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  background: var(--bg-surface);
  border-radius: 6px;
  font-family: 'Courier New', monospace;
}

.copy-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.25rem;
}

.additional-formats {
  margin-bottom: 10px;
}

.additional-formats h3 {
  margin: 0 0 1rem 0;
  color: var(--text-primary);
}

.format-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.format-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem;
  background: var(--bg-surface);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.format-item:hover {
  background: var(--bg-hover);
}

.format-label {
  font-weight: 500;
  color: var(--text-primary);
}

.format-value {
  font-family: 'Courier New', monospace;
  color: var(--text-secondary);
}

.quick-colors {
  margin-bottom: 10px;
}

.quick-colors h3 {
  margin: 0 0 1rem 0;
  color: var(--text-primary);
}

.color-swatches {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0.5rem;
}

.color-swatch {
  height: 60px;
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid var(--border-color);
  display: flex;
  align-items: end;
  justify-content: center;
  transition: transform 0.2s;
  position: relative;
}

.color-swatch:hover {
  transform: scale(1.05);
}

.color-name {
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px 4px 0 0;
  font-size: 0.75rem;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}

@media (max-width: 768px) {
  .rgb-inputs {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .format-grid {
    grid-template-columns: 1fr;
  }
  
  .color-swatches {
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  }
}
</style> 