var express = require('express');
var router = express.Router();

function Router(routes){
	if(routes){
		routes.forEach((route)=>{
			switch(route.request){
				case 'get':
					router.get(route.url, route.middlewares, route.method);	
					break;
				case 'post':
					router.post(route.url, route.middlewares, route.method);	
					break;
				case 'put':
					router.put(route.url, route.middlewares, route.method);	
					break;
				case 'patch':
					router.patch(route.url, route.middlewares, route.method);	
					break;
				case 'delete':
					router.delete(route.url, route.middlewares, route.method);	
					break;
			}
		});
	}
	return router;
}

var Route = {

	routes : [],

	temp_middleware: [],

	add : function (request, url, method) {
		
		var main_method = this.get_method(method);

		var route = {
			request: request,
			url: (url.indexOf('/') != 0) ?  '/' + url : url,
			middlewares: this.temp_middleware,
			method: main_method
		}
		this.temp_middleware = [];
		this.routes.push(route);
		return this.routes;

	},

	middleware: function(middleware){
		var req_middlewares = arguments;
		var middlewares = require(global._dir + '/app/middlewares/middleware');
		Object.keys(req_middlewares).map((key)=>{
			var middleware = req_middlewares[key];
			this.temp_middleware.push(eval('middlewares.' + middleware));
		});
		return this;
	},

	get_method: function(method){
		if(typeof method !== 'string'){
			return method;
		}

		var controller_name = method.slice(0, method.indexOf('.'));
		var method_name = method.slice(method.indexOf('.'), method.length);
		var controller = require(global._dir + '/app/controllers/' + controller_name);
		return eval('controller' + method_name);
	},

	get: function(url, method){
		return this.add('get', url, method);
	},

	post: function(url, method){
		return this.add('post', url, method);
	},

	put: function(url, method){
		return this.add('put', url, method);
	},

	patch: function(url, method){
		return this.add('patch', url, method);
	},

	delete: function(url, method){
		return this.add('delete', url, method);
	}
}

module.exports = {Route, Router};