app.controller("newPollCtrl", function($scope, $rootScope, $http){

    $scope.message = "";
    $scope.newpoll = {};
    $scope.candidates = [];
    $scope.existingCandidates = [];
    $scope.precincts = [];

    $scope.newCandidate = [];
    $scope.newPrecinct = [];
    $scope.newLink = [];

    $scope.temp;

    $scope.addNewCandidate = function() {
        var newItemNo = $scope.candidates.length+1;
        $scope.candidates.push({'id':'candidate'+newItemNo});
    };

    $scope.removeCandidate = function() {
        var lastItem = $scope.candidates.length-1;
        $scope.candidates.splice(lastItem);
    };

    $scope.addNewExistingCandidate = function() {
        var newItemNo = $scope.existingCandidates.length+1;
        $scope.existingCandidates.push({'id':'existingCandidate'+newItemNo});
    };

    $scope.removeExistingCandidate = function() {
        var lastItem = $scope.existingCandidates.length-1;
        $scope.existingCandidates.splice(lastItem);
    };

    $scope.addNewPrecinct = function() {
        var newItemNo = $scope.precincts.length+1;
        $scope.precincts.push({'id':'manager'+newItemNo});
    };

    $scope.removePrecinct = function() {
        var lastItem = $scope.precincts.length-1;
        $scope.precincts.splice(lastItem);
    };

    $http.post('server/allExistingManagers.php?').success(function (managers) {
        $scope.allManagers = managers;
    });

    $http.post('server/allExistingCandidates.php?').success(function (candidates) {
        $scope.allCandidates = candidates;
    });

    $http.post('server/allExistingPrecincts.php?').success(function (precincts) {
        $scope.allPrecincts = precincts;
    });

    $scope.findAssignedManager = function(precinct_id) {
        //$scope.message = precinct_id.manager_id;

        $http.post('server/findAssignedManager.php?manager_id=' + precinct_id.manager_id).success(function (manager) {
            //$scope.message = manager.first_name + ' ' + manager.last_name;
            $scope.assigned_manager = manager.first_name + ' ' + manager.last_name;
        });
    }

    $scope.savePrecincts = function() {

        // TO DO

    }


    $scope.createNewPoll = function() {

/*
        // Election info
        var title = $scope.newpoll.title;
        var description = $scope.newpoll.description;
        var start_date = $scope.newpoll.datetime_start;
        var end_date = $scope.newpoll.datetime_end;
        var level = $scope.newpoll.election_level;
*/


/*      // Existing Candidate Info example
        var existingcandidateID = [];
        var existingfirstnames = [];
        var existinglastnames = [];
        var existingpartyname = [];
        var existingdesignation = [];
        var existingbio = [];
        var existingwebsite = [];


        for (var i = 0; i < $scope.existingCandidates.length; i++) {
            existingcandidateID[i] = $scope.existingCandidates[i].candidate.candidate_id;
            existingfirstnames[i] = $scope.existingCandidates[i].candidate.first_name;
            existinglastnames[i] = $scope.existingCandidates[i].candidate.last_name;
            existingpartyname[i] = $scope.existingCandidates[i].candidate.party_name;
            existingdesignation[i] = $scope.existingCandidates[i].candidate.designation;
            existingbio[i] = $scope.existingCandidates[i].candidate.bio;
            existingwebsite[i] = $scope.existingCandidates[i].candidate.website_link;
        }

        // extract specific value example
        $scope.message = existingfirstnames[1]; //change index values to extract diff values

*/
       // Candidate info - for first candidate

/*      NEED same for loop idea

        var candidateFirstName =  $scope.candidates[0].firstname;
        var lastname1 = $scope.candidates[0].lastname;
        var partyname1 = $scope.candidates[0].partyname;
        var designation1 = $scope.candidates[0].designation;
        var biography1 = $scope.candidates[0].biography;
        var website1 = $scope.candidates[0].website;

        // precinct info - for first precinct
        var zipcodestart1 = $scope.precincts[0].zipcode_start;
        var zipcodeend1 = $scope.precincts[0].zipcode_end;
        var manager = $scope.precincts[0].manager;*/

        for (var i = 0; i < $scope.candidates.length; i++) {
            $http.post('server/createCandidate.php?first_name=' + $scope.candidates[i].firstname + "&last_name=" + $scope.candidates[i].lastname + "&party_name=" + $scope.candidates[i].partyname + "&designation=" + $scope.candidates[i].designation + "&bio=" + $scope.candidates[i].biography + "&website_link=" + $scope.candidates[i].website).success(function (candidate_id) {
                //$scope.message = "Email has been resent.";
                if((candidate_id).length == 10)
                {
                    $scope.message = "Candidate creation failed..."

                }else {
                    $scope.temp = candidate_id;
                }
            });

            $scope.newCandidate[i] = $scope.temp;
        }

        $scope.temp = 0;
        for (var i = 0; i < $scope.precincts.length; i++) {
            $http.post('server/createPrecinct.php?zipcode_start=' + $scope.precincts[i].zipcode_start + "&zipcode_end=" + $scope.precincts[i].zipcode_end + "&manager_id=" + $scope.precincts[i].manager.manager_id ).success(function (precinct_id) {
                //$scope.message = "Email has been resent.";
                if((precinct_id).length == 10)
                {
                    $scope.message = "Precinct creation failed..."

                }else {
                    $scope.temp = precinct_id;
                }
            });

            $scope.newPrecinct[i] = $scope.temp;
        }

        var candidatesToSave = [];
        for (var i = 0; i < $scope.newCandidate.length; i++) {
            candidatesToSave[i] = $scope.newCandidate[i];
        }
        var nextIndex = $scope.newCandidate.length;
        for (var i = 0; i < $scope.existingCandidates.length; i++)
        {
            candidatesToSave[i+nextIndex] = $scope.existingCandidates[i];
        }

        var newElection_id = 1;

        $http.post('server/createElection.php?title=' + $scope.newpoll.title + "&description=" + $scope.newpoll.description + "&start_date=" + $scope.newpoll.datetime_start + "&end_date=" + $scope.newpoll.datetime_end + "&level=" + $scope.newpoll.election_level ).success(function (election_id) {
            //$scope.message = "Email has been resent.";
            if((election_id).length == 10)
            {
                $scope.message = "Election creation failed..."

            }else {
                //newElection_id = election_id;
                $scope.temp = election_id;
            }
        });

        newElection_id = $scope.temp;
        console.log($scope.newPrecinct.length);

       // console.log(localVar.length);




        for (var i = 0; i < $scope.newPrecinct.length; i++) {
            console.log("electionID = " + newElection_id);
            $http.post('server/createLink.php?election_id=' + newElection_id + "&sublevel=" + $scope.newPrecinct[i] ).success(function (link_id) {
                //$scope.message = "Email has been resent.";
                if((link_id).length == 10)
                {
                    $scope.message = "Link creation failed..."

                }else {
                    $scope.temp = link_id;
                }
            });

            $scope.newLink[i] = $scope.temp;
        }

        //var num = 0;
        $scope.temp = 0;
        for (var i = 0; i < $scope.newLink.length; i++) {
            for (var j = 0; j < candidatesToSave.length; j++) {
                $http.post('server/createLinkCandidateRelation.php?election_id=' + newElection_id + "&link_id=" + $scope.newLink[i] + "&candidate_id=" + candidatesToSave[j]).success(function (msg) {
                    //$scope.message = "Email has been resent.";
                    if ((msg).length == 10) {
                        $scope.message = "Link Relation creation failed..."

                    } else {
                        //num++;

                        $scope.temp++;
                    }
                });
            }
        }

        if($scope.temp = (($scope.newLink.length)*(candidatesToSave.length)))
        {
            $scope.message = "Election created Successfully..."
        }
    }

});