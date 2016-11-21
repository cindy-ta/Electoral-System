app.controller("ballotCtrl", function(md5, $http, $scope, $rootScope, uuid2, $location, $cookieStore){
    $scope.isAdmin = false;
    $scope.isManager = false;
    $scope.message = "";


    $scope.manager_check = function(){

        $scope.isManager = false;

        if($scope.login.user_type == "Manager")
        {
            $scope.isManager = true;
            console.log("true")
        }
        console.log("false")

        return !($scope.isManager);
    };

    $http.post('server/allExistingElections.php?').success(function (allElections) {
        $scope.allElections = allElections;
    })

/*    $http.post('server/getElectionInfo.php?').success(function (electionID) {

        console.log("Election Info: ??" + electionID);
        //$scope.message = electionID.length;

        $scope.election_title = electionID[0].title;
        $scope.election_startDate = electionID[0].start_date;
        $scope.election_endDate = electionID[0].end_date;
        $scope.election_description = electionID[0].description;

        $scope.message = electionID[1].candidate_id;
    }*/



});