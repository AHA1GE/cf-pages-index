const config = {
    "langs": ["zh-cn", "en-us"],
    "remoteURI": "https://raw.githubusercontent.com/AHA1GE/cf-worker-dir-remasterd/main/src/",
    "faviconGetter": "https://favicon.ahaigege.com",
    "title": {
        "en-us": "AHAI Nav",
        "zh-cn": "AHAI个人收藏"
    },
    "subtitle": {
        "en-us": "AHAI's Index",
        "zh-cn": "AHAI的首页"
    },
    "hitokoto": true,
    "search": true,
    "search_engine": [
        {
            "name": {
                "en-us": "Bing",
                "zh-cn": "必应"
            },
            "template": "https://www.bing.com/search?q=$s"
        },
        {
            "name": {
                "en-us": "DuckDuckGo",
                "zh-cn": "鸭鸭"
            },
            "template": "https://start.duckduckgo.com/?q=$s&kak=-1&kal=-1&kao=-1&kaq=-1&kp=-2&kaj=m&k1=-1&kav=1&kn=1&kam=google-maps&kax=-1&kap=-1&k5=2"
        },
        {
            "name": {
                "en-us": "Google",
                "zh-cn": "谷歌"
            },
            "template": "https://www.google.com/search?q=$s"
        }
    ],
    "quickLinkLists": [
        {
            "name": {
                "en-us": "My",
                "zh-cn": "我的"
            },
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1em\" height=\"1em\" fill=\"currentColor\" class=\"bi bi-person\" viewBox=\"0 0 16 16\"><path d=\"M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z\"/></svg>",
            "quickLinkList": [
                {
                    "url": "https://gi.aha1.top/",
                    "name": {
                        "en-us": "GI Tools",
                        "zh-cn": "GI工具"
                    },
                    "desc": {
                        "en-us": "Anime game tools",
                        "zh-cn": "某二次元游戏相关工具"
                    },
                    "icon_size": "90"
                },
                {
                    "url": "https://mb.aha1.top/",
                    "name": {
                        "en-us": "Message Board",
                        "zh-cn": "留言板"
                    },
                    "desc": {
                        "en-us": "Post messages",
                        "zh-cn": "可以留言"
                    },
                    "icon_size": "90"
                },
                {
                    "url": "https://v.ahaigege.com/",
                    "name": {
                        "en-us": "Lobechat",
                        "zh-cn": "Lobechat"
                    },
                    "desc": {
                        "en-us": "Lobechat on Vercel",
                        "zh-cn": "Vercel上的Lobechat实例"
                    },
                    "icon_size": "90"
                },
                {
                    "url": "https://ysun.site",
                    "name": {
                        "en-us": "About me",
                        "zh-cn": "关于我"
                    },
                    "desc": {
                        "en-us": "Personal website",
                        "zh-cn": "个人网站"
                    },
                    "icon_size": "90"
                }
            ]
        },
        {
            "name": {
                "en-us": "NAS",
                "zh-cn": "网络附加存储装置"
            },
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1em\" height=\"1em\" class=\"svg-icon\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path d=\"M4.5 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zM3 4.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z\" /><path d=\"M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8.5v3a1.5 1.5 0 0 1 1.5 1.5h5.5a.5.5 0 0 1 0 1H10A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5H.5a.5.5 0 0 1 0-1H6A1.5 1.5 0 0 1 7.5 10V7H2a2 2 0 0 1-2-2V4zm1 0v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1zm6 7.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5z\" /></svg>",
            "quickLinkList": [
                {
                    "url": "https://ts466c.ahaigege.com/",
                    "name": {
                        "en-us": "TS466C tunneled",
                        "zh-cn": "TS466C隧道"
                    },
                    "desc": {
                        "en-us": "Go to QNAP NAS TS466C (tunneled)",
                        "zh-cn": "前往QNAP NAS TS466C（隧道）"
                    },
                    "icon_size": "90"
                },
                {
                    "url": "https://ddns466c.ahaigege.com/",
                    "name": {
                        "en-us": "TS466C",
                        "zh-cn": "TS466C"
                    },
                    "desc": {
                        "en-us": "Go to QNAP NAS TS466C",
                        "zh-cn": "直接前往QNAP NAS TS466C"
                    },
                    "icon_size": "90"
                },
                {
                    "url": "https://ts532x.ahaigege.com/",
                    "name": {
                        "en-us": "TS532X tunneled",
                        "zh-cn": "TS532X隧道"
                    },
                    "desc": {
                        "en-us": "Go to QNAP NAS TS532X (tunneled)",
                        "zh-cn": "前往QNAP NAS TS532X（隧道）"
                    },
                    "icon_size": "90"
                },
                {
                    "url": "https://ddns532x.ahaigege.com/",
                    "name": {
                        "en-us": "TS532X",
                        "zh-cn": "TS532X"
                    },
                    "desc": {
                        "en-us": "Go to QNAP NAS TS532X",
                        "zh-cn": "直接前往QNAP NAS TS532X"
                    },
                    "icon_size": "90"
                }
            ]
        },
        {
            "name": {
                "en-us": "Do For Fun",
                "zh-cn": "折腾"
            },
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1em\" height=\"1em\" fill=\"currentColor\" class=\"bi bi-pc-display\" viewBox=\"0 0 16 16\"><path d=\"M8 1a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1zm1 13.5a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0m2 0a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0M9.5 1a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM9 3.5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1h-5a.5.5 0 0 0-.5.5M1.5 2A1.5 1.5 0 0 0 0 3.5v7A1.5 1.5 0 0 0 1.5 12H6v2h-.5a.5.5 0 0 0 0 1H7v-4H1.5a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5H7V2z\"/></svg>",
            "quickLinkList": [
                {
                    "url": "https://apps.dofor.fun/",
                    "name": {
                        "en-us": "Apps",
                        "zh-cn": "应用"
                    },
                    "desc": {
                        "en-us": "CF apps launcher",
                        "zh-cn": "Cloudflare应用启动器"
                    },
                    "icon_size": "90"
                },
                {
                    "url": "https://fn.dofor.fun/",
                    "name": {
                        "en-us": "FN OS",
                        "zh-cn": "飞牛系统"
                    },
                    "desc": {
                        "en-us": "FN OS (NAS)",
                        "zh-cn": "网络附加存储装置飞牛操作系统"
                    },
                    "icon_size": "90"
                },
                {
                    "url": "https://next.aha1.top/",
                    "name": {
                        "en-us": "NextChat",
                        "zh-cn": "NextChat"
                    },
                    "desc": {
                        "en-us": "Basic chatGPT-like webui",
                        "zh-cn": "类ChatGPT的基础webui"
                    },
                    "icon_size": "90"
                },
                {
                    "url": "https://reader.aha1.top/",
                    "name": {
                        "en-us": "Reader",
                        "zh-cn": "阅读PWA"
                    },
                    "desc": {
                        "en-us": "Read novels online for free",
                        "zh-cn": "免费在线阅读小说"
                    },
                    "icon_size": "90"
                }
            ]
        },
        {
            "name": {
                "en-us": "Tools",
                "zh-cn": "工具"
            },
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1em\" height=\"1em\" fill=\"currentColor\" class=\"bi bi-tools\" viewBox=\"0 0 16 16\"><path d=\"M1 0 0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.27 3.27a.997.997 0 0 0 1.414 0l1.586-1.586a.997.997 0 0 0 0-1.414l-3.27-3.27a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0Zm9.646 10.646a.5.5 0 0 1 .708 0l2.914 2.915a.5.5 0 0 1-.707.707l-2.915-2.914a.5.5 0 0 1 0-.708ZM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11Z\"/></svg>",
            "quickLinkList": [
                {
                    "url": "https://www.calculator.net/",
                    "name": {
                        "en-us": "Calculator",
                        "zh-cn": "计算器"
                    },
                    "desc": {
                        "en-us": "Different kinds of calculators",
                        "zh-cn": "各种类型的计算器"
                    },
                    "icon_size": "90"
                },
                {
                    "url": "https://chat.openai.com/",
                    "name": {
                        "en-us": "ChatGPT",
                        "zh-cn": "ChatGPT"
                    },
                    "desc": {
                        "en-us": "ChatGPT by OpenAI",
                        "zh-cn": "OpenAI的ChatGPT"
                    },
                    "icon_size": "90"
                },
                {
                    "url": "https://centralops.net/co/",
                    "name": {
                        "en-us": "centralops",
                        "zh-cn": "centralops"
                    },
                    "desc": {
                        "en-us": "Free online network tools",
                        "zh-cn": "免费在线网络工具"
                    },
                    "icon_size": "90"
                },
                {
                    "url": "https://suburl.v1.mk/",
                    "name": {
                        "en-us": "sub converter",
                        "zh-cn": "订阅转换"
                    },
                    "desc": {
                        "en-us": "Free online subscribtion convert tool",
                        "zh-cn": "免费在线订阅转换工具"
                    },
                    "icon_size": "90"
                }
            ]
        },
        {
            "name": {
                "en-us": "Tech",
                "zh-cn": "科技"
            },
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1em\" height=\"1em\" class=\"svg-icon\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path d=\"M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z\"/></svg>",
            "quickLinkList": [
                {
                    "url": "https://github.com/",
                    "name": {
                        "en-us": "GitHub",
                        "zh-cn": "GitHub"
                    },
                    "desc": {
                        "en-us": "The world's largest code manage platform",
                        "zh-cn": "全球最大的代码管理平台"
                    },
                    "icon_size": "90"
                },
                {
                    "url": "https://www.w3schools.com/",
                    "name": {
                        "en-us": "W3schools",
                        "zh-cn": "W3schools"
                    },
                    "desc": {
                        "en-us": "Front-end tutorial",
                        "zh-cn": "前端教程"
                    },
                    "icon_size": "90"
                },
                {
                    "url": "https://dash.cloudflare.com",
                    "name": {
                        "en-us": "Cloudflare",
                        "zh-cn": "Cloudflare"
                    },
                    "desc": {
                        "en-us": "Cloudflare dashboard",
                        "zh-cn": "Cloudflare控制台"
                    },
                    "icon_size": "90"
                },
                {
                    "url": "https://www.runoob.com/",
                    "name": {
                        "en-us": "Runoob",
                        "zh-cn": "菜鸟教程"
                    },
                    "desc": {
                        "en-us": "Basic programing tutorial",
                        "zh-cn": "基础编程教程"
                    },
                    "icon_size": "90"
                }
            ]
        },
        {
            "name": {
                "en-us": "Academic",
                "zh-cn": "学术"
            },
            "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1em\" height=\"1em\" class=\"svg-icon\" fill=\"currentColor\" viewBox=\"0 0 16 16\"><path d=\"M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5ZM8 8.46 1.758 5.965 8 3.052l6.242 2.913L8 8.46Z\"/><path d=\"M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Zm-.068 1.873.22-.748 3.496 1.311a.5.5 0 0 0 .352 0l3.496-1.311.22.748L8 12.46l-3.892-1.556Z\"/></svg>",
            "quickLinkList": [
                {
                    "url": "https://scholar.google.com/",
                    "name": {
                        "en-us": "Google Scholar",
                        "zh-cn": "谷歌学术"
                    },
                    "desc": {
                        "en-us": "Academic search",
                        "zh-cn": "学术搜索"
                    },
                    "icon_size": "90"
                },
                {
                    "url": "https://www.cnki.net/",
                    "name": {
                        "en-us": "CNKI",
                        "zh-cn": "中国知网"
                    },
                    "desc": {
                        "en-us": "China National Knowledge Infrastructure",
                        "zh-cn": "中国国家知识基础设施"
                    },
                    "icon_size": "90"
                },
                {
                    "url": "https://v2ex.com/",
                    "name": {
                        "en-us": "V2EX",
                        "zh-cn": "V2EX"
                    },
                    "desc": {
                        "en-us": "A chatroom for developers",
                        "zh-cn": "开发者的聊天室"
                    },
                    "icon_size": "90"
                },
                {
                    "url": "https://www.researchgate.net/",
                    "name": {
                        "en-us": "ResearchGate",
                        "zh-cn": "ResearchGate"
                    },
                    "desc": {
                        "en-us": "Professional network for scientists",
                        "zh-cn": "科学家的专业网络"
                    },
                    "icon_size": "90"
                }
            ]
        }
    ]
};

export default config;
