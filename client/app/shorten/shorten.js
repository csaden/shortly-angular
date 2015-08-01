angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $location, Links) {
  $scope.link = {};

  $scope.addLink = function () {
    Links.addLink($scope.link)
      .then(function(link) {
        console.log('Link added:');
        console.dir(link);
        $location.path('/links');
      })
      .catch(function(error) {
        console.log(error);
      });
  };
});
