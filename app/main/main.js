'use strict';
angular.module('main', [
  'ionic',
  'ngCordova',
  'ui.router',
])
.run(function ($ionicPlatform) {

  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins) {
      window.plugins.StatusBar.hide();
    }
  });

})
.config(function ($ionicConfigProvider) {
  $ionicConfigProvider.views.transition('none');
})
.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/main');
  $stateProvider
    .state('main', {
      url: '/main',
      templateUrl: 'main/templates/load.html',
      controller: 'LoadController as loadController'
    })
    .state('intro', {
      url: '/intro',
      templateUrl: 'main/templates/intro.html',
      controller: 'IntroController as introController'
    })
    .state('manage', {
      url: '/manage',
      templateUrl: 'main/templates/manage.html',
      controller: 'ManageController as manageController'
    })
    .state('rotate', {
      url: '/rotate',
      templateUrl: 'main/templates/rotate.html',
      controller: 'RotateController as rotateController'
    })
    .state('manageSpec', {
      url: '/manage-spec',
      templateUrl: 'main/templates/manageSpec.html',
      controller: 'ManageSpecController as manageSpecController'
    })
    .state('scalability', {
      url: '/scalability',
      templateUrl: 'main/templates/scalability.html',
      controller: 'ScalabilityController as scalabilityController'
    })
    .state('scalabilitySlots', {
      url: '/scalability-slots',
      templateUrl: 'main/templates/scalabilitySlots.html',
      controller: 'ScalabilitySlotsController as scalabilitySlotsController'
    })
    .state('reliability', {
      url: '/reliability-slots',
      templateUrl: 'main/templates/reliability.html',
      controller: 'ReliabilityController as reliabilityController'
    })
    .state('menu', {
      url: '/menu/:stateId',
      templateUrl: 'main/templates/menu.html',
      controller: 'MenuController as menuController',
      resolve: {
        prevState: ['$stateParams',
          function ($stateParams) {
            return {value: $stateParams.stateId};
          }
        ]
      }
    });
});
