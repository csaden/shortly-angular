// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('shortly.auth', [])

.controller('AuthController', function AuthController($scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.signin = function () {
    $scope.submitted = true;
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.shortly', token);
        $location.path('/links');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.shortly', token);
        $location.path('/links');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signout = function () {
    Auth.signout();
  };

})

.directive('passwordStrength', [
  function() {
    return {
      require: 'ngModel',
      restrict: 'E',
      scope: {
        password: '=ngModel'
      },

      link: function(scope, elem, attrs, ctrl) {
        scope.$watch('password', function(newVal) {

          scope.strength = isSatisfied(newVal && newVal.length >= 8) +
            isSatisfied(newVal && /[A-z]/.test(newVal)) +
            isSatisfied(newVal && /(?=.*\W)/.test(newVal)) +
            isSatisfied(newVal && /\d/.test(newVal));

          function isSatisfied(criteria) {
            return criteria ? 1 : 0;
          }
        }, true);
      },
      template: '<div class="progress" style="width: 360px">' +
        '<div class="progress-bar progress-bar-danger" style="width: {{strength >= 1 ? 25 : 0}}%"></div>' +
        '<div class="progress-bar progress-bar-warning" style="width: {{strength >= 2 ? 25 : 0}}%"></div>' +
        '<div class="progress-bar progress-bar-warning" style="width: {{strength >= 3 ? 25 : 0}}%"></div>' +
        '<div class="progress-bar progress-bar-success" style="width: {{strength >= 4 ? 25 : 0}}%"></div>' +
        '</div>'
    };
  }
])
.directive('patternValidator', [
  function() {
    return {
      require: 'ngModel',
      restrict: 'A',
      link: function(scope, elem, attrs, ctrl) {
        ctrl.$parsers.unshift(function(viewValue) {

          var patt = new RegExp(attrs.patternValidator);

          var isValid = patt.test(viewValue);

          ctrl.$setValidity('passwordPattern', isValid);

          // angular does this with all validators -> return isValid ? viewValue : undefined;
          // But it means that the ng-model will have a value of undefined
          // So just return viewValue!
          return viewValue;

        });
      }
    };
  }
]);
