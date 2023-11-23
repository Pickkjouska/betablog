---
title: nuxt3通过pm2部署
description: nuxt3通过pm2部署到腾讯云的轻量服务器上

---

# 环境搭建

## 安装 Node.js

执行以下命令，下载 Node.js Linux 64位二进制安装包。

```bash
wget https://nodejs.org/dist/v10.16.3/node-v10.16.3-linux-x64.tar.xz
```

执行以下命令，解压安装包。

```bash
tar xvf node-v10.16.3-linux-x64.tar.xz
```

依次执行以下命令，创建软链接。

```bash
ln -s /root/node-v10.16.3-linux-x64/bin/node /usr/local/bin/node

ln -s /root/node-v10.16.3-linux-x64/bin/npm /usr/local/bin/npm
```

成功创建软链接后，即可在云服务器任意目录下使用 node 及 npm 命令。

依次执行以下命令，查看 Node.js 及 npm 版本信息。

```bash
npm -v
node -v
```

## 安装Node.js多版本

要是在安装node的时候发现不是自己想要的版本，可以通过nvm来切换版本

下载 NVM 源码并检查最新版本。

```bash
git clone https://gitclone/github.com/cnpm/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`
```

配置 NVM 环境变量。

```bash
echo ". ~/.nvm/nvm.sh" >> /etc/profile
```

读取环境变量。

```bash
source /etc/profile
```

查看 Node.js 所有版本（建议直接找到自己想要的node.js版本。

```bash
nvm list-remote
```

安装多个版本的node.js

```bash
nvm install v18.6.0
```

查看已安装node.js版本和切换使用版本

```bash
nvm ls

nvm use v18.6.0
```

## 安装PM2

nuxt3可以通过[pm2](https://pm2.fenxianglu.cn/docs/start/)来部署，非常好用

这是**pm2**的安装命令

```bash
npm install pm2@latest -g
```

在搭建好服务器的环境之后，就可以开始部署自己的nuxt项目啦

# 部署

先把自己的nuxt项目打包好

```c
npm run build
```

然后会在当前目录下面生成一个名为 **.output** 的文件夹，里面包含public、server和nitro.json，将里面的的内容打包成.output.zip，放到自己的服务器上，可以自己任意挑选位置。

再把.output.zip放上去，解压

```bash
unzip .output.zip
```

当前文件夹格式应该是这样的，blog是自己创的文件夹，想用啥名字都可以。也有可能会没有.output这一层，问题不大

```c
*blog
  *.output
    *public
    *server
    *nitro.json
```

在**blog**文件夹下通过命令生成配置文件，名为**ecosystem.config.js**

```bash
pm2 init simple
```

再把里面的配置更改为下面这个

```bash
module.exports = {
  apps: [
    {
      name: 'noobblog', # 创建的名字
      port: '3000', # 开放的端口
      exec_mode: 'cluster',
      instances: '1',
      script: './.output/server/index.mjs' #index.mjs的相对地址
    }
  ]
}
```

**script**这一项填的相对地址，如果前面没有 **.output**这一层文件夹，那么相对地址也就是 **./server/index.mjs**

这时候的文件夹就变这样的了

```c
*blog
  *ecosystem.config.js
  *.output
    *public
    *server
    *nitro.json
```

在完成这些之后只需要这样就可以运行啦

```bash
pm2 start
```

可以通过这个命令去看自己运行的应用

```bash
pm2 list
```

查看应用的日志

```bash
pm2 logs [指定应用]
```

# 踩坑

要注意好自己的node版本，不要错了，不然的话pm2会反复重启，然后报错重启失败喵
