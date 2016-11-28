app.controller("ballotCtrl", function(md5, $http, $scope, $rootScope, uuid2, $location, $cookieStore){
    $scope.isAdmin = false;
    $scope.isManager = false;
    $scope.message = "";
    $scope.allCandidates = [];
    $scope.isPollEnabled = false;
    $scope.election_candidates = [];
    $scope.selectedElection = [];
    $scope.hasVoted = false;
    $scope.voterAge = 0;
    $scope.info = "";
    $scope.hasEndDatePassed = false;
    $scope.hasSelectedElection = false;

    $scope.statusChecked = false;
    $scope.ageFetched = false;
    $scope.duplicateVoteChecked = false;

    getVoterAge();
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

    function getVoterAge()
    {
        if($rootScope.session.access == "Voter") {
            $http.post('server/getVoterAge.php?voter_id=' + $rootScope.session.user_name).success(function (data) {
                if(data.length < 10)
                {
                    $scope.voterAge = data;
                }
                $scope.ageFetched = true;
                showInfo();
            });
        }
    };

    function checkIfVoted() {
        console.log("checking if voted...");
        if ($rootScope.session.access == "Voter") {
            $http.post('server/checkIfVoted.php?voter_id=' + $scope.session.user_name + "&election_id=" + $scope.selectedElection[0].election_id).success(function (voterStatus) {
                if (voterStatus.length == 1) {
                    $scope.hasVoted = false; // can still vote
                    //console.log("can vote");
                }
                else {
                    $scope.hasVoted = true; // unable to vote (has already casted vote)
                    //console.log("cannot vote");
                }

                $scope.duplicateVoteChecked = true;
                showInfo();
            })
        }
        else {
            $scope.hasVoted = true; // unable to vote (managers)
            //console.log("cannot vote");
        }

    }

    $scope.showVoting = function() {
        if ($rootScope.session.access == "Voter") {
            if ($scope.isPollEnabled && $scope.voterAge > 18 && !$scope.hasVoted) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }


    // new changes
    function getPollStatus() {
        $http.post('server/getPollStatus.php?election_id=' + $scope.selectedElection[0].election_id +
            "&user_type=" + $scope.session.access +
            "&user_name=" + $scope.session.user_name).success(function (msg) {


            if (msg.length >= 10) {
                if (msg == "1111111111") {
                    $scope.message = "Error finding precinct for this voter";
                } else if (msg == "2222222222") {
                    $scope.message = "Error finding zipcode for this voter"
                } else if (msg == "3333333333") {
                    $scope.message = "Error finding precinct for this manager"
                }

                $scope.isPollEnabled = false;
            } else {
                if (msg == 0) {
                    $scope.isPollEnabled = false;
                } else {
                    $scope.isPollEnabled = true;
                }
            }

            $scope.statusChecked = true;
            showInfo();

        });


    }

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

        $scope.info = "";

        $scope.hasSelectedElection = true;
        $scope.selectedElection = election;

        $scope.statusChecked = false;
        $scope.duplicateVoteChecked = false;

        getPollStatus();
        checkIfVoted();
        checkEndDate();

        //$scope.message = election;
        //$scope.message = election.election_id;
        $scope.election_info = "<font size='5.5'><b>" + election[0].title + "</b></font>"
            + "<br><h4>" + election[0].start_date.split(" ")[0] + " to " + election[0].end_date.split(" ")[0]
            + "<br><b>Election Description: </b>" + election[0].description
            + "<br><b>Election Level: </b>" + election[0].level + "</h4>";



        $http.post('server/getCandidateInfo.php?election_id=' + election[0].election_id + '&link_id=' + election[1]).success(function (candidates) {
            //$scope.message = candidates[0].first_name;

            $scope.candidate = [];
            for (var i = 0; i < candidates.length; i++) {
                $scope.candidate[i] =
                    "<font size='5.5'><b>" + candidates[i].first_name + " " + candidates[i].last_name + "</font></b>"
                    + "<font size='4'>  (" + candidates[i].party_name + ")</font>"
                    + "<br><p><b>Candidate's Biography: </b>" + candidates[i].bio
                    + "<br><b>Candidate's Website: </b>" + candidates[i].website_link + "</p><br>";
            }

            $scope.people = [];
            for (var i = 0; i < candidates.length; i++) {
                $scope.people[i] = candidates[i];
            }

            //console.log($scope.people);
            //console.log($scope.people);

        })

        // NEED TO ADD A CHECK HERE TO MAKE SURE THAT THE ELECTION HAS ENDED

        $http.post('server/getResults.php?election_id=' + election[0].election_id + '&link_id=' + election[1]).success(function (results) {

            //$scope.message = results[0].candidate_id;
            //$scope.message = results[0].votes;

            //$scope.message = results.length;
            //$scope.message = results[0];
            $scope.candidate_results = [];

            // gather all candidates
            for ( var i = 0; i < results.length; i++ ) {
                $scope.candidate_results[results[i][0].candidate_id] = parseInt(results[i][0].votes, 10);
            }

            //$scope.message = $scope.candidate_results;

            // calculate most votes
            var maxResult = 0;
            var winner = "";

            for ( var i = 0 ; i < $scope.candidate_results.length; i++) {
                if (parseInt($scope.candidate_results[i], 10) > parseInt(maxResult, 10) && $scope.candidate_results[i] != null) {
                    maxResult = $scope.candidate_results[i]; // highest number of votes
                    winner = i; // winner's candidate_id
                }
            }

            // find winning candidate
            for ( var i = 0; i < results.length; i++) {
                if (results[i][1].candidate_id == winner) {
                    $scope.print_winner = "The winner of this precinct election is " + results[i][1].first_name + " " + results[i][1].last_name + " with a total of " + maxResult + " votes";
                }
            }


            $scope.print_results = [];

            for ( var i = 0; i < results.length; i++) {
                $scope.print_results[i] = results[i][1].first_name + " " + results[i][1].last_name + " finished with a total of " + $scope.candidate_results[results[i][0].candidate_id] + " votes ";
            }


        })

    }

    $scope.changePollStatus = function() {

        var toEnable = 1;
        if ($scope.isPollEnabled == true) {
            toEnable = 0;
        }

        $http.post('server/updatePollStatus.php?election_id=' + $scope.selectedElection[0].election_id +
                                                "&toEnable=" + toEnable +
                                                "&manager_id=" + $scope.session.user_name).success(function (msg) {
            //$scope.message = msg;
            if(msg.length >= 10)
            {
                if(msg == "9999999999")
                {
                    $scope.message = "Poll Status not updated.";
                }else
                {
                    $scope.message = "Precinct associated with this manager not found.";
                }
            }else
            {
                if($scope.isPollEnabled) {
                    $scope.isPollEnabled = false;
                }else
                {
                    $scope.isPollEnabled = true;
                }
            }
        });

    }

    $scope.castVote = function() {

        //$scope.message = $scope.selected_candidate; //gives me candidate_id

        $http.post('server/castVote.php?voter_id=' + $scope.session.user_name + "&election_id=" + $scope.selectedElection[0].election_id + "&candidate_id=" + $scope.selected_candidate + "&link_id=" + $scope.selectedElection[1]).success(function (msg) {
            if(msg.length == 10)
            {
                if(msg == 1111111111)
                {
                    $scope.message = "No such link found";
                }else if(msg == 2222222222)
                {
                    $scope.message = "Vote saving error";
                }else
                {
                    $scope.message = "Error saving in the election voter relations";
                }
            }else
            {
                $scope.message = "Vote successfully saved!!"
                checkIfVoted();
            }

        })


    }



    
     function checkEndDate() {
        $http.post('server/getElectionInfo.php?election_id=' + $scope.selectedElection[0].election_id).success(function (data) {

            if(data.election_id > 0)
            {
                var endDate = new Date(data.end_date.split(" ")[0]);

                if(endDate > (new Date()))
                {

                    $scope.hasEndDatePassed = false;
                }else
                {

                    $scope.hasEndDatePassed = true;
                }
            }


        });
    }


    function showInfo()
    {


        if($scope.duplicateVoteChecked && $scope.statusChecked && $scope.ageFetched)
        {
            if($scope.voterAge < 18)
            {
                $scope.info = "Restricted to vote because age is less than 18 years";
            }else if(!$scope.isPollEnabled)
            {
                $scope.info = "Poll is closed. Can't vote.";
            }else if($scope.hasVoted)
            {
                $scope.info = "Already voted. Can't vote again."
            }

        }

    }

});