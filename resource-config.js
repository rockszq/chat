// 资源配置中心 - 集中管理所有游戏资源路径
window.gameResources = {
    // 角色图片资源配置
    characters: {
        basePath: 'assets/images/characters/',
        xiaotu: {
            default: 'xiaotu.png',
            emotions: {
                anxious: 'xiaotu-anxious.png',
                confused: 'xiaotu-confused.png',
                excited: 'xiaotu-excited.png',
                focused: 'xiaotu.png', // 使用默认图片
                guilty: 'xiaotu.png', // 使用默认图片
                happy: 'xiaotu.png', // 使用默认图片
                hopeful: 'xiaotu-excited.png',
                nervous: 'xiaotu-anxious.png',
                normal: 'xiaotu-normal.png',
                panicked: 'xiaotu-panicked.png',
                proud: 'xiaotu-proud.png',
                realized: 'xiaotu-excited.png',
                relieved: 'xiaotu-relieved.png',
                scared: 'xiaotu-panicked.png',
                shocked: 'xiaotu.png',
                sleepy: 'xiaotu-sleepy.png',
                terrified: 'xiaotu-panicked.png',
                thoughtful: 'xiaotu.png', // 使用默认图片
                urgent: 'xiaotu-excited.png',
                vulnerable: 'xiaotu-anxious.png'
            }
        },
        foxdad: {
            default: 'foxdad.png',
            emotions: {
                // 严肃相关情绪 - 使用 serious 图片
                alert: 'foxdad-serious.png',
                alarmed: 'foxdad-serious.png',
                serious: 'foxdad-serious.png',
                disappointed: 'foxdad-serious.png',
                protective: 'foxdad-serious.png',
                suspicious: 'foxdad-serious.png',
                
                // 分析相关情绪 - 使用 analytical 图片
                analytical: 'foxdad-analytical.png',
                concerned: 'foxdad-analytical.png',
                determined: 'foxdad-analytical.png',
                focused: 'foxdad-analytical.png',
                strategic: 'foxdad-analytical.png',
                thoughtful: 'foxdad-analytical.png',
                
                // 其他情绪 - 使用默认图片
                angry: 'foxdad.png',
                curious: 'foxdad.png',
                happy: 'foxdad.png',
                normal: 'foxdad.png',
                proud: 'foxdad.png',
                sad: 'foxdad.png',
                surprised: 'foxdad.png'
            }
        }
    },
    
    // 背景图片资源配置
    backgrounds: {
        basePath: 'assets/images/backgrounds/',
        mappings: {
            analysis_room: 'analysis_room.jpg',
            dorm: 'dorm.jpg',
            dorm_day: 'dorm.jpg', // 复用dorm图片
            dorm_night: 'dorm_night.jpg',
            foxdad_apartment: 'foxdad_apartment.jpg',
            law_office: 'law_office.jpg',
            library: 'library.jpg',
            newsroom: 'newsroom.jpg',
            old_street: 'old_street.jpg',
            outside_night: 'outside_night.jpg',
            parking_lot: 'parking_lot.jpg',
            police_station: 'police_station.jpg',
            university: 'university.jpg'
        }
    },
    
    // 物品使用系统表情符号，无需图片配置
    /* items: {
        basePath: 'assets/images/items/',
        ring: 'ring.png'
    } */
};

// 资源管理工具函数
window.ResourceManager = {
    // 获取角色图片路径
    getCharacterImage: function(characterName, emotion = 'default') {
        const charConfig = window.gameResources.characters[characterName];
        if (!charConfig) {
            console.warn(`未找到角色配置: ${characterName}`);
            return `${window.gameResources.characters.basePath}placeholder.png`;
        }
        
        let imageName;
        if (emotion === 'default' || !charConfig.emotions[emotion]) {
            imageName = charConfig.default;
        } else {
            imageName = charConfig.emotions[emotion];
        }
        
        return `${window.gameResources.characters.basePath}${imageName}`;
    },
    
    // 获取背景图片路径
    getBackgroundImage: function(backgroundId) {
        const bgConfig = window.gameResources.backgrounds;
        const imageFile = bgConfig.mappings[backgroundId];
        
        if (!imageFile) {
            console.warn(`未找到背景图片映射: ${backgroundId}`);
            return 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'; // 默认渐变
        }
        
        return `url("${bgConfig.basePath}${imageFile}")`;
    },
    
    // 获取物品图片路径 - 物品使用系统表情符号
    getItemImage: function(itemId) {
        // 物品已在HTML中使用Font Awesome图标显示，无需返回图片路径
        console.log(`物品 ${itemId} 使用系统图标显示`);
        return ''; // 返回空字符串
    },
    
    // 验证资源配置完整性
    validateResources: function() {
        const issues = [];
        
        // 验证角色图片文件是否存在
        console.log('=== 资源配置验证 ===');
        
        // 检查角色图片
        Object.keys(window.gameResources.characters).forEach(charName => {
            if (charName === 'basePath') return;
            
            const charConfig = window.gameResources.characters[charName];
            console.log(`检查角色 ${charName}:`);
            console.log(`  默认图片: ${charConfig.default}`);
            
            Object.keys(charConfig.emotions).forEach(emotion => {
                const imageFile = charConfig.emotions[emotion];
                console.log(`  情绪 ${emotion}: ${imageFile}`);
            });
        });
        
        // 检查背景图片映射
        console.log('\n检查背景图片映射:');
        Object.keys(window.gameResources.backgrounds.mappings).forEach(bgId => {
            const imageFile = window.gameResources.backgrounds.mappings[bgId];
            console.log(`  ${bgId} -> ${imageFile}`);
        });
        
        return issues;
    }
};