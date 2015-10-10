AngularJS 1.x Drag and Drop directives (jQuery UI)
=====================
###Demo:

* [Demo1](https://rawgit.com/kshutkin/drag_n_drop/master/demo1/index.html)

##Features:

* Support all features of jQuery UI draggable and droppable
* Easy configuration global and per element
* Small code size (if you already use jQuery and jQuery UI in your project)

##Get Started:
 
#### (1) Install using bower

    bower install angular-drag-and-drop --save

#### (2) Include drag_n_drop.js in your index.html, after including jQuery, jQuery UI and Angular (you can skip this if you use something like [wiredep](https://github.com/taptapship/wiredep))

```html
<script src="bower_components/jquery/dist/jquery.js"></script>
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/jqueryui/jquery-ui.js"></script>
<script src="bower_components/angular-drag-and-drop/drag_n_drop.js"></script>
```

#### (3) Add 'drag_n_drop' to your main module's list of dependencies

```javascript
angular.module('myModuleName', ['drag_n_drop'])
```

##How to use

Add dnd-draggable on element that you want to be able to drag:

```html
<span dnd-draggable>I'm draggable!!</span>
```

Add dnd-droppable on element that you want to be able to accept draggable elements:

```html
<div dnd-droppable on-drop="dropElement(draggableScope)"></div>
```

You can use draggableScope to access variables that defined on scope of dropped draggable element.
Add implementation of the on-drop handler to your controller.

```javascript
$scope.dropElement = function(draggableScope) {
    //do something here
};
```

##dndDragAndDropConfigProvider

Can be used to pass the default global parameters for other directives.

```javascript
angular.module('MyApp').config(['dndDragAndDropConfigProvider', function(dndDragAndDropConfigProvider) {
    dndDragAndDropConfigProvider.setGlobalDroppableOptions({
        //parameters here (see options for dnd-droppable)
    });
    
    dndDragAndDropConfigProvider.setGlobalDraggableOptions({
        //parameters here (see options for dnd-draggable)
    });
}]);
```

##dnd-draggable directive

Marks element as draggable.

Can have additional options in config object:

```html
<div dnd-draggable="options"></div>
```

"options" can be defined on scope or inside html.

Next options is supported according to the jQuery UI 1.11.4 [documentation](http://api.jqueryui.com/draggable/)

* [addClasses](http://api.jqueryui.com/draggable/#option-addClasses)
* [appendTo](http://api.jqueryui.com/draggable/#option-appendTo)
* [axis](http://api.jqueryui.com/draggable/#option-axis)
* [cancel](http://api.jqueryui.com/draggable/#option-cancel)
* [connectToSortable](http://api.jqueryui.com/draggable/#option-connectToSortable)
* [containment](http://api.jqueryui.com/draggable/#option-containment)
* [cursor](http://api.jqueryui.com/draggable/#option-cursor)
* [cursorAt](http://api.jqueryui.com/draggable/#option-cursorAt)
* [delay](http://api.jqueryui.com/draggable/#option-delay)
* [disabled](http://api.jqueryui.com/draggable/#option-disabled)
* [distance](http://api.jqueryui.com/draggable/#option-distance)
* [grid](http://api.jqueryui.com/draggable/#option-grid)
* [handle](http://api.jqueryui.com/draggable/#option-handle)
* [helper](http://api.jqueryui.com/draggable/#option-helper)
* [iframeFix](http://api.jqueryui.com/draggable/#option-iframeFix)
* [opacity](http://api.jqueryui.com/draggable/#option-opacity)
* [refreshPositions](http://api.jqueryui.com/draggable/#option-refreshPositions)
* [revert](http://api.jqueryui.com/draggable/#option-revert)
* [revertDuration](http://api.jqueryui.com/draggable/#option-revertDuration)
* [scope](http://api.jqueryui.com/draggable/#option-scope)
* [scroll](http://api.jqueryui.com/draggable/#option-scroll)
* [scrollSensitivity](http://api.jqueryui.com/draggable/#option-scrollSensitivity)
* [scrollSpeed](http://api.jqueryui.com/draggable/#option-scrollSpeed)
* [snap](http://api.jqueryui.com/draggable/#option-snap)
* [snapMode](http://api.jqueryui.com/draggable/#option-snapMode)
* [snapTolerance](http://api.jqueryui.com/draggable/#option-snapTolerance)
* [stack](http://api.jqueryui.com/draggable/#option-stack)
* [zIndex](http://api.jqueryui.com/draggable/#option-zIndex)

You can use **watchOptions** property to provide array of options that will be watched using $scope.$watch. Corresponding properties have to be strings with watch expressions.

You can also setup next handlers [on-create](http://api.jqueryui.com/draggable/#event-create), [on-drag](http://api.jqueryui.com/draggable/#event-drag), [on-start](http://api.jqueryui.com/draggable/#event-start) and [on-stop](http://api.jqueryui.com/draggable/#event-stop).
Example:

```html
<div dnd-draggable on-start="startDrag($event, draggableScope)"></div>
```

In each handler you can use $event object and draggableScope object(probably useless in this case).

##dnd-droppable directive

Marks element as area to drop draggable elements.

Can have additional options in config object:

```html
<div dnd-droppable="options"></div>
```

"options" can be defined on scope or inside html.

Next options is supported according to the jQuery UI 1.11.4 [documentation](http://api.jqueryui.com/droppable/)

* [accept](http://api.jqueryui.com/droppable/#option-accept)
* [activeClass](http://api.jqueryui.com/droppable/#option-activeClass)
* [addClasses](http://api.jqueryui.com/droppable/#option-addClasses)
* [disabled](http://api.jqueryui.com/droppable/#option-disabled)
* [greedy](http://api.jqueryui.com/droppable/#option-greedy)
* [hoverClass](http://api.jqueryui.com/droppable/#option-hoverClass)
* [scope](http://api.jqueryui.com/droppable/#option-scope)
* [tolerance](http://api.jqueryui.com/droppable/#option-tolerance)

Next handlers can be setup:

* [on-accept](http://api.jqueryui.com/droppable/#option-accept)
* [on-activate](http://api.jqueryui.com/droppable/#event-activate)
* [on-create](http://api.jqueryui.com/droppable/#event-create)
* [on-deactivate](http://api.jqueryui.com/droppable/#event-deactivate)
* [on-drop](http://api.jqueryui.com/droppable/#event-drop)
* [on-out](http://api.jqueryui.com/droppable/#event-out)
* [on-over](http://api.jqueryui.com/droppable/#event-over)

In all handlers except accept handler you can use draggableScope, droppableScope and $event. In accept handler only draggableScope and droppableScope are available. Accept handler must return true if draggable should be accepted.

**watchOptions** should work the same way as for dnd-draggable directive.

##Bug reports, tests and PR are welcome