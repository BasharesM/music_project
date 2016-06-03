var chokidar = require('chokidar');
var fs = require('fs');
var path = require('path');
var processFile = require("./processFile");


function start()
{
    // Initialize watcher. 
    var watcher = chokidar.watch('incoming_songs', {
      ignored: /[\/\\]\./,
      persistent: true
    });

    watcher.on('add', onNewFile);
}

function onNewFile(file)
{
    if (path.extname(file) == ".mp3")
    {
        console.log("Info : treating the mp3 file");
        processFile.processFile(file);
    }
    else
    {
        fs.rename(file, 'garbage/'+path.basename(file));
        console.log("Warning : The drop file has wrong extension, moved in /garbage .");
    }
    
    return;
}


module.exports = {start : start};