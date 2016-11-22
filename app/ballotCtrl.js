app.controller("ballotCtrl", function(md5, $http, $scope, $rootScope, uuid2, $location, $cookieStore){
    $scope.isAdmin = false;
    $scope.isManager = false;
    $scope.message = "";
    $scope.allCandidates = [];
    $scope.isControlPoll = false;

    $scope.manager_check = function(){

        $scope.isManager = false;

        //console.log("$rootScope.session.access= "+$rootScope.session.access);
        if($rootScope.session.access == "Manager")
        {
            $scope.isManager = true;
            //console.log("true")
        }
        //console.log("$scope.isManager= "+$scope.isManager);
        //console.log("false")

        return !($scope.isManager);
    };

    $http.post('server/allExistingElections.php?').success(function (allElections) {
        $scope.allElections = allElections;
        //$scope.message = $scope.allElections[0];

        $scope.dashboard_elections = [];
        for (var i = 0; i < $scope.allElections.length; i++) {
            $scope.dashboard_elections[i] =
                "<h2>" + $scope.allElections[i].title + "</h2>"
                + "<br><h3>" + $scope.allElections[i].start_date + " to "+ $scope.allElections[i].end_date + "</h3>"
                + "<br><h4>Election Description: " + $scope.allElections[i].description+ "</h4>"
                + "<br><h5>Election Level: " + $scope.allElections[i].level + "</h5>";
        }
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

            $scope.people = [];
            for (var i = 0; i < candidates.length; i++) {
                $scope.people[i] = candidates[i];
            }

            //console.log($scope.people);
            //console.log($scope.people);

        })

    }

    $scope.controlPoll = function() {

        if ($scope.isControlPoll == true) {
            $scope.isControlPoll = false;
            //console.log("False");
        }

        else {
            $scope.isControlPoll = true;
            //console.log("True");
        }

    }

    $scope.checkIfClicked = function() {
        if ($scope.isControlPoll == true) {
            //console.log("clicked = true");
            return true;
        }
        else {
            //console.log("clicked = false");
            return false;
        }


    }

    $scope.castVote = function() {

        $scope.message = $scope.selected_candidate; //gives me candidate_id




    }



});