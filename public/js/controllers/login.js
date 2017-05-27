angular.module('login',[])

.controller('loginController', ['$scope','$http','Userprofile', function($scope,$http,Userprofile) {
		$scope.formData = {};
		$scope.loading = true;

		
		
$scope.login=function() {
			if ($scope.formLogin.userid != undefined && $scope.formLogin.password != undefined) {
				$scope.loading = true;

				//console.log($scope.formLogin);
				//$http.post('/api/userprofile/login',$scope.formLogin)
				Userprofile.findUser($scope.formLogin)

					
					.success(function(data) {
						$scope.loading = false;
						//console.log(data);
						// $location.path("/dashboard");
						if(data.password==$scope.formLogin.password){
							window.location='/#/dashboard/'+data.userid;
						//	calculateTimes(data);
                                $scope.formLogin = {};
						}
						
						 
						//$scope.todos = data; 
					});
			}


		}

	/*	function checkids(input, id) {
		var i = 0,
			len = input.length;
		for (; i < len; i++) {
			if (input[i].text == id) {
				return input[i];
			}
		}
		return null;
	};
	function calculateTimes(data) {

		$scope.userCheck = data;

                 console.log(data);
			
				var currentData = data;
				var abs = checkids($scope.todos, currentData.taskname);
                    
				var d = new Date(currentData.created_at);
				d.setHours(d.getHours() + Number(abs.time));
				var n = new Date();
				var check = parseInt(((n - d) / 1000) / 3600) - (abs.time != '' ? abs.time : 0);
				$scope.userCheck.remaintime = check < 0 ? 'Timeout' : check;

			
		

	} */
		}])
  ;
