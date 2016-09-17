(function () {
  'use strict';

  angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.dishes = [];
    $scope.message = '';

    $scope.checkIfTooMuch = function () {
      if ($scope.dishes) {
        var dishesArray = $scope.dishes.split(',').filter(function (n) {
          return n.trim() != ''; // Filter out anything that is an empty string.
        });
        var numDishes = dishesArray.length;

        if (numDishes > 3) {
          $scope.message = 'Too much!';
        } else if (numDishes > 0 && numDishes <= 3) {
          $scope.message = 'Enjoy!';
        } else {
          // This should never happen, but throw error if it does.
          throw 'numDishes is invalid';
        }
      } else {
        $scope.message = 'Please enter data first';
      }
    };
  }
})();