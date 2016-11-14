app.controller("newPollCtrl", function($scope, $rootScope, $http){

    $scope.newpoll = {};
    $scope.candidates = [];
    $scope.precincts = [];

    $scope.addNewCandidate = function() {
        var newItemNo = $scope.candidates.length+1;
        $scope.candidates.push({'id':'choice'+newItemNo});
    };

    $scope.removeCandidate = function() {
        var lastItem = $scope.candidates.length-1;
        $scope.candidates.splice(lastItem);
    };

    $scope.addNewPrecinct = function() {
        var newItemNo = $scope.precincts.length+1;
        $scope.precincts.push({'id':'choice'+newItemNo});
    };

    $scope.removePrecinct = function() {
        var lastItem = $scope.precincts.length-1;
        $scope.precincts.splice(lastItem);
    };

    $scope.updateProfile = function() {
        $http.post('server/newpoll.php?title=' + $scope.newpoll.title +
            '&description=' + $scope.newpoll.description +
            '&start_date=' + $scope.newpoll.datetime_start +
            '&end_date=' + $scope.newpoll.datetime_end +
            '&level=' + $scope.newpoll.election_level +
            '&first_name=' + $scope.candidate.firstname +
            '&last_name=' + $scope.candidate.lastname +
            '&partyname=' + $scope.candidate.partyname +
            '&designation=' + $scope.candidate.designation +
            '&biography=' + $scope.candidate.biography +
            '&website=' + $scope.candidate.website +
            '&zipcode_start=' + $scope.precinct.zipcode_start +
            '&zipcode_end=' + $rootScope.precinct.zipcode_end +
            '&manager=' + $rootScope.precinct.manager).success(function (poll) {

            if (poll.length == 4) {
                $scope.message = "Profile Successfully Updated";
            } else {
                $scope.message = "Not updated successfully";
            }


        });
    }

});