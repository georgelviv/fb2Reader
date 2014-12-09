define(['tools/jquery-1.11.1.min'], function() {
  settingPanel();
});

function settingPanel() {
$(document).ready(function() {
     var allSections = $('#footer > settings-panel').hide();
     $('footer > .menu').click(function() {
       allSections.slideUp();
         $(this).next().slideToggle();
       $(this).parent().toggleClass('open');
      // $(this).parent().next().slideDown();
       return false;
     });

});

}

