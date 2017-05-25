angular.module('userService',[])

	.factory('Users', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/user');
			},
			create : function(todoData) {
				return $http.post('/api/user', todoData);
			},
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			}
		}
	}]);