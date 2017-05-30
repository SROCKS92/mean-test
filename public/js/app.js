var app=angular.module('userTask',['userController','userService','UserprofileService','login','ngRoute','clockService'])
.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'js/partial/login.html',
        controller: 'loginController'
      })
      .when('/register', {
        templateUrl: 'js/partial/register.html',
        controller: 'mainController'
      })
       .when('/todo', {
        templateUrl: 'js/partial/todo.html',
        controller: 'mainController'
      })
        .when('/dashboard/:id', {
        templateUrl: 'js/partial/dashboard.html',
        controller: 'loginController'
      }).otherwise({
        redirectTo: '/login'
      });
  });
