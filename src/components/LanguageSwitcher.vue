<template>
  <div class="language-switcher">
    <button 
      @click="toggleLanguageMenu" 
      class="language-btn"
      :title="t('common.switchLanguage')"
    >
      <i class="fas fa-globe"></i>
      <span class="current-lang">{{ getCurrentLanguageFlag() }}</span>
      <i class="fas fa-chevron-down" :class="{ 'rotated': showMenu }"></i>
    </button>
    
    <transition name="dropdown">
      <div v-if="showMenu" class="language-menu">
        <button 
          v-for="lang in languages" 
          :key="lang.code"
          @click="changeLanguage(lang.code)"
          class="language-option"
          :class="{ 'active': currentLocale === lang.code }"
        >
          <span class="flag">{{ lang.flag }}</span>
          <span class="name">{{ lang.name }}</span>
          <i v-if="currentLocale === lang.code" class="fas fa-check"></i>
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'LanguageSwitcher',
  setup() {
    const { locale, t } = useI18n()
    const showMenu = ref(false)
    
    const languages = [
      { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
      { code: 'en-US', name: 'English', flag: '🇺🇸' },
      { code: 'ja-JP', name: '日本語', flag: '🇯🇵' },
      { code: 'ko-KR', name: '한국어', flag: '🇰🇷' }
    ]
    
    const currentLocale = computed(() => locale.value)
    
    const toggleLanguageMenu = () => {
      showMenu.value = !showMenu.value
    }
    
    const changeLanguage = (langCode) => {
      locale.value = langCode
      localStorage.setItem('locale', langCode)
      showMenu.value = false
    }
    
    const getCurrentLanguageFlag = () => {
      const currentLang = languages.find(lang => lang.code === currentLocale.value)
      return currentLang ? currentLang.flag : '🇨🇳'
    }
    
    // 点击外部关闭菜单
    const handleClickOutside = (event) => {
      if (!event.target.closest('.language-switcher')) {
        showMenu.value = false
      }
    }
    
    // 添加全局点击事件监听
    document.addEventListener('click', handleClickOutside)
    
    return {
      showMenu,
      languages,
      currentLocale,
      toggleLanguageMenu,
      changeLanguage,
      getCurrentLanguageFlag,
      t
    }
  }
}
</script>

<style scoped>
.language-switcher {
  position: relative;
  display: inline-block;
}

.language-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  min-width: 80px;
}

.language-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-1px);
}

.language-btn i.fa-chevron-down {
  transition: transform 0.3s ease;
  font-size: 0.7rem;
}

.language-btn i.fa-chevron-down.rotated {
  transform: rotate(180deg);
}

.current-lang {
  font-size: 1rem;
}

.language-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 1000;
  min-width: 160px;
}

.language-option {
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: white;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  text-align: left;
  box-shadow: none;
}

.language-option:hover {
  background: #f3f4f6;
}

.language-option.active {
  background: #e0e7ff;
  color: #3730a3;
  font-weight: 600;
}

.language-option .flag {
  font-size: 1.1rem;
  width: 20px;
  text-align: center;
}

.language-option .name {
  flex: 1;
}

.language-option .fa-check {
  color: #10b981;
  font-size: 0.8rem;
}

/* 下拉动画 */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
  transform-origin: top;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: scaleY(0.8) translateY(-10px);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: scaleY(1) translateY(0);
}

/* 深色主题适配 */
.dark-theme .language-btn {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  color: #e0e0e0;
}

.dark-theme .language-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

.dark-theme .language-menu {
  background: #1f2937;
  border-color: rgba(255, 255, 255, 0.1);
}

.dark-theme .language-option {
  background: #1f2937;
  color: #f1f5f9;
}

.dark-theme .language-option:hover {
  background: #374151;
}

.dark-theme .language-option.active {
  background: #4c1d95;
  color: #e0e7ff;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .language-btn {
    padding: 0.4rem 0.6rem;
    font-size: 0.8rem;
    min-width: 70px;
  }
  
  .language-menu {
    min-width: 140px;
  }
  
  .language-option {
    padding: 0.6rem 0.8rem;
    font-size: 0.85rem;
  }
}
</style>

