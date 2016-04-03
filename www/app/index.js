/* Primary Variables */
var config = window.CONST = require('../constants.js'),
// Create App
app = window.angular.module(config.namespace, [
    'ui.router', 
    'ngResource',
    require('./modules/cache/cache.module.js').name, 
    require('./modules/user/user.module.js').name
])
.controller('MainController', require('./main.controller.js'))
.config(require('./routes.js'))
.run(require('./run.js'));

/* Bootstrap app.name to document object */
window.angular.bootstrap(document, [app.name]);
// Module Exports
module.exports = app;