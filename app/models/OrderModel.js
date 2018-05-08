const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Members = require(global._model + '/UserModel');
var Foods = require(global._model + '/FoodModel');
var _ = require('lodash');

var OrderSchema = new Schema({
	users: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'User',
	},
	foods:{
		type: Schema.Types.ObjectId,
		required: true,
		ref: 'Food'
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
	request = _.pick(order, ['users', 'foods']);
    return 	Foods.findById(request.foods).then((food)=>{
		if(_.isEmpty(food)){
			return Promise.reject(`Food with id ${ request.foods } not found.`);
		}
		order.food_name = food.name;
		return Members.find({_id: request.users});
	}).then((member)=>{
		if(_.isEmpty(member)){
			return Promise.reject(`User with username ${ request.users } was not found!`);
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
		username : returnObject.users.username,
		user_fullname : returnObject.users.name,
		food_id: returnObject.foods._id,
		food_name: returnObject.foods.name,
		status: returnObject.is_cancelled ? 'Cancelled': 'Ordered',
		date: new Date(returnObject.updated_at).toLocaleDateString("en-us"),
		time: new Date(returnObject.updated_at).toLocaleTimeString("en-us", { hour: "2-digit", minute: "2-digit" })
	};
}

OrderSchema.statics.findOrderByUser = function(user_id){
	var order = this;
	var startTime = new Date().toDateString() + ' ' + process.env.ORDER_START;
	var endTime = new Date().toDateString() + ' ' + process.env.ORDER_END;

	startTime = Date.parse(startTime);
	endTime = Date.parse(endTime);
	
	return order.find({is_cancelled : false, users : user_id}).where('updated_at').gt(startTime).lt(endTime).populate(['users', 'foods']).exec().then((orders)=>{
		if(!_.isEmpty(orders)){
			return Promise.reject({
				msg : "Already Ordered",
				order: orders
			});
		}
		return true;
		
	});
};

var Order = mongoose.model('Order', OrderSchema);

module.exports = Order;