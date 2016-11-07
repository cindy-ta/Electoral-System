
app.controller("loginCtrl", function(md5, $http, $scope, $rootScope, uuid2, $location, $cookieStore){
    $scope.login = {};
    $scope.vaild_logins = [];
    $scope.message = "";
    $scope.good_password_style = false;
    $scope.isManager = false;

    function getUserAuthenticationAndValidate( user ) {
        $http.post('server/getUserAuthentication.php?user='+user).success(function (user_authentication) {

            //$scope.message = user_authentication;
            var success = false;
            //$scope.message = $scope.login.password;

            if (user_authentication != {} ){
                if (user_authentication.password == md5.createHash($scope.login.password)) {
                    success = true;
                    startSessionAndGoToHomePage(user_authentication);
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
            $location.path("/home");
        })
    }

 /*   function redirectToHome(){
        $location.path("/home");
    }*/

    $scope.endSession = function(){
        var old_session = $rootScope.session;
        $http.post('server/endSession.php?session='+old_session).success(function () {
            $rootScope.session = null;
            $cookieStore.remove("session");
            $location.path('/login');
        })

    }

    $scope.redirectToLoginPage = function(){
        $location.path('/login');
    }


    $scope.redirectToCreateAccountPage = function(){
        $location.path('/registration');
    };

    $scope.redirectToHome = function(){
        $location.path("/home");
    }

    $scope.createAccount = function(){

        $http.post('server/checkEmails.php?email=' + $scope.login.email).success(function (isEmailAvailable) {

            if (store.length > 1 ) {
                console.log("Email is available!!!! :)");

                if($scope.login.password == $scope.login.password2) {
                    var password = md5.createHash($scope.login.password)

                    $http.post('server/createUser.php?email=' + $scope.login.email + '&password=' + password + '&user_type=' + $scope.login.user_type).success(function (msg) {

                        $location.path("/login");
                    });
                }else
                {
                    $scope.message = "Passwords do not match";
                }

            }
            else {
                console.log("Email is not available.");
                $scope.message = "Account is already registered under this email. Try Logging in or inquiring about a Forgotten Password"

            }
        })



    };

    $scope.goodPassword = function(){
        //var validPassword = false;
        $scope.good_password_style = false;
        var passwordLength = $scope.login.password.length;
        var letterNumber = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        //$scope.message = ($scope.login.password.match(letterNumber));

        console.log("Hello = " + $scope.login.password);

        if(($scope.login.password.match(letterNumber)).length>0)
        {
          if(passwordLength>=8){
              //validPassword = true;
              $scope.good_password_style = true;
          }
        }
        //return validPassword;
        //$scope.message = $scope.good_password_style;
        return $scope.good_password_style;
    };

    $scope.usertype = function(){

        $scope.isManager = false;

        if($scope.login.user_type == "Manager")
        {
            $scope.isManager = true;
        }

        return !($scope.isManager);
    };

    $scope.validateLogin = function() {

        //$scope.message = $scope.login.user_name
        getUserAuthenticationAndValidate($scope.login.user_name)
    }
});