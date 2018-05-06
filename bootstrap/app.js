const run = () => {
	require('./variables.js');
	require(global._dir + '/server/server.js');
};

module.exports = { run };