(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective)
  .constant('API_BASE_PATH', 'https://davids-restaurant.herokuapp.com');

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var nidCtrl = this;

    nidCtrl.searchTerm = '';

    nidCtrl.getMatchedMenuItems = function () {
      MenuSearchService.getMatchedMenuItems(nidCtrl.searchTerm)
        .then(function (response) {
          nidCtrl.found = response;
        }
      );
    };

    nidCtrl.removeItem = function (index) {
      nidCtrl.found.splice(index, 1);
    }

  }

  MenuSearchService.$inject = ['$http', 'API_BASE_PATH'];
  function MenuSearchService($http, API_BASE_PATH) {
    var service = this;
    var promise;

    var getAllItems = function() {
      if (!promise) {
        console.log("No cached results found. Fetching from server.");
        promise = $http({
          method: 'GET',
          url: API_BASE_PATH + '/menu_items.json'
        }).then(function (result) {
          return result.data.menu_items;
        });
      } else {
        console.log("Using cached results.")
      }
      return promise;
    };

    service.getMatchedMenuItems = function (searchTerm) {
      return getAllItems().then(function (data) {
        var foundItems = [];

        if (searchTerm) {
          for (var i = 0; i < data.length; i++) {
            var item = data[i];
            if (item.description.toLowerCase().includes(searchTerm.toLowerCase())) {
              foundItems.push(item);
            }
          }
        }

        return foundItems;
      });
    };

    return service;
  }

  function FoundItemsDirective() {
    var ddo = {
      restrict: 'E',
      scope: {
        foundItems: '<',
        onRemove: '&'
      },
      templateUrl: 'found_items.html'
    };

    return ddo;
  }

}());