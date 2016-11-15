app.controller("profileCtrl", function(md5, $http, $scope, $rootScope, uuid2, $location){

    $scope.message = "";
    $scope.profile = {};

    $scope.updateProfile = function() {
        $http.post('server/updateProfile.php?first_name='+$scope.profile.first_name+
                                            '&last_name='+$scope.profile.last_name+
                                            '&government_ID='+$scope.profile.government_ID+
                                            '&age='+$scope.profile.age+
                                            '&gender='+$scope.profile.gender+
                                            '&contact_number='+$scope.profile.contact_number+
                                            '&address_line1='+$scope.profile.address_line1+
                                            '&address_line2='+$scope.profile.address_line2+
                                            '&city='+$scope.profile.city+
                                            '&state='+$scope.profile.state+
                                            '&country='+$scope.profile.country+
                                            '&zip_code='+$scope.profile.zip_code+
                                            '&user_name='+$rootScope.session.user_name+
                                            '&user_type='+$rootScope.session.access  ).success(function (profile) {

            console.log("User_type = " + $rootScope.session.access);
            console.log("User_name = " + $rootScope.session.user_name);

            if (profile.length == 4){
                $scope.message = "Profile Successfully Updated";
                $rootScope.isProfileUpdated = true;
                $location.path("/home");
            }else{
                $scope.message = "Not updated successfully";
            }

        });

    }

});
