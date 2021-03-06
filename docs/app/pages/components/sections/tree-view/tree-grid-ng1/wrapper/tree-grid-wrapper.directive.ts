angular.module('app').directive('uxdTreeGridWrapper', () => {
    return {
        restrict: 'E',
        template: require('./tree-grid-wrapper.directive.html'),
        controller: 'TreeGridDemoCtrl as vm',
        scope: true
    };
});

angular.module('app').controller('TreeGridDemoCtrl', ['$scope', '$displayPanel', TreeGridDemoCtrl]);

  function TreeGridDemoCtrl($scope: any, $displayPanel: any) {
    var vm = this;

    vm.$onDestroy = function() {
      $scope.$destroy();
    };

    let actions = require('!file-loader!./actions.html');
    let displayPanel = require('!file-loader!./displayPanel.html');
    let displayPanelFooter = require('!file-loader!./displayPanelFooter.html');

    vm.data = [{
      id: 1,
      title: 'Documents',
      date: new Date('2013-02-16'),
      type: 'folder',
      nodes: [{
        id: 12,
        title: 'Pictures',
        date: new Date('2013-05-28'),
        type: 'folder',
        nodes: [{
          title: 'Alcazar',
          date: new Date('2014-05-15'),
          type: 'item'
        }, {
          title: 'Citadel',
          date: new Date('2015-09-02'),
          type: 'item'
        }, {
          title: 'Donjon',
          date: new Date('2014-04-10'),
          type: 'item'
        }]
      }, {
        id: 11,
        title: 'Word files',
        date: new Date('2013-09-25'),
        type: 'folder',
        nodes: [{
          id: 111,
          title: 'Accounts',
          date: new Date('2013-10-04'),
          type: 'folder',
          nodes: [{
            title: 'Castle',
            date: new Date('2014-05-15'),
            type: 'item'
          }, {
            title: 'Estate',
            date: new Date('2015-08-03'),
            type: 'item'
          }, {
            title: 'Manor',
            date: new Date('2014-05-30'),
            type: 'item'
          }, {
            title: 'Mansion',
            date: new Date('2014-04-23'),
            type: 'item'
          }, {
            title: 'Villa',
            date: new Date('2015-09-21'),
            type: 'item'
          }]
        }]
      }]
    }, {
      id: 2,
      title: 'Emails',
      date: new Date('2013-03-17'),
      type: 'folder',
      nodes: [{
        id: 21,
        title: 'Inbox',
        date: new Date('2013-03-17'),
        type: 'folder',
        nodes: []
      }, {
        id: 22,
        title: 'Outbox',
        date: new Date('2013-03-17'),
        type: 'folder',
        nodes: []
      }]
    }, {
      id: 3,
      title: 'Empty',
      date: new Date('2016-06-02'),
      type: 'folder',
      nodes: []
    }];

    vm.columns = [{
      name: 'TITLE',
      value: 'title',
      width: '50%'
    }, {
      name: 'DATE',
      value: function (dataItem: any) {
        return dataItem.date ? dataItem.date.toLocaleDateString() : '';
      },
      width: '25%',
      tooltip: '{{item.date | date : \'fullDate\'}}'
    }, {
      name: 'ACTIONS',
      template: actions,
      width: '25%',
      headerClass: 'text-center',
      cellClass: 'item-actions text-center'
    }];

    vm.selected = null;

    vm.options = {
      childrenProperty: 'nodes'
    };

    // Display Panel
    vm.enableDisplayPanel = false;
    $scope.$watch('vm.enableDisplayPanel', function(nv: any) {
      if (nv && vm.currentRow) {
        showDisplayPanel(vm.currentRow);
      } else {
        hideDisplayPanel();
      }
    });

    // Watch the row with focus to show and update the display panel
    $scope.$watch('vm.currentRow', function(nv: any) {
      if (vm.enableDisplayPanel && nv) {
        showDisplayPanel(nv);
      }
    });

    // Events triggered by 'Previous' and 'Next' buttons
    $scope.$on('$displayPanelPrevious', function() {
      $displayPanel.movePrev();
    });
    $scope.$on('$displayPanelNext', function() {
      $displayPanel.moveNext();
    });

    var displayPanelScope = $scope.$new(true);
    function showDisplayPanel(row: any) {
      displayPanelScope.item = row.item;
      var modalOptions = {
        title: row.item.title,
        main: displayPanel,
        footer: displayPanelFooter,
        modalColumns: 'col-lg-6 col-md-7 col-sm-9 col-xs-10',
        top: 50,
        scope: displayPanelScope
      };
      var enablePrev = (row.element.prevAll('tr').length > 0);
      var enableNext = (row.element.nextAll('tr').length > 0);
      $displayPanel.open(row.element, modalOptions, false, enablePrev, enableNext);
    }

    function hideDisplayPanel() {
      if ($displayPanel.panelOpen()) {
        $displayPanel.close({ animate: false });
      }
    }

  }

angular.module('app').controller('TreeGridActionsCtrl', TreeGridActionsCtrl);

function TreeGridActionsCtrl() {
  var vm = this;

  vm.share = function(item: any) {
    // Action button behaviour goes here
  };

  vm.goToDetails = function(item: any) {
    // Action button behaviour goes here
  };

  vm.delete = function(item: any) {
    // Action button behaviour goes here
  };
}