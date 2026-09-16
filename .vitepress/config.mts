import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/web-docs/',
  title: "吴的前端小世界",
  description: "前端资产",
  head: [['link', { rel: 'icon', href: '/web-docs/wu.ico' }]],
  vite: {
    build: {
      emptyOutDir: true
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/dest-logo.png',
    outline: {
      level: [2, 3]
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: '学习笔记', link: '/web-studynote/ts' },
      { text: '前端工程化', link: '/web-engineering/base-building' },
      { text: '流程规范', link: '/web-standard/web-dev' }
    ],
    lastUpdated: {
      // text: 'Updated at',
      formatOptions: { dateStyle: 'short', timeStyle: 'short' }
    },
    sidebar: [
      
      {
        text: '个人作品及成果',
        items: [
          { text: '待做作品池 <span class="st st-todo">Todo</span>', link: '/web-mycreation/creation-pools' },
          { text: 'Electron智能聊天桌面端 <span class="st st-done">Done</span>', link: '/web-mycreation/electron-chat-pc' },
          { text: 'Uniapp智能试衣移动端 <span class="st st-done">Done</span>', link: '/web-mycreation/app-ai-tryon' },
          { text: 'Openlayer天气预警大屏 <span class="st st-done">Done</span>', link: '/web-mycreation/screen-weather-warn' },
          { text: 'Vitepress前端资产博客 <span class="st st-done">Done</span>', link: '/web-mycreation/web-docs' },
          { text: 'Nodejs大前端脚手架 <span class="st st-done">Done</span>', link: '/web-mycreation/cli' },
          { text: 'NPM个人开源包 <span class="st st-doing">Doing</span>', link: '/web-mycreation/npm-mit' },
          // { text: '即时通讯app', link: '/web-mycreation/chat-app' },
          // { text: 'express博客接口服务', link: '/web-mycreation/node-blog' },
        ]
      },
      {
        text: '工程化',
        items: [
          { text: '前端基建', link: '/web-engineering/base-building' },
          { text: '大前端脚手架 <span class="st st-doing">Doing</span>', link: '/web-mycreation/cli' },
          { text: '建设NPM私仓 <span class="st st-done">Done</span>', link: '/web-engineering/self-npm' },
          { text: 'mock数据', link: '/web-engineering/mock' },
          { text: '性能优化 <span class="st st-done">Done</span>', link: '/web-engineering/performance-improve' },
          { text: 'devOps & CI/CD <span class="st st-done">Done</span>', link: '/web-engineering/devOps' },
          { text: '错误监控与埋点 <span class="st st-done">Done</span>', link: '/web-engineering/monitor' },
          { text: 'JS/TS配置', link: '/web-engineering/js-config' },
          { text: '编辑器配置', link: '/web-engineering/editor' },
          { text: '模块化', link: '/web-engineering/module' },
          { text: '组件化与组件规范', link: '/web-engineering/component' },{ text: '测试体系', link: '/web-engineering/test' },
          { text: '用户体验', link: '/web-engineering/ue' },
          { text: '安全加密', link: '/web-engineering/secret' },
        ]
      },
      {
        text: '前端流程与规范',
        items: [
          { text: '前端开发规范', link: '/web-standard/web-dev' },
          { text: '代码审查CR流程', link: '/web-standard/code-review' },
          { text: '注释规范', link: '/web-standard/annotation' },
          { text: 'git规范', link: '/web-standard/git' },
        ]
      },
      {
        text: '难点亮点',
        items: [
          { text: '前端弱网断网处理方案', link: '/web-star/weak-net' },
          { text: '大文件上传SDK封装', link: '/web-star/bigfile-upload' },
        ]
      },
      {
        text: '学习笔记',
        items: [
          { text: 'htmlcss <span class="st st-doing">Doing</span>', link: '/web-studynote/htmlcss' },
          { text: '浏览器', link: '/web-studynote/web-broswer' },
          { text: 'js', link: '/web-studynote/js' },
          { text: 'vue', link: '/web-studynote/vue' },
          { text: 'ts <span class="st st-done">Done</span>', link: '/web-studynote/ts' },
          { text: 'react', link: '/web-studynote/react' },
          { text: 'uniapp', link: '/web-studynote/uniapp' },
          { text: '网络', link: '/web-studynote/network' },
          { text: 'node', link: '/web-studynote/node' },
          { text: 'electron', link: '/web-studynote/electron' },
          { text: 'webrtc', link: '/web-studynote/webrtc' },
          { text: '视频直播flv', link: '/web-studynote/flv' },
          { text: '3d', link: '/web-studynote/three3d' },
          { text: '地图map', link: '/web-studynote/map' },
          { text: '数据结构与算法', link: '/web-studynote/data-structure' }
        ]
      },
      {
        text: '项目经验',
        items: [
          { text: '设备全寿命周期管控专家系统 <span class="st st-todo">Todo</span>', link: '/web-project-experience/qingdao-device-expert-system' },
        ]
      },
      {
        text: '架构设计与落地',
        items: [
          { text: '架构', link: '/web-architecture/architecture' },
          { text: '网站登录鉴权设计', link: '/web-architecture/login-auth' },
          { text: '低代码平台', link: '/web-architecture/lower-code' },
          { text: '微前端', link: '/web-architecture/micro-web' },
        ]
      },
      {
        text: 'AI人工智能',
        items: [
          { text: 'AI开发项目', link: '/web-ai/project-dev'}
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
      // {
      //   text: '其他事',
      //   items: [
      //     { text: '搞钱', link: '/other-things/earn-money' },
      //     // { text: '失业', link: '/other-things/lose-job' }
      //   ]
      // }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/15240021857/web-docs' }
    ]
  },
  markdown: {
    image: {
      lazyLoading: true,
    }
  }
})
