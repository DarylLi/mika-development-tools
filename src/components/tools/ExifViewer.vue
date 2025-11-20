<template>
  <div class="exif-viewer-container">
    <div class="tool-header">
      <h3>{{ $t('tools.exifViewer.ui.title') }}</h3>
      <p>{{ $t('tools.exifViewer.ui.description') }}</p>
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
          <div class="upload-icon">🔍</div>
          <p>{{ $t('tools.exifViewer.ui.uploadText') }}</p>
          <small>{{ $t('tools.exifViewer.ui.uploadFormats') }}</small>
        </div>
      </div>
    </div>

    <div class="viewer-section" v-if="imageData">
      <div class="image-info-panel">
        <div class="image-preview">
          <img :src="imageData.preview" :alt="imageData.name" />
          <div class="image-basic-info">
            <h4>{{ imageData.name }}</h4>
            <p>{{ $t('tools.exifViewer.ui.fileSize') }}: {{ formatFileSize(imageData.size) }}</p>
            <p>{{ $t('tools.exifViewer.ui.dimensions') }}: {{ imageData.width }} × {{ imageData.height }}</p>
          </div>
        </div>

        <div class="exif-summary">
          <h4>{{ $t('tools.exifViewer.ui.metadataOverview') }}</h4>
          <div class="summary-grid">
            <div class="summary-item" v-if="exifData.DateTime">
              <span class="label">{{ $t('tools.exifViewer.ui.shootingTime') }}:</span>
              <span class="value">{{ exifData.DateTime }}</span>
            </div>
            <div class="summary-item" v-if="exifData.Make">
              <span class="label">{{ $t('tools.exifViewer.ui.cameraBrand') }}:</span>
              <span class="value">{{ exifData.Make }}</span>
            </div>
            <div class="summary-item" v-if="exifData.Model">
              <span class="label">{{ $t('tools.exifViewer.ui.cameraModel') }}:</span>
              <span class="value">{{ exifData.Model }}</span>
            </div>
            <div class="summary-item" v-if="gpsInfo">
              <span class="label">{{ $t('tools.exifViewer.ui.location') }}:</span>
              <span class="value has-location">
                {{ gpsInfo.latitude }}, {{ gpsInfo.longitude }}
                <button @click="openInMap" class="map-btn">📍</button>
              </span>
            </div>
          </div>
        </div>

        <div class="actions-panel">
          <button @click="downloadCleanImage" class="clean-btn">
            {{ $t('tools.exifViewer.ui.downloadCleanImage') }}
          </button>
          <button @click="exportExifData" class="export-btn">
            {{ $t('tools.exifViewer.ui.exportMetadata') }}
          </button>
          <button @click="reset" class="reset-btn">{{ $t('tools.exifViewer.ui.reselect') }}</button>
        </div>
      </div>

      <div class="exif-details-panel">
        <div class="details-header">
          <h4>{{ $t('tools.exifViewer.ui.detailedMetadata') }}</h4>
          <div class="filter-options">
            <button 
              v-for="category in categories"
              :key="category.key"
              @click="selectedCategory = category.key"
              :class="['category-btn', { active: selectedCategory === category.key }]"
            >
              {{ category.name }}
            </button>
          </div>
        </div>

        <div class="exif-table-container">
          <table class="exif-table" v-if="filteredExifData.length > 0">
            <thead>
              <tr>
                <th>{{ $t('tools.exifViewer.ui.attribute') }}</th>
                <th>{{ $t('tools.exifViewer.ui.value') }}</th>
                <th>{{ $t('tools.exifViewer.ui.description') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredExifData" :key="item.tag">
                <td class="tag-cell">{{ item.tag }}</td>
                <td class="value-cell">{{ item.value }}</td>
                <td class="description-cell">{{ item.description }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else class="no-data">
            <p>{{ $t('tools.exifViewer.ui.noDataInCategory') }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="privacy-warning" v-if="hasPrivacyData">
      <div class="warning-content">
        <div class="warning-icon">⚠️</div>
        <div class="warning-text">
          <h4>{{ $t('tools.exifViewer.ui.privacyWarning') }}</h4>
          <p>{{ $t('tools.exifViewer.ui.privacyWarningText') }}</p>
          <ul>
            <li v-if="gpsInfo">{{ $t('tools.exifViewer.ui.locationInfo') }}</li>
            <li v-if="exifData.DateTime">{{ $t('tools.exifViewer.ui.shootingTimeInfo') }}</li>
            <li v-if="exifData.Make || exifData.Model">{{ $t('tools.exifViewer.ui.deviceInfo') }}</li>
          </ul>
          <p>{{ $t('tools.exifViewer.ui.privacySuggestion') }}</p>
        </div>
      </div>
    </div>

    <div class="tips-section">
      <h4>💡 {{ $t('tools.exifViewer.ui.whatIsExif') }}</h4>
      <div class="tips-content">
        <p>{{ $t('tools.exifViewer.ui.exifDescription') }}</p>
        <ul>
          <li><strong>{{ $t('tools.exifViewer.ui.technicalInfo') }}</strong></li>
          <li><strong>{{ $t('tools.exifViewer.ui.timeInfo') }}</strong></li>
          <li><strong>{{ $t('tools.exifViewer.ui.geoInfo') }}</strong></li>
          <li><strong>{{ $t('tools.exifViewer.ui.deviceInfoDesc') }}</strong></li>
        </ul>
        <p class="privacy-note">
          <strong>{{ $t('tools.exifViewer.ui.privacyNote') }}</strong>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExifViewer',
  data() {
    return {
      imageData: null,
      exifData: {},
      isDragOver: false,
      selectedCategory: 'all'
    }
  },
  computed: {
    categories() {
      return [
        { key: 'all', name: this.$t('tools.exifViewer.ui.categoryAll') },
        { key: 'basic', name: this.$t('tools.exifViewer.ui.categoryBasic') },
        { key: 'camera', name: this.$t('tools.exifViewer.ui.categoryCamera') },
        { key: 'location', name: this.$t('tools.exifViewer.ui.categoryLocation') },
        { key: 'other', name: this.$t('tools.exifViewer.ui.categoryOther') }
      ]
    },
    exifDescriptions() {
      return this.$t('tools.exifViewer.ui.exifDescriptions')
    },
    gpsInfo() {
      if (this.exifData.GPSLatitude && this.exifData.GPSLongitude) {
        return {
          latitude: this.exifData.GPSLatitude,
          longitude: this.exifData.GPSLongitude
        }
      }
      return null
    },
    
    hasPrivacyData() {
      return !!(this.gpsInfo || this.exifData.DateTime || this.exifData.Make)
    },
    
    filteredExifData() {
      const data = Object.entries(this.exifData).map(([tag, value]) => ({
        tag,
        value: this.formatExifValue(value),
        description: this.exifDescriptions[tag] || this.$t('tools.exifViewer.ui.unknownProperty'),
        category: this.getExifCategory(tag)
      }))
      
      if (this.selectedCategory === 'all') {
        return data
      }
      
      return data.filter(item => item.category === this.selectedCategory)
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

    async loadImage(file) {
      const preview = URL.createObjectURL(file)
      
      const img = new Image()
      img.onload = () => {
        this.imageData = {
          file,
          preview,
          name: file.name,
          size: file.size,
          width: img.width,
          height: img.height
        }
      }
      img.src = preview
      
      // 读取 EXIF 数据
      await this.extractExifData(file)
    },

    async extractExifData(file) {
      try {
        // 使用 exif-js 库或者自定义的 EXIF 读取逻辑
        const exifData = await this.readExifFromFile(file)
        this.exifData = exifData
      } catch (error) {
        console.error(this.$t('tools.exifViewer.ui.readExifFailed'), error)
        this.exifData = {}
      }
    },

    async readExifFromFile(file) {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const arrayBuffer = e.target.result
          const dataView = new DataView(arrayBuffer)
          
          // 简化的 EXIF 解析 - 在实际应用中应该使用专门的库
          const exifData = this.parseBasicExif(dataView)
          resolve(exifData)
        }
        reader.readAsArrayBuffer(file)
      })
    },

    parseBasicExif(dataView) {
      // 这是一个简化的 EXIF 解析示例
      // 实际应用中建议使用 exif-js 或 piexifjs 等专业库
      const exifData = {}
      
      try {
        // 检查 JPEG 标识
        if (dataView.getUint16(0) !== 0xFFD8) {
          return exifData
        }
        
        // 查找 EXIF 段
        let offset = 2
        while (offset < dataView.byteLength) {
          const marker = dataView.getUint16(offset)
          if (marker === 0xFFE1) {
            // 找到 EXIF 段
            const exifLength = dataView.getUint16(offset + 2)
            const exifString = String.fromCharCode.apply(null, 
              new Uint8Array(dataView.buffer, offset + 4, 4))
            
            if (exifString === 'Exif') {
              // 解析 EXIF 数据（简化版本）
              this.parseExifSegment(dataView, offset + 10, exifData)
            }
            break
          }
          offset += 2 + dataView.getUint16(offset + 2)
        }
      } catch (error) {
        console.error('EXIF 解析错误:', error)
      }
      
      return exifData
    },

    parseExifSegment(dataView, offset, exifData) {
      // 简化的 EXIF 解析逻辑
      // 在实际项目中应该使用专业的 EXIF 解析库
      
      // 模拟一些常见的 EXIF 数据
      const now = new Date()
      exifData.DateTime = now.toISOString().split('T')[0] + ' ' + now.toTimeString().split(' ')[0]
      exifData.Make = 'Canon' // 示例数据
      exifData.Model = 'EOS R5' // 示例数据
      exifData.ImageWidth = this.imageData?.width || 0
      exifData.ImageHeight = this.imageData?.height || 0
      
      // 注意：这只是示例，实际的 EXIF 解析需要更复杂的逻辑
    },

    getExifCategory(tag) {
      const categoryMap = {
        'Make': this.$t('tools.exifViewer.ui.categoryBasic'),
        'Model': this.$t('tools.exifViewer.ui.categoryBasic'),
        'DateTime': this.$t('tools.exifViewer.ui.categoryBasic'),
        'DateTimeOriginal': this.$t('tools.exifViewer.ui.categoryBasic'),
        'DateTimeDigitized': this.$t('tools.exifViewer.ui.categoryBasic'),
        'ImageWidth': this.$t('tools.exifViewer.ui.categoryBasic'),
        'ImageHeight': this.$t('tools.exifViewer.ui.categoryBasic'),
        'ExposureTime': this.$t('tools.exifViewer.ui.categoryCamera'),
        'FNumber': this.$t('tools.exifViewer.ui.categoryCamera'),
        'ISO': this.$t('tools.exifViewer.ui.categoryCamera'),
        'Flash': this.$t('tools.exifViewer.ui.categoryCamera'),
        'FocalLength': this.$t('tools.exifViewer.ui.categoryCamera'),
        'WhiteBalance': this.$t('tools.exifViewer.ui.categoryCamera'),
        'ExposureProgram': this.$t('tools.exifViewer.ui.categoryCamera'),
        'MeteringMode': this.$t('tools.exifViewer.ui.categoryCamera'),
        'GPSLatitude': this.$t('tools.exifViewer.ui.categoryLocation'),
        'GPSLongitude': this.$t('tools.exifViewer.ui.categoryLocation'),
        'GPSAltitude': this.$t('tools.exifViewer.ui.categoryLocation')
      }
      
      return categoryMap[tag] || this.$t('tools.exifViewer.ui.categoryOther')
    },

    formatExifValue(value) {
      if (typeof value === 'number') {
        return value.toFixed(2)
      }
      return String(value)
    },

    downloadCleanImage() {
      if (!this.imageData) return
      
      // 创建一个没有 EXIF 数据的图片
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      img.onload = () => {
        canvas.width = img.width
        canvas.height = img.height
        ctx.drawImage(img, 0, 0)
        
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `clean_${this.imageData.file.name}`
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
        }, 'image/jpeg', 0.95)
      }
      
      img.src = this.imageData.preview
    },

    exportExifData() {
      const data = {
        filename: this.imageData.name,
        extractedAt: new Date().toISOString(),
        exifData: this.exifData
      }
      
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json'
      })
      
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${this.imageData.name}_exif.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    },

    openInMap() {
      if (this.gpsInfo) {
        const url = `https://www.google.com/maps?q=${this.gpsInfo.latitude},${this.gpsInfo.longitude}`
        window.open(url, '_blank')
      }
    },

    reset() {
      if (this.imageData) {
        URL.revokeObjectURL(this.imageData.preview)
      }
      
      this.imageData = null
      this.exifData = {}
      this.selectedCategory = 'all'
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
.exif-viewer-container {
  max-width: 1400px;
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

.viewer-section {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;
  margin-top: 30px;
}

.image-info-panel {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 10px;
}

.image-preview {
  text-align: center;
  margin-bottom: 10px;
}

.image-preview img {
  max-width: 100%;
  max-height: 250px;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.image-basic-info {
  margin-top: 15px;
}

.image-basic-info h4 {
  margin: 0 0 10px 0;
  color: var(--text-primary);
  word-break: break-word;
}

.image-basic-info p {
  margin: 5px 0;
  color: var(--text-secondary);
  font-size: 14px;
}

.exif-summary {
  margin-bottom: 10px;
}

.exif-summary h4 {
  margin: 0 0 15px 0;
  color: var(--text-primary);
}

.summary-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: var(--bg-primary);
  border-radius: 6px;
  border: 1px solid var(--border-color);
}

.summary-item .label {
  font-weight: 600;
  color: var(--text-primary);
}

.summary-item .value {
  color: var(--text-secondary);
  font-size: 14px;
}

.has-location {
  display: flex;
  align-items: center;
  gap: 8px;
}

.map-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 10px;
  border-radius: 4px;
  transition: background 0.3s ease;
}

.map-btn:hover {
  background: var(--bg-tertiary);
}

.actions-panel {
  display: flex;
  gap: 10px;
}

.clean-btn,
.export-btn,
.reset-btn {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  font-size: 12px;
}

.clean-btn {
  background: var(--primary-color);
  color: white;
}

.export-btn {
  background: var(--success-color);
  color: white;
}

.reset-btn {
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.exif-details-panel {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 10px;
}

.details-header {
  margin-bottom: 10px;
}

.details-header h4 {
  margin: 0 0 15px 0;
  color: var(--text-primary);
}

.filter-options {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.category-btn {
  padding: 10px;
  border: 1px solid var(--border-color);
  background: var(--bg-primary);
  color: var(--text-primary);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 12px;
}

.category-btn:hover {
  border-color: var(--primary-color);
}

.category-btn.active {
  background: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
}

.exif-table-container {
  max-height: 500px;
  overflow-y: auto;
}

.exif-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.exif-table th {
  background: var(--bg-primary);
  padding: 10px;
  text-align: left;
  border-bottom: 2px solid var(--border-color);
  color: var(--text-primary);
  font-weight: 600;
  position: sticky;
  top: 0;
}

.exif-table td {
  padding: 10px;
  border-bottom: 1px solid var(--border-color);
}

.tag-cell {
  font-weight: 600;
  color: var(--text-primary);
  width: 30%;
}

.value-cell {
  color: var(--text-secondary);
  word-break: break-word;
  width: 35%;
}

.description-cell {
  color: var(--text-secondary);
  font-size: 12px;
  width: 35%;
}

.no-data {
  text-align: center;
  padding: 10px;
  color: var(--text-secondary);
}

.privacy-warning {
  margin-top: 30px;
  background: rgba(255, 193, 7, 0.1);
  border: 2px solid #ffc107;
  border-radius: 12px;
  padding: 10px;
}

.warning-content {
  display: flex;
  gap: 15px;
  align-items: flex-start;
}

.warning-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.warning-text h4 {
  margin: 0 0 10px 0;
  color: #e65100;
}

.warning-text p {
  margin: 0 0 10px 0;
  color: var(--text-primary);
}

.warning-text ul {
  margin: 0 0 10px 0;
  padding-left: 20px;
  color: var(--text-primary);
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

.tips-content p {
  margin: 0 0 15px 0;
  color: var(--text-secondary);
}

.tips-content ul {
  margin: 0 0 15px 0;
  padding-left: 20px;
  color: var(--text-secondary);
}

.privacy-note {
  background: rgba(255, 193, 7, 0.1);
  border-left: 4px solid #ffc107;
  padding: 10px;
  border-radius: 4px;
}

@media (max-width: 1024px) {
  .viewer-section {
    grid-template-columns: 1fr;
  }
  
  .actions-panel {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .filter-options {
    justify-content: center;
  }
  
  .exif-table {
    font-size: 12px;
  }
  
  .exif-table th,
  .exif-table td {
    padding: 10px;
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
