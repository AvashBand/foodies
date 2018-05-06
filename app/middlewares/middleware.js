exports = module.exports;

exports.test = (request, response, next) =>{
	console.log('This is a middleware');
	next();
}