angular.module('myApp', ['ui.router'])

.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home/0');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'home.html',
      abstract: true
    })

      .state('home.pos', {
        url: '/:pos?animate'
      })

    .state('about', {
      url: '/about',
      templateUrl: 'about.html'
    });

})

.run(function ($rootScope, $state) {
  $rootScope.$state = $state;
})

.controller('MainCtrl', function ($scope, $stateParams, $log) {

  $scope.$stateParams = $stateParams;

});
