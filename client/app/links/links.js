angular.module('shortly.links', [])

.controller('LinksController', function ($scope, Links) {
  $scope.data = {};

  $scope.getLinks = function () {
    Links.getLinks()
      .then(function(links) {
        $scope.data = links;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
});
