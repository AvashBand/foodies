const mongoose = require('mongoose');

var test = mongoose.model('test', {
	text:{
		type:String
	}
});

module.exports = test;