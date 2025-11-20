<template>
  <div class="story-prompt-tool">
    <div class="tool-header">
      <h3><i class="fas fa-feather-alt"></i> {{ $t('tools.storyPrompt.ui.title') }}</h3>
      <p>{{ $t('tools.storyPrompt.ui.description') }}</p>
    </div>

    <div class="tool-content">
      <div class="prompt-controls">
        <div class="control-tabs">
          <button 
            @click="activeMode = 'story'" 
            :class="{ active: activeMode === 'story' }"
            class="tab-btn"
          >
            {{ $t('tools.storyPrompt.ui.storyPlot') }}
          </button>
          <button 
            @click="activeMode = 'character'" 
            :class="{ active: activeMode === 'character' }"
            class="tab-btn"
          >
            {{ $t('tools.storyPrompt.ui.characterSetting') }}
          </button>
          <button 
            @click="activeMode = 'world'" 
            :class="{ active: activeMode === 'world' }"
            class="tab-btn"
          >
            {{ $t('tools.storyPrompt.ui.worldBuilding') }}
          </button>
          <button 
            @click="activeMode = 'dialogue'" 
            :class="{ active: activeMode === 'dialogue' }"
            class="tab-btn"
          >
            {{ $t('tools.storyPrompt.ui.dialogueScene') }}
          </button>
          <button 
            @click="activeMode = 'mixed'" 
            :class="{ active: activeMode === 'mixed' }"
            class="tab-btn"
          >
            {{ $t('tools.storyPrompt.ui.mixedPrompt') }}
          </button>
        </div>

        <div class="generation-settings">
          <div class="setting-group">
            <label for="genre">{{ $t('tools.storyPrompt.ui.genre') }}</label>
            <select id="genre" v-model="selectedGenre">
              <option value="all">{{ $t('tools.storyPrompt.ui.genreAll') }}</option>
              <option value="fantasy">{{ $t('tools.storyPrompt.ui.genreFantasy') }}</option>
              <option value="scifi">{{ $t('tools.storyPrompt.ui.genreScifi') }}</option>
              <option value="romance">{{ $t('tools.storyPrompt.ui.genreRomance') }}</option>
              <option value="mystery">{{ $t('tools.storyPrompt.ui.genreMystery') }}</option>
              <option value="horror">{{ $t('tools.storyPrompt.ui.genreHorror') }}</option>
              <option value="adventure">{{ $t('tools.storyPrompt.ui.genreAdventure') }}</option>
              <option value="drama">{{ $t('tools.storyPrompt.ui.genreDrama') }}</option>
              <option value="comedy">{{ $t('tools.storyPrompt.ui.genreComedy') }}</option>
              <option value="historical">{{ $t('tools.storyPrompt.ui.genreHistorical') }}</option>
              <option value="modern">{{ $t('tools.storyPrompt.ui.genreModern') }}</option>
            </select>
          </div>
          
          <div class="setting-group">
            <label for="complexity">{{ $t('tools.storyPrompt.ui.complexity') }}</label>
            <select id="complexity" v-model="complexity">
              <option value="simple">{{ $t('tools.storyPrompt.ui.complexitySimple') }}</option>
              <option value="medium">{{ $t('tools.storyPrompt.ui.complexityMedium') }}</option>
              <option value="complex">{{ $t('tools.storyPrompt.ui.complexityComplex') }}</option>
            </select>
          </div>
          
          <div class="setting-group">
            <label for="promptCount">{{ $t('tools.storyPrompt.ui.promptCount') }}</label>
            <input type="number" id="promptCount" v-model.number="promptCount" min="1" max="10" />
          </div>
          
          <div class="setting-group">
            <label for="includeKeywords">{{ $t('tools.storyPrompt.ui.includeKeywords') }}</label>
            <input type="checkbox" id="includeKeywords" v-model="includeKeywords" />
          </div>
        </div>

        <div class="keyword-input" v-if="includeKeywords">
          <label for="keywords">{{ $t('tools.storyPrompt.ui.keywords') }}</label>
          <input 
            type="text" 
            id="keywords" 
            v-model="keywords" 
            :placeholder="$t('tools.storyPrompt.ui.keywordsPlaceholder')"
            class="keywords-field"
          />
        </div>

        <div class="generate-actions">
          <button @click="generatePrompts" class="btn-primary generate-btn">
            <i class="fas fa-magic"></i> {{ $t('tools.storyPrompt.ui.generateInspiration') }}
          </button>
          <button @click="generateRandomPrompt" class="btn-secondary">
            <i class="fas fa-dice"></i> {{ $t('tools.storyPrompt.ui.randomOne') }}
          </button>
          <button @click="loadPresetPrompts" class="btn-secondary">
            <i class="fas fa-star"></i> {{ $t('tools.storyPrompt.ui.classicTemplate') }}
          </button>
        </div>
      </div>

      <div class="prompt-display" v-if="generatedPrompts.length">
        <h4>{{ $t('tools.storyPrompt.ui.creativeInspiration') }}</h4>
        
        <div class="prompts-list">
          <div 
            v-for="(prompt, index) in generatedPrompts" 
            :key="index"
            class="prompt-card"
            :class="{ expanded: prompt.expanded }"
          >
            <div class="prompt-header">
              <div class="prompt-type">{{ getPromptTypeLabel(prompt.type) }}</div>
              <div class="prompt-genre" v-if="prompt.genre">{{ getGenreLabel(prompt.genre) }}</div>
            </div>
            
            <div class="prompt-content">
              <div class="prompt-title">{{ prompt.title }}</div>
              <div class="prompt-text">{{ prompt.text }}</div>
              
              <div class="prompt-details" v-if="prompt.expanded && prompt.details">
                <div class="detail-section" v-for="(detail, key) in prompt.details" :key="key">
                  <strong>{{ getDetailLabel(key) }}:</strong>
                  <span>{{ detail }}</span>
                </div>
              </div>
              
              <div class="prompt-keywords" v-if="prompt.keywords">
                <span class="keyword-label">{{ $t('tools.storyPrompt.ui.keywordLabel') }}</span>
                <span 
                  v-for="keyword in prompt.keywords" 
                  :key="keyword"
                  class="keyword-tag"
                >
                  {{ keyword }}
                </span>
              </div>
            </div>
            
            <div class="prompt-actions">
              <button @click="togglePromptExpansion(prompt)" class="btn-icon expand-btn">
                <i :class="prompt.expanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
              </button>
              <button @click="copyPrompt(prompt)" class="btn-icon copy-btn" :title="$t('tools.storyPrompt.ui.copy')">
                <i class="fas fa-copy"></i>
              </button>
              <button @click="savePrompt(prompt)" class="btn-icon save-btn" :title="$t('tools.storyPrompt.ui.save')">
                <i class="fas fa-heart"></i>
              </button>
              <button @click="extendPrompt(prompt)" class="btn-icon extend-btn" :title="$t('tools.storyPrompt.ui.extend')">
                <i class="fas fa-plus"></i>
              </button>
              <button @click="removePrompt(index)" class="btn-icon remove-btn" :title="$t('tools.storyPrompt.ui.delete')">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="prompt-batch-actions">
          <button @click="copyAllPrompts" class="btn-secondary">
            <i class="fas fa-copy"></i> {{ $t('tools.storyPrompt.ui.copyAll') }}
          </button>
          <button @click="exportPrompts" class="btn-secondary">
            <i class="fas fa-download"></i> {{ $t('tools.storyPrompt.ui.exportDocument') }}
          </button>
          <button @click="clearPrompts" class="btn-secondary">
            <i class="fas fa-trash"></i> {{ $t('tools.storyPrompt.ui.clearList') }}
          </button>
        </div>
      </div>

      <div class="saved-prompts" v-if="savedPrompts.length">
        <h4>{{ $t('tools.storyPrompt.ui.savedInspiration') }}</h4>
        <div class="saved-list">
          <div 
            v-for="(prompt, index) in savedPrompts.slice(-5)" 
            :key="index"
            class="saved-item"
          >
            <div class="saved-content">
              <div class="saved-title">{{ prompt.title }}</div>
              <div class="saved-text">{{ prompt.text.substring(0, 100) }}...</div>
              <div class="saved-meta">
                <span class="saved-type">{{ getPromptTypeLabel(prompt.type) }}</span>
                <span class="saved-date">{{ prompt.savedAt }}</span>
              </div>
            </div>
            <div class="saved-actions">
              <button @click="loadSavedPrompt(prompt)" class="btn-icon load-btn" :title="$t('tools.storyPrompt.ui.load')">
                <i class="fas fa-upload"></i>
              </button>
              <button @click="removeSavedPrompt(index)" class="btn-icon remove-btn" :title="$t('tools.storyPrompt.ui.delete')">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="saved-controls">
          <button @click="showAllSaved" class="btn-secondary">
            <i class="fas fa-list"></i> {{ $t('tools.storyPrompt.ui.viewAll') }}
          </button>
          <button @click="clearSavedPrompts" class="btn-secondary">
            <i class="fas fa-trash"></i> {{ $t('tools.storyPrompt.ui.clearSaved') }}
          </button>
        </div>
      </div>

      <div class="writing-tools">
        <h4>{{ $t('tools.storyPrompt.ui.auxiliaryTools') }}</h4>
        <div class="tools-grid">
          <div class="tool-card">
            <h5>{{ $t('tools.storyPrompt.ui.plotGenerator') }}</h5>
            <p>{{ $t('tools.storyPrompt.ui.plotGeneratorDesc') }}</p>
            <button @click="generatePlotOutline" class="btn-secondary tool-btn">
              <i class="fas fa-sitemap"></i> {{ $t('tools.storyPrompt.ui.generateOutline') }}
            </button>
          </div>
          
          <div class="tool-card">
            <h5>{{ $t('tools.storyPrompt.ui.conflictMaker') }}</h5>
            <p>{{ $t('tools.storyPrompt.ui.conflictMakerDesc') }}</p>
            <button @click="generateConflict" class="btn-secondary tool-btn">
              <i class="fas fa-bolt"></i> {{ $t('tools.storyPrompt.ui.generateConflict') }}
            </button>
          </div>
          
          <div class="tool-card">
            <h5>{{ $t('tools.storyPrompt.ui.twistGenerator') }}</h5>
            <p>{{ $t('tools.storyPrompt.ui.twistGeneratorDesc') }}</p>
            <button @click="generateTwist" class="btn-secondary tool-btn">
              <i class="fas fa-surprise"></i> {{ $t('tools.storyPrompt.ui.generateTwist') }}
            </button>
          </div>
          
          <div class="tool-card">
            <h5>{{ $t('tools.storyPrompt.ui.environmentGenerator') }}</h5>
            <p>{{ $t('tools.storyPrompt.ui.environmentGeneratorDesc') }}</p>
            <button @click="generateEnvironment" class="btn-secondary tool-btn">
              <i class="fas fa-tree"></i> {{ $t('tools.storyPrompt.ui.describeScene') }}
            </button>
          </div>
        </div>
      </div>

      <div class="writing-statistics" v-if="generatedPrompts.length > 5">
        <h4>{{ $t('tools.storyPrompt.ui.writingStatistics') }}</h4>
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-value">{{ totalPrompts }}</div>
            <div class="stat-label">{{ $t('tools.storyPrompt.ui.totalGenerated') }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ favoriteGenre }}</div>
            <div class="stat-label">{{ $t('tools.storyPrompt.ui.favoriteGenre') }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ savedPrompts.length }}</div>
            <div class="stat-label">{{ $t('tools.storyPrompt.ui.savedCount') }}</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ averageComplexity }}</div>
            <div class="stat-label">{{ $t('tools.storyPrompt.ui.averageComplexity') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import messageService from '../../utils/message.js'

export default {
  name: 'StoryPrompt',
  setup() {
    const { t } = useI18n()
    const activeMode = ref('story')
    const selectedGenre = ref('all')
    const complexity = ref('medium')
    const promptCount = ref(3)
    const includeKeywords = ref(false)
    const keywords = ref('')
    const generatedPrompts = ref([])
    const savedPrompts = ref([])

    // 提示模板库
    const promptTemplates = {
      story: {
        simple: [
          '一个普通人发现了一个神秘的{item}，从此生活发生了翻天覆地的变化。',
          '在一个雨夜，{character}收到了一封来自{time}的信件。',
          '当{character}醒来时，发现整个世界只剩下自己一个人。',
          '一扇从未见过的门突然出现在{character}的房间里。'
        ],
        medium: [
          '在{place}的深处，{character}发现了一个隐藏了{time}的秘密，但揭开真相的代价可能是{sacrifice}。',
          '{character}必须在{deadline}之前完成一项看似不可能的任务，否则{consequence}。',
          '当{event}发生后，{character}开始质疑自己对{concept}的理解。'
        ],
        complex: [
          '在一个{setting}的世界里，{character}发现自己卷入了一场关于{theme}的阴谋，而{antagonist}的真实身份将颠覆一切。',
          '{character}拥有{ability}，但使用这种能力的代价是{cost}。当{crisis}降临时，{character}必须做出选择。'
        ]
      },
      character: {
        simple: [
          '一个{age}岁的{profession}，有着{trait}的性格特点。',
          '来自{place}的{character}，最大的秘密是{secret}。'
        ],
        medium: [
          '{character}是{profession}，因为{past_event}而变得{personality}，现在{goal}。',
          '表面上{character}是{appearance}，但实际上{reality}，{conflict}是其最大的挑战。'
        ],
        complex: [
          '{character}出生于{background}，童年时经历了{trauma}，这塑造了其{worldview}。现在面临{dilemma}的选择。'
        ]
      },
      world: {
        simple: [
          '一个{geography}为主的世界，那里{unique_feature}是常态。',
          '在{time_period}，{place}是一个{description}的地方。'
        ],
        medium: [
          '这个世界的{system}已经运行了{duration}，但{threat}的出现打破了平衡。',
          '{place}被{barrier}分为{number}个区域，每个区域都有{unique_rule}。'
        ],
        complex: [
          '在{cosmic_event}之后，{world}的{fundamental_law}发生了改变，导致{society}重新构建，而{mystery}仍然困扰着居民。'
        ]
      },
      dialogue: [
        '"我从来没想过会在这里遇见你。"',
        '"你确定这样做是对的吗？"',
        '"如果我告诉你一个秘密，你能保证不告诉任何人吗？"',
        '"时间到了，我们必须做出选择。"',
        '"这不是结束，而是另一个开始。"'
      ]
    }

    // 生成灵感提示
    const generatePrompts = async () => {
      generatedPrompts.value = []
      
      for (let i = 0; i < promptCount.value; i++) {
        const prompt = generateSinglePrompt()
        generatedPrompts.value.push(prompt)
      }
    }

    // 生成单个提示
    const generateSinglePrompt = async () => {
      const mode = activeMode.value
      let template, type
      
      if (mode === 'mixed') {
        const modes = ['story', 'character', 'world', 'dialogue']
        type = modes[Math.floor(Math.random() * modes.length)]
      } else {
        type = mode
      }
      
      if (type === 'dialogue') {
        template = promptTemplates.dialogue[Math.floor(Math.random() * promptTemplates.dialogue.length)]
      } else {
        const complexityTemplates = promptTemplates[type][complexity.value]
        template = complexityTemplates[Math.floor(Math.random() * complexityTemplates.length)]
      }
      
      const filledTemplate = fillTemplate(template)
      const keywordList = includeKeywords.value ? parseKeywords() : []
      
      return {
        type,
        genre: selectedGenre.value !== 'all' ? selectedGenre.value : getRandomGenre(),
        title: generateTitle(type),
        text: filledTemplate,
        keywords: keywordList,
        expanded: false,
        details: generateDetails(type),
        createdAt: new Date().toLocaleString()
      }
    }

    // 填充模板变量
    const fillTemplate = (template) => {
      const variables = {
        character: ['艾米丽', '杰克', '莉娜', '亚历克斯', '索菲亚'],
        place: ['古老的图书馆', '废弃的工厂', '神秘的森林', '地下洞穴', '高塔'],
        item: ['古老的钥匙', '发光的水晶', '神秘的地图', '破旧的日记', '奇怪的镜子'],
        time: ['十年前', '未来', '另一个时代', '平行宇宙', '梦境中'],
        event: ['日食', '地震', '流星雨', '时间停止', '重力消失'],
        profession: ['医生', '教师', '艺术家', '工程师', '记者'],
        trait: ['勇敢', '谨慎', '好奇', '固执', '善良'],
        age: [25, 30, 35, 40, 45],
        secret: ['拥有超能力', '来自未来', '失去记忆', '双重身份', '隐藏的过去']
      }
      
      let result = template
      
      for (const [key, values] of Object.entries(variables)) {
        const placeholder = `{${key}}`
        if (result.includes(placeholder)) {
          const randomValue = values[Math.floor(Math.random() * values.length)]
          result = result.replace(new RegExp(placeholder, 'g'), randomValue)
        }
      }
      
      return result
    }

    // 生成标题
    const generateTitle = (type) => {
      const titles = {
        story: ['神秘事件', '意外发现', '时间旅行', '平行世界', '失踪案件'],
        character: ['复杂人物', '双面人生', '隐藏身份', '成长故事', '救赎之路'],
        world: ['奇幻世界', '未来社会', '异次元', '后末日', '魔法王国'],
        dialogue: ['关键对话', '秘密揭露', '情感交流', '冲突爆发', '和解时刻']
      }
      
      const typeList = titles[type] || titles.story
      return typeList[Math.floor(Math.random() * typeList.length)]
    }

    // 生成详细信息
    const generateDetails = (type) => {
      const details = {
        story: {
          setting: '现代都市的一栋老式公寓',
          mood: '悬疑而略带恐怖',
          theme: '关于信任与背叛的探讨'
        },
        character: {
          background: '出生于中产阶级家庭',
          motivation: '寻找失踪的家人',
          conflict: '内心的道德冲突'
        },
        world: {
          rules: '魔法需要等价交换',
          society: '分层的贵族制度',
          threat: '来自异界的入侵'
        },
        dialogue: {
          context: '深夜的咖啡厅',
          emotion: '紧张而期待',
          subtext: '隐藏的爱意'
        }
      }
      
      return details[type] || details.story
    }

    // 解析关键词
    const parseKeywords = async () => {
      return keywords.value.split(',').map(k => k.trim()).filter(k => k)
    }

    // 获取随机类型
    const getRandomGenre = async () => {
      const genres = ['fantasy', 'scifi', 'romance', 'mystery', 'horror', 'adventure']
      return genres[Math.floor(Math.random() * genres.length)]
    }

    // 生成随机提示
    const generateRandomPrompt = async () => {
      const prompt = generateSinglePrompt()
      generatedPrompts.value = [prompt]
    }

    // 加载预设模板
    const loadPresetPrompts = async () => {
      const presets = [
        {
          type: 'story',
          genre: 'fantasy',
          title: '经典奇幻冒险',
          text: '一个年轻的村民发现自己是古老预言中的救世主，必须踏上危险的旅程来拯救世界。',
          keywords: ['预言', '救世主', '冒险', '魔法'],
          expanded: false,
          details: {
            setting: '中世纪奇幻世界',
            mood: '史诗般的冒险',
            theme: '成长与牺牲'
          }
        },
        {
          type: 'character',
          genre: 'mystery',
          title: '神秘侦探',
          text: '一位看似普通的图书管理员，实际上是一名经验丰富的私家侦探，专门解决超自然案件。',
          keywords: ['图书管理员', '侦探', '超自然', '秘密'],
          expanded: false,
          details: {
            background: '曾是警察，因事件退休',
            motivation: '寻求真相与正义',
            conflict: '理性与直觉的冲突'
          }
        }
      ]
      
      generatedPrompts.value = presets
    }

    // 切换提示展开状态
    const togglePromptExpansion = (prompt) => {
      prompt.expanded = !prompt.expanded
    }

    // 复制提示
    const copyPrompt = async (prompt) => {
      const text = `${prompt.title}\n\n${prompt.text}\n\n${t('tools.storyPrompt.ui.typeLabel')} ${getPromptTypeLabel(prompt.type)}\n${t('tools.storyPrompt.ui.categoryLabel')} ${getGenreLabel(prompt.genre)}`
      
      try {
        await navigator.clipboard.writeText(text)
        messageService.success(t('common.copied'))
      } catch (error) {
        console.error(t('tools.storyPrompt.ui.copyFailed') + ':', error)
      }
    }

    // 保存提示
    const savePrompt = (prompt) => {
      const savedPrompt = {
        ...prompt,
        savedAt: new Date().toLocaleString()
      }
      
      savedPrompts.value.push(savedPrompt)
      messageService.success(t('common.completed'))
    }

    // 扩展提示
    const extendPrompt = (prompt) => {
      const extensions = [
        '接下来会发生什么意想不到的转折？',
        '这个角色的内心世界是怎样的？',
        '背后隐藏着什么更深层的秘密？',
        '如果换一个角度来看这个故事...',
        '这个设定还可以延伸出什么支线？'
      ]
      
      const extension = extensions[Math.floor(Math.random() * extensions.length)]
      prompt.text += '\n\n🔍 延伸思考: ' + extension
    }

    // 删除提示
    const removePrompt = (index) => {
      generatedPrompts.value.splice(index, 1)
    }

    // 复制所有提示
    const copyAllPrompts = async () => {
      const allText = generatedPrompts.value.map((prompt, index) => 
        `${index + 1}. ${prompt.title}\n${prompt.text}\n`
      ).join('\n')
      
      try {
        await navigator.clipboard.writeText(allText)
        messageService.success(t('common.copied'))
      } catch (error) {
        console.error(t('tools.storyPrompt.ui.copyFailed') + ':', error)
      }
    }

    // 导出提示
    const exportPrompts = async () => {
      const exportData = {
        prompts: generatedPrompts.value,
        metadata: {
          mode: activeMode.value,
          genre: selectedGenre.value,
          complexity: complexity.value,
          exportedAt: new Date().toISOString()
        }
      }
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `writing_prompts_${new Date().toISOString().slice(0, 10)}.json`
      a.click()
      URL.revokeObjectURL(url)
    }

    // 清空提示
    const clearPrompts = async () => {
      if (await messageService.confirm(t('common.confirm'))) {
        generatedPrompts.value = []
      }
    }

    // 加载保存的提示
    const loadSavedPrompt = (prompt) => {
      generatedPrompts.value.unshift(prompt)
    }

    // 删除保存的提示
    const removeSavedPrompt = (index) => {
      savedPrompts.value.splice(index, 1)
    }

    // 显示所有保存的提示
    const showAllSaved = async () => {
      messageService.info(`${t('common.info')}: ${savedPrompts.value.length}`)
    }

    // 清空收藏
    const clearSavedPrompts = async () => {
      if (await messageService.confirm(t('common.confirm'))) {
        savedPrompts.value = []
      }
    }

    // 工具函数
    const generatePlotOutline = async () => {
      const outline = {
        type: 'story',
        title: '故事大纲',
        text: '开端：主角面临挑战\n发展：寻求解决方案，遇到障碍\n高潮：最终对决或重大发现\n结局：问题解决，主角成长',
        expanded: true,
        details: {
          structure: '三幕式结构',
          pacing: '张弛有度',
          hooks: '每章结尾留悬念'
        }
      }
      
      generatedPrompts.value.unshift(outline)
    }

    const generateConflict = async () => {
      const conflicts = [
        '内心冲突：道德与利益的选择',
        '人际冲突：朋友背叛或爱情三角',
        '环境冲突：自然灾害或社会动荡',
        '超自然冲突：诅咒或异次元威胁'
      ]
      
      const conflict = conflicts[Math.floor(Math.random() * conflicts.length)]
      const prompt = {
        type: 'story',
        title: '冲突设定',
        text: conflict,
        expanded: false
      }
      
      generatedPrompts.value.unshift(prompt)
    }

    const generateTwist = async () => {
      const twists = [
        '信任的角色实际上是反派',
        '整个故事发生在梦境或虚拟现实中',
        '主角拥有失忆前的秘密身份',
        '看似死去的角色实际上还活着',
        '时间线并非线性发展'
      ]
      
      const twist = twists[Math.floor(Math.random() * twists.length)]
      const prompt = {
        type: 'story',
        title: '情节转折',
        text: '🌟 转折点: ' + twist,
        expanded: false
      }
      
      generatedPrompts.value.unshift(prompt)
    }

    const generateEnvironment = async () => {
      const environments = [
        '阴雨绵绵的古老城堡，石墙上爬满了常春藤，空气中弥漫着湿润和神秘的味道。',
        '繁华都市的天台花园，霓虹灯闪烁，远处传来车流的声音，形成现代与自然的对比。',
        '废弃的工厂内部，生锈的机器静静矗立，阳光透过破损的窗户洒下斑驳的光影。',
        '深海底部的古老遗迹，发光的珊瑚照亮了神秘的建筑结构，鱼群在其间穿梭。'
      ]
      
      const env = environments[Math.floor(Math.random() * environments.length)]
      const prompt = {
        type: 'world',
        title: '环境描述',
        text: '🏞️ 场景: ' + env,
        expanded: false
      }
      
      generatedPrompts.value.unshift(prompt)
    }

    // 获取标签函数
    const getPromptTypeLabel = (type) => {
      const labels = {
        story: t('tools.storyPrompt.ui.storyPlot'),
        character: t('tools.storyPrompt.ui.characterSetting'),
        world: t('tools.storyPrompt.ui.worldBuilding'),
        dialogue: t('tools.storyPrompt.ui.dialogueScene')
      }
      return labels[type] || type
    }

    const getGenreLabel = (genre) => {
      const labels = {
        fantasy: t('tools.storyPrompt.ui.genreFantasy'),
        scifi: t('tools.storyPrompt.ui.genreScifi'),
        romance: t('tools.storyPrompt.ui.genreRomance'),
        mystery: t('tools.storyPrompt.ui.genreMystery'),
        horror: t('tools.storyPrompt.ui.genreHorror'),
        adventure: t('tools.storyPrompt.ui.genreAdventure'),
        drama: t('tools.storyPrompt.ui.genreDrama'),
        comedy: t('tools.storyPrompt.ui.genreComedy'),
        historical: t('tools.storyPrompt.ui.genreHistorical'),
        modern: t('tools.storyPrompt.ui.genreModern')
      }
      return labels[genre] || genre
    }

    const getDetailLabel = (key) => {
      const labels = {
        setting: t('tools.storyPrompt.ui.detailSetting'),
        mood: t('tools.storyPrompt.ui.detailMood'),
        theme: t('tools.storyPrompt.ui.detailTheme'),
        background: t('tools.storyPrompt.ui.detailBackground'),
        motivation: t('tools.storyPrompt.ui.detailMotivation'),
        conflict: t('tools.storyPrompt.ui.detailConflict'),
        rules: t('tools.storyPrompt.ui.detailRules'),
        society: t('tools.storyPrompt.ui.detailSociety'),
        threat: t('tools.storyPrompt.ui.detailThreat'),
        context: t('tools.storyPrompt.ui.detailContext'),
        emotion: t('tools.storyPrompt.ui.detailEmotion'),
        subtext: t('tools.storyPrompt.ui.detailSubtext')
      }
      return labels[key] || key
    }

    // 计算属性
    const totalPrompts = computed(() => generatedPrompts.value.length)

    const favoriteGenre = computed(() => {
      const genreCounts = {}
      generatedPrompts.value.forEach(prompt => {
        if (prompt.genre) {
          genreCounts[prompt.genre] = (genreCounts[prompt.genre] || 0) + 1
        }
      })
      
      let maxCount = 0
      let favorite = t('tools.storyPrompt.ui.none')
      for (const [genre, count] of Object.entries(genreCounts)) {
        if (count > maxCount) {
          maxCount = count
          favorite = getGenreLabel(genre)
        }
      }
      
      return favorite
    })

    const averageComplexity = computed(() => {
      const complexityMap = { simple: 1, medium: 2, complex: 3 }
      const avg = complexityMap[complexity.value]
      const labels = [
        t('tools.storyPrompt.ui.simple'),
        t('tools.storyPrompt.ui.medium'),
        t('tools.storyPrompt.ui.complex')
      ]
      return labels[avg - 1] || t('tools.storyPrompt.ui.medium')
    })

    return {
      activeMode,
      selectedGenre,
      complexity,
      promptCount,
      includeKeywords,
      keywords,
      generatedPrompts,
      savedPrompts,
      totalPrompts,
      favoriteGenre,
      averageComplexity,
      generatePrompts,
      generateRandomPrompt,
      loadPresetPrompts,
      togglePromptExpansion,
      copyPrompt,
      savePrompt,
      extendPrompt,
      removePrompt,
      copyAllPrompts,
      exportPrompts,
      clearPrompts,
      loadSavedPrompt,
      removeSavedPrompt,
      showAllSaved,
      clearSavedPrompts,
      generatePlotOutline,
      generateConflict,
      generateTwist,
      generateEnvironment,
      getPromptTypeLabel,
      getGenreLabel,
      getDetailLabel
    }
  }
}
</script>

<style scoped>
.story-prompt-tool {
  max-width: 1200px;
  margin: 0 auto;
}

.tool-header {
  text-align: center;
  margin-bottom: 10px;
  padding: 10px;
}

.tool-header h3 {
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.tool-header p {
  color: var(--text-secondary);
}

.control-tabs {
  display: flex;
  margin-bottom: 10px;
  border-bottom: 2px solid var(--border-color);
  flex-wrap: wrap;
}

.tab-btn {
  padding: 1rem 1.5rem;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 3px solid transparent;
  white-space: nowrap;
}

.tab-btn.active {
  color: var(--accent-color);
  border-bottom-color: var(--accent-color);
}

.tab-btn:hover {
  color: var(--accent-color);
}

.prompt-controls {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
}

.generation-settings {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.setting-group {
  display: flex;
  flex-direction: column;
}

.setting-group label {
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-primary);
}

.setting-group select,
.setting-group input[type="number"] {
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--bg-primary);
  color: var(--text-primary);
}

input[type="checkbox"] {
  width: 20px;
  margin-bottom: 0px;
}

.setting-group input[type="checkbox"] {
  width: 20px;
  height: 20px;
}

.keyword-input {
  margin-bottom: 1.5rem;
}

.keyword-input label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-primary);
}

