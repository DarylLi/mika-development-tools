<template>
  <div class="watermark-remover-container">
    <div class="tool-header">
      <h3><i class="fas fa-eraser"></i> {{ $t('tools.imageWatermarkRemover.ui.title') }}</h3>
      <p>{{ $t('tools.imageWatermarkRemover.ui.description') }}</p>
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
          <div class="upload-icon">📁</div>
          <p>{{ $t('tools.imageWatermarkRemover.ui.uploadText') }}</p>
          <small>{{ $t('tools.imageWatermarkRemover.ui.uploadFormats') }}</small>
        </div>
      </div>
    </div>

    <div class="editor-section" v-if="originalImage">
      <div class="editor-controls">
        <div class="control-group">
          <label>{{ $t('tools.imageWatermarkRemover.ui.modeLabel') }}</label>
          <div class="mode-buttons">
            <button 
              v-for="mode in modes"
              :key="mode.value"
              @click="currentMode = mode.value"
              :class="['mode-btn', { active: currentMode === mode.value }]"
            >
              <i :class="mode.icon"></i>
              {{ mode.label }}
            </button>
          </div>
        </div>

        <div class="control-group">
          <label>{{ $t('tools.imageWatermarkRemover.ui.methodLabel') }}</label>
          <select v-model="removalMethod" class="method-select">
            <option value="average">{{ $t('tools.imageWatermarkRemover.ui.methodAverage') }}</option>
            <option value="clone">{{ $t('tools.imageWatermarkRemover.ui.methodClone') }}</option>
            <option value="blur">{{ $t('tools.imageWatermarkRemover.ui.methodBlur') }}</option>
            <option value="inpaint">{{ $t('tools.imageWatermarkRemover.ui.methodInpaint') }}</option>
          </select>
        </div>

        <div class="control-group">
          <label>{{ $t('tools.imageWatermarkRemover.ui.brushSizeLabel') }}</label>
          <div class="brush-control">
            <input 
              type="range" 
              v-model="brushSize" 
              min="5" 
              max="100" 
              step="5"
              class="brush-slider"
            />
            <span class="brush-value">{{ brushSize }}px</span>
          </div>
        </div>

        <div class="control-actions">
          <button @click="clearMarks" class="action-btn clear-btn">
            <i class="fas fa-undo"></i> {{ $t('tools.imageWatermarkRemover.ui.clearMarks') }}
          </button>
          <button @click="removeWatermark" class="action-btn remove-btn" :disabled="marks.length === 0">
            <i class="fas fa-magic"></i> {{ $t('tools.imageWatermarkRemover.ui.removeWatermark') }}
          </button>
          <button @click="resetImage" class="action-btn reset-btn">
            <i class="fas fa-redo"></i> {{ $t('tools.imageWatermarkRemover.ui.reset') }}
          </button>
        </div>
      </div>

      <div class="canvas-container">
        <canvas 
          ref="canvas"
          @mousedown="startDrawing"
          @mousemove="draw"
          @mouseup="stopDrawing"
          @mouseleave="stopDrawing"
        ></canvas>
        <div class="canvas-overlay" v-if="currentMode === 'rectangle'">
          <div 
            v-for="(mark, index) in marks" 
            :key="index"
            class="mark-rectangle"
            :style="getMarkStyle(mark)"
            @click="removeMark(index)"
          ></div>
        </div>
      </div>

      <div class="result-section" v-if="processedImage">
        <div class="result-header">
          <h4>{{ $t('tools.imageWatermarkRemover.ui.result') }}</h4>
          <button @click="downloadResult" class="download-btn">
            <i class="fas fa-download"></i> {{ $t('tools.imageWatermarkRemover.ui.download') }}
          </button>
        </div>
        <div class="result-image">
          <img :src="processedImage" alt="Processed Image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'ImageWatermarkRemover',
  setup() {
    const { t } = useI18n()
    const fileInput = ref(null)
    const canvas = ref(null)
    const isDragOver = ref(false)
    const originalImage = ref(null)
    const processedImage = ref(null)
    const currentMode = ref('brush')
    const removalMethod = ref('average')
    const brushSize = ref(20)
    const marks = ref([])
    const isDrawing = ref(false)
    const currentMark = ref(null)
    const ctx = ref(null)

    const modes = [
      { value: 'brush', label: t('tools.imageWatermarkRemover.ui.modeBrush'), icon: 'fas fa-paint-brush' },
      { value: 'rectangle', label: t('tools.imageWatermarkRemover.ui.modeRectangle'), icon: 'fas fa-square' }
    ]

    const handleFileSelect = (event) => {
      const file = event.target.files[0]
      if (file && file.type.startsWith('image/')) {
        loadImage(file)
      }
    }

    const handleDrop = (event) => {
      isDragOver.value = false
      const file = event.dataTransfer.files[0]
      if (file && file.type.startsWith('image/')) {
        loadImage(file)
      }
    }

    const loadImage = (file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        originalImage.value = e.target.result
        marks.value = []
        processedImage.value = null
        nextTick(() => {
          drawImageToCanvas()
        })
      }
      reader.readAsDataURL(file)
    }

    const drawImageToCanvas = () => {
      if (!canvas.value || !originalImage.value) return
      
      const img = new Image()
      img.onload = () => {
        canvas.value.width = img.width
        canvas.value.height = img.height
        ctx.value = canvas.value.getContext('2d')
        ctx.value.drawImage(img, 0, 0)
      }
      img.src = originalImage.value
    }

    const startDrawing = (event) => {
      if (!ctx.value) return
      
      const rect = canvas.value.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const scaleX = canvas.value.width / rect.width
      const scaleY = canvas.value.height / rect.height
      const actualX = x * scaleX
      const actualY = y * scaleY

      isDrawing.value = true

      if (currentMode.value === 'brush') {
        ctx.value.beginPath()
        ctx.value.moveTo(actualX, actualY)
        ctx.value.lineWidth = brushSize.value
        ctx.value.lineCap = 'round'
        ctx.value.strokeStyle = 'rgba(255, 0, 0, 0.5)'
      } else if (currentMode.value === 'rectangle') {
        currentMark.value = {
          x: actualX,
          y: actualY,
          width: 0,
          height: 0
        }
      }
    }

    const draw = (event) => {
      if (!isDrawing.value || !ctx.value) return

      const rect = canvas.value.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const scaleX = canvas.value.width / rect.width
      const scaleY = canvas.value.height / rect.height
      const actualX = x * scaleX
      const actualY = y * scaleY

      if (currentMode.value === 'brush') {
        ctx.value.lineTo(actualX, actualY)
        ctx.value.stroke()
      } else if (currentMode.value === 'rectangle' && currentMark.value) {
        currentMark.value.width = actualX - currentMark.value.x
        currentMark.value.height = actualY - currentMark.value.y
      }
    }

    const stopDrawing = () => {
      if (!isDrawing.value) return
      
      isDrawing.value = false

      if (currentMode.value === 'rectangle' && currentMark.value) {
        const mark = {
          x: Math.min(currentMark.value.x, currentMark.value.x + currentMark.value.width),
          y: Math.min(currentMark.value.y, currentMark.value.y + currentMark.value.height),
          width: Math.abs(currentMark.value.width),
          height: Math.abs(currentMark.value.height)
        }
        if (mark.width > 5 && mark.height > 5) {
          marks.value.push(mark)
        }
        currentMark.value = null
        drawImageToCanvas()
      }
    }

    const getMarkStyle = (mark) => {
      if (!canvas.value) return {}
      const rect = canvas.value.getBoundingClientRect()
      const scaleX = rect.width / canvas.value.width
      const scaleY = rect.height / canvas.value.height
      return {
        left: (mark.x * scaleX) + 'px',
        top: (mark.y * scaleY) + 'px',
        width: (mark.width * scaleX) + 'px',
        height: (mark.height * scaleY) + 'px'
      }
    }

    const removeMark = (index) => {
      marks.value.splice(index, 1)
    }

    const clearMarks = () => {
      marks.value = []
      drawImageToCanvas()
    }

    const resetImage = () => {
      marks.value = []
      processedImage.value = null
      drawImageToCanvas()
    }

    const removeWatermark = () => {
      if (!ctx.value || !originalImage.value) return

      const img = new Image()
      img.onload = () => {
        const tempCanvas = document.createElement('canvas')
        tempCanvas.width = img.width
        tempCanvas.height = img.height
        const tempCtx = tempCanvas.getContext('2d')
        tempCtx.drawImage(img, 0, 0)

        // 获取图像数据
        const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height)
        const data = imageData.data

        // 处理标记区域
        if (currentMode.value === 'rectangle') {
          marks.value.forEach(mark => {
            processRectangle(data, tempCanvas.width, tempCanvas.height, mark)
          })
        } else {
          // 对于画笔模式，需要从canvas获取标记区域
          processBrushMarks(data, tempCanvas.width, tempCanvas.height)
        }

        tempCtx.putImageData(imageData, 0, 0)
        processedImage.value = tempCanvas.toDataURL('image/png')
      }
      img.src = originalImage.value
    }

    const processRectangle = (data, width, height, mark) => {
      const x1 = Math.max(0, Math.floor(mark.x))
      const y1 = Math.max(0, Math.floor(mark.y))
      const x2 = Math.min(width, Math.floor(mark.x + mark.width))
      const y2 = Math.min(height, Math.floor(mark.y + mark.height))

      for (let y = y1; y < y2; y++) {
        for (let x = x1; x < x2; x++) {
          const index = (y * width + x) * 4
          processPixel(data, width, height, x, y, index)
        }
      }
    }

    const processBrushMarks = (data, width, height) => {
      // 从原始canvas获取红色标记区域
      if (!ctx.value || !canvas.value) return
      
      const originalData = ctx.value.getImageData(0, 0, canvas.value.width, canvas.value.height)
      const originalPixels = originalData.data
      const canvasWidth = canvas.value.width
      const canvasHeight = canvas.value.height

      // 如果canvas尺寸与目标尺寸不同，需要缩放坐标
      const scaleX = width / canvasWidth
      const scaleY = height / canvasHeight

      for (let i = 0; i < originalPixels.length; i += 4) {
        // 检查是否是红色标记（水印区域，半透明红色）
        const r = originalPixels[i]
        const g = originalPixels[i + 1]
        const b = originalPixels[i + 2]
        const a = originalPixels[i + 3]
        
        // 检测红色标记（红色值高，绿色和蓝色值低，且不是原始图片的像素）
        if (r > 200 && g < 100 && b < 100 && a > 100) {
          const pixelIndex = Math.floor(i / 4)
          const canvasX = pixelIndex % canvasWidth
          const canvasY = Math.floor(pixelIndex / canvasWidth)
          
          // 缩放到目标尺寸
          const targetX = Math.floor(canvasX * scaleX)
          const targetY = Math.floor(canvasY * scaleY)
          
          if (targetX >= 0 && targetX < width && targetY >= 0 && targetY < height) {
            const targetIndex = (targetY * width + targetX) * 4
            processPixel(data, width, height, targetX, targetY, targetIndex)
          }
        }
      }
    }

    const processPixel = (data, width, height, x, y, index) => {
      switch (removalMethod.value) {
        case 'average':
          // 使用周围像素的平均值
          const avg = getAverageColor(data, width, height, x, y, 5)
          data[index] = avg.r
          data[index + 1] = avg.g
          data[index + 2] = avg.b
          break
        case 'clone':
          // 克隆附近区域
          const clone = getCloneColor(data, width, height, x, y)
          data[index] = clone.r
          data[index + 1] = clone.g
          data[index + 2] = clone.b
          break
        case 'blur':
          // 模糊处理
          const blur = getBlurColor(data, width, height, x, y, 3)
          data[index] = blur.r
          data[index + 1] = blur.g
          data[index + 2] = blur.b
          break
        case 'inpaint':
          // 简单的修复算法
          const inpaint = getInpaintColor(data, width, height, x, y)
          data[index] = inpaint.r
          data[index + 1] = inpaint.g
          data[index + 2] = inpaint.b
          break
      }
    }

    const getAverageColor = (data, width, height, x, y, radius) => {
      let r = 0, g = 0, b = 0, count = 0
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const nx = x + dx
          const ny = y + dy
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist <= radius && dist > 0) {
              const idx = (ny * width + nx) * 4
              r += data[idx]
              g += data[idx + 1]
              b += data[idx + 2]
              count++
            }
          }
        }
      }
      return count > 0 ? { r: r / count, g: g / count, b: b / count } : { r: 0, g: 0, b: 0 }
    }

    const getCloneColor = (data, width, height, x, y) => {
      // 从上方或左侧克隆
      const offset = 10
      let nx = x - offset
      let ny = y
      if (nx < 0) {
        nx = x + offset
      }
      if (nx >= width) {
        nx = x
        ny = y - offset
      }
      if (ny < 0) {
        ny = y + offset
      }
      if (ny >= height) {
        ny = y
      }
      const idx = (ny * width + nx) * 4
      return { r: data[idx], g: data[idx + 1], b: data[idx + 2] }
    }

    const getBlurColor = (data, width, height, x, y, radius) => {
      return getAverageColor(data, width, height, x, y, radius)
    }

    const getInpaintColor = (data, width, height, x, y) => {
      // 简单的修复：使用周围非标记区域的平均值
      return getAverageColor(data, width, height, x, y, 8)
    }

    const downloadResult = () => {
      if (!processedImage.value) return
      
      const link = document.createElement('a')
      link.download = 'watermark-removed.png'
      link.href = processedImage.value
      link.click()
    }

    watch(originalImage, () => {
      if (originalImage.value) {
        nextTick(() => {
          drawImageToCanvas()
        })
      }
    })

    onMounted(() => {
      if (originalImage.value) {
        drawImageToCanvas()
      }
    })

    return {
      fileInput,
      canvas,
      isDragOver,
      originalImage,
      processedImage,
      currentMode,
      removalMethod,
      brushSize,
      marks,
      modes,
      handleFileSelect,
      handleDrop,
      startDrawing,
      draw,
      stopDrawing,
      getMarkStyle,
      removeMark,
      clearMarks,
      resetImage,
      removeWatermark,
      downloadResult
    }
  }
}
</script>

