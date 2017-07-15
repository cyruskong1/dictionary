var express = require('express');
var app = express();
var cors = require('cors')

var port = 9000;

app.use(express.static(__dirname + '/'));

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", GET, POST, PUT, DELETE, OPTIONS);
    res.header("Access-Control-Allow-Credentials",true);
    next();
});

app.listen(port, function(req, res) {
  console.log('Hi Cy, working on Orderful Technical Challenge on port ' + port);
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

const url = 'http://www.dictionaryapi.com/api/v1/references/collegiate/xml/'
const key = '?key=3d6528c8-1f2a-4a3d-b31b-aaac711c4efd';


