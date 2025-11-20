<template>
  <div class="icon-spriter-container">
    <div class="tool-header">
      <h3>{{ $t('tools.iconSpriter.ui.title') }}</h3>
      <p>{{ $t('tools.iconSpriter.ui.description') }}</p>
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
          accept=".svg" 
          multiple
          @change="handleFileSelect"
          style="display: none"
        />
        <div class="upload-content">
          <div class="upload-icon">🎨</div>
          <p>{{ $t('tools.iconSpriter.ui.uploadText') }}</p>
          <small>{{ $t('tools.iconSpriter.ui.uploadFormats') }}</small>
        </div>
      </div>
    </div>

    <div class="sprite-settings" v-if="svgIcons.length > 0">
      <div class="settings-panel">
        <h4>{{ $t('tools.iconSpriter.ui.spriteSettings') }}</h4>
        
        <div class="layout-settings">
          <div class="setting-group">
            <label>{{ $t('tools.iconSpriter.ui.layout') }}:</label>
            <select v-model="layout" class="setting-select">
              <option value="horizontal">{{ $t('tools.iconSpriter.ui.horizontal') }}</option>
              <option value="vertical">{{ $t('tools.iconSpriter.ui.vertical') }}</option>
              <option value="grid">{{ $t('tools.iconSpriter.ui.grid') }}</option>
            </select>
          </div>

          <div class="setting-group" v-if="layout === 'grid'">
            <label>{{ $t('tools.iconSpriter.ui.iconsPerRow') }}:</label>
            <input 
              type="number" 
              v-model="gridColumns" 
              min="1" 
              :max="svgIcons.length"
              class="setting-input"
            />
          </div>

          <div class="setting-group">
            <label>{{ $t('tools.iconSpriter.ui.iconSpacing') }}:</label>
            <input 
              type="number" 
              v-model="iconSpacing" 
              min="0" 
              max="50"
              class="setting-input"
            />
          </div>

          <div class="setting-group">
            <label>{{ $t('tools.iconSpriter.ui.iconSize') }}:</label>
            <input 
              type="number" 
              v-model="iconSize" 
              min="16" 
              max="128"
              class="setting-input"
            />
          </div>
        </div>

        <div class="output-settings">
          <div class="setting-group">
            <label>{{ $t('tools.iconSpriter.ui.outputFormat') }}:</label>
            <div class="format-options">
              <label class="checkbox-option">
                <input type="checkbox" v-model="generateSvg" />
                <span>{{ $t('tools.iconSpriter.ui.svgSprite') }}</span>
              </label>
              <label class="checkbox-option">
                <input type="checkbox" v-model="generateCss" />
                <span>{{ $t('tools.iconSpriter.ui.cssFile') }}</span>
              </label>
              <label class="checkbox-option">
                <input type="checkbox" v-model="generateHtml" />
                <span>{{ $t('tools.iconSpriter.ui.htmlExample') }}</span>
              </label>
            </div>
          </div>

          <div class="setting-group">
            <label>{{ $t('tools.iconSpriter.ui.cssPrefix') }}:</label>
            <input 
              type="text" 
              v-model="cssPrefix" 
              placeholder="icon-"
              class="setting-input"
            />
          </div>
        </div>

        <div class="action-buttons">
          <button @click="generateSprite" class="generate-btn" :disabled="processing">
            {{ processing ? $t('tools.iconSpriter.ui.processing') : $t('tools.iconSpriter.ui.generateSprite') }}
          </button>
          <button @click="downloadSprite" class="download-btn" v-if="spriteGenerated">
            {{ $t('tools.iconSpriter.ui.downloadSprite') }}
          </button>
          <button @click="clearAll" class="clear-btn">{{ $t('tools.iconSpriter.ui.clear') }}</button>
        </div>
      </div>
    </div>

    <div class="icons-preview" v-if="svgIcons.length > 0">
      <h4>{{ $t('tools.iconSpriter.ui.iconsPreview') }} ({{ svgIcons.length }} {{ $t('tools.iconSpriter.ui.iconCountUnit') }})</h4>
      <div class="icons-grid">
        <div 
          v-for="(icon, index) in svgIcons" 
          :key="index"
          class="icon-item"
        >
          <div class="icon-preview" v-html="icon.content"></div>
          <div class="icon-info">
            <h6>{{ icon.name }}</h6>
            <small>{{ icon.size }} {{ $t('tools.iconSpriter.ui.bytes') }}</small>
          </div>
          <button @click="removeIcon(index)" class="remove-icon-btn">×</button>
        </div>
      </div>
    </div>

    <div class="sprite-preview" v-if="spriteGenerated">
      <h4>{{ $t('tools.iconSpriter.ui.spritePreview') }}</h4>
      <div class="preview-container">
        <div class="sprite-display" v-html="spriteContent"></div>
        <div class="sprite-info">
          <p>{{ $t('tools.iconSpriter.ui.dimensions') }}: {{ spriteWidth }} × {{ spriteHeight }}</p>
          <p>{{ $t('tools.iconSpriter.ui.iconCount') }}: {{ svgIcons.length }}</p>
          <p>{{ $t('tools.iconSpriter.ui.fileSize') }}: {{ formatFileSize(spriteSize) }}</p>
        </div>
      </div>
    </div>

    <div class="css-preview" v-if="cssContent">
      <h4>{{ $t('tools.iconSpriter.ui.cssPreview') }}</h4>
      <div class="code-container">
        <pre><code>{{ cssContent }}</code></pre>
        <button @click="copyCss" class="copy-btn">{{ $t('tools.iconSpriter.ui.copyCss') }}</button>
      </div>
    </div>

    <div class="usage-guide">
      <h4>💡 {{ $t('tools.iconSpriter.ui.guideTitle') }}</h4>
      <div class="guide-content">
        <div class="guide-section">
          <h5>{{ $t('tools.iconSpriter.ui.guideStep1') }}</h5>
          <p>{{ $t('tools.iconSpriter.ui.guideStep1Desc') }}</p>
        </div>
        <div class="guide-section">
          <h5>{{ $t('tools.iconSpriter.ui.guideStep2') }}</h5>
          <p>{{ $t('tools.iconSpriter.ui.guideStep2Desc') }}</p>
        </div>
        <div class="guide-section">
          <h5>{{ $t('tools.iconSpriter.ui.guideStep3') }}</h5>
          <p>{{ $t('tools.iconSpriter.ui.guideStep3Desc') }}</p>
        </div>
        <div class="guide-section">
          <h5>{{ $t('tools.iconSpriter.ui.guideStep4') }}</h5>
          <p>{{ $t('tools.iconSpriter.ui.guideStep4Desc') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IconSpriter',
  data() {
    return {
      svgIcons: [],
      isDragOver: false,
      processing: false,
      spriteGenerated: false,
      layout: 'grid',
      gridColumns: 4,
      iconSpacing: 10,
      iconSize: 24,
      generateSvg: true,
      generateCss: true,
      generateHtml: false,
      cssPrefix: 'icon-',
      spriteContent: '',
      cssContent: '',
      htmlContent: '',
      spriteWidth: 0,
      spriteHeight: 0,
      spriteSize: 0
    }
  },
  methods: {
    handleDrop(e) {
      this.isDragOver = false
      const files = Array.from(e.dataTransfer.files).filter(file => 
        file.name.toLowerCase().endsWith('.svg')
      )
      this.processFiles(files)
    },

    handleFileSelect(e) {
      const files = Array.from(e.target.files)
      this.processFiles(files)
    },

    async processFiles(files) {
      for (const file of files) {
        await this.addSvgIcon(file)
      }
    },

    async addSvgIcon(file) {
      const content = await this.readFileAsText(file)
      const cleanedContent = this.cleanSvgContent(content)
      
      this.svgIcons.push({
        file,
        name: file.name.replace('.svg', ''),
        content: cleanedContent,
        size: file.size,
        originalContent: content
      })
    },

    readFileAsText(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target.result)
        reader.onerror = reject
        reader.readAsText(file)
      })
    },

    cleanSvgContent(svgContent) {
      // 移除 XML 声明和注释
      let cleaned = svgContent.replace(/<\?xml[^>]*\?>/, '')
      cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '')
      
      // 确保有 viewBox
      if (!cleaned.includes('viewBox')) {
        const widthMatch = cleaned.match(/width="([^"]*)"/)
        const heightMatch = cleaned.match(/height="([^"]*)"/)
        
        if (widthMatch && heightMatch) {
          const width = parseFloat(widthMatch[1])
          const height = parseFloat(heightMatch[1])
          cleaned = cleaned.replace('<svg', `<svg viewBox="0 0 ${width} ${height}"`)
        }
      }
      
      return cleaned.trim()
    },

    async generateSprite() {
      if (this.svgIcons.length === 0) return
      
      this.processing = true
      
      try {
        await this.createSpriteContent()
        this.spriteGenerated = true
      } catch (error) {
        console.error(this.$t('tools.iconSpriter.ui.generateFailed'), error)
        this.$message.success(this.$t('tools.iconSpriter.ui.generateError'))
      } finally {
        this.processing = false
      }
    },

    async createSpriteContent() {
      const { width, height, positions } = this.calculateLayout()
      
      this.spriteWidth = width
      this.spriteHeight = height
      
      // 生成 SVG 雪碧图
      let svgSprite = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">\n`
      
      this.svgIcons.forEach((icon, index) => {
        const pos = positions[index]
        const iconId = `${this.cssPrefix}${icon.name}`
        
        // 提取 SVG 内容
        const svgContent = icon.content.replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')
        
        svgSprite += `  <g id="${iconId}" transform="translate(${pos.x}, ${pos.y})">\n`
        svgSprite += `    <g transform="scale(${this.iconSize / 24})">\n`
        svgSprite += `      ${svgContent}\n`
        svgSprite += `    </g>\n`
        svgSprite += `  </g>\n`
      })
      
      svgSprite += '</svg>'
      
      this.spriteContent = svgSprite
      this.spriteSize = new Blob([svgSprite]).size
      
      // 生成 CSS
      if (this.generateCss) {
        this.createCssContent(positions)
      }
      
      // 生成 HTML
      if (this.generateHtml) {
        this.createHtmlContent()
      }
    },

    calculateLayout() {
      const iconCount = this.svgIcons.length
      let width, height, positions = []
      
      if (this.layout === 'horizontal') {
        width = iconCount * (this.iconSize + this.iconSpacing) - this.iconSpacing
        height = this.iconSize
        
        this.svgIcons.forEach((icon, index) => {
          positions.push({
            x: index * (this.iconSize + this.iconSpacing),
            y: 0
          })
        })
      } else if (this.layout === 'vertical') {
        width = this.iconSize
        height = iconCount * (this.iconSize + this.iconSpacing) - this.iconSpacing
        
        this.svgIcons.forEach((icon, index) => {
          positions.push({
            x: 0,
            y: index * (this.iconSize + this.iconSpacing)
          })
        })
      } else { // grid
        const cols = this.gridColumns
        const rows = Math.ceil(iconCount / cols)
        
        width = cols * (this.iconSize + this.iconSpacing) - this.iconSpacing
        height = rows * (this.iconSize + this.iconSpacing) - this.iconSpacing
        
        this.svgIcons.forEach((icon, index) => {
          const row = Math.floor(index / cols)
          const col = index % cols
          
          positions.push({
            x: col * (this.iconSize + this.iconSpacing),
            y: row * (this.iconSize + this.iconSpacing)
          })
        })
      }
      
      return { width, height, positions }
    },

    createCssContent(positions) {
      let css = `.${this.cssPrefix}sprite {\n`
      css += `  background-image: url('sprite.svg');\n`
      css += `  background-repeat: no-repeat;\n`
      css += `  display: inline-block;\n`
      css += `  width: ${this.iconSize}px;\n`
      css += `  height: ${this.iconSize}px;\n`
      css += `}\n\n`
      
      this.svgIcons.forEach((icon, index) => {
        const pos = positions[index]
        css += `.${this.cssPrefix}${icon.name} {\n`
        css += `  background-position: -${pos.x}px -${pos.y}px;\n`
        css += `}\n\n`
      })
      
      this.cssContent = css
    },

    createHtmlContent() {
      let html = '<!DOCTYPE html>\n<html>\n<head>\n'
      html += '  <meta charset="UTF-8">\n'
      html += '  <title>SVG Sprite Icons</title>\n'
      html += '  <link rel="stylesheet" href="sprite.css">\n'
      html += '</head>\n<body>\n'
      html += '  <h1>SVG Sprite Icons</h1>\n'
      html += '  <div class="icons-demo">\n'
      
      this.svgIcons.forEach(icon => {
        html += `    <div class="icon-item">\n`
        html += `      <span class="${this.cssPrefix}sprite ${this.cssPrefix}${icon.name}"></span>\n`
        html += `      <span class="icon-name">${icon.name}</span>\n`
        html += `    </div>\n`
      })
      
      html += '  </div>\n</body>\n</html>'
      
      this.htmlContent = html
    },

    async downloadSprite() {
      const files = []
      
      if (this.generateSvg) {
        files.push({
          name: 'sprite.svg',
          content: this.spriteContent,
          type: 'image/svg+xml'
        })
      }
      
      if (this.generateCss) {
        files.push({
          name: 'sprite.css',
          content: this.cssContent,
          type: 'text/css'
        })
      }
      
      if (this.generateHtml) {
        files.push({
          name: 'demo.html',
          content: this.htmlContent,
          type: 'text/html'
        })
      }
      
      if (files.length === 1) {
        const file = files[0]
        const blob = new Blob([file.content], { type: file.type })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = file.name
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      } else {
        try {
          const JSZip = (await import('jszip')).default
          const zip = new JSZip()

          files.forEach(file => {
            zip.file(file.name, file.content)
          })

          const zipBlob = await zip.generateAsync({ type: 'blob' })
          const url = URL.createObjectURL(zipBlob)
          const a = document.createElement('a')
          a.href = url
          a.download = 'svg-sprite.zip'
          document.body.appendChild(a)
          a.click()
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
        } catch (error) {
          this.$message.success(this.$t('tools.iconSpriter.ui.downloadFailed'))
        }
      }
    },

    copyCss() {
      navigator.clipboard.writeText(this.cssContent).then(() => {
          this.$message.success(this.$t('tools.iconSpriter.ui.cssCopied'))
      })
    },

    removeIcon(index) {
      this.svgIcons.splice(index, 1)
      this.spriteGenerated = false
    },

    clearAll() {
      this.svgIcons = []
      this.spriteGenerated = false
      this.spriteContent = ''
      this.cssContent = ''
      this.htmlContent = ''
    },

    formatFileSize(bytes) {
      if (bytes === 0) return '0 B'
      const k = 1024
      const sizes = ['B', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }
  }
}
</script>

