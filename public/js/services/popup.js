angular.module('PopupService', ['ui.bootstrap'])
  .factory('Popup', ['$scope', '$modal', function($scope, $modal) {
    return {
    open:function() {
      console.log('opening pop up');
      var modalInstance = $modal.open({
        templateUrl: 'popup.html',
      });
    }
  }
  }]);