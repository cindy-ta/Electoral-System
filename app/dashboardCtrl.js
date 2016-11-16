app.controller("dashboardCtrl", function($scope, $rootScope, $http, $location){

    $scope.message = "Hello";

    $http.post('server/populateDashboard.php?').success(function (electionID) {

        console.log("Election Info: " + electionID);

        $scope.election_title = electionID.title;
        $scope.election_startDate = electionID.start_date;
        $scope.election_endDate = electionID.end_date;
        $scope.election_description = electionID.description;
    });



    $scope.redirectToBallotPage = function() {
        $location.path('/ballot');
    };


});