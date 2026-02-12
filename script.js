// 《预知轮回》主游戏逻辑

// 游戏全局变量
let currentScene = null;
let currentDialogueIndex = 0;
let dialogueQueue = [];
let isAnimatingText = false;
let currentText = '';
let textAnimationInterval = null;
let gameLoaded = false;

// 游戏状态和配置
let gameState = {};
let gameConfig = {
    textSpeed: 5,
    autoPlay: false
};

// 定时器管理器 - 防止内存泄漏
const timerManager = {
    activeTimers: [],
    activeIntervals: [],
    
    // 添加定时器
    addTimer: function(timerId) {
        this.activeTimers.push(timerId);
        return timerId;
    },
    
    // 添加间隔
    addInterval: function(intervalId) {
        this.activeIntervals.push(intervalId);
        return intervalId;
    },
    
    // 清除所有活动的定时器
    clearAll: function() {
        // 清除所有setTimeout
        this.activeTimers.forEach(timerId => {
            clearTimeout(timerId);
        });
        this.activeTimers = [];
        
        // 清除所有setInterval
        this.activeIntervals.forEach(intervalId => {
            clearInterval(intervalId);
        });
        this.activeIntervals = [];
        
        console.log('已清理所有活动定时器');
    },
    
    // 清除特定定时器
    clearTimer: function(timerId) {
        const index = this.activeTimers.indexOf(timerId);
        if (index > -1) {
            clearTimeout(timerId);
            this.activeTimers.splice(index, 1);
        }
    },
    
    // 清除特定间隔
    clearInterval: function(intervalId) {
        const index = this.activeIntervals.indexOf(intervalId);
        if (index > -1) {
            clearInterval(intervalId);
            this.activeIntervals.splice(index, 1);
        }
    }
};

// 初始化游戏状态
function initializeGameState() {
    if (typeof window.gameData !== 'undefined' && window.gameData.gameState) {
        // 使用深拷贝初始化游戏状态
        gameState = JSON.parse(JSON.stringify(window.gameData.gameState));
        gameConfig = Object.assign({}, window.gameData.gameConfig);
    } else {
        console.error('游戏数据未正确加载');
        // 提供默认状态
        gameState = {
            currentDay: 1,
            mentalHealth: 100,
            trust: 80,
            clues: [],
            inventory: [],
            decisions: {},
            currentScene: 'chapter1_scene1',
            currentSceneDialogIndex: 0,
            hasSeenIntro: false,
            gameEnded: false,
            ringDaysLeft: 30
        };
        gameConfig = {
            textSpeed: 5,
            autoPlay: false
        };
    }
}

// DOM元素（将在initElements函数中初始化）
let elements = {};

// 初始化DOM元素
function initElements() {
    // 游戏状态显示
    elements.mentalHealthBar = document.getElementById('mentalHealthBar');
    elements.mentalHealthValue = document.getElementById('mentalHealthValue');
    elements.trustBar = document.getElementById('trustBar');
    elements.trustValue = document.getElementById('trustValue');
    elements.remainingDays = document.getElementById('remainingDays');
    
    // 线索显示
    elements.cluesContainer = document.getElementById('cluesContainer');
    
    // 对话系统
    elements.speakerName = document.getElementById('speakerName');
    elements.dialogueText = document.getElementById('dialogueText');
    elements.continueBtn = document.getElementById('continueBtn');
    
    // 选项系统
    elements.choicesArea = document.getElementById('choicesArea');
    
    // 角色和背景
    elements.sceneBackground = document.getElementById('sceneBackground');
    elements.characterXiaoTu = document.getElementById('characterXiaoTu');
    elements.characterFoxDad = document.getElementById('characterFoxDad');
    
    // 特效
    elements.dreamEffect = document.getElementById('dreamEffect');
    
    // 分析界面
    elements.analysisOverlay = document.getElementById('analysisOverlay');
    elements.analysisContent = document.getElementById('analysisContent');
    elements.closeAnalysisBtn = document.getElementById('closeAnalysisBtn');
    
    // 物品栏
    elements.ringTime = document.getElementById('ringTime');
    
    // 决策记录
    elements.decisionLog = document.getElementById('decisionLog');
    
    // 模态框
    elements.helpModal = document.getElementById('helpModal');
    
    // 按钮
    elements.saveBtn = document.getElementById('saveBtn');
    elements.loadBtn = document.getElementById('loadBtn');
    elements.helpBtn = document.getElementById('helpBtn');
    elements.restartBtn = document.getElementById('restartBtn');
    elements.closeHelpBtn = document.getElementById('closeHelpBtn');
    
    // 添加元素存在性检查
    const requiredElements = [
        'mentalHealthBar', 'mentalHealthValue', 'trustBar', 'trustValue',
        'remainingDays', 'cluesContainer', 'speakerName', 'dialogueText',
        'continueBtn', 'choicesArea', 'sceneBackground', 'characterXiaoTu',
        'characterFoxDad', 'dreamEffect', 'analysisOverlay', 'analysisContent',
        'closeAnalysisBtn', 'ringTime', 'decisionLog', 'helpModal',
        'saveBtn', 'loadBtn', 'helpBtn', 'restartBtn', 'closeHelpBtn'
    ];
    
    const missingElements = [];
    for (const elementName of requiredElements) {
        if (!elements[elementName]) {
            missingElements.push(elementName);
        }
    }
    
    if (missingElements.length > 0) {
        console.warn('警告：以下DOM元素未找到:', missingElements);
    }
}

// 游戏初始化
function initGame() {
    console.log('游戏初始化...');
    
    // 防止重复初始化
    if (gameLoaded) {
        console.warn('游戏已初始化，跳过重复初始化');
        return;
    }
    gameLoaded = true;

    // 初始化游戏状态
    initializeGameState();
    
    // 初始化DOM元素
    initElements();
    
    // 加载保存的游戏或开始新游戏
    loadGame();
    
    // 设置事件监听器
    setupEventListeners();
    
    // 更新UI
    updateGameUI();
    
    // 开始游戏
    startGame();
}

