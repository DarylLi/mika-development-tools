<template>
  <div class="single-tool">
    <h2><i class="fas fa-palette"></i> {{ $t('tools.colorConverter.ui.title') }}</h2>
    
    <div class="example-section">
      <button class="example-btn" @click="loadExample">
        <i class="fas fa-lightbulb"></i> {{ $t('tools.colorConverter.ui.loadExample') }}
      </button>
    </div>
    
    <input v-model="colorInput" :placeholder="$t('tools.colorConverter.ui.inputPlaceholder')">
    <button @click="convertColor">{{ $t('tools.colorConverter.ui.convertColor') }}</button>
    
    <div class="result-display">
      {{ result }}
      <div v-if="colorPreview" 
           :style="{ backgroundColor: colorPreview, width: '100px', height: '50px', marginTop: '10px', borderRadius: '5px' }">
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'ColorConverter',
  props: {
    toolData: Object
  },
  setup() {
    const { t } = useI18n()
    const colorInput = ref('')
    const result = ref('')
    const colorPreview = ref('')

    const loadExample = () => {
      colorInput.value = '#3498db'
      
      setTimeout(() => {
        convertColor()
      }, 500)
    }

    const convertColor = () => {
      const color = colorInput.value.trim()
      
      if (!color) {
        result.value = t('tools.colorConverter.ui.enterColorValue')
        return
      }
      
      let resultText = ''
      colorPreview.value = ''
      
      // HEX转RGB
      if (color.match(/^#[0-9A-Fa-f]{6}$/)) {
        const hex = color.substring(1)
        const r = parseInt(hex.substring(0, 2), 16)
        const g = parseInt(hex.substring(2, 4), 16)
        const b = parseInt(hex.substring(4, 6), 16)
        
        const hsl = rgbToHsl(r, g, b)
        
        resultText = `HEX: ${color.toUpperCase()}
RGB: rgb(${r}, ${g}, ${b})
HSL: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
        colorPreview.value = color
      }
      // RGB转其他格式
      else if (color.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/)) {
        const match = color.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/)
        const r = parseInt(match[1])
        const g = parseInt(match[2])
        const b = parseInt(match[3])
        
        const hex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
        const hsl = rgbToHsl(r, g, b)
        
        resultText = `RGB: rgb(${r}, ${g}, ${b})
HEX: ${hex.toUpperCase()}
HSL: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
        colorPreview.value = color
      }
      else {
        resultText = t('tools.colorConverter.ui.unsupportedFormat') + '\n' + t('tools.colorConverter.ui.supportedFormats')
      }
      
      result.value = resultText
    }

    // RGB转HSL工具函数
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
      
      return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
      }
    }

    return {
      colorInput,
      result,
      colorPreview,
      loadExample,
      convertColor
    }
  }
}
</script> 