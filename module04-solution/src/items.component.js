(function() {
  'use strict';

// Create items.component.js file and create a component called items that shows all of the menu items for a
// particular category.
// The categories and the items components should NOT directly use the MenuDataService to fetch their own data.
// Instead, the proper data should be simply passed into the component. (Hint: use the one-way < binding).

  angular.module('MenuApp')
  .component('itemsList', {
    templateUrl: 'src/templates/items-list.html',
    bindings: {
      items: '<'
    }
  });
})();
