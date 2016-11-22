app.controller("dashboardCtrl", function(md5, $http, $scope, $rootScope, uuid2, $location, $cookieStore){
    $scope.message = "";
    $scope.allElections = [];

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




});