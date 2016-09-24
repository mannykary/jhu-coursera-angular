(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyShoppingController', ToBuyShoppingController)
    .controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyShoppingController(ShoppingListCheckOffService) {
    var toBuyCtrl = this;
    toBuyCtrl.itemToAdd = '';

    toBuyCtrl.addItem = function () {
      // TODO add error checking.
      var quantity = toBuyCtrl.itemToAdd.replace(/(^\d+)(.+$)/i, '$1'),
          name = toBuyCtrl.itemToAdd.replace(quantity, '');

      //var itemToAddArray = toBuyCtrl.itemToAdd.split(' ');
      // var name = itemToAddArray[1],
      //     quantity = itemToAddArray[0];
      ShoppingListCheckOffService.addItemToBuy(name, quantity);
      toBuyCtrl.itemToAdd = '';
    };

    toBuyCtrl.buyItem = function (item) {
      ShoppingListCheckOffService.buyItem(item);
    };

    toBuyCtrl.toBuyItems = ShoppingListCheckOffService.toBuyItems;
    toBuyCtrl.alreadyBoughtItems = ShoppingListCheckOffService.alreadyBoughtItems;

    toBuyCtrl.everythingIsBought = function () {
      return toBuyCtrl.toBuyItems.length === 0 && toBuyCtrl.alreadyBoughtItems.length > 0;
    };

    toBuyCtrl.shoppingListEmpty = function () {
      return toBuyCtrl.toBuyItems.length === 0 && toBuyCtrl.alreadyBoughtItems.length === 0;
    };

  }

  AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
    var alreadyBoughtCtrl = this;

    alreadyBoughtCtrl.alreadyBoughtItems = ShoppingListCheckOffService.alreadyBoughtItems;
  }

  function ShoppingListCheckOffService() {
    var service = this;

    service.toBuyItems = [];
    service.alreadyBoughtItems = [];

    service.addItemToBuy = function (name, quantity) {
      service.toBuyItems.push({
        name: name,
        quantity: quantity
      });
    };

    service.buyItem = function (itemToBuy) {
      for (var i = 0; i < service.toBuyItems.length; i++) {
        var item = service.toBuyItems[i];
        if (item.name === itemToBuy.name) {
          service.toBuyItems.splice(item, 1);
          console.log(service.alreadyBoughtItems);
          console.log(item);
          service.alreadyBoughtItems.push(item);
          break;
        }
      }
    };

    return service;
  }


}());