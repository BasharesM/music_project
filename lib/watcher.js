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
    if (path.extname(file) == ".txt")
    {
        console.log("traitement du fichier...");
        processFile(file);
    }
    else
    {
        fs.rename(file, "garbage/" + path.basename(file));
        console.log("a envoyer dans garbage");
    }
}


module.exports = {start : start};