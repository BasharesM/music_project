var express = require('express');
var processFile = require("./processFile");
var db = require("./SongModel");

var router = express.Router();

// retourne tous les élements de la table
router.get("/", function (req, res) {

    db.getAll(function (error, data) {
        res.json(data);
    });


});

// retourne l'élement de la table avec l'id fourni
router.get("/:id", function (req, res) {

    var id = req.params.id;

    db.get(id, function (data) {

        res.json(data);

    });

});

// ajout un nouvel élément
router.post("/", function (req, res) {

    db.insert(req.body.album, req.body.artist, function (data) {

        res.json(data);

    });


});

// modifie l'élement correspondant à l'id
router.put("/:id", function (req, res) {
    if(req.body['previousSong'].album != req.body['newSong'].album) {
        processFile.move(req.body['newSong']);
        db.remove(req.body['previousSong'].id, function (data) {
            res.json(data);
        });
    } else {
        var newSong = req.body['newSong'];
        db.update(newSong.id, newSong.name, newSong.artist, newSong.album, newSong.year, newSong.duration, function (data) {

            res.json(data);

        });
    }
});

// supprime l'élement correspondant à l'id
router.delete("/:id", function (req, res) {
    var id = req.params.id;

    db.get(id, function (error, data) {
        var file = data[0].path;
        processFile.remove(file);
        db.remove(req.params.id, function (data) {
            res.json(data);
        });

    });
});

module.exports = router;











