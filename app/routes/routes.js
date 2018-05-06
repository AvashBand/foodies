var { Route } = require(global._dir + '/lib/routes');

Route.get('/', (request, response)=>{
	response.send({
		message: "dsjakdlasjda",
		name: 'dsadasdsada'
	});
});

Route.middleware('test').get('test', 'testController.test');

module.exports = Route.routes;

const express = require('express');






