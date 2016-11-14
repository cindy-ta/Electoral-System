app.controller("newPollCtrl", function($scope, $rootScope, $http, $location){

    $scope.message = "Hello";

    $scope.choices = [{id: 'choice1'}];

    $scope.addNewChoice = function() {
        var newItemNo = $scope.choices.length+1;
        $scope.choices.push({'id':'choice'+newItemNo});
    };

    $scope.removeChoice = function() {
        var lastItem = $scope.choices.length-1;
        $scope.choices.splice(lastItem);
    };

    $scope.createNewPoll = function() {


    };

});