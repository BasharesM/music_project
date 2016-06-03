
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var media = require('./lib/media');
var file = require('./lib/file');

var watcher = require('./lib/watcher');
watcher.start();

var app = express();

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({extended:false}));
app.use( express.static(path.join(__dirname + "/app")));

app.use("/medias", media);
app.use("/files", file);

app.listen(3000, function(){ console.log("Server listening on port 3000 ..."); });
