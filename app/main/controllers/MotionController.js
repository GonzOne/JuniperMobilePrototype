'use strict';
angular.module('main')
    .controller('MotionController', function ($scope, $state, $cordovaDeviceMotion, $timeout, $log) {
      var vm = this;
      vm.currAcceleration = {x: null,
                             y: null};
      vm.prevAcceleration = {x: null,
                             y: null};
      vm.options = { frequency: 500, deviation: 10 };
      vm.watch;
      function watchMotion () {
        vm.watch = $cordovaDeviceMotion.watchAcceleration(vm.options);
        vm.watch.then(null, function (error) {
          $log.log('error', error);
        }, function (acceleration) {
          vm.currAcceleration.x = acceleration.x;
          vm.currAcceleration.y = acceleration.y;
          detectedMovement(acceleration);
        });
      }
      function detectedMovement (acceleration) {
        var measurementsChange = {};

        if (vm.prevAcceleration.x !== null) {
          measurementsChange.x = Math.abs(vm.prevAcceleration.x, acceleration.x);
          measurementsChange.y = Math.abs(vm.prevAcceleration.y, acceleration.y);
        }
        if (measurementsChange.x + measurementsChange.y > vm.options.deviation) {
          stopWatching();
          navigate();
          vm.prevAcceleration = {x: null, y: null};

        } else {
          vm.prevAcceleration = {x: acceleration.x, y: acceleration.y};
        }

      }
      function stopWatching () {
        vm.watch.clearWatch();
        $timeout(function () {
          watchMotion();
        }, 500);
      }
      function navigate () {
        /*
        $log.log('navigate : vm.currAcceleration ', vm.currAcceleration);
        if (vm.currAcceleration.x < -5) {
          $log.log('go to next state');
        } else if (vm.currAcceleration.x > 5) {
          $log.log('go to previous state');
        }
        if (vm.currAcceleration.y > 5) {
          $log.log('display menu');
        } else if (vm.currAcceleration.y < 5) {
          $log.log('menu - go to previous state');
        }
        */
      }
      $scope.$on('$ionicView.enter', function () {
      });

      $scope.$on('$ionicView.beforeLeave', function () {

      });
      $scope.$on('$ionicView.afterEnter', function () {
        $timeout(function () {
          watchMotion();
        }, 1000);
      });

    });
