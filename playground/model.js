var mongoose = require('mongoose');

var sample = mongoose.model('Sample', {
	text:{
		type:String
	},
	texts:{
		type:String
	}
});

module.exports = { sample };