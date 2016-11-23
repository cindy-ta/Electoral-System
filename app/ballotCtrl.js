app.controller("ballotCtrl", function(md5, $http, $scope, $rootScope, uuid2, $location, $cookieStore){
    $scope.isAdmin = false;
    $scope.isManager = false;
    $scope.message = "";
    $scope.allCandidates = [];
    $scope.isControlPoll = false;


    home_check1();


    function home_check1(){
        $http.post('server/checkProfile.php?user_name='+$rootScope.session.user_name+'&user_type='+$rootScope.session.access).success(function (updatedProfile) {
            if($rootScope.session.access == "Voter" || $rootScope.session.access == "Manager"){
                if(updatedProfile.length == 4){
                    $rootScope.isProfileUpdated = true;
                }
            }
        });
    };

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

    $http.post('server/filteredElections.php?user_name=' + $scope.session.user_name).success(function (allElections) {
        $scope.allElections = allElections;
        //$scope.message = allElections;

    })

    $scope.findAllElectionInfo = function(election) {
        //$scope.message = election[0].title;

        //$scope.message = election;
        //$scope.message = election.election_id;
        $scope.election_title = election[0].title;
        $scope.election_description = election[0].description;
        $scope.election_startDate = election[0].start_date;
        $scope.election_endDate = election[0].end_date;
        $scope.election_level = election[0].level;
        $scope.election_candidates = [];


        $http.post('server/getCandidateInfo.php?election_id=' + election[0].election_id).success(function (candidates) {
            //$scope.message = candidates[0].first_name;

            $scope.election_candidates = candidates;
            $scope.candidate = [];
            for (var i = 0; i < candidates.length; i++) {
                $scope.candidate[i] =
                    "<h3>" + candidates[i].first_name + " " + candidates[i].last_name + "</h3>"
                    + "<br><h4>" + candidates[i].party_name
                    + "<br>" + candidates[i].designation + "</h4>"
                    + "<br><h5>" + candidates[i].bio
                    + "<br>" + candidates[i].website_link + "</h5>";
            }

            $scope.people = [];
            for (var i = 0; i < candidates.length; i++) {
                $scope.people[i] = candidates[i];
            }

            //console.log($scope.people);
            //console.log($scope.people);

        })

        // NEED TO ADD A CHECK HERE TO MAKE SURE THAT THE ELECTION HAS ENDED

        $http.post('server/getResults.php?election_id=' + election.election_id).success(function (results) {

            //$scope.message = $scope.election_candidates[0].candidate_id;

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

        //$scope.message = $scope.selected_candidate; //gives me candidate_id




    }



});