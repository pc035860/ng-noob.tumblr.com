angular.module('myApp', ['ui.router'])

.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('index', {
      url: '/?theater'
    })
      .state('index.theater', {
        url: 'theater'
      });

})

.run(function ($rootScope, $state) {
  $rootScope.$state = $state;
})

.controller('MainCtrl', function ($scope, $stateParams, $log) {

  $scope.model = {};

  $scope.$stateParams = $stateParams;

});
