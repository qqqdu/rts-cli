# Rts-cli
 
# Why 
以前每开一个项目都要配置各种东西，Typescript啦，Redux啦，React啦。太麻烦了！  

所以写一个自己用的Cli，能快速给我生成一个代码目录，减少生命中浪费的无数个十几分钟。  (即使是create-react-app自己也要改很多。要 npm run eject 要配置redux......)


## 初始化项目

`npm init`  
新建 index.js 文件
```javascript
#! /usr/bin/env node
console.log('rts-cli');
```
并在 package 中将 index 作为可执行包入口  
```json
  "bin": {
    "rts-cli": "./index.js"
  }
```
修改path，在全局可通过 `rts-cli` 直接调用
`npm link`
现在你在任何地方调用 `rts-cli` 就可以启动cli了。

## 我想要......粉嫩嫩的命令行
首先给自己 new 一个二次元小妹妹，让每次启动项目都有恋爱的感觉。
```
........................................................
..............,/O@@@@@@@@@@\]...........................
...........,@@@@@@//\@@@@@@@@@@O'.......................
.........//O@@OO@@@@@@@@@@@@@O@@@@\.....................
.......,/*OO@OOO@@@@@@@@@@@@@@@@@@@@'...................
......=O'=oOOOO@OOO@@@@@@@@@@@@@@O@@@\..................
.....=\^.^=.[O@OOOO@OO@OOO@@@@@@@@@@@@O'................
...../O.=...=O@\OOOOOOOOOO@@@@@@OOOO@@@O................
....=\O*==o*OOO=^O@/O@OOO\OO/O@/O@OO@@@O\...............
....OOOoo/ooO@O/@OOOO@OOOO@OO'O\O@OO@@@@O...............
...=@OOOOOOo@OO/@OOOO@OOOO@@\.,OO@OO@@@@O^..............
.../OO@@OO@O@O@O@O@OO@OOOO\@\]..@@O@@@@@@^..............
...OOO@@@O@@@@@@@@@O@@@OO@@@@@@@O@O@@@@@O^..............
...^=@@@@@O@@@@@@@\@O@@@@\,@@@@@@@@@@@@@/...............
...\.@@@O@@@@@oOOo'*....**ooOOO\@@@@O@@\................
....*.@@@@/OOoooo'***,'..**\oooO\O\@@@.'................
.......\@@@@\*****........******@@OO'...................
.........\@@@@'***.=@@@@^..***,@@@/...................]]
..........,OO@@@]***,[['****]OOO'.............],[*...*=
............\'.\O@@\'**,/@@OO[....]/['*********.......O^
.................,^[OO@@@@@@OOOOO/*******.*****....,/O@^
.................=^\,OOOOOOO@@/'.***....*/OOOOOOOOO[[\'.
................/O'=^=OOOOO/'\O*..*.....=@@@@@/'....=\*.
.............,/*.O*]O'**/'.//*=o.****..=@@'.......,/[...
.........../[o[[*O]]]*[*..*.....o^*\O'*@'.......**..,]]O
.......,/******.*O.***........***\\/\*=^.....=@O/O.@@@'.
....../..***..**=O**........****/@@@@/]O^.,/.O^=.o.'....
.....,^...**..,o=O*****....******,\^.,@\]O/'..OO@@\\....
.....=^...*'*oooOOo******..*,'****/^....\O\...'.,O@/\^..
......^*.*=OOOO@O@@*****,/\.o^*..=/.......O.............
......=**.,O@O@@/\@.....**\OOo*.,/........=^............
.......\***OOo=^...\\'...**=@O^,O*......**=^............
.......='*=OO^O......,\O]..=@OOOOo],']ooOo/.............
........\**'O/^..........,OOOO@OOOOOOOOOO@..............
.........'***@Oo\'*.....*]oO@/\@O@@@@@@@@@..............
```
用图片转为字符，这很常见，懒得去写，直接用了网上的工具生成。  

