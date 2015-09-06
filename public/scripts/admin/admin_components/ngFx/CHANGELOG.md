<a name"1.1.0"></a>
## 1.1.0 (2015-04-05)


#### Features

* **animations:** add static animations ([e665b9b8](https://github.com/Hendrixer/ng-Fx.git/commit/e665b9b8))


#### Breaking Changes

* you must now include the ngAnimate
module inside your app. ngFx no longer consumes it

Before:

angular.module('yourApp', ['ngFx'])

After:

angular.module('yourApp', ['ngFx', 'ngAnimate'])

This decouples all dependencies from ngFx and can
be entirely self managed
-

 ([e665b9b8](https://github.com/Hendrixer/ng-Fx.git/commit/e665b9b8))

