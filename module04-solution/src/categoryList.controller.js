(function() {
  'use strict';

  angular.module('MenuApp')
    .controller('CategoryListController', CategoryListController);

  CategoryListController.$inject = ['categories'];
  function CategoryListController(categories) {
    var catList = this;

    catList.categories = categories;
  }

})();