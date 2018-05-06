exports = module.exports;

var test = require(global._model + '/test');

exports.test = (req, res)=>{
	var newTest = new test({
		text : 'sample'
	});
	newTest.save().then((doc)=>{
		res.send(doc);
	},(e)=>{
		res.send(e);
	});
}