<style scoped>
.watermark-remover-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.tool-header {
  text-align: center;
  margin-bottom: 30px;
}

.tool-header h3 {
  font-size: 24px;
  margin-bottom: 10px;
  color: var(--text-primary);
}

.upload-section {
  margin-bottom: 30px;
}

.upload-area {
  border: 2px dashed var(--border-color);
  border-radius: 12px;
  padding: 60px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  background: var(--bg-secondary);
}

.upload-area:hover,
.upload-area.dragover {
  border-color: var(--accent-color);
  background: var(--bg-primary);
}

.upload-icon {
  font-size: 48px;
  margin-bottom: 15px;
}

.editor-section {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 20px;
}

.editor-controls {
  background: var(--bg-secondary);
  padding: 20px;
  border-radius: 12px;
  height: fit-content;
  position: sticky;
  top: 20px;
}

.control-group {
  margin-bottom: 20px;
}

.control-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: 500;
  color: var(--text-primary);
}

.mode-buttons {
  display: flex;
  gap: 10px;
  flex-direction: column;
}

.mode-btn {
  padding: 12px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-primary);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.mode-btn:hover {
  border-color: var(--accent-color);
}

.mode-btn.active {
  background: var(--accent-color);
  border-color: var(--accent-color);
  color: white;
}

