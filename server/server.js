require(global._dir + '/server/config/config.js');

const express = require('express');
var app = express();

//intializing mongoose
var mongoose = require('./db/mongoose');

//Setting up Router
var {Router} = require(global._dir + '/lib/routes.js');
var routes = require(global._dir + '/app/routes/routes.js');
app.use(Router(routes));

app.listen(3000, ()=>{
	console.log('Started at port 3000');
});