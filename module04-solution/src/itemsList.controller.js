(function() {
  'use strict';

  angular.module('MenuApp')
  .controller('ItemsListController', ItemsListController);

  ItemsListController.$inject = ['$stateParams', 'MenuDataService'];
  function ItemsListController($stateParams, MenuDataService) {
    var itemList = this;

    itemList.$onInit = function () {
      MenuDataService.getItemsForCategory($stateParams.categoryShortName).then(function (data) {
        itemList.items = data;
      });
    };
  }

})();