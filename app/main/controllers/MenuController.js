'use strict';
angular.module('main')
  .controller('MenuController', function (prevState, $scope, $state, $cordovaDeviceMotion, $timeout, $log) {
    var vm = this;
    vm.cancelWatch = false;
    vm.currAcceleration = {x: null, y: null};
    vm.prevAcceleration = {x: null, y: null};
    vm.options = { frequency: 500, deviation: 5 };
    vm.watch = null;
    //exports
    vm.goTo = goTo;
    function goTo (route) {
      vm.cancelWatch = true;
      $timeout.cancel(vm.timer);
      vm.watch.clearWatch();
      $state.go(route);
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
      vm.timer = $timeout(function () {
        watchMotion();
      }, 500);
    }

    function navigate () {
      $log.log('MenuController navigate : vm.currAcceleration ', vm.currAcceleration);
      if (vm.currAcceleration.y < 5) {
        vm.cancelWatch = true;
        $timeout.cancel(vm.timer);
        vm.watch.clearWatch();
        $log.log('MenuController : got to state ', prevState.value);
        $state.go(prevState.value);
      }
    }

    $scope.$on('$ionicView.enter', function () {
      vm.cancelWatch = false;
    });

    $scope.$on('$ionicView.beforeLeave', function () {
      $log.log('MenuController $ionicView.beforeLeave : watch ', vm.watch);
      if (vm.watch) {
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
      $log.log('MenuController $destroy : watch ', vm.watch);
      if (vm.watch) {
        $timeout.cancel(vm.timer);
        vm.watch.clearWatch();
      }
    });

  });
