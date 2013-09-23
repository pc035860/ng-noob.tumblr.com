$(function () {

  /**
   * Code highlight with highlight.js
   */
  var reqAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
  })();

  var $elms = $('.highlightjs'),
      in_progress = false;

  $(window).on('scroll', function () {
    if (in_progress) {
      return;
    }

    in_progress = true;
    reqAnimFrame(checkForHighlight);
  });
  checkForHighlight();

  function checkForHighlight() {
    var THRESHOLD = 500;

    var $window = $(window),
        scroll_top = $window.scrollTop(),
        win_height = $window.height();

    $elms.each(function () {
      var $this = $(this),
          data = $this.data(),
          code;

      if (data.highlightjs) {
        return;
      }

      if (scroll_top + win_height + THRESHOLD >= $this.offset().top) {
        data.highlightjs = true;

        code = $.trim($this.text());

        /**
         * Deal with Tumblr kindness
         */
        code = code.replace(/‘|’/g, "'");
        code = code.replace(/“|”/g, '"');

        $this.html('<pre><code></code></pre>');
        $this.find('code:first').text(code);

        /**
         * Language specified
         */
        if (data.lang) {
          $this.find('pre:first').addClass('language-' + data.lang);
        }

        hljs.highlightBlock($(this).find('pre:first')[0]);
      }
    });

    in_progress = false;
  }

});
