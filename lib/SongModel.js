var mysql = require("mysql");

var connection = mysql.createConnection({
	host:"localhost",
	user:'root',
	password:"",
	database:"mp3"
});

connection.connect();

function create(name, artist, album, year, duration, path, callback)
{
	var sql = "INSERT INTO `songs`(`name`, `artist`, `album`, `year`, `duration`, `path`)"+ 
	"VALUES ('"+name+"','"+artist+"','"+album+"','"+year+"','"+duration+"','"+path+"')";

	connection.query(sql, callback);
}
/*
function get(id, callback)
{
	connection.query("SELECT * FROM songs WHERE id = "+id, callback);
}

function getAll(callback)
{
	connection.query("SELECT * FROM songs", callback);
}

function update(id, name, artist, album, year, duration, callback)
{
	connection.query("UPDATE `songs` SET `name`="+name+",
		`artist`="+artist+",`album`="+album+",`year`="+year+",
		`duration`="+duration+" WHERE id = "+id, callback);
}

function remove(songId, callback)
{
	connection.query("DELETE FROM `songs` WHERE id = "+songId, callback);
}*/

module.exports = {create : create};