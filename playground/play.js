// const express = require('express');
// const bodyParser = require('body-parser');
// var app = express();
// app.use(bodyParser.json());

// app.post('/', (req, res)=>{
// 	console.log(req);
// 	res.send('hey');
// });

// app.listen(3000, ()=>{
// 	console.log('Started at port 3000');
// });


var sample = {};
sample.hello = ()=>{
	console.log('reponasie');
}

sample.shallow = ()=>{
	console.log('deconasia');
}

sample.mellow = ()=>{
	console.log('naponaisa');
}

console.log(sample);