import{_ as i,c as l,j as e,a,o as r}from"./chunks/framework.BTA17ug4.js";const m=JSON.parse('{"title":"git 规范","description":"","frontmatter":{},"headers":[],"relativePath":"web-standard/git.md","filePath":"web-standard/git.md"}'),s={name:"web-standard/git.md"};function n(o,t,d,c,u,g){return r(),l("div",null,t[0]||(t[0]=[e("h1",{id:"git-规范",tabindex:"-1"},[a("git 规范 "),e("a",{class:"header-anchor",href:"#git-规范","aria-label":'Permalink to "git 规范"'},"​")],-1),e("h2",{id:"allow-unrelated-histories",tabindex:"-1"},[a("--allow-unrelated-histories "),e("a",{class:"header-anchor",href:"#allow-unrelated-histories","aria-label":'Permalink to "--allow-unrelated-histories"'},"​")],-1),e("ul",null,[e("li",null,"当想把本地新项目代码提交到 git 仓库，"),e("li",null,"但是新建的仓库中有其他文件如.gitignore、README.md、Linsence 等时，两个仓库一开始无关联，无法直接通过 git pull, git push -u origin master."),e("li",null,"此时根据 git 抛出的错误提示，可执行--allow-unrelated-histories 相关命令来进行合并或拉代码。")],-1)]))}const p=i(s,[["render",n]]);export{m as __pageData,p as default};
