exports = module.exports;

var Order = require(global._model + '/OrderModel');

exports.test = (req, res)=>{
	Order.findById('5af16f76871f624615564987').populate(['foods', 'users']).then((order)=>{

		console.log(order.users.name);
		console.log(order.foods.name);

		res.send('FOF');
	});
}