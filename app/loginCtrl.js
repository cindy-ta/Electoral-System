
app.controller("loginCtrl", function(md5, $http, $scope, $rootScope, uuid2, $location, $cookieStore){
    $scope.login = {};
    $scope.vaild_logins = [];
    $scope.message = "";
    $scope.good_password_style = false;

    function getUserAuthenticationAndValidate( user ) {
        $http.post('server/getUserAuthentication.php?user='+user).success(function (user_authentication) {

            $scope.message = user_authentication;
            var success = false;
            //$scope.message = user_authentication;

            if (user_authentication != {} ){
                if (user_authentication/*[0]*/.password == md5.createHash($scope.login.password)) {
                    success = true;
                    startSessionAndGoToHomePage(user_authentication/*[0]*/);
                    $scope.message = "success";
                }else{
                   $scope.message = "Incorrect Email/Password combination";
                }
            }else{
                $scope.message = "User not found";
            }
        });
    }

    function startSessionAndGoToHomePage(user){
        var new_session = uuid2.newuuid();
        $http.post('server/startSession.php?session='+new_session).success(function (data) {
            $rootScope.session = {
                session_id: new_session,
                user_name: user.user_name,
                access: user.user_type
            };
            $cookieStore.put("session", $rootScope.session );
            $scope.login.user_name = data
            redirectToHome();
        })
    }

    function redirectToHome(){
        $location.path("/home");
    }

    function endSession(){
        var old_session = $rootScope.session;
        $http.post('server/endSession.php?session='+old_session).success(function () {
            $rootScope.session = null;
            $cookieStore.remove("session");
        })
    }

    $scope.redirectToCreateAccountPage = function(){
        $location.path('/registration');
    };

    $scope.createAccount = function(){
        if($scope.login.password == $scope.login.password2) {
            var password = md5.createHash($scope.login.password)
            $http.post('server/createUser.php?email=' + $scope.login.email + '&password=' + password + '&user_type=' + $scope.login.user_type).success(function () {
                $scope.message = "A verification email has been sent to you."
                $location.path("/login");
            });
        }else
        {
            $scope.message = "Passwords do not match";
        }

    };

    $scope.goodPassword = function(){
        //var validPassword = false;
        $scope.good_password_style = false;
        var passwordLength = $scope.login.password.length;
        var letterNumber = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
        //$scope.message = ($scope.login.password.match(letterNumber));

        if(($scope.login.password.match(letterNumber)).length>0)
        {
          if(passwordLength>=6){
              //validPassword = true;
              $scope.good_password_style = true;
          }
        }
        //return validPassword;
        //$scope.message = $scope.good_password_style;
        return $scope.good_password_style;
    };

    $scope.validateLogin = function() {

        //$scope.message = $scope.login.user_name
        getUserAuthenticationAndValidate($scope.login.user_name)
    }
});