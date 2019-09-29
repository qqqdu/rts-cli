#! /usr/bin/env node
function print(str) {
  console.log('\x1B[35m%s\x1b[39m', str);  //yellow
}
var readlineSync = require('readline-sync');
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
function createName() {
  return new Promise(async (resolve, reject) => {

      print(`    
      对了，你想创建的项目名是什么？一定要起一个霸气的，才符合你的身份：`)
      const projectName = readlineSync.question(`\n`);
      if(!projectName) {
        await sleep(.5)
        print(`
      嗯哼，没有项目名，不行，必须得有一个，就叫它「rtsDemo」吧`)
        projectName = 'rtsDemo'
      } else {

        await sleep(.5)
        print(`
      「${projectName}」吗？不错的名字，真有品味！`)
      }
      resolve(projectName)
  })
}
function remo() {
  return str = `
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
.........'***@Oo\'*.....*]oO@/\@O@@@@@@@@@..............`
}
async function sleep (num){
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, num * 500)
  })
}
const {getCode, writeProject} = require('./utils')
async function main() {
  print(remo())
  const type = await createProject()
  await sleep(1)
  const name = await createName()
  await sleep(1)
  print('拉取代码ing\n')
  await getCode()
  print('安装代码ing\n')
  await sleep(1)
  writeProject(type-1, name)
  print('安装完成\n')
}
main()



// const program = require('commander')
// program
// .command('create <projectName>')
// .action(function(projectName) {
//   console.log(projectName)
// })
// program
//   .option('-d, --debug', 'output extra debugging')
//   .option('-s, --small', 'small pizza size')
//   .option('-p, --pizza-type <type>', 'flavour of pizza');
// program.parse(process.argv)

// if (program.debug) console.log(program.opts());
// console.log('pizza details:');
// if (program.small) console.log('- small pizza size');
// if (program.pizzaType) console.log(`- ${program.pizzaType}`);

// program.on('command:*', function () {
//   console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
//   process.exit(1);
// });
// var styles = {
//     'bold'          : ['\x1B[1m',  '\x1B[22m'],
//     'italic'        : ['\x1B[3m',  '\x1B[23m'],
//     'underline'     : ['\x1B[4m',  '\x1B[24m'],
//     'inverse'       : ['\x1B[7m',  '\x1B[27m'],
//     'strikethrough' : ['\x1B[9m',  '\x1B[29m'],
//     'white'         : ['\x1B[37m', '\x1B[39m'],
//     'grey'          : ['\x1B[90m', '\x1B[39m'],
//     'black'         : ['\x1B[30m', '\x1B[39m'],
//     'blue'          : ['\x1B[34m', '\x1B[39m'],
//     'cyan'          : ['\x1B[36m', '\x1B[39m'],
//     'green'         : ['\x1B[32m', '\x1B[39m'],
//     'magenta'       : ['\x1B[35m', '\x1B[39m'],
//     'red'           : ['\x1B[31m', '\x1B[39m'],
//     'yellow'        : ['\x1B[33m', '\x1B[39m'],
//     'whiteBG'       : ['\x1B[47m', '\x1B[49m'],
//     'greyBG'        : ['\x1B[49;5;8m', '\x1B[49m'],
//     'blackBG'       : ['\x1B[40m', '\x1B[49m'],
//     'blueBG'        : ['\x1B[44m', '\x1B[49m'],
//     'cyanBG'        : ['\x1B[46m', '\x1B[49m'],
//     'greenBG'       : ['\x1B[42m', '\x1B[49m'],
//     'magentaBG'     : ['\x1B[45m', '\x1B[49m'],
//     'redBG'         : ['\x1B[41m', '\x1B[49m'],
//     'yellowBG'      : ['\x1B[43m', '\x1B[49m']
// }