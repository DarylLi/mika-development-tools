<template>
  <div class="tool-container">
    <div class="tool-header">
      <div class="header-icon">📈</div>
      <h2>{{ $t('tools.jsonPlot.ui.title') }}</h2>
      <p>{{ $t('tools.jsonPlot.ui.description') }}</p>
      
      <div class="example-section">
        <span class="example-label">{{ $t('tools.jsonPlot.ui.quickStart') }}</span>
        <button @click="loadExample('line')" class="example-btn">
          <i class="fas fa-chart-line"></i> {{ $t('tools.jsonPlot.ui.lineChartExample') }}
        </button>
        <button @click="loadExample('bar')" class="example-btn">
          <i class="fas fa-chart-bar"></i> {{ $t('tools.jsonPlot.ui.barChartExample') }}
        </button>
        <button @click="loadExample('pie')" class="example-btn">
          <i class="fas fa-chart-pie"></i> {{ $t('tools.jsonPlot.ui.pieChartExample') }}
        </button>
      </div>
    </div>

    <div class="input-card">
      <div class="card-header">
        <h3><i class="fas fa-code"></i> {{ $t('tools.jsonPlot.ui.jsonDataInput') }}</h3>
      </div>
      
      <div class="input-section">
        <textarea
          v-model="jsonInput"
          :placeholder="$t('tools.jsonPlot.ui.jsonPlaceholder')"
          class="json-input"
          @input="validateJson"
        ></textarea>
        
        <div class="input-info">
          <div class="json-status" :class="{ valid: isValidJson, invalid: !isValidJson && jsonInput.trim() }">
            <i :class="isValidJson ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'"></i>
            {{ isValidJson ? $t('tools.jsonPlot.ui.validJsonFormat') : (!jsonInput.trim() ? $t('tools.jsonPlot.ui.pleaseInputJson') : $t('tools.jsonPlot.ui.invalidJsonFormat')) }}
          </div>
          <div class="data-info" v-if="parsedData">
            {{ $t('tools.jsonPlot.ui.dataCount') }} {{ Array.isArray(parsedData) ? parsedData.length : Object.keys(parsedData).length }} {{ $t('tools.jsonPlot.ui.items') }}
          </div>
        </div>
      </div>
    </div>

    <div class="config-card" v-if="isValidJson && parsedData">
      <div class="card-header">
        <h3><i class="fas fa-cog"></i> {{ $t('tools.jsonPlot.ui.chartConfig') }}</h3>
      </div>
      
      <div class="config-grid">
        <div class="config-item">
          <label>{{ $t('tools.jsonPlot.ui.chartType') }}</label>
          <select v-model="chartType" class="styled-select" @change="updateChart">
            <option value="line">{{ $t('tools.jsonPlot.ui.lineChart') }}</option>
            <option value="bar">{{ $t('tools.jsonPlot.ui.barChart') }}</option>
            <option value="pie">{{ $t('tools.jsonPlot.ui.pieChart') }}</option>
            <option value="doughnut">{{ $t('tools.jsonPlot.ui.doughnutChart') }}</option>
            <option value="radar">{{ $t('tools.jsonPlot.ui.radarChart') }}</option>
            <option value="polarArea">{{ $t('tools.jsonPlot.ui.polarAreaChart') }}</option>
          </select>
        </div>
        
        <div class="config-item" v-if="dataKeys.length > 0">
          <label>{{ $t('tools.jsonPlot.ui.xAxisField') }}</label>
          <select v-model="xAxisField" class="styled-select" @change="updateChart">
            <option v-for="key in dataKeys" :key="key" :value="key">{{ key }}</option>
          </select>
        </div>
        
        <div class="config-item" v-if="dataKeys.length > 0">
          <label>{{ $t('tools.jsonPlot.ui.yAxisField') }}</label>
          <select v-model="yAxisField" class="styled-select" @change="updateChart">
            <option v-for="key in numericKeys" :key="key" :value="key">{{ key }}</option>
          </select>
        </div>
        
        <div class="config-item">
          <label>{{ $t('tools.jsonPlot.ui.chartTitle') }}</label>
          <input v-model="chartTitle" type="text" class="styled-input" @input="updateChart" :placeholder="$t('tools.jsonPlot.ui.chartTitlePlaceholder')">
        </div>
      </div>

      <div class="color-options">
        <label>{{ $t('tools.jsonPlot.ui.colorScheme') }}</label>
        <div class="color-schemes">
          <div v-for="(scheme, index) in colorSchemes" :key="index" 
               @click="selectedScheme = index; updateChart()" 
               class="color-scheme" 
               :class="{ active: selectedScheme === index }">
            <div class="color-preview">
              <div v-for="color in scheme.slice(0, 5)" :key="color" 
                   class="color-dot" 
                   :style="{ backgroundColor: color }"></div>
            </div>
            <span>{{ schemeNames[index] }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="chart-card" v-if="isValidJson && parsedData">
      <div class="card-header">
        <h3><i class="fas fa-chart-area"></i> {{ $t('tools.jsonPlot.ui.chartPreview') }}</h3>
        <div class="chart-actions">
          <button @click="downloadChart" class="action-btn">
            <i class="fas fa-download"></i> {{ $t('tools.jsonPlot.ui.downloadImage') }}
          </button>
          <button @click="copyChartConfig" class="action-btn">
            <i class="fas fa-code"></i> {{ $t('tools.jsonPlot.ui.copyConfig') }}
          </button>
        </div>
      </div>
      
      <div class="chart-container">
        <canvas ref="chartCanvas" width="800" height="400"></canvas>
      </div>
    </div>

    <div v-if="error" class="error-card">
      <i class="fas fa-exclamation-triangle"></i> {{ error }}
    </div>

    <div v-if="success" class="success-card">
      <i class="fas fa-check-circle"></i> {{ success }}
    </div>

    <div class="help-card">
      <h4><i class="fas fa-info-circle"></i> {{ $t('tools.jsonPlot.ui.usageInstructions') }}</h4>
      <ul>
        <li>{{ $t('tools.jsonPlot.ui.instruction1') }}</li>
        <li>{{ $t('tools.jsonPlot.ui.instruction2') }}</li>
        <li>{{ $t('tools.jsonPlot.ui.instruction3') }}</li>
        <li>{{ $t('tools.jsonPlot.ui.instruction4') }}</li>
        <li>{{ $t('tools.jsonPlot.ui.instruction5') }}</li>
      </ul>
      
      <div class="example-format">
        <h5>{{ $t('tools.jsonPlot.ui.dataFormatExample') }}</h5>
        <pre><code>[
  {"name": "产品A", "sales": 120, "profit": 30},
  {"name": "产品B", "sales": 150, "profit": 45},
  {"name": "产品C", "sales": 90, "profit": 25}
]</code></pre>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'JsonPlot',
  setup() {
    const { t } = useI18n()
    const jsonInput = ref('')
    const chartType = ref('bar')
    const xAxisField = ref('')
    const yAxisField = ref('')
    const chartTitle = ref('')
    const selectedScheme = ref(0)
    const error = ref('')
    const success = ref('')
    const isValidJson = ref(false)
    const parsedData = ref(null)
    const chartCanvas = ref(null)
    let chartInstance = null

    const colorSchemes = [
      ['#3b82f6', '#8b5cf6', '#06d6a0', '#f72585', '#ffbe0b'],
      ['#e63946', '#f77f00', '#fcbf49', '#06d6a0', '#118ab2'],
      ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51'],
      ['#6c5ce7', '#a29bfe', '#fd79a8', '#fdcb6e', '#00b894'],
      ['#2d3436', '#636e72', '#74b9ff', '#0984e3', '#00cec9']
    ]

    const schemeNames = computed(() => [
      t('tools.jsonPlot.ui.defaultScheme'),
      t('tools.jsonPlot.ui.warmTones'),
      t('tools.jsonPlot.ui.natural'),
      t('tools.jsonPlot.ui.dreamy'),
      t('tools.jsonPlot.ui.business')
    ])

    const dataKeys = computed(() => {
      if (!parsedData.value) return []
      if (Array.isArray(parsedData.value) && parsedData.value.length > 0) {
        return Object.keys(parsedData.value[0])
      }
      return Object.keys(parsedData.value)
    })

    const numericKeys = computed(() => {
      if (!parsedData.value) return []
      if (Array.isArray(parsedData.value) && parsedData.value.length > 0) {
        return Object.keys(parsedData.value[0]).filter(key => {
          return parsedData.value.some(item => !isNaN(parseFloat(item[key])))
        })
      }
      return Object.keys(parsedData.value).filter(key => !isNaN(parseFloat(parsedData.value[key])))
    })

    const validateJson = () => {
      try {
        if (!jsonInput.value.trim()) {
          isValidJson.value = false
          parsedData.value = null
          return
        }
        
        const parsed = JSON.parse(jsonInput.value)
        parsedData.value = parsed
        isValidJson.value = true
        error.value = ''
        
        // Auto-select fields
        if (dataKeys.value.length > 0) {
          xAxisField.value = xAxisField.value || dataKeys.value[0]
          yAxisField.value = yAxisField.value || numericKeys.value[0]
        }
        
        nextTick(() => {
          updateChart()
        })
        
      } catch (err) {
        isValidJson.value = false
        parsedData.value = null
        error.value = ''
      }
    }

    const loadExample = (type) => {
      const examples = {
        line: JSON.stringify([
          {"月份": "1月", "销售额": 120, "利润": 30},
          {"月份": "2月", "销售额": 150, "利润": 45},
          {"月份": "3月", "销售额": 180, "利润": 54},
          {"月份": "4月", "销售额": 200, "利润": 60},
          {"月份": "5月", "销售额": 220, "利润": 66},
          {"月份": "6月", "销售额": 250, "利润": 75}
        ], null, 2),
        bar: JSON.stringify([
          {"产品": "iPhone", "销量": 120, "评分": 4.8},
          {"产品": "Samsung", "销量": 98, "评分": 4.5},
          {"产品": "Huawei", "销量": 85, "评分": 4.3},
          {"产品": "Xiaomi", "销量": 75, "评分": 4.2},
          {"产品": "OPPO", "销量": 65, "评分": 4.0}
        ], null, 2),
        pie: JSON.stringify([
          {"类别": "移动端", "占比": 45},
          {"类别": "桌面端", "占比": 35},
          {"类别": "平板端", "占比": 20}
        ], null, 2)
      }
      
      jsonInput.value = examples[type]
      chartType.value = type
      validateJson()
    }

    const updateChart = async () => {
      if (!isValidJson.value || !parsedData.value || !chartCanvas.value) return
      
      await nextTick()
      
      // Destroy existing chart
      if (chartInstance) {
        chartInstance.destroy()
      }

      const ctx = chartCanvas.value.getContext('2d')
      const colors = colorSchemes[selectedScheme.value]
      
      let chartData
      let chartOptions = {
        responsive: true,
        plugins: {
          title: {
            display: !!chartTitle.value,
            text: chartTitle.value,
            font: { size: 16, weight: 'bold' }
          },
          legend: {
            position: 'top'
          }
        }
      }

      if (['pie', 'doughnut', 'polarArea'].includes(chartType.value)) {
        // For pie charts, use single field
        const data = Array.isArray(parsedData.value) ? parsedData.value : Object.entries(parsedData.value)
        chartData = {
          labels: data.map(item => Array.isArray(item) ? item[0] : item[xAxisField.value]),
          datasets: [{
            data: data.map(item => Array.isArray(item) ? item[1] : item[yAxisField.value]),
            backgroundColor: colors,
            borderWidth: 2,
            borderColor: '#ffffff'
          }]
        }
      } else {
        // For line/bar charts
        const data = Array.isArray(parsedData.value) ? parsedData.value : Object.entries(parsedData.value)
        chartData = {
          labels: data.map(item => Array.isArray(item) ? item[0] : item[xAxisField.value]),
          datasets: [{
            label: yAxisField.value,
            data: data.map(item => Array.isArray(item) ? item[1] : item[yAxisField.value]),
            backgroundColor: chartType.value === 'line' ? 'rgba(59, 130, 246, 0.1)' : colors[0],
            borderColor: colors[0],
            borderWidth: 2,
            fill: chartType.value === 'line'
          }]
        }
        
        if (chartType.value === 'line') {
          chartOptions.scales = {
            y: { beginAtZero: true }
          }
        } else if (chartType.value === 'bar') {
          chartOptions.scales = {
            y: { beginAtZero: true }
          }
        }
      }

      // Create chart using simple canvas drawing since Chart.js is not available
      drawSimpleChart(ctx, chartData, chartType.value, chartOptions)
    }

    const drawSimpleChart = (ctx, data, type, options) => {
      const canvas = ctx.canvas
      const width = canvas.width
      const height = canvas.height
      const padding = 60
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, width, height)
      
      // Draw title
      if (options.plugins.title.display) {
        ctx.fillStyle = '#2d3748'
        ctx.font = '16px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(options.plugins.title.text, width / 2, 30)
      }
      
      if (type === 'pie' || type === 'doughnut') {
        drawPieChart(ctx, data, width, height, type === 'doughnut')
      } else {
        drawBarLineChart(ctx, data, width, height, padding, type)
      }
    }

    const drawPieChart = (ctx, data, width, height, isDoughnut) => {
      const centerX = width / 2
      const centerY = height / 2 + 20
      const radius = Math.min(width, height) / 3
      const total = data.datasets[0].data.reduce((sum, val) => sum + parseFloat(val), 0)
      
      let currentAngle = -Math.PI / 2
      
      data.datasets[0].data.forEach((value, index) => {
        const sliceAngle = (parseFloat(value) / total) * 2 * Math.PI
        const color = data.datasets[0].backgroundColor[index % data.datasets[0].backgroundColor.length]
        
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
        ctx.closePath()
        ctx.fillStyle = color
        ctx.fill()
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 2
        ctx.stroke()
        
        // Draw labels
        const labelAngle = currentAngle + sliceAngle / 2
        const labelX = centerX + Math.cos(labelAngle) * (radius + 20)
        const labelY = centerY + Math.sin(labelAngle) * (radius + 20)
        
        ctx.fillStyle = '#2d3748'
        ctx.font = '12px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(data.labels[index], labelX, labelY)
        
        currentAngle += sliceAngle
      })
      
      // Draw doughnut hole
      if (isDoughnut) {
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI)
        ctx.fillStyle = '#ffffff'
        ctx.fill()
      }
    }

    const drawBarLineChart = (ctx, data, width, height, padding, type) => {
      const chartWidth = width - padding * 2
      const chartHeight = height - padding * 2 - 40
      const maxValue = Math.max(...data.datasets[0].data.map(val => parseFloat(val)))
      const barWidth = chartWidth / data.labels.length
      
      // Draw axes
      ctx.strokeStyle = '#e2e8f0'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(padding, padding)
      ctx.lineTo(padding, padding + chartHeight)
      ctx.lineTo(padding + chartWidth, padding + chartHeight)
      ctx.stroke()
      
      // Draw data
      data.datasets[0].data.forEach((value, index) => {
        const barHeight = (parseFloat(value) / maxValue) * chartHeight
        const x = padding + index * barWidth
        const y = padding + chartHeight - barHeight
        
        if (type === 'bar') {
          ctx.fillStyle = data.datasets[0].backgroundColor
          ctx.fillRect(x + barWidth * 0.1, y, barWidth * 0.8, barHeight)
        } else if (type === 'line') {
          if (index === 0) {
            ctx.beginPath()
            ctx.moveTo(x + barWidth / 2, y)
          } else {
            ctx.lineTo(x + barWidth / 2, y)
          }
          
          // Draw point
          ctx.fillStyle = data.datasets[0].borderColor
          ctx.beginPath()
          ctx.arc(x + barWidth / 2, y, 4, 0, 2 * Math.PI)
          ctx.fill()
        }
        
        // Draw labels
        ctx.fillStyle = '#2d3748'
        ctx.font = '12px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(data.labels[index], x + barWidth / 2, padding + chartHeight + 20)
        
        // Draw value
        ctx.fillText(value, x + barWidth / 2, y - 10)
      })
      
      if (type === 'line') {
        ctx.strokeStyle = data.datasets[0].borderColor
        ctx.lineWidth = 2
        ctx.stroke()
      }
    }

    const downloadChart = () => {
      if (!chartCanvas.value) return
      
      const link = document.createElement('a')
      link.download = 'chart.png'
      link.href = chartCanvas.value.toDataURL()
      link.click()
      
      success.value = t('tools.jsonPlot.ui.chartDownloaded')
      setTimeout(() => success.value = '', 3000)
    }

    const copyChartConfig = () => {
      const config = {
        type: chartType.value,
        data: {
          xAxis: xAxisField.value,
          yAxis: yAxisField.value
        },
        options: {
          title: chartTitle.value,
          colorScheme: selectedScheme.value
        }
      }
      
      navigator.clipboard.writeText(JSON.stringify(config, null, 2))
      success.value = t('tools.jsonPlot.ui.configCopied')
      setTimeout(() => success.value = '', 3000)
    }

    onMounted(() => {
      // Load example data on mount
      loadExample('bar')
    })

    return {
      jsonInput,
      chartType,
      xAxisField,
      yAxisField,
      chartTitle,
      selectedScheme,
      error,
      success,
      isValidJson,
      parsedData,
      chartCanvas,
      colorSchemes,
      schemeNames,
      dataKeys,
      numericKeys,
      validateJson,
      loadExample,
      updateChart,
      downloadChart,
      copyChartConfig,
      t
    }
  }
}
</script>

