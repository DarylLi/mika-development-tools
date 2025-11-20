<template>
  <div class="image-resize-container">
    <div class="tool-header">
      <h3>{{ $t('tools.imageResize.ui.title') }}</h3>
      <p>{{ $t('tools.imageResize.ui.description') }}</p>
    </div>

    <div class="upload-section">
      <div 
        class="upload-area"
        :class="{ 'dragover': isDragOver }"
        @dragover.prevent="isDragOver = true"
        @dragleave.prevent="isDragOver = false"
        @drop.prevent="handleDrop"
        @click="$refs.fileInput.click()"
      >
        <input 
          ref="fileInput"
          type="file" 
          accept="image/*" 
          @change="handleFileSelect"
          style="display: none"
        />
        <div class="upload-content">
          <div class="upload-icon">🖼️</div>
          <p>{{ $t('tools.imageResize.ui.uploadText') }}</p>
          <small>{{ $t('tools.imageResize.ui.uploadFormats') }}</small>
        </div>
      </div>
    </div>

    <div class="editor-section" v-if="originalImage">
      <div class="image-preview-container">
        <div class="preview-panel">
          <h4>{{ $t('tools.imageResize.ui.originalImage') }}</h4>
          <div class="image-wrapper">
            <img :src="originalImage.preview" :alt="$t('tools.imageResize.ui.originalImageAlt')" />
            <div class="image-info">
              <p>{{ originalImage.width }} × {{ originalImage.height }}</p>
              <p>{{ formatFileSize(originalImage.size) }}</p>
            </div>
          </div>
        </div>

        <div class="preview-panel" v-if="resizedImage">
          <h4>{{ $t('tools.imageResize.ui.resizedImage') }}</h4>
          <div class="image-wrapper">
            <img :src="resizedImage.preview" :alt="$t('tools.imageResize.ui.resizedImage')" />
            <div class="image-info">
              <p>{{ newWidth }} × {{ newHeight }}</p>
              <p>{{ formatFileSize(resizedImage.size) }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="controls-section">
        <div class="resize-methods">
          <h4>{{ $t('tools.imageResize.ui.resizeMethod') }}</h4>
          <div class="method-options">
            <label class="method-option">
              <input 
                type="radio" 
                v-model="resizeMethod" 
                value="percentage"
              />
              <span>{{ $t('tools.imageResize.ui.methodPercentage') }}</span>
            </label>
            <label class="method-option">
              <input 
                type="radio" 
                v-model="resizeMethod" 
                value="pixels"
              />
              <span>{{ $t('tools.imageResize.ui.methodPixels') }}</span>
            </label>
            <label class="method-option">
              <input 
                type="radio" 
                v-model="resizeMethod" 
                value="preset"
              />
              <span>{{ $t('tools.imageResize.ui.methodPreset') }}</span>
            </label>
          </div>
        </div>

        <div class="resize-controls" v-if="resizeMethod === 'percentage'">
          <div class="control-group">
            <label>{{ $t('tools.imageResize.ui.scaleLabel') }}</label>
            <div class="percentage-control">
              <input 
                type="range" 
                v-model="scalePercentage" 
                min="10" 
                max="500"
                class="modern-slider" 
                step="5"
                @input="updateFromPercentage"
              />
              <input 
                type="number" 
                v-model="scalePercentage" 
                min="10" 
                max="500"
                @input="updateFromPercentage"
                class="percentage-input"
              />
              <span>%</span>
            </div>
          </div>
        </div>

        <div class="resize-controls" v-if="resizeMethod === 'pixels'">
          <div class="control-group">
            <label class="lock-ratio-label">
              <input 
                type="checkbox" 
                v-model="maintainRatio"
                @change="updateFromPixels"
              />
              <span>{{ $t('tools.imageResize.ui.maintainRatio') }}</span>
            </label>
          </div>
          <div class="pixel-controls">
            <div class="pixel-input-group">
              <label>{{ $t('tools.imageResize.ui.widthLabel') }}</label>
              <input 
                type="number" 
                v-model="newWidth" 
                min="1"
                @input="updateFromWidth"
                class="pixel-input"
              />
            </div>
            <div class="pixel-input-group">
              <label>{{ $t('tools.imageResize.ui.heightLabel') }}</label>
              <input 
                type="number" 
                v-model="newHeight" 
                min="1"
                @input="updateFromHeight"
                class="pixel-input"
              />
            </div>
          </div>
        </div>

        <div class="resize-controls" v-if="resizeMethod === 'preset'">
          <div class="preset-grid">
            <button 
              v-for="preset in presetSizes"
              :key="preset.key"
              @click="applyPreset(preset)"
              class="preset-btn"
            >
              <strong>{{ preset.name }}</strong>
              <span>{{ preset.width }} × {{ preset.height }}</span>
            </button>
          </div>
        </div>

        <div class="quality-section">
          <div class="control-group">
            <label>{{ $t('tools.imageResize.ui.outputQuality') }}</label>
            <div class="quality-control">
              <input 
                type="range" 
                v-model="quality" 
                min="0.1" 
                max="1"
                class="modern-slider" 
                step="0.05"
              />
              <span>{{ Math.round(quality * 100) }}%</span>
            </div>
          </div>
        </div>

        <div class="action-buttons">
          <button @click="processResize" class="resize-btn" :disabled="processing">
            {{ processing ? $t('tools.imageResize.ui.processing') : $t('tools.imageResize.ui.applyResize') }}
          </button>
          <button 
            @click="downloadImage" 
            class="download-btn"
            v-if="resizedImage"
          >
            {{ $t('tools.imageResize.ui.downloadImage') }}
          </button>
          <button @click="reset" class="reset-btn">{{ $t('tools.imageResize.ui.reset') }}</button>
        </div>
      </div>
    </div>

    <div class="tips-section">
      <h4>💡 {{ $t('tools.imageResize.ui.tipsTitle') }}</h4>
      <ul>
        <li>{{ $t('tools.imageResize.ui.tip1') }}</li>
        <li>{{ $t('tools.imageResize.ui.tip2') }}</li>
        <li>{{ $t('tools.imageResize.ui.tip3') }}</li>
        <li>{{ $t('tools.imageResize.ui.tip4') }}</li>
        <li>{{ $t('tools.imageResize.ui.tip5') }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageResize',
  data() {
    return {
      originalImage: null,
      resizedImage: null,
      isDragOver: false,
      resizeMethod: 'percentage',
      scalePercentage: 100,
      newWidth: 0,
      newHeight: 0,
      maintainRatio: true,
      quality: 0.9,
      processing: false
    }
  },
  computed: {
    aspectRatio() {
      if (!this.originalImage) return 1
      return this.originalImage.width / this.originalImage.height
    },
    presetSizes() {
      return [
        { key: 'avatar', name: this.$t('tools.imageResize.ui.presetAvatar'), width: 256, height: 256 },
        { key: 'thumbnail', name: this.$t('tools.imageResize.ui.presetThumbnail'), width: 150, height: 150 },
        { key: 'instagram', name: this.$t('tools.imageResize.ui.presetInstagram'), width: 1080, height: 1080 },
        { key: 'facebookCover', name: this.$t('tools.imageResize.ui.presetFacebookCover'), width: 1200, height: 630 },
        { key: 'twitterHeader', name: this.$t('tools.imageResize.ui.presetTwitterHeader'), width: 1500, height: 500 },
        { key: 'wechatAvatar', name: this.$t('tools.imageResize.ui.presetWeChatAvatar'), width: 300, height: 300 },
        { key: '4k', name: this.$t('tools.imageResize.ui.preset4K'), width: 3840, height: 2160 },
        { key: '2k', name: this.$t('tools.imageResize.ui.preset2K'), width: 2560, height: 1440 },
        { key: 'fullHD', name: this.$t('tools.imageResize.ui.presetFullHD'), width: 1920, height: 1080 },
        { key: 'hd', name: this.$t('tools.imageResize.ui.presetHD'), width: 1280, height: 720 }
      ]
    }
  },
  methods: {
    handleDrop(e) {
      this.isDragOver = false
      const files = Array.from(e.dataTransfer.files).filter(file => 
        file.type.startsWith('image/')
      )
      if (files.length > 0) {
        this.loadImage(files[0])
      }
    },

    handleFileSelect(e) {
      const file = e.target.files[0]
      if (file) {
        this.loadImage(file)
      }
    },

    loadImage(file) {
      const preview = URL.createObjectURL(file)
      const img = new Image()
      
      img.onload = () => {
        this.originalImage = {
          file,
          preview,
          width: img.width,
          height: img.height,
          size: file.size
        }
        this.newWidth = img.width
        this.newHeight = img.height
        this.resizedImage = null
      }
      
      img.src = preview
    },

    updateFromPercentage() {
      if (!this.originalImage) return
      this.newWidth = Math.round(this.originalImage.width * this.scalePercentage / 100)
      this.newHeight = Math.round(this.originalImage.height * this.scalePercentage / 100)
    },

    updateFromWidth() {
      if (!this.originalImage || !this.maintainRatio) return
      this.newHeight = Math.round(this.newWidth / this.aspectRatio)
    },

    updateFromHeight() {
      if (!this.originalImage || !this.maintainRatio) return
      this.newWidth = Math.round(this.newHeight * this.aspectRatio)
    },

    updateFromPixels() {
      if (!this.originalImage) return
      if (this.maintainRatio) {
        this.updateFromWidth()
      }
    },

    applyPreset(preset) {
      this.newWidth = preset.width
      this.newHeight = preset.height
    },

    async processResize() {
      if (!this.originalImage) return
      
      this.processing = true
      
      try {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const img = new Image()
        
        await new Promise((resolve, reject) => {
          img.onload = resolve
          img.onerror = reject
          img.src = this.originalImage.preview
        })
        
        canvas.width = this.newWidth
        canvas.height = this.newHeight
        
        // 使用高质量绘制
        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(img, 0, 0, this.newWidth, this.newHeight)
        
        const resizedBlob = await new Promise(resolve => {
          canvas.toBlob(resolve, 'image/jpeg', this.quality)
        })
        
        this.resizedImage = {
          preview: URL.createObjectURL(resizedBlob),
          blob: resizedBlob,
          size: resizedBlob.size
        }
        
      } catch (error) {
        console.error(this.$t('tools.imageResize.ui.processFailed'), error)
        this.$message.success(this.$t('tools.imageResize.ui.imageProcessFailed'))
      } finally {
        this.processing = false
      }
    },

    downloadImage() {
      if (!this.resizedImage) return
      
      const url = URL.createObjectURL(this.resizedImage.blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `resized_${this.newWidth}x${this.newHeight}_${this.originalImage.file.name}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    },

    reset() {
      if (this.originalImage) {
        URL.revokeObjectURL(this.originalImage.preview)
      }
      if (this.resizedImage) {
        URL.revokeObjectURL(this.resizedImage.preview)
      }
      
      this.originalImage = null
      this.resizedImage = null
      this.scalePercentage = 100
      this.newWidth = 0
      this.newHeight = 0
      this.resizeMethod = 'percentage'
      this.maintainRatio = true
      this.quality = 0.9
    },

    formatFileSize(bytes) {
      if (bytes === 0) return '0 B'
      const k = 1024
      const sizes = ['B', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }
  },

  beforeUnmount() {
    this.reset()
  }
}
</script>

<style scoped>
.image-resize-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}

.tool-header {
  text-align: center;
  margin-bottom: 10px;
  padding: 10px;
}

.tool-header h3 {
  margin: 0 0 10px 0;
  color: var(--text-primary);
}

.tool-header p {
  margin: 0;
  color: var(--text-secondary);
}

.upload-area {
  border: 2px dashed var(--border-color);
  border-radius: 12px;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: var(--bg-secondary);
}

.upload-area:hover,
.upload-area.dragover {
  border-color: var(--primary-color);
  background: var(--bg-primary);
  transform: translateY(-2px);
}

.upload-content .upload-icon {
  font-size: 48px;
  margin-bottom: 10px;
}

.upload-content p {
  margin: 0 0 5px 0;
  font-size: 18px;
  color: var(--text-primary);
}

.upload-content small {
  color: var(--text-secondary);
}

.editor-section {
  margin-top: 30px;
}

.image-preview-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 10px;
}

.preview-panel h4 {
  margin: 0 0 15px 0;
  text-align: center;
  color: var(--text-primary);
}

.image-wrapper {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 10px;
  text-align: center;
}

.image-wrapper img {
  max-width: 100%;
  max-height: 300px;
  object-fit: contain;
  border-radius: 8px;
}

.image-info {
  margin-top: 10px;
  font-size: 14px;
  color: var(--text-secondary);
}

.image-info p {
  margin: 5px 0;
}

.controls-section {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 10px;
}

.resize-methods h4 {
  margin: 0 0 15px 0;
  color: var(--text-primary);
}

.method-options {
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
}

.method-option {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: var(--text-primary);
}

.method-option input[type="radio"] {
  accent-color: var(--primary-color);
  width: 25px;
  margin: 0px;
}

.control-group {
  margin-bottom: 10px;
}

.control-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
  color: var(--text-primary);
}

.percentage-control {
  display: flex;
  align-items: center;
  gap: 15px;
}


.percentage-input {
  width: 80px;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--bg-primary);
  color: var(--text-primary);
  text-align: center;
}

.lock-ratio-label {
  display: flex !important;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-weight: normal !important;
}

input[type="checkbox"] {
  width: 20px;
  margin-bottom: 0px;
  accent-color: var(--primary-color);
}

.pixel-controls {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.pixel-input-group label {
  margin-bottom: 10px;
}

.pixel-input {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--bg-primary);
  color: var(--text-primary);
}

.preset-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
}

.preset-btn {
  padding: 10px;
  border: 1px solid var(--border-color);
  background: var(--bg-primary);
  color: var(--text-primary);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.preset-btn:hover {
  border-color: var(--primary-color);
  background: var(--bg-tertiary);
}

.preset-btn strong {
  display: block;
  margin-bottom: 10px;
}

.preset-btn span {
  font-size: 12px;
  color: var(--text-secondary);
}

.quality-control {
  display: flex;
  align-items: center;
  gap: 15px;
}


.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: 25px;
}

.resize-btn,
.download-btn,
.reset-btn {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
}

.resize-btn {
  background: var(--primary-color);
  color: white;
}

.resize-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.download-btn {
  background: var(--success-color);
  color: white;
}

.reset-btn {
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.tips-section {
  margin-top: 40px;
  padding: 10px;
  background: var(--bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.tips-section h4 {
  margin: 0 0 15px 0;
  color: var(--text-primary);
}

.tips-section ul {
  margin: 0;
  padding-left: 20px;
  color: var(--text-secondary);
}

.tips-section li {
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .image-resize-container {
    padding: 10px;
  }
  
  .image-preview-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .method-options {
    flex-direction: column;
    gap: 10px;
  }
  
  .pixel-controls {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .preset-grid {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
  
  .action-buttons {
    flex-direction: column;
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

</style> 