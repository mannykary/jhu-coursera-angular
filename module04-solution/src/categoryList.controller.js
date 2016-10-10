(function() {
  'use strict';

  angular.module('MenuApp')
    .controller('CategoryListController', CategoryListController);

  CategoryListController.$inject = ['MenuDataService'];
  function CategoryListController(MenuDataService) {
    var catList = this;

    catList.$onInit = function () {
      MenuDataService.getAllCategories().then(function (data) {
        catList.categories = data;
      });
    };
  }

})();