<template>
  <div class="devops-commands-tool">
    <div class="tool-header">
      <h3><i class="fas fa-terminal"></i> {{ $t('tools.devOpsCommands.ui.title') }}</h3>
      <p>{{ $t('tools.devOpsCommands.ui.description') }}</p>
    </div>

    <div class="tool-content">
      <div class="search-section">
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="$t('tools.devOpsCommands.ui.searchPlaceholder')"
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

      <div class="commands-list">
        <div
          v-for="command in filteredCommands"
          :key="command.id"
          class="command-card"
        >
          <div class="command-header">
            <h4>{{ command.name }}</h4>
            <button @click="copyCommand(command.command)" class="copy-btn" :title="$t('tools.devOpsCommands.ui.copyCommand')">
              <i class="fas fa-copy"></i>
            </button>
          </div>
          <div class="command-code">
            <code>{{ command.command }}</code>
          </div>
          <div class="command-description">{{ command.description }}</div>
          <div v-if="command.example" class="command-example">
            <h5>{{ $t('tools.devOpsCommands.ui.example') }}</h5>
            <div class="example-code">
              <code>{{ command.example }}</code>
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
  name: 'DevOpsCommands',
  setup() {
    const { t } = useI18n()
    const searchQuery = ref('')
    const activeCategory = ref('all')

    const categories = computed(() => [
      { id: 'all', name: t('tools.devOpsCommands.ui.categoryAll'), icon: 'fas fa-list' },
      { id: 'port', name: t('tools.devOpsCommands.ui.categoryPort'), icon: 'fas fa-network-wired' },
      { id: 'file', name: t('tools.devOpsCommands.ui.categoryFile'), icon: 'fas fa-file-archive' },
      { id: 'git', name: t('tools.devOpsCommands.ui.categoryGit'), icon: 'fab fa-git-alt' },
      { id: 'cicd', name: t('tools.devOpsCommands.ui.categoryCICD'), icon: 'fas fa-code-branch' },
      { id: 'network', name: t('tools.devOpsCommands.ui.categoryNetwork'), icon: 'fas fa-wifi' },
      { id: 'system', name: t('tools.devOpsCommands.ui.categorySystem'), icon: 'fas fa-server' },
      { id: 'process', name: t('tools.devOpsCommands.ui.categoryProcess'), icon: 'fas fa-tasks' },
      { id: 'log', name: t('tools.devOpsCommands.ui.categoryLog'), icon: 'fas fa-file-alt' },
      { id: 'permission', name: t('tools.devOpsCommands.ui.categoryPermission'), icon: 'fas fa-shield-alt' },
      { id: 'service', name: t('tools.devOpsCommands.ui.categoryService'), icon: 'fas fa-cogs' },
      { id: 'text', name: t('tools.devOpsCommands.ui.categoryText'), icon: 'fas fa-file-alt' },
      { id: 'package', name: t('tools.devOpsCommands.ui.categoryPackage'), icon: 'fas fa-box' },
      { id: 'database', name: t('tools.devOpsCommands.ui.categoryDatabase'), icon: 'fas fa-database' },
      { id: 'cron', name: t('tools.devOpsCommands.ui.categoryCron'), icon: 'fas fa-clock' }
    ])

    const commands = computed(() => {
      return [
        // 端口/进程管理
        { id: 1, category: 'port', name: t('tools.devOpsCommands.ui.commands.port1.name'), command: 'lsof -i :端口号', description: t('tools.devOpsCommands.ui.commands.port1.description'), example: 'lsof -i :3000' },
        { id: 2, category: 'port', name: t('tools.devOpsCommands.ui.commands.port2.name'), command: 'lsof -i tcp:端口号', description: t('tools.devOpsCommands.ui.commands.port2.description'), example: 'lsof -i tcp:8080' },
        { id: 3, category: 'port', name: t('tools.devOpsCommands.ui.commands.port3.name'), command: 'netstat -an | grep 端口号', description: t('tools.devOpsCommands.ui.commands.port3.description'), example: 'netstat -an | grep 3000' },
        { id: 4, category: 'port', name: t('tools.devOpsCommands.ui.commands.port4.name'), command: 'kill -9 PID', description: t('tools.devOpsCommands.ui.commands.port4.description'), example: 'kill -9 12345' },
        { id: 5, category: 'port', name: t('tools.devOpsCommands.ui.commands.port5.name'), command: 'killall 进程名', description: t('tools.devOpsCommands.ui.commands.port5.description'), example: 'killall node' },
        { id: 6, category: 'port', name: t('tools.devOpsCommands.ui.commands.port6.name'), command: 'ps aux | grep 进程名', description: t('tools.devOpsCommands.ui.commands.port6.description'), example: 'ps aux | grep node' },
        { id: 7, category: 'port', name: t('tools.devOpsCommands.ui.commands.port7.name'), command: 'lsof -ti:端口号 | xargs kill -9', description: t('tools.devOpsCommands.ui.commands.port7.description'), example: 'lsof -ti:3000 | xargs kill -9' },
        
        // 文件压缩解压
        { id: 8, category: 'file', name: t('tools.devOpsCommands.ui.commands.file1.name'), command: 'tar -zxvf 文件名.tar.gz', description: t('tools.devOpsCommands.ui.commands.file1.description'), example: 'tar -zxvf archive.tar.gz' },
        { id: 9, category: 'file', name: t('tools.devOpsCommands.ui.commands.file2.name'), command: 'tar -zcvf 压缩包名.tar.gz 目录名', description: t('tools.devOpsCommands.ui.commands.file2.description'), example: 'tar -zcvf backup.tar.gz ./project' },
        { id: 10, category: 'file', name: t('tools.devOpsCommands.ui.commands.file3.name'), command: 'tar -xvf 文件名.tar', description: t('tools.devOpsCommands.ui.commands.file3.description'), example: 'tar -xvf archive.tar' },
        { id: 11, category: 'file', name: t('tools.devOpsCommands.ui.commands.file4.name'), command: 'tar -cvf 压缩包名.tar 目录名', description: t('tools.devOpsCommands.ui.commands.file4.description'), example: 'tar -cvf backup.tar ./project' },
        { id: 12, category: 'file', name: t('tools.devOpsCommands.ui.commands.file5.name'), command: 'zip -r 压缩包名.zip 目录名', description: t('tools.devOpsCommands.ui.commands.file5.description'), example: 'zip -r project.zip ./project' },
        { id: 13, category: 'file', name: t('tools.devOpsCommands.ui.commands.file6.name'), command: 'unzip 文件名.zip', description: t('tools.devOpsCommands.ui.commands.file6.description'), example: 'unzip archive.zip' },
        { id: 14, category: 'file', name: t('tools.devOpsCommands.ui.commands.file7.name'), command: 'unzip -d 目标目录 文件名.zip', description: t('tools.devOpsCommands.ui.commands.file7.description'), example: 'unzip -d ./extract archive.zip' },
        { id: 15, category: 'file', name: t('tools.devOpsCommands.ui.commands.file8.name'), command: 'gzip 文件名', description: t('tools.devOpsCommands.ui.commands.file8.description'), example: 'gzip file.txt' },
        { id: 16, category: 'file', name: t('tools.devOpsCommands.ui.commands.file9.name'), command: 'gunzip 文件名.gz', description: t('tools.devOpsCommands.ui.commands.file9.description'), example: 'gunzip file.txt.gz' },
        { id: 17, category: 'file', name: t('tools.devOpsCommands.ui.commands.file10.name'), command: 'find . -name "文件名"', description: t('tools.devOpsCommands.ui.commands.file10.description'), example: 'find . -name "*.log"' },
        { id: 18, category: 'file', name: t('tools.devOpsCommands.ui.commands.file11.name'), command: 'find . -type f -size +100M', description: t('tools.devOpsCommands.ui.commands.file11.description'), example: 'find . -type f -size +100M' },
        
        // Git 命令
        { id: 19, category: 'git', name: t('tools.devOpsCommands.ui.commands.git1.name'), command: 'git status', description: t('tools.devOpsCommands.ui.commands.git1.description'), example: 'git status' },
        { id: 20, category: 'git', name: t('tools.devOpsCommands.ui.commands.git2.name'), command: 'git add .', description: t('tools.devOpsCommands.ui.commands.git2.description'), example: 'git add .' },
        { id: 21, category: 'git', name: t('tools.devOpsCommands.ui.commands.git3.name'), command: 'git commit -m "提交信息"', description: t('tools.devOpsCommands.ui.commands.git3.description'), example: 'git commit -m "feat: add new feature"' },
        { id: 22, category: 'git', name: t('tools.devOpsCommands.ui.commands.git4.name'), command: 'git push origin 分支名', description: t('tools.devOpsCommands.ui.commands.git4.description'), example: 'git push origin main' },
        { id: 23, category: 'git', name: t('tools.devOpsCommands.ui.commands.git5.name'), command: 'git pull origin 分支名', description: t('tools.devOpsCommands.ui.commands.git5.description'), example: 'git pull origin main' },
        { id: 24, category: 'git', name: t('tools.devOpsCommands.ui.commands.git6.name'), command: 'git branch', description: t('tools.devOpsCommands.ui.commands.git6.description'), example: 'git branch' },
        { id: 25, category: 'git', name: t('tools.devOpsCommands.ui.commands.git7.name'), command: 'git checkout 分支名', description: t('tools.devOpsCommands.ui.commands.git7.description'), example: 'git checkout develop' },
        { id: 26, category: 'git', name: t('tools.devOpsCommands.ui.commands.git8.name'), command: 'git checkout -b 新分支名', description: t('tools.devOpsCommands.ui.commands.git8.description'), example: 'git checkout -b feature/new-feature' },
        { id: 27, category: 'git', name: t('tools.devOpsCommands.ui.commands.git9.name'), command: 'git merge 分支名', description: t('tools.devOpsCommands.ui.commands.git9.description'), example: 'git merge develop' },
        { id: 28, category: 'git', name: t('tools.devOpsCommands.ui.commands.git10.name'), command: 'git log', description: t('tools.devOpsCommands.ui.commands.git10.description'), example: 'git log' },
        { id: 29, category: 'git', name: t('tools.devOpsCommands.ui.commands.git11.name'), command: 'git log --oneline', description: t('tools.devOpsCommands.ui.commands.git11.description'), example: 'git log --oneline' },
        { id: 30, category: 'git', name: t('tools.devOpsCommands.ui.commands.git12.name'), command: 'git diff', description: t('tools.devOpsCommands.ui.commands.git12.description'), example: 'git diff' },
        { id: 31, category: 'git', name: t('tools.devOpsCommands.ui.commands.git13.name'), command: 'git stash', description: t('tools.devOpsCommands.ui.commands.git13.description'), example: 'git stash' },
        { id: 32, category: 'git', name: t('tools.devOpsCommands.ui.commands.git14.name'), command: 'git stash pop', description: t('tools.devOpsCommands.ui.commands.git14.description'), example: 'git stash pop' },
        { id: 33, category: 'git', name: t('tools.devOpsCommands.ui.commands.git15.name'), command: 'git reset --hard HEAD', description: t('tools.devOpsCommands.ui.commands.git15.description'), example: 'git reset --hard HEAD' },
        { id: 34, category: 'git', name: t('tools.devOpsCommands.ui.commands.git16.name'), command: 'git remote -v', description: t('tools.devOpsCommands.ui.commands.git16.description'), example: 'git remote -v' },
        { id: 35, category: 'git', name: t('tools.devOpsCommands.ui.commands.git17.name'), command: 'git clone 仓库地址', description: t('tools.devOpsCommands.ui.commands.git17.description'), example: 'git clone https://github.com/user/repo.git' },
        { id: 36, category: 'git', name: t('tools.devOpsCommands.ui.commands.git18.name'), command: 'git tag -a v1.0.0 -m "版本信息"', description: t('tools.devOpsCommands.ui.commands.git18.description'), example: 'git tag -a v1.0.0 -m "Release v1.0.0"' },
        { id: 37, category: 'git', name: t('tools.devOpsCommands.ui.commands.git19.name'), command: 'git push --tags', description: t('tools.devOpsCommands.ui.commands.git19.description'), example: 'git push --tags' },
        { id: 38, category: 'git', name: t('tools.devOpsCommands.ui.commands.git20.name'), command: 'git rebase 分支名', description: t('tools.devOpsCommands.ui.commands.git20.description'), example: 'git rebase main' },
        
        // CI/CD 相关
        { id: 39, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd1.name'), command: 'npm run build', description: t('tools.devOpsCommands.ui.commands.cicd1.description'), example: 'npm run build' },
        { id: 40, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd2.name'), command: 'npm run test', description: t('tools.devOpsCommands.ui.commands.cicd2.description'), example: 'npm run test' },
        { id: 41, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd3.name'), command: 'npm ci', description: t('tools.devOpsCommands.ui.commands.cicd3.description'), example: 'npm ci' },
        { id: 42, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd4.name'), command: 'yarn build', description: t('tools.devOpsCommands.ui.commands.cicd4.description'), example: 'yarn build' },
        { id: 43, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd5.name'), command: 'yarn install --frozen-lockfile', description: t('tools.devOpsCommands.ui.commands.cicd5.description'), example: 'yarn install --frozen-lockfile' },
        { id: 44, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd6.name'), command: 'docker build -t 镜像名 .', description: t('tools.devOpsCommands.ui.commands.cicd6.description'), example: 'docker build -t myapp:latest .' },
        { id: 45, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd7.name'), command: 'docker run -d -p 端口:端口 镜像名', description: t('tools.devOpsCommands.ui.commands.cicd7.description'), example: 'docker run -d -p 3000:3000 myapp:latest' },
        { id: 46, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd8.name'), command: 'docker ps', description: t('tools.devOpsCommands.ui.commands.cicd8.description'), example: 'docker ps' },
        { id: 47, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd9.name'), command: 'docker stop 容器ID', description: t('tools.devOpsCommands.ui.commands.cicd9.description'), example: 'docker stop abc123' },
        { id: 48, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd10.name'), command: 'docker-compose up -d', description: t('tools.devOpsCommands.ui.commands.cicd10.description'), example: 'docker-compose up -d' },
        { id: 49, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd11.name'), command: 'docker-compose down', description: t('tools.devOpsCommands.ui.commands.cicd11.description'), example: 'docker-compose down' },
        { id: 50, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd12.name'), command: 'kubectl get pods', description: t('tools.devOpsCommands.ui.commands.cicd12.description'), example: 'kubectl get pods' },
        { id: 51, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd13.name'), command: 'kubectl apply -f 配置文件.yaml', description: t('tools.devOpsCommands.ui.commands.cicd13.description'), example: 'kubectl apply -f deployment.yaml' },
        { id: 52, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd14.name'), command: 'kubectl logs pod名称', description: t('tools.devOpsCommands.ui.commands.cicd14.description'), example: 'kubectl logs myapp-pod' },
        
        // 网络相关
        { id: 53, category: 'network', name: t('tools.devOpsCommands.ui.commands.network1.name'), command: 'ping 域名或IP', description: t('tools.devOpsCommands.ui.commands.network1.description'), example: 'ping google.com' },
        { id: 54, category: 'network', name: t('tools.devOpsCommands.ui.commands.network2.name'), command: 'curl -I URL', description: t('tools.devOpsCommands.ui.commands.network2.description'), example: 'curl -I https://example.com' },
        { id: 55, category: 'network', name: t('tools.devOpsCommands.ui.commands.network3.name'), command: 'curl -X POST URL -d "数据"', description: t('tools.devOpsCommands.ui.commands.network3.description'), example: 'curl -X POST https://api.example.com -d "key=value"' },
        { id: 56, category: 'network', name: t('tools.devOpsCommands.ui.commands.network4.name'), command: 'wget URL', description: t('tools.devOpsCommands.ui.commands.network4.description'), example: 'wget https://example.com/file.zip' },
        { id: 57, category: 'network', name: t('tools.devOpsCommands.ui.commands.network5.name'), command: 'ifconfig', description: t('tools.devOpsCommands.ui.commands.network5.description'), example: 'ifconfig' },
        { id: 58, category: 'network', name: t('tools.devOpsCommands.ui.commands.network6.name'), command: 'ip addr show', description: t('tools.devOpsCommands.ui.commands.network6.description'), example: 'ip addr show' },
        { id: 59, category: 'network', name: t('tools.devOpsCommands.ui.commands.network7.name'), command: 'nslookup 域名', description: t('tools.devOpsCommands.ui.commands.network7.description'), example: 'nslookup google.com' },
        { id: 60, category: 'network', name: t('tools.devOpsCommands.ui.commands.network8.name'), command: 'dig 域名', description: t('tools.devOpsCommands.ui.commands.network8.description'), example: 'dig google.com' },
        { id: 61, category: 'network', name: t('tools.devOpsCommands.ui.commands.network9.name'), command: 'traceroute 域名或IP', description: t('tools.devOpsCommands.ui.commands.network9.description'), example: 'traceroute google.com' },
        { id: 62, category: 'network', name: t('tools.devOpsCommands.ui.commands.network10.name'), command: 'netstat -tuln', description: t('tools.devOpsCommands.ui.commands.network10.description'), example: 'netstat -tuln' },
        
        // 系统信息
        { id: 63, category: 'system', name: t('tools.devOpsCommands.ui.commands.system1.name'), command: 'top', description: t('tools.devOpsCommands.ui.commands.system1.description'), example: 'top' },
        { id: 64, category: 'system', name: t('tools.devOpsCommands.ui.commands.system2.name'), command: 'htop', description: t('tools.devOpsCommands.ui.commands.system2.description'), example: 'htop' },
        { id: 65, category: 'system', name: t('tools.devOpsCommands.ui.commands.system3.name'), command: 'df -h', description: t('tools.devOpsCommands.ui.commands.system3.description'), example: 'df -h' },
        { id: 66, category: 'system', name: t('tools.devOpsCommands.ui.commands.system4.name'), command: 'du -sh 目录名', description: t('tools.devOpsCommands.ui.commands.system4.description'), example: 'du -sh ./project' },
        { id: 67, category: 'system', name: t('tools.devOpsCommands.ui.commands.system5.name'), command: 'free -h', description: t('tools.devOpsCommands.ui.commands.system5.description'), example: 'free -h' },
        { id: 68, category: 'system', name: t('tools.devOpsCommands.ui.commands.system6.name'), command: 'uname -a', description: t('tools.devOpsCommands.ui.commands.system6.description'), example: 'uname -a' },
        { id: 69, category: 'system', name: t('tools.devOpsCommands.ui.commands.system7.name'), command: 'uptime', description: t('tools.devOpsCommands.ui.commands.system7.description'), example: 'uptime' },
        { id: 70, category: 'system', name: t('tools.devOpsCommands.ui.commands.system8.name'), command: 'whoami', description: t('tools.devOpsCommands.ui.commands.system8.description'), example: 'whoami' },
        { id: 71, category: 'system', name: t('tools.devOpsCommands.ui.commands.system9.name'), command: 'hostname', description: t('tools.devOpsCommands.ui.commands.system9.description'), example: 'hostname' },
        { id: 72, category: 'system', name: t('tools.devOpsCommands.ui.commands.system10.name'), command: 'cat /etc/os-release', description: t('tools.devOpsCommands.ui.commands.system10.description'), example: 'cat /etc/os-release' },
        
        // 进程管理
        { id: 73, category: 'process', name: t('tools.devOpsCommands.ui.commands.process1.name'), command: 'ps aux', description: t('tools.devOpsCommands.ui.commands.process1.description'), example: 'ps aux' },
        { id: 74, category: 'process', name: t('tools.devOpsCommands.ui.commands.process2.name'), command: 'ps -ef | grep 进程名', description: t('tools.devOpsCommands.ui.commands.process2.description'), example: 'ps -ef | grep node' },
        { id: 75, category: 'process', name: t('tools.devOpsCommands.ui.commands.process3.name'), command: 'pgrep 进程名', description: t('tools.devOpsCommands.ui.commands.process3.description'), example: 'pgrep node' },
        { id: 76, category: 'process', name: t('tools.devOpsCommands.ui.commands.process4.name'), command: 'pkill 进程名', description: t('tools.devOpsCommands.ui.commands.process4.description'), example: 'pkill node' },
        { id: 77, category: 'process', name: t('tools.devOpsCommands.ui.commands.process5.name'), command: 'nohup 命令 &', description: t('tools.devOpsCommands.ui.commands.process5.description'), example: 'nohup node app.js &' },
        { id: 78, category: 'process', name: t('tools.devOpsCommands.ui.commands.process6.name'), command: 'jobs', description: t('tools.devOpsCommands.ui.commands.process6.description'), example: 'jobs' },
        { id: 79, category: 'process', name: t('tools.devOpsCommands.ui.commands.process7.name'), command: 'fg %作业号', description: t('tools.devOpsCommands.ui.commands.process7.description'), example: 'fg %1' },
        { id: 80, category: 'process', name: t('tools.devOpsCommands.ui.commands.process8.name'), command: 'bg %作业号', description: t('tools.devOpsCommands.ui.commands.process8.description'), example: 'bg %1' },
        
        // 日志查看
        { id: 81, category: 'log', name: t('tools.devOpsCommands.ui.commands.log1.name'), command: 'tail -f 日志文件', description: t('tools.devOpsCommands.ui.commands.log1.description'), example: 'tail -f /var/log/app.log' },
        { id: 82, category: 'log', name: t('tools.devOpsCommands.ui.commands.log2.name'), command: 'tail -n 行数 日志文件', description: t('tools.devOpsCommands.ui.commands.log2.description'), example: 'tail -n 100 /var/log/app.log' },
        { id: 83, category: 'log', name: t('tools.devOpsCommands.ui.commands.log3.name'), command: 'head -n 行数 日志文件', description: t('tools.devOpsCommands.ui.commands.log3.description'), example: 'head -n 50 /var/log/app.log' },
        { id: 84, category: 'log', name: t('tools.devOpsCommands.ui.commands.log4.name'), command: 'less 日志文件', description: t('tools.devOpsCommands.ui.commands.log4.description'), example: 'less /var/log/app.log' },
        { id: 85, category: 'log', name: t('tools.devOpsCommands.ui.commands.log5.name'), command: 'grep "关键词" 日志文件', description: t('tools.devOpsCommands.ui.commands.log5.description'), example: 'grep "ERROR" /var/log/app.log' },
        { id: 86, category: 'log', name: t('tools.devOpsCommands.ui.commands.log6.name'), command: 'journalctl -u 服务名', description: t('tools.devOpsCommands.ui.commands.log6.description'), example: 'journalctl -u nginx' },
        { id: 87, category: 'log', name: t('tools.devOpsCommands.ui.commands.log7.name'), command: 'journalctl -f', description: t('tools.devOpsCommands.ui.commands.log7.description'), example: 'journalctl -f' },
        
        // 权限管理
        { id: 88, category: 'permission', name: t('tools.devOpsCommands.ui.commands.permission1.name'), command: 'chmod 755 文件名', description: t('tools.devOpsCommands.ui.commands.permission1.description'), example: 'chmod 755 script.sh' },
        { id: 89, category: 'permission', name: t('tools.devOpsCommands.ui.commands.permission2.name'), command: 'chmod +x 文件名', description: t('tools.devOpsCommands.ui.commands.permission2.description'), example: 'chmod +x script.sh' },
        { id: 90, category: 'permission', name: t('tools.devOpsCommands.ui.commands.permission3.name'), command: 'chown 用户:组 文件名', description: t('tools.devOpsCommands.ui.commands.permission3.description'), example: 'chown user:group file.txt' },
        { id: 91, category: 'permission', name: t('tools.devOpsCommands.ui.commands.permission4.name'), command: 'sudo 命令', description: t('tools.devOpsCommands.ui.commands.permission4.description'), example: 'sudo apt update' },
        { id: 92, category: 'permission', name: t('tools.devOpsCommands.ui.commands.permission5.name'), command: 'su - 用户名', description: t('tools.devOpsCommands.ui.commands.permission5.description'), example: 'su - root' },
        { id: 93, category: 'permission', name: t('tools.devOpsCommands.ui.commands.permission6.name'), command: 'ls -la', description: t('tools.devOpsCommands.ui.commands.permission6.description'), example: 'ls -la' },
        { id: 94, category: 'permission', name: t('tools.devOpsCommands.ui.commands.permission7.name'), command: 'umask', description: t('tools.devOpsCommands.ui.commands.permission7.description'), example: 'umask' },
        
        // 其他常用命令
        { id: 95, category: 'system', name: t('tools.devOpsCommands.ui.commands.system11.name'), command: 'history', description: t('tools.devOpsCommands.ui.commands.system11.description'), example: 'history' },
        { id: 96, category: 'system', name: t('tools.devOpsCommands.ui.commands.system12.name'), command: 'alias 别名="命令"', description: t('tools.devOpsCommands.ui.commands.system12.description'), example: 'alias ll="ls -la"' },
        { id: 97, category: 'file', name: t('tools.devOpsCommands.ui.commands.file12.name'), command: 'rsync -av 源目录/ 目标目录/', description: t('tools.devOpsCommands.ui.commands.file12.description'), example: 'rsync -av ./src/ ./backup/' },
        { id: 98, category: 'file', name: t('tools.devOpsCommands.ui.commands.file13.name'), command: 'scp 源文件 用户@主机:目标路径', description: t('tools.devOpsCommands.ui.commands.file13.description'), example: 'scp file.txt user@server:/home/user/' },
        { id: 99, category: 'network', name: t('tools.devOpsCommands.ui.commands.network11.name'), command: 'ssh 用户@主机', description: t('tools.devOpsCommands.ui.commands.network11.description'), example: 'ssh user@example.com' },
        { id: 100, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd15.name'), command: 'npm version patch|minor|major', description: t('tools.devOpsCommands.ui.commands.cicd15.description'), example: 'npm version patch' },
        
        // 更多Git命令
        { id: 101, category: 'git', name: t('tools.devOpsCommands.ui.commands.git21.name'), command: 'git cherry-pick 提交ID', description: t('tools.devOpsCommands.ui.commands.git21.description'), example: 'git cherry-pick abc123' },
        { id: 102, category: 'git', name: t('tools.devOpsCommands.ui.commands.git22.name'), command: 'git revert 提交ID', description: t('tools.devOpsCommands.ui.commands.git22.description'), example: 'git revert abc123' },
        { id: 103, category: 'git', name: t('tools.devOpsCommands.ui.commands.git23.name'), command: 'git reset --soft HEAD~1', description: t('tools.devOpsCommands.ui.commands.git23.description'), example: 'git reset --soft HEAD~1' },
        { id: 104, category: 'git', name: t('tools.devOpsCommands.ui.commands.git24.name'), command: 'git reset --mixed HEAD~1', description: t('tools.devOpsCommands.ui.commands.git24.description'), example: 'git reset --mixed HEAD~1' },
        { id: 105, category: 'git', name: t('tools.devOpsCommands.ui.commands.git25.name'), command: 'git clean -fd', description: t('tools.devOpsCommands.ui.commands.git25.description'), example: 'git clean -fd' },
        { id: 106, category: 'git', name: t('tools.devOpsCommands.ui.commands.git26.name'), command: 'git fetch origin', description: t('tools.devOpsCommands.ui.commands.git26.description'), example: 'git fetch origin' },
        { id: 107, category: 'git', name: t('tools.devOpsCommands.ui.commands.git27.name'), command: 'git pull --rebase', description: t('tools.devOpsCommands.ui.commands.git27.description'), example: 'git pull --rebase' },
        { id: 108, category: 'git', name: t('tools.devOpsCommands.ui.commands.git28.name'), command: 'git log --graph --oneline --all', description: t('tools.devOpsCommands.ui.commands.git28.description'), example: 'git log --graph --oneline --all' },
        { id: 109, category: 'git', name: t('tools.devOpsCommands.ui.commands.git29.name'), command: 'git show 提交ID', description: t('tools.devOpsCommands.ui.commands.git29.description'), example: 'git show abc123' },
        { id: 110, category: 'git', name: t('tools.devOpsCommands.ui.commands.git30.name'), command: 'git blame 文件名', description: t('tools.devOpsCommands.ui.commands.git30.description'), example: 'git blame app.js' },
        { id: 111, category: 'git', name: t('tools.devOpsCommands.ui.commands.git31.name'), command: 'git submodule update --init --recursive', description: t('tools.devOpsCommands.ui.commands.git31.description'), example: 'git submodule update --init --recursive' },
        { id: 112, category: 'git', name: t('tools.devOpsCommands.ui.commands.git32.name'), command: 'git stash list', description: t('tools.devOpsCommands.ui.commands.git32.description'), example: 'git stash list' },
        { id: 113, category: 'git', name: t('tools.devOpsCommands.ui.commands.git33.name'), command: 'git stash drop', description: t('tools.devOpsCommands.ui.commands.git33.description'), example: 'git stash drop' },
        { id: 114, category: 'git', name: t('tools.devOpsCommands.ui.commands.git34.name'), command: 'git remote add origin URL', description: t('tools.devOpsCommands.ui.commands.git34.description'), example: 'git remote add origin https://github.com/user/repo.git' },
        { id: 115, category: 'git', name: t('tools.devOpsCommands.ui.commands.git35.name'), command: 'git branch -d 分支名', description: t('tools.devOpsCommands.ui.commands.git35.description'), example: 'git branch -d feature/old' },
        { id: 116, category: 'git', name: t('tools.devOpsCommands.ui.commands.git36.name'), command: 'git branch -D 分支名', description: t('tools.devOpsCommands.ui.commands.git36.description'), example: 'git branch -D feature/old' },
        { id: 117, category: 'git', name: t('tools.devOpsCommands.ui.commands.git37.name'), command: 'git push origin --delete 分支名', description: t('tools.devOpsCommands.ui.commands.git37.description'), example: 'git push origin --delete feature/old' },
        { id: 118, category: 'git', name: t('tools.devOpsCommands.ui.commands.git38.name'), command: 'git config --global user.name "名字"', description: t('tools.devOpsCommands.ui.commands.git38.description'), example: 'git config --global user.name "John Doe"' },
        { id: 119, category: 'git', name: t('tools.devOpsCommands.ui.commands.git39.name'), command: 'git config --global user.email "邮箱"', description: t('tools.devOpsCommands.ui.commands.git39.description'), example: 'git config --global user.email "john@example.com"' },
        { id: 120, category: 'git', name: t('tools.devOpsCommands.ui.commands.git40.name'), command: 'git log --since="2 weeks ago"', description: t('tools.devOpsCommands.ui.commands.git40.description'), example: 'git log --since="2 weeks ago"' },
        
        // 更多Docker命令
        { id: 121, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd16.name'), command: 'docker ps -a', description: t('tools.devOpsCommands.ui.commands.cicd16.description'), example: 'docker ps -a' },
        { id: 122, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd17.name'), command: 'docker images', description: t('tools.devOpsCommands.ui.commands.cicd17.description'), example: 'docker images' },
        { id: 123, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd18.name'), command: 'docker exec -it 容器ID /bin/bash', description: t('tools.devOpsCommands.ui.commands.cicd18.description'), example: 'docker exec -it abc123 /bin/bash' },
        { id: 124, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd19.name'), command: 'docker logs 容器ID', description: t('tools.devOpsCommands.ui.commands.cicd19.description'), example: 'docker logs abc123' },
        { id: 125, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd20.name'), command: 'docker logs -f 容器ID', description: t('tools.devOpsCommands.ui.commands.cicd20.description'), example: 'docker logs -f abc123' },
        { id: 126, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd21.name'), command: 'docker rm 容器ID', description: t('tools.devOpsCommands.ui.commands.cicd21.description'), example: 'docker rm abc123' },
        { id: 127, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd22.name'), command: 'docker rmi 镜像ID', description: t('tools.devOpsCommands.ui.commands.cicd22.description'), example: 'docker rmi def456' },
        { id: 128, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd23.name'), command: 'docker pull 镜像名', description: t('tools.devOpsCommands.ui.commands.cicd23.description'), example: 'docker pull nginx:latest' },
        { id: 129, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd24.name'), command: 'docker push 镜像名', description: t('tools.devOpsCommands.ui.commands.cicd24.description'), example: 'docker push myapp:latest' },
        { id: 130, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd25.name'), command: 'docker-compose logs', description: t('tools.devOpsCommands.ui.commands.cicd25.description'), example: 'docker-compose logs' },
        { id: 131, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd26.name'), command: 'docker-compose ps', description: t('tools.devOpsCommands.ui.commands.cicd26.description'), example: 'docker-compose ps' },
        { id: 132, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd27.name'), command: 'docker-compose restart', description: t('tools.devOpsCommands.ui.commands.cicd27.description'), example: 'docker-compose restart' },
        { id: 133, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd28.name'), command: 'docker system prune -a', description: t('tools.devOpsCommands.ui.commands.cicd28.description'), example: 'docker system prune -a' },
        
        // 更多Kubernetes命令
        { id: 134, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd29.name'), command: 'kubectl get nodes', description: t('tools.devOpsCommands.ui.commands.cicd29.description'), example: 'kubectl get nodes' },
        { id: 135, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd30.name'), command: 'kubectl get services', description: t('tools.devOpsCommands.ui.commands.cicd30.description'), example: 'kubectl get services' },
        { id: 136, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd31.name'), command: 'kubectl get deployments', description: t('tools.devOpsCommands.ui.commands.cicd31.description'), example: 'kubectl get deployments' },
        { id: 137, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd32.name'), command: 'kubectl describe pod pod名称', description: t('tools.devOpsCommands.ui.commands.cicd32.description'), example: 'kubectl describe pod myapp-pod' },
        { id: 138, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd33.name'), command: 'kubectl exec -it pod名称 -- /bin/bash', description: t('tools.devOpsCommands.ui.commands.cicd33.description'), example: 'kubectl exec -it myapp-pod -- /bin/bash' },
        { id: 139, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd34.name'), command: 'kubectl delete pod pod名称', description: t('tools.devOpsCommands.ui.commands.cicd34.description'), example: 'kubectl delete pod myapp-pod' },
        { id: 140, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd35.name'), command: 'kubectl port-forward pod名称 本地端口:容器端口', description: t('tools.devOpsCommands.ui.commands.cicd35.description'), example: 'kubectl port-forward myapp-pod 8080:3000' },
        
        // 更多文件操作
        { id: 141, category: 'file', name: t('tools.devOpsCommands.ui.commands.file14.name'), command: 'cp -r 源目录 目标目录', description: t('tools.devOpsCommands.ui.commands.file14.description'), example: 'cp -r ./src ./backup' },
        { id: 142, category: 'file', name: t('tools.devOpsCommands.ui.commands.file15.name'), command: 'mv 源文件 目标文件', description: t('tools.devOpsCommands.ui.commands.file15.description'), example: 'mv old.txt new.txt' },
        { id: 143, category: 'file', name: t('tools.devOpsCommands.ui.commands.file16.name'), command: 'rm -rf 目录名', description: t('tools.devOpsCommands.ui.commands.file16.description'), example: 'rm -rf ./temp' },
        { id: 144, category: 'file', name: t('tools.devOpsCommands.ui.commands.file17.name'), command: 'mkdir -p 目录路径', description: t('tools.devOpsCommands.ui.commands.file17.description'), example: 'mkdir -p ./a/b/c' },
        { id: 145, category: 'file', name: t('tools.devOpsCommands.ui.commands.file18.name'), command: 'touch 文件名', description: t('tools.devOpsCommands.ui.commands.file18.description'), example: 'touch newfile.txt' },
        { id: 146, category: 'file', name: t('tools.devOpsCommands.ui.commands.file19.name'), command: 'cat 文件名', description: t('tools.devOpsCommands.ui.commands.file19.description'), example: 'cat file.txt' },
        { id: 147, category: 'file', name: t('tools.devOpsCommands.ui.commands.file20.name'), command: 'head -n 行数 文件名', description: t('tools.devOpsCommands.ui.commands.file20.description'), example: 'head -n 10 file.txt' },
        { id: 148, category: 'file', name: t('tools.devOpsCommands.ui.commands.file21.name'), command: 'tail -n 行数 文件名', description: t('tools.devOpsCommands.ui.commands.file21.description'), example: 'tail -n 10 file.txt' },
        { id: 149, category: 'file', name: t('tools.devOpsCommands.ui.commands.file22.name'), command: 'wc -l 文件名', description: t('tools.devOpsCommands.ui.commands.file22.description'), example: 'wc -l file.txt' },
        { id: 150, category: 'file', name: t('tools.devOpsCommands.ui.commands.file23.name'), command: 'sort 文件名', description: t('tools.devOpsCommands.ui.commands.file23.description'), example: 'sort file.txt' },
        { id: 151, category: 'file', name: t('tools.devOpsCommands.ui.commands.file24.name'), command: 'uniq 文件名', description: t('tools.devOpsCommands.ui.commands.file24.description'), example: 'uniq file.txt' },
        { id: 152, category: 'file', name: t('tools.devOpsCommands.ui.commands.file25.name'), command: 'diff 文件1 文件2', description: t('tools.devOpsCommands.ui.commands.file25.description'), example: 'diff file1.txt file2.txt' },
        { id: 153, category: 'file', name: t('tools.devOpsCommands.ui.commands.file26.name'), command: 'ln -s 源文件 链接名', description: t('tools.devOpsCommands.ui.commands.file26.description'), example: 'ln -s /path/to/file link' },
        { id: 154, category: 'file', name: t('tools.devOpsCommands.ui.commands.file27.name'), command: 'chmod -R 755 目录名', description: t('tools.devOpsCommands.ui.commands.file27.description'), example: 'chmod -R 755 ./project' },
        { id: 155, category: 'file', name: t('tools.devOpsCommands.ui.commands.file28.name'), command: 'chown -R 用户:组 目录名', description: t('tools.devOpsCommands.ui.commands.file28.description'), example: 'chown -R user:group ./project' },
        
        // 文本处理命令
        { id: 156, category: 'text', name: t('tools.devOpsCommands.ui.commands.text1.name'), command: 'grep -r "关键词" 目录', description: t('tools.devOpsCommands.ui.commands.text1.description'), example: 'grep -r "error" ./src' },
        { id: 157, category: 'text', name: t('tools.devOpsCommands.ui.commands.text2.name'), command: 'grep -i "关键词" 文件', description: t('tools.devOpsCommands.ui.commands.text2.description'), example: 'grep -i "error" file.txt' },
        { id: 158, category: 'text', name: t('tools.devOpsCommands.ui.commands.text3.name'), command: 'sed -i "s/旧文本/新文本/g" 文件', description: t('tools.devOpsCommands.ui.commands.text3.description'), example: 'sed -i "s/old/new/g" file.txt' },
        { id: 159, category: 'text', name: t('tools.devOpsCommands.ui.commands.text4.name'), command: 'awk \'{print $1}\' 文件', description: t('tools.devOpsCommands.ui.commands.text4.description'), example: 'awk \'{print $1}\' file.txt' },
        { id: 160, category: 'text', name: t('tools.devOpsCommands.ui.commands.text5.name'), command: 'cut -d"," -f1 文件', description: t('tools.devOpsCommands.ui.commands.text5.description'), example: 'cut -d"," -f1 file.csv' },
        { id: 161, category: 'text', name: t('tools.devOpsCommands.ui.commands.text6.name'), command: 'tr "a-z" "A-Z" < 文件', description: t('tools.devOpsCommands.ui.commands.text6.description'), example: 'tr "a-z" "A-Z" < file.txt' },
        { id: 162, category: 'text', name: t('tools.devOpsCommands.ui.commands.text7.name'), command: 'paste 文件1 文件2', description: t('tools.devOpsCommands.ui.commands.text7.description'), example: 'paste file1.txt file2.txt' },
        { id: 163, category: 'text', name: t('tools.devOpsCommands.ui.commands.text8.name'), command: 'join 文件1 文件2', description: t('tools.devOpsCommands.ui.commands.text8.description'), example: 'join file1.txt file2.txt' },
        { id: 164, category: 'text', name: t('tools.devOpsCommands.ui.commands.text9.name'), command: 'split -l 行数 文件 前缀', description: t('tools.devOpsCommands.ui.commands.text9.description'), example: 'split -l 1000 large.txt part' },
        { id: 165, category: 'text', name: t('tools.devOpsCommands.ui.commands.text10.name'), command: 'xargs -I {} 命令 {}', description: t('tools.devOpsCommands.ui.commands.text10.description'), example: 'find . -name "*.txt" | xargs -I {} rm {}' },
        
        // 更多网络命令
        { id: 166, category: 'network', name: t('tools.devOpsCommands.ui.commands.network12.name'), command: 'nc -zv 主机 端口', description: t('tools.devOpsCommands.ui.commands.network12.description'), example: 'nc -zv example.com 80' },
        { id: 167, category: 'network', name: t('tools.devOpsCommands.ui.commands.network13.name'), command: 'telnet 主机 端口', description: t('tools.devOpsCommands.ui.commands.network13.description'), example: 'telnet example.com 80' },
        { id: 168, category: 'network', name: t('tools.devOpsCommands.ui.commands.network14.name'), command: 'curl -O URL', description: t('tools.devOpsCommands.ui.commands.network14.description'), example: 'curl -O https://example.com/file.zip' },
        { id: 169, category: 'network', name: t('tools.devOpsCommands.ui.commands.network15.name'), command: 'curl -L URL', description: t('tools.devOpsCommands.ui.commands.network15.description'), example: 'curl -L https://example.com' },
        { id: 170, category: 'network', name: t('tools.devOpsCommands.ui.commands.network16.name'), command: 'curl -H "Header: value" URL', description: t('tools.devOpsCommands.ui.commands.network16.description'), example: 'curl -H "Authorization: Bearer token" https://api.example.com' },
        { id: 171, category: 'network', name: t('tools.devOpsCommands.ui.commands.network17.name'), command: 'wget -r -np URL', description: t('tools.devOpsCommands.ui.commands.network17.description'), example: 'wget -r -np https://example.com' },
        { id: 172, category: 'network', name: t('tools.devOpsCommands.ui.commands.network18.name'), command: 'iptables -L', description: t('tools.devOpsCommands.ui.commands.network18.description'), example: 'iptables -L' },
        { id: 173, category: 'network', name: t('tools.devOpsCommands.ui.commands.network19.name'), command: 'ss -tuln', description: t('tools.devOpsCommands.ui.commands.network19.description'), example: 'ss -tuln' },
        { id: 174, category: 'network', name: t('tools.devOpsCommands.ui.commands.network20.name'), command: 'tcpdump -i eth0', description: t('tools.devOpsCommands.ui.commands.network20.description'), example: 'tcpdump -i eth0' },
        
        // 更多系统监控
        { id: 175, category: 'system', name: t('tools.devOpsCommands.ui.commands.system13.name'), command: 'iostat -x 1', description: t('tools.devOpsCommands.ui.commands.system13.description'), example: 'iostat -x 1' },
        { id: 176, category: 'system', name: t('tools.devOpsCommands.ui.commands.system14.name'), command: 'vmstat 1', description: t('tools.devOpsCommands.ui.commands.system14.description'), example: 'vmstat 1' },
        { id: 177, category: 'system', name: t('tools.devOpsCommands.ui.commands.system15.name'), command: 'sar -u 1', description: t('tools.devOpsCommands.ui.commands.system15.description'), example: 'sar -u 1' },
        { id: 178, category: 'system', name: t('tools.devOpsCommands.ui.commands.system16.name'), command: 'lscpu', description: t('tools.devOpsCommands.ui.commands.system16.description'), example: 'lscpu' },
        { id: 179, category: 'system', name: t('tools.devOpsCommands.ui.commands.system17.name'), command: 'lsblk', description: t('tools.devOpsCommands.ui.commands.system17.description'), example: 'lsblk' },
        { id: 180, category: 'system', name: t('tools.devOpsCommands.ui.commands.system18.name'), command: 'mount', description: t('tools.devOpsCommands.ui.commands.system18.description'), example: 'mount' },
        { id: 181, category: 'system', name: t('tools.devOpsCommands.ui.commands.system19.name'), command: 'umount 设备', description: t('tools.devOpsCommands.ui.commands.system19.description'), example: 'umount /dev/sda1' },
        { id: 182, category: 'system', name: t('tools.devOpsCommands.ui.commands.system20.name'), command: 'fdisk -l', description: t('tools.devOpsCommands.ui.commands.system20.description'), example: 'fdisk -l' },
        { id: 183, category: 'system', name: t('tools.devOpsCommands.ui.commands.system21.name'), command: 'env', description: t('tools.devOpsCommands.ui.commands.system21.description'), example: 'env' },
        { id: 184, category: 'system', name: t('tools.devOpsCommands.ui.commands.system22.name'), command: 'export 变量名=值', description: t('tools.devOpsCommands.ui.commands.system22.description'), example: 'export PATH=$PATH:/usr/local/bin' },
        { id: 185, category: 'system', name: t('tools.devOpsCommands.ui.commands.system23.name'), command: 'echo $变量名', description: t('tools.devOpsCommands.ui.commands.system23.description'), example: 'echo $PATH' },
        { id: 186, category: 'system', name: t('tools.devOpsCommands.ui.commands.system24.name'), command: 'date', description: t('tools.devOpsCommands.ui.commands.system24.description'), example: 'date' },
        { id: 187, category: 'system', name: t('tools.devOpsCommands.ui.commands.system25.name'), command: 'cal', description: t('tools.devOpsCommands.ui.commands.system25.description'), example: 'cal' },
        { id: 188, category: 'system', name: t('tools.devOpsCommands.ui.commands.system26.name'), command: 'which 命令', description: t('tools.devOpsCommands.ui.commands.system26.description'), example: 'which node' },
        { id: 189, category: 'system', name: t('tools.devOpsCommands.ui.commands.system27.name'), command: 'whereis 命令', description: t('tools.devOpsCommands.ui.commands.system27.description'), example: 'whereis node' },
        { id: 190, category: 'system', name: t('tools.devOpsCommands.ui.commands.system28.name'), command: 'type 命令', description: t('tools.devOpsCommands.ui.commands.system28.description'), example: 'type node' },
        
        // 服务管理
        { id: 191, category: 'service', name: t('tools.devOpsCommands.ui.commands.service1.name'), command: 'systemctl status 服务名', description: t('tools.devOpsCommands.ui.commands.service1.description'), example: 'systemctl status nginx' },
        { id: 192, category: 'service', name: t('tools.devOpsCommands.ui.commands.service2.name'), command: 'systemctl start 服务名', description: t('tools.devOpsCommands.ui.commands.service2.description'), example: 'systemctl start nginx' },
        { id: 193, category: 'service', name: t('tools.devOpsCommands.ui.commands.service3.name'), command: 'systemctl stop 服务名', description: t('tools.devOpsCommands.ui.commands.service3.description'), example: 'systemctl stop nginx' },
        { id: 194, category: 'service', name: t('tools.devOpsCommands.ui.commands.service4.name'), command: 'systemctl restart 服务名', description: t('tools.devOpsCommands.ui.commands.service4.description'), example: 'systemctl restart nginx' },
        { id: 195, category: 'service', name: t('tools.devOpsCommands.ui.commands.service5.name'), command: 'systemctl enable 服务名', description: t('tools.devOpsCommands.ui.commands.service5.description'), example: 'systemctl enable nginx' },
        { id: 196, category: 'service', name: t('tools.devOpsCommands.ui.commands.service6.name'), command: 'systemctl disable 服务名', description: t('tools.devOpsCommands.ui.commands.service6.description'), example: 'systemctl disable nginx' },
        { id: 197, category: 'service', name: t('tools.devOpsCommands.ui.commands.service7.name'), command: 'systemctl list-units --type=service', description: t('tools.devOpsCommands.ui.commands.service7.description'), example: 'systemctl list-units --type=service' },
        { id: 198, category: 'service', name: t('tools.devOpsCommands.ui.commands.service8.name'), command: 'service 服务名 start', description: t('tools.devOpsCommands.ui.commands.service8.description'), example: 'service nginx start' },
        { id: 199, category: 'service', name: t('tools.devOpsCommands.ui.commands.service9.name'), command: 'service 服务名 stop', description: t('tools.devOpsCommands.ui.commands.service9.description'), example: 'service nginx stop' },
        { id: 200, category: 'service', name: t('tools.devOpsCommands.ui.commands.service10.name'), command: 'service 服务名 restart', description: t('tools.devOpsCommands.ui.commands.service10.description'), example: 'service nginx restart' },
        
        // 包管理
        { id: 201, category: 'package', name: t('tools.devOpsCommands.ui.commands.package1.name'), command: 'apt update', description: t('tools.devOpsCommands.ui.commands.package1.description'), example: 'apt update' },
        { id: 202, category: 'package', name: t('tools.devOpsCommands.ui.commands.package2.name'), command: 'apt install 包名', description: t('tools.devOpsCommands.ui.commands.package2.description'), example: 'apt install nginx' },
        { id: 203, category: 'package', name: t('tools.devOpsCommands.ui.commands.package3.name'), command: 'apt remove 包名', description: t('tools.devOpsCommands.ui.commands.package3.description'), example: 'apt remove nginx' },
        { id: 204, category: 'package', name: t('tools.devOpsCommands.ui.commands.package4.name'), command: 'apt search 关键词', description: t('tools.devOpsCommands.ui.commands.package4.description'), example: 'apt search nginx' },
        { id: 205, category: 'package', name: t('tools.devOpsCommands.ui.commands.package5.name'), command: 'yum install 包名', description: t('tools.devOpsCommands.ui.commands.package5.description'), example: 'yum install nginx' },
        { id: 206, category: 'package', name: t('tools.devOpsCommands.ui.commands.package6.name'), command: 'yum remove 包名', description: t('tools.devOpsCommands.ui.commands.package6.description'), example: 'yum remove nginx' },
        { id: 207, category: 'package', name: t('tools.devOpsCommands.ui.commands.package7.name'), command: 'brew install 包名', description: t('tools.devOpsCommands.ui.commands.package7.description'), example: 'brew install node' },
        { id: 208, category: 'package', name: t('tools.devOpsCommands.ui.commands.package8.name'), command: 'brew uninstall 包名', description: t('tools.devOpsCommands.ui.commands.package8.description'), example: 'brew uninstall node' },
        { id: 209, category: 'package', name: t('tools.devOpsCommands.ui.commands.package9.name'), command: 'brew list', description: t('tools.devOpsCommands.ui.commands.package9.description'), example: 'brew list' },
        { id: 210, category: 'package', name: t('tools.devOpsCommands.ui.commands.package10.name'), command: 'brew update', description: t('tools.devOpsCommands.ui.commands.package10.description'), example: 'brew update' },
        { id: 211, category: 'package', name: t('tools.devOpsCommands.ui.commands.package11.name'), command: 'npm install 包名', description: t('tools.devOpsCommands.ui.commands.package11.description'), example: 'npm install express' },
        { id: 212, category: 'package', name: t('tools.devOpsCommands.ui.commands.package12.name'), command: 'npm uninstall 包名', description: t('tools.devOpsCommands.ui.commands.package12.description'), example: 'npm uninstall express' },
        { id: 213, category: 'package', name: t('tools.devOpsCommands.ui.commands.package13.name'), command: 'npm list', description: t('tools.devOpsCommands.ui.commands.package13.description'), example: 'npm list' },
        { id: 214, category: 'package', name: t('tools.devOpsCommands.ui.commands.package14.name'), command: 'pip install 包名', description: t('tools.devOpsCommands.ui.commands.package14.description'), example: 'pip install requests' },
        { id: 215, category: 'package', name: t('tools.devOpsCommands.ui.commands.package15.name'), command: 'pip uninstall 包名', description: t('tools.devOpsCommands.ui.commands.package15.description'), example: 'pip uninstall requests' },
        
        // 定时任务
        { id: 216, category: 'cron', name: t('tools.devOpsCommands.ui.commands.cron1.name'), command: 'crontab -e', description: t('tools.devOpsCommands.ui.commands.cron1.description'), example: 'crontab -e' },
        { id: 217, category: 'cron', name: t('tools.devOpsCommands.ui.commands.cron2.name'), command: 'crontab -l', description: t('tools.devOpsCommands.ui.commands.cron2.description'), example: 'crontab -l' },
        { id: 218, category: 'cron', name: t('tools.devOpsCommands.ui.commands.cron3.name'), command: 'crontab -r', description: t('tools.devOpsCommands.ui.commands.cron3.description'), example: 'crontab -r' },
        { id: 219, category: 'cron', name: t('tools.devOpsCommands.ui.commands.cron4.name'), command: 'crontab -u 用户 -e', description: t('tools.devOpsCommands.ui.commands.cron4.description'), example: 'crontab -u root -e' },
        
        // 数据库相关
        { id: 220, category: 'database', name: t('tools.devOpsCommands.ui.commands.database1.name'), command: 'mysql -u 用户 -p', description: t('tools.devOpsCommands.ui.commands.database1.description'), example: 'mysql -u root -p' },
        { id: 221, category: 'database', name: t('tools.devOpsCommands.ui.commands.database2.name'), command: 'mysql -u 用户 -p 数据库名 < 文件.sql', description: t('tools.devOpsCommands.ui.commands.database2.description'), example: 'mysql -u root -p mydb < backup.sql' },
        { id: 222, category: 'database', name: t('tools.devOpsCommands.ui.commands.database3.name'), command: 'mysqldump -u 用户 -p 数据库名 > 文件.sql', description: t('tools.devOpsCommands.ui.commands.database3.description'), example: 'mysqldump -u root -p mydb > backup.sql' },
        { id: 223, category: 'database', name: t('tools.devOpsCommands.ui.commands.database4.name'), command: 'psql -U 用户 -d 数据库名', description: t('tools.devOpsCommands.ui.commands.database4.description'), example: 'psql -U postgres -d mydb' },
        { id: 224, category: 'database', name: t('tools.devOpsCommands.ui.commands.database5.name'), command: 'pg_dump -U 用户 数据库名 > 文件.sql', description: t('tools.devOpsCommands.ui.commands.database5.description'), example: 'pg_dump -U postgres mydb > backup.sql' },
        { id: 225, category: 'database', name: t('tools.devOpsCommands.ui.commands.database6.name'), command: 'redis-cli', description: t('tools.devOpsCommands.ui.commands.database6.description'), example: 'redis-cli' },
        { id: 226, category: 'database', name: t('tools.devOpsCommands.ui.commands.database7.name'), command: 'mongo', description: t('tools.devOpsCommands.ui.commands.database7.description'), example: 'mongo' },
        { id: 227, category: 'database', name: t('tools.devOpsCommands.ui.commands.database8.name'), command: 'sqlite3 数据库文件', description: t('tools.devOpsCommands.ui.commands.database8.description'), example: 'sqlite3 mydb.db' },
        
        // 更多进程和日志
        { id: 228, category: 'process', name: t('tools.devOpsCommands.ui.commands.process9.name'), command: 'killall -9 进程名', description: t('tools.devOpsCommands.ui.commands.process9.description'), example: 'killall -9 node' },
        { id: 229, category: 'process', name: t('tools.devOpsCommands.ui.commands.process10.name'), command: 'pstree', description: t('tools.devOpsCommands.ui.commands.process10.description'), example: 'pstree' },
        { id: 230, category: 'process', name: t('tools.devOpsCommands.ui.commands.process11.name'), command: 'nice -n 优先级 命令', description: t('tools.devOpsCommands.ui.commands.process11.description'), example: 'nice -n 10 node app.js' },
        { id: 231, category: 'process', name: t('tools.devOpsCommands.ui.commands.process12.name'), command: 'renice 优先级 PID', description: t('tools.devOpsCommands.ui.commands.process12.description'), example: 'renice 10 12345' },
        { id: 232, category: 'log', name: t('tools.devOpsCommands.ui.commands.log8.name'), command: 'tail -f 日志文件 | grep 关键词', description: t('tools.devOpsCommands.ui.commands.log8.description'), example: 'tail -f /var/log/app.log | grep ERROR' },
        { id: 233, category: 'log', name: t('tools.devOpsCommands.ui.commands.log9.name'), command: 'journalctl -xe', description: t('tools.devOpsCommands.ui.commands.log9.description'), example: 'journalctl -xe' },
        { id: 234, category: 'log', name: t('tools.devOpsCommands.ui.commands.log10.name'), command: 'journalctl --since "1 hour ago"', description: t('tools.devOpsCommands.ui.commands.log10.description'), example: 'journalctl --since "1 hour ago"' },
        { id: 235, category: 'log', name: t('tools.devOpsCommands.ui.commands.log11.name'), command: 'dmesg | tail', description: t('tools.devOpsCommands.ui.commands.log11.description'), example: 'dmesg | tail' },
        { id: 236, category: 'log', name: t('tools.devOpsCommands.ui.commands.log12.name'), command: 'last', description: t('tools.devOpsCommands.ui.commands.log12.description'), example: 'last' },
        { id: 237, category: 'log', name: t('tools.devOpsCommands.ui.commands.log13.name'), command: 'lastlog', description: t('tools.devOpsCommands.ui.commands.log13.description'), example: 'lastlog' },
        
        // 更多权限和用户管理
        { id: 238, category: 'permission', name: t('tools.devOpsCommands.ui.commands.permission8.name'), command: 'id', description: t('tools.devOpsCommands.ui.commands.permission8.description'), example: 'id' },
        { id: 239, category: 'permission', name: t('tools.devOpsCommands.ui.commands.permission9.name'), command: 'groups', description: t('tools.devOpsCommands.ui.commands.permission9.description'), example: 'groups' },
        { id: 240, category: 'permission', name: t('tools.devOpsCommands.ui.commands.permission10.name'), command: 'passwd', description: t('tools.devOpsCommands.ui.commands.permission10.description'), example: 'passwd' },
        { id: 241, category: 'permission', name: t('tools.devOpsCommands.ui.commands.permission11.name'), command: 'useradd 用户名', description: t('tools.devOpsCommands.ui.commands.permission11.description'), example: 'useradd john' },
        { id: 242, category: 'permission', name: t('tools.devOpsCommands.ui.commands.permission12.name'), command: 'userdel 用户名', description: t('tools.devOpsCommands.ui.commands.permission12.description'), example: 'userdel john' },
        { id: 243, category: 'permission', name: t('tools.devOpsCommands.ui.commands.permission13.name'), command: 'usermod -aG 组名 用户名', description: t('tools.devOpsCommands.ui.commands.permission13.description'), example: 'usermod -aG docker john' },
        { id: 244, category: 'permission', name: t('tools.devOpsCommands.ui.commands.permission14.name'), command: 'visudo', description: t('tools.devOpsCommands.ui.commands.permission14.description'), example: 'visudo' },
        
        // 更多CI/CD和构建工具
        { id: 245, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd36.name'), command: 'npm audit', description: t('tools.devOpsCommands.ui.commands.cicd36.description'), example: 'npm audit' },
        { id: 246, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd37.name'), command: 'npm audit fix', description: t('tools.devOpsCommands.ui.commands.cicd37.description'), example: 'npm audit fix' },
        { id: 247, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd38.name'), command: 'yarn upgrade', description: t('tools.devOpsCommands.ui.commands.cicd38.description'), example: 'yarn upgrade' },
        { id: 248, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd39.name'), command: 'pnpm install', description: t('tools.devOpsCommands.ui.commands.cicd39.description'), example: 'pnpm install' },
        { id: 249, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd40.name'), command: 'pnpm build', description: t('tools.devOpsCommands.ui.commands.cicd40.description'), example: 'pnpm build' },
        { id: 250, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd41.name'), command: 'docker-compose build', description: t('tools.devOpsCommands.ui.commands.cicd41.description'), example: 'docker-compose build' },
        { id: 251, category: 'cicd', name: t('tools.devOpsCommands.ui.commands.cicd42.name'), command: 'docker-compose exec 服务名 命令', description: t('tools.devOpsCommands.ui.commands.cicd42.description'), example: 'docker-compose exec web npm install' }
      ]
    })

    const filteredCommands = computed(() => {
      let filtered = commands.value

      // 分类过滤
      if (activeCategory.value !== 'all') {
        filtered = filtered.filter(cmd => cmd.category === activeCategory.value)
      }

      // 搜索过滤
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        filtered = filtered.filter(cmd =>
          cmd.name.toLowerCase().includes(query) ||
          cmd.command.toLowerCase().includes(query) ||
          cmd.description.toLowerCase().includes(query) ||
          (cmd.example && cmd.example.toLowerCase().includes(query))
        )
      }

      return filtered
    })

    async function copyCommand(command) {
      try {
        await navigator.clipboard.writeText(command)
        // 简单的视觉反馈
        const button = event.target.closest('button')
        if (button) {
          button.style.background = '#28a745'
          setTimeout(() => {
            button.style.background = ''
          }, 500)
        }
      } catch (err) {
        console.error(t('tools.devOpsCommands.ui.copyFailed') + ':', err)
      }
    }

    return {
      searchQuery,
      activeCategory,
      categories,
      filteredCommands,
      copyCommand
    }
  }
}
</script>

<style scoped>
.devops-commands-tool {
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

.commands-list {
  display: grid;
  gap: 20px;
}

.command-card {
  background: var(--bg-secondary);
  padding: 10px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  transition: all 0.3s;
}

.command-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.command-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.command-header h4 {
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

.command-code {
  background: var(--bg-primary);
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  border-left: 4px solid var(--accent-color);
}

.command-code code {
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 16px;
  color: var(--accent-color);
  font-weight: bold;
  word-break: break-all;
}

.command-description {
  color: var(--text-secondary);
  margin-bottom: 10px;
  line-height: 1.5;
}

.command-example h5 {
  color: var(--text-primary);
  margin-bottom: 10px;
  font-size: 14px;
}

.example-code {
  background: var(--bg-primary);
  padding: 10px;
  border-radius: 8px;
  border-left: 4px solid #6c757d;
}

.example-code code {
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 14px;
  color: var(--text-primary);
  word-break: break-all;
}

@media (max-width: 768px) {
  .categories {
    gap: 8px;
  }
  
  .category-btn {
    padding: 10px;
    font-size: 13px;
  }
  
  .command-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>

