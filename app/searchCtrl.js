app.controller("searchCtrl", function(md5, $http, $scope, $rootScope, uuid2, $location){

    $scope.message = "";
    $scope.search = {};

    $scope.searchClicked = function() {
        $http.post('server/searchUsers.php?user_type='+$scope.search.user_type+
            '&user_name='+$scope.search.user_name+
            '&first_name='+$scope.search.first_name+
            '&last_name='+$scope.search.last_name+
            '&government_ID='+$scope.search.government_ID+
            '&zip_code='+$scope.search.zip_code ).success(function (search) {


            console.log("search.length= "+search.length);
            if (search.length == 4){
                $scope.message = "Search successful";
            }else{
                $scope.message = "Search Not Successful";
            }
        });
        console.log("search clicked");
        console.log("$scope.message= "+$scope.message);

        console.log("user_type= "+$scope.search.user_type);
        console.log("username= "+$scope.search.username);
        console.log("first_name= "+$scope.search.first_name);
        console.log("last_name= "+$scope.search.last_name);
        console.log("government_ID= "+$scope.search.government_ID);
        console.log("zip_code= "+$scope.search.zip_code);
    }
});
