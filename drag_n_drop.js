angular.module('drag_n_drop', [])
    .directive('droppableFor', [function() {
        return {
            restrict: 'A',
            scope: {
                drope: '&',
                droppableFor: '='
            },
            link: function(scope, element, attrs) {
                scope.$watch('droppableFor', function(value) {
                    var accept = (value || attrs.droppableFor).split("|");
                    element.droppable({
                        addClasses: false,
                        activeClass: attrs.droppableActiveClass,
                        hoverClass: attrs.droppableHoverClass,
                        tolerance: attrs.droppableTolerance || 'pointer',
                        greedy: true,
                        accept: function(elem) {
                            return $.inArray(elem.attr("draggable"), accept) != -1;
                        },
                        drop: function(event, ui) {
                            scope.$apply(function(scope) {
                                scope.drope({
                                    draggableScope: angular.element(ui.draggable).scope(),
                                    droppableScope: angular.element(element).scope(),
                                    $event: event
                                });
                            });
                        }
                    });
                });
            }
        };
    }])
    .directive("draggable", function() {
        return function(scope, element, attrs) {
            element.draggable({
                helper: attrs.draggableHelper || 'clone',
                opacity: attrs.draggableOpacity || 0.3
            });
        };
    });