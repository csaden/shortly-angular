angular.module('shortly.links', [])

.controller('LinksController', function LinksController($scope, Links) {
  $scope.data = {};

  $scope.getLinks = function () {
    Links.getLinks()
      .then(function(links) {
        $scope.data.links = links;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  $scope.getLinks();

});
