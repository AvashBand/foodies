var { Route } = require(global._dir + '/lib/routes');

Route.get('/', (request, response)=>{
	response.send('Hello');
});

//Foods
	// Route.post('foods', 'FoodController.store');
	// Route.get('foods/:id', 'FoodController.get');
	// Route.get('foods', 'FoodController.get_all');
	// Route.patch('foods/:id', 'FoodController.update');
	// Route.delete('foods/:id', 'FoodController.delete');

//Member
	Route.post('members', 'MemberController.register');
	Route.middleware('auth', 'admin').get('members/:id', 'MemberController.get');
	Route.middleware('auth', 'admin').get('members', 'MemberController.get_all');
	Route.post('members/login', 'MemberController.login');
	Route.middleware('auth').post('members/logout', 'MemberController.logout');
	Route.middleware('auth', 'admin').patch('members/:id', 'MemberController.activate');
	Route.middleware('auth', 'admin').delete('members/:id', 'MemberController.delete');

//Order
	// Route.post('orders', 'OrderController.store');
	// Route.get('orders/:id', 'OrderController.get');
	// Route.get('orders', 'OrderController.get_all');
	// Route.patch('orders/:id', 'OrderController.update');
	// Route.delete('orders/:id', 'OrderController.delete');

module.exports = Route.routes;