// 设置事件监听器
function setupEventListeners() {
    // 继续按钮
    if (elements.continueBtn) {
        elements.continueBtn.addEventListener('click', advanceDialogue);
    }
    
    // 键盘控制
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!elements.analysisOverlay || !elements.analysisOverlay.style.display || elements.analysisOverlay.style.display === 'none') {
                advanceDialogue();
            }
        }
        if (e.key === 'Escape') {
            if (elements.analysisOverlay && elements.analysisOverlay.style.display === 'flex') {
                closeAnalysis();
            }
        }
    });
    
    // 游戏控制按钮
    if (elements.saveBtn) {
        elements.saveBtn.addEventListener('click', saveGame);
    }
    if (elements.loadBtn) {
        elements.loadBtn.addEventListener('click', () => {
            if (confirm('加载游戏会丢失当前进度，确定吗？')) {
                localStorage.removeItem('precognitionCycleSave');
                location.reload();
            }
        });
    }
    if (elements.helpBtn) {
        elements.helpBtn.addEventListener('click', () => showModal('helpModal'));
    }
    if (elements.restartBtn) {
        elements.restartBtn.addEventListener('click', () => {
            if (confirm('重新开始游戏会丢失当前进度，确定吗？')) {
                // 重置游戏状态
                resetGameState()
                // 清除游戏结束标记和介绍标记
                gameState.gameEnded = false;
                gameState.hasSeenIntro = false;
                // 重新开始游戏
                showScene('chapter1', 'scene1');
            }
        });
    }
    if (elements.closeHelpBtn) {
        elements.closeHelpBtn.addEventListener('click', () => hideModal('helpModal'));
    }
    
    // 分析界面关闭
    if (elements.closeAnalysisBtn) {
        elements.closeAnalysisBtn.addEventListener('click', closeAnalysis);
    }
    
    
    // 移除右键历史功能提示，恢复正常的右键菜单功能
}

// 开始游戏
function startGame() {
    if (!gameState.hasSeenIntro) {
        // 显示开场介绍
        try {
            showScene('chapter1', 'scene1');
            gameState.hasSeenIntro = true;
            saveGame();
        } catch (error) {
            console.error('启动游戏失败:', error);
            showErrorMessage('游戏启动失败，请刷新页面重试');
        }
    } else {
        // 加载上次场景（稳健解析：chapter 为第一个'_'之前，scene 为其余部分）
        try {
            const savedScene = gameState.currentScene || '';
            const firstUnderscore = savedScene.indexOf('_');
            if (firstUnderscore > 0) {
                const chapter = savedScene.substring(0, firstUnderscore);
                const scene = savedScene.substring(firstUnderscore + 1);
                const sceneResult = showScene(chapter, scene);
                if (sceneResult === false) {
                    console.warn('保存的场景加载失败，返回第一章');
                    showScene('chapter1', 'scene1');
                    gameState.hasSeenIntro = true;
                    saveGame();
                }
            } else {
                // 如果场景路径无效，回到第一章开始
                console.warn('保存的场景数据无效，返回第一章');
                showScene('chapter1', 'scene1');
                gameState.hasSeenIntro = true;
                saveGame();
            }
        } catch (error) {
            console.error('加载保存的场景失败:', error);
            // 如果加载保存的场景失败，回到第一章
            showScene('chapter1', 'scene1');
            gameState.hasSeenIntro = true;
            saveGame();
        }
    }
    
}

