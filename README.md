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

#### (2) Include drag_n_drop.js in your index.html, after including jQuery, jQuery UI and Angular (you can skip this if you use something like wiredep)

```html
<!--next is for default location of the bower_components folder-->
<script src="/bower_components/jquery/dist/jquery.js"></script>
<script src="/bower_components/angular/angular.js"></script>
<script src="/bower_components/jqueryui/jquery-ui.js"></script>
<script src="/bower_components/angular-drag-and-drop/drag_n_drop.js"></script>
```

#### (3) Add 'drag_n_drop' to your main module's list of dependencies

```javascript
angular.module('myModuleName', ['drag_n_drop'])
```
