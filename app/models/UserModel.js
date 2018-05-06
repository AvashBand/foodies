const mongoose = require('mongoose');

var User = mongoose.model('User',{
	name : {
		type: String,
		required: true,
		unique: true,
		minlength: 5,
		trim: true
	},
	username: {
		type: String,
		required: true,
		minlength: 2,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
	image_url: {
		type: String,
		default: 'N/A'
	},
	is_active: {
		type: Boolean,
		default: false
	}, 
	is_admin: {
		type: Boolean,
		default: false
	},
	tokens : [{
		token: {
			type: String,
			default: ''
		}
	}]
});

module.exports = User;


