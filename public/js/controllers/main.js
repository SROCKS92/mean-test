angular.module('userController', [])

// inject the Todo service factory into our controller
.controller('mainController', ['$scope', '$http', 'Users', 'Userprofile', function($scope, $http, Users, Userprofile) {
		$scope.formData = {};
		$scope.loading = true;
        // console.log($routeParams.id);
		function checkid(input, id) {
			var i = 0,
				len = input.length;
			for (; i < len; i++) {
				if (input[i].text == id) {
					return input[i];
				}
			}
			return null;
		};

		Users.get()
			.success(function(data) {
				$scope.todos = data;
				//console.log(data);
				$scope.loading = false;
			});


		$scope.createTodo = function() {
			//alert();


			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				//console.log($scope.formData);
				Users.create($scope.formData)


				.success(function(data) {
					$scope.loading = false;
					$scope.formData = {};
					$scope.todos = data;
				});
			}
		};


		$scope.addComment = function() {
			//alert();


			if ($scope.formExtra.text != undefined) {
				$scope.loading = true;

				//console.log($scope.formData);
				Users.comment($scope.formExtra)


				.success(function(data) {
					$scope.loading = false;
					$scope.formExtra = {};
					$scope.Extra = data;
				});
			}
		};
		Userprofile.get()
			.success(function(data) {
				$scope.users = data;

				console.log(abs);
				$scope.jsData;
				//$scope.users.remaintime=[];
				for (var i = 0; i < data.length; i++) {
					var currentData = data[i];
					var abs = checkid($scope.todos, currentData.taskname);

					var d = new Date(currentData.created_at);
					d.setHours(d.getHours() + Number(abs.time));
					var n = new Date();
					var check = parseInt(((n - d) / 1000) / 3600) - (abs.time != '' ? abs.time : 0);
					$scope.users[i].remaintime = check<0?'Timeout':check;

				}



				//console.log($scope.users);
				$scope.loading = false;
			});

		$scope.createUser = function() {
			//  alert();

			if ($scope.formUser.firstname != undefined) {
				$scope.loading = true;


				Userprofile.create($scope.formUser)


				.success(function(data) {
					$scope.loading = false;
					$scope.formUser = {};
					$scope.users = data;
				});
			}
		};
		$scope.deleteUser = function(id) {
			$scope.loading = true;

			Userprofile.delete(id)

			.success(function(data) {
				$scope.loading = false;
				$scope.users = data;
			});
		};
		$scope.clock = Date.now();


		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Users.delete(id)

			.success(function(data) {
				$scope.loading = false;
				$scope.todos = data;
			});
		};

	}]);