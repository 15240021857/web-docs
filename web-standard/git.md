# git 规范 <Badge type="danger" text="will do" />

## 项目 git 分支管理

解决什么问题？

- 为了满足团队的合作共同开发一个项目，代码的合并等等
- 为了满足项目的开发、测试、部署流程
- 为了应对需求变更、生产环境热修、多版本并行等等灵活的开发、测试、部署流程

怎么做呢？

## 代码回滚

解决什么问题？

- 当 commit 了错误代码，想反悔？
- 当 push 了错误代码，想反悔？
- 当上线发布了错误 web 分支，想反悔？
  - 找运维哥哥回滚？

怎么做呢？

## --allow-unrelated-histories

- 当想把本地新项目代码提交到 git 仓库，
- 但是新建的仓库中有其他文件如.gitignore、README.md、Linsence 等时，两个仓库一开始无关联，无法直接通过 git pull, git push -u origin master.
- 此时根据 git 抛出的错误提示，可执行--allow-unrelated-histories 相关命令来进行合并或拉代码。
