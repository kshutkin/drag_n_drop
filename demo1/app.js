var module = angular.module('ShowDirectives', ['drag_n_drop']);

module.config(['dndDragAndDropConfigProvider', function(dndDragAndDropConfigProvider) {
    dndDragAndDropConfigProvider.setGlobalDroppableOptions({
        hoverClass: 'dark',
        activeClass: 'red-border'
    });
}]);

module.controller('DemoCtrl', ['$scope', function($scope) {

    var colors = ['Green', 'Red', 'Blue', 'Orange'],
        classes = ['success', 'important', 'info', 'warning'];

    $scope.buckets = [];

    for (var i = 0; i < 6; i++) {
        $scope.buckets.push(createBadgesBucket());
    }

    $scope.classStr = function(n) {
        return classes[n - 1];
    };

    $scope.colorStr = function(n) {
        return colors[n - 1];
    };

    $scope.classesStr = function(colorsIndexes) {

        var result = "";

        angular.forEach(colorsIndexes, function(index) {
            if (result) result += ',';
            result += '.badge-' + classes[index - 1];
        });

        return result;
    };

    $scope.dropBadge = function(bagde, bucket) {
        var index = bagde.parent.badges.indexOf(bagde);
        bagde.parent.badges.splice(index, 1);
        bagde.parent = bucket;
        bucket.badges.push(bagde);
    };

    function intRandom(n) {
        return Math.floor(1 + Math.random() * (n));
    }

    function createBadgesBucket() {
        var colors = [1, 2, 3, 4],
            badges = [],
            bucket = {
                colors: colors
            };

        for (var i = 0; i < 2; i++) {
            colors.splice(intRandom(colors.length - 1), intRandom(2) - 1);
        }

        for (var j = 0, n = intRandom(10); j < n; j++) {
            badges.push({
                color: colors[intRandom(colors.length) - 1],
                parent: bucket
            });
        }

        bucket.badges = badges;

        return bucket;
    }
}]);