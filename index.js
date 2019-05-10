const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

const chokidar = require('chokidar')
const moment = require('moment');

console.log(`===== Jienhua image auto-compressor is running :D =====`);
console.log("Watching folder...");

chokidar.watch("./imageFolder", {
  persistent: true,
  ignoreInitial: true,
  ignored: /(^|[\/\\])\../,
  cwd: '.', // 表示当前目录
  depth: 0
}).on('all', (event, path, stat) => {
    if(event=="add"){
      (async () => {
        let files = await imagemin([path], 'outputFolder', {
          plugins: [
            imageminJpegtran({
              quality: [0.1, 0.1]
            }),
            imageminPngquant({
              quality: [0.5, 0.5]
            })
          ]
        });
        console.log("compressed file: " + path);
      })();
    }
});