var express = require('express');
var processFile = require("./processFile");
var db = require("./SongModel");
var path = require('path');

var router = express.Router();


// retourne l'élement de la table avec l'id fourni
router.get("/:id", function (req, res) {

    db.get(req.params.id, function (error, data) {

        if (error)
            console.log(error);
        else
        {
           if (data[0])
            {
                var relativePath = data[0].path;
                res.sendFile(path.resolve(relativePath));
            } 
        }

    });

});



module.exports = router;











