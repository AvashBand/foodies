exports = module.exports; 
var _ = require('lodash');
const {ObjectID} = require('mongodb');

var Member = require(global._model + '/UserModel');

//Registers a new member

exports.register = (req, res) => {
	var body = _.pick(req.body, ['name', 'username', 'password']);
	var newMember = new Member(body);
	  newMember.save().then(() => {
	  	res.status(200).send({msg: 'Success'});
	  }).catch((e) => {
	    res.status(400).send({msg: e});
	  })
};

//GET all members 
exports.get_all = (req, res) => {
	Member.find().then((members) =>{
		var filtered_members = members.filter(member => !member.is_admin);
		if(!filtered_members){
			return res.status(404).send({msg: `User not found.`})
		}
		return res.status(200).send(filtered_members);
	}).catch((e)=>{
		res.status(400).send({msg: e});
	});
}

//GET a single member
exports.get = (req, res) => {

	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(404).send({msg: `ID ${id} not valid.`});
	}
	Member.findOne({_id: id}).then((member) => {
		if(!member){
			return res.status(404).send({msg: `Member with id ${id} not found.`});
		}
		res.status(200).send(member);
	}).catch((e) => {
		res.status(400).send({msg: e});
	});
}

//Check if the user already exists
exports.exists = (req, res) => {
	var username = req.params.username;
	Member.findOne({username: username}).then((member) => {
		if(!member){
			return res.send();
		}
		res.send(member);
	}).catch((e) => {
		res.status(400).send({msg: e});
	});
}

//User Login

exports.login = (req, res) => {
	var body = _.pick(req.body, ['username', 'password']);
  Member.findByCredentials(body.username, body.password).then((member) => {
		if(member.is_active){
			return member.generateAuthToken().then((token) => {
				res.send({
					x_auth: token,
					member_data: member
				});
			});
		}
    res.status(401).send({
			msg: "Your ID hasn't been approved by admin yet. Sorry for the inconvenience."
		});
  }).catch((e) => {

    res.status(400).send({msg: 'Incorrect username or password.'});

  });
};

//User Logout
exports.logout = (req, res) => {
  req.member.removeToken(req.token).then(() => {
    res.status(200).send({
    	msg : 'Successfully Logged Out'
    });
  }, (e) => {
    res.status(400).send({msg: e});
  });
};

//Activate a member
exports.activate = (req, res) => {
	var username = req.params.username;
	var body = req.body;

	Member.findOneAndUpdate({username: username}, {$set: body}, {new: true}).then((member) => {
		if(!member){
			return res.status(404).send({error_msg: `member with ${username} not found.`});
		}

		var msg = member.is_active? 'Activated' : 'Deactivated';
		res.status(200).send({
			msg: msg + " Successfulty!"
		});
	}).catch((e) => {
		res.status(400).send({msg: e});
	});
}

//Delete a member
exports.delete = (req, res) => {
	var id = req.params.id;
	if (!ObjectID.isValid(id)) {
	  return res.status(404).send({msg: `ID ${id} not valid.`});
	}
	Member.findOneAndRemove({
		_id: id,
	}).then((member) => {
		if(!member){
			return res.status(404).send({msg: `member with ${id} not found.`});
		}
		res.status(200).send({
			msg: 'successfully deleted!!'
		});
	}).catch((e) => {
		res.status(400).send({msg: e});
	});
}
