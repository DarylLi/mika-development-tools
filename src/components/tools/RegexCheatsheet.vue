<template>
  <div class="regex-cheatsheet-tool">
    <div class="tool-header">
      <h3><i class="fas fa-search"></i> {{ $t('tools.regexCheatsheet.ui.title') }}</h3>
      <p>{{ $t('tools.regexCheatsheet.ui.description') }}</p>
    </div>

    <div class="tool-content">
      <div class="search-section">
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="$t('tools.regexCheatsheet.ui.searchPlaceholder')"
            class="search-input"
          />
        </div>
      </div>

      <div class="categories">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="activeCategory = category.id"
          class="category-btn"
          :class="{ active: activeCategory === category.id }"
        >
          <i :class="category.icon"></i>
          {{ category.name }}
        </button>
      </div>

      <div class="regex-list">
        <div
          v-for="regex in filteredRegexes"
          :key="regex.id"
          class="regex-card"
        >
          <div class="regex-header">
            <h4>{{ regex.name }}</h4>
            <button @click="copyRegex(regex.pattern)" class="copy-btn" :title="$t('tools.regexCheatsheet.ui.copyRegex')">
              <i class="fas fa-copy"></i>
            </button>
          </div>
          <div class="regex-pattern">
            <code>{{ regex.pattern }}</code>
          </div>
          <div class="regex-description">{{ regex.description }}</div>
          <div v-if="regex.examples" class="regex-examples">
            <h5>{{ $t('tools.regexCheatsheet.ui.examples') }}</h5>
            <div class="examples-list">
              <span
                v-for="example in regex.examples"
                :key="example"
                class="example-tag"
              >
                {{ example }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'RegexCheatsheet',
  setup() {
    const { t } = useI18n()
    const searchQuery = ref('')
    const activeCategory = ref('all')

    const categories = computed(() => [
      { id: 'all', name: t('tools.regexCheatsheet.ui.categoryAll'), icon: 'fas fa-list' },
      { id: 'basic', name: t('tools.regexCheatsheet.ui.categoryBasic'), icon: 'fas fa-code' },
      { id: 'validation', name: t('tools.regexCheatsheet.ui.categoryValidation'), icon: 'fas fa-check-circle' },
      { id: 'extraction', name: t('tools.regexCheatsheet.ui.categoryExtraction'), icon: 'fas fa-extract' },
      { id: 'replacement', name: t('tools.regexCheatsheet.ui.categoryReplacement'), icon: 'fas fa-edit' }
    ])

    const regexes = computed(() => {
      // 使用 t() 函数直接获取每个字符串值，而不是获取整个对象
      return [
        // 基础语法
        { id: 1, category: 'basic', name: t('tools.regexCheatsheet.ui.regexes.basic1.name'), pattern: '.', description: t('tools.regexCheatsheet.ui.regexes.basic1.description'), examples: ['a', '1', '@'] },
        { id: 2, category: 'basic', name: t('tools.regexCheatsheet.ui.regexes.basic2.name'), pattern: '\\d', description: t('tools.regexCheatsheet.ui.regexes.basic2.description'), examples: ['0', '5', '9'] },
        { id: 3, category: 'basic', name: t('tools.regexCheatsheet.ui.regexes.basic3.name'), pattern: '\\D', description: t('tools.regexCheatsheet.ui.regexes.basic3.description'), examples: ['a', '@', ' '] },
        { id: 4, category: 'basic', name: t('tools.regexCheatsheet.ui.regexes.basic4.name'), pattern: '\\w', description: t('tools.regexCheatsheet.ui.regexes.basic4.description'), examples: ['a', '1', '_'] },
        { id: 5, category: 'basic', name: t('tools.regexCheatsheet.ui.regexes.basic5.name'), pattern: '\\W', description: t('tools.regexCheatsheet.ui.regexes.basic5.description'), examples: ['@', '#', ' '] },
        { id: 6, category: 'basic', name: t('tools.regexCheatsheet.ui.regexes.basic6.name'), pattern: '\\s', description: t('tools.regexCheatsheet.ui.regexes.basic6.description'), examples: [' ', '\\t', '\\n'] },
        { id: 7, category: 'basic', name: t('tools.regexCheatsheet.ui.regexes.basic7.name'), pattern: '\\S', description: t('tools.regexCheatsheet.ui.regexes.basic7.description'), examples: ['a', '1', '@'] },
        { id: 8, category: 'basic', name: t('tools.regexCheatsheet.ui.regexes.basic8.name'), pattern: '^', description: t('tools.regexCheatsheet.ui.regexes.basic8.description'), examples: ['^hello'] },
        { id: 9, category: 'basic', name: t('tools.regexCheatsheet.ui.regexes.basic9.name'), pattern: '$', description: t('tools.regexCheatsheet.ui.regexes.basic9.description'), examples: ['world$'] },
        
        // 验证
        { id: 10, category: 'validation', name: t('tools.regexCheatsheet.ui.regexes.validation10.name'), pattern: '^[\\w\\.-]+@[\\w\\.-]+\\.[a-zA-Z]{2,}$', description: t('tools.regexCheatsheet.ui.regexes.validation10.description'), examples: ['user@example.com', 'test.email@domain.org'] },
        { id: 11, category: 'validation', name: t('tools.regexCheatsheet.ui.regexes.validation11.name'), pattern: '^1[3-9]\\d{9}$', description: t('tools.regexCheatsheet.ui.regexes.validation11.description'), examples: ['13812345678', '18888888888'] },
        { id: 12, category: 'validation', name: t('tools.regexCheatsheet.ui.regexes.validation12.name'), pattern: '^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$', description: t('tools.regexCheatsheet.ui.regexes.validation12.description'), examples: ['http://example.com', 'https://www.google.com'] },
        { id: 13, category: 'validation', name: t('tools.regexCheatsheet.ui.regexes.validation13.name'), pattern: '^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$', description: t('tools.regexCheatsheet.ui.regexes.validation13.description'), examples: ['192.168.1.1', '8.8.8.8'] },
        { id: 14, category: 'validation', name: t('tools.regexCheatsheet.ui.regexes.validation14.name'), pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$', description: t('tools.regexCheatsheet.ui.regexes.validation14.description'), examples: ['MyPass123!', 'SecuRe#456'] },
        { id: 15, category: 'validation', name: t('tools.regexCheatsheet.ui.regexes.validation15.name'), pattern: '^[1-9]\\d{5}(18|19|20)\\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$', description: t('tools.regexCheatsheet.ui.regexes.validation15.description'), examples: ['110101199003074567'] },
        
        // 提取
        { id: 16, category: 'extraction', name: t('tools.regexCheatsheet.ui.regexes.extraction16.name'), pattern: 'https?:\\/\\/(www\\.)?([^\\s\\/]+)', description: t('tools.regexCheatsheet.ui.regexes.extraction16.description'), examples: ['example.com', 'google.com'] },
        { id: 17, category: 'extraction', name: t('tools.regexCheatsheet.ui.regexes.extraction17.name'), pattern: '\\.([a-zA-Z0-9]+)$', description: t('tools.regexCheatsheet.ui.regexes.extraction17.description'), examples: ['.jpg', '.pdf', '.txt'] },
        { id: 18, category: 'extraction', name: t('tools.regexCheatsheet.ui.regexes.extraction18.name'), pattern: '<([a-z]+)[^>]*>', description: t('tools.regexCheatsheet.ui.regexes.extraction18.description'), examples: ['<div>', '<span class="test">'] },
        { id: 19, category: 'extraction', name: t('tools.regexCheatsheet.ui.regexes.extraction19.name'), pattern: '"([^"]*)"', description: t('tools.regexCheatsheet.ui.regexes.extraction19.description'), examples: ['"Hello World"', '"test"'] },
        
        // 替换
        { id: 20, category: 'replacement', name: t('tools.regexCheatsheet.ui.regexes.replacement20.name'), pattern: '\\s+', description: t('tools.regexCheatsheet.ui.regexes.replacement20.description'), examples: ['   ', '\\t\\t'] },
        { id: 21, category: 'replacement', name: t('tools.regexCheatsheet.ui.regexes.replacement21.name'), pattern: '^\\s+|\\s+$', description: t('tools.regexCheatsheet.ui.regexes.replacement21.description'), examples: ['  text  '] },
        { id: 22, category: 'replacement', name: t('tools.regexCheatsheet.ui.regexes.replacement22.name'), pattern: '[-_]([a-z])', description: t('tools.regexCheatsheet.ui.regexes.replacement22.description'), examples: ['hello-world', 'test_case'] }
      ]
    })

    const filteredRegexes = computed(() => {
      let filtered = regexes.value

      // 分类过滤
      if (activeCategory.value !== 'all') {
        filtered = filtered.filter(regex => regex.category === activeCategory.value)
      }

      // 搜索过滤
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(regex =>
          regex.name.toLowerCase().includes(query) ||
          regex.description.toLowerCase().includes(query) ||
          regex.pattern.toLowerCase().includes(query)
        )
      }

      return filtered
    })

    async function copyRegex(pattern) {
      try {
        await navigator.clipboard.writeText(pattern)
      } catch (err) {
        console.error(t('tools.regexCheatsheet.ui.copyFailed') + ':', err)
      }
    }

    return {
      searchQuery,
      activeCategory,
      categories,
      filteredRegexes,
      copyRegex
    }
  }
}
</script>

