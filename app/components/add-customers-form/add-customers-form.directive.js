angular.module('gt.components.add-customers-form', [])
.directive('addCustomersForm', function (mongolabFactory) {
    return {
        templateUrl: 'app/components/add-customers-form/add-customers-form.html',
        link: function ($scope, $element, $attr) {
            $scope.editingCustomerId = null;

            $scope.$watch('edit', function() {
                if ($scope.edit[0]) {
                    $scope.editingCustomerId = $scope.edit[0].id;
                    $scope.firstName = $scope.edit[0].firstName;
                    $scope.lastName = $scope.edit[0].lastName;
                    $scope.city = $scope.edit[0].city;
                }
            });

            $scope.saveCustomer = function() {
                if ($scope.firstName && $scope.lastName && $scope.city && $scope.editingCustomerId === null) {
                    var customerId = $scope.customers.length ? $scope.customers.length : 0;

                    var item = {
                        id: customerId,
                        firstName: $scope.firstName,
                        lastName: $scope.lastName,
                        city: $scope.city,
                        orders: []
                    };

                    mongolabFactory.save(item).$promise.then(function(resource) {
                        $scope.customers.push(resource);
                    });
                } else if ($scope.editingCustomerId !== null) {
                    var _tmp = {
                        id: $scope.editingCustomerId,
                        firstName: $scope.firstName,
                        lastName: $scope.lastName,
                        city: $scope.city
                    };

                    $scope.customers.forEach(function(customer) {
                        if (customer.id === $scope.editingCustomerId) {
                            mongolabFactory.update({id: customer._id.$oid}, _tmp).$promise.then(function(resource) {
                                customer.firstName = $scope.firstName;
                                customer.lastName = $scope.lastName;
                                customer.city = $scope.city
                            });
                        }
                    });
                } else {
                    $scope.errorMsg = "Please fill all fields!";
                }
            };

            $scope.clearCustomerInfo = function() {
                $scope.firstName = '';
                $scope.lastName = '';
                $scope.city = '';
                $scope.editingCustomerId = null;
            };
        }
    };
});
