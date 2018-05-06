exports = module.exports; 

var Member = require(global._model + '/UserModel');

//POST new member to database (just copies and pasted/ has to be updated)
exports.store = (req, res) => {
	var body = _.pick(request.body, ['name', 'username', 'password', 'imageUrl', 'is_active', 'is_admin']);
	var newMember = new Member(body);
	  newMember.save().then(() => {
	    return user.generateAuthToken();
	  }).then((token) => {
	    res.header('x-auth', token).send(newMember);
	  }).catch((e) => {
	    res.status(400).send(e);
	  })
	};
}
//GET all members
exports.get_all = (req, res) => {
	try {
		res.send(members);
	} catch(e) {
		res.status(400).send({error_msg: e});
	}
}
//GET a single member
exports.get = (req, res) => {
	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(400).send({error_msg: `ID ${id} not valid.`});
	}
	User.findOne({_id: id}).then((member) => {
		if(!member){
			return res.status(400).send({error_msg: `Member with ${id} not found.`});
		}
		res.status(200).send(member);
	}).catch((e) => {
		res.status(400).send({error_msg: e});
	});
}
//Update a member
exports.update = (req, res) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['name', 'username', 'password', 'imageUrl', 'is_active']);
	if (!ObjectID.isValid(id)) {
	  return res.status(404).send({error_msg: `ID ${id} not valid.`});
	}
	Member.findOneAndUpdate({_id: id}, {$set: body}, {new: true}).then((member) => {
		if(!member){
			return res.status(404).send({error_msg: `member with ${id} not found.`});
		}
		res.status(200).send(member);
	}).catch((e) => {
		res.status(400).send({error_msg: e});
	});
}
//Delete a member
exports.delete = (req, res) => {
	var id = req.params.id;
	if (!ObjectID.isValid(id)) {
	  return res.status(404).send({error_msg: `ID ${id} not valid.`});
	}
	Member.findOneAndRemove({
		_id: id
	}).then((member) => {
		if(!member){
			return res.status(404).send({error_msg: `member with ${id} not found.`});
		}
		res.send(member);
	}).catch((e) => {
		res.status(400).send({error_msg: e});
	});
}
