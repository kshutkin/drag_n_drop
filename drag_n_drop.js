'use strict';

angular.module('drag_n_drop', [])
    .provider('dndDragAndDropConfig', function () {

        var defaults = {
                droppableOptions: {
                    addClasses: false,
                    tolerance: 'pointer',
                    greedy: true
                },
                draggableOptions: {
                    addClasses: false,
                    helper: 'clone',
                    opacity: 0.35,
                    appendTo: 'body'
                }
            },
            userOptions = {};

        return {
            setGlobalDroppableOptions : function (options) {
                userOptions.droppableOptions = options;
            },
            setGlobalDraggableOptions : function (options) {
                userOptions.draggableOptions = options;
            },
            $get: function () {
                return {
                    droppableOptions: angular.extend({}, defaults.droppableOptions, userOptions.droppableOptions),
                    draggableOptions: angular.extend({}, defaults.draggableOptions, userOptions.draggableOptions)
                }
            }
        }
    })
    .directive('dndDroppable', ['$parse', 'dndDragAndDropConfig', '$timeout', function($parse, dndDragAndDropConfig, $timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {

                var config = scope.$eval(attrs.dndDroppable),
                    handlersConfig = {},
                    watchOptions = {};

                attrs.onDrop && createHandler(handlersConfig, 'drop', $parse(attrs.onDrop));
                attrs.onActivate && createHandler(handlersConfig, 'activate', $parse(attrs.onActivate));
                attrs.onDeactivate && createHandler(handlersConfig, 'deactivate', $parse(attrs.onDeactivate));
                attrs.onOut && createHandler(handlersConfig, 'out', $parse(attrs.onOut));
                attrs.onOver && createHandler(handlersConfig, 'over', $parse(attrs.onOver));
                attrs.onCreate && createHandler(handlersConfig, 'create', $parse(attrs.onCreate));
                attrs.onAccept && createAcceptHandler(handlersConfig, $parse(attrs.onAccept));

                if (config && config.watchOptions) {
                    config.watchOptions.forEach(function (optionName) {
                        watchOptions[optionName] = scope.$eval(config[optionName]);
                        scope.$watch(config[optionName], function (value) {
                            element.droppable('option', optionName, value);
                        });
                    });
                }

                element.droppable(angular.extend({}, dndDragAndDropConfig.droppableOptions, config, watchOptions, handlersConfig));

                function createHandler(config, name, handler) {
                    var applyFunc = name === 'drop' && (config.activeClass || dndDragAndDropConfig.droppableOptions.activeClass) ? $timeout : apply;

                    if (handler) {
                        config[name] = function (event, ui) {
                            applyFunc(function () {
                                handler(scope, {
                                    draggableScope: ui && angular.element(ui.draggable).controller('dndDraggable').scope(),
                                    droppableScope: scope,
                                    $event: event
                                });
                            });
                        };
                    }
                }

                function createAcceptHandler(config, handler) {
                    if (handler) {
                        config.accept = function (element) {
                            var ctrl = angular.element(element).controller('dndDraggable');
                            return ctrl && handler(scope, {
                                draggableScope: ctrl.scope(),
                                droppableScope: scope
                            });
                        };
                    }
                }

                function apply(handler) {
                    scope.$apply(handler);
                }
            }
        };
    }])
    .directive('dndDraggable', ['dndDragAndDropConfig', function(dndDragAndDropConfig) {
        return {
            restrict: 'A',
            controller: function ($scope) {
                this.scope = function () {
                    return $scope;
                }
            },
            link: function(scope, element, attrs) {
                var config = scope.$eval(attrs.dndDraggable),
                    handlersConfig = {},
                    watchOptions = {};

                attrs.onCreate && createHandler(handlersConfig, 'create', $parse(attrs.onCreate));
                attrs.onDrag && createHandler(handlersConfig, 'drag', $parse(attrs.onDrag));
                attrs.onStart && createHandler(handlersConfig, 'start', $parse(attrs.onStart));
                attrs.onStop && createHandler(handlersConfig, 'stop', $parse(attrs.onStop));

                if (config && config.watchOptions) {
                    config.watchOptions.forEach(function (optionName) {
                        watchOptions[optionName] = scope.$eval(config[optionName]);
                        scope.$watch(config[optionName], function (value) {
                            element.draggable('option', optionName, value);
                        });
                    });
                }

                element.draggable(angular.extend({}, dndDragAndDropConfig.draggableOptions, config, watchOptions, handlersConfig));

                function createHandler(config, name, handler) {
                    if (handler) {
                        config[name] = function (event) {
                            scope.$apply(function (scope) {
                                handler(scope, {
                                    draggableScope: scope,
                                    $event: event
                                });
                            });
                        };
                    }
                }
            }
        };
    }]);
