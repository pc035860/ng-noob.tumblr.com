var app = angular.module('myApp', []);

/**
 * Create directives
 *   fontSizeSuccss, fontSizeError
 */
angular.forEach(['Success', 'Error'], function (suffix) {

  var dirName = 'fontSize' + suffix;

  app.directive(dirName, function () {
    return {
      restrict: 'A',
      link: function(scope, iElm, iAttrs) {
        iAttrs.$observe(dirName, function (val) {
          val = parseInt(val, 10);

          if (suffix === 'Success') {
            // correct
            iElm.css('font-size', val + 'px');
          }
          else if (suffix === 'Error') {
            // wrong
            iElm.css('font-size', val);
          }
        });
      }
    };
  });

});

app.directive('getFontSize', function ($parse, $timeout) {
  return {
    restrict: 'A',
    link: function(scope, iElm, iAttrs) {
      var setter = $parse(iAttrs.getFontSize).assign,
          getComputedFontSize = function ($elm) {
            return $elm[0].ownerDocument.defaultView.getComputedStyle($elm[0]).fontSize;
          };

      scope.$watch(function (scope) {
        return getComputedFontSize(iElm);
      }, function (val) {
        setter(scope, {
          jqLite: iElm.css('font-size'),
          computed: val
        });
      });
    }
  };
});
