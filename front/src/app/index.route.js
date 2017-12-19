(function() {
  'use strict';

  angular
    .module('front')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home/:userId',
        views: {
          'main': {
            templateUrl: 'app/main/main.html',
            controller: 'MainController',
            controllerAs: 'main'
          }
        }
      })
      .state('user', {
        url: '/user',
        views: {
          'main': {
            templateUrl: 'app/login/user.html',
            controller: 'UserController',
            controllerAs: 'user'
          },
          'login@user': {
            templateUrl: 'app/login/login.html',
            controller: 'UserController',
            controllerAs: 'user'
          },
          'register@user': {
            templateUrl: 'app/login/register.html',
            controller: 'UserController',
            controllerAs: 'user'
          }
        }
      })

    $urlRouterProvider.otherwise('/user');
  }

})();
