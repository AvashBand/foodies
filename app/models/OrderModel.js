const mongoose = require('mongoose');
var Members = require(global._model + '/UserModel');
var Foods = require(global._model + '/FoodModel');
var _ = require('lodash');

var OrderSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	user_fullname:{
		type: String,
		default: ''
	},
	food_id:{
		type: String,
		required: true	
	},
	food_name:{
		type: String,
		default: ''	
	},
	is_cancelled: {
		type: Boolean,
		default: false
	},
	updated_at: {
		type: Number,
		default: Date.now()
	}
});

OrderSchema.methods.validateAndSave = function(){
	var order = this;
	request = _.pick(order, ['username', 'food_id']);
    return 	Foods.findById(request.food_id).then((food)=>{
		if(_.isEmpty(food)){
			return Promise.reject(`Food with id ${ request.food_id } not found.`);
		}
		order.food_name = food.name;
		return Members.find({username: request.username});
	}).then((member)=>{
		if(_.isEmpty(member)){
			return Promise.reject(`User with username ${ request.username } was not found!`);
		}
		order.user_fullname = member[0].name;
		return order.save().then((doc) =>{
			return doc;
		});
	});
}

OrderSchema.methods.toJSON = function(){
	order = this;
	var returnObject = order.toObject();
	return {
		id : returnObject._id,
		username : returnObject.username,
		user_full_name : returnObject.user_fullname,
		food_id: returnObject.food_id,
		food_name: returnObject.food_name,
		status: returnObject.is_cancelled ? 'Cancelled': 'Ordered',
		date: new Date(returnObject.updated_at).toLocaleDateString("en-us"),
		time: new Date(returnObject.updated_at).toLocaleTimeString("en-us", { hour: "2-digit", minute: "2-digit" })
	};
}


var Order = mongoose.model('Order', OrderSchema);

module.exports = Order;