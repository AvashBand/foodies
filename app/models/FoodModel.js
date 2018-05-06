const mongoose = require('mongoose');

var Food = mongoose.model('Food', {
	name: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	price: {
		type: Number,
		default: null
	},
	image_url: {
		type: String,
		default: 'N/A'
	}
});

module.exports = Food;