const mongoose = require('mongoose');

var OrderSchema = mongoose.model('Order', {
	user_id: {
		type: String,
		required: true
	},
	food_id: {
		type: String,
		required: true
	},
	is_cancelled: {
		type: Boolean,
		required: true,
		default: false
	},
	updated_at: {
		type: String,
		default: new Date()
	},
});

module.exports = Order;