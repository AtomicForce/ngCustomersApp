angular.module('gt.components.customers-list', ['mongolab-factory'])
.directive('customersList', function (mongolabFactory) {
    return {
        templateUrl: 'app/components/customers-list/customers-list.html',
        require: '^customersApp',
        link: function ($scope, $element, $attr, customerAppCtr) {
            $scope.editCustomer = function(id) {
                customerAppCtr.editCustomerCtr(id);
            };

            $scope.deleteCustomer = function(id) {
                $scope.customers.forEach(function(customer, i) {
                    if (customer.id === id) {
                        mongolabFactory.remove({id: customer._id.$oid}).$promise.then(function(resource) {
                            $scope.customers.splice(i, 1);
                        });
                    }
                });
            };
        }
    };
});
