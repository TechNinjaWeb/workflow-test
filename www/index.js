/*
    Supporting Scripts
*/
(function() {
    require('jquery'),
    require('angular'),
    require('angular-resource'),
    require('angular-ui-router'),
    require('toastr'),
    window.Polymer = require('polymer-js'),
    window._config = require('./constants.js');
}());

(function(angular) {
    var orig = angular.module;
    angular.modules = [];
    angular.modules.select = function(query) {
        var cache = [],
            reg = new RegExp(query || '.*');
        for (var i = 0, l = this.length; i < l; i++) {
            var item = this[i];
            if (reg.test(item)) {
                cache.push(item);
            }
        }
        return cache;
    };
    angular.module = function() {
        var args = Array.prototype.slice.call(arguments);
        if (arguments.length > 1) {
            angular.modules.push(arguments[0]);
        }
        return orig.apply(null, args);
    };
})(window.angular);

require('./components'),
require('./app');
console.log("Core Dependencies Loaded!");
// Export Module
module.exports = window._config.namespace;