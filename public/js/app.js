var app = angular.module('userTask', ['userController', 'userService', 'UserprofileService', 'login', 'ngRoute', 'clockService'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'js/partial/login.html',
        controller: 'loginController',
        activetab:'login'
      })
      .when('/register', {
        templateUrl: 'js/partial/register.html',
        controller: 'mainController',
         //activetab:'login'
      })
      .when('/todo', {
        templateUrl: 'js/partial/todo.html',
        controller: 'mainController',
        // activetab:'login'
      })
      .when('/dashboard/:id', {
        templateUrl: 'js/partial/dashboard.html',
        controller: 'loginController',
         activetab:'dashboard'
      }).otherwise({
        redirectTo: '/login'
      });
  });