// 显示场景
function showScene(chapter, scene) {
    console.log('=== showScene被调用 ===');
    console.log('章节:', chapter);
    console.log('场景:', scene);
    
    // 在场景切换前清理所有定时器
    timerManager.clearAll();
    
    // 使用 getSceneData 函数获取场景数据
    const sceneData = getSceneData(chapter, scene);
    if (!sceneData) {
        const errorMsg = `错误：场景 ${chapter}_${scene} 不存在！`;
        console.error(errorMsg);
        showErrorMessage(errorMsg);
        return false;
    }
    
    console.log('找到场景数据:', sceneData.id);
    console.log('对话数量:', sceneData.dialogue ? sceneData.dialogue.length : 0);
    
    currentScene = sceneData;
    currentDialogueIndex = 0;
    gameState.currentScene = sceneData.id;
    gameState.currentSceneDialogIndex = 0; // 重置当前场景对话索引
    
    // 设置背景
    if (sceneData.background) {
        // 使用 ResourceManager 获取背景图片
        elements.sceneBackground.style.backgroundImage = ResourceManager.getBackgroundImage(sceneData.background);
        
        // 添加背景图片加载错误检测
        const bgImg = new Image();
        bgImg.onerror = function() {
            console.log('背景图片加载失败:', sceneData.background);
            elements.sceneBackground.style.backgroundImage = 
                'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
        };
        const bgPath = ResourceManager.getBackgroundImage(sceneData.background).replace(/^url\(["']?(.*?)["']?\)$/,'$1');
        bgImg.src = bgPath;
    }
    
    // 设置角色
    updateCharacters(sceneData.characters);
    
    // 开始对话
    if (sceneData.dialogue) {
        startDialogue(sceneData.dialogue);
    } else {
        console.error('场景没有对话数据:', sceneData.id);
        showErrorMessage('场景对话数据缺失');
    }
    
    return true;
}

// 获取场景数据
function getSceneData(chapter, scene) {
    // 添加调试日志
    console.log('getSceneData 调用:', { chapter, scene });
    
    // 检查游戏数据是否存在
    if (!window.gameData) {
        console.error('游戏数据未加载');
        return null;
    }
    
    // 直接尝试获取场景数据
    // 先尝试直接路径访问
    if (window.gameData[chapter] && window.gameData[chapter][scene]) {
        console.log('✅ 通过直接路径找到场景:', `${chapter}.${scene}`);
        return window.gameData[chapter][scene];
    }
    
    // 尝试查找所有场景，通过id匹配
    if (chapter && scene) {
        const targetId = `${chapter}_${scene}`;
        console.log('查找场景ID:', targetId);
        
        // 遍历所有章节
        for (const chapKey in window.gameData) {
            if (chapKey.startsWith('chapter')) {
                const chapterData = window.gameData[chapKey];
                for (const sceneKey in chapterData) {
                    const sceneData = chapterData[sceneKey];
                    if (sceneData && sceneData.id === targetId) {
                        console.log(`✅ 通过ID匹配找到场景: ${chapKey}.${sceneKey}`);
                        return sceneData;
                    }
                }
            }
        }
    }
    
    console.log('❌ 未找到场景数据');
    return null;
}

// 更新角色显示
function updateCharacters(characters) {
    // 重置所有角色
    elements.characterXiaoTu.classList.remove('active');
    elements.characterFoxDad.classList.remove('active');
    
    if (!characters) return;
    
    // 设置小兔
    if (characters.xiaotu) {
        elements.characterXiaoTu.style.display = 'block';
        elements.characterXiaoTu.style.left = characters.xiaotu.position === 'left' ? '20%' : 
                                            characters.xiaotu.position === 'right' ? '60%' : '40%';
        if (characters.xiaotu.emotion) {
            elements.characterXiaoTu.className = 'character active';
            elements.characterXiaoTu.classList.add(characters.xiaotu.emotion);
            // 更新角色图片
            const imgElement = elements.characterXiaoTu.querySelector('.character-image');
            if (imgElement) {
                // 恐惧和恐慌使用相同图片
                const emotion = characters.xiaotu.emotion === 'terrified' ? 'panicked' : characters.xiaotu.emotion;
                imgElement.src = `assets/images/characters/xiaotu-${emotion}.png`;
                imgElement.onerror = function() {
                    this.src = 'assets/images/characters/xiaotu.png';
                    this.onerror = null;
                };
            }
        } else {
            // 默认情绪
            elements.characterXiaoTu.className = 'character active';
            const imgElement = elements.characterXiaoTu.querySelector('.character-image');
            if (imgElement) {
                imgElement.src = 'assets/images/characters/xiaotu.png';
            }
        }
    } else {
        elements.characterXiaoTu.style.display = 'none';
    }
    
    // 设置狐狸爸爸 - 增强错误处理
    if (characters.foxdad) {
        elements.characterFoxDad.style.display = 'block';
        elements.characterFoxDad.style.left = characters.foxdad.position === 'left' ? '20%' : 
                                             characters.foxdad.position === 'right' ? '60%' : '40%';
        
        // 创建或获取狐狸爸爸的图片元素
        let imgElement = elements.characterFoxDad.querySelector('.character-image');
        if (!imgElement) {
            imgElement = document.createElement('img');
            imgElement.className = 'character-image';
            imgElement.alt = '狐狸爸爸';
            elements.characterFoxDad.appendChild(imgElement);
        }
        
        if (characters.foxdad.emotion) {
            elements.characterFoxDad.className = 'character active';
            elements.characterFoxDad.classList.add(characters.foxdad.emotion);
            
            // 尝试加载情绪图片，失败则使用占位符
            imgElement.src = `assets/images/characters/foxdad-${characters.foxdad.emotion}.png`;
            imgElement.onerror = function() {
                // 图片加载失败，显示彩色占位符
                this.style.display = 'block';
                this.src = '';
                this.alt = '狐狸爸爸 - ' + characters.foxdad.emotion;
                this.style.backgroundColor = '#9d4edd';
                this.style.width = '200px';
                this.style.height = '300px';
                this.style.border = '3px solid #ff9fe5';
                this.style.borderRadius = '10px';
                this.style.display = 'flex';
                this.style.alignItems = 'center';
                this.style.justifyContent = 'center';
                this.style.color = 'white';
                this.style.fontFamily = 'Noto Sans SC, sans-serif';
                this.style.fontSize = '16px';
                this.style.textAlign = 'center';
                this.innerHTML = `🦊 狐狸爸爸<br><small>${characters.foxdad.emotion}状态</small>`;
            };
        } else {
            // 默认情绪
            elements.characterFoxDad.className = 'character active';
            imgElement.src = 'assets/images/characters/foxdad.png';
            imgElement.onerror = function() {
                // 默认图片也加载失败
                this.style.display = 'block';
                this.src = '';
                this.alt = '狐狸爸爸';
                this.style.backgroundColor = '#4a1e5d';
                this.style.width = '200px';
                this.style.height = '300px';
                this.style.border = '2px solid #9d4edd';
                this.style.borderRadius = '10px';
                this.style.display = 'flex';
                this.style.alignItems = 'center';
                this.style.justifyContent = 'center';
                this.style.color = '#ff9fe5';
                this.style.fontFamily = 'Noto Sans SC, sans-serif';
                this.style.fontSize = '18px';
                this.style.fontWeight = 'bold';
                this.textContent = '🦊 狐狸爸爸';
            };
        }
    } else {
        elements.characterFoxDad.style.display = 'none';
    }
}

// 开始对话
function startDialogue(dialogue) {
    console.log('=== startDialogue被调用 ===');
    console.log('对话数据:', dialogue);
    
    if (!dialogue || dialogue.length === 0) {
        console.error('对话数据为空');
        return;
    }
    
    dialogueQueue = [...dialogue];
    console.log('对话队列长度:', dialogueQueue.length);
    
    // 快速跳过已经显示的对话
    while (currentDialogueIndex > 0 && currentDialogueIndex < dialogueQueue.length) {
        // 检查当前对话是否满足条件
        const currentDlg = dialogueQueue[currentDialogueIndex];
        let shouldShow = true;
        
        if (currentDlg.condition && currentDlg.condition.hasFlag) {
            if (Array.isArray(currentDlg.condition.hasFlag)) {
                let hasAnyFlag = false;
                if (gameState.flags) {
                    for (let flag of currentDlg.condition.hasFlag) {
                        if (gameState.flags.includes(flag)) {
                            hasAnyFlag = true;
                            break;
                        }
                    }
                }
                if (!hasAnyFlag) {
                    shouldShow = false;
                }
            } else {
                if (!gameState.flags || !gameState.flags.includes(currentDlg.condition.hasFlag)) {
                    shouldShow = false;
                }
            }
        }
        
        if (shouldShow) {
            // 如果当前对话应该显示，则停止跳过
            console.log('找到应该显示的对话，索引:', currentDialogueIndex);
            break;
        } else {
            // 如果当前对话不应该显示，跳过它
            console.log('跳过对话，索引:', currentDialogueIndex);
            currentDialogueIndex++;
        }
    }
    
    console.log('开始显示对话，起始索引:', currentDialogueIndex);
    showNextDialogue();
}

// 显示下一个对话
function showNextDialogue() {
    if (currentDialogueIndex >= dialogueQueue.length) {
        // 对话结束
        console.log('对话结束');
        return;
    }
    
    // 不再保存对话索引到游戏状态，只在场景切换时重置索引
    // gameState.currentSceneDialogIndex = currentDialogueIndex;
    
    const dialogue = dialogueQueue[currentDialogueIndex];
    
    // 设置说话者
    elements.speakerName.textContent = dialogue.speaker || '旁白';
    
    // 清除之前的动画
    if (textAnimationInterval) {
        clearInterval(textAnimationInterval);
        timerManager.clearInterval(textAnimationInterval);
    }
    
    // 处理特殊文本
    if (dialogue.special === 'dream') {
        elements.dreamEffect.classList.add('active');
        
        // 梦境文本特殊显示
        currentText = `<div class="dream-text">${dialogue.specialText || dialogue.text}</div>`;
        elements.dialogueText.innerHTML = currentText;
        isAnimatingText = false;
        
        // 自动关闭梦境效果
        timerManager.addTimer(setTimeout(() => {
            elements.dreamEffect.classList.remove('active');
        }, 3000));
    } else if (dialogue.special === 'ending') {
        // 结局特殊显示
        currentText = `<div style="text-align:center; font-size:1.5rem; color:#ff9fe5; margin:20px 0;">${dialogue.text}</div>`;
        elements.dialogueText.innerHTML = currentText;
        isAnimatingText = false;
        gameState.gameEnded = true;
    } else {
        // 普通文本动画
        currentText = dialogue.text;
        isAnimatingText = true;
        let charIndex = 0;
        
        // 根据速度计算延迟
        const speed = gameConfig.textSpeed;
        const delay = speed <= 3 ? 80 : speed <= 7 ? 50 : 30;
        
        elements.dialogueText.innerHTML = '';
        
        textAnimationInterval = setInterval(() => {
            if (charIndex < currentText.length) {
                elements.dialogueText.innerHTML += currentText.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(textAnimationInterval);
                isAnimatingText = false;
                
                // 检查是否有自动行动
                if (dialogue.action === 'start_analysis') {
                    timerManager.addTimer(setTimeout(() => {
                        showAnalysis(dialogue.analysis);
                    }, 500));
                }
                
                // 添加线索
                if (dialogue.action === 'add_clue' && dialogue.clueId) {
                    addClue(dialogue.clueId);
                    
                    // 显示线索添加通知
                    if (dialogue.special === 'clue_added' && dialogue.specialText) {
                        showNotification(`获得新线索：${dialogue.specialText.split('：')[0] || '重要发现'}`);
                    }
                }
                
                // 添加物品
                if (dialogue.action === 'add_item' && dialogue.itemId) {
                    if (!gameState.inventory) {
                        gameState.inventory = [];
                    }
                    if (!gameState.inventory.includes(dialogue.itemId)) {
                        gameState.inventory.push(dialogue.itemId);
                        updateGameUI(); // 更新UI显示新物品
                    }
                }
                
                // 时间推进
                if (dialogue.action === 'advance_time' && dialogue.daysPassed) {
                    gameState.currentDay += dialogue.daysPassed;
                    gameState.ringDaysLeft -= dialogue.daysPassed;
                    updateGameUI();
                }
                
                // 自动播放 - 增加延时时间，让玩家有足够时间阅读
                if (gameConfig.autoPlay && !dialogue.choices && dialogue.next) {
                    // 根据文本长度动态调整延时时间
                    const baseDelay = 2000; // 基础延时2秒
                    const charDelay = Math.min(dialogue.text.length * 50, 3000); // 每个字符50ms，最多3秒
                    const totalDelay = baseDelay + charDelay;
                    
                    timerManager.addTimer(setTimeout(() => {
                        if (dialogue.next && !dialogue.choices) {
                            handleNext(dialogue.next);
                        }
                    }, totalDelay));
                }
            }
        }, delay);
        // 将对话定时器登记到 timerManager，便于在场景切换时统一清理
        timerManager.addInterval(textAnimationInterval);
    }
    
    // 显示选择项或继续按钮
    if (dialogue.choices && dialogue.choices.length > 0) {
        showChoices(dialogue.choices);
        elements.continueBtn.style.display = 'none';
    } else {
        hideChoices();
        elements.continueBtn.style.display = 'block';
    }
    
    currentDialogueIndex++;
}

// 推进对话
function advanceDialogue() {
    if (isAnimatingText) {
        // 如果正在动画，立即完成
        if (textAnimationInterval) {
            clearInterval(textAnimationInterval);
            timerManager.clearInterval(textAnimationInterval);
        }
        elements.dialogueText.innerHTML = currentText;
        isAnimatingText = false;
        return;
    }
    
    // 检查当前对话是否有后续
    // 获取当前正在显示的对话（currentDialogueIndex已经自增过了）
    const currentDialogue = currentDialogueIndex > 0 && (currentDialogueIndex - 1) < dialogueQueue.length ? 
        dialogueQueue[currentDialogueIndex - 1] : null;
    
    if (currentDialogue && currentDialogue.next && !currentDialogue.choices) {
        // 有指定的下一个场景
        handleNext(currentDialogue.next);
    } else if (currentDialogueIndex < dialogueQueue.length) {
        // 继续当前场景的下一个对话
        showNextDialogue();
    } else {
        // 场景结束，检查是否有默认下一步
        console.log('场景对话结束');
    }
}

// 处理下一个场景/对话
function handleNext(nextId) {
    console.log('handleNext被调用，参数:', nextId);
    
    // 在场景切换前清理所有定时器
    timerManager.clearAll();
    
    if (!nextId) {
        console.warn('nextId为空，无法处理下一步');
        return;
    }
    
    // 检查是否为结局
    if (nextId.startsWith('endings_') || nextId.startsWith('endings.')) {
        let endingType;
        
        if (nextId.startsWith('endings_')) {
            // 处理 endings_xxx_yyy 格式，取下划线后的所有部分
            const endingParts = nextId.split('_');
            if (endingParts.length >= 2) {
                // 取从第二个元素开始的所有部分并重新组合
                endingType = endingParts.slice(1).join('_');
            }
        } else {
            // 处理 endings.xxx 格式
            endingType = nextId.split('.')[1];
        }
        
        if (endingType) {
            console.log('显示结局:', endingType);
            showEnding(endingType);
        }
        return;
    }
    
    // 解析场景ID
    const parts = nextId.split('_');
    
    if (parts.length >= 2) {
        let chapter, scene;
        
        // 检查是否为chapter开头
        if (parts[0].startsWith('chapter')) {
            chapter = parts[0];
            // 剩余部分组合成场景名
            scene = parts.slice(1).join('_');
        } else {
            // 可能是直接场景引用（如chapter1_scene1）
            chapter = parts[0] + '_' + parts[1];
            scene = parts.slice(2).join('_');
        }
        
        console.log('解析结果:', { chapter, scene });
        
        // 特殊处理：如果chapter包含scene，重新解析
        if (scene === '' && chapter.includes('_')) {
            const chapterParts = chapter.split('_');
            chapter = chapterParts[0];
            scene = chapterParts.slice(1).join('_');
        }
        
        // 检查场景是否存在
        const sceneData = getSceneData(chapter, scene);
        if (!sceneData) {
            console.error(`错误：场景 ${chapter}_${scene} 不存在！`);
            // 尝试备用查找
            for (const chapKey in window.gameData) {
                if (chapKey.startsWith('chapter')) {
                    for (const sceneKey in window.gameData[chapKey]) {
                        if (sceneKey === scene || 
                            window.gameData[chapKey][sceneKey].id === nextId) {
                            console.log(`找到备用场景: ${chapKey}_${sceneKey}`);
                            showScene(chapKey, sceneKey);
                            return;
                        }
                    }
                }
            }
            
            showErrorMessage(`找不到场景：${nextId}，正在返回第一章...`);
            timerManager.addTimer(setTimeout(() => {
                showScene('chapter1', 'scene1');
            }, 2000));
            return;
        }
        
        showScene(chapter, scene);
    } else {
        console.error('无效的场景ID格式:', nextId);
        showErrorMessage('场景ID格式错误，返回第一章');
        timerManager.addTimer(setTimeout(() => {
            showScene('chapter1', 'scene1');
        }, 2000));
    }
}

// 显示结局
function showEnding(endingType) {
    // 获取所有可能的结局
    const allEndings = window.gameData.endings;
    
    if (!allEndings) {
        console.error('错误：未找到结局数据！');
        showErrorMessage('游戏结局数据缺失，无法显示结局。');
        return;
    }
    
    let selectedEnding = null;
    
    if (endingType) {
        // 特定结局
        selectedEnding = allEndings[endingType];
        if (!selectedEnding) {
            console.error(`错误：未找到结局类型 ${endingType}！`);
            showErrorMessage(`未找到结局类型：${endingType}，游戏可能遇到错误。`);
            return;
        }
    } else {
        // 根据玩家状态选择合适的结局
        selectedEnding = determineBestEnding(allEndings);
    }
    
    if (selectedEnding) {
        displayEnding(selectedEnding);
    } else {
        console.error('错误：未能确定合适的结局！');
        showErrorMessage('未能确定合适的结局，请重新开始游戏。');
    }
}

// 根据玩家状态确定最佳结局
function determineBestEnding(allEndings) {
    // 检查每个结局的条件并选择最适合的
    const possibleEndings = [];
    
    for (const endingKey in allEndings) {
        const ending = allEndings[endingKey];
        if (checkEndingCondition(ending)) {
            possibleEndings.push({
                key: endingKey,
                ending: ending,
                priority: calculateEndingPriority(ending)
            });
        }
    }
    
    if (possibleEndings.length > 0) {
        // 返回优先级最高的结局
        possibleEndings.sort((a, b) => b.priority - a.priority);
        return possibleEndings[0].ending;
    } else {
        // 如果没有符合条件的结局，返回第一个可用结局
        const endingsArray = Object.values(allEndings);
        return endingsArray.length > 0 ? endingsArray[0] : null;
    }
}

// 检查结局条件
function checkEndingCondition(ending) {
    if (!ending.condition) {
        return true; // 没有条件限制
    }
    
    const condition = ending.condition;
    
    // 检查信任度
    if (condition.trust !== undefined && gameState.trust < condition.trust) {
        return false;
    }
    
    // 检查精神健康
    if (condition.mentalHealth !== undefined && gameState.mentalHealth < condition.mentalHealth) {
        return false;
    }
    
    // 检查线索（支持 clues 和 hasAllClues 字段）
    const clueList = condition.clues || condition.hasAllClues;
    if (clueList) {
        if (!Array.isArray(clueList)) {
            // 单个线索
            if (!gameState.clues.includes(clueList)) {
                return false;
            }
        } else {
            // 多个线索，需要全部拥有
            for (const clue of clueList) {
                if (!gameState.clues.includes(clue)) {
                    return false;
                }
            }
        }
    }
    
    return true;
}

// 计算结局优先级
function calculateEndingPriority(ending) {
    let priority = 0;
    
    if (ending.condition) {
        // 更严格的条件通常意味着更高的优先级
        if (ending.condition.trust !== undefined) {
            priority += ending.condition.trust;
        }
        if (ending.condition.mentalHealth !== undefined) {
            priority += ending.condition.mentalHealth;
        }
        if (ending.condition.clues) {
            priority += ending.condition.clues.length * 10;
        }
    }
    
    return priority;
}

// 显示结局
function displayEnding(ending) {
    // 清空当前界面
    elements.speakerName.textContent = '';
    elements.dialogueText.innerHTML = '';
    hideChoices();
    elements.continueBtn.style.display = 'none';
    
    // 构建结局内容
    let endingContent = '';
    
    // 使用结局的第一个场景
    if (ending.scenes && ending.scenes[0]) {
        const scene = ending.scenes[0];
        
        // 设置背景
        if (scene.background) {
            elements.sceneBackground.style.backgroundImage = ResourceManager.getBackgroundImage(scene.background);
        }
        
        // 设置角色
        if (scene.characters) {
            updateCharacters(scene.characters);
        }
        
        // 显示对话
        if (scene.dialogue) {
            // 立即显示所有结局对话
            scene.dialogue.forEach(dialogue => {
                if (dialogue.special === 'ending') {
                    endingContent += `<div style="text-align:center; font-size:1.8rem; color:#ff9fe5; margin:20px 0; font-weight:bold;">${dialogue.text}</div>`;
                } else {
                    endingContent += `<div style="margin: 10px 0;"><strong>${dialogue.speaker || '旁白'}:</strong> ${dialogue.text}</div>`;
                }
            });
        }
    }
    
    elements.dialogueText.innerHTML = endingContent;
    
    // 显示结局标题
    if (ending.title) {
        elements.speakerName.textContent = `【${ending.title}】`;
    }
    
    // 显示重新开始按钮
    const restartButton = document.createElement('button');
    restartButton.className = 'choice-btn';
    restartButton.innerHTML = '<i class="fas fa-redo"></i> 重新开始';
    restartButton.style.marginTop = '20px';
    restartButton.onclick = () => {
        // 重置游戏状态
        resetGameState()
        // 清除游戏结束标记
        gameState.gameEnded = false;
        // 重新开始游戏
        showScene('chapter1', 'scene1');
    };
    
    elements.choicesArea.appendChild(restartButton);
    elements.choicesArea.style.display = 'block';
    
    // 标记游戏结束
    gameState.gameEnded = true;
}

// 显示错误消息
function showErrorMessage(message) {
    // 创建错误提示元素
    const errorDiv = document.createElement('div');
    errorDiv.style.position = 'fixed';
    errorDiv.style.top = '20px';
    errorDiv.style.left = '50%';
    errorDiv.style.transform = 'translateX(-50%)';
    errorDiv.style.background = 'linear-gradient(45deg, #ff4d4d, #cc0000)';
    errorDiv.style.color = 'white';
    errorDiv.style.padding = '15px 20px';
    errorDiv.style.borderRadius = '10px';
    errorDiv.style.zIndex = '3000';
    errorDiv.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
    errorDiv.style.textAlign = 'center';
    errorDiv.style.fontFamily = 'Noto Sans SC, sans-serif';
    errorDiv.style.fontSize = '16px';
    errorDiv.textContent = message;
    
    document.body.appendChild(errorDiv);
    
    // 5秒后移除
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
    
    // 同时输出到控制台
    console.error(message);
}

// 检查条件是否满足
function checkCondition(condition) {
    if (!condition) return true;
    
    // 检查标志条件
    if (condition.hasFlag) {
        if (!gameState.flags || !Array.isArray(gameState.flags)) {
            return false;
        }
        
        if (Array.isArray(condition.hasFlag)) {
            // 多个标志，只要有一个满足即可
            return condition.hasFlag.some(flag => gameState.flags.includes(flag));
        } else {
            // 单个标志
            return gameState.flags.includes(condition.hasFlag);
        }
    }
    
    // 检查信任度条件
    if (condition.minTrust !== undefined) {
        if (gameState.trust < condition.minTrust) {
            return false;
        }
    }
    
    // 检查精神健康条件
    if (condition.minMentalHealth !== undefined) {
        if (gameState.mentalHealth < condition.minMentalHealth) {
            return false;
        }
    }
    
    // 检查线索条件
    if (condition.hasClue || condition.hasAllClues) {
        const clueList = condition.hasClue || condition.hasAllClues;
        if (!gameState.clues || !Array.isArray(gameState.clues)) {
            return false;
        }
        
        if (Array.isArray(clueList)) {
            // 需要拥有所有指定线索
            return clueList.every(clue => gameState.clues.includes(clue));
        } else {
            // 单个线索
            return gameState.clues.includes(clueList);
        }
    }
    
    // 检查物品条件
    if (condition.hasItem) {
        if (!gameState.inventory || !Array.isArray(gameState.inventory)) {
            return false;
        }
        
        if (Array.isArray(condition.hasItem)) {
            // 需要拥有所有指定物品
            return condition.hasItem.every(item => gameState.inventory.includes(item));
        } else {
            // 单个物品
            return gameState.inventory.includes(condition.hasItem);
        }
    }
    
    return true;
}

// 显示选择项
function showChoices(choices) {
    elements.choicesArea.innerHTML = '';
    
    choices.forEach((choice, index) => {
        // 检查选项条件，如果没有condition字段则默认显示
        if (choice.condition && !checkCondition(choice.condition)) {
            console.log('选项条件不满足，跳过显示:', choice.text);
            return; // 不显示这个选项
        }
        
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.innerHTML = `<i class="fas fa-chevron-right"></i> ${choice.text}`;
        
        button.addEventListener('click', () => {
            console.log('=== 选择项点击事件 ===');
            console.log('选择文本:', choice.text);
            console.log('下一步场景ID:', choice.next);
            console.log('当前gameState:', JSON.stringify(gameState, null, 2));
            
            // 应用效果
            if (choice.effect) {
                console.log('应用效果:', choice.effect);
                applyEffect(choice.effect);
            }
            
            // 设置标志
            if (choice.flag) {
                console.log('设置标志:', choice.flag);
                if (!gameState.flags) {
                    gameState.flags = [];
                }
                if (!gameState.flags.includes(choice.flag)) {
                    gameState.flags.push(choice.flag);
                }
                console.log('当前flags:', gameState.flags);
            }
            
            // 记录决策
            addDecision(choice.text);
            
            // 处理下一步
            if (choice.next) {
                console.log('调用handleNext处理:', choice.next);
                handleNext(choice.next);
            } else {
                console.log('警告：选择项没有指定next场景');
            }
        });
        
        elements.choicesArea.appendChild(button);
    });
}

// 隐藏选择项
function hideChoices() {
    elements.choicesArea.innerHTML = '';
}

// 应用效果（改变状态值）
function applyEffect(effect) {
    if (effect && effect.mentalHealth !== undefined) {
        gameState.mentalHealth = Math.max(0, Math.min(100, gameState.mentalHealth + Number(effect.mentalHealth)));
    }
    
    if (effect && effect.trust !== undefined) {
        gameState.trust = Math.max(0, Math.min(100, gameState.trust + Number(effect.trust)));
    }
    
    updateGameUI();
    saveGame();
} 

// 添加线索
function addClue(clueId) {
    // 确保线索数组已初始化
    if (!gameState.clues || !Array.isArray(gameState.clues)) {
        gameState.clues = [];
    }
    
    if (!gameState.clues.includes(clueId)) {
        gameState.clues.push(clueId);
        updateCluesDisplay();
        saveGame();
        
        // 显示新线索提示
        const clueData = cluesData[clueId];
        if (clueData) {
            showNotification(`获得新线索：${clueData.name}`);
        }
    }
}

// 添加决策记录
function addDecision(decisionText) {
    // 确保决策记录结构正确初始化
    if (!gameState.decisions || typeof gameState.decisions !== 'object') {
        gameState.decisions = {};
    }
    
    // 保存到游戏状态
    if (!gameState.decisions[gameState.currentDay]) {
        gameState.decisions[gameState.currentDay] = [];
    }
    
    // 检查当天是否已有相同决策，避免重复记录
    const todayDecisions = gameState.decisions[gameState.currentDay];
    if (!todayDecisions.includes(decisionText)) {
        todayDecisions.push(decisionText);
        
        // 更新显示
        updateDecisionLog();
        saveGame();
    }
}

// 更新游戏UI
// 更新游戏UI
function updateGameUI() {
    // 安全更新状态条
    if (elements.mentalHealthBar) {
        elements.mentalHealthBar.style.width = `${gameState.mentalHealth}%`;
    }
    if (elements.mentalHealthValue) {
        elements.mentalHealthValue.textContent = `${gameState.mentalHealth}%`;
    }
    
    if (elements.trustBar) {
        elements.trustBar.style.width = `${gameState.trust}%`;
    }
    if (elements.trustValue) {
        elements.trustValue.textContent = `${gameState.trust}%`;
    }
    
    // 只有在玩家收到戒指后才显示倒计时相关信息
    const hasReceivedRing = gameState.inventory && gameState.inventory.includes('ring');
    
    if (hasReceivedRing) {
        const hasWornRing = gameState.flags && gameState.flags.includes('wore_ring');
        if (hasWornRing) {
            if (elements.remainingDays) {
                elements.remainingDays.textContent = gameState.ringDaysLeft.toString();
            }
            if (elements.ringTime) {
                elements.ringTime.textContent = `${gameState.ringDaysLeft}天`;
            }
        } else {
            if (elements.remainingDays) {
                elements.remainingDays.textContent = '--';
            }
            if (elements.ringTime) {
                elements.ringTime.textContent = '未激活';
            }
        }
    } else {
        // 还没收到戒指时，不显示倒计时信息
        if (elements.remainingDays) {
            elements.remainingDays.textContent = '';
        }
        if (elements.ringTime) {
            elements.ringTime.textContent = '';
        }
    }
    
    // 安全更新线索显示
    if (elements.cluesContainer) {
        updateCluesDisplay();
    }
    
    // 安全更新决策记录
    if (elements.decisionLog) {
        updateDecisionLog();
    }
}

// 更新线索显示
function updateCluesDisplay() {
    elements.cluesContainer.innerHTML = '';
    
    gameState.clues.forEach(clueId => {
        const clueData = cluesData[clueId];
        if (clueData) {
            const clueElement = document.createElement('div');
            clueElement.className = 'clue-item';
            clueElement.innerHTML = `
                <strong>${clueData.name}</strong>
                <div class="clue-desc">${clueData.description}</div>
            `;
            elements.cluesContainer.appendChild(clueElement);
        }
    });
}

// 更新决策记录显示
function updateDecisionLog() {
    elements.decisionLog.innerHTML = '';
    
    // 只显示最近5条决策
    const recentDecisions = [];
    const days = Object.keys(gameState.decisions).sort((a, b) => b - a);
    
    for (const day of days) {
        const dayDecisions = [...gameState.decisions[day]].reverse();
        for (const decision of dayDecisions) {
            recentDecisions.push({ day, decision });
            if (recentDecisions.length >= 5) break;
        }
        if (recentDecisions.length >= 5) break;
    }
    
    recentDecisions.reverse().forEach(item => {
        const entry = document.createElement('div');
        entry.className = 'decision-entry';
        entry.innerHTML = `
            <div class="decision-date">第${item.day}天</div>
            <div class="decision-text">${item.decision}</div>
        `;
        elements.decisionLog.appendChild(entry);
    });
}

// 显示分析界面
function showAnalysis(analysisData) {
    elements.analysisContent.innerHTML = '';
    
    // 添加标题
    const title = document.createElement('h3');
    title.textContent = analysisData.title;
    title.style.color = '#4dff88';
    elements.analysisContent.appendChild(title);
    
    // 添加假设
    if (analysisData.hypotheses) {
        analysisData.hypotheses.forEach(hypothesis => {
            const hypothesisBox = document.createElement('div');
            hypothesisBox.className = 'hypothesis-box';
            
            hypothesisBox.innerHTML = `
                <div class="hypothesis-header">
                    <strong>${hypothesis.text}</strong>
                    <span class="hypothesis-probability">${hypothesis.probability}</span>
                </div>
                <ul class="evidence-list">
                    ${hypothesis.evidence ? hypothesis.evidence.map(ev => `<li class="evidence-item">${ev}</li>`).join('') : ''}
                </ul>
            `;
            
            elements.analysisContent.appendChild(hypothesisBox);
        });
    }
    
    // 添加结论
    if (analysisData.conclusion) {
        const conclusion = document.createElement('div');
        conclusion.style.marginTop = '20px';
        conclusion.style.padding = '15px';
        conclusion.style.background = 'rgba(77, 255, 136, 0.1)';
        conclusion.style.borderLeft = '3px solid #4dff88';
        conclusion.innerHTML = `<strong>结论与建议：</strong> ${analysisData.conclusion}`;
        elements.analysisContent.appendChild(conclusion);
    }
    
    // 显示分析界面
    elements.analysisOverlay.style.display = 'flex';
}

// 关闭分析界面
function closeAnalysis() {
    if (elements.analysisOverlay) {
        elements.analysisOverlay.style.display = 'none';
    }
    
    // 继续游戏
    // 确保索引不小于1，防止访问负数索引
    const currentDialogue = currentDialogueIndex > 0 ? dialogueQueue[currentDialogueIndex - 1] : null;
    if (currentDialogue && currentDialogue.next) {
        timerManager.addTimer(setTimeout(() => {
            handleNext(currentDialogue.next);
        }, 500));
    }
}

// 安全地访问数组元素
function safeArrayAccess(array, index) {
    if (!Array.isArray(array) || index < 0 || index >= array.length) {
        return null;
    }
    return array[index];
}

// 安全地访问对象属性
function safeObjectAccess(obj, property) {
    if (!obj || typeof obj !== 'object' || !(property in obj)) {
        return null;
    }
    return obj[property];
}

// 安全地调用函数
function safeFunctionCall(fn, ...args) {
    if (typeof fn === 'function') {
        try {
            return fn(...args);
        } catch (error) {
            console.error('函数调用出错:', error);
            return null;
        }
    }
    return null;
}

// 显示通知
function showNotification(message) {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.background = 'linear-gradient(45deg, #9d4edd, #ff9fe5)';
    notification.style.color = 'white';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '10px';
    notification.style.zIndex = '2000';
    notification.style.boxShadow = '0 5px 15px rgba(0,0,0,0.3)';
    notification.style.animation = 'slideInRight 0.5s ease';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // 3秒后移除
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 3000);
}

// 显示模态窗口
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
    } else {
        console.error(`模态窗口 ${modalId} 未找到`);
    }
}

