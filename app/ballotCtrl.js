app.controller("ballotCtrl", function(md5, $http, $scope, $rootScope, uuid2, $location, $cookieStore){
    $scope.isAdmin = false;
    $scope.isManager = false;
    $scope.message = "";
    $scope.allCandidates = [];


    $scope.manager_check = function(){

        $scope.isManager = false;

        console.log("$rootScope.session.access= "+$rootScope.session.access);
        if($rootScope.session.access == "Manager")
        {
            $scope.isManager = true;
            console.log("true")
        }
        //console.log("$scope.isManager= "+$scope.isManager);
        console.log("false")

        return !($scope.isManager);
    };

    $http.post('server/allExistingElections.php?').success(function (allElections) {
        $scope.allElections = allElections;
    })

    $scope.findAllElectionInfo = function(election) {

        //$scope.message = election;
        //$scope.message = election.election_id;
        $scope.election_title = election.title;
        $scope.election_description = election.description;
        $scope.election_startDate = election.start_date;
        $scope.election_endDate = election.end_date;
        $scope.election_level = election.level;

        $http.post('server/getCandidateInfo.php?election_id=' + election.election_id).success(function (candidates) {
            //$scope.message = candidates[0].first_name;

            $scope.candidate = [];
            for (var i = 0; i < candidates.length; i++) {
                $scope.candidate[i] =
                    "<h3>" + candidates[i].first_name + " " + candidates[i].last_name + "</h3>"
                    + "<br><h4>" + candidates[i].party_name
                    + "<br>" + candidates[i].designation + "</h4>"
                    + "<br><h5>" + candidates[i].bio
                    + "<br>" + candidates[i].website + "</h5>";
            }

            console.log($scope.candidate)
/*
            $scope.candidate.candidate_name = candidates[0].first_name + ' ' + candidates[0].last_name;
            $scope.candidate.candidate_party = candidates[0].party_name;
            $scope.candidate.candidate_designation = candidates[0].designation;
            $scope.candidate.candidate_bio = candidates[0].bio;
            $scope.candidate.candidate_website = candidates[0].website;

           /* $scope.candidate_name = [];
            $scope.candidate_party = [];
            $scope.candidate_designation = [];
            $scope.candidate_bio = [];
            $scope.candidate_website = [];

            for ( var i = 0; i < candidates.length; i++) {
                $scope.candidate_name[i] = candidates[i].first_name + ' ' + candidates[i].last_name;
                $scope.candidate_party[i] = candidates[i].party_name;
                $scope.candidate_designation[i] = candidates[i].designation;
                $scope.candidate_bio[i] = candidates[i].bio;
                $scope.candidate_website[i] = candidates[i].website;
            }*/

        })

    }





    /*$scope.populateBallot = function(election) {
        //$scope.message = precinct_id.manager_id;

        $http.post('server/getElectionInfo.php?election_id='+$scope.election.election_id).success(function (election) {
            scope.message = $scope.election.election_id;
        });
    }*/

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