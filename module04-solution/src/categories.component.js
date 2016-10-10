(function() {
  'use strict';

  // Create categories.component.js file and create component called categories that shows all available
  // categories in the menu to the user.

  angular.module('MenuApp')
    .component('categoriesList', {
      templateUrl: 'src/templates/categories-list.html',
      bindings: {
        categories: '<'
      }
    });
})();