module.exports = ['$stateProvider', '$urlRouterProvider', function(s, r){
    s.state('index', {
        abstract: true,
        views: {
            'body@': {
                template: '<div data-ui-view="index"></div>',
                controller: 'MainController as main'
            }
        }
    })
    .state('index.home', {
        url: '/',
        views: {
            'index@index': {
                templateUrl: 'app/html/tmp.html'
            }
        }
    });
    
    r.otherwise('/');
}];