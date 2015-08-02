angular.module('shortly.shorten', [])

.controller('ShortenController', function ShortenController($scope, $location, Links) {
  $scope.link = {};

  $scope.addLink = function () {
    $scope.loading = true;
    Links.addLink($scope.link)
      .then(function(link) {
        $scope.loading = false;
        $location.path('/');
      })
      .catch(function(error) {
        console.log(error);
      });
  };
});
