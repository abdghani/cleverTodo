(function() {
  // 'use strict';

  angular
    .module('front')
    .service('GatewayService', GatewayService);

  GatewayService.$inject = ['$log', '$q', '$cookies', '$http'];
  /** @ngInject */
  function GatewayService($log, $q, $cookies, $http) {
    var baseUrl = "http://localhost:4000"
    return {
      login: function(data) {
        var promise = $q.defer();
        var baseURL = baseUrl + '/api/users/login';
        var requestData = {
          "username": data.username,
          "password": data.password
        }
        var headers = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        $http.post(baseURL, requestData)
          .then(function(result) {
            $log.debug('Created object, ', result);
            promise.resolve(result);
          }, function(result) {
            $log.debug("Failed to create object:", result);
            promise.reject(result);
          });
        return promise.promise;
      },
      signup: function(data) {
        var promise = $q.defer();
        var baseURL = baseUrl + '/api/users/create';
        var requestData = {
          "username": data.username,
          "email": data.email,
          "password": data.password
        }
        var headers = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        $http.post(baseURL, requestData)
          .then(function(result) {
            $log.debug('Created object, ', result);
            promise.resolve(result);
          }, function(result) {
            $log.debug("Failed to create object:", result);
            promise.reject(result);
          });
        return promise.promise;
      },
      login: function(data) {
        var promise = $q.defer();
        var baseURL = baseUrl + '/api/users/login';
        var requestData = {
          "username": data.username,
          "password": data.password
        }
        var headers = {
          headers: {
            'Content-Type': 'application/json'
          }
        }
        $http.post(baseURL, requestData)
          .then(function(result) {
            $log.debug('Created object, ', result);
            promise.resolve(result);
          }, function(result) {
            $log.debug("Failed to create object:", result);
            promise.reject(result);
          });
        return promise.promise;
      },
      checkLogin: function(data) {
        console.log(localStorage.getItem('token'));
        var promise = $q.defer();
        var baseURL = baseUrl + '/api/users/checkUserSession';
        var requestData = {
          "userId": localStorage.getItem('userId')
        }
        var headers = {
          headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('token')
          }
        }
        $http.post(baseURL, requestData, headers)
          .then(function(result) {
            $log.debug('Created object, ', result);
            promise.resolve(result);
          }, function(result) {
            $log.debug("Failed to create object:", result);
            promise.reject(result);
          });
        return promise.promise;
      },
      getAllTodos: function() {
        var promise = $q.defer();
        var baseURL = baseUrl + '/api/todo';
        var requestData = {
          "userId": localStorage.getItem('userId'),
          "status": "all"
        }
        var headers = {
          headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('token')
          }
        }
        $http.post(baseURL, requestData, headers)
          .then(function(result) {
            $log.debug('Created object, ', result);
            promise.resolve(result);
          }, function(result) {
            $log.debug("Failed to create object:", result);
            promise.reject(result);
          });
        return promise.promise;
      },
      addTodos: function(data) {
        var promise = $q.defer();
        var baseURL = baseUrl + '/api/todo/add';
        var requestData = {
          "userId": localStorage.getItem('userId'),
          data: data
        }
        var headers = {
          headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('token')
          }
        }
        $http.post(baseURL, requestData, headers)
          .then(function(result) {
            $log.debug('Created object, ', result);
            promise.resolve(result);
          }, function(result) {
            $log.debug("Failed to create object:", result);
            promise.reject(result);
          });
        return promise.promise;
      },
      changeTodos: function(data) {
        var promise = $q.defer();
        var baseURL = baseUrl + '/api/todo/changeStatus';
        var requestData = {
          "userId": localStorage.getItem('userId'),
          todoId: data.todoId,
          status: data.status,
        }
        var headers = {
          headers: {
            'Content-Type': 'application/json',
            'authorization': localStorage.getItem('token')
          }
        }
        $http.post(baseURL, requestData, headers)
          .then(function(result) {
            $log.debug('Created object, ', result);
            promise.resolve(result);
          }, function(result) {
            $log.debug("Failed to create object:", result);
            promise.reject(result);
          });
        return promise.promise;
      }

    }
  }
})()
