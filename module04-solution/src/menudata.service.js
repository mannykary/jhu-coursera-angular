(function() {
  'use strict';

  angular.module('data')
    .service('MenuDataService', MenuDataService)
    .constant('API_BASE_PATH', 'https://davids-restaurant.herokuapp.com');

  MenuDataService.$inject = ['$http', 'API_BASE_PATH'];
  function MenuDataService($http, API_BASE_PATH) {

    var service = this;
    var allCategoriesPromise;
    var getItemsForCategoryPromises = {};

    service.getAllCategories = function() {
      if (!allCategoriesPromise) {
        console.log("No cached categories found. Fetching from server.");
        allCategoriesPromise = $http({
          method: 'GET',
          url: API_BASE_PATH + '/categories.json'
        }).then(function (result) {
          return result.data;
        });
      } else {
        console.log("Using cached categories.")
      }
      return allCategoriesPromise;
    };

    service.getItemsForCategory = function (categoryShortName) {
      if (!getItemsForCategoryPromises[categoryShortName]) {
        console.log("No cached items found for " + categoryShortName + ". Fetching from server.");
        getItemsForCategoryPromises[categoryShortName] = $http({
          method: 'GET',
          url: API_BASE_PATH + '/menu_items.json',
          params: {
            category: categoryShortName
          }
        }).then(function (result) {
          return result.data.menu_items;
        });
      } else {
        console.log("Using cached items for " + categoryShortName);
      }
      return getItemsForCategoryPromises[categoryShortName];
    };

    return service;
  }

})();