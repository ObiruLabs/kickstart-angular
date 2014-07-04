(function (Modernizr) {
    var angularApp = 'YourProject',
        commonProduction = ['/dist/common.min.js'],
        indexProduction = ['/dist/index.min.js'],
        appProduction = ['/dist/app.min.js'],
        isProduction = commonProduction[0].match(/dist\/common\.min\.js/) === null,
        IE8_TEST = Modernizr.video,
        i;

    var commonDependencies = [
            'common', 'jquery', 'angular.min', 'angular-animate.min', 'angular-resource.min',
            'angular-sanitize.min', 'angular-spinner', 'app'
        ],
        indexDependencies = [
            'vendor/jquery.unveil.min', 'vendor/bootstrap'
        ],
        appDependencies = [];

    for (i = 0; i < commonDependencies.length; i++) {
        commonDependencies[i] = '/js/vendor/' + commonDependencies[i] + '.js';
    }

    for (i = 0; i < indexDependencies.length; i++) {
        indexDependencies[i] = '/js/' + indexDependencies[i] + '.js';
    }

    for (i = 0; i < appDependencies.length; i++) {
        appDependencies[i] = '/js/' + appDependencies[i] + '.js';
    }

    if (isProduction) {
        commonDependencies = commonProduction;
        indexDependencies = indexProduction;

        if (appDependencies.length !== 0) {
            appDependencies = appProduction;
        }
    }

    Modernizr.load([
        {
            test: IE8_TEST,
            nope: '/js/vendor/json3.js'
        },
        {
            test: Modernizr.mq('only all'),
            nope: '/js/vendor/respond.js'
        },
        {
            load: commonDependencies,
            complete: function () {
                $(document).ready(function () {
                    // Mix in non-conflict functions to Underscore namespace if you want
                    _.mixin(_.str.exports());

                    Modernizr.load({ load: indexDependencies.concat(appDependencies), complete: initializeAngular });

                    function initializeAngular() {
                        angular.element(document).ready(function() {
                            angular.bootstrap(document, [angularApp]);
                        });

                        $('img').unveil(500);
                    }
                });
            }
        },
        {
            test: Modernizr.placeholder,
            nope: '/js/vendor/jquery.placeholder.js',
            callback: function (url, result, key) {
                if (!result) {
                    $('input, textarea').placeholder();
                }
            }
        }
    ]);
})(Modernizr);
