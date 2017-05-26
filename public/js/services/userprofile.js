angular.module('UserprofileService',[])

   .factory('Userprofile', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/userprofile');
			},
			create : function(todoData) {
				return $http.post('/api/userprofile', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/userprofile/' + id);
			},
             findUser : function(data) {
				return $http.post('/api/userprofile/login',data);
			}
		}
	}]);