<style scoped>
.tool-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 10px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.tool-header {
  text-align: center;
  margin-bottom: 10px;
  padding: 10px;
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
  color: white;
  padding: 10px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(139, 92, 246, 0.3);
}

.header-icon {
  font-size: 48px;
  margin-bottom: 10px;
  opacity: 0.9;
}

.tool-header h2 {
  margin: 0 0 12px 0;
  font-size: 32px;
  font-weight: 700;
}

.tool-header p {
  margin: 0 0 24px 0;
  font-size: 16px;
  opacity: 0.9;
  line-height: 1.5;
}

.example-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
  flex-wrap: wrap;
}

.example-label {
  font-size: 14px;
  opacity: 0.8;
}

.example-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 10px;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  font-weight: 500;
}

.example-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
}

.input-card, .config-card, .chart-card, .help-card, .error-card, .success-card {
  background: white;
  border-radius: 16px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f8fafc;
}

.card-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #2d3748;
  display: flex;
  align-items: center;
  gap: 8px;
}

.chart-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #4a5568;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.action-btn:hover {
  background: #e2e8f0;
  transform: translateY(-1px);
}

.json-input {
  width: 100%;
  min-height: 200px;
  padding: 10px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
  font-size: 14px;
  line-height: 1.5;
  resize: vertical;
  transition: all 0.3s ease;
}

