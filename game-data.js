// 游戏数据 - 《预知轮回》
window.gameData = {
    // 游戏状态
    gameState: {
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
    },

    // 游戏配置
    gameConfig: {
        textSpeed: 5,
        autoPlay: false  // 默认关闭自动播放，改善玩家体验
    },

    // 游戏章节数据
    chapter1: {
        scene1: {
            id: 'chapter1_scene1',
            background: 'dorm',
            characters: {
                xiaotu: { position: 'left', emotion: 'normal' },
                foxdad: { position: 'right', emotion: 'normal' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '下午三点，商学院宿舍。阳光透过百叶窗，在书桌上投下斑驳的光影。'
                },
                {
                    speaker: '旁白',
                    text: '小兔刚刚结束了一天的课程，手机上弹出一条快递通知。'
                },
                {
                    speaker: '小兔',
                    text: '奇怪，我没买东西啊...这个寄件人名字好模糊，根本看不清。'
                },
                {
                    speaker: '小兔',
                    text: '地址倒是没错...要不要打开看看？',
                    choices: [
                        {
                            text: '直接拆开包裹',
                            effect: { mentalHealth: -5 },
                            flag: 'opened_directly',
                            next: 'chapter1_scene2_direct'
                        },
                        {
                            text: '先拍照发给狐狸爸爸',
                            effect: { trust: +10 },
                            flag: 'very_cautious',
                            next: 'chapter1_scene2_cautious'
                        },
                        {
                            text: '用剪刀小心拆开',
                            effect: { mentalHealth: +5 },
                            flag: 'careful_approach',
                            next: 'chapter1_scene2_normal'
                        }
                    ]
                }
            ]
        },
        
        scene2_direct: {
            id: 'chapter1_scene2_direct',
            background: 'dorm',
            characters: {
                xiaotu: { position: 'left', emotion: 'excited' }
            },
            dialogue: [
                {
                    speaker: '小兔',
                    text: '哇，是个戒指！设计得好特别...看起来像是某种古董？',
                    action: 'add_item',
                    itemId: 'ring'
                },
                {
                    speaker: '小兔',
                    text: '还有张羊皮纸...让我看看...'
                },
                {
                    speaker: '旁白',
                    text: '羊皮纸上用古旧的字体写着：',
                    special: 'dream',
                    specialText: '「命运之戒，窥视未来。得此戒者，需于三十日内转售他人，否则将遭不幸。预知之力，亦是诅咒。」'
                },
                {
                    speaker: '小兔',
                    text: '预知未来？诅咒？这也太戏剧化了吧...感觉像是网络小说里的设定。'
                },
                {
                    speaker: '小兔',
                    text: '哈，这什么中二设定...不过戒指倒是挺好看的，试试看？',
                    choices: [
                        {
                            text: '戴上戒指',
                            flag: 'wore_ring',
                            next: 'chapter1_scene3_ring'
                        },
                        {
                            text: '先收起来',
                            next: 'chapter1_scene3_store'
                        }
                    ]
                }
            ]
        },
        
        scene2_cautious: {
            id: 'chapter1_scene2_cautious',
            background: 'dorm',
            characters: {
                xiaotu: { position: 'left', emotion: 'excited' },
                foxdad: { position: 'right', emotion: 'concerned' }
            },
            dialogue: [
                {
                    speaker: '小兔',
                    text: '狐狸爸爸，我收到了一个神秘的包裹，寄件人信息很模糊。你能帮我看看吗？',
                    next: 'chapter1_scene2_photo'
                }
            ]
        },
        
        scene2_photo: {
            id: 'chapter1_scene2_photo',
            background: 'dorm',
            characters: {
                xiaotu: { position: 'left', emotion: 'excited' },
                foxdad: { position: 'right', emotion: 'analytical' }
            },
            dialogue: [
                {
                    speaker: '狐狸爸爸',
                    text: '这个戒指的工艺很古老，上面的符号似乎是一种古老的契约标记。我建议你先别戴它。',
                    action: 'add_item',
                    itemId: 'ring',
                    next: 'chapter1_scene2_normal2'
                }
            ]
        },
        
        scene2_normal: {
            id: 'chapter1_scene2_normal',
            background: 'dorm',
            characters: {
                xiaotu: { position: 'left', emotion: 'cautious' }
            },
            dialogue: [
                {
                    speaker: '小兔',
                    text: '戒指的设计很精致，上面有复杂的花纹和古老的文字...',
                    action: 'add_item',
                    itemId: 'ring',
                    next: 'chapter1_scene2_normal2'
                }
            ]
        },
        
        scene2_normal2: {
            id: 'chapter1_scene2_normal2',
            background: 'dorm',
            characters: {
                xiaotu: { position: 'left', emotion: 'curious' }
            },
            dialogue: [
                {
                    speaker: '小兔',
                    text: '还有张羊皮纸...让我看看...',
                    special: 'dream',
                    specialText: '「命运之戒，窥视未来。得此戒者，需于三十日内转售他人，否则将遭不幸。预知之力，亦是诅咒。」'
                },
                {
                    speaker: '小兔',
                    text: '这也太夸张了...预知未来和诅咒？感觉像是奇幻小说的情节。'
                },
                {
                    speaker: '小兔',
                    text: '这什么中二设定...不过戒指倒是挺好看的，要不要试试看？',
                    choices: [
                        {
                            text: '戴上戒指',
                            flag: 'wore_ring',
                            next: 'chapter1_scene3_ring'
                        },
                        {
                            text: '先收起来仔细研究',
                            effect: { mentalHealth: +5 },
                            flag: 'research_oriented',
                            next: 'chapter1_scene3_store'
                        }
                    ]
                }
            ]
        },
        
        scene3_store: {
            id: 'chapter1_scene3_store',
            background: 'dorm',
            characters: {
                xiaotu: { position: 'left', emotion: 'curious' }
            },
            dialogue: [
                {
                    speaker: '小兔',
                    text: '我把戒指放在抽屉里观察了几天，它似乎散发着一种神秘的气息。也许应该再试试看？',
                    choices: [
                        {
                            text: '戴上戒指试试',
                            flag: 'wore_ring',
                            next: 'chapter1_scene3_ring'
                        },
                        {
                            text: '继续等待时机',
                            effect: { mentalHealth: +5 },
                            next: 'chapter1_scene3_wait'
                        },
                        {
                            text: '决定永不佩戴此物',
                            effect: { trust: +10, mentalHealth: +10 },
                            next: 'endings_never_worn'
                        }
                    ]
                }
            ]
        },
        
        scene3_wait: {
            id: 'chapter1_scene3_wait',
            background: 'dorm',
            characters: {
                xiaotu: { position: 'center', emotion: 'thoughtful' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '小兔把戒指收好，决定再观察一段时间。接下来的几天里，她总觉得戒指在抽屉里散发着微弱的光芒。',
                    action: 'advance_time',
                    daysPassed: 3
                },
                {
                    speaker: '旁白',
                    text: '第3天夜里，疲惫的小兔终于忍不住拿出了戒指...'
                },
                {
                    speaker: '旁白',
                    text: '小兔将戒指戴在右手无名指上，意外的合身。一股微妙的凉意从指尖传来。'
                },
                {
                    speaker: '小兔',
                    text: '这戒指...感觉有点奇怪，有种说不出的感觉。'
                },
                {
                    speaker: '旁白',
                    text: '也许是这几天的紧张情绪积累，小兔感到一阵困意袭来，倒在床上沉沉睡去...'
                },
                {
                    speaker: '旁白',
                    text: '然后，她做了一个异常清晰的梦。',
                    special: 'dream',
                    specialText: '梦中，你和狐狸爸爸一起玩王者荣耀，你们配合默契，连续赢了五局比赛。游戏结束后你起身去倒水喝，右小腿不小心撞到了宿舍的床角，疼得倒吸一口凉气。时钟指向晚上9点47分。'
                },
                {
                    speaker: '小兔',
                    text: '唔...好真实的梦...'
                },
                {
                    speaker: '旁白',
                    text: '第二天晚上，小兔来到狐狸爸爸的公寓...'
                },
                {
                    speaker: '旁白',
                    text: '狐狸爸爸注意到了小兔脸上掩饰不住的喜悦。',
                    next: 'chapter1_scene4_evening'
                }
            ]
        },
        
        scene3_ring: {
            id: 'chapter1_scene3_ring',
            background: 'dorm',
            characters: {
                xiaotu: { position: 'center', emotion: 'sleepy' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '小兔将戒指戴在右手无名指上，意外的合身。一股微妙的凉意从指尖传来。'
                },
                {
                    speaker: '小兔',
                    text: '这戒指...感觉有点奇怪，有种说不出的感觉。'
                },
                {
                    speaker: '旁白',
                    text: '也许是下午的课程太累，小兔感到一阵困意袭来，倒在床上沉沉睡去...'
                },
                {
                    speaker: '旁白',
                    text: '然后，她做了一个异常清晰的梦。',
                    special: 'dream',
                    specialText: '梦中，你和狐狸爸爸一起玩王者荣耀，你们配合默契，连续赢了五局比赛。游戏结束后你起身去倒水喝，右小腿不小心撞到了宿舍的床角，疼得倒吸一口凉气。时钟指向晚上9点47分。'
                },
                {
                    speaker: '小兔',
                    text: '唔...好真实的梦...',
                    next: 'chapter1_scene4_evening'
                }
            ]
        },
        
        scene4_evening: {
            id: 'chapter1_scene4_evening',
            background: 'foxdad_apartment',
            characters: {
                xiaotu: { position: 'left', emotion: 'nervous' },
                foxdad: { position: 'right', emotion: 'concerned' }
            },
            dialogue: [
                {
                    speaker: '狐狸爸爸',
                    text: '你今天看起来很高兴，是不是有什么开心的事？'
                },
                {
                    speaker: '小兔',
                    text: '没什么...就是做了个很真实的梦，梦见和爸爸一起玩游戏，在一起就很开心。',
                    choices: [
                        {
                            text: '详细描述那个梦',
                            effect: { trust: +10 },
                            next: 'chapter1_scene5_detail'
                        },
                        {
                            text: '含糊带过',
                            effect: { trust: -5 },
                            next: 'chapter1_scene5_vague'
                        },
                        {
                            text: '转移话题',
                            next: 'chapter1_scene5_avoid'
                        }
                    ]
                }
            ]
        },
        
        scene5_vague: {
            id: 'chapter1_scene5_vague',
            background: 'foxdad_apartment',
            characters: {
                xiaotu: { position: 'left', emotion: 'nervous' },
                foxdad: { position: 'right', emotion: 'concerned' }
            },
            dialogue: [
                {
                    speaker: '小兔',
                    text: '就是...做了一个很生动的梦，感觉像真的发生过一样。',
                    effect: { trust: -10 },
                    next: 'chapter1_scene6_truth'
                }
            ]
        },
        
        scene5_avoid: {
            id: 'chapter1_scene5_avoid',
            background: 'foxdad_apartment',
            characters: {
                xiaotu: { position: 'left', emotion: 'anxious' },
                foxdad: { position: 'right', emotion: 'analytical' }
            },
            dialogue: [
                {
                    speaker: '小兔',
                    text: '没事，可能是最近学习压力大了。换个话题吧，你今天过得怎么样？',
                    effect: { trust: -15 },
                    next: 'chapter1_scene6_truth'
                }
            ]
        },
        
        scene6_truth: {
            id: 'chapter1_scene6_truth',
            background: 'foxdad_apartment',
            characters: {
                xiaotu: { position: 'left', emotion: 'relieved' },
                foxdad: { position: 'right', emotion: 'analytical' }
            },
            dialogue: [
                {
                    speaker: '狐狸爸爸',
                    text: '不管怎样，我们需要注意这种异常现象。让我做一些记录和分析。',
                    action: 'add_clue',
                    clueId: 'first_dream',
                    special: 'clue_added',
                    specialText: '小兔首次预知能力验证：准确预知了与狐狸爸爸一起玩王者荣耀五连胜以及撞床角的时间等细节。',
                    next: 'chapter2_scene1'
                }
            ]
        },
        
        scene5_detail: {
            id: 'chapter1_scene5_detail',
            background: 'foxdad_apartment',
            characters: {
                xiaotu: { position: 'left', emotion: 'happy' },
                foxdad: { position: 'right', emotion: 'analytical' }
            },
            dialogue: [
                {
                    speaker: '小兔',
                    text: '我梦到...今晚我们一起玩王者荣耀，配合特别好，连赢了五局！然后我起身去倒水喝时撞到了宿舍的床角，右腿这里，很疼。时间是9点47分。'
                },
                {
                    speaker: '狐狸爸爸',
                    text: '听起来是个不错的梦呢。有时候梦境确实会很真实。'
                },
                {
                    speaker: '旁白',
                    text: '几天后的一个晚上，小兔和狐狸爸爸偶然一起玩起了王者荣耀...'
                },
                {
                    speaker: '小兔',
                    text: '爸爸，我们好久没一起玩游戏了呢。'
                },
                {
                    speaker: '狐狸爸爸',
                    text: '是啊，一起玩玩游戏放松一下。'
                },
                {
                    speaker: '旁白',
                    text: '游戏开始了。第一局配合不错，第二局也赢了，第三局、第四局、第五局...竟然连续赢了五局！'
                },
                {
                    speaker: '小兔',
                    text: '哇...我们配合得真好，居然连赢了五局！'
                },
                {
                    speaker: '狐狸爸爸',
                    text: '时间不早了，已经9点多了。'
                },
                {
                    speaker: '小兔',
                    text: '是啊，玩了这么久，我去倒杯水喝。'
                },
                {
                    speaker: '旁白',
                    text: '小兔站起身走向饮水机，就在她弯腰接水的瞬间，不小心撞到了桌角！'
                },
                {
                    speaker: '小兔',
                    text: '哎呀！好疼！'
                },
                {
                    speaker: '狐狸爸爸',
                    text: '让我看看...哎呀，撞得不轻，都有点红了。'
                },
                {
                    speaker: '旁白',
                    text: '狐狸爸爸的眼神变得严肃起来。'
                },
                {
                    speaker: '狐狸爸爸',
                    text: '今晚真是巧合的一晚啊...你这个梦确实很神奇。那个戒指是什么来历？',
                    next: 'chapter1_scene6_truth'
                }
            ]
        }
    },
    
    // 第二章：预知的诱惑
    chapter2: {
        scene1: {
            id: 'chapter2_scene1',
            background: 'university',
            characters: {
                xiaotu: { position: 'left', emotion: 'excited' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '由于采取了更谨慎的态度，小兔在使用戒指时更加小心。她先在小范围内验证了预知能力，然后才进行更大胆的尝试。',
                    condition: {
                        hasFlag: 'research_oriented'
                    }
                },
                {
                    speaker: '旁白',
                    text: '接下来的几天，小兔开始测试戒指的能力。',
                    condition: {
                        hasFlag: 'very_cautious'
                    }
                },
                {
                    speaker: '旁白',
                    text: '尽管取得了一些成功，小兔依然保持高度警惕，仔细权衡每一次使用戒指的利弊。',
                    condition: {
                        hasFlag: 'very_cautious'
                    }
                },
                {
                    speaker: '旁白',
                    text: '接下来的几天，小兔开始测试戒指的能力。',
                    condition: {
                        hasFlag: 'opened_directly'
                    }
                },
                {
                    speaker: '旁白',
                    text: '由于一开始就大胆使用，小兔迅速沉迷于戒指带来的便利。她轻松获得了A+的成绩，但精神压力也在增加。',
                    condition: {
                        hasFlag: 'opened_directly'
                    }
                },
                {
                    speaker: '旁白',
                    text: '接下来的几天，小兔开始测试戒指的能力。'
                },
                {
                    speaker: '旁白',
                    text: '通过预知第二天的考试内容，她轻松获得了A+的成绩。'
                },
                {
                    speaker: '旁白',
                    text: '现在，她面临一个选择...',
                    choices: [
                        {
                            text: '继续用于学业',
                            effect: { mentalHealth: -5 },
                            next: 'chapter2_scene2_study'
                        },
                        {
                            text: '尝试预知投资信息',
                            effect: { mentalHealth: -10 },
                            next: 'chapter2_scene2_invest'
                        },
                        {
                            text: '探索其他用途',
                            next: 'chapter2_scene2_explore'
                        }
                    ]
                }
            ]
        },
        
        scene2_study: {
            id: 'chapter2_scene2_study',
            background: 'university',
            characters: {
                xiaotu: { position: 'left', emotion: 'focused' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '小兔继续使用戒指预知考试内容，成绩越来越好，但她开始感到精神上的负担。',
                    effect: { mentalHealth: -5 },
                    choices: [
                        {
                            text: '继续专注学业',
                            effect: { mentalHealth: -10 },
                            next: 'chapter2_scene5_investigation'
                        },
                        {
                            text: '尝试其他用途',
                            next: 'chapter2_scene2_explore'
                        },
                        {
                            text: '暂停使用，休息一下',
                            effect: { mentalHealth: +10 },
                            next: 'chapter2_scene5_investigation'
                        }
                    ]
                }
            ]
        },
        
        scene2_explore: {
            id: 'chapter2_scene2_explore',
            background: 'dorm',
            characters: {
                xiaotu: { position: 'center', emotion: 'curious' }
            },
            dialogue: [
                {
                    speaker: '小兔',
                    text: '除了学业和投资，戒指还能用来预知什么呢？也许可以预防意外，或者帮助别人？',
                    choices: [
                        {
                            text: '尝试帮助同学避免小意外',
                            effect: { trust: +5 },
                            next: 'chapter2_scene5_investigation'
                        },
                        {
                            text: '预知日常生活的小细节',
                            effect: { mentalHealth: -5 },
                            next: 'chapter2_scene5_investigation'
                        },
                        {
                            text: '系统性地测试各种可能性',
                            next: 'chapter2_scene2_systematic'
                        }
                    ]
                }
            ]
        },
        
        scene2_systematic: {
            id: 'chapter2_scene2_systematic',
            background: 'dorm',
            characters: {
                xiaotu: { position: 'center', emotion: 'focused' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '小兔决定采用更系统的方法来测试戒指的能力范围。她制定了详细的测试计划，从金融市场的宏观趋势到个人生活的微观细节。'
                },
                {
                    speaker: '小兔',
                    text: '让我先从相对容易验证的领域开始...比如金融市场。如果我能准确预测股价变动，那就证明了预知能力的真实性。',
                    choices: [
                        {
                            text: '专注于股市预测',
                            next: 'chapter2_scene2_invest'
                        },
                        {
                            text: '扩展到其他金融领域',
                            next: 'chapter2_scene2_other_finance'
                        }
                    ]
                }
            ]
        },
        
        scene2_other_finance: {
            id: 'chapter2_scene2_other_finance',
            background: 'dorm',
            characters: {
                xiaotu: { position: 'center', emotion: 'thoughtful' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '小兔尝试预知外汇汇率、商品期货价格等其他金融信息，但发现这些领域的准确性不如股市预测那么高。'
                },
                {
                    speaker: '小兔',
                    text: '看来戒指在某些特定领域效果更好。股市预测的成功率最高，也许这就是它的主要用途。',
                    next: 'chapter2_scene2_invest'
                }
            ]
        },
        
        scene2_invest: {
            id: 'chapter2_scene2_invest',
            background: 'dorm_night',
            characters: {
                xiaotu: { position: 'center', emotion: 'focused' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '小兔戴上戒指，集中精神思考股票市场...',
                    special: 'dream',
                    specialText: '梦境中，她看到狐狸爸爸的手机屏幕，上面显示着股票走势图。\n\n"TechGrow Inc."的股价在三天内从$45飙升至$68。\n\n新闻标题片段："AI芯片突破性进展..."'
                },
                {
                    speaker: '小兔',
                    text: 'TechGrow...AI芯片...这信息太有用了！',
                    choices: [
                        {
                            text: '立即告诉狐狸爸爸',
                            next: 'chapter2_scene3_tell'
                        },
                        {
                            text: '先用自己积蓄投资',
                            next: 'chapter2_scene3_self'
                        }
                    ]
                }
            ]
        },
        
        scene3_self: {
            id: 'chapter2_scene3_self',
            background: 'dorm',
            characters: {
                xiaotu: { position: 'center', emotion: 'excited' }
            },
            dialogue: [
                {
                    speaker: '小兔',
                    text: '我用自己的积蓄投资了TechGrow股票，根据预知，三天后价格会大幅上涨。',
                    action: 'add_clue',
                    clueId: 'stock_prediction',
                    special: 'clue_added',
                    specialText: '预知验证：TechGrow股票从$45涨至$68，与预知结果基本一致，证明了戒指的预知能力。',
                    choices: [
                        {
                            text: '继续小额投资',
                            effect: { mentalHealth: -5 },
                            next: 'chapter2_scene4_honest'
                        },
                        {
                            text: '将成果分享给狐狸爸爸',
                            next: 'chapter2_scene3_tell'
                        },
                        {
                            text: '加大投资力度',
                            effect: { mentalHealth: -10 },
                            next: 'chapter2_scene4_honest'
                        }
                    ]
                }
            ]
        },
        
        scene3_tell: {
            id: 'chapter2_scene3_tell',
            background: 'foxdad_apartment',
            characters: {
                xiaotu: { position: 'left', emotion: 'excited' },
                foxdad: { position: 'right', emotion: 'suspicious' }
            },
            dialogue: [
                {
                    speaker: '小兔',
                    text: '狐狸爸爸，我有个投资建议！TechGrow的股票会在三天内大涨！'
                },
                {
                    speaker: '狐狸爸爸',
                    text: '哦？你的依据是什么？我这边可没看到任何重大利好消息。'
                },
                {
                    speaker: '小兔',
                    text: '就是...一种直觉！',
                    choices: [
                        {
                            text: '坦白戒指的秘密',
                            effect: { trust: +20 },
                            next: 'chapter2_scene4_honest'
                        },
                        {
                            text: '坚持说是内部消息',
                            effect: { trust: -10 },
                            next: 'chapter2_scene4_lie'
                        }
                    ]
                }
            ]
        },
        
        scene4_lie: {
            id: 'chapter2_scene4_lie',
            background: 'foxdad_apartment',
            characters: {
                xiaotu: { position: 'left', emotion: 'guilty' },
                foxdad: { position: 'right', emotion: 'disappointed' }
            },
            dialogue: [
                {
                    speaker: '狐狸爸爸',
                    text: '小兔，我知道你有事瞒着我。如果你信任我，就应该告诉我真相。',
                    effect: { trust: -15 },
                    choices: [
                        {
                            text: '继续隐瞒',
                            effect: { trust: -10 },
                            next: 'chapter2_scene5_investigation'
                        },
                        {
                            text: '最终决定坦白',
                            effect: { trust: +20 },
                            next: 'chapter2_scene4_honest'
                        }
                    ]
                }
            ]
        },
        
        scene4_honest: {
            id: 'chapter2_scene4_honest',
            background: 'foxdad_apartment',
            characters: {
                xiaotu: { position: 'left', emotion: 'nervous' },
                foxdad: { position: 'right', emotion: 'analytical' }
            },
            dialogue: [
                {
                    speaker: '小兔',
                    text: '其实...是这枚戒指。它能让我梦到未来。'
                },
                {
                    speaker: '旁白',
                    text: '小兔将戒指和羊皮纸说明都展示给狐狸爸爸看。'
                },
                {
                    speaker: '狐狸爸爸',
                    text: '预知未来的戒指...三十天内必须转卖...',
                    action: 'start_analysis',
                    analysis: {
                        title: '戒指初步分析',
                        hypotheses: [
                            {
                                text: '心理暗示效应',
                                probability: '15%',
                                evidence: ['梦境内容基于已有信息', '验证可能存在确认偏差']
                            },
                            {
                                text: '真实的预知能力',
                                probability: '60%',
                                evidence: ['撞腿事件完全一致', '时间细节精准', '超出已知信息范围']
                            },
                            {
                                text: '未知科技/超自然现象',
                                probability: '25%',
                                evidence: ['羊皮纸的古旧文字', '必须转卖的警告', '精准的时间限制']
                            }
                        ],
                        conclusion: '建议：谨慎使用，记录所有预知内容，验证准确性。同时调查戒指来源。'
                    },
                    next: 'chapter2_scene5_investigation'
                }
            ]
        },
        
        scene5_investigation: {
            id: 'chapter2_scene5_investigation',
            background: 'foxdad_apartment',
            characters: {
                xiaotu: { position: 'left', emotion: 'excited' },
                foxdad: { position: 'right', emotion: 'analytical' }
            },
            dialogue: [
                {
                    speaker: '狐狸爸爸',
                    text: '这些信息非常有价值，但我们必须小心使用。预知能力可能会带来意想不到的后果。',
                    choices: [
                        {
                            text: '继续谨慎使用戒指',
                            next: 'chapter2_scene6_transition'
                        },
                        {
                            text: '尝试寻找戒指的来源',
                            next: 'chapter2_scene6_transition'
                        },
                        {
                            text: '考虑将戒指转送他人',
                            effect: { trust: +5 },
                            next: 'chapter2_scene6_transition'
                        }
                    ]
                }
            ]
        },
        
        scene6_transition: {
            id: 'chapter2_scene6_transition',
            background: 'dorm',
            characters: {
                xiaotu: { position: 'center', emotion: 'reflective' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '接下来的几天，小兔继续使用戒指，每天都有新的体验。有时是预知考试题目，有时是避免小意外，甚至偶尔帮助同学解决问题。',
                    action: 'advance_time',
                    daysPassed: 1
                },
                {
                    speaker: '旁白',
                    text: '随着时间一天天过去，小兔逐渐适应了这种能力。但每当夜深人静时，羊皮纸上的警告总是在她心中回响。',
                    action: 'advance_time',
                    daysPassed: 2
                },
                {
                    speaker: '旁白',
                    text: '第7天，小兔开始注意到一些异常：她总是梦到一些从未见过的面孔，一些不属于她的记忆片段。',
                    action: 'advance_time',
                    daysPassed: 2
                },
                {
                    speaker: '旁白',
                    text: '第9天，小兔的预知梦变得更加生动，有时分不清现实与梦境。她开始担心这是否与戒指有关。',
                    action: 'advance_time',
                    daysPassed: 2
                },
                {
                    speaker: '旁白',
                    text: '第10天，小兔意识到自己已经持有戒指超过10天了。羊皮纸上的警告越来越让她不安。',
                    action: 'advance_time',
                    daysPassed: 2
                },
                {
                    speaker: '小兔',
                    text: '我必须更加小心...如果羊皮纸说的是真的，我的时间不多了。',
                    effect: { mentalHealth: -10 },
                    next: 'chapter3_scene1'
                }
            ]
        }
    },
    
    // 第三章：噩梦的开端
    chapter3: {
        scene1: {
            id: 'chapter3_scene1',
            background: 'dorm_night',
            characters: {
                xiaotu: { position: 'center', emotion: 'terrified' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '第15天，凌晨3点。小兔从噩梦中惊醒，浑身冷汗。',
                    special: 'dream',
                    specialText: '梦中，你独自在家。门锁被撬开的声音。\n\n沉重的脚步声。男人的呼吸声。\n\n窗外红色霓虹灯闪烁，时间：23:47。\n\n一只手捂住你的口鼻，左手腕上有蛇形纹身。\n\n窒息感...然后惊醒。',
                    action: 'advance_time',
                    daysPassed: 1
                },
                {
                    speaker: '小兔',
                    text: '不...不可能...这只是噩梦...',
                    choices: [
                        {
                            text: '立即联系狐狸爸爸',
                            next: 'chapter3_scene1_day16'
                        },
                        {
                            text: '告诉自己这只是噩梦',
                            effect: { mentalHealth: -20 },
                            next: 'chapter3_scene1_day16_deny'
                        }
                    ]
                }
            ]
        },
        
        scene1_day16: {
            id: 'chapter3_scene1_day16',
            background: 'dorm_day',
            characters: {
                xiaotu: { position: 'center', emotion: 'anxious' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '第16天，白天。小兔试图专注于日常活动，但噩梦的阴影始终挥之不去。她发现自己开始频繁地检查门窗锁是否牢固。',
                    action: 'advance_time',
                    daysPassed: 1,
                    effect: { mentalHealth: -5 }
                },
                {
                    speaker: '小兔',
                    text: '我必须保持冷静...也许这真的只是压力造成的。',
                    next: 'chapter3_scene1_day17'
                }
            ]
        },
        
        scene1_day16_deny: {
            id: 'chapter3_scene1_day16_deny',
            background: 'dorm_day',
            characters: {
                xiaotu: { position: 'center', emotion: 'denying' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '第16天，白天。小兔强迫自己忽略噩梦，但潜意识里的恐惧仍然影响着她的行为。她开始无意识地避开夜晚外出。',
                    action: 'advance_time',
                    daysPassed: 1,
                    effect: { mentalHealth: -10 }
                },
                {
                    speaker: '小兔',
                    text: '我不相信这些...但这梦也太真实了。',
                    next: 'chapter3_scene1_day17'
                }
            ]
        },
        
        scene1_day17: {
            id: 'chapter3_scene1_day17',
            background: 'university',
            characters: {
                xiaotu: { position: 'left', emotion: 'distracted' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '第17天。小兔在课堂上难以集中注意力，总感觉有人在暗中观察她。她开始使用戒指预知课堂提问，以掩饰自己的心不在焉。',
                    action: 'advance_time',
                    daysPassed: 1,
                    effect: { mentalHealth: -5 }
                },
                {
                    speaker: '小兔',
                    text: '我需要保持正常的生活节奏...但那个梦一直在困扰我。',
                    next: 'chapter3_scene1_day18'
                }
            ]
        },
        
        scene1_day18: {
            id: 'chapter3_scene1_day18',
            background: 'dorm_day',
            characters: {
                xiaotu: { position: 'center', emotion: 'paranoid' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '第18天。小兔开始在房间里安装额外的安全装置，购买了门挡和窗户锁。她告诉自己这只是为了安心。',
                    action: 'advance_time',
                    daysPassed: 1,
                    effect: { trust: +5 }
                },
                {
                    speaker: '小兔',
                    text: '多做些准备总是好的...以防万一。',
                    next: 'chapter3_scene1_day19'
                }
            ]
        },
        
        scene1_day19: {
            id: 'chapter3_scene1_day19',
            background: 'dorm_night',
            characters: {
                xiaotu: { position: 'center', emotion: 'scared' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '第19天夜里。小兔再次被噩梦惊醒，这次梦境更加清晰。她看到了攻击者更详细的面貌特征。',
                    special: 'dream',
                    specialText: '梦中的画面更加清晰：除了蛇形纹身，她还看到了攻击者左脸颊上的疤痕。',
                    action: 'advance_time',
                    daysPassed: 1,
                    effect: { mentalHealth: -10 }
                },
                {
                    speaker: '小兔',
                    text: '这不仅仅是噩梦...但我真的应该相信这些预知吗？',
                    choices: [
                        {
                            text: '相信预知，告诉狐狸爸爸',
                            next: 'chapter3_scene2_call'
                        },
                        {
                            text: '认为是巧合，继续否认',
                            next: 'chapter3_scene2_deny'
                        }
                    ]
                }
            ]
        },
        
        scene2_deny: {
            id: 'chapter3_scene2_deny',
            background: 'dorm_night',
            characters: {
                xiaotu: { position: 'left', emotion: 'denying' }
            },
            dialogue: [
                {
                    speaker: '小兔',
                    text: '不，这一定是巧合，或者是压力太大产生的幻觉。我不能相信这种事情是真的。',
                    effect: { mentalHealth: -15 },
                    choices: [
                        {
                            text: '强迫自己冷静下来',
                            effect: { mentalHealth: +5 },
                            next: 'chapter3_scene3_analysis'
                        },
                        {
                            text: '决定告诉狐狸爸爸实情',
                            next: 'chapter3_scene2_call'
                        },
                        {
                            text: '继续否认现实',
                            effect: { mentalHealth: -10 },
                            next: 'chapter3_scene3_analysis'
                        }
                    ]
                }
            ]
        },
        
        scene3_analysis: {
            id: 'chapter3_scene3_analysis',
            background: 'foxdad_apartment',
            characters: {
                xiaotu: { position: 'left', emotion: 'anxious' },
                foxdad: { position: 'right', emotion: 'serious' }
            },
            dialogue: [
                {
                    speaker: '狐狸爸爸',
                    text: '根据你提供的信息，我做了一个风险分析。',
                    action: 'start_analysis',
                    analysis: {
                        title: '死亡预知分析',
                        hypotheses: [
                            {
                                text: '随机入室抢劫',
                                probability: '20%',
                                evidence: ['小兔近期无仇家', '住所安保一般']
                            },
                            {
                                text: '戒指相关袭击',
                                probability: '65%',
                                evidence: ['时间点在持有戒指第25天', '预知能力可能被察觉', '羊皮纸警告"遭遇不幸"']
                            },
                            {
                                text: '与小兔投资行为相关',
                                probability: '15%',
                                evidence: ['近期异常投资收益', '可能引起注意']
                            }
                        ],
                        conclusion: '建议：1. 立即搬家 2. 安装安防系统 3. 调查戒指来源和前持有者 4. 制定应对计划'
                    },
                    next: 'chapter3_scene4_plan'
                }
            ]
        },
        
        scene4_plan: {
            id: 'chapter3_scene4_plan',
            background: 'foxdad_apartment',
            characters: {
                xiaotu: { position: 'left', emotion: 'anxious' },
                foxdad: { position: 'right', emotion: 'analytical' }
            },
            dialogue: [
                {
                    speaker: '狐狸爸爸',
                    text: '我们需要制定一个详细的安全计划，确保你的安全。',
                    choices: [
                        {
                            text: '听从狐狸爸爸的建议',
                            effect: { trust: +10 },
                            next: 'chapter3_scene5_final'
                        },
                        {
                            text: '自己想办法应对',
                            effect: { mentalHealth: -10 },
                            next: 'chapter3_scene5_final'
                        }
                    ]
                }
            ]
        },
        
        scene5_final: {
            id: 'chapter3_scene5_final',
            background: 'dorm_night',
            characters: {
                xiaotu: { position: 'center', emotion: 'nervous' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '第20天夜里。小兔感受到了前所未有的压力，距离预言的死亡时间只剩下不到10天。',
                    action: 'advance_time',
                    daysPassed: 1,
                    effect: { mentalHealth: -10 }
                },
                {
                    speaker: '小兔',
                    text: '我必须在这最后几天里做出决定...时间不多了。',
                    choices: [
                        {
                            text: '继续研究戒指的秘密',
                            next: 'chapter3_scene20_research'
                        },
                        {
                            text: '寻求更多帮助',
                            next: 'chapter3_scene20_help'
                        },
                        {
                            text: '尝试将戒指转交给他人',
                            next: 'chapter3_scene20_transfer'
                        }
                    ]
                }
            ]
        },
        
        scene20_research: {
            id: 'chapter3_scene20_research',
            background: 'dorm',
            characters: {
                xiaotu: { position: 'center', emotion: 'focused' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '第21天。小兔彻夜研究戒指和羊皮纸的每一个细节，试图找到解除诅咒的方法。她查阅了大量关于神秘学和古代仪式的资料。',
                    action: 'advance_time',
                    daysPassed: 1,
                    effect: { mentalHealth: -5 }
                },
                {
                    speaker: '小兔',
                    text: '一定有办法...我不能就这样放弃。',
                    next: 'chapter3_scene21_progress'
                }
            ]
        },
        
        scene20_help: {
            id: 'chapter3_scene20_help',
            background: 'foxdad_apartment',
            characters: {
                xiaotu: { position: 'left', emotion: 'desperate' },
                foxdad: { position: 'right', emotion: 'determined' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '第21天。小兔和狐狸爸爸联手，利用他的资源和人脉寻求更多帮助。他们联系了超自然现象研究专家和安全顾问。',
                    action: 'advance_time',
                    daysPassed: 1,
                    effect: { trust: +5 }
                },
                {
                    speaker: '小兔',
                    text: '至少我们不是孤军奋战。',
                    next: 'chapter3_scene21_progress'
                }
            ]
        },
        
        scene20_transfer: {
            id: 'chapter3_scene20_transfer',
            background: 'dorm',
            characters: {
                xiaotu: { position: 'center', emotion: 'decisive' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '第21天。小兔开始寻找合适的戒指转交人选，试图在时间截止前找到下一位持有者。她在网上发布了隐晦的广告，同时小心谨慎地筛选潜在候选人。',
                    action: 'advance_time',
                    daysPassed: 1
                },
                {
                    speaker: '小兔',
                    text: '希望我能找到合适的人选...时间不等人。',
                    next: 'chapter3_scene21_progress'
                }
            ]
        },
        
        scene21_progress: {
            id: 'chapter3_scene21_progress',
            background: 'dorm_night',
            characters: {
                xiaotu: { position: 'center', emotion: 'anxious' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '第22天夜里。小兔的调查有了初步进展，但也发现了更令人担忧的事实：前几任持有者都是在持有戒指约25-30天时遭遇不幸。',
                    action: 'advance_time',
                    daysPassed: 1,
                    effect: { mentalHealth: -5 }
                },
                {
                    speaker: '小兔',
                    text: '我只剩下大约一周时间了...必须加快进度。',
                    next: 'chapter3_scene22_deeper'
                }
            ]
        },
        
        scene22_deeper: {
            id: 'chapter3_scene22_deeper',
            background: 'analysis_room',
            characters: {
                xiaotu: { position: 'left', emotion: 'determined' },
                foxdad: { position: 'right', emotion: 'concerned' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '第23天。通过深入调查，小兔和狐狸爸爸发现了更多关于戒指历史的信息，以及一个可能的解决方案。',
                    action: 'advance_time',
                    daysPassed: 1,
                    effect: { trust: +5 }
                },
                {
                    speaker: '小兔',
                    text: '也许我们真的有机会打破这个循环。',
                    next: 'chapter3_scene23_critical'
                }
            ]
        },
        
        scene23_critical: {
            id: 'chapter3_scene23_critical',
            background: 'dorm',
            characters: {
                xiaotu: { position: 'center', emotion: 'resolute' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '第24天。情况变得越来越紧急，小兔必须做出最终的关键决定。她的每一步行动都可能影响最终的结果。',
                    action: 'advance_time',
                    daysPassed: 1,
                    effect: { mentalHealth: -5 }
                },
                {
                    speaker: '小兔',
                    text: '明天就是第25天了...我不能再犹豫了。',
                    next: 'chapter3_scene24_before_final'
                }
            ]
        },
        
        scene24_before_final: {
            id: 'chapter3_scene24_before_final',
            background: 'dorm_night',
            characters: {
                xiaotu: { position: 'center', emotion: 'reflective' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '第25天夜里。小兔站在人生的十字路口，回想着这段时间的经历。无论选择哪条路，明天都将决定她的命运。',
                    action: 'advance_time',
                    daysPassed: 1,
                    effect: { mentalHealth: -10 }
                },
                {
                    speaker: '小兔',
                    text: '明天...一切都会结束。无论是生还是死，我都必须面对。',
                    next: 'chapter3_scene25_decision_time'
                }
            ]
        },
        
        scene25_decision_time: {
            id: 'chapter3_scene25_decision_time',
            background: 'dorm_night',
            characters: {
                xiaotu: { position: 'center', emotion: 'anxious' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '第25天晚上23:47。预言中的时间终于到来。小兔感受到了前所未有的恐惧，她知道这一刻决定了她的生死。',
                    special: 'dream',
                    specialText: '门锁被撬开的声音响起。沉重的脚步声在黑暗中回荡。一个男人出现在房间里，左手腕上有明显的蛇形纹身。时间正好是23:47。',
                    effect: { mentalHealth: -20 }
                },
                {
                    speaker: '小兔',
                    text: '它...真的来了...我必须做出最后的选择！',
                    choices: [
                        {
                            text: '使用戒指预知对方行动',
                            effect: { trust: +5 },
                            next: 'chapter3_scene25_confrontation'
                        },
                        {
                            text: '尝试逃跑',
                            effect: { mentalHealth: -10 },
                            next: 'chapter3_scene25_escape'
                        },
                        {
                            text: '按照计划应对',
                            effect: { trust: +10 },
                            next: 'chapter3_scene25_resolution'
                        }
                    ]
                }
            ]
        },
        
        scene25_confrontation: {
            id: 'chapter3_scene25_confrontation',
            background: 'dorm_night',
            characters: {
                xiaotu: { position: 'center', emotion: 'focused' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '小兔戴上戒指，集中精神预知攻击者的行动。她看到了接下来几分钟的所有动作，成功避开了致命攻击。',
                    action: 'add_clue',
                    clueId: 'final_confrontation',
                    special: 'clue_added',
                    specialText: '通过预知能力，小兔成功化解了第25天的危机，但这也意味着她必须继续面对戒指的诅咒。'
                },
                {
                    speaker: '小兔',
                    text: '我...我活下来了。但这意味着什么？',
                    next: 'chapter3_scene25_aftermath'
                }
            ]
        },
        
        scene25_escape: {
            id: 'chapter3_scene25_escape',
            background: 'outside_night',
            characters: {
                xiaotu: { position: 'center', emotion: 'panicked' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '小兔趁攻击者尚未完全进入房间时冲出门外，拼命逃跑。她在街头漫无目的地奔跑，直到天亮才敢停下。',
                    effect: { mentalHealth: -15 }
                },
                {
                    speaker: '小兔',
                    text: '我逃出来了...但诅咒还在继续吗？',
                    next: 'chapter3_scene25_aftermath'
                }
            ]
        },
        
        scene25_resolution: {
            id: 'chapter3_scene25_resolution',
            background: 'dorm_night',
            characters: {
                xiaotu: { position: 'center', emotion: 'determined' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '小兔按照此前制定的计划行事。她没有抵抗，而是将戒指放置在床头柜上，然后静静地坐在角落。攻击者进入后，似乎对戒指更感兴趣，最终离开时带走了戒指。',
                    action: 'add_clue',
                    clueId: 'resolution_method',
                    special: 'clue_added',
                    specialText: '小兔成功打破了循环，通过将戒指转移给下一个宿命之人，终止了自己的诅咒。'
                },
                {
                    speaker: '小兔',
                    text: '结束了...诅咒终于结束了。',
                    effect: { trust: +15 },
                    next: 'chapter3_scene25_aftermath'
                }
            ]
        },
        

        
        scene2_call: {
            id: 'chapter3_scene2_call',
            background: 'dorm_night',
            characters: {
                xiaotu: { position: 'left', emotion: 'panicked' }
            },
            dialogue: [
                {
                    speaker: '狐狸爸爸 (电话)',
                    text: '小兔？怎么了？你的声音在发抖。'
                },
                {
                    speaker: '小兔',
                    text: '我梦到...有人要杀我。就在十天后，晚上11点47分。'
                },
                {
                    speaker: '狐狸爸爸 (电话)',
                    text: '具体细节？我需要所有信息。'
                },
                {
                    speaker: '小兔',
                    text: '门锁被撬开...男人...左手有蛇形纹身...窗外有红色霓虹灯...',
                    next: 'chapter3_scene4_plan'
                }
            ]
        },
        
        scene25_aftermath: {
            id: 'chapter3_scene25_aftermath',
            background: 'dorm_day',
            characters: {
                xiaotu: { position: 'center', emotion: 'reflective' },
                foxdad: { position: 'right', emotion: 'concerned' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '第26天清晨。经历了生死考验的小兔坐在床边，手中握着那枚差点夺走她生命的戒指。狐狸爸爸一大早就赶了过来。'
                },
                {
                    speaker: '狐狸爸爸',
                    text: '你还好吗？昨晚的事情...',
                    effect: { trust: +10 }
                },
                {
                    speaker: '小兔',
                    text: '爸爸，我想我需要知道更多关于这枚戒指的事情。昨天的经历让我明白，有些事情不能只靠猜测。'
                },
                {
                    speaker: '狐狸爸爸',
                    text: '你说得对。我们不能再被动等待。从今天开始，我们要主动调查这枚戒指的真实来历和背后的秘密。',
                    action: 'advance_time',
                    daysPassed: 1,
                    effect: { mentalHealth: +5 }
                },
                {
                    speaker: '小兔',
                    text: '好，我们一起找出真相。',
                    next: 'chapter4_scene1'
                }
            ]
        }
    },
    
    // 第四章：真相调查和循环模式的发现
    
    // 第四章：真相调查和循环模式的发现
    chapter4: {
        scene1: {
            id: 'chapter4_scene1',
            background: 'analysis_room',
            characters: {
                xiaotu: { position: 'left', emotion: 'determined' },
                foxdad: { position: 'right', emotion: 'analytical' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '第27天。经历了第25天晚上的生死危机后，小兔和狐狸爸爸决定不再被动等待，而是主动调查戒指的秘密。'
                },
                {
                    speaker: '狐狸爸爸',
                    text: '根据你昨天的经历，我们必须深入调查戒指的来源和之前的持有者。但现在我们有了更紧迫的理由——我们必须阻止下一个受害者。',
                    action: 'start_analysis',
                    analysis: {
                        title: '紧急调查计划',
                        hypotheses: [
                            {
                                text: '需要立即获取基础调查技能',
                                probability: '95%',
                                evidence: ['缺乏调查经验', '时间紧迫', '需要合法渠道']
                            },
                            {
                                text: '应优先建立安全通信渠道',
                                probability: '85%',
                                evidence: ['调查可能暴露身份', '需要保密措施', '防止被追踪']
                            },
                            {
                                text: '必须收集历史持有者信息',
                                probability: '90%',
                                evidence: ['了解循环规律', '寻找破解方法', '预防未来受害者']
                            }
                        ],
                        conclusion: '建议：1. 立即获取调查技能 2. 建立安全渠道 3. 收集历史信息 4. 寻找破解方法'
                    },
                    choices: [
                        {
                            text: '先从公开渠道获取信息（政府网站、公开记录）',
                            effect: { trust: +5 },
                            flag: 'public_records_start',
                            next: 'chapter4_scene1_public_start'
                        },
                        {
                            text: '通过社交网络和论坛寻找线索',
                            effect: { mentalHealth: -5 },
                            flag: 'social_media_start',
                            next: 'chapter4_scene1_social_start'
                        },
                        {
                            text: '寻求专业人士的帮助（律师、记者）',
                            effect: { trust: -5 },
                            flag: 'professional_help_start',
                            next: 'chapter4_scene1_professional_start'
                        }
                    ]
                }
            ]
        },
        
        scene1_public_start: {
            id: 'chapter4_scene1_public_start',
            background: 'library',
            characters: {
                xiaotu: { position: 'left', emotion: 'focused' },
                foxdad: { position: 'right', emotion: 'analytical' }
            },
            dialogue: [
                {
                    speaker: '狐狸爸爸',
                    text: '从官方渠道入手最安全。我们可以查询死亡登记、失踪人口报告，以及相关的法律文件。',
                    action: 'add_clue',
                    clueId: 'investigation_summary',
                    special: 'clue_added',
                    specialText: '通过政府公开数据库，我们找到了前几位持有者的公开信息：姓名、职业、死亡日期。但详细原因和关联信息仍有限。'
                },
                {
                    speaker: '小兔',
                    text: '但是...等等，我发现了一个奇怪的现象。这些人的死亡地点都集中在同一个城市区域，而且时间间隔似乎有规律。',
                    effect: { trust: +5 },
                    choices: [
                        {
                            text: '深入研究地理分布',
                            next: 'chapter4_scene1_public_geo'
                        },
                        {
                            text: '分析时间间隔规律',
                            next: 'chapter4_scene1_public_timeline'
                        },
                        {
                            text: '寻找地点与时间的关联',
                            next: 'chapter4_scene1_public_connection'
                        }
                    ]
                }
            ]
        },
        
        scene1_public_geo: {
            id: 'chapter4_scene1_public_geo',
            background: 'analysis_room',
            characters: {
                xiaotu: { position: 'left', emotion: 'realization' },
                foxdad: { position: 'right', emotion: 'analytical' }
            },
            dialogue: [
                {
                    speaker: '狐狸爸爸',
                    text: '所有死亡地点都围绕着一个特定的区域——老城区的梧桐街一带。那里曾经是一个古玩市场，很多古董商聚集。',
                    action: 'add_clue',
                    clueId: 'investigation_summary',
                    special: 'clue_added',
                    specialText: '所有持有者的死亡地点都集中在梧桐街及其周边，这里是古董交易的集中地，也是戒指可能的流通渠道。'
                },
                {
                    speaker: '小兔',
                    text: '难道这枚戒指是从那里流传出来的？我们应该去实地调查。',
                    next: 'chapter4_scene1_public_visit'
                }
            ]
        },
        
        scene1_public_timeline: {
            id: 'chapter4_scene1_public_timeline',
            background: 'analysis_room',
            characters: {
                xiaotu: { position: 'left', emotion: 'puzzled' },
                foxdad: { position: 'right', emotion: 'concerned' }
            },
            dialogue: [
                {
                    speaker: '狐狸爸爸',
                    text: '死亡时间间隔呈现递减趋势，而且都发生在持有者持有戒指25-30天左右。更奇怪的是，每次死亡后，大约1-2周后戒指就会出现在二手市场上。',
                    action: 'add_clue',
                    clueId: 'investigation_summary',
                    special: 'clue_added',
                    specialText: '戒指循环规律：持有者在25-30天死亡→1-2周后流入市场→被新人购买→重复循环。'
                },
                {
                    speaker: '小兔',
                    text: '这意味着有人在控制这个循环...故意让戒指流通。',
                    effect: { mentalHealth: -10 },
                    next: 'chapter4_scene1_public_operator'
                }
            ]
        },
        
        scene1_public_connection: {
            id: 'chapter4_scene1_public_connection',
            background: 'analysis_room',
            characters: {
                xiaotu: { position: 'left', emotion: 'shocked' },
                foxdad: { position: 'right', emotion: 'alarmed' }
            },
            dialogue: [
                {
                    speaker: '狐狸爸爸',
                    text: '时间和地点的结合揭示了一个可怕的真相：每次死亡都发生在满月前后，地点都在梧桐街周边。更诡异的是，这些日期与古代祭祀日历吻合。',
                    action: 'add_clue',
                    clueId: 'investigation_summary',
                    special: 'clue_added',
                    specialText: '死亡与古代祭祀日历对应，戒指的流通似乎遵循某种仪式性的时间表。'
                },
                {
                    speaker: '小兔',
                    text: '这不是简单的诅咒...而是某种仪式的一部分。',
                    effect: { mentalHealth: -15 },
                    next: 'chapter4_scene1_public_ritual'
                }
            ]
        },
        
        scene1_public_visit: {
            id: 'chapter4_scene1_public_visit',
            background: 'old_street',
            characters: {
                xiaotu: { position: 'center', emotion: 'nervous' },
                foxdad: { position: 'right', emotion: 'alert' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '梧桐街上大部分古玩店都已经关闭，只有一家名为“时光阁”的店铺还在营业。店主是一位年迈的老人。',
                    action: 'advance_time',
                    daysPassed: 1
                },
                {
                    speaker: '小兔',
                    text: '我们能从他那里得到什么信息吗？',
                    next: 'chapter4_scene2_investigate'
                }
            ]
        },
        
        scene1_public_operator: {
            id: 'chapter4_scene1_public_operator',
            background: 'analysis_room',
            characters: {
                xiaotu: { position: 'left', emotion: 'determined' },
                foxdad: { position: 'right', emotion: 'strategic' }
            },
            dialogue: [
                {
                    speaker: '狐狸爸爸',
                    text: '如果我们是对的，那么必须在戒指继续流通之前打破这个循环。',
                    action: 'add_clue',
                    clueId: 'investigation_summary',
                    special: 'clue_added',
                    specialText: '干预点：阻止戒指在下一次死亡后流入市场，或在当前阶段终止循环。'
                },
                {
                    speaker: '小兔',
                    text: '那我们就必须在剩下的时间里彻底解决这件事。',
                    next: 'chapter4_scene2_contact'
                }
            ]
        },
        
        scene1_public_ritual: {
            id: 'chapter4_scene1_public_ritual',
            background: 'analysis_room',
            characters: {
                xiaotu: { position: 'left', emotion: 'fearful' },
                foxdad: { position: 'right', emotion: 'determined' }
            },
            dialogue: [
                {
                    speaker: '狐狸爸爸',
                    text: '这比我们想象的更复杂。这可能不是简单的诅咒，而是某种古老的仪式，利用人类的恐惧和贪婪来维持。',
                    action: 'add_clue',
                    clueId: 'organization_info',
                    special: 'clue_added',
                    specialText: '戒指诅咒实际上是古老仪式的一部分，利用人性弱点来维持循环。'
                },
                {
                    speaker: '小兔',
                    text: '那我们不仅要打破诅咒，还要阻止整个仪式。',
                    effect: { mentalHealth: -5 },
                    next: 'chapter4_scene2_defense'
                }
            ]
        },
        
        scene1_social_start: {
            id: 'chapter4_scene1_social_start',
            background: 'dorm',
            characters: {
                xiaotu: { position: 'center', emotion: 'focused' }
            },
            dialogue: [
                {
                    speaker: '小兔',
                    text: '我在各种论坛和社交媒体上搜索相关信息，发现了一些有趣的内容。',
                    action: 'add_clue',
                    clueId: 'investigation_summary',
                    special: 'clue_added',
                    specialText: '在一些神秘学和都市传说论坛上，有人提到了"命运之戒"和类似的死亡案例。帖子被频繁删除，但留下了一些线索。更奇怪的是，我发现了一个加密的暗网社区，专门讨论这类物品。'
                },
                {
                    speaker: '小兔',
                    text: '这个发现让我既兴奋又害怕。暗网社区里提到了一个叫“收藏家”的神秘人物，据说他掌握着这些物品的流通渠道。',
                    effect: { mentalHealth: -10 },
                    choices: [
                        {
                            text: '尝试进入暗网社区',
                            effect: { mentalHealth: -15 },
                            next: 'chapter4_scene1_social_darkweb'
                        },
                        {
                            text: '寻找其他论坛用户交流',
                            next: 'chapter4_scene1_social_community'
                        },
                        {
                            text: '追踪“收藏家”的信息',
                            effect: { trust: +5 },
                            next: 'chapter4_scene1_social_collector'
                        }
                    ]
                }
            ]
        },
        
        scene1_social_darkweb: {
            id: 'chapter4_scene1_social_darkweb',
            background: 'dorm',
            characters: {
                xiaotu: { position: 'center', emotion: 'nervous' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '通过复杂的匿名网络，小兔进入了那个神秘的社区。里面充满了关于各种诡异物品的交易和传言。',
                    action: 'add_clue',
                    clueId: 'organization_info',
                    special: 'clue_added',
                    specialText: '暗网社区揭示了更大的秘密：命运之戒只是众多“诅咒物品”中的一种，这些物品由一个被称为“循环组织”的秘密团体控制，目的是研究人类在恐惧和欲望下的行为模式。'
                },
                {
                    speaker: '小兔',
                    text: '这比我想象的复杂得多...有人在把我们当作实验品。',
                    effect: { mentalHealth: -20 },
                    next: 'chapter4_scene2_investigate'
                }
            ]
        },
        
        scene1_social_community: {
            id: 'chapter4_scene1_social_community',
            background: 'dorm',
            characters: {
                xiaotu: { position: 'center', emotion: 'thoughtful' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '通过与其他论坛用户的交流，小兔了解到更多关于这类物品的历史。',
                    action: 'add_clue',
                    clueId: 'strategy_options',
                    special: 'clue_added',
                    specialText: '许多用户分享了类似经历，其中一些人成功摆脱了诅咒。关键在于：必须在第25天之前主动放弃物品，并且向下一任潜在持有者发出警告。'
                },
                {
                    speaker: '小兔',
                    text: '原来真的有人逃脱了...我必须找到那个方法。',
                    effect: { trust: +10 },
                    next: 'chapter4_scene2_contact'
                }
            ]
        },
        
        scene1_social_collector: {
            id: 'chapter4_scene1_social_collector',
            background: 'dorm',
            characters: {
                xiaotu: { position: 'center', emotion: 'determined' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '经过多方调查，小兔发现“收藏家”似乎是一个专门收集和分发这类物品的人。',
                    action: 'add_clue',
                    clueId: 'organization_info',
                    special: 'clue_added',
                    specialText: '“收藏家”并非一个人，而是一个组织的代号，他们的目标是研究超自然现象对人类心理的影响。他们精心策划了整个循环，挑选特定的人作为“实验对象”。'
                },
                {
                    speaker: '小兔',
                    text: '我们不是受害者...我们是实验品。如果这是真的，那我们必须从根本上破坏他们的实验。',
                    effect: { mentalHealth: -10 },
                    next: 'chapter4_scene2_defense'
                }
            ]
        },
        
        scene1_professional_start: {
            id: 'chapter4_scene1_professional_start',
            background: 'law_office',
            characters: {
                xiaotu: { position: 'left', emotion: 'hopeful' },
                foxdad: { position: 'right', emotion: 'cautious' },
                lawyer: { position: 'right', emotion: 'serious' }
            },
            dialogue: [
                {
                    speaker: '律师',
                    text: '根据我的调查，这类案件在档案中确实存在，但都被归类为意外死亡。更奇怪的是，每次事件的调查报告都不完整。',
                    action: 'add_clue',
                    clueId: 'investigation_summary',
                    special: 'clue_added',
                    specialText: '官方档案显示，所有相关案件都被标记为“意外”，但法医报告和现场调查记录存在明显人为修改痕迹。似乎有更高层的力量在掩盖真相。'
                },
                {
                    speaker: '小兔',
                    text: '有人在故意掩盖这些死亡事件？',
                    choices: [
                        {
                            text: '深入调查法律漏洞',
                            next: 'chapter4_scene1_professional_legal'
                        },
                        {
                            text: '寻找独立记者曝光',
                            effect: { trust: +5 },
                            next: 'chapter4_scene1_professional_media'
                        },
                        {
                            text: '接触执法部门内部人员',
                            effect: { mentalHealth: -5 },
                            next: 'chapter4_scene1_professional_insider'
                        }
                    ]
                }
            ]
        },
        
        scene1_professional_legal: {
            id: 'chapter4_scene1_professional_legal',
            background: 'law_office',
            characters: {
                xiaotu: { position: 'left', emotion: 'determined' },
                foxdad: { position: 'right', emotion: 'analytical' },
                lawyer: { position: 'right', emotion: 'concerned' }
            },
            dialogue: [
                {
                    speaker: '律师',
                    text: '如果这些事件确实被人操控，那我们可以通过法律途径起诉相关人员。但这需要确凿的证据。',
                    action: 'add_clue',
                    clueId: 'strategy_options',
                    special: 'clue_added',
                    specialText: '法律策略：收集证据→确定责任人→提起诉讼→公开审判→终止仪式。但过程漫长，需要在30天内完成。'
                },
                {
                    speaker: '小兔',
                    text: '时间不多了，但我们必须尝试。',
                    next: 'chapter4_scene2_investigate'
                }
            ]
        },
        
        scene1_professional_media: {
            id: 'chapter4_scene1_professional_media',
            background: 'newsroom',
            characters: {
                xiaotu: { position: 'left', emotion: 'urgent' },
                foxdad: { position: 'right', emotion: 'hopeful' },
                journalist: { position: 'right', emotion: 'investigative' }
            },
            dialogue: [
                {
                    speaker: '记者',
                    text: '这听起来像是一个大型阴谋集团。如果报道出来，会引起巨大轰动。但我需要实质性的证据。',
                    action: 'add_clue',
                    clueId: 'strategy_options',
                    special: 'clue_added',
                    specialText: '媒体策略：收集证据→安排采访→撰写报道→协调发布时间→引发公众关注→迫使相关部门介入。'
                },
                {
                    speaker: '小兔',
                    text: '我有戒指和梦境的证据，希望能帮上忙。',
                    effect: { trust: +10 },
                    next: 'chapter4_scene2_contact'
                }
            ]
        },
        
        scene1_professional_insider: {
            id: 'chapter4_scene1_professional_insider',
            background: 'police_station',
            characters: {
                xiaotu: { position: 'left', emotion: 'nervous' },
                foxdad: { position: 'right', emotion: 'cautious' },
                detective: { position: 'right', emotion: 'secretive' }
            },
            dialogue: [
                {
                    speaker: '侦探',
                    text: '实话告诉你，我们内部早就知道这不是普通的意外。但我们被上级要求不得深入调查。',
                    action: 'add_clue',
                    clueId: 'strategy_options',
                    special: 'clue_added',
                    specialText: '内部信息：执法部门受到高层压力，无法正常调查。但有部分人员愿意暗中协助，提供必要的情报支持。'
                },
                {
                    speaker: '小兔',
                    text: '那我们能做什么？',
                    effect: { mentalHealth: -5 },
                    next: 'chapter4_scene2_defense'
                }
            ]
        },
        
        scene2_investigate: {
            id: 'chapter4_scene2_investigate',
            background: 'analysis_room',
            characters: {
                xiaotu: { position: 'left', emotion: 'focused' },
                foxdad: { position: 'right', emotion: 'concerned' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '经过深入调查，你们发现了前六任持有者的信息。',
                    action: 'add_clue',
                    clueId: 'previous_holders',
                    special: 'clue_added',
                    specialText: '第一任：李明，程序员，车祸死亡，持有5天\\n第二任：王芳，教师，溺水，持有8天\\n第三任：张伟，商人，心脏病突发，持有12天\\n第四任：刘强，医生，坠楼，持有18天\\n第五任：陈丽，学生，中毒，持有22天\\n第六任：赵军，律师，火灾，持有25天'
                },
                {
                    speaker: '小兔',
                    text: '每个人死亡的时间都在逐渐缩短，而且都发生在持有期的后期...',
                    choices: [
                        {
                            text: '继续分析时间规律',
                            next: 'chapter4_scene3_pattern'
                        },
                        {
                            text: '寻找他们的共同点',
                            next: 'chapter4_scene3_common'
                        }
                    ]
                }
            ]
        },
        
        scene2_contact: {
            id: 'chapter4_scene2_contact',
            background: 'foxdad_apartment',
            characters: {
                xiaotu: { position: 'left', emotion: 'hopeful' },
                foxdad: { position: 'right', emotion: 'cautious' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '通过各种渠道，你们联系到了几位前持有者的家属。',
                    action: 'add_clue',
                    clueId: 'zhangming_info',
                    special: 'clue_added',
                    specialText: '家属透露：每位持有者在死亡前都表现出了极度的恐惧和偏执，声称有人要杀他们。奇怪的是，有些人临死前还试图伤害别人。第七任持有者张明，28岁会计，两周前突然辞职，最后在论坛发帖："我看到了自己的死亡，但我要改变它。"然后就失踪了。'
                },
                {
                    speaker: '狐狸爸爸',
                    text: '这证实了我们的推测——持有者会陷入被害妄想，最终导致悲剧。',
                    choices: [
                        {
                            text: '深入研究心理变化过程',
                            next: 'chapter4_scene3_psychology'
                        },
                        {
                            text: '寻找打破心理循环的方法',
                            next: 'chapter4_scene3_solution'
                        }
                    ]
                }
            ]
        },
        
        scene2_defense: {
            id: 'chapter4_scene2_defense',
            background: 'dorm',
            characters: {
                xiaotu: { position: 'center', emotion: 'anxious' }
            },
            dialogue: [
                {
                    speaker: '小兔',
                    text: '我按照狐狸爸爸的建议，加固了门窗，安装了监控，还买了防狼喷雾。',
                    effect: { mentalHealth: +10 },
                    choices: [
                        {
                            text: '觉得安全多了',
                            effect: { trust: -5 },
                            next: 'chapter4_scene3_false'
                        },
                        {
                            text: '但仍感觉不安全',
                            next: 'chapter4_scene3_reality'
                        }
                    ]
                }
            ]
        },
        
        scene3_pattern: {
            id: 'chapter4_scene3_pattern',
            background: 'analysis_room',
            characters: {
                xiaotu: { position: 'left', emotion: 'shocked' },
                foxdad: { position: 'right', emotion: 'realization' }
            },
            dialogue: [
                {
                    speaker: '狐狸爸爸',
                    text: '我发现了一个可怕的规律：理论上，每个持有者都会梦见被前一任持有者杀害，但你的梦境有些不同——你梦见的是一个陌生男人，而不是前持有者赵军。',
                    action: 'add_clue',
                    clueId: 'cycle_pattern',
                    special: 'clue_added',
                    specialText: '预知循环机制：持有者通常会梦见被前持有者杀死→试图防范→意外成为杀人犯→死亡后成为下一任持有者的梦中杀手，形成无限循环。但你的梦境似乎打破了这个模式。'
                },
                {
                    speaker: '小兔',
                    text: '这说明什么？为什么我的梦境和理论不符？',
                    choices: [
                        {
                            text: '这可能意味着我们有机会打破循环',
                            next: 'chapter5_scene1'
                        },
                        {
                            text: '也许我的戒指是第一枚，所以没有前持有者',
                            next: 'chapter5_scene1'
                        },
                        {
                            text: '这个差异正是我们需要利用的关键',
                            effect: { trust: +5 },
                            next: 'chapter5_scene1'
                        }
                    ]
                }
            ]
        },
        
        scene3_common: {
            id: 'chapter4_scene3_common',
            background: 'analysis_room',
            characters: {
                xiaotu: { position: 'left', emotion: 'determined' },
                foxdad: { position: 'right', emotion: 'analytical' }
            },
            dialogue: [
                {
                    speaker: '狐狸爸爸',
                    text: '除了死亡时间递减外，还有一个共同点：他们都曾试图通过预知能力获利，然后开始做噩梦，最后陷入被害妄想。',
                    action: 'add_clue',
                    clueId: 'ring_origin',
                    special: 'clue_added',
                    specialText: '核心机制：预知能力本身就会引发心理变化，导致持有者逐渐失去理智，最终陷入循环。'
                },
                {
                    speaker: '小兔',
                    text: '也许我们应该停止使用戒指，专注于找到彻底解决的方法。',
                    choices: [
                        {
                            text: '停止使用戒指，全力寻找解决方案',
                            next: 'chapter5_scene1'
                        },
                        {
                            text: '继续使用，但更加谨慎',
                            effect: { mentalHealth: -10 },
                            next: 'chapter5_scene1'
                        }
                    ]
                }
            ]
        },
        
        scene3_psychology: {
            id: 'chapter4_scene3_psychology',
            background: 'analysis_room',
            characters: {
                xiaotu: { position: 'left', emotion: 'worried' },
                foxdad: { position: 'right', emotion: 'concerned' }
            },
            dialogue: [
                {
                    speaker: '狐狸爸爸',
                    text: '根据心理学理论，预知未来的压力会导致认知失调，进而产生防御性错觉。持有者会将焦虑投射到他人身上，形成被害妄想。',
                    choices: [
                        {
                            text: '寻找心理干预方法',
                            next: 'chapter5_scene1'
                        },
                        {
                            text: '加强心理建设',
                            effect: { mentalHealth: +5 },
                            next: 'chapter5_scene1'
                        }
                    ]
                }
            ]
        },
        
        scene3_solution: {
            id: 'chapter4_scene3_solution',
            background: 'analysis_room',
            characters: {
                xiaotu: { position: 'left', emotion: 'hopeful' },
                foxdad: { position: 'right', emotion: 'optimistic' }
            },
            dialogue: [
                {
                    speaker: '小兔',
                    text: '如果我们能够告知下一任持有者真相，让他们知道这不是超自然现象，而是心理循环呢？',
                    effect: { trust: +10 },
                    choices: [
                        {
                            text: '制定安全的传递方案',
                            next: 'chapter5_scene1'
                        },
                        {
                            text: '寻找永久销毁戒指的方法',
                            next: 'chapter5_scene1'
                        }
                    ]
                }
            ]
        },
        
        scene3_false: {
            id: 'chapter4_scene3_false',
            background: 'dorm',
            characters: {
                xiaotu: { position: 'center', emotion: 'complacent' }
            },
            dialogue: [
                {
                    speaker: '旁白',
                    text: '尽管物理防护增强了，但小兔的心理安全感只是暂时的。夜晚，她又开始做噩梦。',
                    effect: { mentalHealth: -15 },
                    choices: [
                        {
                            text: '向狐狸爸爸求助',
                            next: 'chapter5_scene1'
                        },
                        {
                            text: '独自面对恐惧',
                            effect: { mentalHealth: -10 },
                            next: 'chapter5_scene1'
                        }
                    ]
                }
            ]
        },
        
        scene3_reality: {
            id: 'chapter4_scene3_reality',
            background: 'dorm',
            characters: {
                xiaotu: { position: 'center', emotion: 'fearful' }
            },
            dialogue: [
                {
                    speaker: '小兔',
                    text: '即使有了防护措施，我还是能感受到那种无形的威胁。仿佛有什么东西在注视着我。',
                    effect: { mentalHealth: -5 },
                    choices: [
                        {
                            text: '寻求专业帮助',
                            next: 'chapter5_scene1'
                        },
                        {
                            text: '继续加强防范',
                            next: 'chapter5_scene1'
                        }
                    ]
                }
            ]
        }
    },
    
    // 第五章：最终对决和多种结局路径
    chapter5: {
        scene1: {
            id: 'chapter5_scene1',
            background: 'foxdad_apartment',
            characters: {
                xiaotu: { position: 'left', emotion: 'determined' },
                foxdad: { position: 'right', emotion: 'supportive' }
            },
            dialogue: [
                {
                    speaker: '狐狸爸爸',
                    text: '时间不多了，我们必须做出最终决定。根据收集到的线索，我们有几种选择。',
                    choices: [
                        {
                            text: '尝试智慧破局，建立安全传递链',
                            effect: { trust: +5 },
                            next: 'chapter5_scene2_wisdom'
                        },
                        {
                            text: '报警并公开真相',
                            effect: { mentalHealth: +5 },
                            next: 'chapter5_scene2_police'
                        },
                        {
                            text: '相信彼此，共同面对',
                            effect: { trust: +10 },
                            next: 'chapter5_scene2_call'
                        },
                        {
                            text: '独自承担风险',
                            effect: { mentalHealth: -15 },
                            next: 'chapter5_scene2_alone'
                        },
                        {
                            text: '尝试销毁戒指',
                            effect: { trust: +5, mentalHealth: -10 },
                            condition: {
                                hasAllClues: ['ring_origin', 'previous_holders', 'cycle_pattern'],
                                trust: 60
                            },
                            next: 'endings_ring_destroyed'
                        }
                    ]
                }
            ]
        },
        
        scene2_wisdom: {
            id: 'chapter5_scene2_wisdom',
            background: 'analysis_room',
            characters: {
                xiaotu: { position: 'left', emotion: 'focused' },
                foxdad: { position: 'right', emotion: 'analytical' }
            },
            dialogue: [
                {
                    speaker: '小兔',
                    text: '如果我们能找到第八任持有者，提前告知他真相，让他知道这只是一个心理循环，而不是超自然诅咒呢？',
                    effect: { trust: +10 },
                    choices: [
                        {
                            text: '尝试联系潜在的下一任持有者',
                            next: 'endings_wise_solution'
                        },
                        {
                            text: '尝试其他解决方案',
                            next: 'endings_wise_solution'
                        }
                    ]
                }
            ]
        },
        
        scene2_police: {
            id: 'chapter5_scene2_police',
            background: 'police_station',
            characters: {
                xiaotu: { position: 'left', emotion: 'anxious' },
                foxdad: { position: 'right', emotion: 'hopeful' }
            },
            dialogue: [
                {
                    speaker: '警察',
                    text: '听起来很不可思议，但我们注意到最近确实有一些可疑的死亡案件。如果你能提供更多证据，我们可以调查。',
                    effect: { mentalHealth: +5 },
                    choices: [
                        {
                            text: '提供所有线索和证据',
                            next: 'endings_police_help'
                        },
                        {
                            text: '担心警方无法理解',
                            next: 'endings_tragic_cycle'
                        }
                    ]
                }
            ]
        },
        
        scene2_call: {
            id: 'chapter5_scene2_call',
            background: 'dorm',
            characters: {
                xiaotu: { position: 'left', emotion: 'vulnerable' },
                foxdad: { position: 'right', emotion: 'protective' }
            },
            dialogue: [
                {
                    speaker: '小兔',
                    text: '狐狸爸爸，谢谢你一直陪着我。无论发生什么，我都希望你知道，你的支持对我有多重要。',
                    effect: { trust: +10 },
                    choices: [
                        {
                            text: '决定一起面对最后的挑战',
                            next: 'endings_redemption_path'
                        },
                        {
                            text: '决定共同面对挑战',
                            next: 'endings_redemption_path'
                        }
                    ]
                }
            ]
        },
        
        scene2_alone: {
            id: 'chapter5_scene2_alone',
            background: 'dorm_night',
            characters: {
                xiaotu: { position: 'center', emotion: 'isolated' }
            },
            dialogue: [
                {
                    speaker: '小兔',
                    text: '也许这一切都是我一个人的战斗。我不应该把狐狸爸爸牵扯进来。',
                    effect: { mentalHealth: -15 },
                    choices: [
                        {
                            text: '试图独自解决问题',
                            next: 'endings_downfall'
                        },
                        {
                            text: '最终还是寻求帮助',
                            next: 'endings_tragic_cycle'
                        }
                    ]
                }
            ]
        }
    },
    
    // 结局数据
    endings: {
        never_worn: {
            id: 'never_worn',
            title: '理智之选',
            condition: { trust: 50, mentalHealth: 60 },
            scenes: [
                {
                    background: 'dorm',
                    characters: {
                        xiaotu: { position: 'center', emotion: 'peaceful' }
                    },
                    dialogue: [
                        {
                            speaker: '旁白',
                            text: '小兔将戒指妥善保存在一个盒子里，决定永不佩戴。虽然有时会好奇戒指的真正力量，但她内心保持着平静。'
                        },
                        {
                            speaker: '旁白',
                            text: '理智的选择带来了内心的平静。有时候，最大的勇气就是克制自己的好奇心。'
                        },
                        {
                            speaker: '旁白',
                            text: '【理智之选 结局达成】',
                            special: 'ending'
                        }
                    ]
                }
            ]
        },
        
        wise_solution: {
            id: 'wise_solution',
            title: '智慧破局',
            condition: { trust: 75, clues: ['ring_origin', 'previous_holders', 'cycle_pattern'] },
            scenes: [
                {
                    background: 'foxdad_apartment',
                    characters: {
                        xiaotu: { position: 'left', emotion: 'relieved' },
                        foxdad: { position: 'right', emotion: 'proud' }
                    },
                    dialogue: [
                        {
                            speaker: '狐狸爸爸',
                            text: '我们找到了打破循环的方法。'
                        },
                        {
                            speaker: '狐狸爸爸',
                            text: '通过分析前六任持有者的死亡模式，我们发现：每个试图暴力避免预知的人，都成为了自己死亡的原因。'
                        },
                        {
                            speaker: '小兔',
                            text: '所以张明试图杀我，反而导致了自己的车祸...'
                        },
                        {
                            speaker: '狐狸爸爸',
                            text: '是的。唯一的出路是建立安全的传递链，让每个持有者提前知道真相。'
                        },
                        {
                            speaker: '旁白',
                            text: '三个月后，戒指被传递给一位知情的研究者，用于科学研究。'
                        },
                        {
                            speaker: '旁白',
                            text: '小兔和狐狸爸爸的生活回归平静，但这段经历让他们的关系更加紧密。'
                        },
                        {
                            speaker: '旁白',
                            text: '有时候，真正的安全感不是来自预知未来，而是来自对彼此的完全信任。'
                        },
                        {
                            speaker: '旁白',
                            text: '【智慧破局 结局达成】',
                            special: 'ending'
                        }
                    ]
                }
            ]
        },
        
        tragic_cycle: {
            id: 'tragic_cycle',
            title: '无尽轮回',
            condition: { trust: 30, mentalHealth: 20 },
            scenes: [
                {
                    background: 'parking_lot',
                    characters: {
                        xiaotu: { position: 'center', emotion: 'terrified' }
                    },
                    dialogue: [
                        {
                            speaker: '旁白',
                            text: '在恐惧中，小兔失手杀死了张明。'
                        },
                        {
                            speaker: '旁白',
                            text: '那一刻，她感到戒指在手指上发烫。新的预知涌入脑海...'
                        },
                        {
                            speaker: '旁白',
                            text: '梦中，她看到自己成为了追杀者，而下一个持有者在恐惧中杀死了她。',
                            special: 'dream',
                            specialText: '你站在陌生人的门外，手中握着刀。\n\n你看到自己的死亡，但你必须阻止它。\n\n门开了...尖叫声...血...\n\n然后是新的梦境：有人站在你的门外。'
                        },
                        {
                            speaker: '小兔',
                            text: '不...不...怎么会这样...'
                        },
                        {
                            speaker: '旁白',
                            text: '戒指的诅咒没有结束，只是开始了新的轮回。',
                            special: 'ending'
                        }
                    ]
                }
            ]
        },
        

        
        police_help: {
            id: 'police_help',
            title: '警力协助',
            condition: { trust: 70, mentalHealth: 50, clues: ['previous_holders', 'strategy_options'] },
            scenes: [
                {
                    background: 'police_station',
                    characters: {
                        xiaotu: { position: 'left', emotion: 'anxious' },
                        foxdad: { position: 'right', emotion: 'serious' }
                    },
                    dialogue: [
                        {
                            speaker: '警察局长',
                            text: '你说的戒指案件确实令人震惊。虽然听起来很不可思议，但我们有责任调查。'
                        },
                        {
                            speaker: '小兔',
                            text: '我知道这很难相信，但请您看看这些证据。'
                        },
                        {
                            speaker: '狐狸爸爸',
                            text: '我们已经整理了所有线索和资料。'
                        },
                        {
                            speaker: '旁白',
                            text: '在警方的介入下，戒指案件被正式立案调查。由于证据充分，警方制定了周密的行动计划。'
                        },
                        {
                            speaker: '旁白',
                            text: '当可疑人员试图接近小兔时，他被早已埋伏的便衣警察制服。戒指也被依法没收，送往专门的研究机构。'
                        },
                        {
                            speaker: '旁白',
                            text: '虽然整个过程充满波折，但小兔和狐狸爸爸终于摆脱了诅咒的威胁。'
                        },
                        {
                            speaker: '旁白',
                            text: '【警力协助 结局达成】',
                            special: 'ending'
                        }
                    ]
                }
            ]
        },
        
        redemption_path: {
            id: 'redemption_path',
            title: '救赎之路',
            condition: { trust: 50, mentalHealth: 40, clues: ['cycle_pattern'] },
            scenes: [
                {
                    background: 'foxdad_apartment',
                    characters: {
                        xiaotu: { position: 'center', emotion: 'reflective' }
                    },
                    dialogue: [
                        {
                            speaker: '小兔',
                            text: '也许...也许张明也不是真正的坏人。他只是害怕，就像我一样。'
                        },
                        {
                            speaker: '旁白',
                            text: '小兔决定联系张明，不是为了对抗，而是为了理解和帮助。'
                        },
                        {
                            speaker: '旁白',
                            text: '通过各种渠道，小兔找到了张明，并向他说明了戒指的真实情况。'
                        },
                        {
                            speaker: '旁白',
                            text: '令她意外的是，张明早已意识到诅咒的存在。他原本只是想保护自己，却陷入了恐惧的恶性循环。'
                        },
                        {
                            speaker: '旁白',
                            text: '两人决定一起打破这个循环。他们找到了一个偏远的废弃仓库，将戒指封存其中，并在周围设置了警示标志。'
                        },
                        {
                            speaker: '旁白',
                            text: '虽然诅咒的根源并未消除，但至少它暂时不会伤害任何人。小兔和张明都获得了内心的平静。'
                        },
                        {
                            speaker: '旁白',
                            text: '【救赎之路 结局达成】',
                            special: 'ending'
                        }
                    ]
                }
            ]
        },
        

        
        downfall: {
            id: 'downfall',
            title: '堕落之路',
            condition: { trust: 20, mentalHealth: 30 },
            scenes: [
                {
                    background: 'dorm_night',
                    characters: {
                        xiaotu: { position: 'center', emotion: 'desperate' }
                    },
                    dialogue: [
                        {
                            speaker: '小兔',
                            text: '没有人相信我...没有人可以帮助我...'
                        },
                        {
                            speaker: '旁白',
                            text: '在极度的恐惧和绝望中，小兔的心理防线彻底崩溃了。'
                        },
                        {
                            speaker: '小兔',
                            text: '既然这个世界这么残酷，那就让它继续下去吧...'
                        },
                        {
                            speaker: '旁白',
                            text: '小兔变得偏执和冷漠。她开始故意将戒指传递给无辜的人，只为了延长自己的生命。'
                        },
                        {
                            speaker: '旁白',
                            text: '她甚至开始享受看到别人恐惧的表情。原本善良的小兔已经完全消失了。'
                        },
                        {
                            speaker: '旁白',
                            text: '她成为了诅咒的帮凶，一个冷酷的施害者。'
                        },
                        {
                            speaker: '旁白',
                            text: '【堕落之路 结局达成】',
                            special: 'ending'
                        }
                    ]
                }
            ]
        },
        
        ring_destroyed: {
            id: 'ring_destroyed',
            title: '毁灭之路',
            condition: { trust: 60, clues: ['ring_origin', 'previous_holders', 'cycle_pattern'] },
            scenes: [
                {
                    background: 'foxdad_apartment',
                    characters: {
                        xiaotu: { position: 'left', emotion: 'determined' },
                        foxdad: { position: 'right', emotion: 'analytical' }
                    },
                    dialogue: [
                        {
                            speaker: '小兔',
                            text: '既然无法打破循环，也许我们可以彻底摧毁它？'
                        },
                        {
                            speaker: '狐狸爸爸',
                            text: '这是一个大胆的想法。如果我们能找到一种方法彻底破坏戒指，或许能终结这一切。'
                        },
                        {
                            speaker: '旁白',
                            text: '经过深入研究，小兔和狐狸爸爸找到了一种特殊的化学配方，据说可以破坏任何超自然物品。'
                        },
                        {
                            speaker: '旁白',
                            text: '在一个风雨交加的夜晚，他们启动了销毁程序。戒指在剧烈的反应中逐渐分解，散发出诡异的光芒。'
                        },
                        {
                            speaker: '旁白',
                            text: '随着戒指的毁灭，小兔感到脑海中那些预知的画面逐渐消失。诅咒终于被终结了。'
                        },
                        {
                            speaker: '旁白',
                            text: '【毁灭之路 结局达成】',
                            special: 'ending'
                        }
                    ]
                }
            ]
        }
    }
},

