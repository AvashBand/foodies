var { Route } = require(global._dir + '/lib/routes');

Route.get('/', (request, response)=>{
	response.send('Hi');
});

Route.middleware('test').get('test', 'testController.test');

module.exports = Route.routes;