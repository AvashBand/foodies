exports = module.exports;

var { sample } = require(global._app + '/models/sample');

 exports.hello_world = (req, res) => {
	res.send('this shit is controller');
}