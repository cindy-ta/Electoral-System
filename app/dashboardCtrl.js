app.controller("dashboardCtrl", function(md5, $http, $scope, $rootScope, uuid2, $location, $cookieStore){
    $scope.message = "";
    $scope.isManager = false;
    $scope.isAdmin = false;

    $scope.redirectToHome = function(){
        $location.path("/home");
    }



    $scope.usertype = function(){

        $scope.isManager = false;

        if($scope.login.user_type == "Manager")
        {
            $scope.isManager = true;
        }

        return !($scope.isManager);
    };

});