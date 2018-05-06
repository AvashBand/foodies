exports = module.exports;

var User = require(global._model + '/UserModel');

exports.auth = (request, response, next) => {

	var token = request.header('x-auth');

	  User.findByToken(token).then((user) => {
	    if (!user) {
	      return Promise.reject();
	    }
	    request.user = user;
	    request.token = token;
	    next();
	  }).catch((e) => {
	    res.status(401).send();
	  });
}