.json-input:focus {
  outline: none;
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.input-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  flex-wrap: wrap;
  gap: 12px;
}

.json-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
}

.json-status.valid {
  color: #059669;
}

.json-status.invalid {
  color: #dc2626;
}

.data-info {
  font-size: 14px;
  color: #6b7280;
  font-weight: 500;
}

.config-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 10px;
}

.config-item label {
  display: block;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 10px;
}

.styled-select, .styled-input {
  width: 100%;
  padding: 10px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  color: #2d3748;
  font-size: 14px;
  transition: all 0.3s ease;
}

.styled-select:focus, .styled-input:focus {
  outline: none;
  border-color: #8b5cf6;
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
}

.color-options label {
  display: block;
  font-weight: 500;
  color: #4a5568;
  margin-bottom: 10px;
}

.color-schemes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
}

.color-scheme {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 10px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.color-scheme:hover {
  border-color: #8b5cf6;
}

.color-scheme.active {
  border-color: #8b5cf6;
  background: #f8fafc;
}

.color-preview {
  display: flex;
  gap: 4px;
}

.color-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.color-scheme span {
  font-size: 12px;
  font-weight: 500;
  color: #4a5568;
}

.chart-container {
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.chart-container canvas {
  max-width: 100%;
  max-height: 100%;
}

.error-card {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

.success-card {
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}

.help-card h4 {
  margin: 0 0 16px 0;
  color: #2d3748;
  display: flex;
  align-items: center;
  gap: 8px;
}

.help-card ul {
  margin: 0 0 20px 0;
  padding-left: 20px;
}

.help-card li {
  margin-bottom: 10px;
  color: #4a5568;
  line-height: 1.5;
}

.example-format {
  background: #f8fafc;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.example-format h5 {
  margin: 0 0 12px 0;
  color: #2d3748;
  font-size: 14px;
  font-weight: 600;
}

.example-format pre {
  margin: 0;
  background: #1f2937;
  color: #f9fafb;
  padding: 10px;
  border-radius: 6px;
  font-size: 12px;
  overflow-x: auto;
}

@media (max-width: 768px) {
  .tool-container {
    padding: 10px;
  }
  
  .config-grid {
    grid-template-columns: 1fr;
  }
  
  .color-schemes {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .example-section {
    flex-direction: column;
    gap: 8px;
  }
  
  .chart-actions {
    flex-direction: column;
  }
}
</style> 