还有命令行太死板，基本是黑底白字，但我需要粉嫩嫩的感觉。

在命令行我们可以用 ascii 码来做颜色修改。
对console做简单的封装
```javascript
function print(str) {
  console.log('\x1B[35m%s\x1b[39m', str);  //yellow
}
```
然后，把我们的小R打印出来，当我的命令行启动的时候，你会看到。
![](https://user-gold-cdn.xitu.io/2019/9/29/16d7d15d0864f2fb?w=483&h=674&f=png&s=71865)

太棒了！！
## 提供给用户的命令
比如用户输入了 `rts-cli --help` ，我们就要给他打印帮助内容。所以我们需要一个库，来分离不同的指令。
commander 命令就是干这个的，拿到用户的指令。 
安装 commander 包  
`npm install --save-dev commander` 
### 简单的输入指令
```javascript
#! /usr/bin/env node
// index.js
const program = require('commander')
program
.command('create <projectName>')
.action(function(projectName) {
  console.log(projectName)
})
program.parse(process.argv)
```
当运行 `rts-cli create name` 时，会打印 `name`  

## 带选项的指令
```javascript
const program = require('commander');

program
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza');

program.parse(process.argv);
if (program.debug) console.log(program.opts());
console.log('pizza details:');
if (program.small) console.log('- small pizza size');
if (program.pizzaType) console.log(`- ${program.pizzaType}`);
```
你可以直接用 program 访问那些属性，但 a-bc 要转成驼峰 aBc

## readline-sync

我们还需要用户在使用中，做一些判断，比如输入
`rts-cli` 后，命令行还可以继续输入，可能是二次确认，用户需要输入 Y/N，也可能是设置 项目名/作者/语言。  
安装 readline-sync 包, 它可以读到命令行的输入值。
`npm install --save-dev readline-sync`

```javascript
function createProject() {
  return new Promise(async (resolve, reject) => {
    await sleep(1)
    print(`
      嗨，我是小R,你想创建哪种项目呀：\n `)
    await sleep(1)
    print(`
      1: React & Typescript & Redux\n `)  
    await sleep(1)
    print(`
      2: React & Typescript & Hook\n `)
    await sleep(1)
    const project = readlineSync.question(`
      键入数字就行了: 1 / 2\n`);
    if(+project === 1) {
      print(`
      真有品味，选择Redux，你一定是个老男人\n`)
      resolve(1)
    } else if(+project === 2) {
      print(`哇，选择了Hook，真刺激呀`)
      resolve(2)
    } else {
      print(`牛奶面包，你总得要一个吧，哼，不知足的人`)
      reject('拜拜了')
    }
  })
}
```
我们通过它，可以拿到用户的输入信息了
![](https://user-gold-cdn.xitu.io/2019/9/29/16d7d15d06605925?w=513&h=301&f=png&s=36143)

## 拉取代码保存到用户目录

用git拉去远程的空项目，然后保存在本地，代码很简单。
`simple-git` 是个很简单的git操作工具，在远程目录下有两个项目，一个是redux项目，一个是Hook项目，先将这个仓库 clone 到本地，然后复制对应的项目，复制完成，卸载仓库。
```javascript
const git = require('simple-git/promise');
const remote = 'https://github.com/qqqdu/ReactTemplate.git'
const fs = require('fs-extra');

exports.getCode =  () => {
  return git().silent(true).clone(remote)
}
exports.writeProject = (type, fileName) => {
  const fileList = ['typescript', 'react-hook']
  fs.copy(`./ReactTemplate/${fileList[type]}`, `./${fileName}`, err => {
    if (err) return console.error(err)
    console.log('success!')
    // 删掉git项目，只保留对应模版
    fs.removeSync('./ReactTemplate')
  })
}
```
## 结束
最终的效果
![](https://user-gold-cdn.xitu.io/2019/9/29/16d7d15d062c7512?w=1000&h=1000&f=gif&s=1827606)

[项目地址](https://github.com/qqqdu/rts-cli)