var app = angular.module('myApp', []);

app.directive('bindUnbind', function () {
  return {
    restrict: 'A',
    link: function(scope, iElm, iAttrs) {

      var eventTypes = scope.$eval(iAttrs.bindUnbind),
          onTrigger = function () {
            if (iAttrs.bindUnbindTrigger) {
              scope.$eval(iAttrs.bindUnbindTrigger);
              scope.$apply();
            }
          };

      if (angular.isString(eventTypes)) {
        eventTypes = [eventTypes];
      }

      // bind
      iElm.bind(eventTypes.join(' '), onTrigger);

      // unbind (failed)
      iElm.unbind(eventTypes.join(' '), onTrigger);

      // unbind (success)
      // angular.forEach(eventTypes, function (t) {
      //   iElm.unbind(t, onTrigger);
      // });
    }
  };
});
