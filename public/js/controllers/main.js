angular.module('userController', ['ngFileUpload'])


.controller('mainController', ['$scope', '$http','Upload' ,'Users', 'Userprofile','$location', function($scope,$http,Upload, Users, Userprofile,$location) {
	$scope.formData = {};
	$scope.loading = true;
	$scope.addComment = function() {
		//alert();


		if ($scope.formExtra.comment != undefined) {
			$scope.loading = true;

			//console.log($scope.formData);
			Users.comment($scope.formExtra)


			.success(function(data) {
				$scope.loading = false;
				$scope.formExtra = {};
				$scope.formExtra = data;
			});
		}
	};
	//       console.log($routeParams.id);
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
	$scope.getcomment = function() {

		Users.getcomment()
			.success(function(data) {
				$scope.comments = data;
			//	console.log(data);
				$scope.loading = false;
			});

	}
	$scope.getcomment();
	Userprofile.get()
		.success(function(data) {

			calculateTime(data);


			//console.log($scope.users);
			$scope.loading = false;
		});

	function calculateTime(data) {

		$scope.users = data;


		$scope.jsData;
		//$scope.users.remaintime=[];
		
			for (var i = 0; i < data.length; i++) {
				var currentData = data[i];
				var abs = checkid($scope.todos, currentData.taskname);

				var d = new Date(currentData.created_at);
				d.setHours(d.getHours() + Number(abs.time));
				var n = new Date();
				var check = parseInt(((n - d) / 1000) / 3600) - (abs.time != '' ? abs.time : 0);
				$scope.users[i].remaintime = check < 0 ? 'Timeout' : check;

			}
		

	}

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
	$scope.upload = function (file) {
		console.log(file);
        Upload.upload({
            url: '/api/upload/image',
            data: {file: file}
        }).then(function (resp) {
          $scope.formUser.path=resp.data;
        });
    };

	$scope.onFileSelect = function(image) {
		alert('asd');
  $scope.uploadInProgress = true;
  $scope.uploadProgress = 0;

  if (angular.isArray(image)) {
    image = image[0];
  }

  $scope.upload = $upload.upload({
    url: '/api/upload/image',
    method: 'POST',
    data: {
      type: 'profile'
    },
    file: image
  }).progress(function(event) {
    $scope.uploadProgress = Math.floor(event.loaded / event.total);
    $scope.$apply();
  }).success(function(data, status, headers, config) {
    AlertService.success('Photo uploaded!');
  }).error(function(err) {
    $scope.uploadInProgress = false;
    AlertService.error('Error uploading file: ' + err.message || err);
  });
};

}]);