# git 规范 <Badge type="danger" text="will do" />

## --allow-unrelated-histories

- 当想把本地新项目代码提交到 git 仓库，
- 但是新建的仓库中有其他文件如.gitignore、README.md、Linsence 等时，两个仓库一开始无关联，无法直接通过 git pull, git push -u origin master.
- 此时根据 git 抛出的错误提示，可执行--allow-unrelated-histories 相关命令来进行合并或拉代码。
