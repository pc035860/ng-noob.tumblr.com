angular.module('myApp', ['ui.router'])

.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/route1');

  $stateProvider

    .state('route1', {
      url: '/route1?d&e&f',
      templateUrl: 'route1.html'
    })

    .state('route2', {
      url: '/route2?a&b&c',
      templateUrl: 'route2.html'
    });

})

.run(function ($rootScope, $state) {
  $rootScope.$state = $state;
})

.controller('MainCtrl', function ($scope, $stateParams, $log) {

  $scope.locationChgLog = '';

  $scope.$stateParams = $stateParams;

  $scope.$watch('$stateParams', function(newValue, oldValue) {
    $scope.params = JSON.stringify(newValue, null, 2);
  }, true);

  $scope.$on('$stateChangeStart', function () {
    $scope.locationChgLog = '';
  });

  $scope.$on('$locationChangeSuccess', function () {
    var args = Array.prototype.slice.call(arguments);

    $scope.locationChgLog += (JSON.stringify({
        time: (new Date()).getTime(),
        from: args[2],
        to: args[1]
      }, null, 2) + '\n\n');
  });

});
