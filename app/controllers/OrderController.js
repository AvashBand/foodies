exports = module.exports; 

var Order = require(global._model + '/OrderModel');
var _ = require('lodash');
const {ObjectID} = require('mongodb');

//POST new order to database
exports.store = (req, res) => {
	var body = {};
	body.foods = req.body.food_id;
	body.users = req.member._id;
	var newOrder = new Order(body);

	newOrder.validateAndSave().then((doc) => {
		res.status(200).send(doc);
	}).catch((e) => {
		res.status(400).send({error_msg: e});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
	});
	
}
//GET all orders
exports.get_all = (req, res) => {
	Order.find().populate(['foods', 'users']).then((orders) => {
		if(!orders){
			return res.status(404).send({error_msg: `No orders available`});
		}
		res.status(200).send(orders);
			
	}).catch((e) => {
		res.status(400).send({error_msg: e});
	});
}

//GET a single order
exports.get = (req, res) => {
	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(404).send({error_msg: `ID ${id} not valid.`});
	}
	var is_cancelled = req.is_cancelled;
	Order.findOne({_id: id}).populate(['foods', 'users']).then((order) => {
		if(!order){
			return res.status(404).send({error_msg: `Order with ${id} not found.`});
		}
		res.status(200).send(order);
	}).catch((e) => {
		res.status(400).send({error_msg: e});
	});
}

//Cancel an order
exports.cancel = (req, res) => {
	var id = req.params.id;
	var body = {
		is_cancelled: true,
		updated_at: Date.now()
	};
	
	if (!ObjectID.isValid(id)) {
	  return res.status(404).send({error_msg: `ID ${id} not valid.`});
	}

	Order.findOneAndUpdate({_id: id}, {$set: body}, {new: true}).then((order) => {
		if(!order){
			return res.status(404).send({error_msg: `Order with ${id} not found.`});
		}
		res.status(200).send(order);
	}).catch((e) => {
		res.status(400).send({error_msg: e});
	});
}

//Delete an order
exports.delete = (req, res) => {
	var id = req.params.id;
	if (!ObjectID.isValid(id)) {
	  return res.status(404).send({error_msg: `ID ${id} not valid.`});
	}
	Order.findOneAndRemove({
		_id: id
	}).then((order) => {
		if(!order){
			return res.status(404).send({error_msg: `Order with ${id} not found.`});
		}
		res.status(200).send(order);
	}).catch((e) => {
		res.status(400).send({error_msg: e});
	});
}

exports.check = (req, res) => {
	res.status(200).send({
		msg: 'Not ordered yet'
	});
}