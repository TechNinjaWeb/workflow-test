/*
    Supporting Scripts
*/
function init() {
    function validateInit(){
        return window.Polymer && window.angular ? true : false;    
    }
    
    return new Promise(function(res, rej){
        require('jquery'),
        require('angular'),
        require('angular-resource'),
        require('angular-ui-router'),
        require('toastr'),
        window.Polymer = require('polymer-js'),
        window._config = require('./constants.js');
        
        validateInit() ? res(true) : init();
    });
}

// init().then(function(){
//     (function(angular) {
//         var orig = angular.module;
//         angular.modules = [];
//         angular.modules.select = function(query) {
//             var cache = [],
//                 reg = new RegExp(query || '.*');
//             for (var i = 0, l = this.length; i < l; i++) {
//                 var item = this[i];
//                 if (reg.test(item)) {
//                     cache.push(item);
//                 }
//             }
//             return cache;
//         };
//         angular.module = function() {
//             var args = Array.prototype.slice.call(arguments);
//             if (arguments.length > 1) {
//                 angular.modules.push(arguments[0]);
//             }
//             return orig.apply(null, args);
//         };
//     })(window.angular);
    
// }).then(function(){
//     require('./components'),
//     require('./app');
//     console.log("Core Dependencies Loaded!");
// });
(function(){ window._config = require('./constants.js'); }());
// Export Module
module.exports = window._config.namespace;