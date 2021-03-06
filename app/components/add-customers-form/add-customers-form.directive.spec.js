describe('gt.components.add-customers-form', function () {
    var object;
    beforeEach(module('gt.components.add-customers-form', function($provide) {
        object = [{ name: 'value' }];
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
        directive = directiveBuilder.$build('<add-customers-form></add-customers-form>', {
            edit: [{}]
        });
    }));

    it('element should not be null', function () {
        expect(directive.element).toBeTruthy();
    });

    it('saveCustomer should save new customer', function () {
        var scope = directive.scope;
        scope.customers = [
            {
                id: 0,
                firstName: '',
                lastName: '',
                city: '',
                orders: []
            }
        ];

        scope.firstName = 'a';
        scope.lastName = 'a';
        scope.city = 'a';
        scope.editingBookmarkId = null;
        scope.saveCustomer();
    });

    it('clearCustomerInfo should clear the form', function () {
        var scope = directive.scope;

        scope.clearCustomerInfo();
    });
});
