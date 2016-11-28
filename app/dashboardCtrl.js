app.controller("dashboardCtrl", function(md5, $http, $scope, $rootScope, uuid2, $location, $cookieStore){
    $scope.message = "";
    $scope.allElections = [];

    home_check1();

    $http.post('server/getResultsForDashboard.php?').success(function (allElections) {
        //$scope.message = allElections[0][1];    // allElections[0] will return all data from first election,
                                                // allElections[0][0] will return the specific election details
                                                // allElections[0][1] will return all links
                                                // allElections[0][1][0] will return specific links


        $scope.display_dashboard = [];
        $scope.dashboard_results = [];
        $scope.dashboard_winner = [];
        $scope.all_results = []; // for admin view

        // iterates through each elections
        for ( var j = 0; j < allElections.length + 1; j++ ) {
            //var j = 23;


            if (allElections[j - 1] != null) {
                for (var i = 0; i < allElections[j - 1][1].length; i++) {
                    if ($scope.dashboard_results[allElections[j - 1][1][i][0].candidate_id] == null) {
                        $scope.dashboard_results[allElections[j - 1][1][i][0].candidate_id] = parseInt(allElections[j - 1][1][i][0].votes, 10);
                        //console.log("Created new: " + allElections[j - 1][1][i][0].candidate_id);
                    }
                    else {
                        $scope.dashboard_results[allElections[j - 1][1][i][0].candidate_id] += parseInt(allElections[j - 1][1][i][0].votes, 10);
                        //console.log("Added to : " + allElections[j - 1][1][i][0].candidate_id);
                    }
                }

                var max = 0;
                var winner = 0;

                for (var i = 0; i < $scope.dashboard_results.length; i++) {
                    if (parseInt($scope.dashboard_results[i], 10) > parseInt(max, 10) && $scope.dashboard_results[i] != null) {
                        max = $scope.dashboard_results[i]; // highest vote count
                        winner = i; // candidate_id of winner
                    }
                }

                for (var i = 0; i < allElections[j - 1][1].length; i++) {
                    if (allElections[j - 1][1][i][1].candidate_id == winner) {
                        $scope.dashboard_winner = "The winner of this election is " + allElections[j - 1][1][i][1].first_name + " " + allElections[j - 1][1][i][1].last_name + " with a total of " + max + " votes";
                    }
                }

                for ( var i = 0; i < $scope.dashboard_results.length; i++) {
                    if ($scope.dashboard_results[i] != null) {
                        // have index of candidate_id
                        for ( var k = 0; k < allElections[j-1][1].length; k++) {
                            if (allElections[j-1][1][k][1].candidate_id == i) {
                                $scope.all_results[i] = " " + allElections[j-1][1][k][1].first_name + " " + allElections[j-1][1][k][1].last_name + " finished with a total of " + $scope.dashboard_results[i] + " votes.<br>";
                            }
                        }
                    }
                }

                $scope.display_dashboard[j - 1] =
                    "<font size='5.5'><b>" + allElections[j - 1][0].title + "</b></font>"
                    + "<br><h4>" + allElections[j - 1][0].start_date.split(" ")[0] + " to " + allElections[j - 1][0].end_date.split(" ")[0]
                    + "<br><b>Election Description:</b> " + allElections[j - 1][0].description
                    + "<br><b>Election Level:</b> " + allElections[j - 1][0].level + "</h4>";

                //$scope.message = allElections[j-1][0].end_date; //returns end_date

                var endDate = new Date(allElections[j-1][0].end_date.split(" ")[0]);

                if(endDate > (new Date())) {
                    //$scope.hasEndDatePassed = false; on going election!

                    $scope.display_dashboard[j - 1] +=
                        "<br><font color='red'><b> * This election is still open to eligible voters! * </b></font>";

                    if ($rootScope.session.access == "Admin") {
                        $scope.display_dashboard[j - 1] +=
                            "<br>" + $scope.dashboard_winner +
                            "<br>" + $scope.all_results;
                    }
                }

                else {

                    // $scope.hasEndDatePassed = true; election has ended!

                    if ($rootScope.session.access == "Admin") {
                        $scope.display_dashboard[j - 1] +=
                            "<br><font color='green'><b> * " + $scope.dashboard_winner + "</b></font>" +
                            "<br>" + $scope.all_results;
                    }
                    else {
                        $scope.display_dashboard[j - 1] +=
                            "<br><font color='green'><b>" + $scope.dashboard_winner + "</b></font>";
                    }
                }



            }
        }

    })




    function home_check1(){
        $http.post('server/checkProfile.php?user_name='+$rootScope.session.user_name+'&user_type='+$rootScope.session.access).success(function (updatedProfile) {
            if($rootScope.session.access == "Voter" || $rootScope.session.access == "Manager"){
                if(updatedProfile.length == 4){
                    $rootScope.isProfileUpdated = true;
                }
            }
        });
    };

});