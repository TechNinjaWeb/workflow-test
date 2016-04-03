module.exports = ['$rootScope', '$state', 'User', function( root, state, User ){
    // Window Factory
    var app = window.app = {};
        app.services = {};
        app.services.User = User;
        app.services.state = state;
        app.controllers = {};
        app.root = root;
        
    root.user = User.get() || {};
}];