<style scoped>
.icon-spriter-container {
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

.sprite-settings {
  margin: 30px 0;
  padding: 10px;
  background: var(--bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.settings-panel h4 {
  margin: 0 0 20px 0;
  color: var(--text-primary);
}

.layout-settings,
.output-settings {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 10px;
}

.setting-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
  color: var(--text-primary);
}

.setting-select,
.setting-input {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--bg-primary);
  color: var(--text-primary);
}

.format-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.checkbox-option {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: var(--text-primary);
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.generate-btn,
.download-btn,
.clear-btn {
  padding: 10px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.generate-btn {
  background: var(--primary-color);
  color: white;
}

.download-btn {
  background: var(--success-color);
  color: white;
}

.clear-btn {
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.icons-preview {
  margin: 30px 0;
}

.icons-preview h4 {
  margin-bottom: 10px;
  color: var(--text-primary);
}

.icons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 15px;
}

.icon-item {
  position: relative;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 10px;
  text-align: center;
}

.icon-preview {
  width: 48px;
  height: 48px;
  margin: 0 auto 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-preview svg {
  max-width: 100%;
  max-height: 100%;
}

.icon-info h6 {
  margin: 0 0 5px 0;
  color: var(--text-primary);
  font-size: 12px;
}

.icon-info small {
  color: var(--text-secondary);
  font-size: 10px;
}

.remove-icon-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  border: none;
  background: var(--danger-color);
  color: white;
  border-radius: 50%;
  cursor: pointer;
  font-size: 12px;
  line-height: 1;
}

.sprite-preview {
  margin: 30px 0;
  padding: 10px;
  background: var(--bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.sprite-preview h4 {
  margin: 0 0 15px 0;
  color: var(--text-primary);
}

.preview-container {
  display: grid;
  grid-template-columns: 1fr 200px;
  gap: 20px;
  align-items: start;
}

.sprite-display {
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 10px;
  min-height: 200px;
  overflow: auto;
}

.sprite-info {
  background: var(--bg-primary);
  border-radius: 8px;
  padding: 10px;
}

.sprite-info p {
  margin: 8px 0;
  color: var(--text-secondary);
  font-size: 14px;
}

.css-preview {
  margin: 30px 0;
}

.css-preview h4 {
  margin-bottom: 10px;
  color: var(--text-primary);
}

.code-container {
  position: relative;
  background: var(--bg-secondary);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.code-container pre {
  margin: 0;
  padding: 10px;
  overflow: auto;
  max-height: 300px;
  font-size: 14px;
  color: var(--text-primary);
}

.copy-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 10px;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.usage-guide {
  margin-top: 40px;
  padding: 10px;
  background: var(--bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.usage-guide h4 {
  margin: 0 0 20px 0;
  color: var(--text-primary);
}

.guide-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.guide-section {
  background: var(--bg-primary);
  border-radius: 8px;
  padding: 10px;
}

.guide-section h5 {
  margin: 0 0 8px 0;
  color: var(--primary-color);
}

.guide-section p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
}

@media (max-width: 768px) {
  .layout-settings,
  .output-settings {
    grid-template-columns: 1fr;
  }
  
  .preview-container {
    grid-template-columns: 1fr;
  }
  
  .guide-content {
    grid-template-columns: 1fr;
  }
  
  .icons-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }
}
/* Input 输入框统一样式 */
/* Checkbox 统一样式 */
input[type="checkbox"] {
  width: 20px;
  margin-bottom: 0px;
}
/* Checkbox 统一样式 */
input[type="checkbox"] {
  width: 20px;
  margin-bottom: 0px;
}
/* Input 和 Select 统一样式 */
input[type="text"],
input[type="number"],
input[type="email"],
input[type="password"],
input[type="url"],
input[type="search"],
input[type="tel"],
select {
  background: #fff;
}
</style>
