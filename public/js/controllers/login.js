angular.module('login', ['ngCookies', 'ui.bootstrap'])

.controller('loginController', ['$scope', '$http', 'Userprofile', '$routeParams', 'Clock', '$cookieStore', function($scope, $http, Userprofile, $routeParams, Clock, $cookieStore) {
	$scope.formData = {};
	$scope.loading = true;
	$scope.error = false;



	$scope.login = function() {
		if ($scope.formLogin.userid != undefined && $scope.formLogin.password != undefined) {
			$scope.loading = true;

			//console.log($scope.formLogin);
			//$http.post('/api/userprofile/login',$scope.formLogin)
			Userprofile.findUser($scope.formLogin)


			.then(function(data) {
				$scope.loading = false;

				//	console.log($cookieStore);
				// $location.path("/dashboard");
				if (data.data.password == $scope.formLogin.password) {
					//
					// $scope.userData=data;
					//$scope.userData.remaintime=Userprofile.calculateTime(data,$scope.$parent.todos);
					$scope.error = false;
					$cookieStore.put('userName', data.data.userid);
					$cookieStore.put('userD', data.data._id);

					window.location = '/#!/dashboard/' + data.data.userid;
				} else {
					$scope.formLogin = {};
					$scope.error = true;
				}

			});
		}
	};
	$scope.initUser = function() {
		var login = {
			'userid': $cookieStore.get('userName')
		};

		Userprofile.findUser(login)
			.then(function(data) {
					console.log(data.data.path);
					$scope.userData = data.data;
					$scope.userData.remaintime = Userprofile.calculateTime(data.data, $scope.$parent.todos);
					$scope.userData.path = data.data.path.slice(7);

				}


			)
	};
	Clock.TimeCtrl($scope);
	$scope.logout = function() {
		$cookieStore.remove('userName');
		$cookieStore.remove('userD');
	};



}]);