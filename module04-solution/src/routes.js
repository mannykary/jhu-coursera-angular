(function () {

  angular.module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home if no other URL matches
    $urlRouterProvider.otherwise('/');

    // Set up UI states
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'src/templates/home.html'
    })

    .state('categories', {
      url: '/categories',
      templateUrl: 'src/templates/categories.html',
      controller: 'CategoryListController as catList'
    })

    .state('items', {
      url: '/{categoryShortName}',
      templateUrl: 'src/templates/items.html',
      controller: 'ItemsListController as itemList',
      params: {
        categoryShortName: null
      }
    })
  }


})();