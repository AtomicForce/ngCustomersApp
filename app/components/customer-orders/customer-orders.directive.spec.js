xdescribe('gt.components.customer-orders', function () {
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
        directive = directiveBuilder.$build('<customer-orders></customer-orders>');
    }));

    it('element should not be null', function () {
        expect(directive.element).toBeTruthy();
    });
});
