angular.module('gdansk-training', [
    'gt.components.customers-app',
    'gt.components.add-customers-form',
    'gt.components.customers-list',
    'gt.components.customer-orders',
    'mongolab-factory',
    'gdanskTraining.templates',
    'gdanskTraining-constant',
    'ui.router'
]).config(function(mongolabFactoryProvider, $stateProvider, $urlRouterProvider) {
    mongolabFactoryProvider.setConfigs({
        dataBase: 'customers-app',
        apiKey: 'Xdh27t0ATpYntQE8kxQcvIkLZzPaOb6Z'
    });

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('orders', {
            url: '/orders/:customerId',
            template: '<customer-orders></customer-orders>'
        });

}).run(function ( $log, gdanskTrainingVersion, $rootScope ) {
    $rootScope.field1 = 'root';
    if ( !gdanskTrainingVersion ) { return; }
    $log.info('app version: ' + gdanskTrainingVersion);
}).directive('gdanskTraining', function () {
    return { templateUrl: 'app/app.module.html' };
});

angular.module('gdanskTraining.templates', []);

try {
    angular.module('gdanskTraining-constant');
} catch ( error ) {
    angular.module('gdanskTraining-constant', []).constant('gdanskTrainingVersion', null);
}
