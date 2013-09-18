angular.module('submitIt', [])

/**
 * @ngdoc directive
 * @description form submission trigger
 *
 * @param {boolean} submit-it submit form on `true`
 * @param {string}  si-action submit action(optional)
 * @param {string}  si-method submit method(optional)
 */
.directive('submitIt', [
         '$timeout',
function ($timeout) {
  return {
    restrict: 'A',
    link: function postLink(scope, iElm, iAttrs) {
      var _submitWatch = scope.$watch(iAttrs.submitIt, _onSubmitWatch),
          _savedAction, _savedMethod;

      iAttrs.$observe('siAction', function (val) {
        if (val) {
          _savedAction = val;
        }
      });

      iAttrs.$observe('siMethod', function (val) {
        if (val) {
          _savedMethod = val;
        }
      });

      function _onSubmitWatch(submit) {
        if (submit && iElm[0].tagName === 'FORM') {
          if (_savedAction) {
            iElm.attr('action', _savedAction);
          }

          if (_savedMethod) {
            iElm.attr('method', _savedMethod);
          }

          $timeout(function () {
            iElm[0].submit();
          });
          _submitWatch();
        }
      }
    }
  };
}]);