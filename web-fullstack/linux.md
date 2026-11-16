# Linux 系统

## 命令行
### ls 查看
查看当前目录

- `ls -l` 简写 `ll`, 查看文件类型（d文件夹），权限，拥有者，文件大小等信息详情
- `ls -a` 查看隐藏文件
- `ls -a -l` 简写 `ls -al` 查看隐藏文件信息详情


### 文件/文件夹相关命令

#### 打开
- `cd` 打开文件夹 如 `cd /usr, cd /root`
- `cd /` 打开根目录 `/a` 打开根目录下的a目录
- `cd ~` 打开用户 home 目录
- `cd ..` 上级
- `cd .` 当前目录

#### mkdir 创建
```text
- mkdir a 创建文件夹
- mkdir -p a/b/c 创建多级目录
```

#### cp 复制
```text
- cp a b 复制文件
- cp -r a/ b/ 复制文件夹
```

#### mv 移动

```text
- mv a b/ 把a移到b文件夹下
- mv a c 把a 移动当前的c下面，也就是重命名
```


#### rm 删除
```text
- rm -f name : -f 强制删除，不询问
- rm -rf hello/ ： -r 递归删除
- rm -rf * 删除当前目录所有文件，删库跑路
- rm -rf /* 删除根目录下所有文件，操作系统干没了 
```

### cat 文件读取
```text
- cat [-n] fileName 查看文件内容
    - -n 展示行号
- more fileName 文件特别长，隐藏多余行，按空格、回车、去查看
- less fileName 跟more一样
- head [-n] fileName 查看开头n行
- tail [-n] fileName 查看文件尾
```

### tar 打包，压缩，解压

```text
tar -[zcxvf] filename [files]

.tar 代表打包了
.tar.gz 代表打包并压缩了

- files 代表打包谁
- filename 打包/解压的结果目标名字
- c 打包或压缩
- x 解包或解压
- z 压缩gzip，解压缩 要带，.tar.gz
- v 操作详情展示
- f 文件名
```

```bash
# 得到 a.tar 打包
tar -cvf a.tar same-dir/


# 得到 a.tar.gz 的压缩包
tar -zcvf a.tar.gz same-dir/
```