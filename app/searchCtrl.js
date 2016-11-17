app.controller("searchCtrl", function(md5, $http, $scope, $rootScope, uuid2, $location){

    $scope.msg = "Hello";
    $scope.search = {};

    $scope.searchClicked = function() {
        $http.post('server/searchUser.php?user_type='+$scope.search.user_type+
            '&username='+$scope.search.username+
            '&first_name='+$scope.search.first_name+
            '&last_name='+$scope.profile.last_name+
            '&government_ID='+$scope.profile.government_ID+
            '&zip_code='+$scope.profile.zip_code ).success(function (search) {

            if (search.length == 4){
                $scope.msg = "Search successful";
            }else{
                $scope.msg = "Search Not Successful";
            }
        });
    }
});
