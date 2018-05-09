var { Route } = require(global._dir + '/lib/routes');

Route.get('/', (request, response)=>{
	response.send('Hello');
});

//Foods
	Route.middleware('auth', 'admin').post('foods', 'FoodController.store');
	Route.middleware('auth').get('foods/:id', 'FoodController.get');
	Route.middleware('auth').get('foods', 'FoodController.get_all');
	Route.middleware('auth','admin').patch('foods/:id', 'FoodController.update');
	Route.middleware('auth','admin').delete('foods/:id', 'FoodController.delete');

//Member
	Route.post('members', 'MemberController.register');
	Route.get('members/:username', 'MemberController.exists');	
	Route.middleware('auth', 'admin').get('members/:id', 'MemberController.get');
	Route.middleware('auth', 'admin').get('members', 'MemberController.get_all');
	Route.post('members/login', 'MemberController.login');
	Route.middleware('auth').patch('members/logout', 'MemberController.logout');
	Route.middleware('auth', 'admin').patch('members/:username', 'MemberController.activate');
	Route.middleware('auth', 'admin').delete('members/:id', 'MemberController.delete');

//Order
	Route.middleware('auth', 'order').get('orders/check/', 'OrderController.check');
	Route.middleware('auth', 'order').post('orders', 'OrderController.store');
	Route.middleware('auth', 'admin').get('orders/:id', 'OrderController.get');
	Route.middleware('auth', 'admin').get('orders', 'OrderController.get_all');
	Route.middleware('auth').patch('orders/:id', 'OrderController.cancel');
	Route.middleware('auth', 'admin').delete('orders/:id', 'OrderController.delete');
	

module.exports = Route.routes;