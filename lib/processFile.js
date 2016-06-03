var fs = require('fs');
var id3 = require('id3js');
var mm = require('musicmetadata');
var path = require('path');
var mkdirp = require('mkdirp');
var SongModel = require('./SongModel');

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function onMove(metadata, path)
{
    /* Ecriture de la musique en BDD*/
    var title = (metadata.title) ? metadata.title : "";
    var artist = (metadata.artist) ? metadata.artist : "";
    var album = (metadata.album) ? metadata.album : "inconnu";
    var year = (metadata.year) ? metadata.year : "";
    var duration = (metadata.duration) ? metadata.duration : "";

    title = title.replaceAll("'", '');
    album = album.replaceAll("'", '');
    //artist = artist.replaceAll("'", '');

    /*Gestion des caracteres speciaux*/
//    title = title.replace("'", "\'");
//    path = path.replace("'", "\'");
//    console.log(path);

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
                newPathOfTheSong = newPathOfTheSong.replace("'", '');
                fs.rename(file, newPathOfTheSong);
                console.log("Moved in "+newPathOfTheSong);
                onMove(metadata, newPathOfTheSong);
            });
        }
        else
        {
            /*Création du dossier "Inconnu"*/
            fs.access('/albums/inconnu', fs.R_OK | fs.W_OK, (err) => {
                  if (err)
                  {
                    mkdirp('albums/inconnu', function(err) { 

                        newPathOfTheSong = 'albums/inconnu/'+path.basename(file);
                        newPathOfTheSong = newPathOfTheSong.replace("'", '');
                        fs.rename(file, newPathOfTheSong);
                        console.log("Moved in "+newPathOfTheSong);
                        onMove(metadata, newPathOfTheSong);

                    });
                  }
                  else
                  {
                    newPathOfTheSong = 'albums/inconnu/'+path.basename(file);
                    newPathOfTheSong = newPathOfTheSong.replace("'", '');
                    fs.rename(file, newPathOfTheSong);
                    console.log("Moved in "+newPathOfTheSong);
                    onMove(metadata, newPathOfTheSong);
                  }
                });
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

function onRemove(file)
{
    fs.unlink(file, function(error) {
        if(error)
            console.log(error);
    });
}

function onUpdateMove(metadata) {
    var previousPath = metadata.path.split('/');
    mkdirp('albums/'+metadata.album, function(err) { 
        newPathOfTheSong = 'albums/'+metadata.album+'/'+previousPath[2];
        newPathOfTheSong = newPathOfTheSong.replace("'", '');
        fs.rename(metadata.path, newPathOfTheSong, function(err) {
            if(err)
                console.log(err);
        });
        console.log("Moved in "+newPathOfTheSong);
        metadata.title = metadata.name;
        onMove(metadata, newPathOfTheSong);
    });
}


module.exports = {
    processFile : processFile,
    remove : onRemove,
    move : onUpdateMove
}