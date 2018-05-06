exports = module.exports; 

var Food = require(global._model + '/FoodModel');

//POST new food to database
exports.store = (req, res) => {
	var newFood = new Food({
		name: req.body.name,
		price: req.body.price,
		image_url: req.body.imageUrl
	});
	newFood.save().then((doc) => {
		res.status(200).send(doc);
	}).catch((e) => {
		res.status(401).send({error_msg: e});
	});
}

//GET all foods
exports.get_all = (req, res) => {
	try {
		res.send(foods);
	} catch(e) {
		res.status(401).send({error_msg: e});
	}
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
		res.send(food);
	}).catch((e) => {
		res.status(401).send({error_msg: e});
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
			return res.status(404).send();
		}
		
	})
}

{
	app.patch('/todos/:id', authenticate, (req, res) => {
	  var id = req.params.id;
	  var body = _.pick(req.body, ['text', 'completed']);

	  if (!ObjectID.isValid(id)) {
	    return res.status(404).send();
	  }

	  if (_.isBoolean(body.completed) && body.completed) {
	    body.completedAt = new Date().getTime();
	  } else {
	    body.completed = false;
	    body.completedAt = null;
	  }

	  Todo.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true}).then((todo) => {
	    if (!todo) {
	      return res.status(404).send();
	    }

	    res.send({todo});
	  }).catch((e) => {
	    res.status(400).send();
	  })
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
