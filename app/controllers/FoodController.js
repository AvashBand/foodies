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
		res.send(doc);
	}).catch((e) => {
		res.send(e);
	});
}

//GET all foods
exports.get_all = (req, res) => {
	try {
		res.send(foods);
	} catch(e) {
		res.send(e);
	}
}

app.get('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send({error_msg:`Foods not found`});
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send({error_msg:''});
  });
});

//GET a single food
exports.get = (req, res) => {
	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(400).send();
	}
	Food.findOne({_id: id}).then((food) => {
		if(!food){
			return res.status(400).send();
		}
	});
}

//Update a food
exports.update = (req, res) => {

}

//Delete a food
exports.delete = (req, res) => {

}