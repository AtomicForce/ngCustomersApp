describe('gt.components.customers-list', function () {
    var object;
    beforeEach(module('gt.components.customers-list', function($provide) {
        object = [{ name: 'value' }];
        $provide.factory('mongolabFactory', function($q) {
            return {
                'remove': function() {
                    var fakePromise = $q.defer();
                    fakePromise.resolve(object);
                    return {$promise:fakePromise.promise};
                }
            };
        });
    }));

    var directive;
    beforeEach(inject(function ($compile, $rootScope, directiveBuilder) {
        directive = directiveBuilder.$build('<customers-list></customers-list>', {}, {customersApp:{
            editCustomerCtr: function() {

            }
        }});
    }));

    it('element should not be null', function () {
        expect(directive.element).toBeTruthy();
    });
});
