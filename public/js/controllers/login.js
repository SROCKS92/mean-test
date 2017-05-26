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
						console.log(data);
						// $location.path("/dashboard");
						if(data.password==$scope.formLogin.password){
							window.location='/#/dashboard/'+data.userid;
                                $scope.formLogin = {};
						}
						
						 
						//$scope.todos = data; 
					});
			}


		}
		}])
  ;
