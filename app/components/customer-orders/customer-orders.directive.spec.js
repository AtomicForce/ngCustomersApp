describe('gt.components.customer-orders', function () {
    var object;
    beforeEach(module('gt.components.customer-orders', function($provide) {
        object = [{ customers: [{}] }];
        $provide.factory('mongolabFactory', function($q) {
            return {
                'save': function() {
                    var fakePromise = $q.defer();
                    fakePromise.resolve(object);
                    return {$promise:fakePromise.promise};
                },
                'update': function() {
                    var fakePromise = $q.defer();
                    fakePromise.resolve(object);
                    return {$promise:fakePromise.promise};
                }
            };
        });
    }));

    var directive;
    beforeEach(inject(function ($compile, $rootScope, directiveBuilder) {
        directive = directiveBuilder.$build('<customer-orders></customer-orders>', {
            customers: [
                {
                    _id: {
                        $oid: ''
                    },
                    id: 0,
                    firstName: '',
                    lastName: '',
                    city: '',
                    orders: [{
                        id: 0
                    }]
                }
            ]
        });
    }));

    it('element should not be null', function () {
        expect(directive.element).toBeTruthy();
    });

    it('saveOrder should save new order', function () {
        var scope = directive.scope;

        scope.productName = 'a';
        scope.quantity = 1;
        scope.productPrice = 1;
        scope.editingBookmarkId = null;
        scope.saveOrder();
    });

    it('clearOrder should clear the order form', function () {
        var scope = directive.scope;

        scope.clearOrder();
    });

    it('editOrder should edit the order', function () {
        var scope = directive.scope;

        scope.editOrder(0);
    });

    it('deleteOrder should be called', function () {
        var scope = directive.scope;

        scope.deleteOrder(0);
    });
});
