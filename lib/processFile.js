var fs = require('fs');
var id3 = require('id3js');
var mm = require('musicmetadata');
var path = require('path');
var mkdirp = require('mkdirp');
var SongModel = require('./SongModel');

function onMove(metadata, path)
{
    /* Ecriture de la musique en BDD*/
    var title = (metadata.title) ? metadata.title : '';
    var artist = (metadata.artist) ? metadata.artist : '';
    var album = (metadata.album) ? metadata.album : '';
    var year = (metadata.year) ? metadata.year : '';
    var duration = (metadata.duration) ? metadata.duration : '';

    /*Gestion des caracteres speciaux*/
    title = title.replace("'", '');
    path = path.replace("'", '').replace(' ', '');

    SongModel.create(title, artist, album, year, duration, path, function(error){
        if (error)
            console.log(error);
    });


}

function processFile(file)
{
    var parser = mm(fs.createReadStream(file), {duration: true}, function (err, metadata) {
      if (err)
      {
        console.log('Error : Parsing of the file has failed. File is Invalid. Moved in /garbage .');
        fs.rename(file, 'garbage/'+path.basename(file));
      }
      else
      {
        var newPathOfTheSong;
        if (metadata.album)
        {
            
            mkdirp('albums/'+metadata.album, function(err) { 

                newPathOfTheSong = 'albums/'+metadata.album+'/'+path.basename(file);
                fs.rename(file, newPathOfTheSong);
                console.log("Moved in "+newPathOfTheSong);
                onMove(metadata, newPathOfTheSong);
            });
        }
        else
        {
            newPathOfTheSong = 'albums/inconnu/'+path.basename(file);
            fs.rename(file, newPathOfTheSong);
            console.log("Moved in "+newPathOfTheSong);
            onMove(metadata, newPathOfTheSong);
        }

      } 
    });
}

function createFolder(album, artist)
{
    fs.mkdir("albums/" + album, function(error){
      fs.writeFile("albums/" + album + "/" + artist, "");
    });
}


module.exports = processFile;