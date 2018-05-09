exports = module.exports

var User = require(global._model + '/UserModel')
var Order = require(global._model + '/OrderModel')

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
	    response.status(401).send({msg: 'Unauthenticated'});
	  });
}

exports.admin = (request, response, next)=>{
	
	var member = request.member;
	if (member.is_admin) {
		return next();
	}else{
		response.status(403).send({msg: 'Access Dined'});
	}

	// var token = request.header('x-auth');

	//   User.findByToken(token).then((member) => {
	//     if (!member) {
	//       return Promise.reject();
	//     }
	//     if (member.is_admin) {
	//     	return next();
	//     }
	//     return response.status(401).send({
	//     	msg: 'unauthorized'
	//     });
	//   }).catch((e) => {
	//     response.status(401).send(e);
	//   });
}

exports.order = (request, response, next)=>{
	var member = request.member;
	Order.findOrderByUser(member._id).then((doc) => {
		if(doc){
			return next();
		}
	}).catch((e)=>{
		if (request.url === '/orders/check/'){
			return response.status(200).send(e);
		}
		response.status(401).send(e);
	});

}