(function() {
  'use strict';

  angular
  .module('testes2')
  .controller('ListCtrl', Controller);

  Controller.$inject = ['$scope', '$mdDialog', '$mdToast'];

  function Controller($scope, $mdDialog, $mdToast) {
    var vm = this;
    vm.list = [{type: 'D', value: 100}, {type: 'D', value: 150}, {type: 'S', value: 75}, {type: 'D', value: 200}];
    vm.launch = {};
    vm.required = {};
    vm.balance = 0;
    const _MSG_SUCESS_DELETE = 'Lançamento deletado com sucesso!';
    const _MSG_SUCCESS_INSERT = 'Lançamento inserido com sucesso!';

    vm.init = function() {
      for (var i = 0; i < vm.list.length; i++) {
        vm.list[i].type == 'D' ? vm.balance += vm.list[i].value : vm.balance -= vm.list[i].value;
      }
    }

    vm.modal = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: '../view/new.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: $scope.customFullscreen
      })
      .then(function(answer) {

      }, function() {

      });
    };

    vm.delete = function(ev, item) {
      var confirm = $mdDialog.confirm()
      .title('Deseja realmente deletar o registro?')
      .ariaLabel('delete')
      .ok('Deletar')
      .cancel('Cancelar')
      .targetEvent(ev);
      $mdDialog.show(confirm).then(function() {
        item.type == 'D' ? vm.balance -= item.value : vm.balance += item.value;
        var index = vm.list.indexOf(item);
        vm.list.splice(index, 1);
        showToast(_MSG_SUCESS_DELETE);
      }, function() {

      });
    };

    function DialogController($scope, $mdDialog) {
      $scope.save = function(obj, ev) {
        if(obj.type == 'S' && vm.balance < obj.value){
          $mdDialog.show(
            $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Saldo insuficiente!')
            .textContent('O valor do saque deve ser menor que o Total em conta.')
            .ariaLabel('saldo insuficiente')
            .ok('Ok')
            .targetEvent(ev)
          );
        } else {
          obj.type == 'D' ? vm.balance += obj.value : vm.balance -= obj.value;
          vm.list.push(obj);
          vm.launch = {};
          $mdDialog.hide();
          showToast(_MSG_SUCCESS_INSERT);
        }

      }
    };

    function showToast(msg) {
      $mdToast.show(
        $mdToast.simple()
        .textContent(msg)
        .position('bottom', 'left')
        .hideDelay(3000)
      );
    };

  }
})();
