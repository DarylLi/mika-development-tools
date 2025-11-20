<template>
  <div class="gif-split-container">
    <div class="tool-header">
      <h3>{{ $t('tools.gifSplit.ui.title') }}</h3>
      <p>{{ $t('tools.gifSplit.ui.description') }}</p>
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
          accept=".gif" 
          @change="handleFileSelect"
          style="display: none"
        />
        <div class="upload-content">
          <div class="upload-icon">🎬</div>
          <p>{{ $t('tools.gifSplit.ui.uploadText') }}</p>
          <small>{{ $t('tools.gifSplit.ui.uploadFormats') }}</small>
        </div>
      </div>
    </div>

    <div class="gif-analysis" v-if="gifData">
      <div class="gif-preview">
        <img :src="gifData.preview" :alt="gifData.name" />
        <div class="gif-info">
          <h4>{{ gifData.name }}</h4>
          <p>{{ $t('tools.gifSplit.ui.fileSize') }}: {{ formatFileSize(gifData.size) }}</p>
          <p>{{ $t('tools.gifSplit.ui.dimensions') }}: {{ gifData.width }} × {{ gifData.height }}</p>
          <p v-if="frames.length > 0">{{ $t('tools.gifSplit.ui.frameCount') }}: {{ frames.length }}</p>
        </div>
      </div>

      <div class="controls-section">
        <div class="split-options">
          <h4>{{ $t('tools.gifSplit.ui.splitOptions') }}</h4>
          <div class="option-group">
            <label>{{ $t('tools.gifSplit.ui.outputFormat') }}:</label>
            <select v-model="outputFormat" class="format-select">
              <option value="png">PNG</option>
              <option value="jpeg">JPEG</option>
              <option value="webp">WebP</option>
            </select>
          </div>
          <div class="option-group">
            <label>{{ $t('tools.gifSplit.ui.frameInterval') }}:</label>
            <select v-model="frameInterval" class="interval-select">
              <option value="1">{{ $t('tools.gifSplit.ui.everyFrame') }}</option>
              <option value="2">{{ $t('tools.gifSplit.ui.every2Frames') }}</option>
              <option value="5">{{ $t('tools.gifSplit.ui.every5Frames') }}</option>
              <option value="10">{{ $t('tools.gifSplit.ui.every10Frames') }}</option>
            </select>
          </div>
        </div>

        <div class="action-buttons">
          <button @click="splitGif" class="split-btn" :disabled="processing || !gifData">
            {{ processing ? $t('tools.gifSplit.ui.processing') : $t('tools.gifSplit.ui.startSplit') }}
          </button>
          <button @click="downloadAllFrames" class="download-btn" v-if="frames.length > 0">
            {{ $t('tools.gifSplit.ui.downloadAll') }}
          </button>
          <button @click="reset" class="reset-btn">{{ $t('tools.gifSplit.ui.clear') }}</button>
        </div>
      </div>
    </div>

    <div class="frames-grid" v-if="frames.length > 0">
      <h4>{{ $t('tools.gifSplit.ui.splitResult') }} ({{ frames.length }} {{ $t('tools.gifSplit.ui.frames') }})</h4>
      <div class="grid-container">
        <div 
          v-for="(frame, index) in frames" 
          :key="index"
          class="frame-item"
        >
          <div class="frame-preview">
            <img :src="frame.dataUrl" :alt="`Frame ${index + 1}`" />
            <div class="frame-number">{{ index + 1 }}</div>
          </div>
          <button @click="downloadFrame(index)" class="download-frame-btn">
            {{ $t('tools.gifSplit.ui.download') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GifSplit',
  data() {
    return {
      gifData: null,
      frames: [],
      isDragOver: false,
      processing: false,
      outputFormat: 'png',
      frameInterval: 1
    }
  },
  methods: {
    handleDrop(e) {
      this.isDragOver = false
      const files = Array.from(e.dataTransfer.files).filter(file => 
        file.type === 'image/gif'
      )
      if (files.length > 0) {
        this.loadGif(files[0])
      }
    },

    handleFileSelect(e) {
      const file = e.target.files[0]
      if (file && file.type === 'image/gif') {
        this.loadGif(file)
      }
    },

    loadGif(file) {
      const preview = URL.createObjectURL(file)
      const img = new Image()
      
      img.onload = () => {
        this.gifData = {
          file,
          preview,
          name: file.name,
          size: file.size,
          width: img.width,
          height: img.height
        }
      }
      
      img.src = preview
    },

    async splitGif() {
      if (!this.gifData) return
      
      this.processing = true
      this.frames = []
      
      try {
        // 使用 gif.js 或类似库来解析 GIF
        // 这里使用简化的实现
        await this.extractFrames()
      } catch (error) {
        console.error(this.$t('tools.gifSplit.ui.splitFailed'), error)
        this.$message.success(this.$t('tools.gifSplit.ui.splitFailed'))
      } finally {
        this.processing = false
      }
    },

    async extractFrames() {
      // 简化的帧提取实现
      // 实际项目中需要使用专业的 GIF 解析库
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      return new Promise((resolve) => {
        img.onload = () => {
          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0)
          
          // 生成模拟帧（实际需要解析 GIF 数据）
          for (let i = 0; i < 10; i++) {
            if (i % this.frameInterval === 0) {
              const dataUrl = canvas.toDataURL(`image/${this.outputFormat}`)
              this.frames.push({
                index: i,
                dataUrl,
                blob: null
              })
            }
          }
          
          resolve()
        }
        
        img.src = this.gifData.preview
      })
    },

    downloadFrame(index) {
      const frame = this.frames[index]
      const a = document.createElement('a')
      a.href = frame.dataUrl
      a.download = `${this.gifData.name}_frame_${frame.index + 1}.${this.outputFormat}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    },

    async downloadAllFrames() {
      try {
        const JSZip = (await import('jszip')).default
        const zip = new JSZip()

        this.frames.forEach((frame, index) => {
          const base64Data = frame.dataUrl.split(',')[1]
          zip.file(`frame_${frame.index + 1}.${this.outputFormat}`, base64Data, {base64: true})
        })

        const zipBlob = await zip.generateAsync({ type: 'blob' })
        const url = URL.createObjectURL(zipBlob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${this.gifData.name}_frames.zip`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      } catch (error) {
        this.$message.success(this.$t('tools.gifSplit.ui.batchDownloadFailed'))
      }
    },

    reset() {
      if (this.gifData) {
        URL.revokeObjectURL(this.gifData.preview)
      }
      
      this.gifData = null
      this.frames = []
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
.gif-split-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}

.tool-header {
  text-align: center;
  margin-bottom: 10px;
  padding: 10px;
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
}

.upload-icon {
  font-size: 48px;
  margin-bottom: 10px;
}

.gif-analysis {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-top: 30px;
}

.gif-preview {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 10px;
  text-align: center;
}

.gif-preview img {
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.controls-section {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 10px;
}

.option-group {
  margin-bottom: 10px;
}

.option-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
  color: var(--text-primary);
}

.format-select,
.interval-select {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--bg-primary);
  color: var(--text-primary);
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.split-btn,
.download-btn,
.reset-btn {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.split-btn {
  background: var(--primary-color);
  color: white;
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

.frames-grid {
  margin-top: 40px;
}

.frames-grid h4 {
  margin-bottom: 10px;
  color: var(--text-primary);
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
}

.frame-item {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 10px;
  text-align: center;
}

.frame-preview {
  position: relative;
  margin-bottom: 10px;
}

.frame-preview img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;
}

.frame-number {
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 10px;
  border-radius: 4px;
  font-size: 12px;
}

.download-frame-btn {
  width: 100%;
  padding: 10px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

@media (max-width: 768px) {
  .gif-analysis {
    grid-template-columns: 1fr;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .grid-container {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
}
/* Input 输入框统一样式 */
input[type="text"],
input[type="number"],
input[type="email"],
input[type="password"],
input[type="url"],
input[type="search"],
input[type="tel"] {
  background: #fff;
}
/* Checkbox 统一样式 */
input[type="checkbox"] {
  width: 20px;
  margin-bottom: 0px;
}
</style>
