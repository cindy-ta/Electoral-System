app.controller("loginCtrl", function(md5, $http, $scope, $rootScope, uuid2, $location, $cookieStore){
    $scope.login = {};
    $scope.vaild_logins = [];
    $scope.message = "";
    $scope.good_password_style = false;
    $scope.isManager = false;
    $scope.isLoggedIn = false;
    $scope.good_email = false;
    $rootScope.isProfileUpdated = false;

    function getUserAuthenticationAndValidate( user ) {

        $http.post('server/getUserAuthentication.php?user='+user).success(function (user_authentication) {

            //$scope.message = user_authentication.verified;



                //$scope.message = $scope.login.password;

            if (user_authentication != {}) {
                if (user_authentication.verified == "Yes") {

                    if (user_authentication.password == md5.createHash($scope.login.password)) {
                        //home_check1();
                        startSessionAndGoToHomePage(user_authentication);
                    } else {
                        $scope.message = "Incorrect Email/Password combination";
                    }
                }
                else {
                    $scope.message = "Please verify your account.";
                }
            } else {
                $scope.message = "User not found";
            }

        });
    }

    function startSessionAndGoToHomePage(user){
        var new_session = uuid2.newuuid();
        $http.post('server/startSession.php?session='+new_session).success(function (data) {
            $rootScope.session = {
                session_id: new_session,
                user_name: user.username,
                access: user.user_type
            };
            $cookieStore.put("session", $rootScope.session );
            $scope.login.user_name = data;

            home_check1();
            console.log("isProfileUpdated= "+$rootScope.isProfileUpdated);

        })
    }

    $scope.endSession = function(){
        var old_session = $rootScope.session;
        $http.post('server/endSession.php?session='+old_session).success(function () {
            $rootScope.session = null;
            $cookieStore.remove("session");
            $location.path('/login');
            $rootScope.isProfileUpdated = false;
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

    $scope.redirectToBallotPage = function() {
        $location.path('/ballot');
    }

    $scope.redirectToProfile = function() {
        $location.path('/profile');
    }

    $scope.redirectToVerification = function() {
        $location.path('/verification');
    }

    $scope.redirectToNewPoll = function(){
        $location.path('/newpoll');
    };

    $scope.redirectToBallotPage = function(){
        $location.path("/ballot");
    }

    $scope.redirectToPrecincts = function(){
        $location.path("/precincts");
    }

    $scope.redirectToSearch = function() {
        $location.path("/search");
    };

    $scope.createAccount = function(){

        if ($scope.good_email == true) {

            if ($scope.login.password == $scope.login.password2) {

                if ($scope.login.user_type == "Voter") {

                    $http.post('server/checkEmails.php?email=' + $scope.login.email).success(function (isEmailAvailable) {
                        //console.log("isEmailAvilalble: " + isEmailAvailable);
                        var store = isEmailAvailable;
                        //console.log("store: " + store);
                        //alert(typeof(store)); // type string
                        if (store.length > 1) {
                            //console.log("Email is available!!!! :)");
                            var password = md5.createHash($scope.login.password)
                            var manager_key = 0;
                            $http.post('server/createUser.php?email=' + $scope.login.email + '&password=' + password + '&user_type=' + $scope.login.user_type + '&manager_key=' + manager_key).success(function (msg) {

                                $location.path("/verification");
                            });

                        } else {
                            //console.log("Email is not available.");
                            $scope.message = "Account is already registered under this email. Try Logging in or inquiring about a Forgotten Password"
                        }
                    });
                } else {

                    var password = md5.createHash($scope.login.password)
                    var manager_key = $scope.login.manager_key;
                    $http.post('server/createUser.php?email=' + $scope.login.email + '&password=' + password + '&user_type=' + $scope.login.user_type + '&manager_key=' + manager_key).success(function (msg) {
                        if(msg.length == 6)
                        {
                            $scope.message = "Manager data not found."
                        }else if(msg.length == 4) {
                            $location.path("/verification");
                        }else
                        {
                            $scope.message = "Error in saving details"
                        }
                    });
                }
            }
            else {
                $scope.message = "Passwords do not match";
            }
        }else {
            $scope.message = "Invalid email"
        }
    };

    $scope.goodEmail = function(){

        $scope.good_email = false;
        var emailRegex = /^[0-9a-zA-Z]+(\.[0-9a-zA-Z]+)*@[0-9a-zA-Z]+(\.[0-9a-zA-Z]+)*(\.[a-z]{2,4})$/;

        if(($scope.login.email.match(emailRegex)).length>0)
        {
            $scope.good_email = true;
        }

        return $scope.good_email;
    };

    $scope.goodPassword = function(){
        //var validPassword = false;
        $scope.good_password_style = false;
        var passwordLength = $scope.login.password.length;
        var letterNumber = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
        //$scope.message = ($scope.login.password.match(letterNumber));

        //console.log("Hello = " + $scope.login.password);

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

    $scope.login_check = function() {
        $scope.isLoggedIn = false;

        if($rootScope.session != null) {
            $scope.isLoggedIn = true;
        }

        return !($scope.isLoggedIn);
    }

    $scope.usertype = function(){

        $scope.isManager = false;

        if($scope.login.user_type == "Manager")
        {
            $scope.isManager = true;
        }

        return !($scope.isManager);
    };

    $scope.admin_check = function(){
        $scope.isAdmin = false;
        if ($scope.login_check() == false) {
            if ($rootScope.session.access == "Admin") {
                $scope.isAdmin = true;
            }
        }
        return !($scope.isAdmin);
    };

    $scope.profile_check = function(){
        $scope.showProfile = false;
        if ($scope.login_check() == false){
            if ($scope.admin_check() == true){
                $scope.showProfile = true;
            }
        }
        return !($scope.showProfile);
    };

    $scope.ballot_check = function(){
        $scope.showBallot = false;
        if ($scope.home_check() == false){
            if ($scope.admin_check() == true){
                $scope.showBallot = true;
            }

        }
        return !($scope.showBallot);
    };

    $scope.home_check = function(){
        if ($scope.admin_check() == false){
            $rootScope.isProfileUpdated = true;
        }
        return !($rootScope.isProfileUpdated);
    };

    function home_check1(){
        $rootScope.isProfileUpdated = false;

        $http.post('server/checkProfile.php?user_name='+$rootScope.session.user_name+'&user_type='+$rootScope.session.access).success(function (updatedProfile) {
            if($scope.admin_check() == false) {
                $scope.redirectToHome();
            }else if(updatedProfile.length == 4){
                $rootScope.isProfileUpdated = true;
                console.log("Profile is updated")
                $scope.redirectToHome()
            }else{
                console.log("Profile needs to be updated");
                $scope.redirectToProfile()
            }
        });
    };

    $scope.validateLogin = function() {

        //$scope.message = $scope.login.user_name
        getUserAuthenticationAndValidate($scope.login.user_name)
    }

    $scope.verifyUser = function(){
        var password = md5.createHash($scope.verify.password);
        $http.post('server/verifyUser.php?user_name=' + $scope.verify.user_name + '&password=' + password + '&code=' + $scope.verify.code).success(function (msg) {
            if(msg.length == 4)
            {
                $scope.message = "Unable to verify. Details might not be correct";
            }else {
                $location.path("/login");
            }
        });

    }

    $scope.resendEmail = function() {

        $http.post('server/resendEmail.php?email_address=' + $scope.verify.email_addr).success(function (emailAddress) {
            //$scope.message = "Email has been resent.";
            console.log("Here???");
            $scope.message = emailAddress;
        });

    }



});