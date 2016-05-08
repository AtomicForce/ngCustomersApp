angular.module('gt.components.customers-app', ['getQueryParameter-service', 'mongolab-factory'])
.directive('customersApp', function (getQueryParameter, mongolabFactory, $timeout) {
    return {
        templateUrl: 'app/components/customers-app/customers-app.html',
        scope: {},
        controllerAs: 'ctrl',
        controller: function($scope) {
            this.editCustomerCtr = function(data) {
                $scope.edit = $scope.customers.filter(function(customer) {
                    return customer.id === data;
                });
            };
        },
        link: function ($scope, $element, $attr) {
            $scope.edit = [];

            $scope.filter = getQueryParameter('filter') || 'none';

            mongolabFactory.query().$promise.then(function(data) {
                $scope.customers = data;
            });

            $scope.filterResults = function() {
                $timeout(function () {
                    $scope.filter = getQueryParameter('filter');
                });
            };
        }
    };
});
