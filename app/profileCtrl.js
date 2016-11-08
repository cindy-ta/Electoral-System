app.controller("profileCtrl", function(md5, $http, $scope, $rootScope, uuid2, $location){

    $scope.message = "Hello";


    $scope.updateProfile = function() {
        $http.post('server/updateProfile.php?first_name='+$scope.profile.first_name+
                                            '&last_name='+$scope.profile.last_name+
                                            '&government_ID'+$scope.profile.government_ID+
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
                                            '&user_type='+$rootScope.session.user_type  ).success(function (profile) {



            if (profile.length == 4){
                $scope.message = "Profile Successfully Updated";
            }else{
                $scope.message = "Not updated successfully";
            }


        });


       /* $scope.validFields = function(){

            $scope.all_fields_filled = false;
            if($scope.profile.first_name != null)
                if($scope.profile.last_name != null)
                    if($scope.profile.government_ID != null)
                        if($scope.profile.age != null)
                            if($scope.profile.gender != "Male" & $scope.profile.gender != "Female")


            return $scope.all_fields_filled;
        };*/

        console.log($scope.profile.first_name);
        console.log($scope.profile.state);
        console.log($scope.profile.gender);

    }

});