// 隐藏模态窗口
function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    } else {
        console.error(`模态窗口 ${modalId} 未找到`);
    }
}

// 保存游戏
function saveGame() {
    const saveData = {
        state: gameState,
        config: gameConfig,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('precognitionCycleSave', JSON.stringify(saveData));
    console.log('游戏已保存');
}

// 加载游戏
function loadGame() {
    const savedGame = localStorage.getItem('precognitionCycleSave');
    
    if (savedGame) {
        try {
            const saveData = JSON.parse(savedGame);
            // 先重置游戏状态
            resetGameState();
            // 然后应用保存的数据
            Object.assign(gameState, saveData.state);
            
            // 确保数据结构正确初始化
            if (!gameState.clues || !Array.isArray(gameState.clues)) {
                gameState.clues = [];
            }
            if (!gameState.decisions || typeof gameState.decisions !== 'object') {
                gameState.decisions = {};
            }
            if (!gameState.flags || !Array.isArray(gameState.flags)) {
                gameState.flags = [];
            }
            if (!gameState.inventory || !Array.isArray(gameState.inventory)) {
                gameState.inventory = [];
            }
            
            gameLoaded = true;
            console.log('游戏加载成功，继续第', gameState.currentDay, '天');
            console.log('当前场景:', gameState.currentScene);
            
        } catch (e) {
            console.error('加载游戏失败:', e);
            // 开始新游戏
            resetGameState();
        }
    } else {
        console.log('无保存数据，开始新游戏');
        resetGameState();
    }
}

// 页面卸载前保存游戏
window.addEventListener('beforeunload', function(e) {
    if (gameState && typeof gameState === 'object') {
        saveGame();
    }
});

// 确保在DOM加载完成后初始化游戏
if (window.gameData) {
    document.addEventListener('DOMContentLoaded', initGame);
} else {
    console.error('游戏数据未加载！请确保game-data.js在script.js之前加载');
    // 尝试延迟加载
    window.addEventListener('load', function() {
        if (window.gameData) {
            initGame();
        } else {
            console.error('游戏数据仍未加载，游戏无法启动');
            alert('游戏数据加载失败，请刷新页面重试');
        }
    });
}

// 初始化游戏状态
// 重命名为 resetGameState 以避免冲突
function resetGameState() {
    // 从window.gameData.gameState复制初始状态
    if (window.gameData && window.gameData.gameState) {
        // 深拷贝初始状态
        const initialState = JSON.parse(JSON.stringify(window.gameData.gameState));
        
        // 复制所有属性
        Object.keys(initialState).forEach(key => {
            gameState[key] = initialState[key];
        });
    }
    
    // 确保所有必需的数据结构都已初始化并清空
    gameState.clues = [];
    gameState.decisions = {};
    gameState.flags = [];
    gameState.inventory = [];
    
    // 重置其他状态
    gameState.currentSceneDialogIndex = 0;
    gameState.currentDay = 1;
    gameState.mentalHealth = 100;
    gameState.trust = 80;
    gameState.gameEnded = false;
    gameState.hasSeenIntro = false;
    gameState.ringDaysLeft = 30;
    
    console.log('游戏状态已重置，线索已清空');
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
@keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
}

.character.normal { opacity: 0.9; }
.character.excited { filter: brightness(1.2); }
.character.nervous { filter: hue-rotate(300deg) brightness(0.9); }
.character.confused { filter: hue-rotate(200deg) brightness(0.95); }
.character.panicked { animation: pulse 1s infinite; }
.character.anxious { filter: hue-rotate(300deg) brightness(0.8); opacity: 0.8; }
.character.terrified { filter: hue-rotate(330deg) brightness(0.7); animation: pulse 1s infinite; }
.character.relieved { filter: brightness(1.3) saturate(1.5); }
.character.proud { filter: brightness(1.2) contrast(1.2); }
.character.serious { filter: grayscale(0.3) brightness(0.95); }
.character.analytical { filter: hue-rotate(180deg) brightness(1.1); }
.character.suspicious { filter: hue-rotate(300deg) brightness(0.9); animation: pulse 2s infinite; }
.character.concerned { filter: hue-rotate(200deg) brightness(0.9); opacity: 0.95; }
.character.focused { filter: contrast(1.3) brightness(1.1); }
.character.sleepy { opacity: 0.7; filter: blur(1px); }

@keyframes pulse {
    0% { opacity: 0.7; }
    50% { opacity: 1; }
    100% { opacity: 0.7; }
}

@keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-3px); }
    50% { transform: translateX(0); }
    75% { transform: translateX(3px); }
    100% { transform: translateX(0); }
}
`;
document.head.appendChild(style);

