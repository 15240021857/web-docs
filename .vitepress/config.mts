import { defineConfig } from 'vitepress'

// md文件公共地址
const viewsPath = '/src/views/'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "web-docs",
  description: "前端文档与规范",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/assets/imgs/web-isMoney.png',
    nav: [
      { text: 'Home', link: '/' },
      { text: '学习笔记', link: viewsPath + '/web-studynote/react' },
      { text: '前端工程化', link: viewsPath + '/web-engineering/cli' }
    ],

    sidebar: [
      {
        text: '学习笔记',
        items: [
          { text: 'react', link: viewsPath + '/web-studynote/react' },
          { text: 'ts', link: viewsPath + '/web-studynote/ts' },
          { text: 'uniapp', link: viewsPath + '/web-studynote/uniapp' },

        ]
      },
      {
        text: '个人作品',
        items: [
          { text: '即时通讯app', link: viewsPath + '/web-mycreation/chat-app' }
        ]
      },
      {
        text: '前端工程化',
        items: [
          { text: '脚手架', link: viewsPath + '/web-engineering/cli' },
          { text: 'mock数据', link: viewsPath + '/web-engineering/mock' },
          { text: 'JS/TS配置', link: viewsPath + '/web-engineering/js-config' },
          { text: '编辑器配置', link: viewsPath + '/web-engineering/editor' },
        ]
      },
      {
        text: '前端规范',
        items: [
          { text: '注释规范', link: viewsPath + '/web-standard/annotation' },
          { text: 'git规范', link: viewsPath + '/web-standard/git' },

        ]
      },
      {
        text: '大屏可视化',
        items: [
          { text: '可视化', link: viewsPath + '/web-bigscreen/index' }
        ]
      },
      

      // {
      //   text: 'Examples',
      //   items: [
      //     { text: 'Markdown Examples', link: '/markdown-examples' },
      //     { text: 'Runtime API Examples', link: '/api-examples' }
      //   ]
      // },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
