/**
 * webpack构建时运行 node output生成配置文件
 */

const fs = require('fs');
const path = require('path');

//遍历文件夹添加入口文件
let entry_files = {};

function each_entry_file(dir) {
  try {
    fs.readdirSync(dir).forEach(function (file) {
      if(file=="common"){
        return
      }
      let file_path = dir + '/' + file;
      let fname = path.basename(file_path, '.js');
      entry_files[fname] = [(file_path+'/index.js')];
    })
  } catch (e) {

  }
}

each_entry_file('./src');
let entrysStr = 'module.exports=' + JSON.stringify(entry_files, null, 4);
fs.writeFileSync('./config/entrys.js', entrysStr, (err) => {
  if (err) throw err;
  console.log('生成entry入口')
});


//输出html模板

let pagesArray = [];

function each_file(dir) {
  try {
    fs.readdirSync(dir).forEach(function (file) {
      /*
      * {
      *   index:'./src/index.html',
      *   chunkname:'index'
      * }
      * */
      let file_obj = {};
      let file_path = dir + '/' + file;
      let chunk_name = path.basename(file,'.html');
      file_obj['filename'] = file+'.html';
      file_obj['template'] = file_path+'/index.html';
      file_obj['chuckName'] = chunk_name;
      file_obj['favicon'] = './jimigo-logo.png';
      if(file!="common"){
        pagesArray.push(file_obj)
      }
    })
  } catch (e) {

  }
}


each_file('./src');
let htmlsPluginStr = 'module.exports=' + JSON.stringify(pagesArray, null, 4)
fs.writeFileSync('./config/htmlPages.js', htmlsPluginStr, (err) => {
  if (err) throw err;
  console.log('生成html模板列表')
});