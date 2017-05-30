angular.module('userController', ['ngFileUpload', 'ui.bootstrap', 'ngCookies'])


.controller('mainController', ['$scope', '$route', '$http', 'Upload', 'Users', 'Userprofile', '$location', '$uibModal', '$cookieStore', function($scope, $route, $http, Upload, Users, Userprofile, $location, $uibModal, $cookieStore) {
  $scope.formData = {};
  $scope.loading = true;
  $scope.formExtra = {};
  $scope.formEdit = {};
  $scope.$route = $route;
  // $scope.formEdit.firstname="sarang";
  function getEditUser(){

     Userprofile.getone({
      '_id': $cookieStore.get('userD')
    })
    .then(function(data) {
      $scope.loading = false;
      $scope.formEdit = {};
      console.log(data);
      $scope.formEdit = data.data;
    });

  }
 
  //console.log($scope.formEdit);
  $scope.addComment = function() {
    //alert();

    // console.log($scope.formExtra);
    if ($scope.formExtra.comment != undefined) {
      $scope.loading = true;

      //console.log($scope.formData);
      Users.comment($scope.formExtra)


      .then(function(data) {
        $scope.loading = false;
        $scope.formExtra = {};
        $scope.formExtra = data.data;
      });
    }
  };
  $scope.open = function() {
    getEditUser();
    //console.log($scope.formEdit);
    var modalInstance = $uibModal.open({
      templateUrl: 'js/partial/popup.html',
      controller: 'AddCtrl',
      scope: $scope,
    });
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
    .then(function(data) {
      $scope.todos = data.data;
      //console.log(data);
      $scope.loading = false;
    });


  $scope.createTodo = function() {
    //alert();


    if ($scope.formData.text != undefined) {
      $scope.loading = true;

      //console.log($scope.formData);
      Users.create($scope.formData)


      .then(function(data) {
        $scope.loading = false;
        $scope.formData = {};
        $scope.todos = data.data;
      });
    }
  };
  $scope.getcomment = function() {

    Users.getcomment()
      .then(function(data) {
        $scope.comments = data.data;
        //  console.log(data);
        $scope.loading = false;
      });

  }
  $scope.getcomment();
  Userprofile.get()
    .then(function(data) {
      //   Userprofile.calculateTime(data,$scope.todos);
      //  $scope.calculateTime(data);


      //console.log($scope.users);
      $scope.loading = false;
    });



  $scope.createUser = function() {
    //  alert();

    if ($scope.formUser.firstname != undefined) {
      $scope.loading = true;


      Userprofile.create($scope.formUser)


      .then(function(data) {
        $scope.loading = false;
        $scope.formUser = {};
        $scope.users = data.data;
      });
    }
  };
  $scope.updateUser = function() {
    if ($scope.formEdit.firstname != undefined) {
      $scope.loading = true;

      // console.log($scope.formEdit);
      Userprofile.update($scope.formEdit)


      .then(function(data) {
        $scope.loading = false;
        $scope.formEdit = {};
        $scope.initUser();
        // console.log(data.data);
        //   $scope.userData = $scope.formEdit;

      });
    }

  }
  $scope.deleteUser = function(id) {
    $scope.loading = true;

    Userprofile.delete(id)

    .then(function(data) {
      $scope.loading = false;
      $scope.users = data.data;
    });
  };
  $scope.clock = Date.now();


  $scope.deleteTodo = function(id) {
    $scope.loading = true;

    Users.delete(id)

    .then(function(data) {
      $scope.loading = false;
      $scope.todos = data.data;
    });
  };
  $scope.upload = function(file) {
    $scope.uploadProgress = 0;
    //console.log(file);
    Upload.upload({
        url: '/api/upload/image',
        data: {
          file: file
        }
      })
      .then(function(resp) {
        $scope.formUser.path = resp.data;
        // $scope.formEdit.path = resp.data.data;
      });
  };
  $scope.eupload = function(file) {
    //  $scope.uploadProgress = 0;
    //   console.log(file);
    Upload.upload({
        url: '/api/upload/image',
        data: {
          file: file
        }
      })
      .then(function(resp) {
        console.log(resp.data)
          //$scope.formUser.path!=undefined?$scope.formUser.path = resp.data.data:'';
        $scope.formEdit.path = resp.data;
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
    }).then(function(data, status, headers, config) {
      AlertService.then('Photo uploaded!');
    }).error(function(err) {
      $scope.uploadInProgress = false;
      AlertService.error('Error uploading file: ' + err.message || err);
    });
  };

}])

.controller('AddCtrl', ['$scope', '$uibModalInstance',
  function($scope, $uibModalInstance) {

    $scope.close = function() {

      $uibModalInstance.dismiss('reason');
      // window.location.reload();
    };
  }
]);;