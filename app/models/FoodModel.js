const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var FoodSchema = new Schema({
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
	},
	orders:{
		type: Schema.Types.ObjectId,
		ref: 'Order'
	}
});

var Food = mongoose.model('Food', FoodSchema);

module.exports = Food;