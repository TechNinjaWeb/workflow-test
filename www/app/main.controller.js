module.exports = ['$scope', function(scope){
    var self = this;
    
    self.message = 'Main Controller Loaded';
    scope.message = self.message;
    
    console.log(scope.message);
}];