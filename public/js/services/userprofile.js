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
			},
			calculateTime:function(data,todos) {

     //$scope.users = data;
     // $scope.jsData;
      //$scope.users.remaintime=[];
    //  for (var i = 0; i < data.length; i++) {
        var currentData = data;
        var checkid=function(input, id) {
      var i = 0,
        len = input.length;
      for (; i < len; i++) {
        if (input[i].text == id) {
          return input[i];
        }
      }
      return null;
    };
        var abs = checkid(todos, currentData.taskname);
        var d = new Date(currentData.created_at);
        d.setHours(d.getHours() + Number(abs.time));
        var n = new Date();
        var check=n-d;
        if(check>0){
           return "TimeOut";
        }
        else{
          var timeDiff = Math.abs(n - d);
         var diffDays = Math.ceil(timeDiff / (1000 * 60));
          return diffDays;
        }
     // }
    }

		}
	}]);