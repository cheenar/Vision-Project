$(document).ready(function() {
$('#menu').click(function() {
$('body').toggleClass('toggled');
$('header').toggleClass('toggled');
$('#toggled').toggleClass('scroll');
});
$('#close').click(function() {
$('body').removeClass('toggled');
$('header').removeClass('toggled');
$('#toggled').removeClass('scroll');
});
$('#toggled, #menu').clickoutside(function() {
  $('body').removeClass('toggled');
  $('header').removeClass('toggled');
  $('#toggled').removeClass('scroll');
});
});

(function(jQuery) {
   jQuery.fn.clickoutside = function(callback) {
      var outside = 1, self = $(this);
      self.cb = callback;
      this.click(function() {
         outside = 0;
      });
      $(document).click(function() {
         outside && self.cb();
         outside = 1;
      });
      return $(this);
   }
})(jQuery);
