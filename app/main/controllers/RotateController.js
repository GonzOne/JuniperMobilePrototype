'use strict';
angular.module('main')
  .controller('RotateController', function ($scope, $state, $cordovaDeviceMotion, $timeout, $log) {
    var vm = this;
    vm.currAcceleration = {x: null, y: null};
    vm.prevAcceleration = {x: null, y: null};
    vm.options = { frequency: 500, deviation: 5 };
    vm.watch = null;
    vm.cancelWatch = false;
    //exports
    vm.onGesture = onGesture;
    function onGesture (gesture) {
      switch (gesture) {
        case 'swipe_left':
          if (vm.watch) {
            vm.cancelWatch = true;
            $timeout.cancel(vm.timer);
            vm.watch.clearWatch();
          }
          $state.go('intro');
          break;
        case 'swipe_right':
          break;
        default:
      }
    }
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
        if (!vm.cancelWatch) {
          stopWatching();
          navigate();
          vm.prevAcceleration = {x: null, y: null};
        }

      } else {
        vm.prevAcceleration = {x: acceleration.x, y: acceleration.y};
      }

    }

    function stopWatching () {
      vm.watch.clearWatch();
      $timeout.cancel(vm.timer);
      vm.timer = $timeout(function () {
        watchMotion();
      }, 800);
    }

    function navigate () {
      $log.log('RotateController navigate called : vm.currAcceleration ', vm.currAcceleration);
      if (vm.currAcceleration.x < -1) {
        vm.cancelWatch = true;
        $timeout.cancel(vm.timer);
        vm.watch.clearWatch();
        $state.go('intro');
      }
      if (vm.currAcceleration.y > 9) {
        vm.cancelWatch = true;
        $timeout.cancel(vm.timer);
        vm.watch.clearWatch();
        $state.go('menu', {stateId: 'rotate'});
      }
    }

    $scope.$on('$ionicView.enter', function () {
      vm.cancelWatch = false;
    });

    $scope.$on('$ionicView.beforeLeave', function () {
      $log.log('RotateController $ionicView.beforeLeave : watch ', vm.watch);
      if (vm.watch) {
        vm.cancelWatch = true;
        $timeout.cancel(vm.timer);
        vm.watch.clearWatch();
      }
    });
    $scope.$on('$ionicView.afterEnter', function () {
      vm.timer = $timeout(function () {
        watchMotion();
      }, 1000);
    });
    $scope.$on('$destroy', function () {
      $log.log('RotateController Controller $destroy : watch ', vm.watch);
      if (vm.watch) {
        vm.cancelWatch = true;
        $timeout.cancel(vm.timer);
        vm.watch.clearWatch();
      }
    });

  });
