<template>
  <div class="tailwind-cheatsheet-container">
    <div class="tool-header">
      <h3>{{ $t('tools.tailwindCheatsheet.ui.title') }}</h3>
      <p>{{ $t('tools.tailwindCheatsheet.ui.description') }}</p>
    </div>
    
    <div class="search-section">
      <div class="search-container">
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="$t('tools.tailwindCheatsheet.ui.searchPlaceholder')"
          class="search-input"
        />
        <button @click="searchQuery = ''" class="clear-btn" v-if="searchQuery">
          ✕
        </button>
      </div>
      
      <div class="filter-tags">
        <button
          v-for="category in categories"
          :key="category.id"
          @click="toggleCategory(category.id)"
          :class="['filter-tag', { active: selectedCategories.includes(category.id) }]"
        >
          {{ category.name }}
        </button>
      </div>
    </div>

    <div class="classes-grid">
      <template v-for="category in filteredCategories" :key="category.id">
        <div
          v-if="category.classes.length > 0"
          class="category-section"
        >
        <h4 class="category-title">{{ category.name }}</h4>
        <div class="classes-container">
          <div
            v-for="classItem in category.classes"
            :key="classItem.class"
            class="class-item"
            @click="copyToClipboard(classItem.class)"
            :title="classItem.description"
          >
            <code class="class-name">{{ classItem.class }}</code>
            <span class="class-description">{{ classItem.description }}</span>
            <div class="copy-indicator" v-if="copiedClass === classItem.class">{{ $t('tools.tailwindCheatsheet.ui.copied') }}</div>
          </div>
        </div>
        </div>
      </template>
    </div>

    <div v-if="filteredCategories.every(cat => cat.classes.length === 0)" class="no-results">
      <p>{{ $t('tools.tailwindCheatsheet.ui.noResults') }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TailwindCheatsheet',
  data() {
    return {
      searchQuery: '',
      selectedCategories: [],
      copiedClass: '',
      categoryData: [
        {
          id: 'layout',
          nameKey: 'categoryLayout',
          classes: [
            { class: 'container', descKey: 'classContainer' },
            { class: 'box-border', descKey: 'classBoxBorder' },
            { class: 'box-content', descKey: 'classBoxContent' },
            { class: 'block', descKey: 'classBlock' },
            { class: 'inline-block', descKey: 'classInlineBlock' },
            { class: 'inline', descKey: 'classInline' },
            { class: 'flex', descKey: 'classFlex' },
            { class: 'inline-flex', descKey: 'classInlineFlex' },
            { class: 'grid', descKey: 'classGrid' },
            { class: 'inline-grid', descKey: 'classInlineGrid' },
            { class: 'table', descKey: 'classTable' },
            { class: 'hidden', descKey: 'classHidden' },
          ]
        },
        {
          id: 'spacing',
          nameKey: 'categorySpacing',
          classes: [
            { class: 'm-0', descKey: 'classM0' },
            { class: 'm-1', descKey: 'classM1' },
            { class: 'm-2', descKey: 'classM2' },
            { class: 'm-4', descKey: 'classM4' },
            { class: 'p-0', descKey: 'classP0' },
            { class: 'p-1', descKey: 'classP1' },
            { class: 'p-2', descKey: 'classP2' },
            { class: 'p-4', descKey: 'classP4' },
            { class: 'mx-auto', descKey: 'classMxAuto' },
            { class: 'space-x-4', descKey: 'classSpaceX4' },
          ]
        }
      ]
    }
  },
  computed: {
    categories() {
      return this.categoryData.map(cat => ({
        ...cat,
        name: this.$t(`tools.tailwindCheatsheet.ui.${cat.nameKey}`),
        classes: cat.classes.map(classItem => ({
          ...classItem,
          description: this.$t(`tools.tailwindCheatsheet.ui.${classItem.descKey}`)
        }))
      }))
    },
    filteredCategories() {
      let categories = this.categories;
      
      if (this.selectedCategories.length > 0) {
        categories = categories.filter(cat => this.selectedCategories.includes(cat.id));
      }
      
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        categories = categories.map(category => ({
          ...category,
          classes: category.classes.filter(classItem =>
            classItem.class.toLowerCase().includes(query) ||
            classItem.description.toLowerCase().includes(query)
          )
        }));
      }
      
      return categories;
    }
  },
  methods: {
    toggleCategory(categoryId) {
      const index = this.selectedCategories.indexOf(categoryId);
      if (index === -1) {
        this.selectedCategories.push(categoryId);
      } else {
        this.selectedCategories.splice(index, 1);
      }
    },
    async copyToClipboard(className) {
      try {
        await navigator.clipboard.writeText(className);
        this.copiedClass = className;
        setTimeout(() => {
          this.copiedClass = '';
        }, 1000);
      } catch (err) {
        console.error(this.$t('tools.tailwindCheatsheet.ui.copyFailed'), err);
      }
    }
  }
}
</script>

<style scoped>
.tailwind-cheatsheet-container {
  padding: 10px;
  max-width: 1200px;
  margin: 0 auto;
}

.tool-header {
  text-align: center;
  margin-bottom: 10px;
  padding: 10px;
}

.tool-header h3 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: var(--text-primary);
}

.tool-header p {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.search-section {
  margin-bottom: 10px;
}

.search-container {
  position: relative;
  margin-bottom: 10px;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  background: var(--bg-secondary);
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-color-20);
}

.clear-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1rem;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 10px;
  transition: color 0.2s ease;
}

.clear-btn:hover {
  color: var(--text-primary);
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-tag {
  padding: 10px;
  border: 2px solid var(--border-color);
  border-radius: 20px;
  background: var(--bg-secondary);
  color: var(--text-secondary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-tag:hover {
  border-color: var(--primary-color);
  color: var(--text-primary);
}

.filter-tag.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
}

.classes-grid {
  display: grid;
  gap: 30px;
}

.category-section {
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 10px;
  border: 1px solid var(--border-color);
}

.category-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--text-primary);
  border-bottom: 2px solid var(--border-color);
  padding-bottom: 8px;
}

.classes-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 8px;
}

.class-item {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--bg-primary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.class-item:hover {
  border-color: var(--primary-color);
  background: var(--bg-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 8px var(--shadow-light);
}

.class-name {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
  color: var(--primary-color);
  background: var(--bg-code);
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  font-weight: 600;
}

.class-description {
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.3;
}

.copy-indicator {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  background: var(--primary-color);
  color: white;
  padding: 10px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  animation: fadeInOut 1s ease-in-out;
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

.no-results {
  text-align: center;
  padding: 10px;
  color: var(--text-secondary);
}

.no-results p {
  font-size: 1.1rem;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .tailwind-cheatsheet-container {
    padding: 10px;
  }
  
  .tool-header h3 {
    font-size: 1.5rem;
  }
  
  .classes-container {
    grid-template-columns: 1fr;
  }
  
  .filter-tags {
    justify-content: center;
  }
  
  .category-section {
    padding: 10px;
  }
}

/* 深色主题特殊处理 */
:root[data-theme="dark"] .class-name {
  color: #60a5fa;
  background: rgba(59, 130, 246, 0.1);
}

:root[data-theme="dark"] .filter-tag.active {
  background: #ff6b35;
  border-color: #ff6b35;
}

:root[data-theme="dark"] .copy-indicator {
  background: #ff6b35;
}
</style> 