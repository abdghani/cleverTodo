(function() {
  'use strict';

  angular
    .module('front')
    .controller('UserController', UserController);

  function UserController($state, $cookies, $scope, $timeout, webDevTec, toastr, GatewayService) {
    console.log("---");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    $scope.obj = {};
    $scope.load = {};
    $scope.funcs = {};
    $scope.obj.input = {};
    $scope.obj.default = 'login'

    $scope.goTo = function(goTo) {
      console.log(localStorage.getItem('userId'));
      $state.go(goTo, {
        userId: localStorage.getItem('userId')
      });
    }
    $('#date').attr('data-uk-datepicker', '{format:"DD.MM.YYYY"}');
    $scope.funcs.signin = function() {
      $scope.obj.errLogin = false;
      GatewayService.login($scope.obj.input)
        .then(function(res) {
          localStorage.setItem("userId", res.data.userId);
          localStorage.setItem("token", res.data.token);
          $scope.goTo('home');
        })
        .catch(function(err) {
          $scope.obj.errLogin = true
        })
    }

    $scope.funcs.signup = function() {
      $scope.obj.errLogin = false;
      $scope.obj.errSignup = false;
      GatewayService.signup($scope.obj.input)
        .then(function(res) {
          $state.reload();
        })
        .catch(function(err) {
          $scope.obj.errSignup = true
        })
    }
  }
})();
