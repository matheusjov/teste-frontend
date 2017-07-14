(function(angular) {
  'use strict';

  angular.module('testes2').config(config);

  config.$inject = ['$routeProvider'];

  function config($routeProvider) {
    registerStudentRoute($routeProvider);
  }

  function registerStudentRoute($routeProvider) {
    $routeProvider
			.when('/list', {
				templateUrl: 'view/list.html',
				controller: 'ListCtrl',
				controllerAs: 'vm'
			})
      .otherwise({
      redirectTo: '/list'
    });
  }

})(angular);
