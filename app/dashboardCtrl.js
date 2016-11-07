app.controller("dashboardCtrl", function(md5, $http, $scope, $rootScope, uuid2, $location, $cookieStore){
    $scope.message = "";
    $scope.dashboard = {};

    $scope.findElectionInfo = function()
    {
        $http.post('server/populateDashboard.php?election_id=' + $scope.dashboard.election_id).success(function (electionID) {

            console.log(electionID);

        });
    }
});