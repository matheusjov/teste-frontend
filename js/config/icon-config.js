(function(angular) {
  'use strict';

  angular.module('testes2').config(config);

  config.$inject = ['$mdIconProvider'];

  function config($mdIconProvider) {
    $mdIconProvider
    .icon('action:delete', 'assets/icon/ic_delete.svg', 24)
    .icon('action:add', 'assets/icon/ic_add.svg', 24)
    .icon('list:saq', 'assets/icon/ic_money_saq.svg', 24)
    .icon('list:dep', 'assets/icon/ic_money_dep.svg', 24);
  }

})(angular);
