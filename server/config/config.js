var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  var config = require(global._dir + '/env.json');
  var envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}