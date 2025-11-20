<template>
  <div class="lorem-image-tool">
    <div class="tool-header">
      <h3><i class="fas fa-image"></i> {{ $t('tools.loremImage.ui.title') }}</h3>
      <p>{{ $t('tools.loremImage.ui.description') }}</p>
    </div>

    <div class="tool-content">
      <div class="image-config">
        <div class="config-group">
          <label for="width">{{ $t('tools.loremImage.ui.width') }}</label>
          <input type="number" id="width" v-model.number="width" min="1" max="2000" />
        </div>
        
        <div class="config-group">
          <label for="height">{{ $t('tools.loremImage.ui.height') }}</label>
          <input type="number" id="height" v-model.number="height" min="1" max="2000" />
        </div>
        
        <div class="config-group">
          <label for="bgColor">{{ $t('tools.loremImage.ui.bgColor') }}</label>
          <input type="color" id="bgColor" v-model="bgColor" />
        </div>
        
        <div class="config-group">
          <label for="textColor">{{ $t('tools.loremImage.ui.textColor') }}</label>
          <input type="color" id="textColor" v-model="textColor" />
        </div>
        
        <div class="config-group">
          <label for="customText">{{ $t('tools.loremImage.ui.customText') }}</label>
          <input type="text" id="customText" v-model="customText" :placeholder="$t('tools.loremImage.ui.customTextPlaceholder')" />
        </div>
        
        <div class="config-group">
          <label for="format">{{ $t('tools.loremImage.ui.format') }}</label>
          <select id="format" v-model="format">
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
            <option value="webp">WebP</option>
          </select>
        </div>
      </div>

      <div class="preset-sizes">
        <h4>{{ $t('tools.loremImage.ui.commonSizes') }}</h4>
        <div class="preset-buttons">
          <button v-for="preset in presets" :key="preset.name" 
                  @click="applyPreset(preset)" class="preset-btn">
            {{ preset.name }}
            <span>{{ preset.width }}×{{ preset.height }}</span>
          </button>
        </div>
      </div>

      <div class="preview-section">
        <h4>{{ $t('tools.loremImage.ui.preview') }}</h4>
        <div class="image-preview">
          <canvas ref="previewCanvas" 
                  :width="width" 
                  :height="height"
                  :style="{ maxWidth: '100%', height: 'auto' }">
          </canvas>
        </div>
        
        <div class="actions">
          <button @click="generateImage" class="btn-primary">
            <i class="fas fa-magic"></i> {{ $t('tools.loremImage.ui.generateImage') }}
          </button>
          <button @click="downloadImage" class="btn-secondary" :disabled="!generatedImage">
            <i class="fas fa-download"></i> {{ $t('tools.loremImage.ui.downloadImage') }}
          </button>
          <button @click="copyToClipboard" class="btn-secondary" :disabled="!generatedImage">
            <i class="fas fa-copy"></i> {{ $t('tools.loremImage.ui.copyImage') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import messageService from '../../utils/message.js'

export default {
  name: 'LoremImage',
  setup() {
    const { t } = useI18n()
    const width = ref(300)
    const height = ref(200)
    const bgColor = ref('#cccccc')
    const textColor = ref('#666666')
    const customText = ref('')
    const format = ref('png')
    const previewCanvas = ref(null)
    const generatedImage = ref(null)

    const presets = computed(() => {
      const p = t('tools.loremImage.ui.presets')
      return [
        { name: p.websiteBanner, width: 1200, height: 400 },
        { name: p.articleThumbnail, width: 400, height: 300 },
        { name: p.avatar, width: 200, height: 200 },
        { name: p.mobileBanner, width: 750, height: 300 },
        { name: p.desktopWallpaper, width: 1920, height: 1080 },
        { name: p.socialMedia, width: 1080, height: 1080 },
        { name: p.businessCard, width: 350, height: 200 },
        { name: p.smallIcon, width: 64, height: 64 }
      ]
    })

    const applyPreset = (preset) => {
      width.value = preset.width
      height.value = preset.height
    }

    const generateImage = () => {
      const canvas = previewCanvas.value
      const ctx = canvas.getContext('2d')
      
      // 清空画布
      ctx.clearRect(0, 0, width.value, height.value)
      
      // 设置背景色
      ctx.fillStyle = bgColor.value
      ctx.fillRect(0, 0, width.value, height.value)
      
      // 设置文字
      const text = customText.value || `${width.value} × ${height.value}`
      ctx.fillStyle = textColor.value
      
      // 动态计算字体大小
      const maxFontSize = Math.min(width.value, height.value) / 8
      const fontSize = Math.max(12, Math.min(maxFontSize, 48))
      ctx.font = `${fontSize}px Arial, sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      
      // 绘制文字
      ctx.fillText(text, width.value / 2, height.value / 2)
      
      // 保存生成的图片
      generatedImage.value = canvas.toDataURL(`image/${format.value}`, 0.9)
    }

    const downloadImage = () => {
      if (!generatedImage.value) return
      
      const link = document.createElement('a')
      link.download = `placeholder_${width.value}x${height.value}.${format.value}`
      link.href = generatedImage.value
      link.click()
    }

    const copyToClipboard = async () => {
      if (!generatedImage.value) return
      
      try {
        const canvas = previewCanvas.value
        canvas.toBlob(async (blob) => {
          const item = new ClipboardItem({ 'image/png': blob })
          await navigator.clipboard.write([item])
          messageService.success(t('common.copied'))
        }, 'image/png')
      } catch (error) {
        console.error(t('tools.loremImage.ui.copyFailed') + ':', error)
        messageService.error(t('common.error'))
      }
    }

    // 监听参数变化，自动重新生成
    watch([width, height, bgColor, textColor, customText, format], () => {
      generateImage()
    })

    onMounted(() => {
      generateImage()
    })

    return {
      width,
      height,
      bgColor,
      textColor,
      customText,
      format,
      previewCanvas,
      generatedImage,
      presets,
      applyPreset,
      generateImage,
      downloadImage,
      copyToClipboard
    }
  }
}
</script>

<style scoped>
.lorem-image-tool {
  max-width: 800px;
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

.image-config {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 10px;
}

.config-group {
  display: flex;
  flex-direction: column;
}

.config-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-primary);
}

.config-group input,
.config-group select {
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.preset-sizes {
  margin-bottom: 10px;
}

.preset-sizes h4 {
  margin-bottom: 10px;
  color: var(--text-primary);
}

.preset-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.preset-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.preset-btn:hover {
  background: var(--accent-color);
  color: white;
}

.preset-btn span {
  font-size: 0.75rem;
  opacity: 0.8;
}

.preview-section {
  text-align: center;
}

.preview-section h4 {
  margin-bottom: 10px;
  color: var(--text-primary);
}

.image-preview {
  margin-bottom: 10px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 10px;
  background: var(--bg-secondary);
  display: inline-block;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
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
</style> 