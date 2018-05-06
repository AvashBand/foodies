exports = module.exports; 

var Food = require(global._model + '/FoodModel');

//POST new food to database
exports.store = (req, res) => {
	var body = _.pick(req.body, ['name', 'price', 'image_url']);
	var newFood = new Food(body);
	newFood.save().then((doc) => {
		res.status(200).send(doc);
	}).catch((e) => {
		res.status(400).send({error_msg: e});
	});
}
//GET all foods
exports.get_all = (req, res) => {
	Food.find().then((foods) => {
		if(!foods){
			return res.status(400).send({error_msg: `No foods available`});
		}
		res.status(200).send(foods);
	}).catch((e) => {
		res.status(400).send({error_msg: e});
	});
}
//GET a single food
exports.get = (req, res) => {
	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(400).send({error_msg: `ID ${id} not valid.`});
	}
	Food.findOne({_id: id}).then((food) => {
		if(!food){
			return res.status(400).send({error_msg: `Food with ${id} not found.`});
		}
		res.status(200).send(food);
	}).catch((e) => {
		res.status(400).send({error_msg: e});
	});
}
//Update a food
exports.update = (req, res) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['name', 'price', 'imageUrl']);
	if (!ObjectID.isValid(id)) {
	  return res.status(404).send({error_msg: `ID ${id} not valid.`});
	}
	Food.findOneAndUpdate({_id: id}, {$set: body}, {new: true}).then((food) => {
		if(!food){
			return res.status(404).send({error_msg: `Food with ${id} not found.`});
		}
		res.status(200).send(food);
	}).catch((e) => {
		res.status(400).send({error_msg: e});
	});
}
//Delete a food
exports.delete = (req, res) => {
	var id = req.params.id;
	if (!ObjectID.isValid(id)) {
	  return res.status(404).send({error_msg: `ID ${id} not valid.`});
	}
	Food.findOneAndRemove({
		_id: id
	}).then((food) => {
		if(!food){
			return res.status(404).send({error_msg: `Food with ${id} not found.`});
		}
		res.send(food);
	}).catch((e) => {
		res.status(400).send({error_msg: e});
	});
}
