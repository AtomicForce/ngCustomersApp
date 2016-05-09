describe('gt.components.customers-app', function () {
    var object;
    beforeEach(module('gt.components.customers-app', function($provide) {
        object = [{ name: 'value' }];
        $provide.factory('mongolabFactory', function($q) {
            return {
                'query': function() {
                    var fakePromise = $q.defer();
                    fakePromise.resolve(object);
                    return {$promise:fakePromise.promise};
                }
            };
        });
    }));

    var directive;
    beforeEach(inject(function ($compile, $rootScope, directiveBuilder) {
        directive = directiveBuilder.$build('<customers-app></customers-app>');
    }));

    it('element should not be null', function () {
        expect(directive.element).toBeTruthy();
    });
});
