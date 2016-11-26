app.controller("newPollCtrl", function($scope, $rootScope, $http){

    $scope.message = "";
    $scope.validDate = false;
    $scope.newpoll = {};
    $scope.precincts = [];
    $scope.linkCandidates = [];
    $scope.allStates = [];
    $scope.allCounties = [];


    $scope.stateSelected = false;
    $scope.countySelected = false;
    $scope.precinctSelected = false;


    $scope.temp;
    $scope.reliable = false;

    $scope.newElection_id = 1;

    $scope.addNewCandidate = function(linkCandidate) {

        var newItemNo = linkCandidate.candidates.length+1;
        linkCandidate.candidates.push({'id':'candidate'+newItemNo});

        // var len = $scope.linkCandidates.length;
        // var newItemNo = $scope.linkCandidates[len - 1].candidates.length+1;
        // $scope.linkCandidates[len - 1].candidates.push({'id':'candidate'+newItemNo});
    };

    $scope.removeCandidate = function(linkCandidate) {

        var lastItem = linkCandidate.candidates.length-1;
        linkCandidate.candidates.splice(lastItem);

        // var len = $scope.linkCandidates.length;
        // var lastItem = $scope.linkCandidates[len - 1].candidates.length-1;
        // $scope.candidates.splice(lastItem);
    };

    $scope.addNewExistingCandidate = function(linkCandidate) {

        var newItemNo = linkCandidate.existingCandidates.length+1;
        linkCandidate.existingCandidates.push({'id':'existingCandidate'+newItemNo});

        // var len = $scope.linkCandidates.length;
        // var newItemNo = $scope.linkCandidates[len - 1].existingCandidates.length+1;
        // $scope.existingCandidates.push({'id':'existingCandidate'+newItemNo});
    };

    $scope.removeExistingCandidate = function(linkCandidate) {

        var lastItem = linkCandidate.existingCandidates.length-1;
        linkCandidate.existingCandidates.splice(lastItem);

        // var len = $scope.linkCandidates.length;
        // var lastItem = $scope.linkCandidates[len - 1].existingCandidates.length-1;
        // $scope.existingCandidates.splice(lastItem);
    };

    $scope.addNewPrecinct = function() {
        var newItemNo = $scope.precincts.length+1;
        $scope.precincts.push({'id':'manager'+newItemNo});
    };

    $scope.removePrecinct = function() {
        var lastItem = $scope.precincts.length-1;
        $scope.precincts.splice(lastItem);
    };

    $scope.addNewLinkCandidate = function() {
        var newItemNo = $scope.linkCandidates.length+1;
        $scope.linkCandidates.push({'id':'linkCandidates'+newItemNo, 'candidates':[], 'existingCandidates': []});
    };

    $scope.removeLinkCandidate = function() {
        var lastItem = $scope.linkCandidates.length-1;
        $scope.linkCandidates.splice(lastItem);
    };

    $http.post('server/allExistingManagers.php?').success(function (managers) {
        $scope.allManagers = managers;
    });

    $http.post('server/allExistingCandidates.php?').success(function (candidates) {
        $scope.allCandidates = candidates;
    });

    $http.post('server/allExistingStates.php?').success(function (states) {
        $scope.allStates = states;
    });

    $http.post('server/allExistingCounties.php?').success(function (counties) {
        $scope.allCounties = counties;
    });

    $http.post('server/allExistingPrecincts.php?').success(function (precincts) {
        $scope.allPrecincts = precincts;
    });

    /*
    $scope.checkValidDate = function(){
        //var validPassword = false;
        $scope.validDate = false;
        /*var letterNumber = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        //$scope.message = ($scope.login.password.match(letterNumber));

        //console.log("Hello = " + $scope.login.password);

        if(($scope.login.password.match(letterNumber)).length>0)
        {
            if(passwordLength>=8){
                //validPassword = true;
                $scope.good_password_style = true;
            }
        }
        //return validPassword;
        //$scope.message = $scope.good_password_style;
        return $scope.good_password_style;
    };*/

    $scope.selectSublevel = function(level) {
        //$scope.message = level;
        $scope.stateSelected = false;
        $scope.countySelected = false;
        $scope.precinctSelected = false;

        if (level == "Country") {
            $scope.stateSelected = true;
        } else if (level == "State") {
            $scope.countySelected = true;
        } else if (level == "County") {
            $scope.precinctSelected = true;
        } else {
            $scope.message = "Nothing selected??"
        }

    }

    $scope.stateSelected = function() {
        return $scope.stateSelected;
    }

    $scope.countySelected = function() {
        return $scope.countySelected;
    }

    $scope.precinctSelected = function() {
        return $scope.precinctSelected;
    }


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

        $http.post('server/createPoll.php?linkCandidates=' + JSON.stringify($scope.linkCandidates) + "&newPoll=" + JSON.stringify($scope.newpoll) ).success(function (election_id) {

            $scope.message = election_id;
        });


        //  $scope.existingCandidates = $scope.linkCandidates;

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


        //  $scope.temp = 0;
        //  for (var i = 0; i < $scope.precincts.length; i++) {
        //      $http.post('server/createPrecinct.php?zipcode_start=' + $scope.precincts[i].zipcode_start + "&zipcode_end=" + $scope.precincts[i].zipcode_end + "&manager_id=" + $scope.precincts[i].manager.manager_id ).success(function (precinct_id) {
        //          //$scope.message = "Email has been resent.";
        //          if((precinct_id).length == 10)
        //          {
        //              $scope.message = "Precinct creation failed..."
        //
        //          }else {
        //              $scope.temp = precinct_id;
        //          }
        //      });
        //
        //      $scope.newPrecinct[i] = $scope.temp;
        //  }
        //
        //  var candidatesToSave = [];
        //  for (var i = 0; i < $scope.newCandidate.length; i++) {
        //      candidatesToSave[i] = $scope.newCandidate[i];
        //  }
        //  var nextIndex = $scope.newCandidate.length;
        //  for (var i = 0; i < $scope.existingCandidates.length; i++)
        //  {
        //      candidatesToSave[i+nextIndex] = $scope.existingCandidates[i];
        //  }
        //

        // $http.post('server/createElection.php?title=' + $scope.newpoll.title + "&description=" + $scope.newpoll.description + "&start_date=" + $scope.newpoll.datetime_start + "&end_date=" + $scope.newpoll.datetime_end + "&level=" + $scope.newpoll.election_level).success(function (election_id) {
        //     //$scope.message = "Email has been resent.";
        //     if ((election_id).length == 10) {
        //         $scope.message = "Election creation failed..."
        //
        //     } else {
        //         $scope.newElection_id = election_id;
        //
        //
        //         // }
        //         //newElection_id = election_id;
        //
        //         // $scope.newElection_id = election_id;
        //         // console.log(election_id);
        //         //
        //         // for (var i = 0; i < $scope.linkCandidates.length; i++) {
        //         //     var sublevel = 1;
        //         //     var linkCandidate = $scope.linkCandidates[i];
        //         //
        //         //     if($scope.stateSelected)
        //         //     {
        //         //         sublevel = linkCandidate.state.state_id;
        //         //     }else if($scope.countySelected)
        //         //     {
        //         //         sublevel = linkCandidate.county.county_id;
        //         //     }else
        //         //     {
        //         //         sublevel = linkCandidate.precinct.precinct_id;
        //         //     }
        //         //
        //         //     $http.post('server/createLink.php?election_id=' + $scope.newElection_id + "&sublevel=" + sublevel +"&index=" + i ).success(function (link_id) {
        //         //$scope.message = "Email has been resent.";
        //
        //         // if((link_id).length == 10)
        //         // {
        //         //     $scope.message = "Link creation failed..."
        //         //
        //         // }else {
        //         //     var index = 0;
        //         //     index = $scope.tempLink;
        //         //     console.log(index);
        //         //     $scope.existingCandidates = $scope.linkCandidates;
        //         //     // ($scope.linkCandidates[index]).id = link_id;
        //         //     var linkCandidate = $scope.linkCandidates[index];
        //         //     console.log("id = " + linkCandidate.id);
        //         //     for($scope.tempCandidate = 0; $scope.tempCandidate < linkCandidate.candidates.length; ($scope.tempCandidate)++) {
        //         //         var candidate = linkCandidate.candidates[$scope.tempCandidate];
        //         //         $http.post('server/createCandidate.php?first_name=' + candidate.firstname + "&last_name=" + candidate.lastname + "&party_name=" + candidate.partyname + "&designation=" + candidate.designation + "&bio=" + candidate.biography + "&website_link=" + candidate.website).success(function (candidate_id) {
        //         //             //$scope.message = "Email has been resent.";
        //         //             if ((candidate_id).length == 10) {
        //         //                 $scope.message = "Candidate creation failed..."
        //         //
        //         //             } else {
        //         //                 $scope.linkCandidates[$scope.tempLink].candidates[$scope.tempCandidate].id = candidate_id;
        //         //
        //         //                 var candidate = $scope.linkCandidates[$scope.tempLink].candidates[$scope.tempCandidate];
        //         //                 $http.post('server/createLinkCandidateRelation.php?election_id=' + $scope.newElection_id + "&link_id=" + $scope.linkCandidates[$scope.tempLink].id + "&candidate_id=" + candidate.id).success(function (msg) {
        //         //                     //$scope.message = "Email has been resent.";
        //         //                     console.log("msg2 = " + msg);
        //         //                     if ((msg).length == 10) {
        //         //                         $scope.message = "Link Relation creation failed...";
        //         //
        //         //                     }
        //         //                 });
        //         //             }
        //         //         });
        //         //     }
        //         //
        //         //     for (var j = 0; j < linkCandidate.existingCandidates.length; j++) {
        //         //         var existingCandidate = linkCandidate.existingCandidates[j];
        //         //         $http.post('server/createLinkCandidateRelation.php?election_id=' + newElection_id + "&link_id=" + linkCandidate.id + "&candidate_id=" + existingCandidate.id).success(function (msg) {
        //         //             //$scope.message = "Email has been resent.";
        //         //             console.log("msg1 = " + msg);
        //         //             if ((msg).length == 10) {
        //         //                 $scope.message = "Link Relation creation failed...";
        //         //
        //         //             }
        //         //         });
        //         //     }
        //         //
        //         // }
        //
        //
        //         // });
        //
        //
        //         // }
        //
        //
        //     }
        // });
        //
        //
        // for (var i = 0; i < $scope.linkCandidates.length; i++) {
        //     var sublevel = 1;
        //     var linkCandidate = $scope.linkCandidates[i];
        //
        //     if ($scope.stateSelected) {
        //         sublevel = linkCandidate.state.state_id;
        //     } else if ($scope.countySelected) {
        //         sublevel = linkCandidate.county.county_id;
        //     } else {
        //         sublevel = linkCandidate.precinct.precinct_id;
        //     }
        //
        //     $http.post('server/createLink.php?election_id=' + $scope.newElection_id + "&sublevel=" + sublevel + "&index=" + i).success(function (link_id) {
        //
        //         if((link_id).length == 10)
        //         {
        //             $scope.message = "Link creation failed..."
        //
        //         }else {
        //             var index = link_id[1];
        //             var id = link_id[0];
        //
        //             $scope.linkCandidates[index].id = id;
        //         }
        //
        //     });
        //
        //
        //     for (var i = 0; i < $scope.linkCandidates.length; i++) {
        //         var linkCandidate = $scope.linkCandidates[i];
        //         for(var j = 0; j < linkCandidate.candidates.length; j++) {
        //             var candidate = linkCandidate.candidates[j];
        //             $http.post('server/createCandidate.php?first_name=' + candidate.firstname + "&last_name=" + candidate.lastname + "&party_name=" + candidate.partyname + "&designation=" + candidate.designation + "&bio=" + candidate.biography + "&website_link=" + candidate.website +"&linkIndex="+i + "&index="+j).success(function (candidate_id) {
        //                 //$scope.message = "Email has been resent.";
        //                 console.log("candidate_id = " + candidate_id);
        //                 if ((candidate_id).length == 10) {
        //                     $scope.message = "Candidate creation failed..."
        //
        //                 } else {
        //                     var id = candidate_id[0];
        //                     var index = candidate_id[2];
        //                     var linkIndex = candidate_id[1];
        //
        //                     $scope.linkCandidates[linkIndex].candidates[index].id = id;
        //                 }
        //             });
        //         }
        //     }
        //
        //     //var num = 0;
        //
        //     for (var i = 0; i < $scope.linkCandidates.length; i++) {
        //         var linkCandidate = $scope.linkCandidates[i];
        //         for (var j = 0; j < linkCandidate.existingCandidates.length; j++) {
        //             var existingCandidate = linkCandidate.existingCandidates[j];
        //             $http.post('server/createLinkCandidateRelation.php?election_id=' + $scope.newElection_id + "&link_id=" + linkCandidate.id + "&candidate_id=" + existingCandidate.id).success(function (msg) {
        //                 //$scope.message = "Email has been resent.";
        //                 console.log("msg1 = " + msg);
        //                 if ((msg).length == 10) {
        //                     $scope.message = "Link Relation creation failed...";
        //
        //                 }
        //             });
        //         }
        //
        //         for (var j = 0; j < linkCandidate.candidates.length; j++) {
        //             var candidate = linkCandidate.candidates[j];
        //             $http.post('server/createLinkCandidateRelation.php?election_id=' + $scope.newElection_id + "&link_id=" + linkCandidate.id + "&candidate_id=" + candidate.id).success(function (msg) {
        //                 //$scope.message = "Email has been resent.";
        //                 console.log("msg2 = " + msg);
        //                 if ((msg).length == 10) {
        //                     $scope.message = "Link Relation creation failed...";
        //
        //                 }
        //             });
        //         }
        //
        //     }

            // $scope.candidates = $scope.linkCandidates;

    }

});
