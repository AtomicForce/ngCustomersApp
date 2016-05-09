angular.module('gt.components.customer-orders', [])
.directive('customerOrders', function(mongolabFactory) {
    return {
        templateUrl: 'app/components/customer-orders/customer-orders.html',
        link: function($scope, $element, $attr) {
            var urlArr = window.location.hash.split('/');
            var customerId = urlArr[urlArr.length - 1];

            $scope.totalPrice = 0;
            $scope.customerOrdersArr = $scope.customers[customerId].orders;
            $scope.customerOrdersArr.forEach(function(order) {
                return $scope.totalPrice += order.quantity * order.price;
            });

            $scope.saveOrder = function() {
                if ($scope.productName && $scope.quantity && $scope.productPrice && $scope.editingOrderId === null) {
                    var newOrder = {
                        id: $scope.customers[customerId].orders.length,
                        product: $scope.productName,
                        quantity: $scope.quantity,
                        price: $scope.productPrice
                    };

                    $scope.customers[customerId].orders.push(newOrder);

                    mongolabFactory.update({id: $scope.customers[customerId]._id.$oid}, $scope.customers[customerId]).$promise.then(function(resource) {
                        $scope.totalPrice = 0;
                        $scope.customerOrdersArr.forEach(function(order) {
                            return $scope.totalPrice += order.quantity * order.price;
                        });

                        $scope.productName = '';
                        $scope.quantity = '';
                        $scope.productPrice = '';
                        $scope.editingOrderId = null;
                    });
                } else if ($scope.editingOrderId !== null) {
                    var _tmp = {
                        id: $scope.editingOrderId,
                        product: $scope.productName,
                        quantity: $scope.quantity,
                        price: $scope.productPrice
                    };

                    $scope.customers[customerId].orders.forEach(function(order, i) {
                        if(order.id === $scope.editingOrderId) {
                            $scope.customers[customerId].orders[i] = _tmp;
                        }
                    });

                    mongolabFactory.update({id: $scope.customers[customerId]._id.$oid}, $scope.customers[customerId]).$promise.then(function(resource) {
                        $scope.totalPrice = 0;
                        $scope.customers[customerId].orders.forEach(function(order) {
                            return $scope.totalPrice += order.quantity * order.price;
                        });

                        $scope.productName = '';
                        $scope.quantity = '';
                        $scope.productPrice = '';
                        $scope.editingOrderId = null;
                    });
                } else {
                    $scope.errorMsgOrders = "Please fill all fields!";
                }
            }

            $scope.clearOrder = function() {
                $scope.productName = '';
                $scope.quantity = '';
                $scope.productPrice = '';
                $scope.editingOrderId = null;
            };

            $scope.editOrder = function(orderId) {
                $scope.customers[customerId].orders.forEach(function(order) {
                    if(order.id === orderId) {
                        $scope.productName = order.product;
                        $scope.quantity = order.quantity;
                        $scope.productPrice = order.price;
                        $scope.editingOrderId = orderId;
                    }
                });
            };

            $scope.deleteOrder = function(orderId) {
                $scope.customers[customerId].orders.forEach(function(order, i) {
                    if(order.id === orderId) {
                        $scope.customers[customerId].orders.splice(i, 1);
                    }
                });

                mongolabFactory.update({id: $scope.customers[customerId]._id.$oid}, $scope.customers[customerId]).$promise.then(function(resource) {
                    $scope.totalPrice = 0;
                    $scope.customerOrdersArr.forEach(function(order) {
                        return $scope.totalPrice += order.quantity * order.price;
                    });
                });
            };
        }
    };
});
