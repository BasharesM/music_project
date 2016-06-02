var fs = require('fs');
var db = require('./db');

// le ficher correspondant est ouvert
function processFile(file)
{
    fs.readFile(file, 'utf8', function(error, content){
        if (error)
        {
            if (error.errno == -2)
                console.log("Le nom du fichier est incorrect");
            else
                console.log(error);
            return;
        }
        
        fs.unlink(file);

        var lines = content.split("\n");

        var parts;
        var album;
        var artist;
        lines.forEach(function(line){ 

            parts = line.split("-");
            album = parts[0].trim();
            artist = parts[1].trim();
            createFolder(album, artist);
        });

    });
}

function createFolder(album, artist)
{
    fs.mkdir("albums/" + album, function(error){
       //if (error)
       //{
       //   console.log(error)
       //};

      fs.writeFile("albums/" + album + "/" + artist, "");
        
    // extraire le tagID3
      db.insert(album, artist);
      
    });
}


module.exports = processFile;