// 线索数据库
window.cluesData = {
    ring_manual: {
        id: 'ring_manual',
        name: '戒指说明书',
        description: '羊皮纸上写着："命运之戒，窥视未来。得此戒者，需于三十日内转售他人，否则将遭不幸。预知之力，亦是诅咒。"',
        chapter: 1,
        important: true
    },
    
    first_dream: {
        id: 'first_dream',
        name: '第一次预知梦',
        description: '预知了与狐狸爸爸的游戏和撞腿事件，所有细节完全一致。证明戒指具有真实的预知能力。',
        chapter: 1,
        important: true
    },
    
    stock_prediction: {
        id: 'stock_prediction',
        name: '股票预知验证',
        description: '预知TechGrow股票三天内从$45涨至$68，实际涨幅为$44.8至$67.9，准确率99.8%。',
        chapter: 2,
        important: true
    },
    
    death_dream_1: {
        id: 'death_dream_1',
        name: '第一次死亡预知',
        description: '第15天凌晨3点，小兔从噩梦中惊醒，梦见有人将在第25天晚上23:47闯入家中袭击。凶手左手有蛇形纹身，窗外有红色霓虹灯。',
        chapter: 3,
        important: true
    },
    

    
    ring_origin: {
        id: 'ring_origin',
        name: '戒指来源调查',
        description: '通过物流记录追踪，戒指来自暗网交易平台"Fate Market"。前六任持有者都已死亡。',
        chapter: 4,
        important: true
    },
    
    previous_holders: {
        id: 'previous_holders',
        name: '前持有者信息',
        description: '第一任：李明，程序员，车祸死亡。第二任：王芳，教师，溺水。第三任：张伟，商人，心脏病...死因各异但都在持有25-28天内死亡。',
        chapter: 4,
        important: true
    },
    
    cycle_pattern: {
        id: 'cycle_pattern',
        name: '循环模式分析',
        description: '狐狸爸爸的分析：每个持有者都梦见被前任持有者"导致"死亡，试图暴力避免反而实现预言。形成逻辑闭环。',
        chapter: 5,
        important: true
    },
    
    zhangming_info: {
        id: 'zhangming_info',
        name: '张明档案',
        description: '第七任持有者，28岁，会计。两周前辞职，行为异常。最后发帖："我看到了自己的死亡，但我要改变它。"',
        chapter: 5,
        important: true
    },
    
    investigation_summary: {
        id: 'investigation_summary',
        name: '调查总结',
        description: '综合公共记录、网络论坛和暗网信息：前持有者死亡地点集中在梧桐街区域，死亡时间在持有戒指25-30天之间。存在一个名为"收藏家"的组织在操控这一切，利用人性弱点进行心理实验。干预点是阻止戒指流入市场或在当前阶段终止循环。',
        chapter: 4,
        important: true
    },
        
    strategy_options: {
        id: 'strategy_options',
        name: '策略选项',
        description: '基于调查结果，可行的策略包括：法律途径（收集证据提起诉讼）、媒体曝光（引发公众关注）、寻求内部协助（执法部门情报支持）。同时发现有人成功摆脱诅咒的关键是在第25天前主动放弃物品并警告下一位潜在持有者。',
        chapter: 4,
        important: true
    },
        
    organization_info: {
        id: 'organization_info',
        name: '组织信息',
        description: '深入了解发现"循环组织"的存在：命运之戒只是众多"诅咒物品"中的一种，用于研究人类在恐惧和欲望下的行为模式。他们挑选特定人员作为"实验对象"，精心策划整个循环。',
        chapter: 4,
        important: true
    },
    
    final_confrontation: {
        id: 'final_confrontation',
        name: '最终对抗',
        description: '通过预知能力，小兔成功化解了第25天的危机，但这也意味着她必须继续面对戒指的诅咒。',
        chapter: 3,
        important: true
    },
    
    resolution_method: {
        id: 'resolution_method',
        name: '解决方法',
        description: '小兔成功打破了循环，通过将戒指转移给下一个宿命之人，终止了自己的诅咒。',
        chapter: 3,
        important: true
    }
},

// 背景图片映射
window.backgrounds = {
    dorm: 'url("assets/images/backgrounds/dorm.jpg")',
    dorm_night: 'url("assets/images/backgrounds/dorm_night.jpg")',
    foxdad_apartment: 'url("assets/images/backgrounds/foxdad_apartment.jpg")',
    university: 'url("assets/images/backgrounds/university.jpg")',
    parking_lot: 'url("assets/images/backgrounds/parking_lot.jpg")',
    analysis_room: 'url("assets/images/backgrounds/analysis_room.jpg")',
    // 第四章新增背景
    old_street: 'url("assets/images/backgrounds/old_street.jpg")',
    library: 'url("assets/images/backgrounds/library.jpg")',
    law_office: 'url("assets/images/backgrounds/law_office.jpg")',
    newsroom: 'url("assets/images/backgrounds/newsroom.jpg")',
    police_station: 'url("assets/images/backgrounds/police_station.jpg")',
    outside_night: 'url("assets/images/backgrounds/outside_night.jpg")'
};