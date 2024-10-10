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
    outline: {
      level: [2, 3]
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: '学习笔记', link: '/web-studynote/ts' },
      { text: '前端工程化', link: '/web-engineering/performance-improve' }
    ],

    sidebar: [
      {
        text: '学习笔记',
        items: [
          { text: 'htmlcss', link: '/web-studynote/htmlcss' },
          { text: 'js', link: '/web-studynote/js' },
          { text: 'vue', link: '/web-studynote/vue' },
          { text: 'ts', link: '/web-studynote/ts' },
          { text: 'react', link: '/web-studynote/react' },
          { text: 'uniapp', link: '/web-studynote/uniapp' },
          { text: '网络', link: '/web-studynote/network' },
          { text: 'node', link: '/web-studynote/node' },
          { text: 'electron', link: '/web-studynote/electron' },
          { text: 'webrtc', link: '/web-studynote/webrtc' },
          { text: 'flv视频直播', link: '/web-studynote/flv' },
          { text: '3d', link: '/web-studynote/three3d' },
          { text: '数据结构与算法', link: '/web-studynote/data-structure' }
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
          { text: '模块化', link: '/web-engineering/module' },
          { text: '组件化', link: '/web-engineering/component' },
          { text: '性能优化', link: '/web-engineering/performance-improve' },
          { text: '用户体验', link: '/web-engineering/ue' },
          { text: 'devOps开发和运维', link: '/web-engineering/devOps' },
          { text: '加密技术', link: '/web-engineering/secret' },
          { text: '单元测试', link: '/web-engineering/test' },
          { text: '前端监控和页面埋点', link: '/web-engineering/monitor' },
        ]
      },
      {
        text: '前端规范',
        items: [
          { text: '代码审查Code Review', link: '/web-standard/code-review' },
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
        text: '软技能',
        items: [
          { text: '设计工具', link: '/web-design/index' },
          { text: '问题解决能力', link: '/web-design/QuestionResolve' },
          { text: 'markdown文档能力', link: '/web-design/index' }
        ]
      },
      {
        text: '其他事',
        items: [
          { text: '搞钱', link: '/other-things/earn-money' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/15240021857/web-docs' }
    ]
  }
})