.keywords-field {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--bg-primary);
  color: var(--text-primary);
}

.generate-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary {
  background: var(--accent-color);
  color: white;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}

.btn-secondary {
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  background: var(--accent-color);
  color: white;
}

.prompt-display {
  margin-bottom: 10px;
}

.prompt-display h4 {
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.3rem;
}

.prompts-list {
  margin-bottom: 10px;
}

.prompt-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 10px;
  transition: all 0.2s;
}

.prompt-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.prompt-card.expanded {
  border-color: var(--accent-color);
}

.prompt-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.prompt-type {
  background: var(--accent-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.prompt-genre {
  background: var(--bg-primary);
  color: var(--text-secondary);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.9rem;
  border: 1px solid var(--border-color);
}

.prompt-content {
  margin-bottom: 10px;
}

.prompt-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.prompt-text {
  color: var(--text-primary);
  line-height: 1.6;
  margin-bottom: 10px;
}

.prompt-details {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
}

.detail-section {
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.detail-section:last-child {
  margin-bottom: 0;
}

.prompt-keywords {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.keyword-label {
  color: var(--text-secondary);
  font-weight: 500;
}

.keyword-tag {
  background: var(--accent-color);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.prompt-actions {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.btn-icon {
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--bg-primary);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.btn-icon:hover {
  background: var(--accent-color);
  color: white;
}

.copy-btn:hover {
  background: #3498db;
  color: white;
}

.save-btn:hover {
  background: #e74c3c;
  color: white;
}

.extend-btn:hover {
  background: #27ae60;
  color: white;
}

.remove-btn:hover {
  background: #e67e22;
  color: white;
}

.prompt-batch-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.saved-prompts,
.writing-tools,
.writing-statistics {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 10px;
}

.saved-prompts h4,
.writing-tools h4,
.writing-statistics h4 {
  color: var(--text-primary);
  margin-bottom: 10px;
}

.saved-list {
  margin-bottom: 10px;
}

.saved-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 10px;
  border-bottom: 1px solid var(--border-color);
  transition: background-color 0.2s;
}

.saved-item:last-child {
  border-bottom: none;
}

.saved-item:hover {
  background: var(--bg-primary);
}

.saved-content {
  flex: 1;
}

.saved-title {
  font-weight: bold;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.saved-text {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.saved-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
}

.saved-type {
  color: var(--accent-color);
  font-weight: 500;
}

.saved-date {
  color: var(--text-secondary);
}

.saved-actions {
  display: flex;
  gap: 0.5rem;
}

.load-btn:hover {
  background: #27ae60;
  color: white;
}

.saved-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.tool-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
}

.tool-card h5 {
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.tool-card p {
  color: var(--text-secondary);
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.tool-btn {
  width: 100%;
  justify-content: center;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.stat-item {
  text-align: center;
  padding: 10px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: var(--accent-color);
  margin-bottom: 0.5rem;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 0.9rem;
}
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
