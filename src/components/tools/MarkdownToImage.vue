<template>
  <div class="tool-card">
    <!-- 渐变色头部 -->
    <div class="tool-header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
      <div class="tool-icon">
        <i class="fab fa-markdown"></i>
      </div>
      <div class="tool-title">
        <h2>{{ $t('tools.markdownToImage.ui.title') }}</h2>
        <p>{{ $t('tools.markdownToImage.ui.description') }}</p>
      </div>
    </div>

    <!-- 示例按钮 -->
    <div class="example-section" style="display: flex;justify-content: space-between;width: 520px;">
      <button @click="loadExample" class="example-btn">
        <i class="fas fa-magic"></i> {{ $t('tools.markdownToImage.ui.loadExample') }}
      </button>
      <button @click="loadTemplate('readme')" class="example-btn">
        <i class="fas fa-file"></i> {{ $t('tools.markdownToImage.ui.readmeTemplate') }}
      </button>
      <button @click="loadTemplate('blog')" class="example-btn">
        <i class="fas fa-blog"></i> {{ $t('tools.markdownToImage.ui.blogTemplate') }}
      </button>
    </div>

    <!-- Markdown输入区域 -->
    <div class="input-section">
      <h3><i class="fab fa-markdown"></i> {{ $t('tools.markdownToImage.ui.markdownContent') }}</h3>
      <div class="editor-container">
        <div class="editor-toolbar">
          <button @click="insertText('# ')" class="toolbar-btn" :title="$t('tools.markdownToImage.ui.toolbarHeading')">
            <i class="fas fa-heading"></i>
          </button>
          <button @click="insertText('**', '**')" class="toolbar-btn" :title="$t('tools.markdownToImage.ui.toolbarBold')">
            <i class="fas fa-bold"></i>
          </button>
          <button @click="insertText('*', '*')" class="toolbar-btn" :title="$t('tools.markdownToImage.ui.toolbarItalic')">
            <i class="fas fa-italic"></i>
          </button>
          <button @click="insertText('`', '`')" class="toolbar-btn" :title="$t('tools.markdownToImage.ui.toolbarCode')">
            <i class="fas fa-code"></i>
          </button>
          <button @click="insertText('- ')" class="toolbar-btn" :title="$t('tools.markdownToImage.ui.toolbarList')">
            <i class="fas fa-list"></i>
          </button>
          <button @click="insertText('[', ']()')" class="toolbar-btn" :title="$t('tools.markdownToImage.ui.toolbarLink')">
            <i class="fas fa-link"></i>
          </button>
          <button @click="insertText('![', ']()')" class="toolbar-btn" :title="$t('tools.markdownToImage.ui.toolbarImage')">
            <i class="fas fa-image"></i>
          </button>
          <button @click="insertText('```\n', '\n```')" class="toolbar-btn" :title="$t('tools.markdownToImage.ui.toolbarCodeBlock')">
            <i class="fas fa-code"></i>
          </button>
        </div>
        <textarea 
          ref="markdownInput"
          v-model="markdownContent" 
          :placeholder="$t('tools.markdownToImage.ui.placeholder')"
          rows="15"
          @input="updatePreview"
        ></textarea>
      </div>
    </div>

    <!-- 预览区域 -->
    <div class="preview-section">
      <h3><i class="fas fa-eye"></i> {{ $t('tools.markdownToImage.ui.realtimePreview') }}</h3>
      <div class="preview-container" ref="previewContainer">
        <div class="markdown-preview" v-html="renderedMarkdown"></div>
      </div>
    </div>

    <!-- 图片设置 -->
    <div class="settings-section">
      <h3><i class="fas fa-cog"></i> {{ $t('tools.markdownToImage.ui.imageSettings') }}</h3>
      <div class="settings-grid">
        <div class="form-group">
          <label>{{ $t('tools.markdownToImage.ui.outputFormat') }}</label>
          <select v-model="imageSettings.format">
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
            <option value="webp">WebP</option>
          </select>
        </div>

        <div class="form-group">
          <label>{{ $t('tools.markdownToImage.ui.imageWidth') }}</label>
          <input v-model.number="imageSettings.width" type="number" min="300" max="2000" step="50">
        </div>

        <div class="form-group">
          <label>{{ $t('tools.markdownToImage.ui.scale') }}</label>
          <select v-model="imageSettings.scale">
            <option value="1">{{ $t('tools.markdownToImage.ui.scale1x') }}</option>
            <option value="2">{{ $t('tools.markdownToImage.ui.scale2x') }}</option>
            <option value="3">{{ $t('tools.markdownToImage.ui.scale3x') }}</option>
          </select>
        </div>

        <div class="form-group">
          <label>{{ $t('tools.markdownToImage.ui.backgroundColor') }}</label>
          <div class="color-input-group">
            <input v-model="imageSettings.backgroundColor" type="color">
            <input v-model="imageSettings.backgroundColor" type="text" placeholder="#ffffff">
          </div>
        </div>

        <div class="form-group">
          <label>{{ $t('tools.markdownToImage.ui.padding') }}</label>
          <input v-model.number="imageSettings.padding" type="number" min="0" max="100" step="5">
        </div>

        <div class="form-group">
          <label>{{ $t('tools.markdownToImage.ui.theme') }}</label>
          <select v-model="imageSettings.theme" @change="updatePreview">
            <option value="github">GitHub</option>
            <option value="github-dark">GitHub Dark</option>
            <option value="material">Material</option>
            <option value="minimal">Minimal</option>
            <option value="academic">Academic</option>
          </select>
        </div>
      </div>

      <!-- 高级选项 -->
      <div class="advanced-options">
        <h4><i class="fas fa-sliders-h"></i> {{ $t('tools.markdownToImage.ui.advancedOptions') }}</h4>
        <div class="checkbox-group">
          <label>
            <input type="checkbox" v-model="imageSettings.enableSyntaxHighlight">
            <span>{{ $t('tools.markdownToImage.ui.syntaxHighlight') }}</span>
          </label>
          <label>
            <input type="checkbox" v-model="imageSettings.enableMath">
            <span>{{ $t('tools.markdownToImage.ui.mathSupport') }}</span>
          </label>
          <label>
            <input type="checkbox" v-model="imageSettings.enableMermaid">
            <span>{{ $t('tools.markdownToImage.ui.mermaidCharts') }}</span>
          </label>
          <label>
            <input type="checkbox" v-model="imageSettings.autoWidth">
            <span>{{ $t('tools.markdownToImage.ui.autoWidth') }}</span>
          </label>
        </div>
      </div>

      <!-- 生成按钮 -->
      <button @click="generateImage" class="generate-btn" :disabled="generating || !markdownContent.trim()">
        <i class="fas fa-image"></i>
        {{ generating ? $t('tools.markdownToImage.ui.generating') : $t('tools.markdownToImage.ui.generateImage') }}
      </button>
    </div>

    <!-- 生成进度 -->
    <div v-if="generating" class="progress-section">
      <h3><i class="fas fa-spinner fa-spin"></i> {{ $t('tools.markdownToImage.ui.generationProgress') }}</h3>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progress + '%' }"></div>
      </div>
      <p class="progress-text">{{ progressText }}</p>
    </div>

    <!-- 结果展示 -->
    <div v-if="generatedImage" class="result-section">
      <h3><i class="fas fa-image"></i> {{ $t('tools.markdownToImage.ui.generationResult') }}</h3>
      
      <div class="image-result">
        <div class="image-container">
          <img :src="generatedImage.dataUrl" alt="Generated Markdown Image" class="result-image">
          <div class="image-overlay">
            <div class="image-info">
              <span class="image-size">{{ generatedImage.width }} × {{ generatedImage.height }}</span>
              <span class="image-format">{{ imageSettings.format.toUpperCase() }}</span>
              <span class="file-size">{{ formatFileSize(generatedImage.size) }}</span>
            </div>
          </div>
        </div>
        
        <div class="image-actions">
          <button @click="downloadImage" class="action-btn">
            <i class="fas fa-download"></i> {{ $t('tools.markdownToImage.ui.downloadImage') }}
          </button>
          <button @click="copyImageToClipboard" class="action-btn">
            <i class="fas fa-copy"></i> {{ $t('tools.markdownToImage.ui.copyImage') }}
          </button>
          <button @click="copyDataUrl" class="action-btn">
            <i class="fas fa-link"></i> {{ $t('tools.markdownToImage.ui.copyLink') }}
          </button>
          <button @click="openInNewTab" class="action-btn">
            <i class="fas fa-external-link-alt"></i> {{ $t('tools.markdownToImage.ui.openInNewTab') }}
          </button>
        </div>
      </div>
    </div>

    <!-- 错误提示 -->
    <div v-if="errorMessage" class="error-message">
      <i class="fas fa-exclamation-triangle"></i>
      {{ errorMessage }}
    </div>

    <!-- 使用说明 -->
    <div class="help-section">
      <h3><i class="fas fa-question-circle"></i> {{ $t('tools.markdownToImage.ui.usageInstructions') }}</h3>
      <ul>
        <li><strong>{{ $t('tools.markdownToImage.ui.markdownSyntax').split('：')[0] }}：</strong>{{ $t('tools.markdownToImage.ui.markdownSyntax').split('：')[1] }}</li>
        <li><strong>{{ $t('tools.markdownToImage.ui.codeHighlight').split('：')[0] }}：</strong>{{ $t('tools.markdownToImage.ui.codeHighlight').split('：')[1] }}</li>
        <li><strong>{{ $t('tools.markdownToImage.ui.mathFormulas').split('：')[0] }}：</strong>{{ $t('tools.markdownToImage.ui.mathFormulas').split('：')[1] }}</li>
        <li><strong>{{ $t('tools.markdownToImage.ui.chartSupport').split('：')[0] }}：</strong>{{ $t('tools.markdownToImage.ui.chartSupport').split('：')[1] }}</li>
        <li><strong>{{ $t('tools.markdownToImage.ui.highResolution').split('：')[0] }}：</strong>{{ $t('tools.markdownToImage.ui.highResolution').split('：')[1] }}</li>
        <li><strong>{{ $t('tools.markdownToImage.ui.multipleThemes').split('：')[0] }}：</strong>{{ $t('tools.markdownToImage.ui.multipleThemes').split('：')[1] }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, reactive, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import messageService from '../../utils/message.js'

export default {
  name: 'MarkdownToImage',
  setup() {
    const { t } = useI18n()
    // 响应式数据
    const markdownInput = ref(null)
    const previewContainer = ref(null)
    const markdownContent = ref('')
    const renderedMarkdown = ref('')
    const generating = ref(false)
    const progress = ref(0)
    const progressText = ref('')
    const generatedImage = ref(null)
    const errorMessage = ref('')

    // 图片设置
    const imageSettings = reactive({
      format: 'png',
      width: 800,
      scale: 2,
      backgroundColor: '#ffffff',
      padding: 20,
      theme: 'github',
      enableSyntaxHighlight: true,
      enableMath: false,
      enableMermaid: false,
      autoWidth: false
    })

    // 主题样式
    const themes = {
      github: {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
        fontSize: '16px',
        lineHeight: '1.5',
        color: '#24292e',
        backgroundColor: '#ffffff'
      },
      'github-dark': {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
        fontSize: '16px',
        lineHeight: '1.5',
        color: '#e1e4e8',
        backgroundColor: '#0d1117'
      },
      material: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '16px',
        lineHeight: '1.6',
        color: '#212121',
        backgroundColor: '#fafafa'
      },
      minimal: {
        fontFamily: 'Georgia, serif',
        fontSize: '18px',
        lineHeight: '1.7',
        color: '#333',
        backgroundColor: '#fff'
      },
      academic: {
        fontFamily: 'Times New Roman, serif',
        fontSize: '16px',
        lineHeight: '1.6',
        color: '#000',
        backgroundColor: '#fff'
      }
    }

    // 格式化文件大小
    const formatFileSize = (bytes) => {
      if (bytes === 0) return '0 Bytes'
      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }

    // 插入文本
    const insertText = (before, after = '') => {
      const textarea = markdownInput.value
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const selectedText = markdownContent.value.substring(start, end)
      
      const newText = before + selectedText + after
      markdownContent.value = markdownContent.value.substring(0, start) + newText + markdownContent.value.substring(end)
      
      nextTick(() => {
        textarea.focus()
        textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
      })
      
      updatePreview()
    }

    // 更新预览
    const updatePreview = () => {
      // 简单的Markdown渲染（实际项目中建议使用marked或其他Markdown库）
      let html = markdownContent.value
        // 标题
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        // 粗体和斜体
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        // 行内代码
        .replace(/`(.*?)`/gim, '<code>$1</code>')
        // 链接
        .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
        // 图片
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/gim, '<img src="$2" alt="$1">')
        // 列表
        .replace(/^\- (.*$)/gim, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
        // 代码块
        .replace(/```(\w+)?\n([\s\S]*?)```/gim, '<pre><code class="language-$1">$2</code></pre>')
        // 段落
        .replace(/\n\n/gim, '</p><p>')
        .replace(/^/, '<p>')
        .replace(/$/, '</p>')

      renderedMarkdown.value = html
    }

    // 加载示例
    const loadExample = () => {
      markdownContent.value = `# Markdown转图片示例

这是一个**Markdown转图片工具**的演示文档。

## 功能特性

- 支持标准Markdown语法
- 多种主题样式选择
- 高分辨率输出
- 代码语法高亮
- 数学公式支持

## 代码示例

\`\`\`javascript
function hello() {
    console.log("Hello, World!");
}
\`\`\`

## 表格示例

| 功能 | 支持程度 | 说明 |
|------|----------|------|
| 标题 | ✅ 完全支持 | 支持1-6级标题 |
| 列表 | ✅ 完全支持 | 有序和无序列表 |
| 代码 | ✅ 完全支持 | 行内和块级代码 |

## 结语

这个工具可以将任何Markdown文档转换为高质量的图片，适合制作海报、分享到社交媒体或保存为图片格式。

> 💡 **提示**: 您可以调整右侧的设置来自定义输出图片的样式和格式。`

      updatePreview()
    }

    // 加载模板
    const loadTemplate = (type) => {
      const templates = {
        readme: `# 项目名称

简短的项目描述。

## 安装

\`\`\`bash
npm install project-name
\`\`\`

## 使用方法

\`\`\`javascript
const project = require('project-name');
project.init();
\`\`\`

## 功能特性

- ✅ 特性一
- ✅ 特性二  
- 🔄 开发中的特性

## 贡献

欢迎提交Pull Request！

## 许可证

MIT License`,

        blog: `# 博客文章标题

*发布日期: ${new Date().toLocaleDateString('zh-CN')}*

## 引言

这里是文章的引言部分，简要介绍文章的主要内容。

## 主要内容

### 小节标题

这里是正文内容。您可以使用**粗体**、*斜体*等格式。

> 这是一个引用块，用于突出重要信息。

### 代码示例

\`\`\`python
def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()
\`\`\`

## 总结

文章的总结部分。

---

*感谢阅读！如果觉得有用，请点赞和分享。*`
      }

      markdownContent.value = templates[type] || templates.readme
      updatePreview()
    }

    // 生成图片
    const generateImage = async () => {
      if (!markdownContent.value.trim()) {
        errorMessage.value = t('tools.markdownToImage.ui.enterMarkdownContent')
        return
      }

      generating.value = true
      progress.value = 0
      progressText.value = t('tools.markdownToImage.ui.preparingRender')
      errorMessage.value = ''

      try {
        await simulateGeneration()
        await createImageFromHtml()
        
        progressText.value = t('tools.markdownToImage.ui.generationComplete')
        progress.value = 100

      } catch (error) {
        errorMessage.value = t('tools.markdownToImage.ui.imageGenerationFailed') + error.message
      } finally {
        generating.value = false
      }
    }

    // 模拟生成过程
    const simulateGeneration = () => {
      return new Promise((resolve) => {
        const steps = [
          { progress: 20, text: t('tools.markdownToImage.ui.parsingMarkdown') },
          { progress: 40, text: t('tools.markdownToImage.ui.applyingTheme') },
          { progress: 60, text: t('tools.markdownToImage.ui.renderingHtml') },
          { progress: 80, text: t('tools.markdownToImage.ui.generatingImage') },
          { progress: 100, text: t('tools.markdownToImage.ui.processingComplete') }
        ]

        let currentStep = 0
        const interval = setInterval(() => {
          if (currentStep < steps.length) {
            progress.value = steps[currentStep].progress
            progressText.value = steps[currentStep].text
            currentStep++
          } else {
            clearInterval(interval)
            resolve()
          }
        }, 600)
      })
    }

    // 从HTML创建图片
    const createImageFromHtml = async () => {
      // 创建画布
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      // 设置画布尺寸
      const width = imageSettings.autoWidth ? 'auto' : imageSettings.width
      const height = 'auto'
      const scale = imageSettings.scale
      
      canvas.width = (typeof width === 'number' ? width : 800) * scale
      canvas.height = 600 * scale // 临时高度，后续会调整
      
      // 设置背景
      ctx.fillStyle = imageSettings.backgroundColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // 设置字体和颜色
      const theme = themes[imageSettings.theme]
      ctx.fillStyle = theme.color
      ctx.font = `${parseInt(theme.fontSize) * scale}px ${theme.fontFamily}`
      
      // 简单的文本渲染（实际实现需要更复杂的HTML到Canvas转换）
      const text = markdownContent.value
      const lines = text.split('\n')
      let y = imageSettings.padding * scale
      
      lines.forEach(line => {
        if (line.trim()) {
          // 简单处理不同类型的文本
          if (line.startsWith('#')) {
            ctx.font = `bold ${(parseInt(theme.fontSize) + 8) * scale}px ${theme.fontFamily}`
            ctx.fillText(line.replace(/^#+\s*/, ''), imageSettings.padding * scale, y)
            ctx.font = `${parseInt(theme.fontSize) * scale}px ${theme.fontFamily}`
          } else {
            ctx.fillText(line, imageSettings.padding * scale, y)
          }
          y += parseInt(theme.lineHeight) * parseInt(theme.fontSize) * scale
        }
      })
      
      // 调整画布高度
      canvas.height = y + imageSettings.padding * scale
      
      // 重新绘制（因为改变高度会清空画布）
      ctx.fillStyle = imageSettings.backgroundColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = theme.color
      ctx.font = `${parseInt(theme.fontSize) * scale}px ${theme.fontFamily}`
      
      y = imageSettings.padding * scale
      lines.forEach(line => {
        if (line.trim()) {
          if (line.startsWith('#')) {
            ctx.font = `bold ${(parseInt(theme.fontSize) + 8) * scale}px ${theme.fontFamily}`
            ctx.fillText(line.replace(/^#+\s*/, ''), imageSettings.padding * scale, y)
            ctx.font = `${parseInt(theme.fontSize) * scale}px ${theme.fontFamily}`
          } else {
            ctx.fillText(line, imageSettings.padding * scale, y)
          }
          y += parseInt(theme.lineHeight) * parseInt(theme.fontSize) * scale
        }
      })
      
      // 转换为图片
      const dataUrl = canvas.toDataURL(`image/${imageSettings.format}`, 0.9)
      
      // 计算文件大小（估算）
      const base64Length = dataUrl.split(',')[1].length
      const sizeInBytes = Math.round(base64Length * 0.75)
      
      generatedImage.value = {
        dataUrl,
        width: canvas.width,
        height: canvas.height,
        size: sizeInBytes
      }
    }

    // 下载图片
    const downloadImage = () => {
      if (!generatedImage.value) return

      const link = document.createElement('a')
      link.download = `markdown-image-${Date.now()}.${imageSettings.format}`
      link.href = generatedImage.value.dataUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    // 复制图片到剪贴板
    const copyImageToClipboard = async () => {
      try {
        const response = await fetch(generatedImage.value.dataUrl)
        const blob = await response.blob()
        await navigator.clipboard.write([
          new ClipboardItem({ [blob.type]: blob })
        ])
        messageService.success(t('common.copied'))
      } catch (error) {
        messageService.error(t('common.error'))
      }
    }

    // 复制图片链接
    const copyDataUrl = async () => {
      try {
        await navigator.clipboard.writeText(generatedImage.value.dataUrl)
        messageService.success(t('common.copied'))
      } catch (error) {
        messageService.error(t('common.error'))
      }
    }

    // 新窗口查看
    const openInNewTab = () => {
      const newWindow = window.open()
      newWindow.document.write(`
        <html>
          <head><title>Markdown Image</title></head>
          <body style="margin:0;padding:20px;text-align:center;">
            <img src="${generatedImage.value.dataUrl}" style="max-width:100%;height:auto;">
          </body>
        </html>
      `)
    }

    return {
      markdownInput,
      previewContainer,
      markdownContent,
      renderedMarkdown,
      generating,
      progress,
      progressText,
      generatedImage,
      errorMessage,
      imageSettings,
      formatFileSize,
      insertText,
      updatePreview,
      loadExample,
      loadTemplate,
      generateImage,
      downloadImage,
      copyImageToClipboard,
      copyDataUrl,
      openInNewTab
    }
  }
}
</script>

<style scoped>
.input-section, .preview-section, .settings-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.editor-container {
  position: relative;
}

.editor-toolbar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 10px;
  padding: 0.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  flex-wrap: wrap;
}

.toolbar-btn {
  background: linear-gradient(45deg, #6c757d, #495057);
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  min-width: 40px;
}

.toolbar-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(108, 117, 125, 0.3);
}

.editor-container textarea {
  width: 100%;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 10px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.5;
  resize: vertical;
}

.preview-container {
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 1.5rem;
  background: white;
  min-height: 300px;
  max-height: 500px;
  overflow-y: auto;
}

.markdown-preview {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  line-height: 1.6;
}

.markdown-preview h1, .markdown-preview h2, .markdown-preview h3 {
  color: #2c3e50;
  margin-top: 1.5rem;
  margin-bottom: 10px;
}

.markdown-preview code {
  background: #f8f9fa;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
}

.markdown-preview pre {
  background: #f8f9fa;
  padding: 10px;
  border-radius: 8px;
  overflow-x: auto;
}

.settings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.color-input-group {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.color-input-group input[type="color"] {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.color-input-group input[type="text"] {
  flex: 1;
}

.advanced-options {
  background: white;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.checkbox-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.generate-btn {
  background: linear-gradient(45deg, #007bff, #6610f2);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  width: 100%;
}

.generate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
}

.generate-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.progress-section {
  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.progress-bar {
  width: 100%;
  height: 20px;
  background: #e9ecef;
  border-radius: 10px;
  overflow: hidden;
  margin: 1rem 0;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(45deg, #28a745, #20c997);
  transition: width 0.3s ease;
}

.progress-text {
  text-align: center;
  color: #495057;
  font-weight: 500;
}

.result-section {
  background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.image-result {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.image-container {
  position: relative;
  background: white;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.result-image {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.image-overlay {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0,0,0,0.8);
  color: white;
  padding: 0.5rem;
  border-radius: 6px;
  font-size: 0.8rem;
}

.image-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.image-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.action-btn {
  background: linear-gradient(45deg, #28a745, #20c997);
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.action-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(40, 167, 69, 0.3);
}

.error-message {
  background: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 8px;
  margin: 1rem 0;
  border: 1px solid #f5c6cb;
}

.help-section {
  background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 1.5rem;
}

.help-section ul {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
}

.help-section li {
  margin-bottom: 0.8rem;
  padding-left: 1.5rem;
  position: relative;
}

.help-section li::before {
  content: '•';
  color: #667eea;
  font-weight: bold;
  position: absolute;
  left: 0;
}

@media (max-width: 768px) {
  .settings-grid, .checkbox-group {
    grid-template-columns: 1fr;
  }
  
  .editor-toolbar {
    justify-content: center;
  }
  
  .image-actions {
    flex-direction: column;
  }
  
  .image-result {
    align-items: center;
  }
}

/* 工具头部样式 */
.tool-header {
  padding: 10px;
  margin-bottom: 10px;
}
</style> 