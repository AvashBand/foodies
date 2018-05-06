var { sample } = require('./model');

var samplenew = new sample({
	text:'sample',
	texts: 'more sample'
});

samplenew.save().then((doc)=>{
	console.log('save ', doc);
},(e)=>{
	console.log(e);
});