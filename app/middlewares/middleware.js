exports = module.exports;

var User = require(global._model + '/UserModel');

exports.auth = (request, response, next) => {
	var token = request.header('x-auth');
	  User.findByToken(token).then((member) => {
	    if (!member) {
	      return Promise.reject();
	    }
	    if (!member.is_active) {
	    	return response.status(401).send({
	    		msg: 'User not activated!'
	    	});
	    }
	    request.member = member;
	    request.token = token;
	    next();
	  }).catch((e) => {
	    response.status(401).send(e);
	  });
}

exports.admin = (request, response, next)=>{
	var token = request.header('x-auth');

	  User.findByToken(token).then((member) => {
	    if (!member) {
	      return Promise.reject();
	    }
	    if (member.is_admin) {
	    	return next();
	    }
	    return response.status(401).send({
	    	msg: 'unauthorized'
	    });
	  }).catch((e) => {
	    response.status(401).send(e);
	  });
}