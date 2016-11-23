app.controller("searchCtrl", function(md5, $http, $scope){

    $scope.message = "";
    $scope.result = "";
    $scope.search = {};

    $scope.searchClicked = function() {
        $http.post('server/searchUsers.php?user_type='+$scope.search.user_type+
            '&user_name='+$scope.search.user_name+
            '&first_name='+$scope.search.first_name+
            '&last_name='+$scope.search.last_name+
            '&government_id='+$scope.search.government_id+
            '&zip_code='+$scope.search.zip_code ).success(function (search) {

            $scope.message = search;

        });

        /*
        var doc = new jsPDF();
        doc.text(HELLO WORLD, 10, 10);
        doc.save('a4.pdf');*/

    }
});