<style scoped>
.regex-cheatsheet-tool {
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
  font-size: 24px;
  margin-bottom: 10px;
  color: var(--text-primary);
}

.search-section {
  margin-bottom: 10px;
}

.search-box {
  position: relative;
  max-width: 500px;
  margin: 0 auto;
}

.search-box i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
}

.search-input {
  width: 100%;
  padding: 15px 45px 15px 45px;
  border: 2px solid var(--border-color);
  border-radius: 25px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 16px;
}

.categories {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.category-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;
}

.category-btn:hover {
  border-color: var(--accent-color);
}

.category-btn.active {
  background: var(--accent-color);
  border-color: var(--accent-color);
  color: white;
}

.regex-list {
  display: grid;
  gap: 20px;
}

.regex-card {
  background: var(--bg-secondary);
  padding: 10px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  transition: all 0.3s;
}

.regex-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.regex-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.regex-header h4 {
  margin: 0;
  color: var(--text-primary);
  font-size: 18px;
}

.copy-btn {
  background: var(--accent-color);
  color: white;
  border: none;
  padding: 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-btn:hover {
  background: var(--accent-hover);
  transform: translateY(-1px);
}

.regex-pattern {
  background: var(--bg-primary);
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  border-left: 4px solid var(--accent-color);
}

.regex-pattern code {
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 16px;
  color: var(--accent-color);
  font-weight: bold;
  word-break: break-all;
}

.regex-description {
  color: var(--text-secondary);
  margin-bottom: 10px;
  line-height: 1.5;
}

.regex-examples h5 {
  color: var(--text-primary);
  margin-bottom: 10px;
  font-size: 14px;
}

.examples-list {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.example-tag {
  background: var(--bg-primary);
  color: var(--text-primary);
  padding: 10px;
  border-radius: 15px;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 12px;
  border: 1px solid var(--border-color);
}

@media (max-width: 768px) {
  .categories {
    gap: 8px;
  }
  
  .category-btn {
    padding: 10px;
    font-size: 13px;
  }
  
  .regex-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style> 