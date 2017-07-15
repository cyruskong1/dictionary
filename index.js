var express = require('express');
var app = express();
var cors = require('cors');
var routes = require('./routing')

var port = 9000;

app.use(express.static(__dirname + '/'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", GET, POST, PUT, DELETE, OPTIONS);
    res.header("Access-Control-Allow-Credentials",true);
    next();
});

app.listen(port, (req, res) =>{
  console.log('Hi Cy, working on Orderful Technical Challenge on port ' + port);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});
