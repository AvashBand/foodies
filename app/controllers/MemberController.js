exports = module.exports; 
var _ = require('lodash');
const {ObjectID} = require('mongodb');

var Member = require(global._model + '/UserModel');

//Registers a new member

exports.register = (req, res) => {
	var body = _.pick(req.body, ['name', 'username', 'password']);
	var newMember = new Member(body);
	  newMember.save().then(() => {
	  	console.log('entering into gen');
	    return newMember.generateAuthToken();
	  }).then((token) => {
	    res.header('x-auth', token).send(newMember);
	  }).catch((e) => {
	    res.status(400).send{error_msg: e});
	  })
};

//GET all members 
exports.get_all = (req, res) => {
	Member.find().then((members) =>{
		var filtered_members = members.filter(member => !member.is_admin);
		if(!filtered_members){
			res.status(404).send({error_msg: `No members found.`})
		}
		res.status(200).send(filtered_members);
	}).catch((e)=>{
		res.status(400).send({error_msg: e});
	});
}

//GET a single member
exports.get = (req, res) => {

	var id = req.params.id;
	if(!ObjectID.isValid(id)){
		return res.status(404).send({error_msg: `ID ${id} not valid.`});
	}
	Member.findOne({_id: id}).then((member) => {
		if(!member){
			return res.status(404).send({error_msg: `Member with ${id} not found.`});
		}
		res.status(200).send(member);
	}).catch((e) => {
		res.status(400).send({error_msg: e});
	});

}

//User Login

exports.login = (req, res) => {
  var body = _.pick(req.body, ['username', 'password']);

  Member.findByCredentials(body.username, body.password).then((member) => {

    return member.generateAuthToken().then((token) => {
    	
      res.header('x-auth', token).send(member);

    });

  }).catch((e) => {

    res.status(400).send({error_msg: e});

  });
};

//User Logout
exports.logout = (req, res) => {
  req.member.removeToken(req.token).then(() => {
    res.status(200).send({
    	msg : 'Successfully Logged Out'
    });
  }, (e) => {
    res.status(400).send({error_msg: e});
  });
};

//Activate a member
exports.activate = (req, res) => {
	var id = req.params.id;
	var body = {
		is_active: true		
	};
	if (!ObjectID.isValid(id)) {
	  return res.status(404).send({error_msg: `ID ${id} not valid.`});
	}

	Member.findOneAndUpdate({_id: id}, {$set: body}, {new: true}).then((member) => {
		if(!member){
			return res.status(404).send({error_msg: `member with ${id} not found.`});
		}
		res.status(200).send({
			msg: 'activated successfully!'
		});
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
		res.status(200).send({
			msg: 'successfully deleted!!'
		});
	}).catch((e) => {
		res.status(400).send({error_msg: e});
	});
}
