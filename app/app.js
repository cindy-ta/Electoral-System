var app = angular.module("app", ['angular-md5', 'ngRoute', 'angularUUID2', 'ngCookies'])
    .run(function( $rootScope, $http, $location, $cookieStore) {
       // Initialize the global functions
       $rootScope.isLoggedIn = function(){
           return $rootScope.session != null;
       };

       $rootScope.getAccessLevel = function(){
           return $rootScope.session.access;
       };

       $rootScope.validateSession = function(nextPath){
           if($rootScope.session.session_id != null) {
               $http.post('server/searchActiveSessions.php?session=' + $rootScope.session.session_id).success(function (data) {
                    if(data == 0){
                         $rootScope.session = null;
                         $cookieStore.put("session", null);
                         if(nextPath != "/registration") {
                             $location.path('/');
                         }
                    }
               });
           }
       };
    });

app.config(['$routeProvider', '$sceProvider',
    function ($routeProvider, $sceProvider) {

        $sceProvider.enabled(false);

        $routeProvider.
            when('/login', {
                title: 'Login',
                templateUrl: 'partials/login.html',
                controller: 'loginCtrl'
            })
            .when('/registration', {
                title: 'registration',
                templateUrl: 'partials/registration.html',
                controller: 'loginCtrl'
            })
            .when('/home', {
                title: 'Home',
                templateUrl: 'partials/dashboard.html',
                controller: 'homeCtrl'
            })
            .when('/', {
                title: 'Login',
                templateUrl: 'partials/login.html',
                controller: 'loginCtrl'
            })
            .otherwise({
                redirectTo: '/login'
            });
    }])
    .run(function ($rootScope, $location, $http, $cookieStore) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            var nextUrl = next.$$route.originalPath;

            getSessionFromCookies($rootScope, $cookieStore);
            redirectInvalidRoutes($rootScope, nextUrl, $location);
            $rootScope.validateSession(nextUrl);
        });
    });

function getSessionFromCookies($rootScope, $cookieStore){
    if($rootScope.session == null){
        $rootScope.session =  $cookieStore.get("session");
    }
}

function redirectInvalidRoutes($rootScope, nextUrl, $location){
    if($rootScope.session == null ) {
        if (nextUrl != '/' && nextUrl != '/login' && nextUrl != '/registration'){
            $location.path("/login");
        }
    }else{
        if (nextUrl == '/' || nextUrl == '/login' || nextUrl == '/registration') {
            $location.path("/home");
        }
    }
}