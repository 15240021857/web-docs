import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/web-docs/',
  title: "web-docs",
  description: "前端文档与规范",
  head: [['link', { rel: 'icon', href: '/web-docs/favicon.ico' }]],
  vite: {
    build: {
      emptyOutDir: true
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/web-isMoney.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: '学习笔记', link: '/web-studynote/react' },
      { text: '前端工程化', link: '/web-engineering/cli' }
    ],

    sidebar: [
      {
        text: '学习笔记',
        items: [
          { text: 'js', link: '/web-studynote/js' },
          { text: 'vue', link: '/web-studynote/vue' },
          { text: 'react', link: '/web-studynote/react' },
          { text: 'ts', link: '/web-studynote/ts' },
          { text: 'uniapp', link: '/web-studynote/uniapp' },
          { text: '网络', link: '/web-studynote/network' },
          { text: 'node', link: '/web-studynote/node' },
          { text: 'flv视频直播', link: '/web-studynote/flv' },
          { text: '3d', link: '/web-studynote/three3d' },

        ]
      },
      {
        text: '个人作品',
        items: [
          { text: '即时通讯app', link: '/web-mycreation/chat-app' },
          { text: '前端博客', link: '/web-mycreation/web-docs' },
        ]
      },
      {
        text: '前端工程化',
        items: [
          { text: '脚手架', link: '/web-engineering/cli' },
          { text: 'mock数据', link: '/web-engineering/mock' },
          { text: 'JS/TS配置', link: '/web-engineering/js-config' },
          { text: '编辑器配置', link: '/web-engineering/editor' },
          { text: '性能优化', link: '/web-engineering/performance-improve' },
          { text: '用户体验', link: '/web-engineering/ue' },
          { text: 'devOps开发和运维', link: '/web-engineering/devOps' },

        ]
      },
      {
        text: '前端规范',
        items: [
          { text: '注释规范', link: '/web-standard/annotation' },
          { text: 'git规范', link: '/web-standard/git' },

        ]
      },
      {
        text: '大屏可视化',
        items: [
          { text: '可视化', link: '/web-bigscreen/index' }
        ]
      },
      {
        text: '方案设计软技能',
        items: [
          { text: '设计工具', link: '/web-design/index' },
          { text: '问题解决能力', link: '/web-design/QuestionResolve' },

        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
