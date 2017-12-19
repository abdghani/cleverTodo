(function() {
  'use strict';

  angular
    .module('front')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, $q, $state, $scope, $cookies, webDevTec, toastr, GatewayService) {

    //state change function
    $scope.goTo = function(goTo) {
      $state.go(goTo, {
        userId: localStorage.getItem('userId')
      });
    };
    //Redirect if not logged in
    if (localStorage.getItem('userId') == null || localStorage.getItem('token') == null) {
      $scope.goTo('user');
    } else {
      GatewayService.checkLogin()
        .then(function(done) {
          console.log(done);
        })
        .catch(function(err) {
          $scope.goTo('user');
        })
    };

    $scope.obj = {};
    $scope.funcs = {};
    $scope.obj.addTodo = {}

    $scope.obj.filterSelection = "today";

    //add a todo
    $scope.funcs.addTodo = function() {
      $scope.obj.addTodoLoad = false;
      $scope.obj.addTodoError = false;
      $scope.obj.addTodoSuccess = false;
      if ($scope.obj.addTodo.content == null || $scope.obj.addTodo.dueDate == null) {
        console.log("please enter something");
        $scope.obj.addTodoError = true;
        $scope.obj.addTodoErrorMsg = "Please enter something";
      } else {
        $scope.obj.addTodoLoad = true;
        GatewayService.addTodos($scope.obj.addTodo)
          .then(function(res) {
            $timeout(function() {
              $scope.obj.addTodoLoad = false;
              $scope.obj.addTodoSuccess = true;
              $scope.obj.addTodoSuccessMsg = "TODO ADDEDD";
              $scope.funcs.getAllTodos()
                .then(function(todos) {
                  $scope.obj.todos = todos;
                  $state.reload();
                })
              $scope.obj.addTodo = {};
            }, 1000);
          })
          .catch(function(err) {
            $scope.obj.addTodoLoad = false;
            $scope.obj.addTodoError = true;
            $scope.obj.obj.addTodoErrorMsg = "ERROR ADDING TODO";
            console.log(err);
          })
      }
    };

    //Get all Todos
    $scope.funcs.getAllTodos = function() {
      var promise = $q.defer();
      GatewayService.getAllTodos()
        .then(function(todos) {
          $scope.obj.finalTodos = todos.data
          promise.resolve(todos.data);
        })
        .catch(function(err) {
          promise.reject(err)
        })
      return promise.promise;
    };

    //Load all todos to view
    $scope.funcs.loadAllTodos = function() {
      $scope.funcs.getAllTodos()
        .then(function(todos) {
          $scope.obj.todos = filterTodos(todos, $scope.obj.filterSelection);
        })
    }

    $scope.funcs.changeFilter = function(filter) {
      $scope.obj.filterSelection = filter
      $scope.obj.todos = filterTodos($scope.obj.finalTodos, filter);
    }

    //When a todo is completed
    $scope.funcs.changeStatus = function(todo, i) {
      $scope.obj.todos[i].completed = "1";
      $scope.obj.finalTodos[i].completed = "1";
      var obj = {
        todoId: todo._id,
        status: "1",
      }
      GatewayService.changeTodos(obj)
        .then(function(res) {
          console.log(res);
        })
    }

    function dateDiffInDays(a, b) {
      var _MS_PER_DAY = 1000 * 60 * 60 * 24;
      var utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
      var utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
      var difference = parseInt(Math.floor((utc1 - utc2) / _MS_PER_DAY));
      return difference;
    }
    var filterTodos = function(todos, filter) {
      var dateDifference = 0;
      if (filter == 'today') {
        var dateDifference = 0;
      } else if (filter == 'week') {
        var dateDifference = 7;
      } else if (filter == 'month') {
        var dateDifference = 30;
      } else {
        var dateDifference = 365;
      }
      return (todos.filter(function(t) {
        var diff = dateDiffInDays(new Date(t.dueDate), new Date());
        return diff <= dateDifference
      }))

    }

    // var sDate = new Date("2017-12-05T18:30:00.000Z");
    // console.log(dateDiffInDays(sDate, new Date()));
  }
})();