.method-select {
  width: 100%;
  padding: 10px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 14px;
}

.brush-control {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brush-slider {
  flex: 1;
}

.brush-value {
  min-width: 50px;
  text-align: right;
  color: var(--text-secondary);
}

.control-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.action-btn {
  padding: 12px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.clear-btn {
  background: #6c757d;
  color: white;
}

.clear-btn:hover {
  background: #5a6268;
}

.remove-btn {
  background: var(--accent-color);
  color: white;
}

.remove-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.remove-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.reset-btn {
  background: #dc3545;
  color: white;
}

.reset-btn:hover {
  background: #c82333;
}

.canvas-container {
  position: relative;
  background: #f0f0f0;
  border-radius: 12px;
  overflow: auto;
  max-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

canvas {
  max-width: 100%;
  max-height: 100%;
  cursor: crosshair;
  border: 1px solid var(--border-color);
  border-radius: 8px;
}

.canvas-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.mark-rectangle {
  position: absolute;
  border: 2px dashed #ff0000;
  background: rgba(255, 0, 0, 0.1);
  pointer-events: all;
  cursor: pointer;
}

.mark-rectangle:hover {
  background: rgba(255, 0, 0, 0.2);
}

.result-section {
  grid-column: 1 / -1;
  margin-top: 20px;
  background: var(--bg-secondary);
  padding: 20px;
  border-radius: 12px;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.result-header h4 {
  color: var(--text-primary);
  margin: 0;
}

.download-btn {
  padding: 10px 20px;
  background: var(--accent-color);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;
}

.download-btn:hover {
  opacity: 0.9;
}

.result-image {
  text-align: center;
}

.result-image img {
  max-width: 100%;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

@media (max-width: 1024px) {
  .editor-section {
    grid-template-columns: 1fr;
  }

  .editor-controls {
    position: static;
  }
}
</style>

