require(global._dir + '/server/config/config.js');

const express = require('express');
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

var port = process.env.PORT;

//intializing mongoose
var mongoose = require('./db/mongoose');

//Setting up Router
var {Router} = require(global._dir + '/lib/routes.js');
var routes = require(global._dir + '/app/routes/routes.js');
app.use(Router(routes));

app.listen(port, ()=>{
	console.log(`Listenting at port ${port}`);
});