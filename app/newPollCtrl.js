app.controller("newPollCtrl", function($scope, $rootScope, $http){

    $scope.message = "";
    $scope.newpoll = {};
    $scope.candidates = [];
    $scope.existingCandidates = [];
    $scope.precincts = [];

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

    }

});