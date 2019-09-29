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
    fs.removeSync('./ReactTemplate')
  })
}