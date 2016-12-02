app.controller("searchCtrl", function(md5, $http, $scope){

    $scope.message = "";
    $scope.result = "";
    $scope.search = {};
    $scope.searchVoterResults=[];
    $scope.searchManagerResults=[];

    $scope.searchClicked = function() {
        $http.post('server/searchUsers.php?user_type='+$scope.search.user_type+
            '&user_name='+$scope.search.user_name+
            '&first_name='+$scope.search.first_name+
            '&last_name='+$scope.search.last_name+
            '&government_id='+$scope.search.government_id+
            '&zip_code='+$scope.search.zip_code ).success(function (search) {

            var voterNum = 0;
            var managerNum = 0;
            for (var i = 0; i < search.length; i++) {
                if(search[i].voter_id == null)
                {
                    $scope.searchManagerResults[managerNum] = search[i];
                    managerNum++;
                }else {
                    $scope.searchVoterResults[voterNum] = search[i];
                    voterNum++;
                }
            }

        });
    }
});
