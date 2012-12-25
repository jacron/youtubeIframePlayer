/*
 * Author: jan
 * Date: Dec 31, 2011
 */
(function($) {
    $.fn.droppable = function(callback) {

        this.bind('dragover dragenter', function(e) {
            if (e.originalEvent.preventDefault) {
                e.originalEvent.preventDefault(); // required by FF + Safari
            }
            e.originalEvent.dataTransfer.dropEffect = 'copy'; // tells the browser what drop effect is allowed here
            return false; // required by IE*/
        });

        this.bind('drop', function(e) {

          // stop the browser from redirecting off to the text.
          if (e.originalEvent.preventDefault) {
              e.originalEvent.preventDefault();
          }

          var dt = e.originalEvent.dataTransfer;

          var text = dt.getData('Text');
          if (text) {
              callback(text);
          }
          else {
              if (dt && dt.files && dt.files.length > 0) {
                  callback(dt.files[0].name);   // v/h fileName
              }
          }
          return false;
        });

    };
})(jQuery);


