// 检查翻译文件的脚本
console.log('开始检查翻译文件...');

// 动态导入翻译文件
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 导入日语翻译文件
        const module = await import('./src/locales/ja-JP.js');
        const jaJP = module.default || module;
        
        console.log('日语翻译文件导入成功:', jaJP);
        
        // 检查categories对象
        if (jaJP.categories) {
            console.log('Categories 存在');
            console.log('Categories 键列表:', Object.keys(jaJP.categories));
            
            // 检查data-viz分类
            if (jaJP.categories['data-viz']) {
                console.log('data-viz分类存在:', jaJP.categories['data-viz']);
                console.log('data-viz名称:', jaJP.categories['data-viz'].name);
                console.log('data-viz描述:', jaJP.categories['data-viz'].description);
            } else {
                console.error('未找到data-viz分类');
            }
        } else {
            console.error('Categories 对象不存在');
        }
        
        // 检查tools对象
        if (jaJP.tools) {
            console.log('Tools 存在，工具数量:', Object.keys(jaJP.tools).length);
        } else {
            console.error('Tools 对象不存在');
        }
        
        // 创建一个简单的HTML输出
        const output = document.createElement('div');
        output.style.maxWidth = '800px';
        output.style.margin = '20px auto';
        output.style.padding = '20px';
        output.style.backgroundColor = '#f0f0f0';
        output.style.borderRadius = '8px';
        
        let html = '<h1>日语翻译文件检查结果</h1>';
        
        // 显示categories信息
        html += '<h2>Categories:</h2>';
        html += '<ul>';
        Object.keys(jaJP.categories || {}).forEach(key => {
            html += `<li><strong>${key}</strong>: ${jaJP.categories[key].name}</li>`;
        });
        html += '</ul>';
        
        // 特别显示data-viz信息
        if (jaJP.categories && jaJP.categories['data-viz']) {
            html += '<div style="margin-top:20px;padding:10px;background-color:#e6f3ff;border-radius:5px;">';
            html += '<h3>data-viz分类详情:</h3>';
            html += `<p><strong>名称:</strong> ${jaJP.categories['data-viz'].name}</p>`;
            html += `<p><strong>描述:</strong> ${jaJP.categories['data-viz'].description}</p>`;
            html += '</div>';
        } else {
            html += '<p style="color:red;">未找到data-viz分类</p>';
        }
        
        output.innerHTML = html;
        document.body.appendChild(output);
        
    } catch (error) {
        console.error('导入翻译文件时出错:', error);
        
        const errorElement = document.createElement('div');
        errorElement.style.color = 'red';
        errorElement.innerHTML = `<p>导入翻译文件时出错: ${error.message}</p>`;
        document.body.appendChild(errorElement);
    }
});