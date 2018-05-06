var { Route } = require(global._dir + '/lib/routes');

Route.post('/', (request, response)=>{
	var User = require(global._model + '/UserModel');
	var user = new User({
		name : request.body.name,
		username: request.body.username,
		password: request.body.password,
	});
	user.save().then(()=>{
		response.send('sucessfully created');
	}).catch((e)=>{
		response.send(e);
	});

});

/*//Foods
	Route.post('foods', 'FoodController.store');
	Route.get('foods/:id', 'FoodController.get');
	Route.get('foods', 'FoodController.get_all');
	Route.patch('foods/:id', 'FoodController.update');
	Route.delete('foods/:id', 'FoodController.delete');

//Member
	Route.post('members', 'MemberController.store');
	Route.get('members/:id', 'MemberController.get');
	Route.get('members', 'MemberController.get_all');
	Route.patch('members/:id', 'MemberController.update');
	Route.delete('members/:id', 'MemberController.delete');

//Order
	Route.post('orders', 'OrderController.store');
	Route.get('orders/:id', 'OrderController.get');
	Route.get('orders', 'OrderController.get_all');
	Route.patch('orders/:id', 'OrderController.update');
	Route.delete('orders/:id', 'OrderController.delete');
*/
module.exports = Route.routes;

const express = require('express');






