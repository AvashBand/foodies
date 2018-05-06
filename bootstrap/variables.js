//Global Variables
const _path_module = require('path');

global._dir = _path_module.dirname(require.main.filename);
global._app = global._dir + '/app';
global._model = global._app + '/models';