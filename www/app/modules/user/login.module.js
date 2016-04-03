var app = window.angular.module( window.CONST.namespace + window.CONST.sp + 'login.module', ['ngResource']);

app.service('LoginService', ['$rootScope', 'LoginResource', function( rootScope, resource ){
    var Login = {};
    // Login Function
    Login.login = function( data ) {
        var user = resource.get( data ).$promise;
        return new Promise(function(res, rej){
            // Resolve or Reject The User
            user.then(function( u ){ return u.error || u.err || u.message 
                ? rootScope.$broadcast( 'login:error', u )
                : rootScope.$broadcast( 'login:success', u );
            });
            // Return Resolved User Data to Caller;
            user.then(function( u ){ return u.error || u.err || u.message ? rej( u ) : res( u); });
        });
    };
    Login.logout = function() {
        return new Promise(function(res, rej){
            res( {message: "Not Implemented Yet Ln: 19 of Login.Service.js" } );
        });
    };
    return Login;
}])

app.service('LoginResource', ['$resource', function($resource) {
    return window.resource = $resource('https://trenderzhub-techninja.c9users.io/login', {}, 
    {
        getId: {
            method: 'GET',
            isArray: true,
            name: '@id'
        }
    });
}]);
// Export App
module.exports = app;