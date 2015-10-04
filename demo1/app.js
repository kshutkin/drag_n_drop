var module = angular.module('ShowDirectives', ['drag_n_drop']);

module.config(['dndDragAndDropConfigProvider', '$compileProvider', function(dndDragAndDropConfigProvider, $compileProvider) {
    dndDragAndDropConfigProvider.setGlobalDroppableOptions({
        hoverClass: 'dark',
        activeClass: 'red-border'
    });

    $compileProvider.debugInfoEnabled(false);
}]);

module.value('Colors', ['Green', 'Red', 'Blue', 'Orange']);
module.value('Classes', ['success', 'important', 'info', 'warning']);

module.controller('DemoCtrl', ['$scope', 'Colors', 'Classes', function($scope, Colors, Classes) {

    $scope.buckets = [];

    for (var i = 0; i < 6; i++) {
        $scope.buckets.push(createBadgesBucket());
    }

    $scope.dropBadge = function(badge, bucket) {
        var index = badge.parent.badges.indexOf(badge);
        badge.parent.badges.splice(index, 1);
        badge.parent = bucket;
        bucket.badges.push(badge);
    };

    $scope.acceptBadge = function(badge, bucket) {
        return bucket.colors.indexOf(badge.color) !== -1;
    };

    function createBadgesBucket() {
        var colors = Colors.map(function (name, index) {
                return index + 1;
            }),
            bucket = {
                colors: colors,
                badges: []
            };

        for (var i = 0; i < 2; i++) {
            colors.splice(intRandom(colors.length - 1), intRandom(2) - 1);
        }

        bucket.labels = colors.map(function (color) {
            return {
                text: Colors[color - 1],
                cssClass: 'label-' + Classes[color - 1]
            };
        });

        for (var j = 0, n = intRandom(10); j < n; j++) {
            var k = intRandom(colors.length) - 1;
            bucket.badges.push({
                color: colors[k],
                cssClass: 'badge-' + Classes[k],
                text: Colors[k],
                parent: bucket
            });
        }

        return bucket;
    }

    function intRandom(n) {
        return Math.floor(1 + Math.random() * (n));
    }
}]);